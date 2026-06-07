import type { Locale } from "../i18n";
import { fxproLinks } from "../data/fxproLinks";

export function ForexBrokerBannerWide({ language }: { language: Locale }) {
  if (language !== "pt" && language !== "en" && language !== "es" && language !== "fr" && language !== "hi" && language !== "ar" && language !== "tr" && language !== "id" && language !== "vi" && language !== "th" && language !== "ru" && language !== "ur" && language !== "bn" && language !== "ja" && language !== "ko") {
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
    fr: {
      src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
      alt: "FxPro Banner FR",
    },
    id: {
      src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
      alt: "FxPro Banner ID",
    },
    vi: {
      src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
      alt: "FxPro Banner VI",
    },
    th: {
      src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
      alt: "FxPro Banner TH",
    },
    ru: {
      src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
      alt: "FxPro Banner RU",
    },
    ur: {
      src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
      alt: "FxPro Banner UR",
    },
    bn: {
      src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
      alt: "FxPro Banner BN",
    },
    ja: {
      src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
      alt: "FxPro Banner JA",
    },
    ko: {
      src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
      alt: "FxPro Banner KO",
    },
  };

  const banner = banners[language] ?? banners.en;
  const ctaMap = {
    pt: { before: "ABRA SUA CONTA E ", highlight: "COMECE A NEGOCIAR", after: " AGORA.", second: "CLIQUE NO BANNER." },
    en: { before: "OPEN YOUR ACCOUNT AND ", highlight: "START TRADING", after: " NOW.", second: "CLICK THE BANNER." },
    es: { before: "ABRE TU CUENTA Y ", highlight: "EMPIEZA A NEGOCIAR", after: " AHORA.", second: "HAZ CLIC EN EL BANNER." },
    fr: { before: "OUVREZ VOTRE COMPTE ET ", highlight: "COMMENCEZ A TRADER", after: " MAINTENANT.", second: "CLIQUEZ SUR LA BANNIERE." },
    hi: { before: "OPEN YOUR ACCOUNT AND ", highlight: "START TRADING", after: " NOW.", second: "CLICK THE BANNER." },
    ar: { before: "OPEN YOUR ACCOUNT AND ", highlight: "START TRADING", after: " NOW.", second: "CLICK THE BANNER." },
    tr: { before: "HESABINI AC VE ", highlight: "ISLEM YAPMAYA BASLA", after: ".", second: "BANNERA TIKLA." },
    id: { before: "BUKA AKUN ANDA DAN ", highlight: "MULAI TRADING", after: " SEKARANG.", second: "KLIK BANNER." },
    vi: { before: "MO TAI KHOAN VA ", highlight: "BAT DAU GIAO DICH", after: " NGAY.", second: "NHAP VAO BANNER." },
    th: { before: "??????????????????", highlight: "?????????", after: "??????", second: "???????????????" },
    ru: { before: "???????? ???? ? ", highlight: "??????? ?????????", after: " ??????.", second: "??????? ?? ??????." },
    ur: { before: "???? ?????? ?????? ??? ", highlight: "?????? ???? ????", after: "?", second: "???? ?? ??? ?????" },
    bn: { before: "????? ?????????? ????? ??? ", highlight: "??????? ???? ????", after: " ?????", second: "???????? ????? ?????" },
    ja: { before: "口座を開設して", highlight: "取引を開始", after: "しましょう。", second: "バナーをクリックしてください。" },
    ko: { before: "계좌를 개설하고 ", highlight: "거래를 시작하세요", after: ".", second: "배너를 클릭하세요." },
  };
  const cta = ctaMap[language as keyof typeof ctaMap] ?? ctaMap.en;

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
