"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { translations, type Locale } from "../i18n";
import { getMarketLabel, publicMarketSlugs, type MarketSlug } from "../data/marketContent";
import { getInsightsPath, insightLabels, localeFromInsightsPath } from "../data/insightsContent";

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
export const LOCALES = ["pt", "en", "es", "hi", "ar", "tr"] as const;

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

export function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "en";

  const languages = navigator.languages?.length ?navigator.languages : [navigator.language];
  const detected = languages.join(" ").toLowerCase();

  if (detected.includes("pt")) return "pt";
  if (detected.includes("es")) return "es";
  if (detected.includes("hi")) return "hi";
  if (detected.includes("ar")) return "ar";
  if (detected.includes("tr")) return "tr";
  if (detected.includes("en")) return "en";

  return "en";
}

function isLocale(value: string | null): value is Locale {
  return Boolean(value && value in translations);
}

function localeFromPath(pathname: string | null): Locale | null {
  const insightsLocale = localeFromInsightsPath(pathname);
  if (insightsLocale) return insightsLocale;
  const firstSegment = pathname?.split("/").filter(Boolean)[0] ?? null;
  return isLocale(firstSegment) ? firstSegment : null;
}

function applyDocumentLocale(nextLocale: Locale) {
  document.documentElement.lang =
    nextLocale === "pt" ? "pt-BR" : nextLocale === "ar" ? "ar" : nextLocale;
  document.documentElement.dir = nextLocale === "ar" ? "rtl" : "ltr";
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
    window.localStorage.setItem("varejo_language", nextLocale);
    window.localStorage.setItem("varejo_language_selected", "true");
    window.localStorage.setItem("language", nextLocale);
    window.localStorage.setItem("varejo-investidor-locale", nextLocale);
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

function FlagIcon({ locale }: { locale: Locale }) {
  const common = "h-3 w-4 shrink-0 overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(255,255,255,0.14)]";

  if (locale === "pt") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="12" fill="#159447" />
        <path d="M8 1.6 14 6 8 10.4 2 6Z" fill="#f2c230" />
        <circle cx="8" cy="6" r="2.25" fill="#183a8f" />
      </svg>
    );
  }

  if (locale === "en") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="12" fill="#f7f3eb" />
        {[0, 2, 4, 6, 8, 10].map((y) => (
          <rect key={y} y={y} width="16" height="1" fill="#b92735" />
        ))}
        <rect width="7" height="6" fill="#1f3f82" />
      </svg>
    );
  }

  if (locale === "es") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="12" fill="#c4212e" />
        <rect y="3" width="16" height="6" fill="#f1c232" />
      </svg>
    );
  }

  if (locale === "hi") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="4" fill="#ff9933" />
        <rect y="4" width="16" height="4" fill="#f7f3eb" />
        <rect y="8" width="16" height="4" fill="#138808" />
        <circle cx="8" cy="6" r="1.3" fill="none" stroke="#1a3c8f" strokeWidth="0.55" />
      </svg>
    );
  }

  if (locale === "ar") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="12" fill="#0f6f42" />
        <path d="M4.4 6.2a2 2 0 1 0 0-.4 1.45 1.45 0 1 1 0 .4Z" fill="#f7f3eb" />
        <rect x="6.8" y="5.75" width="5.3" height="0.55" fill="#f7f3eb" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
      <rect width="16" height="12" fill="#c8232c" />
      <path d="M7.2 6a2.45 2.45 0 1 0 0 .1 1.72 1.72 0 1 1 0-.1Z" fill="#f7f3eb" />
      <path d="M9.2 6 10.8 5.5 9.8 6.9V5.1l1 1.4Z" fill="#f7f3eb" />
    </svg>
  );
}

