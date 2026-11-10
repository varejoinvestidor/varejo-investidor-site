import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const auth = JSON.parse(
  readFileSync(join(homedir(), "AppData", "Roaming", "com.vercel.cli", "Data", "auth.json"), "utf8"),
);
const teamId = "team_DOn8BXJdrOYBiIyxXCORgrmo";
const project = process.argv[2] ?? "varejo-investidor-site-m9uy";
const keys = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
];

const url = new URL(`https://api.vercel.com/v9/projects/${project}/env?decrypt=true`);
url.searchParams.set("teamId", teamId);
const res = await fetch(url, { headers: { Authorization: `Bearer ${auth.token}` } });
const { envs } = await res.json();
for (const k of keys) {
  const e = envs.find((x) => x.key === k);
  const v = e?.value ?? "";
  console.log(`${k}: ${v ? `set (${v.length} chars, starts ${v.slice(0, 30)}...)` : "EMPTY"}`);
}
