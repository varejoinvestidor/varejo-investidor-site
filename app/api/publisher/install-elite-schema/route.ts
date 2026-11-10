import { NextResponse } from "next/server";
import pg from "pg";
import { ELITE_MIGRATION_FILES, runSqlMigrationFiles } from "../../../../src/publisher/schema/runSqlMigrations";
import { assertCronBearer } from "../../../../src/publisher/security/cronAuth";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

/** Aplica só migrations Elite + recarrega cache PostgREST (Bearer CRON_SECRET). */
export async function POST(request: Request) {
  if (!assertCronBearer(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const migrated = await runSqlMigrationFiles(ELITE_MIGRATION_FILES);
  if (!migrated.ok) {
    return NextResponse.json({ error: migrated.error }, { status: migrated.error.includes("POSTGRES") ? 503 : 500 });
  }

  const conn =
    process.env.POSTGRES_URL_NON_POOLING ?? process.env.POSTGRES_URL ?? process.env.SUPABASE_DB_URL;
  let tables = { elite_operations: null as string | null, elite_monthly_reports: null as string | null };

  if (conn) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const client = new pg.Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
    try {
      await client.connect();
      const { rows } = await client.query(
        "select to_regclass('public.elite_operations')::text as elite_operations, to_regclass('public.elite_monthly_reports')::text as elite_monthly_reports",
      );
      tables = rows[0] ?? tables;
    } finally {
      await client.end().catch(() => undefined);
    }
  }

  return NextResponse.json({ ok: true, tables });
}
