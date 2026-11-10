import { NextResponse } from "next/server";
import { parseAnalyticsPayload } from "../../../../src/analytics/validateCollect";
import { createPublisherServiceClient } from "../../../../src/publisher/supabase/service";

export const dynamic = "force-dynamic";

const MAX_PER_IP_WINDOW = 120;
const WINDOW_MS = 60_000;
const buckets = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const row = buckets.get(ip);
  if (!row || now > row.reset) {
    buckets.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (row.count >= MAX_PER_IP_WINDOW) return false;
  row.count += 1;
  return true;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(ip)) {
    return new NextResponse(null, { status: 429 });
  }

  const ua = request.headers.get("user-agent") ?? "";
  if (ua.length < 8) {
    return new NextResponse(null, { status: 204 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const payload = parseAnalyticsPayload(body);
  if (!payload) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const admin = createPublisherServiceClient();
  if (!admin) {
    return new NextResponse(null, { status: 204 });
  }

  const { error } = await admin.rpc("record_site_analytics_event", {
    p_kind: payload.kind,
    p_path: payload.path,
    p_page_title: payload.pageTitle,
    p_element_key: payload.elementKey,
    p_element_label: payload.elementLabel,
    p_locale: payload.locale,
    p_referrer: payload.referrer,
    p_session_id: payload.sessionId,
  });

  if (error) {
    if (/record_site_analytics_event|site_analytics_events|PGRST202|PGRST205/i.test(error.message)) {
      return new NextResponse(null, { status: 204 });
    }
    return NextResponse.json({ error: "Storage failed" }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
