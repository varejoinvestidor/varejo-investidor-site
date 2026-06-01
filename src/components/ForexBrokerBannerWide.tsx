import type { Locale } from "../i18n";
import { fxproLinks } from "../data/fxproLinks";

export function ForexBrokerBannerWide({ language }: { language: Locale }) {
  if (language !== "pt" && language !== "en" && language !== "hi" && language !== "es" && language !== "ar" && language !== "tr" && language !== "id" && language !== "vi") {
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
    ar: {
      src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
      alt: "FxPro Banner AR",
    },
    tr: {
      src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
      alt: "FxPro Banner TR",
    },
    es: {
      src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-es-fscm-1324x150.png",
      alt: "FxPro Banner ES",
    },
    id: {
      src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
      alt: "FxPro Banner ID",
    },
    vi: {
      src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
      alt: "FxPro Banner VI",
    },
  };

  const banner = banners[language];
  const cta = {
    pt: {
      before: "ABRA SUA CONTA E ",
      highlight: "COMECE A NEGOCIAR",
      after: " AGORA.",
      second: "CLIQUE NO BANNER.",
    },
    en: {
      before: "OPEN YOUR ACCOUNT AND ",
      highlight: "START TRADING",
      after: " NOW.",
      second: "CLICK THE BANNER.",
    },
    es: {
      before: "ABRE TU CUENTA Y ",
      highlight: "EMPIEZA A NEGOCIAR",
      after: " AHORA.",
      second: "HAZ CLIC EN EL BANNER.",
    },
    hi: {
      before: "अपना खाता खोलें और ",
      highlight: "अभी ट्रेडिंग शुरू करें",
      after: ".",
      second: "बैनर पर क्लिक करें.",
    },
    ar: {
      before: "افتح حسابك و",
      highlight: "ابدأ التداول",
      after: " الآن.",
      second: "اضغط على البانر.",
    },
    tr: {
      before: "HESABINI AÇ VE ",
      highlight: "İŞLEM YAPMAYA BAŞLA",
      after: ".",
      second: "BANNERA TIKLA.",
    },
    id: {
      before: "BUKA AKUN ANDA DAN ",
      highlight: "MULAI TRADING",
      after: " SEKARANG.",
      second: "KLIK BANNER.",
    },
    vi: {
      before: "MỞ TÀI KHOẢN VÀ ",
      highlight: "BẮT ĐẦU GIAO DỊCH",
      after: " NGAY.",
      second: "NHẤP VÀO BANNER.",
    },
  }[language];

  return (
    <section className="px-5 py-10 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-ink md:text-base">
            {cta.before}
            <span className="text-gold">{cta.highlight}</span>
            {cta.after}
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-ink/[0.58]">{cta.second}</p>
        </div>
        <a
          rel="noopener"
          target="_blank"
          href={fxproLinks[language]}
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
