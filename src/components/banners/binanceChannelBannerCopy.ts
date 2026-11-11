import { isSupportedLocale, type SupportedLocale } from "../../i18n/locales";
import { withoutEmDash } from "./channelBannerText";
import type { ChannelBannerCopy } from "./channelBannerCopy";

const COPY: Partial<Record<SupportedLocale, ChannelBannerCopy>> = {
  pt: {
    eyebrow: "Varejo Investidor · Cripto",
    title: "Binance",
    subtitle: withoutEmDash(
      "Abra conta na maior exchange do mundo com onboarding rápido, mercado spot e estrutura para evoluir custódia e gestão de risco.",
    ),
    cta: "Criar conta Binance",
  },
  en: {
    eyebrow: "Varejo Investidor · Crypto",
    title: "Binance",
    subtitle:
      "Open an account on the world's largest exchange with fast onboarding, spot markets and room to grow custody and risk discipline.",
    cta: "Create Binance account",
  },
  es: {
    eyebrow: "Varejo Investidor · Cripto",
    title: "Binance",
    subtitle:
      "Abre cuenta en el exchange más grande del mundo: onboarding rápido, spot y base para custodia y gestión de riesgo.",
    cta: "Crear cuenta Binance",
  },
};

export function binanceChannelBannerCopy(language: string): ChannelBannerCopy {
  const base = language.split("-")[0]?.toLowerCase() ?? "pt";
  const locale = isSupportedLocale(base) ? base : "pt";
  return COPY[locale] ?? COPY.en ?? COPY.pt!;
}
