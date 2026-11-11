"use client";

import type { ArticleBanner, ArticleBannerPreset } from "../../publisher/types/banner";
import { bannerImageScale, bannerObjectPosition, bannerPanelMinClass } from "../../publisher/articleBannerDisplay";
import { EducacaoChannelBanner } from "./EducacaoChannelBanner";
import { EliteChannelBanner } from "./EliteChannelBanner";
import { FormigaChannelBanner } from "./FormigaChannelBanner";
import { LoboChannelBanner } from "./LoboChannelBanner";
import { BinanceChannelBanner } from "./BinanceChannelBanner";
import { PrivateChannelBanner } from "./PrivateChannelBanner";
import { SelectChannelBanner } from "./SelectChannelBanner";

type ChannelPreset = Extract<
  ArticleBannerPreset,
  "formiga" | "lobo" | "elite" | "educacao" | "select" | "private" | "binance"
>;

type BannerDisplay = Pick<
  ArticleBanner,
  "display_scale" | "image_focus_x" | "image_focus_y" | "image_scale" | "panel_height"
>;

export function ChannelBannerByPreset({
  preset,
  language,
  href,
  className,
  display,
}: {
  preset: ChannelPreset;
  language: string;
  href?: string;
  className?: string;
  display?: BannerDisplay;
}) {
  const imageProps = display
    ? {
        imageObjectPosition: bannerObjectPosition(display),
        imageScale: bannerImageScale(display),
        panelMinClass: bannerPanelMinClass(display.panel_height),
      }
    : undefined;

  if (preset === "formiga") {
    return <FormigaChannelBanner language={language} href={href} className={className} display={imageProps} />;
  }
  if (preset === "lobo") {
    return <LoboChannelBanner language={language} href={href} className={className} display={imageProps} />;
  }
  if (preset === "elite") {
    return <EliteChannelBanner language={language} href={href} className={className} display={imageProps} />;
  }
  if (preset === "educacao") {
    return <EducacaoChannelBanner language={language} href={href} className={className} display={imageProps} />;
  }
  if (preset === "select") {
    return <SelectChannelBanner language={language} href={href} className={className} display={imageProps} />;
  }
  if (preset === "private") {
    return <PrivateChannelBanner language={language} href={href} className={className} display={imageProps} />;
  }
  return <BinanceChannelBanner language={language} href={href} className={className} display={imageProps} />;
}
