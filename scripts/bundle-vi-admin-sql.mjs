import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), "supabase", "migrations");
const files = [
  "20260318150000_article_youtube_videos.sql",
  "20260318120000_vi_analytics.sql",
  "20260319120000_vi_analytics_regions.sql",
  "20260320120000_vi_analytics_top_clicks_fix.sql",
];

const parts = ["-- RUN_VI_ADMIN_READY — cole no Supabase SQL Editor e execute (idempotente parcial)\n"];
for (const f of files) {
  parts.push(`\n-- === ${f} ===\n`);
  parts.push(readFileSync(join(root, f), "utf8"));
}
parts.push("\nnotify pgrst, 'reload schema';\n");
writeFileSync(join(root, "RUN_VI_ADMIN_READY.sql"), parts.join(""));
console.log("Wrote supabase/migrations/RUN_VI_ADMIN_READY.sql");
