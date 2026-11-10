import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const auth = JSON.parse(
  readFileSync(join(homedir(), "AppData", "Roaming", "com.vercel.cli", "Data", "auth.json"), "utf8"),
);
const teamId = "team_DOn8BXJdrOYBiIyxXCORgrmo";
const url = new URL("https://api.vercel.com/v9/projects/varejo-investidor-site-m9uy/env?decrypt=true");
url.searchParams.set("teamId", teamId);
const { envs } = await (await fetch(url, { headers: { Authorization: `Bearer ${auth.token}` } })).json();
for (const e of envs) {
  const v = e.value ?? "";
  const hint = v.includes("supabase.co")
    ? "HAS_SUPABASE_URL"
    : v.startsWith("eyJ")
      ? "jwt_blob"
      : v.slice(0, 8);
  console.log(e.key, hint);
}
