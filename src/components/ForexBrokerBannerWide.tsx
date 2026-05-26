import type { Locale } from "../i18n";

export function ForexBrokerBannerWide({ language }: { language: Locale }) {
  if (language !== "pt" && language !== "en" && language !== "hi" && language !== "es") {
    return null;
  }

  const banners = {
    pt: {
      src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-pt-fscm-1324x150.png",
      alt: "FxPro Banner",
    },
    en: {
      src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
      alt: "FxPro Banner EN/HI",
    },
    hi: {
      src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
      alt: "FxPro Banner EN/HI",
    },
    es: {
      src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-es-fscm-1324x150.png",
      alt: "FxPro Banner ES",
    },
  };

  const banner = banners[language];

  return (
    <section className="px-5 py-10 md:px-8 md:py-12">
      <div className="mx-auto flex max-w-7xl justify-center">
        <a
          rel="noopener"
          target="_blank"
          href="https://direct.fxpro.group/pt/partner/77014650"
          className="group block w-full max-w-[1324px] overflow-hidden rounded-xl transition duration-300 hover:-translate-y-0.5 hover:shadow-premium"
          aria-label="Abrir conta Forex na FxPro"
        >
          <img
            src={banner.src}
            alt={banner.alt}
            width="1324"
            height="150"
            loading="lazy"
            decoding="async"
            className="block h-auto w-full object-contain"
          />
        </a>
      </div>
    </section>
  );
}
