import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/app/lib/admin-auth";
import { listAdminChatData } from "@/app/lib/chat-storage";
import { getSql } from "@/app/lib/neon";

type HeatmapRow = {
  id: number;
  created_at: string;
  session_id: string | null;
  path: string | null;
  event_type: string;
  x: number | null;
  y: number | null;
  viewport_width: number | null;
  viewport_height: number | null;
  metadata: Record<string, unknown> | null;
};

function formatDevice(width?: number | null) {
  if (!width) return "Unknown";
  if (width < 760) return "Mobile";
  if (width < 1100) return "Tablet";
  return "Desktop";
}

function formatActivity(event: HeatmapRow) {
  const path = event.path || "/";
  if (event.event_type === "pageview") {
    return { label: `Opened ${path}`, detail: `${formatDevice(event.viewport_width)} session started` };
  }
  if (event.event_type === "scroll") {
    const depth = Number(event.metadata?.depth ?? 0);
    return { label: `Scrolled ${depth}%`, detail: `Reading ${path}` };
  }
  if (event.event_type === "click") {
    const tag = String(event.metadata?.tag || "page area");
    return { label: `Clicked ${tag}`, detail: `Interaction on ${path}` };
  }
  if (event.event_type === "move") {
    return { label: `Explored ${path}`, detail: `${formatDevice(event.viewport_width)} pointer activity` };
  }
  return { label: event.event_type, detail: path };
}

function buildAnalytics(heatmap: HeatmapRow[]) {
  const sessions = new Map<
    string,
    {
      id: string;
      first: number;
      last: number;
      eventCount: number;
      clicks: number;
      maxScroll: number;
      device: string;
      path: string;
    }
  >();
  const pageCounts = new Map<string, number>();

  for (const event of heatmap) {
    const sessionId = event.session_id || `event-${event.id}`;
    const timestamp = new Date(event.created_at).getTime();
    const current =
      sessions.get(sessionId) ||
      {
        id: sessionId,
        first: timestamp,
        last: timestamp,
        eventCount: 0,
        clicks: 0,
        maxScroll: 0,
        device: formatDevice(event.viewport_width),
        path: event.path || "/",
      };

    current.first = Math.min(current.first, timestamp);
    current.last = Math.max(current.last, timestamp);
    current.eventCount += 1;
    current.path = event.path || current.path;
    if (event.viewport_width) current.device = formatDevice(event.viewport_width);
    if (event.event_type === "click") current.clicks += 1;
    if (event.event_type === "scroll") {
      current.maxScroll = Math.max(current.maxScroll, Number(event.metadata?.depth || 0));
    }
    sessions.set(sessionId, current);

    if (event.event_type === "pageview") {
      const path = event.path || "/";
      pageCounts.set(path, (pageCounts.get(path) || 0) + 1);
    }
  }

  const sessionStats = Array.from(sessions.values())
    .map((session) => ({
      sessionId: session.id,
      path: session.path,
      device: session.device,
      eventCount: session.eventCount,
      clicks: session.clicks,
      maxScroll: session.maxScroll,
      timeSpentSeconds: Math.max(0, Math.round((session.last - session.first) / 1000)),
      lastSeen: new Date(session.last).toISOString(),
    }))
    .sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime());

  const totalTime = sessionStats.reduce((sum, session) => sum + session.timeSpentSeconds, 0);
  const deviceCounts = sessionStats.reduce<Record<string, number>>((counts, session) => {
    counts[session.device] = (counts[session.device] || 0) + 1;
    return counts;
  }, {});

  return {
    totalSessions: sessionStats.length,
    deviceCounts,
    avgTimeSpentSeconds: sessionStats.length ? Math.round(totalTime / sessionStats.length) : 0,
    sessionStats: sessionStats.slice(0, 12),
    topPages: Array.from(pageCounts.entries())
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6),
    recentActivity: heatmap.slice(0, 40).map((event) => ({
      id: event.id,
      created_at: event.created_at,
      ...formatActivity(event),
    })),
  };
}

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const sql = getSql();
  const leads = await sql`
    SELECT *
    FROM open_limits_leads
    ORDER BY created_at DESC
    LIMIT 80
  `.catch(() => []);
  const chatData = await listAdminChatData();
  const analytics = buildAnalytics(chatData.heatmap as HeatmapRow[]);

  return NextResponse.json({
    admin,
    leads,
    analytics,
    ...chatData,
  });
}