const languageMeta: Record<Locale, { code: string; name: string }> = {
  pt: { code: "PT", name: "Portugu\u00EAs" },
  en: { code: "EN", name: "English" },
  es: { code: "ES", name: "Espa\u00F1ol" },
  hi: { code: "HI", name: "\u0939\u093F\u0928\u094D\u0926\u0940" },
  ar: { code: "AR", name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" },
  tr: { code: "TR", name: "T\u00FCrk\u00E7e" },
};

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
            <FlagIcon locale={item} />
            <span>{variant === "footer" ? languageMeta[item].name : languageMeta[item].code}</span>
          </span>
        </button>
      ))}
    </div>
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
  const [mobileLanguageOpen, setMobileLanguageOpen] = useState(true);

  useEffect(() => {
    const hasSelectedLanguage = window.localStorage.getItem("varejo_language_selected") === "true";
    setMobileLanguageOpen(!hasSelectedLanguage);
    document.documentElement.style.setProperty(
      "--mobile-header-height",
      hasSelectedLanguage ? "210px" : "300px",
    );
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--mobile-header-height",
      mobileLanguageOpen ? "300px" : "210px",
    );
  }, [mobileLanguageOpen]);

  function handleMobileLocaleChange(nextLocale: Locale) {
    onLocaleChange(nextLocale);
    window.localStorage.setItem("varejo_language", nextLocale);
    window.localStorage.setItem("varejo_language_selected", "true");
    setMobileLanguageOpen(false);
  }

  const brandTagline =
    locale === "en"
      ? "Global Markets for Retail Investors"
      : locale === "es"
        ? "Mercado Global para el Inversor Minorista"
        : locale === "hi"
          ? "\u0930\u093F\u091F\u0947\u0932 \u0928\u093F\u0935\u0947\u0936\u0915 \u0915\u0947 \u0932\u093F\u090F \u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u092C\u093E\u091C\u093E\u0930"
          : locale === "ar"
            ? "الأسواق العالمية للمستثمر الفردي"
            : locale === "tr"
              ? "Bireysel Yatırımcı için Küresel Piyasalar"
              : "Mercado Global para o Investidor de Varejo";
  const navItems = useMemo(
    () => [
      { label: t.nav.home, href: "/#home", activePaths: ["/", "/pt", "/en", "/es", "/hi", "/ar", "/tr"] },
      {
        label: insightLabels[locale].nav,
        href: getInsightsPath(locale),
        activePaths: [
          "/insights-globais",
          "/global-insights",
          "/insights-globales",
          "/global-insights-hi",
          "/ar/global-insights",
          "/tr/global-insights",
        ],
      },
      { label: t.nav.signals, href: "/sinais", activePaths: ["/sinais", "/signals"] },
      { label: t.nav.education, href: "/educacao", activePaths: ["/educacao"] },
      { label: t.nav.services, href: "/servicos", activePaths: ["/servicos", "/services"] },
      { label: t.nav.about, href: "/sobre", activePaths: ["/sobre", "/about"] },
    ],
    [locale, t],
  );

  return (
    <div className="site-chrome fixed left-0 right-0 top-0 z-50">
      <div className="global-ticker border-b border-ink/[0.08] bg-ink px-3 text-paper md:px-5">
        <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-hidden py-1.5 text-[9px] uppercase tracking-[0.16em] sm:gap-7 sm:py-2 sm:text-[11px] sm:tracking-[0.22em]">
          <span className="shrink-0 text-gold">{t.tickerLabel}</span>
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
        <nav className="site-header-nav mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-4">
          <a href="/#home" className="site-brand group flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center border border-ink bg-ink text-xs font-bold text-paper sm:h-10 sm:w-10">VI</span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-serif text-lg sm:text-xl">Varejo Investidor</span>
              <span className="hidden text-[10px] uppercase tracking-[0.24em] text-ink/[0.45] sm:block">{brandTagline}</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 border border-ink/[0.08] bg-white p-1 text-sm text-ink/[0.66] shadow-fine xl:flex">
            {navItems.map((item) => {
              const isActive = item.activePaths.some((path) => pathname === path || pathname?.startsWith(`${path}/`));
              return <a key={item.label} href={item.href} className={`nav-link px-3 py-2 text-ink ${isActive ? "active" : ""}`}>{item.label}</a>;
            })}
          </div>

          <div className="hidden items-center gap-2 xl:flex">
            <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
          </div>
        </nav>
        <div className="mobile-nav-row border-t border-ink/[0.08] px-4 pb-2 xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2 pt-2 text-sm">
            {navItems.map((item) => {
              const isActive = item.activePaths.some((path) => pathname === path || pathname?.startsWith(`${path}/`));
              return <a key={item.label} href={item.href} className={`mobile-nav-link nav-link shrink-0 border border-ink/[0.1] bg-white px-3 py-2 text-center text-ink ${isActive ? "active" : ""}`}>{item.label}</a>;
            })}
          </div>
        </div>
        <div className="mobile-language-row border-t border-ink/[0.08] px-4 pb-2 xl:hidden">
          {mobileLanguageOpen ? (
            <LanguageSwitcher locale={locale} onChange={handleMobileLocaleChange} variant="mobile" />
          ) : (
            <button
              type="button"
              onClick={() => setMobileLanguageOpen(true)}
              className="mobile-language-compact"
              aria-expanded={mobileLanguageOpen}
            >
              <span aria-hidden="true">🌐</span>
              <FlagIcon locale={locale} />
              <span>{languageMeta[locale].code}</span>
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export function SignalTicket({ t }: { t: (typeof translations)[Locale] }) {
  const isPortuguese = t.locale === "PT";
  const isSpanish = t.locale === "ES";
  const isArabic = t.locale === "AR";
  const isTurkish = t.locale === "TR";
  const extraLabels =
    t.locale === "HI"
      ? { timeframe: "\u0938\u092E\u092F \u0905\u0935\u0927\u093F", risk: "\u091C\u094B\u0916\u093F\u092E", riskValue: "\u092E\u0927\u094D\u092F\u092E", signal: "\u0938\u093F\u0917\u094D\u0928\u0932", time: "\u0938\u092E\u092F", live: "\u0932\u093E\u0907\u0935", copy: "\u0938\u0940\u0927\u0947 \u090F\u0932\u0940\u091F \u091A\u0948\u0928\u0932 \u092E\u0947\u0902 \u092D\u0947\u091C\u093E \u0917\u092F\u093E" }
      : isSpanish
        ? { timeframe: "TEMPORALIDAD", risk: "RIESGO", riskValue: "MODERADO", signal: "SE\u00D1AL", time: "HORARIO", live: "EN VIVO", copy: "ENVIADA DIRECTAMENTE EN EL CANAL ELITE" }
        : isArabic
          ? { timeframe: "الإطار الزمني", risk: "المخاطر", riskValue: "متوسطة", signal: "الإشارة", time: "الوقت", live: "مباشر", copy: "أرسلت مباشرة داخل قناة النخبة" }
          : isTurkish
            ? { timeframe: "ZAMAN DİLİMİ", risk: "RİSK", riskValue: "ORTA", signal: "SİNYAL", time: "SAAT", live: "CANLI", copy: "DOĞRUDAN ELITE KANALINDA GÖNDERİLDİ" }
            : { timeframe: "TIMEFRAME", risk: isPortuguese ? "RISCO" : "RISK", riskValue: isPortuguese ? "MODERADO" : "MODERATE", signal: isPortuguese ? "SINAL" : "SIGNAL", time: isPortuguese ? "HOR\u00C1RIO" : "TIME", live: isPortuguese ? "AO VIVO" : "LIVE", copy: isPortuguese ? "ENVIADO DIRETAMENTE NO CANAL ELITE" : "DELIVERED DIRECTLY INSIDE ELITE CHANNEL" };
  const rows = [
    [t.signalBlock.example.asset, t.signalBlock.example.values.asset], [t.signalBlock.example.direction, t.signalBlock.example.values.direction], [t.signalBlock.example.entry, t.signalBlock.example.values.entry], [t.signalBlock.example.target, t.signalBlock.example.values.target], [t.signalBlock.example.stop, t.signalBlock.example.values.stop], [extraLabels.timeframe, "4H"], [extraLabels.risk, extraLabels.riskValue], [extraLabels.signal, "#4169"], [extraLabels.time, "09:42 UTC"], [t.signalBlock.example.status, t.signalBlock.example.values.status],
  ];

  return (
    <div className="signal-terminal terminal-shell relative overflow-hidden border border-rise/[0.28] bg-ink p-4 text-paper shadow-premium">
      <div className="absolute inset-0 terminal-grid opacity-25" />
      <div className="flex items-center justify-between gap-3 border-b border-paper/[0.12] pb-4">
        <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold">{isPortuguese ? "SINAL AO VIVO" : isSpanish ? "SE\u00D1AL EN VIVO" : isArabic ? "إشارة مباشرة" : isTurkish ? "CANLI SİNYAL" : "LIVE SIGNAL SENT"}</p>
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
      <div className="signal-delivery-badge relative mt-5 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-rise sm:tracking-[0.2em]">{extraLabels.copy}</div>
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
}: {
  t: (typeof translations)[Locale];
  locale?: Locale;
  onEliteClick?: () => void;
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
          {onEliteClick ? (
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
  const brokers = [
    { ...t.brokers.forex, tone: "forex", symbol: "$" },
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
  const brandTagline =
    locale === "en"
      ? "Global Markets for Retail Investors"
      : locale === "es"
        ? "Mercado Global para el Inversor Minorista"
        : locale === "hi"
          ? "\u0930\u093F\u091F\u0947\u0932 \u0928\u093F\u0935\u0947\u0936\u0915 \u0915\u0947 \u0932\u093F\u090F \u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u092C\u093E\u091C\u093E\u0930"
          : locale === "ar"
            ? "\u0627\u0644\u0623\u0633\u0648\u0627\u0642 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0645\u0633\u062A\u062B\u0645\u0631 \u0627\u0644\u0641\u0631\u062F\u064A"
            : locale === "tr"
              ? "Bireysel Yat\u0131r\u0131mc\u0131 \u0130\u00E7in K\u00FCresel Piyasa"
          : "Mercado Global para o Investidor de Varejo";
  const footerLabels =
    locale === "hi"
      ? {
          social: "\u0938\u094B\u0936\u0932",
          levels: "\u0938\u094D\u0924\u0930",
          markets: "\u092C\u093E\u091C\u093E\u0930",
          content: "\u0915\u0902\u091F\u0947\u0902\u091F",
          language: "\u092D\u093E\u0937\u093E",
          marketLine: "Forex | Crypto | Commodities | Global Markets",
          levelLinks: ["Formiga \u0938\u094D\u0924\u0930", "Lobo \u0938\u094D\u0924\u0930", "Harpia \u0938\u094D\u0924\u0930"],
        }
      : locale === "es"
        ? {
            social: "Redes",
            levels: "Niveles",
            markets: "Mercados",
            content: "Contenido",
            language: "Idioma",
            marketLine: "Forex | Cripto | Commodities | Mercados Globales",
            levelLinks: ["Nivel Formiga", "Nivel Lobo", "Nivel Harpia"],
          }
        : locale === "pt"
          ? {
              social: "Redes",
              levels: "N\u00EDveis",
              markets: "Mercados",
              content: "Conte\u00FAdo",
              language: "Idioma",
              marketLine: "Forex | Cripto | Commodities | Mercados Globais",
              levelLinks: ["N\u00EDvel Formiga", "N\u00EDvel Lobo", "N\u00EDvel Harpia"],
            }
          : locale === "ar"
            ? {
                social: "\u0627\u0644\u0634\u0628\u0643\u0627\u062A",
                levels: "\u0627\u0644\u0645\u0633\u062A\u0648\u064A\u0627\u062A",
                markets: "\u0627\u0644\u0623\u0633\u0648\u0627\u0642",
                content: "\u0627\u0644\u0645\u062D\u062A\u0648\u0649",
                language: "\u0627\u0644\u0644\u063A\u0629",
                marketLine: "Forex | Crypto | Commodities | Global Markets",
                levelLinks: ["\u0645\u0633\u062A\u0648\u0649 Formiga", "\u0645\u0633\u062A\u0648\u0649 Lobo", "\u0645\u0633\u062A\u0648\u0649 Harpia"],
              }
            : locale === "tr"
              ? {
                  social: "Sosyal",
                  levels: "Seviyeler",
                  markets: "Piyasalar",
                  content: "Icerik",
                  language: "Dil",
                  marketLine: "Forex | Kripto | Emtialar | K\u00FCresel Piyasalar",
                  levelLinks: ["Formiga Seviyesi", "Lobo Seviyesi", "Harpia Seviyesi"],
                }
              : {
                  social: "Social",
                  levels: "Levels",
                  markets: "Markets",
                  content: "Content",
                  language: "Language",
                  marketLine: "Forex | Crypto | Commodities | Global Markets",
                  levelLinks: ["Formiga Level", "Lobo Level", "Harpia Level"],
                };
  const levelFooterLinks = [
    { href: "/formiga", label: footerLabels.levelLinks[0] },
    { href: "/lobo", label: footerLabels.levelLinks[1] },
    { href: "/harpia", label: footerLabels.levelLinks[2] },
  ];
  const marketFooterSlugs: MarketSlug[] =
    locale === "pt" ? [...publicMarketSlugs, "fundos-imobiliarios"] : publicMarketSlugs;
  const marketFooterLinks = marketFooterSlugs.map((slug) => ({
    href: `/${slug}`,
    label: getMarketLabel(slug, locale),
  }));
  const contentFooterLinks = [
    { href: getInsightsPath(locale), label: insightLabels[locale].nav },
    ...marketFooterLinks,
  ];
  const socials = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/varejoinvestidor/",
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
      href: "https://www.youtube.com/@Varejoinvestidor",
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

      <footer className="border-t border-ink/[0.08] bg-white px-5 py-8 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.64fr_0.78fr_0.64fr_0.72fr_0.82fr] lg:items-start">
          <div>
            <a href="/#home" className="inline-flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center border border-ink bg-ink text-xs font-bold text-paper">
                VI
              </span>
              <span>
                <span className="block font-serif text-3xl tracking-[-0.04em] text-ink">Varejo Investidor</span>
                <span className="text-[10px] uppercase tracking-[0.24em] text-ink/[0.45]">
                  {brandTagline}
                </span>
              </span>
            </a>
            <p className="mt-4 max-w-md text-sm leading-7 text-ink/[0.6]">{t.footer}</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-ink/[0.45]">{footerLabels.social}</p>
            <div className="mt-4 flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid h-11 w-11 place-items-center border border-ink/[0.12] bg-paper text-ink transition hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-paper"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-ink/[0.45]">{footerLabels.levels}</p>
            <div className="mt-4 flex flex-col gap-2">
              {levelFooterLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-ink/[0.62] transition hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-ink/[0.45]">{footerLabels.content}</p>
            <div className="mt-4 flex flex-col gap-2">
              {contentFooterLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-ink/[0.62] transition hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-ink/[0.45]">{footerLabels.language}</p>
            <div className="mt-4">
              <LanguageSwitcher locale={locale} onChange={onLocaleChange} variant="footer" />
            </div>
          </div>

          <div className="md:text-right">
            <p className="font-serif text-2xl tracking-[-0.04em] text-ink">{t.support.title}</p>
            <p className="mt-2 text-sm text-ink/[0.58]">{t.support.text}</p>
            <a
              href={t.support.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block border border-ink bg-ink px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-paper transition hover:bg-paper hover:text-ink"
            >
              {t.support.button}
            </a>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-2 border-t border-ink/[0.08] pt-5 text-xs uppercase tracking-[0.18em] text-ink/[0.45] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Varejo Investidor</p>
          <p>{footerLabels.marketLine}</p>
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
