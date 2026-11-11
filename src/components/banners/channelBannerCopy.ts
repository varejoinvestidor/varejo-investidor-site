import {
  siteLocaleToWhatsAppLocale,
  whatsappLandingCopy,
  type WhatsAppLandingLocale,
} from "../../data/whatsappChannels";
import { withoutEmDash } from "./channelBannerText";

export type ChannelBannerCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
};

function localeKey(language: string): WhatsAppLandingLocale {
  const mapped = siteLocaleToWhatsAppLocale(language);
  if (mapped) return mapped;
  const norm = language.trim().toLowerCase();
  if (norm === "pt-pt") return "pt-pt";
  if (norm.startsWith("pt")) return "pt";
  const base = norm.split("-")[0] ?? norm;
  if (base in whatsappLandingCopy) return base as WhatsAppLandingLocale;
  return "en";
}

const FORMIGA_CHANNEL_TITLE: Partial<Record<WhatsAppLandingLocale, string>> = {
  pt: "Canal Formiga",
  "pt-pt": "Canal Formiga",
  en: "Ant Channel",
  es: "Canal Hormiga",
};

const LOBO_CHANNEL_TITLE: Partial<Record<WhatsAppLandingLocale, string>> = {
  pt: "Canal Lobo",
  "pt-pt": "Canal Lobo",
  en: "Wolf Channel",
  es: "Canal Lobo",
};

const FORMIGA_EYEBROW: Partial<Record<WhatsAppLandingLocale, string>> = {
  pt: "Jornada patrimonial",
  "pt-pt": "Jornada patrimonial",
  en: "Wealth journey",
  es: "Camino patrimonial",
};

const LOBO_EYEBROW: Partial<Record<WhatsAppLandingLocale, string>> = {
  pt: "Nível Lobo",
  "pt-pt": "Nível Lobo",
  en: "Wolf level",
  es: "Nivel Lobo",
};

function channelTitle(level: "formiga" | "lobo", key: WhatsAppLandingLocale): string {
  const pack = whatsappLandingCopy[key][level];
  const titled = level === "formiga" ? FORMIGA_CHANNEL_TITLE[key] : LOBO_CHANNEL_TITLE[key];
  if (titled) return titled;
  return `${pack.title} · WhatsApp`;
}

function channelEyebrow(level: "formiga" | "lobo", key: WhatsAppLandingLocale): string {
  const custom = level === "formiga" ? FORMIGA_EYEBROW[key] : LOBO_EYEBROW[key];
  if (custom) return custom;
  return whatsappLandingCopy[key][level].title;
}

export function formigaChannelBannerCopy(language: string): ChannelBannerCopy {
  const key = localeKey(language);
  const pack = whatsappLandingCopy[key].formiga;
  return {
    eyebrow: channelEyebrow("formiga", key),
    title: channelTitle("formiga", key),
    subtitle: withoutEmDash(pack.description),
    cta: pack.button,
  };
}

export function loboChannelBannerCopy(language: string): ChannelBannerCopy {
  const key = localeKey(language);
  const pack = whatsappLandingCopy[key].lobo;
  return {
    eyebrow: channelEyebrow("lobo", key),
    title: channelTitle("lobo", key),
    subtitle: withoutEmDash(pack.description),
    cta: pack.button,
  };
}
