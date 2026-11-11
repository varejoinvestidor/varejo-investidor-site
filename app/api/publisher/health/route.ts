import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "../../../../src/publisher/env";
import { eliteSchemaReady, probeSupabaseSchema } from "../../../../src/publisher/schema/supabaseTableProbe";
import { resolvePostgresConnectionString } from "../../../../src/publisher/schema/postgresConnection";
import { assertCronBearer } from "../../../../src/publisher/security/cronAuth";
import { requirePublisherStaffSession } from "../../../../src/publisher/security/publisherApiAuth";

export const dynamic = "force-dynamic";

/** Público: apenas disponibilidade. Detalhes: staff autenticado ou CRON_SECRET. */
export async function GET(request: Request) {
  const isCron = assertCronBearer(request);
  const staff = await requirePublisherStaffSession();
  const isStaff = staff.ok;

  if (!isCron && !isStaff) {
    return NextResponse.json(
      { ok: isSupabaseConfigured() },
      { status: isSupabaseConfigured() ? 200 : 503 },
    );
  }

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
