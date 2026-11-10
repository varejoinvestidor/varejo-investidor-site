/**
 * Banners, vídeos, Elite, VI Analytics — incrementos idempotentes.
 * Uso: node --env-file=.env.vercel.production scripts/install-publisher-incremental.mjs
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import pg from "pg";

const files = [
  "20260310120000_article_banners.sql",
  "20260318150000_article_youtube_videos.sql",
  "20260310130000_elite_report.sql",
  "20260311120000_elite_operations_levels.sql",
  "20260317120000_elite_signal_tier.sql",
  "20260316120000_supabase_api_grants.sql",
  "20260318120000_vi_analytics.sql",
  "20260319120000_vi_analytics_regions.sql",
];

function resolveConn() {
  const ordered = [
    process.env.POSTGRES_URL_NON_POOLING,
    process.env.POSTGRES_URL,
    process.env.SUPABASE_DB_URL,
    process.env.DATABASE_URL,
  ];
  for (const c of ordered) {
    const v = c?.trim();
    if (v && !v.includes("[SENSITIVE]") && !/placeholder|changeme/i.test(v) && !v.includes("base")) return v;
  }
  const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DATABASE } = process.env;
  if (POSTGRES_HOST && POSTGRES_USER && POSTGRES_PASSWORD && POSTGRES_DATABASE) {
    const host = POSTGRES_HOST.trim();
    if (host === "base" || POSTGRES_PASSWORD.includes("[SENSITIVE]")) return null;
    return `postgresql://${encodeURIComponent(POSTGRES_USER)}:${encodeURIComponent(POSTGRES_PASSWORD)}@${host}:5432/${POSTGRES_DATABASE}?sslmode=require`;
  }
  return null;
}

const conn = resolveConn();
if (!conn) {
  console.error("Defina POSTGRES_URL_NON_POOLING — Supabase → Database → URI (Direct)");
  process.exit(1);
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const client = new pg.Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
const root = process.cwd();

try {
  await client.connect();
  for (const file of files) {
    console.log("Applying", file, "…");
    await client.query(readFileSync(join(root, "supabase", "migrations", file), "utf8"));
  }
  await client.query(`NOTIFY pgrst, 'reload schema';`);
  console.log("Incremental completo. Rode: npm run verify:supabase");
} catch (e) {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
} finally {
  await client.end().catch(() => undefined);
}
