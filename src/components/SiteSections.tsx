"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { translations, type Locale } from "../i18n";

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
  if (detected.includes("en")) return "en";

  return "en";
}

export function useSiteLocale() {
  const [locale, setLocale] = useState<Locale>("en");
  const t = translations[locale];

  useEffect(() => {
    const saved = window.localStorage.getItem("varejo-investidor-locale") as Locale | null;
    if (saved && saved in translations) {
      setLocale(saved);
      return;
    }

    setLocale(detectLocale());
  }, []);

  function changeLocale(nextLocale: Locale) {
    setLocale(nextLocale);
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

export function LanguageSwitcher({
  locale,
  onChange,
  variant = "compact",
}: {
  locale: Locale;
  onChange: (locale: Locale) => void;
  variant?: "compact" | "footer";
}) {
  const languageLabels: Record<Locale, string> = {
    pt: "\uD83C\uDDE7\uD83C\uDDF7 Portugu\u00EAs",
    en: "\uD83C\uDDFA\uD83C\uDDF8 English",
    es: "\uD83C\uDDEA\uD83C\uDDF8 Espa\u00F1ol",
    hi: "\uD83C\uDDEE\uD83C\uDDF3 \u0939\u093F\u0928\u094D\u0926\u0940",
  };

  return (
    <div
      className={`flex shrink-0 items-center border border-ink/[0.12] bg-paper p-1 shadow-fine ${
        variant === "footer" ?"flex-wrap gap-1" : ""
      }`}
    >
      {(["pt", "en", "es", "hi"] as Locale[]).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={`px-2.5 py-2 text-[10px] font-bold transition sm:px-3 sm:text-[11px] ${
            variant === "footer" ?"tracking-[0.08em]" : "uppercase tracking-[0.14em] sm:tracking-[0.18em]"
          } ${
            locale === item
              ?"bg-gold text-ink"
              : "text-ink/[0.72] hover:bg-paper/[0.06] hover:text-ink"
          }`}
          aria-pressed={locale === item}
        >
          {variant === "footer" ?languageLabels[item] : item.toUpperCase()}
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const brandTagline =
    locale === "en"
      ? "Global Markets for Retail Investors"
      : locale === "es"
        ? "Mercado Global para el Inversor Minorista"
        : locale === "hi"
          ? "\u0930\u093F\u091F\u0947\u0932 \u0928\u093F\u0935\u0947\u0936\u0915 \u0915\u0947 \u0932\u093F\u090F \u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u092C\u093E\u091C\u093E\u0930"
          : "Mercado Global para o Investidor de Varejo";
  const navItems = useMemo(
    () => [
      { label: t.nav.home, href: "/#home", activePaths: ["/"] },
      { label: t.nav.signals, href: "/sinais", activePaths: ["/sinais", "/signals"] },
      { label: t.nav.education, href: "/educacao", activePaths: ["/educacao"] },
      { label: t.nav.services, href: "/servicos", activePaths: ["/servicos", "/services"] },
      { label: t.nav.about, href: "/sobre", activePaths: ["/sobre", "/about"] },
    ],
    [t],
  );

  return (
    <div className="fixed left-0 right-0 top-0 z-50">
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
              const isActive = item.activePaths.includes(pathname || "/");
              return <a key={item.label} href={item.href} className={`nav-link px-3 py-2 text-ink ${isActive ? "active" : ""}`}>{item.label}</a>;
            })}
          </div>

          <div className="hidden items-center gap-2 xl:flex">
            <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
          </div>
          <button type="button" className="site-menu-button grid h-10 w-10 place-items-center border border-ink/[0.12] text-ink xl:hidden" onClick={() => setMobileMenuOpen((open) => !open)} aria-expanded={mobileMenuOpen} aria-label="Menu">
            <span className="flex flex-col gap-1.5"><span className="block h-px w-5 bg-current" /><span className="block h-px w-5 bg-current" /><span className="block h-px w-5 bg-current" /></span>
          </button>
        </nav>
        <div className="mobile-language-row border-t border-ink/[0.08] px-4 pb-2 xl:hidden">
          <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
        </div>
        <div className={`mobile-nav-panel border-t border-ink/[0.08] px-5 pb-3 md:px-8 xl:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
          <div className="mx-auto grid max-w-7xl gap-2 pt-3 text-sm sm:flex sm:overflow-x-auto">
            {navItems.map((item) => {
              const isActive = item.activePaths.includes(pathname || "/");
              return <a key={item.label} href={item.href} className={`nav-link shrink-0 border border-ink/[0.1] bg-white px-3 py-2 text-center text-ink ${isActive ? "active" : ""}`}>{item.label}</a>;
            })}
          </div>
        </div>
      </header>
    </div>
  );
}

export function SignalTicket({ t }: { t: (typeof translations)[Locale] }) {
  const isPortuguese = t.locale === "PT";
  const isSpanish = t.locale === "ES";
  const extraLabels =
    t.locale === "HI"
      ? { timeframe: "\u0938\u092E\u092F \u0905\u0935\u0927\u093F", risk: "\u091C\u094B\u0916\u093F\u092E", riskValue: "\u092E\u0927\u094D\u092F\u092E", signal: "\u0938\u093F\u0917\u094D\u0928\u0932", time: "\u0938\u092E\u092F", live: "\u0932\u093E\u0907\u0935", copy: "\u0938\u0940\u0927\u0947 \u090F\u0932\u0940\u091F \u091A\u0948\u0928\u0932 \u092E\u0947\u0902 \u092D\u0947\u091C\u093E \u0917\u092F\u093E" }
      : isSpanish
        ? { timeframe: "TEMPORALIDAD", risk: "RIESGO", riskValue: "MODERADO", signal: "SE\u00D1AL", time: "HORARIO", live: "EN VIVO", copy: "ENVIADA DIRECTAMENTE EN EL CANAL ELITE" }
        : { timeframe: "TIMEFRAME", risk: isPortuguese ? "RISCO" : "RISK", riskValue: isPortuguese ? "MODERADO" : "MODERATE", signal: isPortuguese ? "SINAL" : "SIGNAL", time: isPortuguese ? "HOR\u00C1RIO" : "TIME", live: isPortuguese ? "AO VIVO" : "LIVE", copy: isPortuguese ? "ENVIADO DIRETAMENTE NO CANAL ELITE" : "DELIVERED DIRECTLY INSIDE ELITE CHANNEL" };
  const rows = [
    [t.signalBlock.example.asset, t.signalBlock.example.values.asset], [t.signalBlock.example.direction, t.signalBlock.example.values.direction], [t.signalBlock.example.entry, t.signalBlock.example.values.entry], [t.signalBlock.example.target, t.signalBlock.example.values.target], [t.signalBlock.example.stop, t.signalBlock.example.values.stop], [extraLabels.timeframe, "4H"], [extraLabels.risk, extraLabels.riskValue], [extraLabels.signal, "#4169"], [extraLabels.time, "09:42 UTC"], [t.signalBlock.example.status, t.signalBlock.example.values.status],
  ];

  return (
    <div className="signal-terminal terminal-shell relative overflow-hidden border border-rise/[0.28] bg-ink p-4 text-paper shadow-premium">
      <div className="absolute inset-0 terminal-grid opacity-25" />
      <div className="flex items-center justify-between gap-3 border-b border-paper/[0.12] pb-4">
        <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold">{isPortuguese ? "SINAL AO VIVO" : isSpanish ? "SE\u00D1AL EN VIVO" : "LIVE SIGNAL SENT"}</p>
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
    <section className="border-y border-ink/[0.08] bg-white px-5 py-20 md:px-8 md:py-24">
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
          : "Mercado Global para o Investidor de Varejo";
  const footerLabels =
    locale === "hi"
      ? { social: "\u0938\u094B\u0936\u0932", language: "\u092D\u093E\u0937\u093E", marketLine: "Forex | Crypto | Commodities | Global Markets" }
      : locale === "es"
        ? { social: "Redes", language: "Idioma", marketLine: "Forex | Cripto | Commodities | Mercados Globales" }
        : locale === "pt"
          ? { social: "Redes", language: "Idioma", marketLine: "Forex | Cripto | Commodities | Mercados Globais" }
          : { social: "Social", language: "Language", marketLine: "Forex | Crypto | Commodities | Global Markets" };
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
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.78fr_0.82fr_0.82fr] lg:items-start">
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
