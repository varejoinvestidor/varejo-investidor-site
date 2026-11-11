import {
  siteLocaleToWhatsAppLocale,
  whatsappLandingCopy,
  type WhatsAppLandingLocale,
} from "../../data/whatsappChannels";

export type ChannelBannerCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
};

function localeKey(language: string): WhatsAppLandingLocale {
  const mapped = siteLocaleToWhatsAppLocale(language);
  if (mapped) return mapped;
  if (language.startsWith("pt")) return "pt";
  if (language.startsWith("es")) return "es";
  if (language in whatsappLandingCopy) return language as WhatsAppLandingLocale;
  return "en";
}

export function formigaChannelBannerCopy(language: string): ChannelBannerCopy {
  const key = localeKey(language);
  const pack = whatsappLandingCopy[key].formiga;
  const pt = key === "pt" || key === "pt-pt";
  return {
    eyebrow: pt ? "Jornada patrimonial" : key === "es" ? "Camino patrimonial" : "Wealth journey",
    title: pt ? "Canal Formiga" : key === "es" ? "Canal Hormiga" : key === "en" ? "Ant Channel" : `Canal ${pack.title}`,
    subtitle: pack.description,
    cta: pack.button,
  };
}

export function loboChannelBannerCopy(language: string): ChannelBannerCopy {
  const key = localeKey(language);
  const pack = whatsappLandingCopy[key].lobo;
  const pt = key === "pt" || key === "pt-pt";
  return {
    eyebrow: pt ? "Nível Lobo" : key === "es" ? "Nivel Lobo" : key === "en" ? "Wolf level" : "Lobo",
    title: pt ? "Canal Lobo" : key === "es" ? "Canal Lobo" : key === "en" ? "Wolf Channel" : `Canal ${pack.title}`,
    subtitle: pack.description,
    cta: pack.button,
  };
}
