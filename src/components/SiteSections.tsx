"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SUPPORTED_LOCALES, isRtlLocale, isSupportedLocale, localeToHtmlLang, translations, type Locale, type SupportedLocale } from "../i18n";
import { localeFromPublicPath, localeToUrlSegment, localizedPath } from "../i18n/routing";
import { fxproButtonLabels, fxproLinks } from "../data/fxproLinks";
import { getMarketLabel, publicMarketSlugs, type MarketSlug } from "../data/marketContent";
import { getInsightsPath, insightLabels, localeFromInsightsPath } from "../data/insightsContent";
import { getPublisherHubPath, publisherHubActivePaths } from "../publisher/public/paths";
import { getPlatformPath, platformSlugs } from "../data/platformContent";
import { languageMeta, persistLanguageChoice } from "../i18n/languageCatalog";
import { getYoutubeChannelUrl } from "../config/youtubeChannels";
import { LocaleFlagIcon } from "./LocaleFlagIcon";

export const ticker = [
  ["XAU/USD", "+0.74%", "up"],
  ["EUR/USD", "-0.18%", "down"],
  ["BTC/USD", "+1.42%", "up"],
  ["USOIL", "-0.52%", "down"],
  ["NASDAQ", "+0.91%", "up"],
  ["DXY", "-0.21%", "down"],
  ["GBP/JPY", "+0.36%", "up"],
  ["S&P 500", "+0.82%", "up"],
];

export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

export const ELITE_LASTLINK_URL = "https://lastlink.com/p/CE761BB8E/checkout-payment/";

export const ELITE_STRIPE_LINKS = [
  "https://buy.stripe.com/28E3cuccK1dEaub26QdfG01",
  "https://buy.stripe.com/aFa5kC7Wu6xY1XF9zidfG02",
  "https://buy.stripe.com/fZubJ00u28G631J26QdfG03",
  "https://buy.stripe.com/3cI4gy2Ca1dE59Rh1KdfG04",
] as const;

export const ELITE_CHECKOUT_URL = ELITE_LASTLINK_URL;
export const LOCALES = SUPPORTED_LOCALES;

const brandTaglineByLocale: Record<SupportedLocale, string> = {
  pt: "Mercado Global para o Investidor de Varejo",
  en: "Global Markets for Retail Investors",
  es: "Mercado Global para el Inversor Minorista",
  fr: "Marchés mondiaux pour l'investisseur particulier",
  de: "Globale Märkte für Privatanleger",
  it: "Mercati globali per l'investitore al dettaglio",
  ar: "الأسواق العالمية للمستثمر الفردي",
  fa: "بازارهای جهانی برای سرمایه‌گذار خرد",
  hi: "रिटेल निवेशक के लिए वैश्विक बाजार",
  ur: "خوردہ سرمایہ کار کے لیے عالمی مارکیٹس",
  bn: "খুচরা বিনিয়োগকারীদের জন্য বিশ্ববাজার",
  tr: "Bireysel Yatırımcı için Küresel Piyasalar",
  ru: "Глобальные рынки для частных инвесторов",
  id: "Pasar Global untuk Investor Ritel",
  vi: "Thị trường toàn cầu cho nhà đầu tư cá nhân",
  th: "ตลาดโลกสำหรับนักลงทุนรายย่อย",
  tl: "Pandaigdigang Merkado para sa Retail Investors",
  zh: "面向散户投资者的全球市场",
  ja: "個人投資家のためのグローバル市場",
  ko: "개인 투자자를 위한 글로벌 시장",
  pl: "Globalne rynki dla inwestorów detalicznych",
  he: "שווקים גלובליים למשקיע הקמעונאי",
};

function resolveLanguageMeta(locale: Locale) {
  return isSupportedLocale(locale) ? languageMeta[locale] : languageMeta.en;
}

export function getElitePlanHref(locale: Locale, planIndex: number) {
  return locale === "pt" ? ELITE_LASTLINK_URL : ELITE_STRIPE_LINKS[planIndex] ?? ELITE_STRIPE_LINKS[3];
}

export function getEliteHref(locale: Locale, fallback = "/sinais") {
  void fallback;
  return locale === "pt" ? ELITE_LASTLINK_URL : ELITE_STRIPE_LINKS[3];
}

export function getEliteTargetProps(locale: Locale) {
  void locale;
  return { target: "_blank", rel: "noopener noreferrer" };
}

export function eliteLinkProps(locale: Locale, fallback = "/sinais") {
  return {
    href: getEliteHref(locale, fallback),
    ...getEliteTargetProps(locale),
  };
}

export function trackVarejoClick(event: string, payload: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const detail = { event, ...payload };
  window.dispatchEvent(new CustomEvent("varejo:track", { detail }));
  const dataLayer = (window as Window & { dataLayer?: Record<string, string>[] }).dataLayer;
  if (Array.isArray(dataLayer)) dataLayer.push(detail);
}

export function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "en";

  const languages = navigator.languages?.length ?navigator.languages : [navigator.language];
  const detected = languages.join(" ").toLowerCase();

  if (detected.includes("pt")) return "pt";
  if (detected.includes("es")) return "es";
  if (detected.includes("fr")) return "fr";
  if (detected.includes("it")) return "it";
  if (detected.includes("de")) return "de";
  if (detected.includes("fa") || detected.includes("fa-ir")) return "fa";
  if (detected.includes("hi")) return "hi";
  if (detected.includes("ar")) return "ar";
  if (detected.includes("tr")) return "tr";
  if (detected.includes("id") || detected.includes("id-id")) return "id";
  if (detected.includes("vi") || detected.includes("vi-vn")) return "vi";
  if (detected.includes("th") || detected.includes("th-th")) return "th";
  if (detected.includes("ru") || detected.includes("ru-ru")) return "ru";
  if (detected.includes("ur") || detected.includes("ur-pk")) return "ur";
  if (detected.includes("bn") || detected.includes("bn-bd")) return "bn";
  if (detected.includes("ja") || detected.includes("ja-jp")) return "ja";
  if (detected.includes("ko") || detected.includes("ko-kr")) return "ko";
  if (detected.includes("zh") || detected.includes("zh-cn") || detected.includes("zh-sg")) return "zh";
  if (detected.includes("pl") || detected.includes("pl-pl")) return "pl";
  if (detected.includes("tl") || detected.includes("fil") || detected.includes("ph")) return "tl";
  if (detected.includes("en")) return "en";

  return "en";
}

function isLocale(value: string | null): value is Locale {
  return isSupportedLocale(value);
}

function localeFromPath(pathname: string | null): Locale | null {
  const insightsLocale = localeFromInsightsPath(pathname);
  if (insightsLocale) return insightsLocale;
  return localeFromPublicPath(pathname);
}

function applyDocumentLocale(nextLocale: Locale) {
  document.documentElement.lang = localeToHtmlLang(nextLocale);
  document.documentElement.dir = isRtlLocale(nextLocale) ? "rtl" : "ltr";
}

export function useSiteLocale() {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>("en");
  const t = translations[locale];

  useEffect(() => {
    const routedLocale = localeFromPath(pathname);
    const saved =
      window.localStorage.getItem("varejo_language") ??
      window.localStorage.getItem("language") ??
      window.localStorage.getItem("varejo-investidor-locale");
    const nextLocale = routedLocale ?? (isLocale(saved) ? saved : detectLocale());
    setLocale(nextLocale);
    applyDocumentLocale(nextLocale);
  }, [pathname]);

  function changeLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    applyDocumentLocale(nextLocale);
    if (isSupportedLocale(nextLocale)) {
      persistLanguageChoice(nextLocale);
    }
    const nextPath = localizedPath(pathname, nextLocale);
    const currentPath = `${window.location.pathname}${window.location.hash}`;
    if (nextPath !== currentPath) window.location.assign(nextPath);
  }

  return { locale, t, changeLocale };
}

