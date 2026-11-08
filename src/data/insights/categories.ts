import type { Locale } from "../../i18n";
import type { InsightCategoryKey } from "./types";

const ptLabels: Record<InsightCategoryKey, string> = {
  "global-economy": "Economia global",
  "monetary-policy": "Política monetária",
  forex: "Forex",
  stocks: "Ações internacionais",
  crypto: "Criptomoedas",
  "gold-metals": "Ouro e metais",
  "oil-energy": "Petróleo e energia",
  etfs: "ETFs e fundos",
  geopolitics: "Geopolítica",
  risk: "Gestão de risco",
  wealth: "Construção patrimonial",
};

const enLabels: Record<InsightCategoryKey, string> = {
  "global-economy": "Global economy",
  "monetary-policy": "Monetary policy",
  forex: "Forex",
  stocks: "International stocks",
  crypto: "Cryptocurrencies",
  "gold-metals": "Gold and metals",
  "oil-energy": "Oil and energy",
  etfs: "ETFs and funds",
  geopolitics: "Geopolitics",
  risk: "Risk management",
  wealth: "Wealth building",
};

const esLabels: Record<InsightCategoryKey, string> = {
  "global-economy": "Economía global",
  "monetary-policy": "Política monetaria",
  forex: "Forex",
  stocks: "Acciones internacionales",
  crypto: "Criptomonedas",
  "gold-metals": "Oro y metales",
  "oil-energy": "Petróleo y energía",
  etfs: "ETFs y fondos",
  geopolitics: "Geopolítica",
  risk: "Gestión de riesgo",
  wealth: "Construcción patrimonial",
};

const labelsByLocale: Partial<Record<Locale, Record<InsightCategoryKey, string>>> = {
  pt: ptLabels,
  en: enLabels,
  es: esLabels,
};

export const insightCategoryKeys: InsightCategoryKey[] = [
  "global-economy",
  "monetary-policy",
  "forex",
  "stocks",
  "crypto",
  "gold-metals",
  "oil-energy",
  "etfs",
  "geopolitics",
  "risk",
  "wealth",
];

export function getCategoryLabel(locale: Locale, key: InsightCategoryKey): string {
  return labelsByLocale[locale]?.[key] ?? enLabels[key];
}

export const insightCategories: Record<Locale, Record<InsightCategoryKey, string>> = new Proxy(
  {} as Record<Locale, Record<InsightCategoryKey, string>>,
  {
    get(_target, prop: string) {
      const locale = prop as Locale;
      return Object.fromEntries(
        insightCategoryKeys.map((key) => [key, getCategoryLabel(locale, key)]),
      ) as Record<InsightCategoryKey, string>;
    },
  },
);

/** Maps legacy hub keys from early builds to the expanded taxonomy. */
export function migrateLegacyCategory(
  legacy:
    | InsightCategoryKey
    | "macro"
    | "commodities"
    | "stocks"
    | "forex"
    | "crypto"
    | "etfs"
    | "risk"
    | "wealth",
): InsightCategoryKey {
  if (legacy === "macro") return "global-economy";
  if (legacy === "commodities") return "gold-metals";
  return legacy as InsightCategoryKey;
}
