/**
 * Verifica tabelas/RPCs via API REST. Uso: node --env-file=.env.local scripts/verify-supabase-schema.mjs
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || process.env.SUPABASE_URL?.trim();
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
  process.env.SUPABASE_SECRET_KEY?.trim() ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

if (!url || !key || key.includes("[SENSITIVE]") || url.includes("[SENSITIVE]")) {
  console.error("Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const client = createClient(url, key, { auth: { persistSession: false } });

const tables = [
  "categories",
  "articles",
  "elite_operations",
  "elite_monthly_reports",
  "site_analytics_events",
];
let ok = true;

for (const table of tables) {
  const { error } = await client.from(table).select("id", { head: true, count: "exact" }).limit(1);
  if (error) {
    ok = false;
    console.log(`✗ ${table}: ${error.code ?? ""} ${error.message}`);
  } else {
    console.log(`✓ ${table}`);
  }
}

const { error: articleColErr } = await client.from("articles").select("youtube_horizontal, video_primary").limit(1);
if (articleColErr) {
  ok = false;
  console.log(`✗ articles vídeos: ${articleColErr.message}`);
} else {
  console.log("✓ articles.youtube_horizontal / video_primary");
}

const now = new Date();
const weekAgo = new Date(now.getTime() - 7 * 86400000);
const { error: rpcSummary } = await client.rpc("analytics_summary", {
  p_from: weekAgo.toISOString(),
  p_to: now.toISOString(),
});
if (rpcSummary) {
  ok = false;
  console.log(`✗ analytics_summary: ${rpcSummary.message}`);
} else {
  console.log("✓ analytics_summary");
}

const { error: rpcRegion } = await client.rpc("analytics_by_region", {
  p_from: weekAgo.toISOString(),
  p_to: now.toISOString(),
  p_limit: 1,
});
if (rpcRegion) {
  ok = false;
  console.log(`✗ analytics_by_region: ${rpcRegion.message}`);
} else {
  console.log("✓ analytics_by_region");
}

const { count, error: evErr } = await client
  .from("site_analytics_events")
  .select("id", { count: "exact", head: true })
  .gte("occurred_at", weekAgo.toISOString());
if (evErr) {
  console.log(`? eventos 7d: ${evErr.message}`);
} else {
  console.log(`ℹ eventos telemetria (7d): ${count ?? 0}`);
}

process.exit(ok ? 0 : 1);
