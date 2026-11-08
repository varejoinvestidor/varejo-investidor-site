/**
 * Importa os 5 artigos editoriais JSON (content/insights/pt) para o Supabase.
 * Uso: npx tsx scripts/import-legacy-insights.ts
 * Requer .env.local com SUPABASE_SERVICE_ROLE_KEY e NEXT_PUBLIC_SUPABASE_URL
 */
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import type { InsightArticleRecord } from "../src/data/insights/types";
import { legacyBlocksToTipTap, LEGACY_CATEGORY_TO_PUBLISHER_SLUG } from "../src/publisher/import/legacyBlocksToTipTap";
import { absoluteSiteUrl } from "../src/config/site";

config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY em .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

async function main() {
  const dir = join(process.cwd(), "content", "insights", "pt");
  const files = readdirSync(dir).filter((f) => f.endsWith(".json"));

  const { data: categories } = await supabase.from("categories").select("id, slug");
  const categoryBySlug = new Map((categories ?? []).map((c) => [c.slug, c.id]));

  for (const file of files) {
    const raw = JSON.parse(readFileSync(join(dir, file), "utf8")) as InsightArticleRecord;
    const categorySlug = LEGACY_CATEGORY_TO_PUBLISHER_SLUG[raw.category] ?? "economia-global";
    const categoryId = categoryBySlug.get(categorySlug) ?? null;

    const cover = raw.image.startsWith("/") ? absoluteSiteUrl(raw.image) : raw.image;
    const content = legacyBlocksToTipTap(raw.blocks, raw.introduction);
    const translationGroupId = crypto.randomUUID();

    const { data: existing } = await supabase
      .from("articles")
      .select("id")
      .eq("language", "pt")
      .eq("slug", raw.slug)
      .maybeSingle();

    if (existing) {
      console.log(`Skip (exists): ${raw.slug}`);
      continue;
    }

    const { data: row, error } = await supabase
      .from("articles")
      .insert({
        translation_group_id: translationGroupId,
        title: raw.title,
        slug: raw.slug,
        subtitle: raw.subtitle,
        excerpt: raw.description,
        content,
        cover_image: cover,
        category_id: categoryId,
        language: "pt",
        status: raw.status === "published" ? "published" : "draft",
        source: "legacy_import",
        seo_title: raw.seoTitle,
        seo_description: raw.seoDescription,
        sources: raw.sources ?? [],
        featured: Boolean(raw.featured),
        published_at: raw.status === "published" ? new Date(raw.datePublished).toISOString() : null,
      })
      .select("id")
      .single();

    if (error || !row) {
      console.error(`Fail ${raw.slug}:`, error?.message);
      continue;
    }

    await supabase.from("article_translations").insert({
      translation_group_id: translationGroupId,
      article_id: row.id,
      language: "pt",
    });

    console.log(`Imported: ${raw.slug}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
