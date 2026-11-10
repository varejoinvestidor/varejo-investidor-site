/**
 * Cria usuário admin via Supabase Admin API (service role na Vercel m9uy).
 * Uso: $env:ADMIN_EMAIL="..."; $env:ADMIN_PASSWORD="..."; node scripts/create-publisher-admin.mjs
 */
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

const email = process.env.ADMIN_EMAIL?.trim();
const password = process.env.ADMIN_PASSWORD;
if (!email || !password) {
  console.error("Defina ADMIN_EMAIL e ADMIN_PASSWORD no ambiente.");
  process.exit(1);
}

const auth = JSON.parse(
  readFileSync(join(homedir(), "AppData", "Roaming", "com.vercel.cli", "Data", "auth.json"), "utf8"),
);
const teamId = "team_DOn8BXJdrOYBiIyxXCORgrmo";
const project = "varejo-investidor-site-m9uy";

async function getEnv(key) {
  const url = new URL(`https://api.vercel.com/v9/projects/${project}/env?decrypt=true`);
  url.searchParams.set("teamId", teamId);
  const res = await fetch(url, { headers: { Authorization: `Bearer ${auth.token}` } });
  const { envs } = await res.json();
  const e = envs.find((x) => x.key === key);
  return e?.value ?? "";
}

const supabaseUrl = await getEnv("NEXT_PUBLIC_SUPABASE_URL");
const serviceKey = await getEnv("SUPABASE_SERVICE_ROLE_KEY");

if (!supabaseUrl?.includes("supabase.co") && !supabaseUrl?.startsWith("http")) {
  console.error("NEXT_PUBLIC_SUPABASE_URL inválida ou criptografada; use o dashboard Supabase.");
  process.exit(1);
}

const admin = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data: existing } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
const found = existing?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase());

let userId = found?.id;

if (!userId) {
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) {
    console.error("createUser:", error.message);
    process.exit(1);
  }
  userId = data.user.id;
  console.log("Usuário criado.");
} else {
  const { error } = await admin.auth.admin.updateUserById(userId, { password, email_confirm: true });
  if (error) {
    console.error("updateUser:", error.message);
    process.exit(1);
  }
  console.log("Usuário já existia; senha atualizada.");
}

const { error: profileError } = await admin
  .from("profiles")
  .update({ role: "admin", full_name: "Viniiip", email })
  .eq("id", userId);

if (profileError) {
  const { error: upsertError } = await admin.from("profiles").upsert({
    id: userId,
    email,
    full_name: "Viniiip",
    role: "admin",
  });
  if (upsertError) {
    console.error("profiles:", upsertError.message);
    process.exit(1);
  }
}

console.log("Admin OK:", email);
console.log("Login: https://www.varejoinvestidor.com/admin/login");
