import type { Locale } from "../../i18n";
import type { MarketSlug } from "../marketContent";
import { marketHeroImages, type InstitutionalMarketPage, type InstitutionalSection } from "./types";

type MarketCopy = {
  heroTitle: string;
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  showForexBroker?: boolean;
  showCryptoBroker?: boolean;
  sections: Omit<InstitutionalSection, "id">[];
};

function withIds(sections: Omit<InstitutionalSection, "id">[]): InstitutionalSection[] {
  return sections.map((section, index) => ({
    ...section,
    id: `section-${index + 1}`,
  }));
}

export function buildInstitutionalPage(slug: Exclude<MarketSlug, "commodities" | "fundos-imobiliarios">, copy: MarketCopy, locale: Locale): InstitutionalMarketPage {
  const heroAsset = marketHeroImages[slug];
  const imageAlt = locale === "pt" ? heroAsset.altPt : heroAsset.altEn;

  return {
    slug,
    hero: {
      title: copy.heroTitle,
      subtitle: copy.heroSubtitle,
      image: heroAsset.src,
      imageAlt,
    },
    metaTitle: copy.metaTitle,
    metaDescription: copy.metaDescription,
    sections: withIds(copy.sections),
    showForexBroker: copy.showForexBroker,
    showCryptoBroker: copy.showCryptoBroker,
  };
}
