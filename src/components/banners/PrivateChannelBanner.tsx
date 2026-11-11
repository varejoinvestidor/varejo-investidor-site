"use client";

import { localizedPath } from "../../i18n/routing";
import { isSupportedLocale, type SupportedLocale } from "../../i18n/locales";
import { CHANNEL_SPLIT_BANNER_MEDIA } from "../../data/institutionalLevelPages/types";
import { privateChannelBannerCopy } from "./productChannelBannerCopy";
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

/** Modelo A · Private → /private */
export function PrivateChannelBanner({ language = "pt", href: hrefProp, className = "", display }: Props) {
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
      imagePanelClass="bg-[#080f1c]"
      imageStyle="scene"
      imageObjectPosition="center 74%"
      sceneGlow="rgba(96,140,220,0.18)"
      className={className}
      {...display}
    />
  );
}
