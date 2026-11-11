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

export function buildInstitutionalPage(slug: Exclude<MarketSlug, "fundos-imobiliarios">, copy: MarketCopy, locale: Locale): InstitutionalMarketPage {
  const heroAsset = marketHeroImages[slug];
  const imageAlt = locale === "pt" ? heroAsset.altPt : heroAsset.altEn;

  const heroFit = "contain" as const;
  const heroPanelBySlug: Partial<Record<typeof slug, string>> = {
    forex: "bg-[#070d0a]",
    cripto: "bg-[#0c1220]",
    acoes: "bg-[#0a0e14]",
    etfs: "bg-[#080c10]",
    ouro: "bg-[#12100a]",
    petroleo: "bg-[#0a0c08]",
    commodities: "bg-[#0e0c08]",
  };
  const heroPanel = heroPanelBySlug[slug] ?? "bg-ink";

  return {
    slug,
    hero: {
      title: copy.heroTitle,
      subtitle: copy.heroSubtitle,
      image: heroAsset.src,
      imageAlt,
      imageFit: heroFit,
      imagePanelClass: heroPanel,
    },
    metaTitle: copy.metaTitle,
    metaDescription: copy.metaDescription,
    sections: withIds(copy.sections),
    showForexBroker: copy.showForexBroker,
    showCryptoBroker: copy.showCryptoBroker,
  };
}
