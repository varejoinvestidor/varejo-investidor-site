"use client";

import { localizedPath } from "../../i18n/routing";
import { isSupportedLocale, type SupportedLocale } from "../../i18n/locales";
import { CHANNEL_SPLIT_BANNER_MEDIA } from "../../data/institutionalLevelPages/types";
import { selectChannelBannerCopy } from "./productChannelBannerCopy";
import { ChannelSplitBannerA } from "./ChannelSplitBannerA";
import type { ChannelBannerImageDisplay } from "./channelBannerDisplay";

type Props = {
  language?: string;
  href?: string;
  className?: string;
  display?: ChannelBannerImageDisplay;
};

function bannerLocale(language: string): SupportedLocale {
  const base = language.split("-")[0]?.toLowerCase() ?? "pt";
  return isSupportedLocale(base) ? base : "pt";
}

/** Modelo A · Select → /select */
export function SelectChannelBanner({ language = "pt", href: hrefProp, className = "", display }: Props) {
  const copy = selectChannelBannerCopy(language);
  const locale = bannerLocale(language);
  const href = hrefProp?.trim() || localizedPath("/select", locale);
  const media = CHANNEL_SPLIT_BANNER_MEDIA.select;

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
      trackEvent="select_banner_click"
      accent="gold"
      imagePanelClass="bg-[#12100c]"
      imageStyle="scene"
      imageObjectPosition="center 78%"
      sceneGlow="rgba(198,153,74,0.2)"
      className={className}
      {...display}
    />
  );
}
