import type { Locale } from "../i18n";
import { getYoutubeChannelUrl } from "./youtubeChannels";

export type SiteSocialLink = {
  id: string;
  label: string;
  href: string;
};

function articleLanguageToLocale(language: string): Locale {
  const base = language.split("-")[0]?.toLowerCase() ?? "pt";
  if (base === "pt" || base === "en" || base === "es") return base;
  return base as Locale;
}

const SOCIAL_LABELS: Record<string, { follow: string }> = {
  pt: { follow: "Siga-nos" },
  en: { follow: "Follow us" },
  es: { follow: "Síguenos" },
  fr: { follow: "Suivez-nous" },
  de: { follow: "Folgen Sie uns" },
  it: { follow: "Seguici" },
};

export function socialFollowLabel(language: string): string {
  const key = articleLanguageToLocale(language).split("-")[0];
  return SOCIAL_LABELS[key]?.follow ?? SOCIAL_LABELS.en.follow;
}

export function getSiteSocialLinksForLanguage(language: string): SiteSocialLink[] {
  const locale = articleLanguageToLocale(language);

  const links: SiteSocialLink[] = [
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/varejoinvestidorbrasil/",
    },
    {
      id: "youtube",
      label: "YouTube",
      href: getYoutubeChannelUrl(locale as Locale),
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/5519983393147",
    },
    {
      id: "x",
      label: "X",
      href: "https://x.com/varejoinvest",
    },
  ];

  if (locale === "pt") {
    links.push({
      id: "tiktok",
      label: "TikTok",
      href: "https://www.tiktok.com/@varejoinvestidor",
    });
  }

  return links;
}
