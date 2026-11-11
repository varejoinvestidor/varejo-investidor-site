"use client";

import { getLoboChannelUrlWithFallback } from "../../data/whatsappChannels";
import { CHANNEL_SPLIT_BANNER_MEDIA } from "../../data/institutionalLevelPages/types";
import { loboChannelBannerCopy } from "./channelBannerCopy";
import { ChannelSplitBannerA } from "./ChannelSplitBannerA";
import type { ChannelBannerImageDisplay } from "./channelBannerDisplay";

type Props = {
  language?: string;
  href?: string;
  className?: string;
  display?: ChannelBannerImageDisplay;
};

/** Modelo A · Canal Lobo (WhatsApp por idioma). */
export function LoboChannelBanner({ language = "pt", href: hrefProp, className = "", display }: Props) {
  const copy = loboChannelBannerCopy(language);
  const href = hrefProp?.trim() || getLoboChannelUrlWithFallback(language);
  const media = CHANNEL_SPLIT_BANNER_MEDIA.lobo;

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
      trackEvent="canal_lobo_banner_click"
      accent="gold"
      imagePanelClass="bg-[#1a1208]"
      className={className}
      {...display}
    />
  );
}
