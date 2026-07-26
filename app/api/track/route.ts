import { NextRequest, NextResponse } from "next/server";
import { saveHeatmapEvent } from "@/app/lib/chat-storage";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | {
        sessionId?: string;
        path?: string;
        eventType?: string;
        x?: number;
        y?: number;
        viewportWidth?: number;
        viewportHeight?: number;
        metadata?: Record<string, unknown>;
      }
    | null;

  if (!body?.eventType) {
    return NextResponse.json({ error: "Missing event type." }, { status: 400 });
  }

  try {
    await saveHeatmapEvent({
      sessionId: body.sessionId,
      path: body.path,
      eventType: body.eventType,
      x: body.x,
      y: body.y,
      viewportWidth: body.viewportWidth,
      viewportHeight: body.viewportHeight,
      metadata: body.metadata,
    });
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({ ok: true });
}
