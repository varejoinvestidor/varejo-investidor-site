import Image from "next/image";
import { ChannelBannerByPreset } from "../banners/ChannelBannerByPreset";
import { inferChannelBannerPreset, isChannelBannerPreset } from "../../publisher/types/banner";
import { resolveArticleBanner } from "../../publisher/data/articleBannerPresets";
import type { ArticleBanner } from "../../publisher/types/banner";
import { bannerOuterMaxWidth } from "../../publisher/articleBannerDisplay";

function isLocalBanner(url: string) {
  return url.startsWith("/") && !url.startsWith("//");
}

export function ArticleBannerBlock({
  banner,
  language,
  compact = false,
}: {
  banner: ArticleBanner;
  language: string;
  compact?: boolean;
}) {
  const resolved = resolveArticleBanner(banner, language);
  const langBase = language.split("-")[0] ?? "pt";
  const channelPreset = resolved.preset ?? inferChannelBannerPreset(resolved);

  const widthStyle = bannerOuterMaxWidth(resolved.display_scale);
  const wrapStyle = widthStyle ? { width: widthStyle, marginInline: "auto" as const } : undefined;

  if (isChannelBannerPreset(channelPreset)) {
    return (
      <div style={wrapStyle} className={widthStyle ? "max-w-full" : undefined}>
        <ChannelBannerByPreset
          preset={channelPreset}
          language={langBase}
          href={resolved.href}
          className="w-full"
          display={resolved}
        />
      </div>
    );
  }

  const image = isLocalBanner(resolved.image_url) ? (
    <Image
      src={resolved.image_url}
      alt={resolved.alt}
      width={1324}
      height={150}
      sizes="(min-width: 1024px) 1024px, 100vw"
      className="aspect-[1324/150] h-auto w-full rounded-sm object-cover"
      unoptimized={resolved.image_url.endsWith(".svg")}
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolved.image_url}
      alt={resolved.alt}
      width={1324}
      height={150}
      loading="lazy"
      decoding="async"
      className="aspect-[1324/150] w-full rounded-sm object-cover"
    />
  );

  const wrapClass = compact ? "" : "";

  const framed = (
    <figure className={`overflow-hidden border border-gold/[0.18] ${wrapClass}`} style={wrapStyle}>
      {image}
    </figure>
  );

  if (resolved.href) {
    const external = /^https?:\/\//i.test(resolved.href);
    return (
      <a
        href={resolved.href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer sponsored" } : { rel: "noopener" })}
        className={`block transition hover:opacity-95 ${widthStyle ? "mx-auto max-w-full" : ""}`}
        style={wrapStyle}
      >
        {image}
      </a>
    );
  }

  return framed;
}

export function PublisherArticleBanners({
  banners,
  placement,
  language = "pt",
  compact = false,
}: {
  banners: ArticleBanner[];
  placement: ArticleBanner["placement"];
  language?: string;
  /** Sem padding de seção (ex.: banner no meio do texto). */
  compact?: boolean;
}) {
  const items = banners.filter((b) => b.placement === placement).map((b) => resolveArticleBanner(b, language));
  if (!items.length) return null;

  const outer = compact ? "py-2" : "px-5 py-6 md:px-8";
  const inner = compact ? "flex flex-col gap-6" : "mx-auto flex max-w-5xl flex-col gap-6";

  return (
    <section className={outer}>
      <div className={inner}>
        {items.map((banner) => (
          <ArticleBannerBlock key={banner.id} banner={banner} language={language} compact={compact} />
        ))}
      </div>
    </section>
  );
}