export function Sparkline({ tone = "up" }: { tone?: string }) {
  const color = tone === "up" ?"#0f8f56" : "#c72f2f";

  return (
    <svg viewBox="0 0 220 70" className="h-16 w-full overflow-visible" aria-hidden="true">
      <path
        d="M3 58 C 24 46, 38 50, 54 35 S 82 18, 101 31 131 56, 154 23 181 29 217 8"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M3 58 C 24 46, 38 50, 54 35 S 82 18, 101 31 131 56, 154 23 181 29 217 8"
        fill="none"
        stroke={color}
        strokeOpacity="0.15"
        strokeWidth="14"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      variants={fadeUp}
      className="max-w-4xl"
    >
      <p className="text-xs font-bold uppercase tracking-[0.32em] text-ink/[0.45]">{eyebrow}</p>
      <h2 className="mt-4 text-balance font-serif text-4xl leading-[1] tracking-[-0.04em] md:text-6xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-ink/[0.66] md:text-lg">{text}</p>
    </motion.div>
  );
}

export function LanguageSwitcher({
  locale,
  onChange,
  variant = "compact",
}: {
  locale: Locale;
  onChange: (locale: Locale) => void;
  variant?: "compact" | "footer" | "mobile";
}) {
  return (
    <div
      className={`language-switcher shrink-0 border border-ink/[0.12] bg-paper p-1 shadow-fine ${
        variant === "mobile" ? "mobile-language-grid" : "flex items-center"
      } ${variant === "footer" ? "flex-wrap gap-1" : ""}`}
    >
      {LOCALES.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={`language-option px-2.5 py-2 text-[10px] font-bold transition sm:px-3 sm:text-[11px] ${
            variant === "footer" ? "tracking-[0.08em]" : "uppercase tracking-[0.14em] sm:tracking-[0.18em]"
          } ${
            locale === item
              ? "bg-gold text-ink"
              : "text-ink/[0.72] hover:bg-paper/[0.06] hover:text-ink"
          }`}
          aria-pressed={locale === item}
        >
          <span className="language-button-inner inline-flex items-center justify-center gap-1.5">
            <LocaleFlagIcon locale={item} />
            <span>{variant === "footer" ? languageMeta[item].name : languageMeta[item].code}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

function DesktopLanguageDropdown({
  locale,
  onChange,
}: {
  locale: Locale;
  onChange: (locale: Locale) => void;
}) {
  const active = resolveLanguageMeta(locale);

  return (
    <details className="desktop-language-dropdown header-dropdown">
      <summary className="header-dropdown-trigger desktop-language-trigger">
        <span className="language-button-inner inline-flex items-center justify-center gap-2">
          <LocaleFlagIcon locale={locale} />
          <span>{active.name}</span>
        </span>
        <span className="header-dropdown-chevron" aria-hidden="true">▾</span>
      </summary>
      <div className="header-dropdown-panel language-dropdown-panel">
        {LOCALES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`language-dropdown-option ${locale === item ? "is-active" : ""}`}
            aria-pressed={locale === item}
          >
            <LocaleFlagIcon locale={item} />
            <span>{languageMeta[item].name}</span>
          </button>
        ))}
      </div>
    </details>
  );
}

function HeaderDropdown({
  label,
  items,
  active,
}: {
  label: string;
  items: Array<{ label: string; href: string }>;
  active: boolean;
}) {
  return (
    <details className={`header-dropdown ${active ? "is-active" : ""}`}>
      <summary className={`nav-link header-dropdown-trigger text-ink ${active ? "active" : ""}`}>
        <span>{label}</span>
        <span className="header-dropdown-chevron" aria-hidden="true">▾</span>
      </summary>
      <div className="header-dropdown-panel">
        {items.map((item) => (
          <a key={`${item.href}-${item.label}`} href={item.href} className="header-dropdown-item">
            <span>{item.label}</span>
            <span aria-hidden="true">→</span>
          </a>
        ))}
      </div>
    </details>
  );
}

