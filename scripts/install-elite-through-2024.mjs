/**
 * Aplica 2019–2024 (+ meses 2018 out–dez via script dedicado).
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const node = process.execPath;
const env = { ...process.env };
const years = [2019, 2020, 2021, 2022, 2023, 2024];

for (const year of years) {
  const r = spawnSync(node, [join(root, "scripts", "install-elite-year.mjs"), String(year)], {
    cwd: root,
    env,
    stdio: "inherit",
    shell: false,
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const r2018 = spawnSync(node, [join(root, "scripts", "install-elite-year-2018.mjs")], {
  cwd: root,
  env,
  stdio: "inherit",
});
if (r2018.status !== 0) process.exit(r2018.status ?? 1);

console.log("Concluído 2018 (out–dez) + 2019–2024.");
