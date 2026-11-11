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
    /** Recortes PNG: evita cortar personagens no hero. */
    imageFit?: "cover" | "contain";
    imagePanelClass?: string;
  };
  metaTitle: string;
  metaDescription: string;
  sections: InstitutionalSection[];
  showForexBroker?: boolean;
  showCryptoBroker?: boolean;
};

export const marketHeroImages: Record<
  Exclude<MarketSlug, "fundos-imobiliarios">,
  { src: string; altPt: string; altEn: string }
> = {
  acoes: {
    src: "/characters/services-hero-institutional.png",
    altPt: "Infraestrutura institucional e mesa financeira global",
    altEn: "Institutional trading floor and global finance infrastructure",
  },
  forex: {
    src: "/characters/services-hero-team.png",
    altPt: "Equipe Varejo Investidor e fluxo global do mercado de câmbio",
    altEn: "Varejo Investidor team and global foreign exchange flows",
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
    src: "/characters/services-hero-team.png",
    altPt: "Economia digital, blockchain e mercado global de criptoativos",
    altEn: "Digital economy, blockchain and global crypto market",
  },
  commodities: {
    src: "/characters/about-hero-institutional-cutout.png",
    altPt: "Cadeia global de commodities, energia e matérias-primas",
    altEn: "Global commodities chain, energy and raw materials",
  },
};
