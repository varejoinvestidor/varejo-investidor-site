/** Public production origin — used for sitemap, Open Graph, and JSON-LD. */
export const SITE_URL = "https://www.varejoinvestidor.com";

export const SITE_NAME = "Varejo Investidor";

export const SITE_DESCRIPTION =
  "Ecossistema global com sinais ao vivo, educação por níveis, análises de mercado e estrutura estratégica para investidores de varejo.";

export function absoluteSiteUrl(path = ""): string {
  if (!path) return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
