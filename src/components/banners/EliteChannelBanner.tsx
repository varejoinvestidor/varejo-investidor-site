"use client";

import { localizedPath } from "../../i18n/routing";
import { isSupportedLocale, type SupportedLocale } from "../../i18n/locales";
import { CHANNEL_SPLIT_BANNER_MEDIA } from "../../data/institutionalLevelPages/types";
import { eliteChannelBannerCopy } from "./eliteChannelBannerCopy";
import { ChannelSplitBannerA } from "./ChannelSplitBannerA";

type Props = {
  language?: string;
  href?: string;
  className?: string;
};

function bannerLocale(language: string): SupportedLocale {
  const base = language.split("-")[0]?.toLowerCase() ?? "pt";
  return isSupportedLocale(base) ? base : "pt";
}

/** Modelo A · Canal Elite (Research) → página de sinais. */
export function EliteChannelBanner({ language = "pt", href: hrefProp, className = "" }: Props) {
  const copy = eliteChannelBannerCopy(language);
  const locale = bannerLocale(language);
  const href = hrefProp?.trim() || localizedPath("/sinais", locale);
  const media = CHANNEL_SPLIT_BANNER_MEDIA.elite;

  return (
    <ChannelSplitBannerA
      image={media.hero}
      imageAlt={media.heroAlt}
      eyebrow={copy.eyebrow}
      title={copy.title}
      subtitle={copy.subtitle}
      cta={copy.cta}
      href={href}
      language={language}
      trackEvent="canal_elite_banner_click"
      accent="gold"
      imagePanelClass="bg-[#0c1424]"
      className={className}
    />
  );
}
