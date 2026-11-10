import { NextResponse } from "next/server";
import { ensureViAnalyticsSchema } from "../../../../src/analytics/ensureSchema";
import { assertCronBearer } from "../../../../src/publisher/security/cronAuth";
import { getPublisherSession } from "../../../../src/publisher/supabase/server";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

async function authorized(request: Request) {
  if (assertCronBearer(request)) return true;
  const { profile } = await getPublisherSession();
  return profile?.role === "admin";
}

/** Garante tabelas/RPCs VI Analytics (CRON_SECRET ou sessão admin). */
export async function POST(request: Request) {
  if (!(await authorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await ensureViAnalyticsSchema();
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error, state: result.state },
      { status: result.state === "unconfigured" ? 503 : 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    state: result.state,
    installed: result.installed,
  });
}
