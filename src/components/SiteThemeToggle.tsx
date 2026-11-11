"use client";

import type { Locale } from "../i18n";
import { useSiteThemeState } from "../theme/SiteThemeBoot";
import type { SiteThemePreference } from "../theme/siteTheme";

const LABELS: Record<Locale, Record<SiteThemePreference, string>> = {
  pt: { system: "Sistema", light: "Claro", dark: "Escuro" },
  en: { system: "System", light: "Light", dark: "Dark" },
  es: { system: "Sistema", light: "Claro", dark: "Oscuro" },
  fr: { system: "Système", light: "Clair", dark: "Sombre" },
  de: { system: "System", light: "Hell", dark: "Dunkel" },
  it: { system: "Sistema", light: "Chiaro", dark: "Scuro" },
  ja: { system: "システム", light: "ライト", dark: "ダーク" },
  zh: { system: "系统", light: "浅色", dark: "深色" },
  ar: { system: "النظام", light: "فاتح", dark: "داكن" },
  he: { system: "מערכת", light: "בהיר", dark: "כהה" },
  hi: { system: "सिस्टम", light: "लाइट", dark: "डार्क" },
  ru: { system: "Система", light: "Светлая", dark: "Тёмная" },
  tr: { system: "Sistem", light: "Açık", dark: "Koyu" },
  vi: { system: "Hệ thống", light: "Sáng", dark: "Tối" },
  th: { system: "ระบบ", light: "สว่าง", dark: "มืด" },
  id: { system: "Sistem", light: "Terang", dark: "Gelap" },
  bn: { system: "সিস্টেম", light: "লাইট", dark: "ডার্ক" },
  ur: { system: "سسٹم", light: "لائٹ", dark: "ڈارک" },
  tl: { system: "System", light: "Maliwanag", dark: "Madilim" },
};

const SECTION_TITLE: Record<Locale, string> = {
  pt: "Tema",
  en: "Theme",
  es: "Tema",
  fr: "Thème",
  de: "Design",
  it: "Tema",
  ja: "テーマ",
  zh: "主题",
  ar: "المظهر",
  he: "ערכת נושא",
  hi: "थीम",
  ru: "Тема",
  tr: "Tema",
  vi: "Giao diện",
  th: "ธีม",
  id: "Tema",
  bn: "থিম",
  ur: "تھیم",
  tl: "Tema",
};

const OPTIONS: SiteThemePreference[] = ["system", "light", "dark"];

export function SiteThemeToggle({
  locale,
  variant = "header",
}: {
  locale: Locale;
  variant?: "header" | "footer" | "mobile";
}) {
  const { pref, setPref } = useSiteThemeState();
  const labels = LABELS[locale] ?? LABELS.en;

  const shell =
    variant === "footer"
      ? "site-theme-toggle site-theme-toggle-footer"
      : variant === "mobile"
        ? "site-theme-toggle site-theme-toggle-mobile"
        : "site-theme-toggle site-theme-toggle-header";

  return (
    <div className={shell} role="group" aria-label={SECTION_TITLE[locale] ?? SECTION_TITLE.en}>
      {variant === "footer" ? (
        <p className="footer-heading">{SECTION_TITLE[locale] ?? SECTION_TITLE.en}</p>
      ) : null}
      <div className={`site-theme-toggle-inner ${variant === "footer" ? "mt-4" : ""}`}>
        {OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setPref(option)}
            className="site-theme-toggle-btn"
            aria-pressed={pref === option}
            title={labels[option]}
          >
            {labels[option]}
          </button>
        ))}
      </div>
    </div>
  );
}
