import type { FormationTrackId } from "../formationPricing";
import type { SupportedLocale } from "../../i18n/locales";

export type LevelId = FormationTrackId;

export type LevelPageUi = {
  competenciesTitle: string;
  philosophyTitle: string;
  coreMessageLabel: string;
  evolutionTitle: string;
  formationTitle: string;
  formationText: string;
  formationStepLabel: string;
  compareTitle: string;
  compareSubtitle: string;
  compareProgression: string;
  pricingEyebrow: string;
  viewEducation: string;
  otherLevels: string;
  levelFormiga: string;
  levelLobo: string;
  levelHarpia: string;
};

export type LevelCharacterCopy = {
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  conceptTitle: string;
  conceptIntro: string;
  competencies: string[];
  philosophyParagraphs: string[];
  coreMessage: string;
  evolutionText: string;
  compareTagline: string;
  compareSummary: string;
  primaryCta: string;
  primaryHref: "free" | "/sinais" | "/servicos";
  secondaryCta: string;
};

export type EvolutionCompareStep = {
  id: LevelId;
  name: string;
  tagline: string;
  summary: string;
};

export type LevelLocalePack = Record<LevelId, LevelCharacterCopy>;

export type LevelHeroMedia = {
  hero: string;
  heroAlt: string;
  philosophy: string;
  philosophyAlt: string;
};

export const LEVEL_HERO_MEDIA: Record<LevelId, LevelHeroMedia> = {
  formiga: {
    hero: "/characters/education-formation-premium.png",
    heroAlt: "Formiga, fundação educacional Varejo Investidor",
    philosophy: "/characters/home-structure-horizontal-cutout.png",
    philosophyAlt: "Formiga, Lobo e Harpia, progressão da formação",
  },
  lobo: {
    hero: "/characters/home-hero-official-20260527.png",
    heroAlt: "Lobo, estratégia e leitura de mercado",
    philosophy: "/characters/home-hero-institutional.png",
    philosophyAlt: "Visão institucional de mercados e estratégia",
  },
  harpia: {
    hero: "/characters/services-hero-institutional.png",
    heroAlt: "Harpia, visão global e patrimônio",
    philosophy: "/characters/about-hero-institutional.png",
    philosophyAlt: "Macroeconomia e estrutura patrimonial global",
  },
};

/** Personagem nos banners modelo A (Canal Formiga / Lobo). Lobo usa recorte vertical, não o hero da home. */
export const CHANNEL_SPLIT_BANNER_MEDIA: Record<
  "formiga" | "lobo" | "elite",
  { hero: string; heroAlt: string }
> = {
  formiga: {
    hero: "/characters/education-formation-premium.png",
    heroAlt: "Formiga, fundação educacional Varejo Investidor",
  },
  lobo: {
    hero: "/characters/home-hero-official-20260527.png",
    heroAlt: "Lobo, estratégia e leitura de mercado",
  },
  elite: {
    hero: "/characters/services-hero-institutional.png",
    heroAlt: "Harpia, Research Elite Varejo Investidor",
  },
};

export type LocaleLevelSource = Partial<Record<SupportedLocale, LevelLocalePack>>;
