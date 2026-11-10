import { readFileSync } from "node:fs";
import { join } from "node:path";
import pg from "pg";
import { postgresConnectionHint, resolvePostgresConnectionString } from "./postgresConnection";

export const ARTICLE_BANNERS_MIGRATION_FILES = ["20260310120000_article_banners.sql"] as const;

export const ARTICLE_VIDEO_MIGRATION_FILES = ["20260318150000_article_youtube_videos.sql"] as const;

export const ARTICLE_PUBLISHER_EXTRA_MIGRATION_FILES = [
  ...ARTICLE_BANNERS_MIGRATION_FILES,
  ...ARTICLE_VIDEO_MIGRATION_FILES,
] as const;

export const ELITE_MIGRATION_FILES = [
  "20260310130000_elite_report.sql",
  "20260311120000_elite_operations_levels.sql",
  "20260317120000_elite_signal_tier.sql",
  "20260316120000_supabase_api_grants.sql",
  "20260320170000_elite_september_2022.sql",
  "20260321120000_elite_august_2018.sql",
  "20260321130000_elite_september_2018.sql",
] as const;

export const VI_ANALYTICS_MIGRATION_FILES = [
  "20260318120000_vi_analytics.sql",
  "20260319120000_vi_analytics_regions.sql",
  "20260320120000_vi_analytics_top_clicks_fix.sql",
  "20260320140000_vi_analytics_backfill_geo.sql",
] as const;

export const SUPABASE_INCREMENTAL_MIGRATION_FILES = [
  ...ARTICLE_PUBLISHER_EXTRA_MIGRATION_FILES,
  ...ELITE_MIGRATION_FILES,
  "20260316120000_supabase_api_grants.sql",
  ...VI_ANALYTICS_MIGRATION_FILES,
] as const;

export const FULL_PUBLISHER_MIGRATION_FILES = [
  "20260308120000_publisher_foundation.sql",
  "20260308120001_storage_publisher_media.sql",
  "20260308130000_publisher_public_views.sql",
  ...SUPABASE_INCREMENTAL_MIGRATION_FILES,
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
