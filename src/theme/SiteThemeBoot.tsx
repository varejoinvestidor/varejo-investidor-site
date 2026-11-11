"use client";

import { useEffect, useState } from "react";
import {
  applySiteThemeToDocument,
  readSiteThemePreference,
  resolveSiteTheme,
  SITE_THEME_STORAGE_KEY,
  type SiteThemePreference,
  type SiteThemeResolved,
} from "./siteTheme";

/** Mantém tema sincronizado (preferência do sistema + localStorage). */
export function SiteThemeBoot() {
  useEffect(() => {
    const pref = readSiteThemePreference();
    applySiteThemeToDocument(pref);

    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onSystemChange = () => {
      const current = readSiteThemePreference();
      if (current === "system") applySiteThemeToDocument("system");
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key !== SITE_THEME_STORAGE_KEY) return;
      const next = (event.newValue as SiteThemePreference | null) ?? "system";
      if (next === "light" || next === "dark" || next === "system") {
        applySiteThemeToDocument(next);
      }
    };

    mq.addEventListener("change", onSystemChange);
    window.addEventListener("storage", onStorage);
    return () => {
      mq.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return null;
}

export function useSiteThemeState() {
  const [pref, setPrefState] = useState<SiteThemePreference>("system");
  const [resolved, setResolved] = useState<SiteThemeResolved>("dark");

  useEffect(() => {
    setPrefState(readSiteThemePreference());
    setResolved(resolveSiteTheme(readSiteThemePreference()));

    const onTheme = (event: Event) => {
      const detail = (event as CustomEvent<{ pref: SiteThemePreference; resolved: SiteThemeResolved }>).detail;
      if (detail) {
        setPrefState(detail.pref);
        setResolved(detail.resolved);
      }
    };
    window.addEventListener("varejo-site-theme", onTheme);
    return () => window.removeEventListener("varejo-site-theme", onTheme);
  }, []);

  const setPref = (next: SiteThemePreference) => {
    localStorage.setItem(SITE_THEME_STORAGE_KEY, next);
    applySiteThemeToDocument(next);
    setPrefState(next);
    setResolved(resolveSiteTheme(next));
  };

  return { pref, resolved, setPref };
}
