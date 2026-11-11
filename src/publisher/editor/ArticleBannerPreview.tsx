"use client";

import { FormigaChannelBanner } from "../../components/banners/FormigaChannelBanner";
import { LoboChannelBanner } from "../../components/banners/LoboChannelBanner";
import { resolveArticleBanner } from "../data/articleBannerPresets";
import type { ArticleBanner } from "../types/banner";

const PLACEMENT_LABELS: Record<ArticleBanner["placement"], string> = {
  top: "Topo do artigo",
  inline: "Meio do artigo",
  bottom: "Rodapé do artigo",
};

function BannerFigure({
  banner,
  language,
  interactive,
  onSelect,
}: {
  banner: ArticleBanner;
  language: string;
  interactive?: boolean;
  onSelect?: () => void;
}) {
  if (banner.preset === "formiga") {
    const frameClass = `overflow-hidden ${interactive ? "cursor-pointer ring-offset-2 ring-offset-ink" : ""}`;
    return (
      <div
        className={frameClass}
        onClick={interactive ? onSelect : undefined}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={interactive ? (e) => e.key === "Enter" && onSelect?.() : undefined}
      >
        <FormigaChannelBanner language={language} href={banner.href} />
      </div>
    );
  }

  if (banner.preset === "lobo") {
    const frameClass = `overflow-hidden ${interactive ? "cursor-pointer ring-offset-2 ring-offset-ink" : ""}`;
    return (
      <div
        className={frameClass}
        onClick={interactive ? onSelect : undefined}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={interactive ? (e) => e.key === "Enter" && onSelect?.() : undefined}
      >
        <LoboChannelBanner language={language} href={banner.href} />
      </div>
    );
  }

  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={banner.image_url} alt={banner.alt} className="h-auto w-full object-cover" />
  );

  const frameClass = `overflow-hidden border border-gold/25 bg-ink/80 ${
    interactive ? "cursor-pointer transition hover:border-gold/50" : ""
  }`;

  if (banner.href && !interactive) {
    return (
      <a href={banner.href} target="_blank" rel="noopener noreferrer sponsored" className={`block ${frameClass}`}>
        {image}
      </a>
    );
  }

  return (
    <div
      className={frameClass}
      onClick={interactive ? onSelect : undefined}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={interactive ? (e) => e.key === "Enter" && onSelect?.() : undefined}
    >
      {image}
    </div>
  );
}

export function ArticleBannerPreviewStrip({
  banners,
  placement,
  language,
  activeBannerId,
  onSelectBanner,
}: {
  banners: ArticleBanner[];
  placement: ArticleBanner["placement"];
  language: string;
  activeBannerId?: string | null;
  onSelectBanner?: (id: string) => void;
}) {
  const items = banners
    .filter((b) => b.placement === placement)
    .map((b) => ({ raw: b, resolved: resolveArticleBanner(b, language) }));

  if (!items.length) return null;

  return (
    <div className="my-6 space-y-2" data-banner-placement={placement}>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-paper/40">
        {PLACEMENT_LABELS[placement]}
        <span className="ml-2 text-gold/70">· prévia {language.toUpperCase()}</span>
      </p>
      <div className="flex flex-col gap-4">
        {items.map(({ raw, resolved }) => (
          <figure
            key={raw.id}
            id={`banner-editor-${raw.id}`}
            className={`scroll-mt-24 rounded-lg p-1 ${activeBannerId === raw.id ? "ring-2 ring-gold/60" : ""}`}
          >
            <BannerFigure
              banner={resolved}
              language={language}
              interactive={Boolean(onSelectBanner)}
              onSelect={() => onSelectBanner?.(raw.id)}
            />
            {resolved.href ? (
              <figcaption className="mt-1 truncate font-mono text-[10px] text-paper/35">{resolved.href}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </div>
  );
}
