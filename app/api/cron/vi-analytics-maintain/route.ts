import { NextResponse } from "next/server";
import { ensureViAnalyticsSchema } from "../../../../src/analytics/ensureSchema";
import { assertCronBearer } from "../../../../src/publisher/security/cronAuth";
import { createPublisherServiceClient } from "../../../../src/publisher/supabase/service";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

/**
 * Mantém schema VI Analytics e devolve contagem de eventos (últimos 7 dias).
 * GET + Authorization: Bearer CRON_SECRET · agenda no GitHub Actions ou Vercel Cron.
 */
export async function GET(request: Request) {
  if (!assertCronBearer(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ensured = await ensureViAnalyticsSchema();
  if (!ensured.ok) {
    return NextResponse.json(
      { ok: false, error: ensured.error, state: ensured.state },
      { status: ensured.state === "unconfigured" ? 503 : 500 },
    );
  }

  const admin = createPublisherServiceClient();
  if (!admin) {
    return NextResponse.json({ ok: true, state: ensured.state, installed: ensured.installed, events7d: null });
  }

  const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { count, error } = await admin
    .from("site_analytics_events")
    .select("id", { count: "exact", head: true })
    .gte("occurred_at", from);

  return NextResponse.json({
    ok: true,
    state: ensured.state,
    installed: ensured.installed,
    events7d: error ? null : count ?? 0,
    countError: error?.message ?? null,
  });
}
