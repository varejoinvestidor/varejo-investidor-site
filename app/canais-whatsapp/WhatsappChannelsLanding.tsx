"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { LocaleFlagIcon } from "../../src/components/LocaleFlagIcon";
import {
  whatsappChannels,
  whatsappGateUiCopy,
  whatsappLandingCopy,
  whatsappLandingLocales,
  WHATSAPP_LANGUAGE_GATE,
  type WhatsAppChannelLevel,
  type WhatsAppLandingLocale,
} from "../../src/data/whatsappChannels";
import type { Locale } from "../../src/i18n";

const STORAGE_KEY = "varejo_whatsapp_landing_language";
const RTL_LOCALES = new Set<WhatsAppLandingLocale>(["ar", "fa", "ur"]);

function isLandingLocale(value: string | null | undefined): value is WhatsAppLandingLocale {
  return Boolean(value && whatsappLandingLocales.some((item) => item.locale === value));
}

function flagLocale(locale: WhatsAppLandingLocale): Locale {
  return locale === "pt-pt" ? "pt" : locale;
}

function dispatchLandingEvent(
  event: "language_detected" | "language_changed" | "formiga_click" | "lobo_click",
  payload: Record<string, string>,
) {
  if (typeof window === "undefined") return;
  const detail = { event, ...payload };
  window.dispatchEvent(new CustomEvent("varejo:whatsapp-landing", { detail }));
  const dataLayer = (window as Window & { dataLayer?: Record<string, string>[] }).dataLayer;
  if (Array.isArray(dataLayer)) dataLayer.push(detail);
}

function WhatsAppMark({ variant }: { variant: "formiga" | "lobo" }) {
  const shell =
    variant === "formiga"
      ? "border-[#1f9d5b]/35 bg-[#128c4a]/12 text-[#26c76f]"
      : "border-[#c6994a]/45 bg-[#c6994a]/10 text-[#e8c878]";
  return (
    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border ${shell}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path d="M7.25 20.05 4 21l.9-3.25A8.42 8.42 0 1 1 7.25 20.05Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8.7 8.35c.2-.45.42-.55.78-.55h.6c.22 0 .4.12.52.38l.68 1.54c.12.3.1.5-.1.72l-.42.48c-.12.14-.2.32-.02.55.52.92 1.38 1.72 2.48 2.25.25.12.42.08.58-.12l.58-.66c.2-.22.44-.25.72-.1l1.48.68c.28.13.42.33.4.62-.04.62-.42 1.38-.95 1.72-.65.42-1.82.36-3.35-.36-2.55-1.18-4.25-3.1-5.05-4.92-.38-.86-.2-1.56.26-2.23Z" fill="currentColor" />
      </svg>
    </span>
  );
}

function ChannelCard({
  level,
  locale,
  reduceMotion,
}: {
  level: WhatsAppChannelLevel;
  locale: WhatsAppLandingLocale;
  reduceMotion: boolean | null;
}) {
  const copy = whatsappLandingCopy[locale];
  const levelCopy = copy[level];
  const href = whatsappChannels[locale]?.[level];
  const available = Boolean(href);
  const isLobo = level === "lobo";

  function handleClick() {
    dispatchLandingEvent(level === "formiga" ? "formiga_click" : "lobo_click", {
      language: locale,
      level,
    });
  }

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden border p-6 shadow-[0_28px_90px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 sm:p-8 ${
        isLobo
          ? "border-[#c6994a]/40 bg-gradient-to-br from-[#c6994a]/[0.09] via-white/[0.03] to-transparent hover:border-[#c6994a]/60"
          : "border-[#1f9d5b]/30 bg-gradient-to-br from-[#128c4a]/[0.08] via-white/[0.03] to-transparent hover:border-[#26c76f]/45"
      }`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${isLobo ? "via-[#c6994a]/55" : "via-[#26c76f]/45"} to-transparent`}
      />
      <div className="flex items-start gap-4">
        <WhatsAppMark variant={level} />
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#c6994a]">Varejo Investidor</p>
          <h2 className="mt-2 font-serif text-4xl leading-none tracking-[-0.045em] text-white sm:text-5xl">{levelCopy.title}</h2>
        </div>
      </div>
      <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">{levelCopy.description}</p>
      {available ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className={`mt-8 flex min-h-14 w-full items-center justify-center px-6 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-white transition sm:w-auto sm:min-w-[280px] ${
            isLobo ? "bg-[#c6994a] text-black hover:bg-[#d8ad52]" : "bg-[#0f8f56] hover:bg-[#16a767]"
          }`}
        >
          {levelCopy.button}
        </a>
      ) : (
        <div className="mt-8 border border-[#c6994a]/20 bg-[#c6994a]/8 px-5 py-4 text-sm font-semibold text-[#e6d5b5]">
          {levelCopy.unavailable}
        </div>
      )}
    </motion.article>
  );
}

