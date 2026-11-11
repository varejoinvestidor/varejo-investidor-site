"use client";

import { getFormigaChannelUrl } from "../../data/whatsappChannels";
import { CHANNEL_SPLIT_BANNER_MEDIA } from "../../data/institutionalLevelPages/types";
import { formigaChannelBannerCopy } from "./channelBannerCopy";
import { ChannelSplitBannerA } from "./ChannelSplitBannerA";

const FORMIGA_FALLBACK = "https://whatsapp.com/channel/0029Va9J7SAAO7R8cN76Ib13";

type Props = {
  language?: string;
  href?: string;
  className?: string;
};

/** Modelo A · Canal Formiga. */
export function FormigaChannelBanner({ language = "pt", href: hrefProp, className = "" }: Props) {
  const copy = formigaChannelBannerCopy(language);
  const href = hrefProp?.trim() || getFormigaChannelUrl(language, FORMIGA_FALLBACK);
  const media = CHANNEL_SPLIT_BANNER_MEDIA.formiga;

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
      trackEvent="canal_formiga_banner_click"
      accent="rise"
      className={className}
    />
  );
}
