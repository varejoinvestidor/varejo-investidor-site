"use client";

import type { Locale } from "../../i18n";
import type { MarketSlug } from "../../data/marketContent";
import { EducacaoChannelBanner } from "../banners/EducacaoChannelBanner";
import { FormigaChannelBanner } from "../banners/FormigaChannelBanner";
import { MarketExploreRibbon } from "./MarketExploreRibbon";

export function MarketPageClosing({ locale, slug }: { locale: Locale; slug: MarketSlug }) {
  const lang = locale.split("-")[0] || "pt";

  return (
    <>
      <section className="px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <EducacaoChannelBanner language={lang} className="w-full" />
          <FormigaChannelBanner language={lang} className="w-full" />
        </div>
      </section>
      <MarketExploreRibbon locale={locale} currentSlug={slug} />
    </>
  );
}
