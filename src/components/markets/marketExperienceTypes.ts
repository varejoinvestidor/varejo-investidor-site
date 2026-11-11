import type { MarketSlug } from "../../data/marketContent";

export type MarketExperienceCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  flowTitle: string;
  flowSteps: string[];
  stackTitle: string;
  stackItems: { label: string; detail: string }[];
  compareTitle: string;
  leftCard: { title: string; points: string[] };
  rightCard: { title: string; points: string[] };
  metricsTitle: string;
  metricsHint: string;
  metrics: { symbol: string; value: string; change: string; tone: "rise" | "bear" }[];
  cycleTitle: string;
  cyclePhases: { phase: string; detail: string; tone: string }[];
};

export type MarketExperienceSlug = Extract<
  MarketSlug,
  "acoes" | "etfs" | "ouro" | "petroleo" | "commodities" | "fundos-imobiliarios"
>;

export const MARKET_EXPERIENCE_SLUGS: MarketExperienceSlug[] = [
  "acoes",
  "etfs",
  "ouro",
  "petroleo",
  "commodities",
  "fundos-imobiliarios",
];