export function SiteChrome({
  locale,
  t,
  onLocaleChange,
}: {
  locale: Locale;
  t: (typeof translations)[Locale];
  onLocaleChange: (locale: Locale) => void;
}) {
  const pathname = usePathname();
  const safeT = t ?? translations.en;
  const insightNavLabel = insightLabels[locale]?.nav ?? insightLabels.en.nav;

  const menuA11y =
    locale === "he"
      ? { open: "פתיחת תפריט", close: "סגירת תפריט" }
      : locale === "ar"
        ? { open: "فتح القائمة", close: "إغلاق القائمة" }
        : locale === "pt"
          ? { open: "Abrir menu", close: "Fechar menu" }
          : locale === "es"
            ? { open: "Abrir menú", close: "Cerrar menú" }
            : { open: "Open menu", close: "Close menu" };
  const [mobileLanguageOpen, setMobileLanguageOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMarketsOpen, setMobileMarketsOpen] = useState(false);

  useEffect(() => {
    setMobileLanguageOpen(false);
  }, []);

  useEffect(() => {
    const chrome = document.querySelector<HTMLElement>(".site-chrome");
    if (!chrome || typeof ResizeObserver === "undefined") return;

    const syncChromeHeight = () => {
      const height = Math.ceil(chrome.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--vi-site-chrome-height", `${height}px`);
      document.documentElement.style.setProperty("--mobile-header-height", `${height}px`);
    };

    syncChromeHeight();
    const observer = new ResizeObserver(syncChromeHeight);
    observer.observe(chrome);
    window.addEventListener("resize", syncChromeHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncChromeHeight);
    };
  }, [mobileLanguageOpen, mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  function handleMobileLocaleChange(nextLocale: Locale) {
    onLocaleChange(nextLocale);
    window.localStorage.setItem("varejo_language", nextLocale);
    window.localStorage.setItem("varejo_language_selected", "true");
    setMobileLanguageOpen(false);
    setMobileMenuOpen(false);
  }

  const brandTagline = isSupportedLocale(locale) ? brandTaglineByLocale[locale] : brandTaglineByLocale.pt;
  const marketDropdownLabels: Record<Locale, Record<"markets" | "forex" | "stocks" | "crypto" | "etfs" | "funds", string>> = {
    pt: { markets: "Mercados", forex: "Forex", stocks: "Ações", crypto: "Criptomoedas", etfs: "ETFs", funds: "Fundos Imobiliários" },
    en: { markets: "Markets", forex: "Forex", stocks: "Stocks", crypto: "Crypto", etfs: "ETFs", funds: "Real Estate Funds" },
    es: { markets: "Mercados", forex: "Forex", stocks: "Acciones", crypto: "Criptomonedas", etfs: "ETFs", funds: "Fondos Inmobiliarios" },
    fr: { markets: "Marchés", forex: "Forex", stocks: "Actions", crypto: "Cryptoactifs", etfs: "ETF", funds: "Fonds immobiliers" },
    de: { markets: "Märkte", forex: "Forex", stocks: "Aktien", crypto: "Krypto", etfs: "ETFs", funds: "Immobilienfonds" },
    it: { markets: "Mercati", forex: "Forex", stocks: "Azioni", crypto: "Criptoattivi", etfs: "ETF", funds: "Fondi immobiliari" },
    fa: { markets: "بازارها", forex: "فارکس", stocks: "سهام", crypto: "رمزارزها", etfs: "ETF", funds: "صندوق‌های املاک" },
    pl: { markets: "Rynki", forex: "Forex", stocks: "Akcje", crypto: "Krypto", etfs: "ETF", funds: "Fundusze nieruchomości" },
    zh: { markets: "市场", forex: "外汇", stocks: "股票", crypto: "加密资产", etfs: "ETF", funds: "房地产基金" },
    tl: { markets: "Mga Merkado", forex: "Forex", stocks: "Mga stock", crypto: "Kripto", etfs: "Mga ETF", funds: "Mga pondong real estate" },
    hi: { markets: "बाज़ार", forex: "Forex", stocks: "शेयर", crypto: "क्रिप्टो", etfs: "ETFs", funds: "रियल एस्टेट फंड" },
    ar: { markets: "الأسواق", forex: "الفوركس", stocks: "الأسهم", crypto: "الكريبتو", etfs: "ETFs", funds: "صناديق عقارية" },
    tr: { markets: "Piyasalar", forex: "Forex", stocks: "Hisseler", crypto: "Kripto", etfs: "ETF'ler", funds: "Gayrimenkul Fonları" },
    id: { markets: "Pasar", forex: "Forex", stocks: "Saham", crypto: "Kripto", etfs: "ETFs", funds: "Dana Properti" },
    vi: { markets: "Thị trường", forex: "Forex", stocks: "Cổ phiếu", crypto: "Tiền điện tử", etfs: "ETFs", funds: "Quỹ bất động sản" },
    th: { markets: "ตลาด", forex: "Forex", stocks: "หุ้น", crypto: "คริปโต", etfs: "ETFs", funds: "กองทุนอสังหาริมทรัพย์" },
    ru: { markets: "Рынки", forex: "Forex", stocks: "Акции", crypto: "Крипто", etfs: "ETFs", funds: "Фонды недвижимости" },
    ur: { markets: "مارکیٹس", forex: "Forex", stocks: "اسٹاکس", crypto: "کرپٹو", etfs: "ETFs", funds: "ریئل اسٹیٹ فنڈز" },
    bn: { markets: "বাজার", forex: "Forex", stocks: "শেয়ার", crypto: "ক্রিপ্টো", etfs: "ETFs", funds: "রিয়েল এস্টেট ফান্ড" },
    ja: { markets: "マーケット", forex: "Forex", stocks: "株式", crypto: "暗号資産", etfs: "ETFs", funds: "不動産ファンド" },
    ko: { markets: "시장", forex: "Forex", stocks: "주식", crypto: "암호화폐", etfs: "ETFs", funds: "부동산 펀드" },
    he: { markets: "שווקים", forex: "Forex", stocks: "מניות", crypto: "קריפטו", etfs: "ETFs", funds: "קרנות נדלן" },
  };
  const marketLabels = marketDropdownLabels[locale] ?? marketDropdownLabels.en;
  const localePrefix = localeToUrlSegment(locale);
  const localizedPage = (path: string) => localizedPath(path, locale);
  const marketPrefix = localePrefix ? `/${localePrefix}` : "";
  const marketItems = [
    { label: marketLabels.forex, href: `${marketPrefix}/forex` },
    { label: marketLabels.stocks, href: locale === "pt" ? "/acoes" : `${marketPrefix}/stocks` },
    { label: marketLabels.crypto, href: locale === "pt" ? "/cripto" : `${marketPrefix}/crypto` },
    { label: marketLabels.etfs, href: `${marketPrefix}/etfs` },
    { label: getMarketLabel("ouro", locale), href: locale === "pt" ? "/ouro" : `${marketPrefix}/gold` },
    { label: getMarketLabel("petroleo", locale), href: locale === "pt" ? "/petroleo" : `${marketPrefix}/oil` },
    { label: getMarketLabel("commodities", locale), href: `${marketPrefix}/commodities` },
    ...(locale === "pt" ? [{ label: marketLabels.funds, href: "/fundos-imobiliarios" }] : []),
  ];
  const localizedHref = (page: "home" | "signals" | "education" | "services" | "about") => {
    if (page === "home") return localePrefix ? `/${localePrefix}` : "/#home";
    const ptPaths = {
      signals: "/sinais",
      education: "/educacao",
      services: "/servicos",
      about: "/sobre",
    };
    return localizedPage(ptPaths[page]);
  };
  const firstNavItems = useMemo(
    () => [
      { label: safeT.nav.home, href: localizedHref("home"), activePaths: ["/", ...SUPPORTED_LOCALES.map((item) => `/${item}`)] },
      { label: safeT.nav.signals, href: localizedHref("signals"), activePaths: ["/sinais", "/signals", `/${locale}/signals`] },
      { label: safeT.nav.education, href: localizedHref("education"), activePaths: ["/educacao", `/${locale}/education`] },
      { label: "Select", href: localizedPage("/select"), activePaths: ["/select", ...(localePrefix ? [`/${localePrefix}/select`] : []), "/servicos/select"] },
      { label: "Private", href: localizedPage("/private"), activePaths: ["/private", ...(localePrefix ? [`/${localePrefix}/private`] : [])] },
      { label: safeT.nav.services, href: localizedHref("services"), activePaths: ["/servicos", "/services", `/${locale}/services`] },
    ],
    [locale, safeT],
  );
  const isActivePath = (paths: string[]) => paths.some((path) => pathname === path || pathname?.startsWith(`${path}/`));
  const marketsActive = isActivePath(["/forex", "/acoes", "/cripto", "/etfs", "/fundos-imobiliarios", `/${locale}/forex`, `/${locale}/stocks`, `/${locale}/crypto`, `/${locale}/etfs`]);
  const mobilePrimaryItems = [
    ...firstNavItems,
    {
      label: insightNavLabel,
      href: getPublisherHubPath(locale),
      activePaths: publisherHubActivePaths(locale),
    },
    { label: safeT.nav.about, href: localizedHref("about"), activePaths: ["/sobre", "/about", `/${locale}/about`] },
  ];
  return (
    <div className="site-chrome fixed left-0 right-0 top-0 z-50">
      <div className="global-ticker border-b border-ink/[0.08] bg-ink px-3 text-paper md:px-5">
        <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-hidden py-1.5 text-[9px] uppercase tracking-[0.16em] sm:gap-7 sm:py-2 sm:text-[11px] sm:tracking-[0.22em]">
          <span className="shrink-0 text-gold">{safeT.tickerLabel}</span>
          <div className="ticker-track flex min-w-max gap-6">
            {[...ticker, ...ticker].map(([asset, move, tone], index) => (
              <span key={`${asset}-${index}`} className="ticker-item flex items-center gap-2">
                <span className="text-paper/75">{asset}</span>
                <span className={`ticker-value ${tone === "up" ?"text-rise" : "text-fall"}`}>{move}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <header className="site-header border-b border-ink/[0.08] bg-paper/[0.84] shadow-glass backdrop-blur-2xl">
        <nav className="site-header-nav mx-auto grid max-w-7xl items-center gap-4 px-4 py-3 md:px-8 md:py-4 xl:grid-cols-[minmax(260px,25%)_minmax(0,55%)_minmax(220px,20%)]">
          <a href={localizedHref("home")} className="site-brand group flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center border border-ink bg-ink text-xs font-bold text-paper sm:h-10 sm:w-10">VI</span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-serif text-lg sm:text-xl">Varejo Investidor</span>
              <span className="hidden text-[10px] uppercase tracking-[0.24em] text-ink/[0.45] sm:block">{brandTagline}</span>
            </span>
          </a>

          <button
            type="button"
            className="mobile-menu-button xl:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? menuA11y.close : menuA11y.open}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span className="mobile-menu-icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>

          <div className="desktop-main-menu hidden items-center justify-center gap-1 border border-ink/[0.08] bg-white p-1 text-sm text-ink/[0.66] shadow-fine xl:flex">
            {firstNavItems.map((item) => {
              const isActive = isActivePath(item.activePaths);
              return <a key={item.label} href={item.href} className={`nav-link px-3 py-2 text-ink ${isActive ? "active" : ""}`}>{item.label}</a>;
            })}
            <HeaderDropdown label={marketLabels.markets} items={marketItems} active={marketsActive} />
          </div>

          <div className="desktop-language-area hidden items-center justify-end xl:flex">
            <DesktopLanguageDropdown locale={locale} onChange={onLocaleChange} />
          </div>
        </nav>
        <div className="mobile-language-row border-t border-ink/[0.08] px-4 pb-2 xl:hidden">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(true);
              setMobileLanguageOpen(true);
            }}
            className="mobile-language-compact"
            aria-label={`${resolveLanguageMeta(locale).name}. Change language`}
          >
            <span className="mobile-language-globe" aria-hidden="true">◎</span>
            <span>{resolveLanguageMeta(locale).code}</span>
          </button>
        </div>
      </header>

      <div className={`mobile-drawer-layer xl:hidden ${mobileMenuOpen ? "is-open" : ""}`} aria-hidden={!mobileMenuOpen}>
        <button
          type="button"
          className="mobile-drawer-overlay"
          aria-label={menuA11y.close}
          tabIndex={mobileMenuOpen ? 0 : -1}
          onClick={() => setMobileMenuOpen(false)}
        />
        <aside id="mobile-navigation-drawer" className="mobile-navigation-drawer" role="dialog" aria-modal="true" aria-label="Site navigation">
          <div className="mobile-drawer-header">
            <a href={localizedHref("home")} className="mobile-drawer-brand" onClick={() => setMobileMenuOpen(false)}>
              <span>VI</span>
              <strong>Varejo Investidor</strong>
            </a>
            <button type="button" className="mobile-drawer-close" onClick={() => setMobileMenuOpen(false)} aria-label={menuA11y.close}>
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>

          <nav className="mobile-drawer-nav" aria-label="Mobile navigation">
            {mobilePrimaryItems.slice(0, 6).map((item) => (
              <a key={`${item.href}-${item.label}`} href={item.href} className={isActivePath(item.activePaths) ? "is-active" : ""}>
                <span>{item.label}</span>
              </a>
            ))}

            <div className={`mobile-drawer-group ${mobileMarketsOpen ? "is-open" : ""}`}>
              <button type="button" aria-expanded={mobileMarketsOpen} onClick={() => setMobileMarketsOpen((open) => !open)}>
                <span>{marketLabels.markets}</span><span className="mobile-drawer-chevron" aria-hidden="true">›</span>
              </button>
              <div className="mobile-drawer-submenu">
                {marketItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
              </div>
            </div>

            {mobilePrimaryItems.slice(6).map((item) => (
              <a key={`${item.href}-${item.label}`} href={item.href} className={isActivePath(item.activePaths) ? "is-active" : ""}>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="mobile-drawer-language">
            <button type="button" onClick={() => setMobileLanguageOpen((open) => !open)} aria-expanded={mobileLanguageOpen}>
              <span>{locale === "pt" ? "Idioma" : "Language"}</span>
              <span>{resolveLanguageMeta(locale).name} <span aria-hidden="true">›</span></span>
            </button>
            {mobileLanguageOpen ? <LanguageSwitcher locale={locale} onChange={handleMobileLocaleChange} variant="mobile" /> : null}
          </div>

          <div className="mobile-drawer-actions">
            <a href={safeT.freeChannel.link} target="_blank" rel="noopener noreferrer" className="is-primary">{safeT.freeChannel.button}</a>
            <a href={localizedPage("/select")}>Select</a>
            <a href={localizedPage("/private")}>Private</a>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function SignalTicket({ t }: { t: (typeof translations)[Locale] }) {
  const isPortuguese = t.locale === "PT";
  const isSpanish = t.locale === "ES";
  const isArabic = t.locale === "AR";
  const isTurkish = t.locale === "TR";
  const isHindi = t.locale === "HI";
  const isIndonesian = t.locale === "ID";
  const isVietnamese = t.locale === "VI";
  const extraLabels =
    isHindi
      ? { timeframe: "\u0938\u092E\u092F \u0905\u0935\u0927\u093F", risk: "\u091C\u094B\u0916\u093F\u092E", riskValue: "\u092E\u0927\u094D\u092F\u092E", signal: "\u0938\u093F\u0917\u094D\u0928\u0932", time: "\u0938\u092E\u092F", live: "\u0932\u093E\u0907\u0935", copy: "\u0938\u0940\u0927\u0947 WHATSAPP \u092A\u0930 \u092D\u0947\u091C\u093E \u0917\u092F\u093E" }
      : isSpanish
        ? { timeframe: "TEMPORALIDAD", risk: "RIESGO", riskValue: "MODERADO", signal: "SE\u00D1AL", time: "HORARIO", live: "EN VIVO", copy: "ENVIADA DIRECTAMENTE EN WHATSAPP" }
        : isArabic
          ? { timeframe: "الإطار الزمني", risk: "المخاطر", riskValue: "متوسطة", signal: "الإشارة", time: "الوقت", live: "مباشر", copy: "أرسلت مباشرة داخل قناة النخبة" }
          : isTurkish
            ? { timeframe: "ZAMAN DİLİMİ", risk: "RİSK", riskValue: "ORTA", signal: "SİNYAL", time: "SAAT", live: "CANLI", copy: "DOĞRUDAN ELITE KANALINDA GÖNDERİLDİ" }
            : { timeframe: "TIMEFRAME", risk: isPortuguese ? "RISCO" : "RISK", riskValue: isPortuguese ? "MODERADO" : "MODERATE", signal: isPortuguese ? "SINAL" : "SIGNAL", time: isPortuguese ? "HOR\u00C1RIO" : "TIME", live: isPortuguese ? "AO VIVO" : "LIVE", copy: isPortuguese ? "ENVIADO DIRETAMENTE NO WHATSAPP" : "SENT DIRECTLY ON WHATSAPP" };
  const rows = [
    [t.signalBlock.example.asset, t.signalBlock.example.values.asset], [t.signalBlock.example.direction, t.signalBlock.example.values.direction], [t.signalBlock.example.entry, t.signalBlock.example.values.entry], [t.signalBlock.example.target, t.signalBlock.example.values.target], [t.signalBlock.example.stop, t.signalBlock.example.values.stop], [extraLabels.timeframe, "4H"], [extraLabels.risk, extraLabels.riskValue], [extraLabels.signal, "#4169"], [extraLabels.time, "09:42 UTC"], [t.signalBlock.example.status, t.signalBlock.example.values.status],
  ];
  const exampleEyebrow = isPortuguese
    ? "EXEMPLO NO WHATSAPP"
    : isSpanish
      ? "EJEMPLO EN WHATSAPP"
      : isHindi
        ? "WHATSAPP \u092A\u0930 \u0938\u093F\u0917\u094D\u0928\u0932 \u0909\u0926\u093E\u0939\u0930\u0923"
        : isArabic
          ? "مثال عبر واتساب"
          : isTurkish
            ? "WHATSAPP SİNYAL ÖRNEĞİ"
            : isIndonesian
              ? "CONTOH DI WHATSAPP"
              : isVietnamese
                ? "VÍ DỤ TRÊN WHATSAPP"
                : "SIGNAL EXAMPLE ON WHATSAPP";
  const deliveryCopy = isPortuguese
    ? "ENVIADO DIRETAMENTE NO WHATSAPP"
    : isSpanish
      ? "ENVIADA DIRECTAMENTE EN WHATSAPP"
      : isHindi
        ? "\u0938\u0940\u0927\u0947 WHATSAPP \u092A\u0930 \u092D\u0947\u091C\u093E \u0917\u092F\u093E"
        : isArabic
          ? "مرسلة مباشرة عبر واتساب"
          : isTurkish
            ? "DOĞRUDAN WHATSAPP ÜZERİNDEN GÖNDERİLDİ"
            : isIndonesian
              ? "DIKIRIM LANGSUNG DI WHATSAPP"
              : isVietnamese
                ? "GỬI TRỰC TIẾP TRÊN WHATSAPP"
                : "SENT DIRECTLY ON WHATSAPP";

  return (
    <div className="signal-terminal terminal-shell relative overflow-hidden border border-rise/[0.28] bg-ink p-4 text-paper shadow-premium">
      <div className="absolute inset-0 terminal-grid opacity-25" />
      <div className="flex items-center justify-between gap-3 border-b border-paper/[0.12] pb-4">
        <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold">{exampleEyebrow}</p>
          <h3 className="mt-1 font-serif text-2xl tracking-[-0.04em] sm:text-3xl">{t.signalBlock.example.title}</h3>
        </div>
        <div className="relative flex items-center gap-2 border border-rise/[0.26] bg-rise/[0.08] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-rise"><span className="live-dot h-2.5 w-2.5 rounded-full bg-rise" />{extraLabels.live}</div>
      </div>
      <div className="relative mt-5 grid gap-2 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[96px_1fr] border border-paper/[0.09] bg-paper/[0.035] sm:grid-cols-[110px_1fr]">
            <p className="border-r border-paper/[0.09] px-3 py-3 text-[10px] uppercase tracking-[0.16em] text-paper/[0.42] sm:tracking-[0.2em]">{label}</p>
            <p className={`px-3 py-3 font-mono text-sm font-bold ${value === t.signalBlock.example.values.direction || value === t.signalBlock.example.values.status ?"text-rise" : "text-paper"}`}>{value}</p>
          </div>
        ))}
      </div>
      <div className="signal-delivery-badge relative mt-5 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-rise sm:tracking-[0.2em]">{deliveryCopy}</div>
    </div>
  );
}

export function WhatsAppIcon({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`whatsapp-pulse grid h-12 w-12 shrink-0 place-items-center rounded-full border ${
        dark ?"border-rise/[0.38] bg-rise text-paper" : "border-rise/[0.38] bg-rise text-paper"
      }`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M7.3 20.1 4 21l.9-3.2A8.4 8.4 0 1 1 7.3 20.1Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M8.7 8.4c.2-.5.4-.6.8-.6h.6c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.4.5c-.1.1-.2.3 0 .5.5 1 1.4 1.8 2.5 2.3.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.7-.1l1.5.7c.3.1.4.3.4.6 0 .6-.4 1.4-.9 1.7-.6.4-1.8.4-3.4-.4-2.6-1.2-4.4-3.2-5.2-5.1-.4-.9-.2-1.6.2-2Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

export function FreeChannelCTA({
  t,
  variant = "dark",
  compact = false,
}: {
  t: (typeof translations)[Locale];
  variant?: "light" | "dark";
  compact?: boolean;
}) {
  const dark = variant === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden border shadow-fine ${
        dark ?"border-rise/[0.28] bg-ink text-paper shadow-[0_26px_80px_rgba(15,143,86,0.13)]" : "border-rise/[0.28] bg-ink text-paper shadow-[0_26px_80px_rgba(15,143,86,0.13)]"
      } ${compact ?"p-4" : "p-5 md:p-7"}`}
    >
      <div className="absolute inset-0 terminal-grid opacity-35" />
      <div className="absolute -right-24 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-rise/[0.18] blur-3xl" />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <WhatsAppIcon dark />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-rise">
              {t.freeChannel.eyebrow}
            </p>
            <h3 className="mt-2 font-serif text-3xl uppercase tracking-[-0.03em]">{t.freeChannel.title}</h3>
            <p className="mt-2 max-w-2xl leading-7 text-paper/[0.72]">
              {t.freeChannel.text}
            </p>
          </div>
        </div>
        <a
          href={t.freeChannel.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackVarejoClick("canal_formiga_click", { locale: t.locale.toLowerCase() })}
          className="shrink-0 border border-rise bg-rise px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-paper shadow-[0_18px_40px_rgba(15,143,86,0.25)] transition hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-ink sm:min-w-[260px]"
        >
          {t.freeChannel.button}
        </a>
      </div>
    </motion.div>
  );
}

export function WhatsAppSignalExample({
  t,
  locale = "en",
  onEliteClick,
  whatsappHref,
}: {
  t: (typeof translations)[Locale];
  locale?: Locale;
  onEliteClick?: () => void;
  /** Quando definido, o CTA de exemplo leva ao canal WhatsApp (ex.: Lobo gratuito). */
  whatsappHref?: string;
}) {
  const chartLabel = locale === "es" ? "Gr\u00E1fico 4H" : locale === "pt" ? "Gr\u00E1fico 4H" : "4H chart";
  const liveLabel = locale === "es" ? "En vivo" : locale === "pt" ? "Ao vivo" : "Live";
  const fields = [
    t.signalExample.signal,
    t.signalExample.asset,
    t.signalExample.takeProfit,
    t.signalExample.stopLoss,
  ];

  return (
    <section className="signal-example-box border-y border-ink/[0.08] bg-white px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
        <div>
          <SectionHeader eyebrow={t.signalExample.eyebrow} title={t.signalExample.title} text={t.signalExample.text} />
          {whatsappHref ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button-gold mt-8 inline-block border border-gold bg-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5"
            >
              {t.signalExample.cta}
            </a>
          ) : onEliteClick ? (
            <button
              type="button"
              onClick={onEliteClick}
              className="premium-button-gold mt-8 inline-block border border-gold bg-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5"
            >
              {t.signalExample.cta}
            </button>
          ) : (
            <a
              {...eliteLinkProps(locale)}
              className="premium-button-gold mt-8 inline-block border border-gold bg-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5"
            >
              {t.signalExample.cta}
            </a>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="glass-panel p-3"
        >
          <div className="overflow-hidden border border-ink bg-paper p-4 shadow-premium">
            <div className="border border-ink/[0.08] bg-white">
              <div className="flex items-center gap-3 border-b border-ink/[0.08] bg-[#0f8f56] px-4 py-3 text-white">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/18 font-bold">VI</span>
                <div>
                  <p className="font-semibold">Varejo Investidor</p>
                  <p className="text-xs text-white/70">Canal Elite | WhatsApp</p>
                </div>
              </div>

              <div className="p-4 md:p-6">
                <div className="ml-auto max-w-xl rounded-sm border border-ink/[0.08] bg-paper p-4 shadow-fine">
                  <div className="space-y-2 font-mono text-sm">
                    {fields.map((field) => (
                      <p key={field} className="border-b border-ink/[0.06] pb-2 last:border-b-0">
                        {field}
                      </p>
                    ))}
                  </div>
                  <div className="mt-5 border border-ink/[0.08] bg-ink p-4 text-paper">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/[0.48]">{chartLabel}</p>
                      <p className="text-xs text-rise">{liveLabel}</p>
                    </div>
                    <div className="mt-5">
                      <Sparkline />
                    </div>
                  </div>
                  <div className="mt-5 border-l-2 border-rise bg-rise/[0.08] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-rise">
                      {t.signalExample.analysisTitle}
                    </p>
                    <p className="mt-2 leading-7 text-ink/[0.7]">{t.signalExample.analysis}</p>
                  </div>
                  <p className="mt-4 text-right text-[11px] text-ink/[0.45]">09:42</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function BrokerBanners({ t }: { t: (typeof translations)[Locale] }) {
  const locale = t.locale.toLowerCase() as Locale;
  const brokers = [
    { ...t.brokers.forex, button: fxproButtonLabels[locale], link: fxproLinks[locale], tone: "forex", symbol: "$" },
    { ...t.brokers.crypto, tone: "crypto", symbol: "₿" },
  ];
  const indicators =
    t.locale === "HI"
      ? ["\u0935\u093F\u0936\u094D\u0935 \u0938\u094D\u0924\u0930\u0940\u092F \u092C\u094D\u0930\u094B\u0915\u0930", "\u0928\u093F\u0937\u094D\u092A\u093E\u0926\u0928", "\u0938\u0941\u0930\u0915\u094D\u0937\u093E", "\u0909\u092A\u092F\u094B\u0917 \u0915\u093F\u092F\u093E \u0917\u092F\u093E \u092A\u094D\u0932\u0947\u091F\u092B\u0949\u0930\u094D\u092E"]
      : t.locale === "ES"
        ? ["Corredor l\u00EDder global", "Ejecuci\u00F3n", "Protecci\u00F3n", "Plataforma utilizada"]
        : t.locale === "EN"
          ? ["World-leading broker", "Execution", "Protection", "Platform used"]
          : ["Corretora n\u00FAmero 1 do mundo", "Execu\u00E7\u00E3o", "Prote\u00E7\u00E3o", "Plataforma utilizada"];

  return (
    <section className="px-5 py-14 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={t.brokers.eyebrow} title={t.brokers.title} text={t.brokers.text} />
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {brokers.map((broker) => (
            <motion.article
              key={broker.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className={`broker-card broker-card-${broker.tone} terminal-module relative overflow-hidden border border-ink/[0.1] bg-white p-6 shadow-fine transition hover:-translate-y-1 hover:shadow-premium md:p-8`}
            >
              <div className={broker.tone === "forex" ?"absolute inset-0 luxury-grid opacity-45" : "absolute inset-0 signal-grid opacity-50"} />
              <div className="relative">
                <div
                  className={`mb-6 grid h-14 w-14 place-items-center border font-mono text-2xl font-bold ${
                    broker.tone === "forex" ?"border-rise/[0.35] text-rise" : "border-gold/[0.45] text-gold"
                  }`}
                  aria-hidden="true"
                >
                  {broker.symbol}
                </div>
                <p className={`text-xs font-bold uppercase tracking-[0.26em] ${broker.tone === "forex" ?"text-rise" : "text-ink/[0.45]"}`}>
                  {broker.label.toUpperCase()}
                </p>
                <h3 className="mt-6 font-serif text-4xl leading-[1.02] tracking-[-0.04em]">{broker.title}</h3>
                <p className="mt-5 max-w-xl leading-8 text-ink/[0.66]">{broker.text}</p>
                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  {indicators.map((indicator) => (
                    <span key={`${broker.label}-${indicator}`} className="border border-ink/[0.1] bg-paper/[0.035] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-ink/[0.58]">
                      {indicator}
                    </span>
                  ))}
                </div>
                <a
                  href={broker.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`broker-action broker-action-${broker.tone} mt-8 inline-block px-5 py-4 text-sm font-bold uppercase tracking-[0.16em] transition`}
                >
                  {broker.button}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SupportFooter({
  t,
  locale,
  onLocaleChange,
}: {
  t: (typeof translations)[Locale];
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}) {
  const brandTagline = isSupportedLocale(locale) ? brandTaglineByLocale[locale] : brandTaglineByLocale.pt;
  const footerLabels: {
    social: string;
    levels: string;
    markets: string;
    content: string;
    platforms: string;
    tools: string;
    language: string;
    marketLine: string;
    levelLinks: [string, string, string, string];
    forexCalculator: string;
    compoundInterestTool: string;
    portfolioXrayTool?: string;
  } =
    locale === "hi"
      ? {
          social: "\u0938\u094B\u0936\u0932",
          levels: "\u0938\u094D\u0924\u0930",
          markets: "\u092C\u093E\u091C\u093E\u0930",
          content: "\u092C\u093E\u091C\u093E\u0930",
          platforms: "\u092A\u094D\u0932\u0947\u091F\u092B\u093C\u0949\u0930\u094D\u092E",
          tools: "\u091F\u0942\u0932\u094D\u0938",
          language: "\u092D\u093E\u0937\u093E",
          marketLine: "Forex | क्रिप्टो | कमोडिटी | वैश्विक बाजार",
          levelLinks: ["\u091A\u0940\u0902\u091F\u0940 \u0938\u094D\u0924\u0930", "\u092D\u0947\u0921\u093C\u093F\u092F\u093E \u0938\u094D\u0924\u0930", "\u0917\u0930\u0941\u0921\u093C \u0938\u094D\u0924\u0930", "Select"],
          forexCalculator: "Forex कैलकुलेटर",
          compoundInterestTool: "\u0915\u0902\u092A\u093E\u0909\u0902\u0921 \u0907\u0902\u091F\u0930\u0947\u0938\u094D\u091F \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930",
        }
      : locale === "es"
        ? {
            social: "Redes",
            levels: "Niveles",
            markets: "Mercados",
            content: "Mercados",
            platforms: "Plataformas",
            tools: "Herramientas",
            language: "Idioma",
            marketLine: "Forex | Cripto | Commodities | Mercados Globales",
            levelLinks: ["Nivel Formiga", "Nivel Lobo", "Nivel Harpia", "Select"],
            forexCalculator: "Calculadora Forex",
            compoundInterestTool: "Calculadora de inter\u00E9s compuesto",
          }
        : locale === "pt"
          ? {
              social: "Redes",
              levels: "N\u00EDveis",
              markets: "Mercados",
              content: "Mercados",
              platforms: "Plataformas",
              tools: "Ferramentas",
              language: "Idioma",
              marketLine: "Forex | Cripto | Commodities | Mercados Globais",
              levelLinks: ["N\u00EDvel Formiga", "N\u00EDvel Lobo", "N\u00EDvel Harpia", "Select"],
              forexCalculator: "Calculadora Forex",
              compoundInterestTool: "Calculadora de Juros Compostos",
              portfolioXrayTool: "Raio-X da Carteira Global",
            }
          : locale === "ar"
            ? {
                social: "\u0627\u0644\u0634\u0628\u0643\u0627\u062A",
                levels: "\u0627\u0644\u0645\u0633\u062A\u0648\u064A\u0627\u062A",
                markets: "\u0627\u0644\u0623\u0633\u0648\u0627\u0642",
                content: "\u0627\u0644\u0623\u0633\u0648\u0627\u0642",
                platforms: "\u0627\u0644\u0645\u0646\u0635\u0627\u062A",
                tools: "\u0627\u0644\u0623\u062F\u0648\u0627\u062A",
                language: "\u0627\u0644\u0644\u063A\u0629",
                marketLine: "Forex | Crypto | Commodities | Global Markets",
                levelLinks: ["\u0645\u0633\u062A\u0648\u0649 Formiga", "\u0645\u0633\u062A\u0648\u0649 Lobo", "\u0645\u0633\u062A\u0648\u0649 Harpia", "Select"],
                forexCalculator: "\u062D\u0627\u0633\u0628\u0629 Forex",
                compoundInterestTool: "\u062D\u0627\u0633\u0628\u0629 \u0627\u0644\u0641\u0627\u0626\u062F\u0629 \u0627\u0644\u0645\u0631\u0643\u0628\u0629",
              }
            : locale === "he"
              ? {
                  social: "רשתות",
                  levels: "רמות",
                  markets: "שווקים",
                  content: "שווקים",
                  platforms: "פלטפורמות",
                  tools: "כלים",
                  language: "שפה",
                  marketLine: "Forex | Crypto | Commodities | Global Markets",
                  levelLinks: ["רמת Formiga", "רמת Lobo", "רמת Harpia", "Select"],
                  forexCalculator: "מחשבון Forex",
                  compoundInterestTool: "מחשבון ריבית דריבית",
                }
            : locale === "tr"
              ? {
                  social: "Sosyal",
                  levels: "Seviyeler",
                  markets: "Piyasalar",
                  content: "Piyasalar",
                  platforms: "Platformlar",
                  tools: "Ara\u00E7lar",
                  language: "Dil",
                  marketLine: "Forex | Kripto | Emtialar | K\u00FCresel Piyasalar",
                  levelLinks: ["Formiga Seviyesi", "Lobo Seviyesi", "Harpia Seviyesi", "Select"],
                  forexCalculator: "Forex Hesaplay\u0131c\u0131",
                  compoundInterestTool: "Bile\u015Fik Faiz Hesaplay\u0131c\u0131",
                }
              : {
                  social: "Social",
                  levels: "Levels",
                  markets: "Markets",
                  content: "Markets",
                  platforms: locale === "id" ? "Platform" : locale === "vi" ? "N\u1EC1n t\u1EA3ng" : "Platforms",
                  tools: locale === "id" ? "Alat" : locale === "vi" ? "C\u00F4ng c\u1EE5" : "Tools",
                  language: "Language",
                  marketLine: "Forex | Crypto | Commodities | Global Markets",
                  levelLinks: ["Formiga Level", "Lobo Level", "Harpia Level", "Select"],
                  forexCalculator: locale === "id" ? "Kalkulator Forex" : locale === "vi" ? "M\u00E1y T\u00EDnh Forex" : locale === "th" ? "\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E04\u0E33\u0E19\u0E27\u0E13 Forex" : locale === "ru" ? "\u041A\u0430\u043B\u044C\u043A\u0443\u043B\u044F\u0442\u043E\u0440 Forex" : locale === "ja" ? "Forex\u8A08\u7B97\u6A5F" : locale === "ko" ? "Forex \uACC4\uC0B0\uAE30" : locale === "fr" ? "Calculateur Forex" : "Forex Calculator",
                  compoundInterestTool: locale === "id" ? "Kalkulator Bunga Majemuk" : locale === "vi" ? "M\u00E1y T\u00EDnh L\u00E3i K\u00E9p" : locale === "th" ? "\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E04\u0E33\u0E19\u0E27\u0E13\u0E14\u0E2D\u0E01\u0E40\u0E1A\u0E35\u0E49\u0E22\u0E17\u0E1A\u0E15\u0E49\u0E19" : locale === "ru" ? "\u041A\u0430\u043B\u044C\u043A\u0443\u043B\u044F\u0442\u043E\u0440 \u0441\u043B\u043E\u0436\u043D\u044B\u0445 \u043F\u0440\u043E\u0446\u0435\u043D\u0442\u043E\u0432" : locale === "ur" ? "\u06A9\u0645\u067E\u0627\u0624\u0646\u0688 \u0627\u0646\u0679\u0631\u0633\u0679 \u06A9\u06CC\u0644\u06A9\u0648\u0644\u06CC\u0679\u0631" : locale === "bn" ? "\u099A\u0995\u09CD\u09B0\u09AC\u09C3\u09A6\u09CD\u09A7\u09BF \u09B8\u09C1\u09A6 \u0995\u09CD\u09AF\u09BE\u09B2\u0995\u09C1\u09B2\u09C7\u099F\u09B0" : locale === "ja" ? "\u8907\u5229\u8A08\u7B97\u6A5F" : locale === "ko" ? "\uBCF5\uB9AC \uACC4\uC0B0\uAE30" : locale === "fr" ? "Calculateur d'int\u00E9r\u00EAts compos\u00E9s" : "Compound Interest Calculator",
                };
  const marketFooterSlugs: MarketSlug[] =
    locale === "pt" ? [...publicMarketSlugs, "fundos-imobiliarios"] : publicMarketSlugs;
  const footerLocalePrefix = localeToUrlSegment(locale);
  const localizedFooterPage = (path: string) => localizedPath(path, locale);
  const levelFooterLinks = [
    { href: localizedFooterPage("/formiga"), label: footerLabels.levelLinks[0] },
    { href: localizedFooterPage("/lobo"), label: footerLabels.levelLinks[1] },
    { href: localizedFooterPage("/harpia"), label: footerLabels.levelLinks[2] },
    { href: localizedFooterPage("/select"), label: footerLabels.levelLinks[3] },
    { href: localizedFooterPage("/private"), label: "Private" },
  ];
  const localizedFooterHref = (page: "home" | "signals" | "education" | "services" | "about") => {
    if (page === "home") return footerLocalePrefix ? `/${footerLocalePrefix}` : "/#home";
    const ptPaths = {
      signals: "/sinais",
      education: "/educacao",
      services: "/servicos",
      about: "/sobre",
    };
    return localizedFooterPage(ptPaths[page]);
  };
  const marketAliases: Partial<Record<Locale, Partial<Record<MarketSlug, string>>>> = {
    pt: { forex: "forex", acoes: "acoes", cripto: "cripto", etfs: "etfs", ouro: "ouro", petroleo: "petroleo", commodities: "commodities", "fundos-imobiliarios": "fundos-imobiliarios" },
    en: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    es: { forex: "forex", acoes: "acciones", cripto: "cripto", etfs: "etfs", ouro: "oro", petroleo: "petroleo", commodities: "commodities" },
    fr: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    hi: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    ar: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    tr: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    id: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    vi: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    th: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    ru: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    ur: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    bn: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    ja: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    ko: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
  };
  const ptMarketAliases = marketAliases.pt ?? {};
  const localeMarketAliases = marketAliases[locale] ?? marketAliases.en ?? {};
  const marketFooterLinks = marketFooterSlugs.map((slug) => ({
    href: locale === "pt" ? `/${ptMarketAliases[slug] ?? slug}` : `/${footerLocalePrefix}/${localeMarketAliases[slug] ?? slug}`,
    label: getMarketLabel(slug, locale),
  }));
  const platformFooterLinks = platformSlugs.map((slug) => ({
    href: getPlatformPath(locale, slug),
    label: slug === "metatrader-5" ? "MetaTrader 5" : slug === "ctrader" ? "cTrader" : "TradingView",
  }));
  const socials = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/varejoinvestidorbrasil/",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="16.8" cy="7.2" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      href: getYoutubeChannelUrl(locale),
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M21 12c0 2.1-.2 4.1-.6 5-.3.7-.9 1.2-1.6 1.4-1.3.4-6.8.4-6.8.4s-5.5 0-6.8-.4c-.7-.2-1.3-.7-1.6-1.4-.4-.9-.6-2.9-.6-5s.2-4.1.6-5c.3-.7.9-1.2 1.6-1.4 1.3-.4 6.8-.4 6.8-.4s5.5 0 6.8.4c.7.2 1.3.7 1.6 1.4.4.9.6 2.9.6 5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="m10.4 9 4.6 3-4.6 3V9Z" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/5519983393147",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M12 2.75c-4.97 0-9.25 4.04-9.25 9.02 0 1.59.43 3.14 1.25 4.5L3.5 21.5l5.64-1.43a9.4 9.4 0 0 0 4.86 1.34h.01c4.97 0 9.25-4.04 9.25-9.02S16.97 2.75 12 2.75Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M9.1 9.05c.12-.27.39-.43.7-.43.15 0 .3.02.43.07.2.07.4.22.57.4l.35.45c.1.13.1.31 0 .44l-.22.29c-.08.1-.1.23-.05.35.22.5.59.93 1.06 1.2.12.07.27.08.4.02l.33-.17c.14-.07.31-.07.45 0l.5.24c.15.07.24.22.24.38v.45c0 .2-.09.38-.27.48-.58.33-1.27.42-1.9.24-1.2-.38-2.17-1.35-2.55-2.55-.18-.63-.09-1.32.24-1.9.1-.18.28-.27.48-.27h.03Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      label: "X (@varejoinvest)",
      href: "https://x.com/varejoinvest",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    ...(locale === "pt"
      ? [
          {
            label: "TikTok (@varejoinvestidor)",
            href: "https://www.tiktok.com/@varejoinvestidor",
            icon: (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            ),
          },
        ]
      : []),
  ];
  const mainFooterLinks = [
    { href: localizedFooterHref("home"), label: t.nav.home },
    { href: localizedFooterHref("signals"), label: t.nav.signals },
    { href: localizedFooterHref("education"), label: t.nav.education },
    { href: localizedFooterPage("/select"), label: "Select" },
    { href: localizedFooterPage("/private"), label: "Private" },
    { href: localizedFooterHref("services"), label: t.nav.services },
    { href: marketFooterLinks[0]?.href ?? "/forex", label: footerLabels.content },
    { href: "/ferramentas/calculadora-forex", label: footerLabels.tools },
    { href: localizedFooterHref("about"), label: t.nav.about },
  ];
  const structureFooterTitle = locale === "pt" ? "Estrutura Patrimonial" : locale === "es" ? "Estructura Patrimonial" : "Wealth Structure";
  const companyFooterTitle = locale === "pt" ? "Empresa" : locale === "es" ? "Empresa" : "Company";
  const platformsToolsTitle =
    locale === "pt"
      ? "Plataformas e Ferramentas"
      : locale === "es"
        ? "Plataformas y Herramientas"
        : `${footerLabels.platforms} & ${footerLabels.tools}`;
  const structureFooterLinks = [
    { href: localizedFooterPage("/sinais"), label: "Elite" },
    { href: localizedFooterPage("/select"), label: "Select" },
    { href: localizedFooterPage("/private"), label: "Private" },
  ];
  const companyFooterLinks = [
    { href: localizedFooterHref("about"), label: t.nav.about },
    {
      href: getPublisherHubPath(locale),
      label: locale === "pt" ? "Artigos" : locale === "es" ? "Artículos" : "Articles",
    },
    { href: marketFooterLinks[0]?.href ?? "/forex", label: footerLabels.content },
    { href: "/eventos", label: locale === "pt" ? "Eventos" : locale === "es" ? "Eventos" : "Events" },
    { href: t.support.link, label: locale === "pt" ? "Contato" : locale === "es" ? "Contacto" : "Contact" },
  ];
  const platformsAndToolsFooterLinks = [
    ...platformFooterLinks,
    { href: localizedFooterPage("/ferramentas/calculadora-forex"), label: footerLabels.forexCalculator },
    { href: localizedFooterPage("/ferramentas/calculadora-juros-compostos"), label: footerLabels.compoundInterestTool },
    { href: localizedFooterPage("/ferramentas/raio-x-carteira-global"), label: footerLabels.portfolioXrayTool ?? "Global Portfolio X-Ray" },
    { href: localizedFooterPage("/eventos"), label: "Eventos Presenciais" },
  ];
  const footerNavigationGroups = [
    { title: "Menu", links: mainFooterLinks },
    { title: structureFooterTitle, links: structureFooterLinks },
    { title: companyFooterTitle, links: companyFooterLinks },
    { title: footerLabels.levels, links: levelFooterLinks },
    { title: footerLabels.content, links: marketFooterLinks },
    { title: platformsToolsTitle, links: platformsAndToolsFooterLinks },
  ];

  return (
    <>
      <section className="border-t border-ink/[0.08] bg-paper px-5 py-6 md:px-8 md:py-7">
        <div className="mx-auto max-w-7xl border border-ink/[0.1] bg-white p-4 shadow-fine md:p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-gold">{t.disclaimer.title}</p>
          <p className="mt-3 max-w-6xl text-xs leading-6 text-ink/[0.62] md:text-sm md:leading-7">
            {t.disclaimer.text}
          </p>
        </div>
      </section>

      <footer className="institutional-footer border-t border-paper/[0.1] bg-ink px-5 py-10 text-paper md:px-8 md:py-12">
        <div className="footer-shell mx-auto max-w-[1440px]">
          <div className="footer-primary-grid">
            <div className="footer-brand-column">
              <a href={localizedFooterHref("home")} className="inline-flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center border border-gold/[0.55] bg-gold text-xs font-black text-ink">
                  VI
                </span>
                <span className="min-w-0">
                  <span className="block font-serif text-3xl tracking-[-0.04em] text-paper">Varejo Investidor</span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.22em] text-paper/[0.5]">
                    {brandTagline}
                  </span>
                </span>
              </a>
              <p className="mt-5 max-w-sm text-sm leading-7 text-paper/[0.62]">{t.footer}</p>
              <div className="mt-6">
                <p className="footer-heading">{footerLabels.social}</p>
                <div className="mt-3 flex gap-2">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid h-10 w-10 place-items-center border border-paper/[0.16] bg-paper/[0.035] text-paper/[0.72] transition hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {footerNavigationGroups.map((group) => (
              <nav key={group.title} aria-label={group.title} className="footer-link-column">
                <p className="footer-heading">{group.title}</p>
                <div className="mt-4 flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <a
                      key={`${group.title}-${link.href}-${link.label}`}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="footer-link text-sm font-medium leading-6 text-paper/[0.62] transition hover:text-gold"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </nav>
            ))}
          </div>

          <div className="footer-utility-row">
            <div className="footer-support-block">
              <div>
                <p className="footer-heading">{t.support.title}</p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-paper/[0.58]">{t.support.text}</p>
              </div>
              <a
                href={t.support.link}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-support-button inline-flex min-h-12 items-center justify-center border border-gold bg-gold px-6 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 hover:bg-[#d3ad5b]"
              >
                {t.support.button}
              </a>
            </div>

            <div className="footer-language-grid">
              <p className="footer-heading">{footerLabels.language}</p>
              <div className="mt-4">
                <LanguageSwitcher locale={locale} onChange={onLocaleChange} variant="footer" />
              </div>
              <a
                href="/idioma"
                className="mt-3 inline-block text-[11px] font-bold uppercase tracking-[0.14em] text-paper/[0.45] transition hover:text-gold"
              >
                {locale === "pt" ? "Tela completa de idiomas" : "Full language screen"}
              </a>
            </div>
          </div>

          <div className="footer-bottom-row">
            <p>© {new Date().getFullYear()} Varejo Investidor</p>
            <p>{footerLabels.marketLine}</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export function ContactSection({ t }: { t: (typeof translations)[Locale] }) {
  return (
    <section id="contato" className="px-5 py-16 md:px-8 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative mx-auto max-w-7xl overflow-hidden border border-ink bg-ink px-6 py-14 text-center text-paper shadow-premium md:px-12 md:py-20"
      >
        <div className="absolute inset-0 terminal-grid opacity-30" />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">{t.contact.eyebrow}</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-balance font-serif text-5xl leading-[1] tracking-[-0.05em] md:text-7xl">
            {t.contact.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-paper/[0.68]">{t.contact.text}</p>
          <a
            href="#contato"
            className="mt-8 inline-block border border-gold bg-gold px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-paper hover:border-paper"
          >
            {t.contact.button}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
