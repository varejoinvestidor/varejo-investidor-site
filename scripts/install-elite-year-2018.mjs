/**
 * Completa 2018: Outubro–Dezembro (Agosto/Setembro ficam nas migrations curadas).
 * Uso: node --env-file=.env.vercel.production scripts/install-elite-year-2018.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import pg from "pg";

const ONLY_MONTHS = new Set(["Outubro/2018", "Novembro/2018", "Dezembro/2018"]);

const manifest = JSON.parse(
  readFileSync(join(process.cwd(), "src", "data", "eliteXlsx", "2018", "_manifest.json"), "utf8"),
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
    if (!ONLY_MONTHS.has(row.month)) {
      console.log("Skip (curado ou ausente no install):", row.month);
      continue;
    }
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
    `select report_month, count(*)::int n from public.elite_operations where report_month like '%/2018' group by 1 order by 1`,
  );
  const { rows: months } = await client.query(
    `select count(*)::int n, sum(pips)::int p from public.elite_monthly_reports where year = 2018`,
  );
  console.log("OK — meses 2018:", months[0], "\n", rows);
} catch (e) {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
} finally {
  await client.end().catch(() => undefined);
}
