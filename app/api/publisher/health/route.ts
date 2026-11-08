import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "../../../../src/publisher/env";
import { createPublisherPublicClient } from "../../../../src/publisher/supabase/public";

export const dynamic = "force-dynamic";

/** Diagnóstico leve pós-deploy (sem expor segredos). */
export async function GET() {
  const supabase = isSupabaseConfigured();
  const serviceRole = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim());
  const cron = Boolean(process.env.CRON_SECRET?.trim());

  let databaseReachable = false;
  if (supabase) {
    const client = createPublisherPublicClient();
    if (client) {
      const { error } = await client.from("categories").select("id", { head: true, count: "exact" });
      databaseReachable = !error;
    }
  }

  const ok = supabase && serviceRole && cron && databaseReachable;

  return NextResponse.json(
    {
      ok,
      publisher: {
        supabasePublic: supabase,
        databaseReachable,
        serviceRoleConfigured: serviceRole,
        cronSecretConfigured: cron,
        timezone: process.env.PUBLISHER_SITE_TIMEZONE ?? "America/Sao_Paulo",
      },
    },
    { status: ok ? 200 : 503 },
  );
}