function LanguageOptionButton({
  locale,
  label,
  short,
  rtl,
  selected,
  onSelect,
}: {
  locale: WhatsAppLandingLocale;
  label: string;
  short: string;
  rtl?: boolean;
  selected: boolean;
  onSelect: (locale: WhatsAppLandingLocale) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(locale)}
      className={`language-gate-option flex w-full items-center gap-3 border px-4 py-3 text-left transition ${
        selected
          ? "border-gold bg-gold/[0.14] text-white"
          : "border-white/10 bg-white/[0.03] text-white/82 hover:border-gold/[0.35] hover:bg-white/[0.06]"
      }`}
      aria-pressed={selected}
      dir={rtl ? "rtl" : "ltr"}
    >
      <LocaleFlagIcon locale={flagLocale(locale)} className="h-4 w-5 shrink-0 overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(255,255,255,0.14)]" />
      <span className="min-w-0 flex-1 truncate text-sm font-semibold">{label}</span>
      <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{short}</span>
    </button>
  );
}

export default function WhatsAppChannelsLanding() {
  const reduceMotion = useReducedMotion();
  const [selectedLocale, setSelectedLocale] = useState<WhatsAppLandingLocale | null>(null);
  const [search, setSearch] = useState("");

  const filteredLocales = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return whatsappLandingLocales;
    return whatsappLandingLocales.filter(
      (item) =>
        item.label.toLowerCase().includes(query) ||
        item.short.toLowerCase().includes(query) ||
        item.locale.toLowerCase().includes(query),
    );
  }, [search]);

  const activeLocale = selectedLocale;
  const activeCopy = activeLocale ? whatsappLandingCopy[activeLocale] : null;
  const pageDir = activeLocale && RTL_LOCALES.has(activeLocale) ? "rtl" : "ltr";

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (isLandingLocale(saved)) {
      setSelectedLocale(saved);
      dispatchLandingEvent("language_detected", { language: saved, source: "storage" });
    }
  }, []);

  useEffect(() => {
    if (!activeLocale) {
      document.documentElement.lang = "pt-BR";
      document.documentElement.dir = "ltr";
      return;
    }
    document.documentElement.lang = activeLocale === "pt-pt" ? "pt-PT" : activeLocale === "pt" ? "pt-BR" : activeLocale;
    document.documentElement.dir = RTL_LOCALES.has(activeLocale) ? "rtl" : "ltr";
  }, [activeLocale]);

  function handleLanguageSelect(nextLocale: WhatsAppLandingLocale) {
    setSelectedLocale(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    dispatchLandingEvent(selectedLocale ? "language_changed" : "language_detected", { language: nextLocale });
  }

  const gateUi = activeLocale ? whatsappGateUiCopy[activeLocale] : null;
  const gateTitle = gateUi?.gateTitle ?? WHATSAPP_LANGUAGE_GATE.title;
  const gateSubtitle = gateUi?.gateSubtitle ?? WHATSAPP_LANGUAGE_GATE.subtitle;
  const searchPlaceholder = gateUi?.searchPlaceholder ?? WHATSAPP_LANGUAGE_GATE.searchPlaceholder;
  const channelsEyebrow = activeLocale ? whatsappGateUiCopy[activeLocale].channelsEyebrow : "Formiga / Lobo";

  return (
    <main dir={pageDir} className="language-gate relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="language-gate-grid pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />
      <div className="language-gate-glow pointer-events-none absolute -left-32 top-16 h-96 w-96 rounded-full bg-gold/[0.08] blur-3xl" aria-hidden="true" />
      <div className="language-gate-glow pointer-events-none absolute -right-24 bottom-0 h-[26rem] w-[26rem] rounded-full bg-[#128c4a]/[0.07] blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center border border-[#c6994a]/55 bg-[#c6994a] text-xs font-black text-black">
              VI
            </span>
            <div className="min-w-0">
              <p className="truncate font-serif text-xl leading-none tracking-[-0.04em] text-white sm:text-2xl">Varejo Investidor</p>
              <p className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.24em] text-white/40 sm:block">WhatsApp Oficial</p>
            </div>
          </div>
          {activeLocale ? (
            <p className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-gold/80 sm:block">
              {whatsappLandingLocales.find((item) => item.locale === activeLocale)?.label}
            </p>
          ) : null}
        </header>

        <section className="flex flex-1 flex-col py-10 sm:py-14">
          <div className="mx-auto w-full max-w-4xl">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-[0.34em] text-[#c6994a]">WhatsApp</p>
              <h1 className="mt-5 text-balance font-serif text-4xl leading-[1.02] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
                {gateTitle}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/64 sm:text-lg sm:leading-9">{gateSubtitle}</p>
            </div>

            <div className="language-gate-panel mx-auto mt-8 max-w-3xl border border-gold/[0.22] bg-[#050505]/90 p-4 shadow-premium backdrop-blur-md md:p-5">
              <label className="sr-only" htmlFor="whatsapp-lang-search">
                {searchPlaceholder}
              </label>
              <input
                id="whatsapp-lang-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={searchPlaceholder}
                autoComplete="off"
                className="w-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-gold/[0.45] focus:ring-1 focus:ring-gold/[0.35]"
              />
              <div
                className="mt-3 max-h-[min(52vh,26rem)] overflow-y-auto overscroll-contain pr-1"
                role="list"
                aria-label={gateTitle}
              >
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {filteredLocales.map((item) => (
                    <LanguageOptionButton
                      key={item.locale}
                      locale={item.locale}
                      label={item.label}
                      short={item.short}
                      rtl={item.rtl}
                      selected={activeLocale === item.locale}
                      onSelect={handleLanguageSelect}
                    />
                  ))}
                </div>
                {filteredLocales.length === 0 ? (
                  <p className="py-8 text-center text-sm text-white/50">{WHATSAPP_LANGUAGE_GATE.emptySearch}</p>
                ) : null}
              </div>
              <p className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                {whatsappLandingLocales.length} {WHATSAPP_LANGUAGE_GATE.languagesCount}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {activeLocale ? (
                <motion.div
                  key={activeLocale}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                  transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto mt-10 max-w-4xl"
                >
                  <div className="mb-6 text-center">
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-[#c6994a]">{channelsEyebrow}</p>
                    <h2 className="mt-3 font-serif text-3xl tracking-[-0.04em] text-white sm:text-4xl">{activeCopy?.title}</h2>
                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/58 sm:text-base">{activeCopy?.subtitle}</p>
                  </div>
                  <div className="grid gap-5">
                    <ChannelCard level="formiga" locale={activeLocale} reduceMotion={reduceMotion} />
                    <ChannelCard level="lobo" locale={activeLocale} reduceMotion={reduceMotion} />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </section>

        <footer className="border-t border-white/10 py-5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white/34">
          Varejo Investidor
        </footer>
      </div>
    </main>
  );
}
