import { fxproLinks } from "../../data/fxproLinks";
import type { ArticleBanner, ArticleBannerPreset } from "../types/banner";
import { getFormigaChannelUrl, getLoboChannelUrl } from "../../data/whatsappChannels";

const BINANCE_URL = "https://accounts.binance.com/register?ref=453580362";

const FXPRO_BANNER_PT =
  "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-pt-fscm-1324x150.png";
const FXPRO_BANNER_EN =
  "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png";
const FXPRO_BANNER_ES =
  "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-es-fscm-1324x150.png";

export const ARTICLE_BANNER_PRESETS: {
  id: ArticleBannerPreset;
  label: string;
  description: string;
}[] = [
  { id: "formiga", label: "Canal Formiga", description: "WhatsApp gratuito · nível inicial" },
  { id: "lobo", label: "Canal Lobo", description: "WhatsApp · nível intermediário" },
  { id: "fxpro", label: "FxPro", description: "Banner corretora Forex (site)" },
  { id: "binance", label: "Binance", description: "Conta cripto · afiliado" },
];

function fxproBannerImage(language: string): string {
  if (language === "pt") return FXPRO_BANNER_PT;
  if (language === "es") return FXPRO_BANNER_ES;
  return FXPRO_BANNER_EN;
}

const FORMIGA_FALLBACK = "https://whatsapp.com/channel/0029Va9J7SAAO7R8cN76Ib13";

export function resolveArticleBanner(banner: ArticleBanner, language: string): ArticleBanner {
  if (!banner.preset) return banner;

  const lang = language.startsWith("pt") ? "pt" : language.startsWith("es") ? "es" : language;
  switch (banner.preset) {
    case "formiga":
      return {
        ...banner,
        image_url: "/banners/canal-formiga.svg",
        alt: "Canal Formiga · Varejo Investidor",
        href: getFormigaChannelUrl(lang, FORMIGA_FALLBACK),
      };
    case "lobo": {
      const lobo = getLoboChannelUrl(lang) ?? getLoboChannelUrl("pt") ?? getFormigaChannelUrl(lang, FORMIGA_FALLBACK);
      return {
        ...banner,
        image_url: "/banners/canal-lobo.svg",
        alt: "Canal Lobo · Varejo Investidor",
        href: lobo,
      };
    }
    case "fxpro":
      return {
        ...banner,
        image_url: fxproBannerImage(lang),
        alt: "FxPro",
        href: fxproLinks[lang as keyof typeof fxproLinks] ?? fxproLinks.en,
      };
    case "binance":
      return {
        ...banner,
        image_url: "/banners/binance.svg",
        alt: "Binance",
        href: BINANCE_URL,
      };
    default:
      return banner;
  }
}

export function bannerFromPreset(
  preset: ArticleBannerPreset,
  placement: ArticleBanner["placement"] = "bottom",
): ArticleBanner {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `preset-${preset}-${Date.now()}`;
  const meta = ARTICLE_BANNER_PRESETS.find((p) => p.id === preset);
  return {
    id,
    preset,
    image_url: "",
    alt: meta?.label ?? preset,
    placement,
  };
}
