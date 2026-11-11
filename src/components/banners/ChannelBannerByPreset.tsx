"use client";

import type { ArticleBannerPreset } from "../../publisher/types/banner";
import { EducacaoChannelBanner } from "./EducacaoChannelBanner";
import { EliteChannelBanner } from "./EliteChannelBanner";
import { FormigaChannelBanner } from "./FormigaChannelBanner";
import { LoboChannelBanner } from "./LoboChannelBanner";
import { PrivateChannelBanner } from "./PrivateChannelBanner";
import { SelectChannelBanner } from "./SelectChannelBanner";

type ChannelPreset = Extract<
  ArticleBannerPreset,
  "formiga" | "lobo" | "elite" | "educacao" | "select" | "private"
>;

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
  if (preset === "elite") {
    return <EliteChannelBanner language={language} href={href} className={className} />;
  }
  if (preset === "educacao") {
    return <EducacaoChannelBanner language={language} href={href} className={className} />;
  }
  if (preset === "select") {
    return <SelectChannelBanner language={language} href={href} className={className} />;
  }
  return <PrivateChannelBanner language={language} href={href} className={className} />;
}
