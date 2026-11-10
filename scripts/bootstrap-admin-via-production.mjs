import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const email = process.env.ADMIN_EMAIL?.trim();
const password = process.env.ADMIN_PASSWORD;
if (!email || !password) {
  console.error("ADMIN_EMAIL e ADMIN_PASSWORD obrigatórios.");
  process.exit(1);
}

const auth = JSON.parse(
  readFileSync(join(homedir(), "AppData", "Roaming", "com.vercel.cli", "Data", "auth.json"), "utf8"),
);
const teamId = "team_DOn8BXJdrOYBiIyxXCORgrmo";
const url = new URL("https://api.vercel.com/v9/projects/varejo-investidor-site-m9uy/env?decrypt=true");
url.searchParams.set("teamId", teamId);
const { envs } = await (await fetch(url, { headers: { Authorization: `Bearer ${auth.token}` } })).json();
const cron = envs.find((e) => e.key === "CRON_SECRET")?.value ?? "";
if (!cron) {
  console.error("CRON_SECRET não encontrado na Vercel.");
  process.exit(1);
}

const res = await fetch("https://www.varejoinvestidor.com/api/publisher/bootstrap-admin", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${cron}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password, fullName: "Viniiip" }),
});

const text = await res.text();
let json;
try {
  json = JSON.parse(text);
} catch {
  json = { raw: text };
}

if (!res.ok) {
  console.error("Falha", res.status, json);
  process.exit(1);
}

console.log("OK:", json.email ?? email);
console.log("https://www.varejoinvestidor.com/admin/login");
