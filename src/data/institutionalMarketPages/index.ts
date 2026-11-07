import type { Locale } from "../../i18n";
import type { MarketSlug } from "../marketContent";
import { buildInstitutionalPage } from "./buildPage";
import { institutionalMarketCopyEn } from "./enCopy";
import { institutionalMarketCopyPt } from "./ptCopy";
import type { InstitutionalMarketPage } from "./types";

const INSTITUTIONAL_SLUGS = new Set<MarketSlug>(["acoes", "forex", "etfs", "ouro", "petroleo", "cripto"]);

export function getInstitutionalMarketPage(slug: MarketSlug, locale: Locale): InstitutionalMarketPage | null {
  if (!INSTITUTIONAL_SLUGS.has(slug)) return null;

  const key = slug as keyof typeof institutionalMarketCopyPt;

  const copy = locale === "pt" ? institutionalMarketCopyPt[key] : institutionalMarketCopyEn[key];
  return buildInstitutionalPage(key, copy, locale);
}

export function institutionalMetadata(slug: MarketSlug, locale: Locale) {
  const page = getInstitutionalMarketPage(slug, locale === "pt" ? "pt" : "en");
  if (!page) return null;
  return { title: page.metaTitle, description: page.metaDescription };
}
