export type FormationTrackId = "formiga" | "lobo" | "harpia";

export type FormationLevelProduct = {
  id: string;
  track: FormationTrackId;
  level: number;
  label: string;
  priceCents: number;
  /** Preservar URLs Lastlink existentes — null enquanto checkout não estiver vinculado no painel. */
  checkoutUrl: string | null;
};

export type FormationCharacterPackage = {
  id: FormationTrackId;
  name: string;
  levelCount: number;
  priceCents: number;
  individualTotalCents: number;
  checkoutUrl: string | null;
};

export type FormationCompleteOffer = {
  name: string;
  detail: string;
  referencePriceCents: number;
  promoPriceCents: number;
  levelCount: number;
  checkoutUrl: string | null;
};

const brl = (reais: number, centavos = 0) => Math.round(reais * 100 + centavos);

export const FORMATION_LEVEL_PRODUCTS: FormationLevelProduct[] = [
  { id: "f1", track: "formiga", level: 1, label: "Formiga 1", priceCents: brl(89, 91), checkoutUrl: null },
  { id: "f2", track: "formiga", level: 2, label: "Formiga 2", priceCents: brl(597), checkoutUrl: null },
  { id: "f3", track: "formiga", level: 3, label: "Formiga 3", priceCents: brl(597), checkoutUrl: null },
  { id: "f4", track: "formiga", level: 4, label: "Formiga 4", priceCents: brl(597), checkoutUrl: null },
  { id: "f5", track: "formiga", level: 5, label: "Formiga 5", priceCents: brl(697, 5), checkoutUrl: null },
  { id: "l1", track: "lobo", level: 1, label: "Lobo 1", priceCents: brl(697, 1), checkoutUrl: null },
  { id: "l2", track: "lobo", level: 2, label: "Lobo 2", priceCents: brl(597), checkoutUrl: null },
  { id: "l3", track: "lobo", level: 3, label: "Lobo 3", priceCents: brl(597), checkoutUrl: null },
  { id: "l4", track: "lobo", level: 4, label: "Lobo 4", priceCents: brl(797, 4), checkoutUrl: null },
  { id: "l5", track: "lobo", level: 5, label: "Lobo 5", priceCents: brl(797, 5), checkoutUrl: null },
  { id: "h1", track: "harpia", level: 1, label: "Harpia 1", priceCents: brl(897, 1), checkoutUrl: null },
  { id: "h2", track: "harpia", level: 2, label: "Harpia 2", priceCents: brl(897, 2), checkoutUrl: null },
  { id: "h3", track: "harpia", level: 3, label: "Harpia 3", priceCents: brl(997, 3), checkoutUrl: null },
  { id: "h4", track: "harpia", level: 4, label: "Harpia 4", priceCents: brl(997, 4), checkoutUrl: null },
  { id: "h5", track: "harpia", level: 5, label: "Harpia 5", priceCents: brl(997, 5), checkoutUrl: null },
];

export const FORMATION_TRACK_INDIVIDUAL_TOTALS_CENTS: Record<FormationTrackId, number> = {
  formiga: brl(2577, 96),
  lobo: brl(3485, 10),
  harpia: brl(4785, 15),
};

export const FORMATION_CHARACTER_PACKAGES: FormationCharacterPackage[] = [
  {
    id: "formiga",
    name: "FORMIGA COMPLETO",
    levelCount: 5,
    priceCents: brl(2197),
    individualTotalCents: FORMATION_TRACK_INDIVIDUAL_TOTALS_CENTS.formiga,
    checkoutUrl: null,
  },
  {
    id: "lobo",
    name: "LOBO COMPLETO",
    levelCount: 5,
    priceCents: brl(2997),
    individualTotalCents: FORMATION_TRACK_INDIVIDUAL_TOTALS_CENTS.lobo,
    checkoutUrl: null,
  },
  {
    id: "harpia",
    name: "HARPIA COMPLETO",
    levelCount: 5,
    priceCents: brl(3997),
    individualTotalCents: FORMATION_TRACK_INDIVIDUAL_TOTALS_CENTS.harpia,
    checkoutUrl: null,
  },
];

export const FORMATION_COMPLETE_OFFER: FormationCompleteOffer = {
  name: "Formação Completa Varejo Investidor",
  detail: "15 níveis · 5 Formiga + 5 Lobo + 5 Harpia",
  referencePriceCents: brl(10848, 21),
  promoPriceCents: brl(6997),
  levelCount: 15,
  checkoutUrl: null,
};

export const FORMATION_FIFTEEN_INDIVIDUAL_TOTAL_CENTS = brl(10848, 21);

export function formatFormationBRL(priceCents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(priceCents / 100);
}

export function formationSavingsCents(referenceCents: number, promoCents: number) {
  return Math.max(0, referenceCents - promoCents);
}

export function formationDiscountPercent(referenceCents: number, promoCents: number) {
  if (referenceCents <= 0) return 0;
  return (formationSavingsCents(referenceCents, promoCents) / referenceCents) * 100;
}

export function productsByTrack(track: FormationTrackId) {
  return FORMATION_LEVEL_PRODUCTS.filter((product) => product.track === track);
}

export const FORMATION_TRACK_UI: Record<
  FormationTrackId,
  { title: string; tone: "rise" | "gold" | "elite"; image: string }
> = {
  formiga: {
    title: "FORMIGA",
    tone: "rise",
    image: "/characters/education-formation-premium.png",
  },
  lobo: {
    title: "LOBO",
    tone: "gold",
    image: "/characters/home-hero-official-20260527.png",
  },
  harpia: {
    title: "HARPIA",
    tone: "elite",
    image: "/characters/services-hero-institutional.png",
  },
};
