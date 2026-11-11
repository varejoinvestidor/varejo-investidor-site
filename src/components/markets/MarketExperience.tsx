"use client";

import type { Locale } from "../../i18n";
import type { MarketSlug } from "../../data/marketContent";
import { CryptoMarketExperience } from "../cripto/CryptoMarketExperience";
import { ForexMarketExperience } from "../forex/ForexMarketExperience";
import { MarketExperienceSection } from "./MarketExperienceSection";
import { MARKET_EXPERIENCE_SLUGS, type MarketExperienceSlug } from "./marketExperienceTypes";

function isMarketExperienceSlug(slug: MarketSlug): slug is MarketExperienceSlug {
  return (MARKET_EXPERIENCE_SLUGS as readonly string[]).includes(slug);
}

/** Experiência educacional 3D por mercado (institucional e legado). */
export function MarketExperience({ slug, locale }: { slug: MarketSlug; locale: Locale }) {
  if (slug === "forex") return <ForexMarketExperience locale={locale} />;
  if (slug === "cripto") return <CryptoMarketExperience locale={locale} />;
  if (isMarketExperienceSlug(slug)) return <MarketExperienceSection slug={slug} locale={locale} />;
  return null;
}
