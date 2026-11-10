import pg from "pg";

const yearArg = process.argv[2];
const range = yearArg === "2018-2024";
const year = Number(yearArg ?? 2018);

function resolveConn() {
  for (const c of [process.env.POSTGRES_URL_NON_POOLING, process.env.POSTGRES_URL, process.env.SUPABASE_DB_URL]) {
    const v = c?.trim();
    if (v && !/[@/]base([.:/]|$)/i.test(v)) return v;
  }
  return null;
}

const conn = resolveConn();
if (!conn) {
  console.error("No POSTGRES_*");
  process.exit(1);
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const client = new pg.Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
await client.connect();
if (range) {
  const { rows } = await client.query(
    `select year, count(*)::int months, sum(signals)::int signals, sum(pips)::int pips
     from public.elite_monthly_reports where year between 2018 and 2024 group by 1 order by 1`,
  );
  console.table(rows);
} else {
  const { rows: monthly } = await client.query(
    `select month_label, month_index, signals, pips from public.elite_monthly_reports where year = $1 order by month_index`,
    [year],
  );
  console.log("monthly_reports", year);
  console.table(monthly);
  const { rows: ops } = await client.query(
    `select report_month, count(*)::int n, sum(result_pips)::int p from public.elite_operations where report_month like '%/' || $1::text group by 1 order by 1`,
    [year],
  );
  console.log("operations");
  console.table(ops);
}
await client.end();
