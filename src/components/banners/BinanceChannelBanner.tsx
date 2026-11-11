"use client";

import { binanceChannelBannerCopy } from "./binanceChannelBannerCopy";
import { ChannelSplitBannerA } from "./ChannelSplitBannerA";

const BINANCE_URL = "https://accounts.binance.com/register?ref=453580362";

import type { ChannelBannerImageDisplay } from "./channelBannerDisplay";

type Props = {
  language?: string;
  href?: string;
  className?: string;
  display?: ChannelBannerImageDisplay;
};

/** Modelo A · Binance (afiliado). */
export function BinanceChannelBanner({ language = "pt", href: hrefProp, className = "", display }: Props) {
  const copy = binanceChannelBannerCopy(language);
  const href = hrefProp?.trim() || BINANCE_URL;

  return (
    <ChannelSplitBannerA
      image="/characters/hero-main.png"
      imageAlt="Binance · mercado cripto global"
      eyebrow={copy.eyebrow}
      title={copy.title}
      subtitle={copy.subtitle}
      cta={copy.cta}
      href={href}
      language={language}
      trackEvent="binance_banner_click"
      accent="gold"
      imagePanelClass="bg-[#0d1117]"
      imageStyle="scene"
      imageObjectPosition="center 72%"
      sceneGlow="rgba(240,185,11,0.22)"
      className={className}
      {...display}
    />
  );
}
