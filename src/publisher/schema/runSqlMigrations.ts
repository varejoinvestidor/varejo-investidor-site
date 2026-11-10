import { readFileSync } from "node:fs";
import { join } from "node:path";
import pg from "pg";
import { postgresConnectionHint, resolvePostgresConnectionString } from "./postgresConnection";

export const ARTICLE_BANNERS_MIGRATION_FILES = ["20260310120000_article_banners.sql"] as const;

export const ELITE_MIGRATION_FILES = [
  "20260310130000_elite_report.sql",
  "20260311120000_elite_operations_levels.sql",
] as const;

export const FULL_PUBLISHER_MIGRATION_FILES = [
  "20260308120000_publisher_foundation.sql",
  "20260308120001_storage_publisher_media.sql",
  "20260308130000_publisher_public_views.sql",
  "20260310120000_article_banners.sql",
  ...ELITE_MIGRATION_FILES,
] as const;

export async function runSqlMigrationFiles(
  files: readonly string[],
): Promise<{ ok: true } | { ok: false; error: string }> {
  const conn = resolvePostgresConnectionString();
  if (!conn) {
    return { ok: false, error: `Conexão Postgres indisponível no servidor. ${postgresConnectionHint()}` };
  }

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const client = new pg.Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
  const root = process.cwd();

  try {
    await client.connect();
    for (const file of files) {
      const sql = readFileSync(join(root, "supabase", "migrations", file), "utf8");
      await client.query(sql);
    }
    await client.query(`NOTIFY pgrst, 'reload schema';`);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Falha ao aplicar migrations" };
  } finally {
    await client.end().catch(() => undefined);
  }
}
