"use client";

import type { Locale } from "../i18n";
import { useSiteThemeState } from "../theme/SiteThemeBoot";
import type { SiteThemePreference } from "../theme/siteTheme";

const OPTIONS: SiteThemePreference[] = ["system", "light", "dark"];

const LABELS: Record<string, Record<SiteThemePreference, string>> = {
  pt: { system: "Sistema", light: "Claro", dark: "Escuro" },
  en: { system: "System", light: "Light", dark: "Dark" },
  es: { system: "Sistema", light: "Claro", dark: "Oscuro" },
};

export function SiteThemeToggle({ locale, variant = "footer" }: { locale: Locale; variant?: "footer" | "mobile" }) {
  const { pref, setPref } = useSiteThemeState();
  const labels = LABELS[locale] ?? LABELS.en;
  return (
    <div className={`site-theme-toggle site-theme-toggle-${variant}`} role="group" aria-label={locale === "pt" ? "Tema" : "Theme"}>
      {variant === "footer" ? <p className="footer-heading">{locale === "pt" ? "Tema" : "Theme"}</p> : null}
      <div className={`site-theme-toggle-inner ${variant === "footer" ? "mt-4" : ""}`}>
        {OPTIONS.map((option) => (
          <button key={option} type="button" className="site-theme-toggle-btn" aria-pressed={pref === option} onClick={() => setPref(option)}>
            {labels[option]}
          </button>
        ))}
      </div>
    </div>
  );
}
