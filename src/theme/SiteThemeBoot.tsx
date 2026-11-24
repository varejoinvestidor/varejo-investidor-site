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

export function SiteThemeBoot() {
  useEffect(() => {
    applySiteThemeToDocument(readSiteThemePreference());
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onSystem = () => {
      if (readSiteThemePreference() === "system") applySiteThemeToDocument("system");
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key !== SITE_THEME_STORAGE_KEY) return;
      const next = event.newValue;
      if (next === "light" || next === "dark" || next === "system") applySiteThemeToDocument(next);
    };
    mq.addEventListener("change", onSystem);
    window.addEventListener("storage", onStorage);
    return () => {
      mq.removeEventListener("change", onSystem);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return null;
}

export function useSiteThemeState() {
  const [pref, setPrefState] = useState<SiteThemePreference>("system");
  const [resolved, setResolved] = useState<SiteThemeResolved>("dark");

  useEffect(() => {
    const current = readSiteThemePreference();
    setPrefState(current);
    setResolved(resolveSiteTheme(current));
  }, []);

  const setPref = (next: SiteThemePreference) => {
    localStorage.setItem(SITE_THEME_STORAGE_KEY, next);
    applySiteThemeToDocument(next);
    setPrefState(next);
    setResolved(resolveSiteTheme(next));
  };

  return { pref, resolved, setPref };
}
