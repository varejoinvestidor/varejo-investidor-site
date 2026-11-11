"use client";

import { LoboChannelBanner } from "../banners/LoboChannelBanner";
import type { ArticleBanner } from "../../publisher/types/banner";
import { articleHasLoboBannerPreset, isLoboChannelArticle } from "../../publisher/public/loboChannelArticle";

/** Modelo A · só no editorial Canal / Nível Lobo (slug por idioma), se o editor não adicionou preset Lobo. */
export function LoboChannelArticleBanner({
  slug,
  language,
  banners,
}: {
  slug: string;
  language: string;
  banners: ArticleBanner[];
}) {
  const lang = language.split("-")[0] || "pt";
  if (!isLoboChannelArticle(slug, lang)) return null;
  if (articleHasLoboBannerPreset(banners)) return null;

  return (
    <div className="mt-10">
      <LoboChannelBanner language={lang} className="w-full" />
    </div>
  );
}
