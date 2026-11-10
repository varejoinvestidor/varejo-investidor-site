import type { ArticleBanner } from "../../publisher/types/banner";

export function PublisherArticleBanners({ banners, placement }: { banners: ArticleBanner[]; placement: ArticleBanner["placement"] }) {
  const items = banners.filter((b) => b.placement === placement);
  if (!items.length) return null;

  return (
    <section className="px-5 py-6 md:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        {items.map((banner) => {
          const image = (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={banner.image_url} alt={banner.alt} className="w-full rounded-sm object-cover" />
          );
          if (banner.href) {
            return (
              <a
                key={banner.id}
                href={banner.href}
                target="_blank"
                rel="noopener noreferrer sponsored"
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
