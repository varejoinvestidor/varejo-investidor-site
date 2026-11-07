"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { LocaleFlagIcon } from "../../src/components/LocaleFlagIcon";
import { FORMATION_TRACK_UI } from "../../src/data/formationPricing";
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

const WHATSAPP_CHARACTER_IMAGES: Record<WhatsAppChannelLevel, string> = {
  formiga: FORMATION_TRACK_UI.formiga.image,
  lobo: FORMATION_TRACK_UI.lobo.image,
};

const STORAGE_KEY = "varejo_whatsapp_landing_language";
const RTL_LOCALES = new Set<WhatsAppLandingLocale>(["ar", "fa", "ur"]);

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

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

  const characterSrc = WHATSAPP_CHARACTER_IMAGES[level];

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE_OUT }}
      className={`whatsapp-channel-card group relative mx-auto w-full max-w-md overflow-hidden border p-5 shadow-[0_28px_90px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 sm:max-w-none sm:p-6 lg:p-7 ${
        isLobo
          ? "border-[#c6994a]/40 bg-gradient-to-br from-[#c6994a]/[0.09] via-white/[0.03] to-transparent hover:border-[#c6994a]/60"
          : "border-[#1f9d5b]/30 bg-gradient-to-br from-[#128c4a]/[0.08] via-white/[0.03] to-transparent hover:border-[#26c76f]/45"
      }`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${isLobo ? "via-[#c6994a]/55" : "via-[#26c76f]/45"} to-transparent`}
      />
      <div className="whatsapp-channel-card-body text-center">
        <div className="whatsapp-channel-figure relative mx-auto w-full max-w-[10.5rem] sm:max-w-[13rem] lg:max-w-[14rem]">
          <Image
            src={characterSrc}
            alt={levelCopy.title}
            width={640}
            height={360}
            sizes="(max-width: 640px) 46vw, 224px"
            className="mx-auto h-auto max-h-[min(11rem,34vw)] w-full object-contain object-bottom sm:max-h-[min(12.5rem,38vw)]"
            priority={level === "formiga"}
          />
        </div>
        <p className="mt-3 text-[10px] font-black uppercase tracking-[0.28em] text-[#c6994a]">Varejo Investidor</p>
        <h2 className="mt-2 font-serif text-3xl leading-none tracking-[-0.045em] text-white sm:text-[2rem] lg:text-4xl">{levelCopy.title}</h2>
        <p className="mt-3 max-w-md flex-1 text-sm leading-7 text-white/68 sm:text-base sm:leading-8">{levelCopy.description}</p>
        {available ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className={`whatsapp-channel-card-cta mt-5 flex min-h-[3.25rem] max-w-sm items-center justify-center px-5 py-3.5 text-center text-xs font-black uppercase tracking-[0.16em] text-white transition ${
              isLobo ? "bg-[#c6994a] text-black hover:bg-[#d8ad52]" : "bg-[#0f8f56] hover:bg-[#16a767]"
            }`}
          >
            {levelCopy.button}
          </a>
        ) : (
          <div className="whatsapp-channel-card-cta mt-5 max-w-sm border border-[#c6994a]/20 bg-[#c6994a]/8 px-5 py-4 text-sm font-semibold text-[#e6d5b5]">
            {levelCopy.unavailable}
          </div>
        )}
      </div>
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

function LanguageSearchGrid({
  activeLocale,
  search,
  onSearchChange,
  searchPlaceholder,
  gateTitle,
  onSelect,
  listClassName = "mt-3 max-h-[min(52vh,26rem)] overflow-y-auto overscroll-contain pr-1",
}: {
  activeLocale: WhatsAppLandingLocale | null;
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  gateTitle: string;
  onSelect: (locale: WhatsAppLandingLocale) => void;
  listClassName?: string;
}) {
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

  return (
    <>
      <label className="sr-only" htmlFor="whatsapp-lang-search">
        {searchPlaceholder}
      </label>
      <input
        id="whatsapp-lang-search"
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={searchPlaceholder}
        autoComplete="off"
        className="w-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-gold/[0.45] focus:ring-1 focus:ring-gold/[0.35]"
      />
      <div className={listClassName} role="list" aria-label={gateTitle}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {filteredLocales.map((item) => (
            <LanguageOptionButton
              key={item.locale}
              locale={item.locale}
              label={item.label}
              short={item.short}
              rtl={item.rtl}
              selected={activeLocale === item.locale}
              onSelect={onSelect}
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
    </>
  );
}

function CompactLanguageSelector({
  activeLocale,
  search,
  onSearchChange,
  searchPlaceholder,
  gateTitle,
  expanded,
  onToggleExpanded,
  onCloseExpanded,
  onSelect,
  reduceMotion,
}: {
  activeLocale: WhatsAppLandingLocale;
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  gateTitle: string;
  expanded: boolean;
  onToggleExpanded: () => void;
  onCloseExpanded: () => void;
  onSelect: (locale: WhatsAppLandingLocale) => void;
  reduceMotion: boolean | null;
}) {
  const activeMeta = whatsappLandingLocales.find((item) => item.locale === activeLocale);

  function handleSelect(nextLocale: WhatsAppLandingLocale) {
    onSelect(nextLocale);
    onSearchChange("");
    onCloseExpanded();
  }

  return (
    <motion.div
      layout
      initial={reduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.38, ease: EASE_OUT }}
      className="language-gate-compact language-gate-panel mx-auto w-full max-w-xl border border-gold/[0.28] bg-[#050505]/95 p-3 backdrop-blur-md sm:p-3.5"
    >
      <button
        type="button"
        className="language-gate-compact-trigger flex w-full items-center gap-3 border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-left transition hover:border-gold/[0.35] hover:bg-white/[0.06]"
        aria-expanded={expanded}
        aria-controls="whatsapp-lang-compact-menu"
        onClick={onToggleExpanded}
      >
        {activeMeta ? (
          <>
            <LocaleFlagIcon
              locale={flagLocale(activeMeta.locale)}
              className="h-5 w-6 shrink-0 overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
            />
            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-white">{activeMeta.label}</span>
            <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.2em] text-gold/80">{activeMeta.short}</span>
          </>
        ) : null}
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center border border-white/10 text-xs text-white/70 transition ${expanded ? "rotate-180 border-gold/30 bg-gold/10" : ""}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            id="whatsapp-lang-compact-menu"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="pt-3">
              <LanguageSearchGrid
                activeLocale={activeLocale}
                search={search}
                onSearchChange={onSearchChange}
                searchPlaceholder={searchPlaceholder}
                gateTitle={gateTitle}
                onSelect={handleSelect}
                listClassName="language-gate-compact-menu mt-3 overflow-y-auto overscroll-contain pr-1"
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export default function WhatsAppChannelsLanding() {
  const reduceMotion = useReducedMotion();
  const [selectedLocale, setSelectedLocale] = useState<WhatsAppLandingLocale | null>(null);
  const [search, setSearch] = useState("");
  const [compactPickerOpen, setCompactPickerOpen] = useState(false);

  const activeLocale = selectedLocale;
  const activeCopy = activeLocale ? whatsappLandingCopy[activeLocale] : null;
  const pageDir = activeLocale && RTL_LOCALES.has(activeLocale) ? "rtl" : "ltr";
  const channelsRevealed = Boolean(activeLocale);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (!saved) return;
    const normalized = saved === "pt-pt" ? "pt" : saved;
    if (isLandingLocale(normalized)) {
      setSelectedLocale(normalized);
      if (normalized !== saved) {
        window.localStorage.setItem(STORAGE_KEY, normalized);
      }
      dispatchLandingEvent("language_detected", { language: normalized, source: "storage" });
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
    if (!selectedLocale) {
      setCompactPickerOpen(false);
    }
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

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
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
        </header>

        <section className={`flex flex-1 flex-col ${channelsRevealed ? "py-6 sm:py-8" : "py-10 sm:py-14"}`}>
          <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col">
            <AnimatePresence mode="wait">
              {!channelsRevealed ? (
                <motion.div
                  key="language-gate"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE_OUT }}
                  className="w-full"
                >
                  <div className="text-center">
                    <p className="text-xs font-black uppercase tracking-[0.34em] text-[#c6994a]">WhatsApp</p>
                    <h1 className="mt-5 text-balance font-serif text-4xl leading-[1.02] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
                      {gateTitle}
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/64 sm:text-lg sm:leading-9">{gateSubtitle}</p>
                  </div>

                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE_OUT, delay: reduceMotion ? 0 : 0.05 }}
                    className="language-gate-panel mx-auto mt-8 max-w-3xl border border-gold/[0.22] bg-[#050505]/90 p-4 shadow-premium backdrop-blur-md md:p-5"
                  >
                    <LanguageSearchGrid
                      activeLocale={activeLocale}
                      search={search}
                      onSearchChange={setSearch}
                      searchPlaceholder={searchPlaceholder}
                      gateTitle={gateTitle}
                      onSelect={handleLanguageSelect}
                    />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="channels-layout"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.32, ease: EASE_OUT }}
                  className="flex w-full flex-1 flex-col"
                >
                  <CompactLanguageSelector
                    activeLocale={activeLocale!}
                    search={search}
                    onSearchChange={setSearch}
                    searchPlaceholder={searchPlaceholder}
                    gateTitle={gateTitle}
                    expanded={compactPickerOpen}
                    onToggleExpanded={() => setCompactPickerOpen((open) => !open)}
                    onCloseExpanded={() => setCompactPickerOpen(false)}
                    onSelect={handleLanguageSelect}
                    reduceMotion={reduceMotion}
                  />

                  <motion.div
                    key={activeLocale}
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE_OUT, delay: reduceMotion ? 0 : 0.06 }}
                    className="mx-auto mt-6 w-full max-w-5xl sm:mt-8"
                  >
                    <div className="mb-5 text-center sm:mb-6">
                      <p className="text-xs font-black uppercase tracking-[0.28em] text-[#c6994a]">{channelsEyebrow}</p>
                      <h2 className="mt-2 font-serif text-2xl tracking-[-0.04em] text-white sm:mt-3 sm:text-3xl lg:text-4xl">{activeCopy?.title}</h2>
                      <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-white/58 sm:mt-3 sm:text-base">{activeCopy?.subtitle}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:items-stretch lg:gap-6">
                      <ChannelCard level="formiga" locale={activeLocale!} reduceMotion={reduceMotion} />
                      <ChannelCard level="lobo" locale={activeLocale!} reduceMotion={reduceMotion} />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <footer className="border-t border-white/10 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white/34 sm:py-5">
          Varejo Investidor
        </footer>
      </div>
    </main>
  );
}
