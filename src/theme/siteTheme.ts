export type SiteThemePreference = "light" | "dark" | "system";
export type SiteThemeResolved = "light" | "dark";

export const SITE_THEME_STORAGE_KEY = "varejo_site_theme";

export function isAdminPath(pathname: string) {
  return /^\/admin(\/|$)/.test(pathname);
}

export function resolveSiteTheme(pref: SiteThemePreference): SiteThemeResolved {
  if (pref === "light" || pref === "dark") return pref;
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "light";
  }
  return "dark";
}

export function readSiteThemePreference(): SiteThemePreference {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem(SITE_THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") return stored;
  return "system";
}

export function applySiteThemeToDocument(pref: SiteThemePreference) {
  if (typeof document === "undefined") return;
  if (isAdminPath(window.location.pathname)) return;

  const resolved = resolveSiteTheme(pref);
  document.documentElement.dataset.siteTheme = resolved;
  document.documentElement.dataset.siteThemePref = pref;
  document.documentElement.style.colorScheme = resolved;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", resolved === "light" ? "#faf8f5" : "#030303");

  window.dispatchEvent(new CustomEvent("varejo-site-theme", { detail: { pref, resolved } }));
}

export const SITE_THEME_BOOT_SCRIPT = `
(function () {
  try {
    if (/^\\/admin(\\/|$)/.test(location.pathname)) return;
    var k = ${JSON.stringify(SITE_THEME_STORAGE_KEY)};
    var p = localStorage.getItem(k) || "system";
    var r = p;
    if (p === "system") {
      r = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    document.documentElement.setAttribute("data-site-theme", r);
    document.documentElement.setAttribute("data-site-theme-pref", p);
    document.documentElement.style.colorScheme = r;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", r === "light" ? "#faf8f5" : "#030303");
  } catch (e) {}
})();
`;
