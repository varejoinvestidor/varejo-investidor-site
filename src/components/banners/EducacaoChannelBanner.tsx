"use client";

import { localizedPath } from "../../i18n/routing";
import { isSupportedLocale, type SupportedLocale } from "../../i18n/locales";
import { CHANNEL_SPLIT_BANNER_MEDIA } from "../../data/institutionalLevelPages/types";
import { educacaoChannelBannerCopy } from "./productChannelBannerCopy";
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

/** Modelo A · Base educacional → /educacao */
export function EducacaoChannelBanner({ language = "pt", href: hrefProp, className = "" }: Props) {
  const copy = educacaoChannelBannerCopy(language);
  const locale = bannerLocale(language);
  const href = hrefProp?.trim() || localizedPath("/educacao", locale);
  const media = CHANNEL_SPLIT_BANNER_MEDIA.educacao;

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
      trackEvent="base_educacional_banner_click"
      accent="rise"
      imagePanelClass="bg-[#0a3d28]"
      className={className}
    />
  );
}
