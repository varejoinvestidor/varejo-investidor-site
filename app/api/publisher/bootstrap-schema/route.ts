import { NextResponse } from "next/server";
import pg from "pg";
import { assertCronBearer } from "../../../../src/publisher/security/cronAuth";
import { FULL_PUBLISHER_MIGRATION_FILES, runSqlMigrationFiles } from "../../../../src/publisher/schema/runSqlMigrations";
import { resolvePostgresConnectionString } from "../../../../src/publisher/schema/postgresConnection";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

/** Aplica migrations do Publisher (idempotente onde possível). */
export async function POST(request: Request) {
  if (!assertCronBearer(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const migrated = await runSqlMigrationFiles(FULL_PUBLISHER_MIGRATION_FILES);
  if (!migrated.ok) {
    return NextResponse.json({ error: migrated.error }, { status: migrated.error.includes("POSTGRES") ? 503 : 500 });
  }

  const conn = resolvePostgresConnectionString();
  if (!conn) {
    return NextResponse.json({ ok: true, categories: null });
  }

  const client = new pg.Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
  try {
    await client.connect();
    const { rows } = await client.query("select count(*)::int as n from public.categories");
    return NextResponse.json({ ok: true, categories: rows[0]?.n ?? 0 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Migration failed";
    return NextResponse.json({ ok: true, categories: null, warning: message });
  } finally {
    await client.end().catch(() => undefined);
  }
}
