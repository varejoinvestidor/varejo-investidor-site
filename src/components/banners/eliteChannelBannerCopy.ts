import { translations } from "../../i18n";
import { isSupportedLocale, type SupportedLocale } from "../../i18n/locales";
import { withoutEmDash } from "./channelBannerText";

export type ChannelBannerCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
};

const ELITE_TITLE: Partial<Record<SupportedLocale, string>> = {
  pt: "Canal Elite Harpia",
  en: "Elite Channel",
  es: "Canal Elite Harpia",
};

function localeKey(language: string): SupportedLocale {
  const base = language.split("-")[0]?.toLowerCase() ?? "pt";
  return isSupportedLocale(base) ? base : "en";
}

export function eliteChannelBannerCopy(language: string): ChannelBannerCopy {
  const locale = localeKey(language);
  const t = translations[locale];
  const eyebrow = t.signalBlock.eyebrow.replace(/\s*\|\s*/g, " · ");
  return {
    eyebrow,
    title: ELITE_TITLE[locale] ?? "Elite Channel",
    subtitle: withoutEmDash(t.pricing?.text ?? t.cta.text),
    cta: t.nav.access ?? t.cta.button,
  };
}
