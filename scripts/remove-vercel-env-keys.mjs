import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const project = process.argv[2] ?? "varejo-investidor-site-m9uy";
const keys = process.argv.slice(3);
const root = join(homedir(), "OneDrive", "Documentos", "varejo-investidor-site");

for (const key of keys) {
  console.log(`Removing ${key} from ${project}...`);
  spawnSync("npx", ["vercel", "env", "rm", key, "production", "-y"], { cwd: root, shell: true, stdio: "inherit" });
  spawnSync("npx", ["vercel", "env", "rm", key, "preview", "-y"], { cwd: root, shell: true, stdio: "inherit" });
  spawnSync("npx", ["vercel", "env", "rm", key, "development", "-y"], { cwd: root, shell: true, stdio: "inherit" });
}
