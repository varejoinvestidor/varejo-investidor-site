/**
 * Aplica migration setembro/2018 no Supabase.
 * Uso: node --env-file=.env.vercel.production scripts/install-elite-setembro-2018.mjs
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import pg from "pg";

function resolveConn() {
  const ordered = [
    process.env.POSTGRES_URL_NON_POOLING,
    process.env.POSTGRES_URL,
    process.env.SUPABASE_DB_URL,
    process.env.DATABASE_URL,
  ];
  for (const c of ordered) {
    const v = c?.trim();
    if (v && !v.includes("[SENSITIVE]") && !/[@/]base([.:/]|$)/i.test(v)) return v;
  }
  const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DATABASE } = process.env;
  if (POSTGRES_HOST && POSTGRES_USER && POSTGRES_PASSWORD && POSTGRES_DATABASE) {
    return `postgresql://${encodeURIComponent(POSTGRES_USER)}:${encodeURIComponent(POSTGRES_PASSWORD)}@${POSTGRES_HOST}:5432/${POSTGRES_DATABASE}?sslmode=require`;
  }
  return null;
}

const conn = resolveConn();
if (!conn) {
  console.error("Defina POSTGRES_* (ex.: npx vercel env pull .env.vercel.production --environment=production).");
  process.exit(1);
}

const file = "20260321130000_elite_september_2018.sql";
const sql = readFileSync(join(process.cwd(), "supabase", "migrations", file), "utf8");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const client = new pg.Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });

try {
  await client.connect();
  console.log("Applying", file, "…");
  await client.query(sql);
  await client.query(`NOTIFY pgrst, 'reload schema';`);
  const { rows } = await client.query(
    `select count(*)::int as ops from public.elite_operations where report_month = 'Setembro/2018'`,
  );
  const { rows: monthRows } = await client.query(
    `select signals, pips, result_label from public.elite_monthly_reports where year = 2018 and month_index = 8`,
  );
  console.log("OK — operações Setembro/2018:", rows[0]?.ops, "| consolidado:", monthRows[0]);
} catch (e) {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
} finally {
  await client.end().catch(() => undefined);
}
