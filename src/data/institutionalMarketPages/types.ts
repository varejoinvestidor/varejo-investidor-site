import type { MarketSlug } from "../marketContent";

export type InstitutionalVisualItem = {
  label: string;
  detail?: string;
};

export type InstitutionalSection = {
  id: string;
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  cards?: { title: string; text: string }[];
  visualGrid?: InstitutionalVisualItem[];
  disclaimer?: string;
};

export type InstitutionalMarketPage = {
  slug: MarketSlug;
  hero: {
    title: string;
    subtitle: string;
    image: string;
    imageAlt: string;
  };
  metaTitle: string;
  metaDescription: string;
  sections: InstitutionalSection[];
  showForexBroker?: boolean;
  showCryptoBroker?: boolean;
};

export const marketHeroImages: Record<
  Exclude<MarketSlug, "commodities" | "fundos-imobiliarios">,
  { src: string; altPt: string; altEn: string }
> = {
  acoes: {
    src: "/characters/services-hero-institutional.png",
    altPt: "Infraestrutura institucional e mesa financeira global",
    altEn: "Institutional trading floor and global finance infrastructure",
  },
  forex: {
    src: "/characters/home-hero-institutional.png",
    altPt: "Centros financeiros globais e mercado de câmbio",
    altEn: "Global financial centers and foreign exchange",
  },
  etfs: {
    src: "/characters/home-structure-horizontal-cutout.png",
    altPt: "Diversificação global e alocação por índices e setores",
    altEn: "Global diversification across indices and sectors",
  },
  ouro: {
    src: "/characters/about-hero-institutional.png",
    altPt: "Reservas de valor e infraestrutura patrimonial",
    altEn: "Store of value and institutional wealth infrastructure",
  },
  petroleo: {
    src: "/characters/about-hero-institutional-cutout.png",
    altPt: "Cadeia energética global e infraestrutura de petróleo",
    altEn: "Global energy chain and oil infrastructure",
  },
  cripto: {
    src: "/characters/education-formation-premium.png",
    altPt: "Economia digital e infraestrutura blockchain",
    altEn: "Digital economy and blockchain infrastructure",
  },
};
