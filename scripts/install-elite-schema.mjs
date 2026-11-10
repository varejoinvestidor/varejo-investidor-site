/**
 * Aplica migrations Elite no Supabase (POSTGRES_URL*).
 * Uso: node --env-file=.env.vercel.production scripts/install-elite-schema.mjs
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import pg from "pg";

const files = ["20260310130000_elite_report.sql", "20260311120000_elite_operations_levels.sql"];

function resolveConn() {
  const ordered = [
    process.env.POSTGRES_URL_NON_POOLING,
    process.env.POSTGRES_URL,
    process.env.SUPABASE_DB_URL,
    process.env.DATABASE_URL,
    process.env.POSTGRES_PRISMA_URL,
  ];
  for (const c of ordered) {
    const v = c?.trim();
    if (v && !v.includes("[SENSITIVE]") && !v.includes("base")) return v;
  }
  const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DATABASE } = process.env;
  if (POSTGRES_HOST && POSTGRES_USER && POSTGRES_PASSWORD && POSTGRES_DATABASE) {
    return `postgresql://${encodeURIComponent(POSTGRES_USER)}:${encodeURIComponent(POSTGRES_PASSWORD)}@${POSTGRES_HOST}:5432/${POSTGRES_DATABASE}?sslmode=require`;
  }
  return null;
}

const conn = resolveConn();

if (!conn) {
  console.error(
    "Defina POSTGRES_URL (ex.: --env-file=.env.vercel.production ou variável no ambiente).",
  );
  process.exit(1);
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const client = new pg.Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
const root = process.cwd();

try {
  await client.connect();
  for (const file of files) {
    const sql = readFileSync(join(root, "supabase", "migrations", file), "utf8");
    console.log("Applying", file, "…");
    await client.query(sql);
  }
  await client.query(`NOTIFY pgrst, 'reload schema';`);
  const { rows } = await client.query(
    "select to_regclass('public.elite_operations') as ops, to_regclass('public.elite_monthly_reports') as monthly",
  );
  console.log("OK", rows[0]);
} catch (e) {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
} finally {
  await client.end().catch(() => undefined);
}
