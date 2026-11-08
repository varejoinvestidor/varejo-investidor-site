import { absoluteSiteUrl } from "../../../src/config/site";
import { getInsightsPath, getPostsByLocale, insightsHero } from "../../../src/data/insightsContent";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function GET() {
  const locale = "pt" as const;
  const posts = getPostsByLocale(locale).slice(0, 40);
  const hero = insightsHero[locale];
  const channelUrl = absoluteSiteUrl(getInsightsPath(locale));

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${absoluteSiteUrl(getInsightsPath(locale, post.slug))}</link>
      <guid isPermaLink="true">${absoluteSiteUrl(getInsightsPath(locale, post.slug))}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(hero.title)} | Varejo Investidor</title>
    <link>${channelUrl}</link>
    <description>${escapeXml(hero.metaDescription)}</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
