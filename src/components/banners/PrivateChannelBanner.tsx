"use client";

import { localizedPath } from "../../i18n/routing";
import { isSupportedLocale, type SupportedLocale } from "../../i18n/locales";
import { CHANNEL_SPLIT_BANNER_MEDIA } from "../../data/institutionalLevelPages/types";
import { privateChannelBannerCopy } from "./productChannelBannerCopy";
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

/** Modelo A · Private → /private */
export function PrivateChannelBanner({ language = "pt", href: hrefProp, className = "" }: Props) {
  const copy = privateChannelBannerCopy(language);
  const locale = bannerLocale(language);
  const href = hrefProp?.trim() || localizedPath("/private", locale);
  const media = CHANNEL_SPLIT_BANNER_MEDIA.private;

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
      trackEvent="private_banner_click"
      accent="gold"
      imagePanelClass="bg-[#0c1424]"
      className={className}
    />
  );
}
