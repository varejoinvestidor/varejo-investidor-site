import { resolveArticleBanner } from "../../publisher/data/articleBannerPresets";
import type { ArticleBanner } from "../../publisher/types/banner";

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
        {items.map((banner) => {
          const image = (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={banner.image_url}
              alt={banner.alt}
              width={1324}
              height={150}
              className="aspect-[1324/150] w-full rounded-sm object-cover"
            />
          );
          if (banner.href) {
            const external = /^https?:\/\//i.test(banner.href);
            return (
              <a
                key={banner.id}
                href={banner.href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer sponsored" }
                  : { rel: "noopener" })}
                className="block overflow-hidden border border-gold/[0.18] transition hover:border-gold/40"
              >
                {image}
              </a>
            );
          }
          return (
            <figure key={banner.id} className="overflow-hidden border border-gold/[0.18]">
              {image}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
