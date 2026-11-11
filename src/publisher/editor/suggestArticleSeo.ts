import { withoutEmDash } from "../../components/banners/channelBannerText";
import { collectTipTapPlainText } from "../public/tiptapPlainText";

const SEO_TITLE_MAX = 60;
const SEO_DESCRIPTION_MAX = 158;

function truncateAtWord(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > 24 ? slice.slice(0, lastSpace) : slice).trim();
}

export function suggestArticleSeo(input: {
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  content: Record<string, unknown>;
}): { seo_title: string; seo_description: string } {
  const body = collectTipTapPlainText(input.content).join(" ").replace(/\s+/g, " ").trim();
  const lead =
    input.excerpt?.trim() ||
    input.subtitle?.trim() ||
    body.split(/[.!?]/)[0]?.trim() ||
    body;

  const seo_title = truncateAtWord(input.title.trim() || "Artigo Varejo Investidor", SEO_TITLE_MAX);
  const seo_description = withoutEmDash(truncateAtWord(lead, SEO_DESCRIPTION_MAX));

  return { seo_title, seo_description };
}
