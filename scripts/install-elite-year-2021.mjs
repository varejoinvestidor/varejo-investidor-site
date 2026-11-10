/**
 * Aplica todas as migrations Elite 2021 (12 meses).
 * Uso: node --env-file=.env.vercel.production scripts/install-elite-year-2021.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import pg from "pg";

const manifest = JSON.parse(
  readFileSync(join(process.cwd(), "src", "data", "eliteXlsx", "2021", "_manifest.json"), "utf8"),
);

function resolveConn() {
  for (const c of [
    process.env.POSTGRES_URL_NON_POOLING,
    process.env.POSTGRES_URL,
    process.env.SUPABASE_DB_URL,
  ]) {
    const v = c?.trim();
    if (v && !/[@/]base([.:/]|$)/i.test(v)) return v;
  }
  return null;
}

const conn = resolveConn();
if (!conn) {
  console.error("Defina POSTGRES_* (vercel env pull).");
  process.exit(1);
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const client = new pg.Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });

try {
  await client.connect();
  for (const row of manifest.summary) {
    const file = join(process.cwd(), "supabase", "migrations", row.sql.split(/[\\/]/).pop());
    if (!existsSync(file)) {
      console.error("Arquivo ausente:", file);
      process.exit(1);
    }
    const sql = readFileSync(file, "utf8");
    console.log("Applying", row.month, "…", row.trades, "sinais");
    await client.query(sql);
  }
  await client.query(`NOTIFY pgrst, 'reload schema';`);
  const { rows } = await client.query(
    `select count(*)::int n, sum(pips)::int p from public.elite_monthly_reports where year = 2021`,
  );
  const { rows: ops } = await client.query(
    `select count(*)::int n from public.elite_operations where report_month like '%/2021'`,
  );
  console.log("OK — meses:", rows[0], "| operações 2021:", ops[0]?.n);
} catch (e) {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
} finally {
  await client.end().catch(() => undefined);
}
