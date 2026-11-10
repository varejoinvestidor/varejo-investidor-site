import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = [
  { dir: "artigos", language: "pt", pageLocale: "pt" },
  { dir: "en/artigos", language: "en", pageLocale: "en" },
  { dir: "global-articles", language: "en", pageLocale: "en" },
  { dir: "global-insights", language: "en", pageLocale: "en" },
  { dir: "articulos-globales", language: "es", pageLocale: "es" },
  { dir: "insights-globales", language: "es", pageLocale: "es" },
  { dir: "insights-globais", language: "pt", pageLocale: "pt" },
  { dir: "global-articles-hi", language: "hi", pageLocale: "hi" },
  { dir: "global-insights-hi", language: "hi", pageLocale: "hi" },
  { dir: "fr/articles", language: "fr", pageLocale: "fr" },
  { dir: "de/articles", language: "de", pageLocale: "de" },
  { dir: "it/articles", language: "it", pageLocale: "it" },
  { dir: "fa/articles", language: "fa", pageLocale: "fa" },
  { dir: "pl/articles", language: "pl", pageLocale: "pl" },
  { dir: "zh/articles", language: "zh", pageLocale: "zh" },
  { dir: "ja/articles", language: "ja", pageLocale: "ja" },
  { dir: "ja/insights", language: "ja", pageLocale: "ja" },
  { dir: "ko/articles", language: "ko", pageLocale: "ko" },
  { dir: "ko/insights", language: "ko", pageLocale: "ko" },
  { dir: "ru/articles", language: "ru", pageLocale: "ru" },
  { dir: "ru/insights", language: "ru", pageLocale: "ru" },
  { dir: "ur/articles", language: "ur", pageLocale: "ur" },
  { dir: "ur/insights", language: "ur", pageLocale: "ur" },
  { dir: "bn/articles", language: "bn", pageLocale: "bn" },
  { dir: "bn/insights", language: "bn", pageLocale: "bn" },
  { dir: "th/articles", language: "th", pageLocale: "th" },
  { dir: "th/insights", language: "th", pageLocale: "th" },
  { dir: "vi/articles", language: "vi", pageLocale: "vi" },
  { dir: "vi/insights", language: "vi", pageLocale: "vi" },
  { dir: "id/articles", language: "id", pageLocale: "id" },
  { dir: "id/insights", language: "id", pageLocale: "id" },
  { dir: "tl/articles", language: "tl", pageLocale: "tl" },
  { dir: "ar/global-articles", language: "ar", pageLocale: "ar" },
  { dir: "ar/global-insights", language: "ar", pageLocale: "ar" },
  { dir: "tr/global-articles", language: "tr", pageLocale: "tr" },
  { dir: "tr/global-insights", language: "tr", pageLocale: "tr" },
  { dir: "he/global-articles", language: "he", pageLocale: "he" },
  { dir: "he/global-insights", language: "he", pageLocale: "he" },
];

function importDepth(dir) {
  return dir.split("/").length;
}

function relImport(levels, tail) {
  return `${"../".repeat(levels)}${tail}`;
}

function hubPage({ dir, language, pageLocale }) {
  const levels = importDepth(dir);
  const routes = relImport(levels + 1, "src/publisher/public/articleRoutes");
  const css = relImport(levels, "insights-research.css");
  return `import {
  createPublisherHubMetadata,
  PublisherArticlesHubPage,
  PUBLISHER_ARTICLE_REVALIDATE,
} from "${routes}";
import "${css}";

export const revalidate = PUBLISHER_ARTICLE_REVALIDATE;

export const metadata = createPublisherHubMetadata("${language}", "${pageLocale}");

export default async function PublisherArticlesHub() {
  return PublisherArticlesHubPage({ language: "${language}", pageLocale: "${pageLocale}" });
}
`;
}

function slugPage({ dir, language, pageLocale }) {
  const cssLevels = importDepth(dir) + 1;
  const routes = relImport(cssLevels + 1, "src/publisher/public/articleRoutes");
  const css = relImport(cssLevels, "insights-research.css");
  return `import {
  createPublisherSlugMetadata,
  PublisherArticleSlugPage,
  PUBLISHER_ARTICLE_REVALIDATE,
  staticParamsForPublisherAndLegacy,
} from "${routes}";
import "${css}";

export const revalidate = PUBLISHER_ARTICLE_REVALIDATE;

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return staticParamsForPublisherAndLegacy("${language}", "${pageLocale}");
}

export async function generateMetadata({ params }: Props) {
  return createPublisherSlugMetadata("${language}", "${pageLocale}", params.slug);
}

export default async function PublisherArticleSlug({ params }: Props) {
  return PublisherArticleSlugPage({ language: "${language}", pageLocale: "${pageLocale}", slug: params.slug });
}
`;
}

for (const entry of manifest) {
  const hubPath = join(root, "app", entry.dir, "page.tsx");
  const slugPath = join(root, "app", entry.dir, "[slug]", "page.tsx");
  mkdirSync(dirname(hubPath), { recursive: true });
  mkdirSync(dirname(slugPath), { recursive: true });
  writeFileSync(hubPath, hubPage(entry), "utf8");
  writeFileSync(slugPath, slugPage(entry), "utf8");
  console.log("synced", entry.dir);
}
