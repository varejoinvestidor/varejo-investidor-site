/**
 * Copia env vars de um projeto Vercel para outro (mesmo team).
 * Uso local apenas — não commitar tokens.
 */
import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const authPath = join(homedir(), "AppData", "Roaming", "com.vercel.cli", "Data", "auth.json");
const auth = JSON.parse(readFileSync(authPath, "utf8"));
const token = auth.token;
const teamId = auth.team?.id ?? process.env.VERCEL_TEAM_ID ?? "team_DOn8BXJdrOYBiIyxXCORgrmo";

const SOURCE = "varejo-investidor-site";
const TARGET = "varejo-investidor-site-m9uy";

const EXTRA = {
  PUBLISHER_SITE_TIMEZONE: "America/Sao_Paulo",
};

async function api(path, init = {}) {
  const url = new URL(`https://api.vercel.com${path}`);
  if (teamId) url.searchParams.set("teamId", teamId);
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${res.status} ${path}: ${JSON.stringify(body)}`);
  return body;
}

async function main() {
  const list = await api(`/v9/projects/${SOURCE}/env?decrypt=true`);
  const envs = list.envs ?? [];

  const targetList = await api(`/v9/projects/${TARGET}/env?decrypt=true`);
  const existing = new Set((targetList.envs ?? []).map((e) => e.key));

  let created = 0;
  for (const entry of envs) {
    if (existing.has(entry.key)) continue;
    await api(`/v10/projects/${TARGET}/env`, {
      method: "POST",
      body: JSON.stringify({
        key: entry.key,
        value: entry.value,
        type: entry.type ?? "encrypted",
        target: entry.target ?? ["production", "preview", "development"],
      }),
    });
    console.log(`+ ${entry.key}`);
    created++;
  }

  for (const [key, value] of Object.entries(EXTRA)) {
    if (existing.has(key)) continue;
    await api(`/v10/projects/${TARGET}/env`, {
      method: "POST",
      body: JSON.stringify({
        key,
        value,
        type: "encrypted",
        target: ["production", "preview", "development"],
      }),
    });
    console.log(`+ ${key}`);
    created++;
  }

  if (!existing.has("CRON_SECRET") && !envs.find((e) => e.key === "CRON_SECRET")) {
    const secret = randomUUID().replace(/-/g, "") + randomUUID().replace(/-/g, "");
    await api(`/v10/projects/${TARGET}/env`, {
      method: "POST",
      body: JSON.stringify({
        key: "CRON_SECRET",
        value: secret,
        type: "encrypted",
        target: ["production", "preview", "development"],
      }),
    });
    console.log("+ CRON_SECRET (gerado)");
    created++;
  }

  console.log(`\nConcluído: ${created} variável(is) adicionada(s) em ${TARGET}.`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
