import pg from "pg";

function resolveConn() {
  for (const c of [process.env.POSTGRES_URL_NON_POOLING, process.env.POSTGRES_URL, process.env.SUPABASE_DB_URL]) {
    const v = c?.trim();
    if (v && !/[@/]base([.:/]|$)/i.test(v)) return v;
  }
  return null;
}

const conn = resolveConn();
if (!conn) {
  console.error("POSTGRES_* required");
  process.exit(1);
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const client = new pg.Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
await client.connect();

const { rows: totals } = await client.query(`
  select
    count(*)::int total,
    count(*) filter (where status = 'closed' and result_pips = 0)::int zero_pips,
    count(*) filter (where status = 'closed')::int closed
  from public.elite_operations where show_public
`);
const t = totals[0];
const pct = t.closed ? ((t.zero_pips / t.closed) * 100).toFixed(1) : "0";
console.log("Fechadas:", t.closed, "| 0 pips:", t.zero_pips, `(${pct}%)`);

const { rows: byYear } = await client.query(`
  select split_part(report_month, '/', 2)::int as year,
    count(*)::int n,
    count(*) filter (where result_pips = 0)::int z
  from public.elite_operations
  where status = 'closed' and show_public
  group by 1 order by 1
`);
console.log("\nPor ano (fechadas, zeros):");
console.table(byYear);

const { rows: samples } = await client.query(`
  select report_month, asset, direction, traded_on, result_pips, signal_number
  from public.elite_operations
  where status = 'closed' and show_public and result_pips = 0
  order by report_month desc, sort_order
  limit 25
`);
console.log("\nAmostra zeros:");
console.table(samples);

await client.end();
