"use client";

import type { ArticleBannerPreset } from "../../publisher/types/banner";
import { EliteChannelBanner } from "./EliteChannelBanner";
import { FormigaChannelBanner } from "./FormigaChannelBanner";
import { LoboChannelBanner } from "./LoboChannelBanner";

type ChannelPreset = Extract<ArticleBannerPreset, "formiga" | "lobo" | "elite">;

export function ChannelBannerByPreset({
  preset,
  language,
  href,
  className,
}: {
  preset: ChannelPreset;
  language: string;
  href?: string;
  className?: string;
}) {
  if (preset === "formiga") {
    return <FormigaChannelBanner language={language} href={href} className={className} />;
  }
  if (preset === "lobo") {
    return <LoboChannelBanner language={language} href={href} className={className} />;
  }
  return <EliteChannelBanner language={language} href={href} className={className} />;
}
