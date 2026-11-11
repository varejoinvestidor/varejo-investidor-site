"use client";

import { FormigaChannelBanner } from "../banners/FormigaChannelBanner";
import type { ArticleBanner } from "../../publisher/types/banner";
import { isLoboChannelArticle } from "../../publisher/public/loboChannelArticle";

function hasBottomPreset(banners: ArticleBanner[], preset: string): boolean {
  return banners.some((b) => b.preset === preset && b.placement === "bottom");
}

/** Rodapé do artigo: modelo A Formiga (padrão) ou Lobo só no editorial nível Lobo por idioma. */
export function ArticleChannelFooterBanner({
  slug,
  language,
  banners,
}: {
  slug: string;
  language: string;
  banners: ArticleBanner[];
}) {
  const lang = language.split("-")[0] || "pt";
  if (isLoboChannelArticle(slug, lang)) return null;

  if (hasBottomPreset(banners, "formiga")) return null;

  return (
    <section className="border-t border-gold/[0.14] px-5 py-12 md:px-8 md:py-14">
      <div className="mx-auto max-w-5xl">
        <FormigaChannelBanner language={lang} className="w-full" />
      </div>
    </section>
  );
}
