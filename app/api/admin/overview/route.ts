import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/app/lib/admin-auth";
import { listAdminChatData } from "@/app/lib/chat-storage";
import { getSql } from "@/app/lib/neon";

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

  return NextResponse.json({
    admin,
    leads,
    ...chatData,
  });
}
