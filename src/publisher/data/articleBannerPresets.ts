import { fxproLinks } from "../../data/fxproLinks";
import { isSupportedLocale, type SupportedLocale } from "../../i18n/locales";
import { localizedPath } from "../../i18n/routing";
import type { ArticleBanner, ArticleBannerPreset } from "../types/banner";
import { inferChannelBannerPreset } from "../types/banner";
import { getFormigaChannelUrl, getLoboChannelUrlWithFallback } from "../../data/whatsappChannels";

const BINANCE_URL = "https://accounts.binance.com/register?ref=453580362";

const FXPRO_BANNER_PT =
  "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-pt-fscm-1324x150.png";
const FXPRO_BANNER_EN =
  "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png";
const FXPRO_BANNER_ES =
  "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-es-fscm-1324x150.png";

/** Faixas 1324×150 alinhadas às seções da home (personagens em `/characters`). */
export const PRODUCT_STRIP_BANNER_ASSETS: Record<
  Exclude<ArticleBannerPreset, "fxpro" | "binance">,
  { image: string; alt: string }
> = {
  formiga: {
    image: "/characters/education-formation-premium.png",
    alt: "Canal Formiga · banner alto com botão · Varejo Investidor",
  },
  lobo: {
    image: "/characters/home-hero-official-20260527.png",
    alt: "Canal Lobo · modelo A · Varejo Investidor",
  },
  elite: {
    image: "/characters/services-hero-institutional.png",
    alt: "Canal Elite Harpia · Research · Varejo Investidor",
  },
  educacao: {
    image: "/banners/base-educacional.svg",
    alt: "Base educacional Formiga, Lobo e Harpia",
  },
  select: {
    image: "/banners/faixa-select.svg",
    alt: "Select · estratégia patrimonial Varejo Investidor",
  },
  private: {
    image: "/banners/faixa-private.svg",
    alt: "Private · estrutura patrimonial internacional",
  },
};

export const ARTICLE_BANNER_PRESETS: {
  id: ArticleBannerPreset;
  label: string;
  description: string;
}[] = [
  { id: "formiga", label: "Canal Formiga", description: "Banner alto + botão WhatsApp (componente React)" },
  { id: "lobo", label: "Canal Lobo", description: "Banner alto + botão WhatsApp (modelo A)" },
  { id: "elite", label: "Canal Elite", description: "Banner alto → página Research (/sinais)" },
  { id: "educacao", label: "Base educacional", description: "Faixa home · Formação / educação" },
  { id: "select", label: "Select", description: "Faixa home · patrimônio US$ 50k+" },
  { id: "private", label: "Private", description: "Faixa home · patrimônio US$ 1M+" },
  { id: "fxpro", label: "FxPro", description: "Banner corretora Forex (site)" },
  { id: "binance", label: "Binance", description: "Conta cripto · afiliado" },
];

function bannerLocale(language: string): SupportedLocale {
  const base = language.split("-")[0]?.toLowerCase() ?? "pt";
  return isSupportedLocale(base) ? base : "pt";
}

function fxproBannerImage(language: string): string {
  if (language === "pt") return FXPRO_BANNER_PT;
  if (language === "es") return FXPRO_BANNER_ES;
  return FXPRO_BANNER_EN;
}

const FORMIGA_FALLBACK = "https://whatsapp.com/channel/0029Va9J7SAAO7R8cN76Ib13";

export function resolveArticleBanner(banner: ArticleBanner, language: string): ArticleBanner {
  const preset = banner.preset ?? inferChannelBannerPreset(banner);
  if (!preset) return banner;

  const lang = language.startsWith("pt") ? "pt" : language.startsWith("es") ? "es" : language;
  const locale = bannerLocale(language);
  switch (preset) {
    case "formiga":
      return {
        ...banner,
        preset: "formiga",
        image_url: PRODUCT_STRIP_BANNER_ASSETS.formiga.image,
        alt: PRODUCT_STRIP_BANNER_ASSETS.formiga.alt,
        href: getFormigaChannelUrl(lang, FORMIGA_FALLBACK),
      };
    case "lobo":
      return {
        ...banner,
        preset: "lobo",
        image_url: PRODUCT_STRIP_BANNER_ASSETS.lobo.image,
        alt: PRODUCT_STRIP_BANNER_ASSETS.lobo.alt,
        href: getLoboChannelUrlWithFallback(lang),
      };
    case "elite":
      return {
        ...banner,
        preset: "elite",
        image_url: PRODUCT_STRIP_BANNER_ASSETS.elite.image,
        alt: PRODUCT_STRIP_BANNER_ASSETS.elite.alt,
        href: localizedPath("/sinais", locale),
      };
    case "educacao":
      return {
        ...banner,
        image_url: PRODUCT_STRIP_BANNER_ASSETS.educacao.image,
        alt: PRODUCT_STRIP_BANNER_ASSETS.educacao.alt,
        href: localizedPath("/educacao", locale),
      };
    case "select":
      return {
        ...banner,
        image_url: PRODUCT_STRIP_BANNER_ASSETS.select.image,
        alt: PRODUCT_STRIP_BANNER_ASSETS.select.alt,
        href: localizedPath("/select", locale),
      };
    case "private":
      return {
        ...banner,
        image_url: PRODUCT_STRIP_BANNER_ASSETS.private.image,
        alt: PRODUCT_STRIP_BANNER_ASSETS.private.alt,
        href: localizedPath("/private", locale),
      };
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
