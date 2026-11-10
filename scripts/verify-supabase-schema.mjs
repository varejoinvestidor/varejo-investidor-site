/**
 * Verifica tabelas via API REST (anon). Uso: node --env-file=.env.local scripts/verify-supabase-schema.mjs
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

if (!url || !key) {
  console.error("Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY (ou SERVICE_ROLE).");
  process.exit(1);
}

const client = createClient(url, key, { auth: { persistSession: false } });

const tables = ["categories", "articles", "elite_operations", "elite_monthly_reports"];
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

process.exit(ok ? 0 : 1);
