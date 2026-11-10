import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "../../../../src/publisher/env";
import { eliteSchemaReady, probeSupabaseSchema } from "../../../../src/publisher/schema/supabaseTableProbe";
import { resolvePostgresConnectionString } from "../../../../src/publisher/schema/postgresConnection";

export const dynamic = "force-dynamic";

/** Diagnóstico leve pós-deploy (sem expor segredos). */
export async function GET() {
  const supabase = isSupabaseConfigured();
  const serviceRole = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim());
  const cron = Boolean(process.env.CRON_SECRET?.trim());

  const probe = supabase ? await probeSupabaseSchema() : null;
  const databaseReachable = probe?.tables.categories?.status === "ok";
  const eliteReady = probe ? eliteSchemaReady(probe) : false;
  const postgresConfigured = Boolean(resolvePostgresConnectionString());

  const ok = supabase && serviceRole && cron && databaseReachable;

  return NextResponse.json(
    {
      ok,
      publisher: {
        supabasePublic: supabase,
        databaseReachable,
        eliteReady,
        postgresConfigured,
        tables: probe?.tables,
        serviceRoleConfigured: serviceRole,
        cronSecretConfigured: cron,
        timezone: process.env.PUBLISHER_SITE_TIMEZONE ?? "America/Sao_Paulo",
      },
    },
    { status: ok ? 200 : 503 },
  );
}
