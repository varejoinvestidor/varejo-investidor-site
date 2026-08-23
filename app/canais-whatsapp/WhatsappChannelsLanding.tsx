"use client";

import { useEffect, useMemo, useState } from "react";
import {
  hasWhatsAppChannels,
  whatsappChannels,
  whatsappLandingCopy,
  whatsappLandingLocales,
  type WhatsAppChannelLevel,
  type WhatsAppLandingLocale,
} from "../../src/data/whatsappChannels";

const STORAGE_KEY = "varejo_whatsapp_landing_language";
const RTL_LOCALES = new Set<WhatsAppLandingLocale>(["ar", "fa", "ur"]);

function isLandingLocale(value: string | null | undefined): value is WhatsAppLandingLocale {
  return Boolean(value && whatsappLandingLocales.some((item) => item.locale === value));
}

function normalizeBrowserLanguage(value: string) {
  const lower = value.toLowerCase();
  if (lower === "pt-pt") return "pt-pt";
  if (lower.startsWith("pt")) return "pt";
  if (lower.startsWith("fil") || lower.startsWith("tl") || lower.includes("-ph")) return "tl";
  if (lower.startsWith("zh")) return "zh";
  const base = lower.split("-")[0];
  return isLandingLocale(base) ? base : null;
}

function detectLandingLocale(): WhatsAppLandingLocale {
  if (typeof window === "undefined") return "pt";

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (isLandingLocale(saved)) return saved;

  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const language of languages) {
    const detected = normalizeBrowserLanguage(language);
    if (detected) return detected;
  }

  return "pt";
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

function WhatsAppMark() {
  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#1f9d5b]/30 bg-[#128c4a]/10 text-[#26c76f]" aria-hidden="true">
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
}: {
  level: WhatsAppChannelLevel;
  locale: WhatsAppLandingLocale;
}) {
  const copy = whatsappLandingCopy[locale];
  const levelCopy = copy[level];
  const href = whatsappChannels[locale]?.[level];
  const available = Boolean(href);

  function handleClick() {
    dispatchLandingEvent(level === "formiga" ? "formiga_click" : "lobo_click", {
      language: locale,
      level,
    });
  }

  return (
    <article className="group relative overflow-hidden border border-white/10 bg-white/[0.035] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-[#c6994a]/45 sm:p-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c6994a]/55 to-transparent" />
      <div className="flex items-start gap-4">
        <WhatsAppMark />
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#c6994a]">Varejo Investidor</p>
          <h2 className="mt-2 font-serif text-4xl leading-none tracking-[-0.045em] text-white sm:text-5xl">
            {levelCopy.title}
          </h2>
        </div>
      </div>
      <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
        {levelCopy.description}
      </p>
      {available ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="mt-8 flex min-h-14 w-full items-center justify-center bg-[#0f8f56] px-6 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#16a767] sm:w-auto sm:min-w-[280px]"
        >
          {levelCopy.button}
        </a>
      ) : (
        <div className="mt-8 border border-[#c6994a]/20 bg-[#c6994a]/8 px-5 py-4 text-sm font-semibold text-[#e6d5b5]">
          {levelCopy.unavailable}
        </div>
      )}
    </article>
  );
}

export default function WhatsAppChannelsLanding() {
  const [locale, setLocale] = useState<WhatsAppLandingLocale>("pt");
  const meta = useMemo(() => whatsappLandingLocales.find((item) => item.locale === locale) ?? whatsappLandingLocales[0], [locale]);
  const copy = whatsappLandingCopy[locale];
  const channelsAvailable = hasWhatsAppChannels(locale);

  useEffect(() => {
    const detected = detectLandingLocale();
    setLocale(detected);
    dispatchLandingEvent("language_detected", { language: detected });
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "pt-pt" ? "pt-PT" : locale === "pt" ? "pt-BR" : locale;
    document.documentElement.dir = RTL_LOCALES.has(locale) ? "rtl" : "ltr";
  }, [locale]);

  function handleLanguageChange(nextLocale: WhatsAppLandingLocale) {
    setLocale(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    dispatchLandingEvent("language_changed", { language: nextLocale });
  }

  return (
    <main dir={RTL_LOCALES.has(locale) ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(198,153,74,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(15,143,86,0.1),transparent_32%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center border border-[#c6994a]/55 bg-[#c6994a] text-xs font-black text-black">VI</span>
            <div className="min-w-0">
              <p className="truncate font-serif text-xl leading-none tracking-[-0.04em] text-white sm:text-2xl">Varejo Investidor</p>
              <p className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.24em] text-white/40 sm:block">WhatsApp Oficial</p>
            </div>
          </div>

          <label className="flex shrink-0 items-center gap-2 border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-bold text-white/70">
            <span className="hidden sm:inline">{copy.languageLabel}</span>
            <select
              value={locale}
              onChange={(event) => handleLanguageChange(event.target.value as WhatsAppLandingLocale)}
              className="bg-transparent text-sm font-black text-white outline-none"
              aria-label={copy.languageLabel}
            >
              {whatsappLandingLocales.map((item) => (
                <option key={item.locale} value={item.locale} className="bg-[#050505] text-white">
                  {item.short} - {item.label}
                </option>
              ))}
            </select>
          </label>
        </header>

        <section className="flex flex-1 items-center py-14 sm:py-20">
          <div className="w-full">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-black uppercase tracking-[0.34em] text-[#c6994a]">Formiga / Lobo</p>
              <h1 className="mt-5 text-balance font-serif text-4xl leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
                {copy.title}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/64 sm:text-xl sm:leading-9">
                {copy.subtitle}
              </p>
            </div>

            {!channelsAvailable ? (
              <div className="mx-auto mt-10 max-w-3xl border border-[#c6994a]/20 bg-[#c6994a]/8 p-5 text-center sm:p-6">
                <p className="font-serif text-2xl tracking-[-0.035em] text-[#e6d5b5]">{copy.preparedTitle}</p>
                <p className="mt-3 text-sm leading-7 text-white/62">{copy.preparedText}</p>
              </div>
            ) : null}

            <div className="mx-auto mt-10 grid max-w-4xl gap-5">
              <ChannelCard level="formiga" locale={locale} />
              <ChannelCard level="lobo" locale={locale} />
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 py-5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white/34">
          Varejo Investidor
        </footer>
      </div>
    </main>
  );
}
