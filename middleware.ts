import { NextResponse, type NextRequest } from "next/server";
import {
  LANGUAGE_GATE_COOKIE,
  LANGUAGE_GATE_PATH,
} from "./src/i18n/languageCatalog";
import { DEFAULT_LOCALE, isSupportedLocale, type SupportedLocale } from "./src/i18n/locales";
import { localeFromPublicPath, localizedPath, normalizeUrlLocaleSegment } from "./src/i18n/routing";
import { refreshPublisherSession } from "./src/publisher/supabase/middleware";

function isPublisherPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/auth/");
}

function localeFromAcceptLanguage(header: string | null) {
  if (!header) return DEFAULT_LOCALE;

  const requested = header
    .split(",")
    .map((part) => part.trim().split(";")[0]?.toLowerCase())
    .filter(Boolean);

  for (const language of requested) {
    const base = language.split("-")[0];
    if (isSupportedLocale(base)) return base;
    if (language === "fil") return "tl";
    if (language === "zh-cn" || language === "zh-sg") return "zh";
  }

  return DEFAULT_LOCALE;
}

function isSearchBot(userAgent: string | null) {
  if (!userAgent) return false;
  return /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandex|facebookexternalhit|twitterbot|linkedinbot|lighthouse|bot|crawler|spider|preview/i.test(
    userAgent,
  );
}

function hasCompletedLanguageGate(request: NextRequest) {
  return (
    request.cookies.get(LANGUAGE_GATE_COOKIE)?.value === "1" ||
    request.cookies.get("varejo_language_selected")?.value === "true"
  );
}

function getSavedLocaleFromCookies(request: NextRequest): SupportedLocale | null {
  const saved =
    request.cookies.get("varejo_language")?.value ??
    request.cookies.get("language")?.value ??
    request.cookies.get("varejo-investidor-locale")?.value;
  return isSupportedLocale(saved) ? saved : null;
}

function isLocalizedHomePath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return true;

  if (parts.length === 1) {
    const locale = normalizeUrlLocaleSegment(parts[0]);
    if (locale) return true;
    if (parts[0] === "home") return true;
  }

  if (parts.length === 2 && parts[1] === "home" && normalizeUrlLocaleSegment(parts[0])) {
    return true;
  }

  return false;
}

function getLocaleFromRequest(request: NextRequest) {
  const firstSegment = request.nextUrl.pathname.split("/").filter(Boolean)[0];
  const urlLocale = normalizeUrlLocaleSegment(firstSegment);
  if (urlLocale) return urlLocale;
  if (!firstSegment) return "pt";
  const publicPathLocale = localeFromPublicPath(request.nextUrl.pathname);
  if (publicPathLocale) return publicPathLocale;

  const savedLocale = getSavedLocaleFromCookies(request);
  if (savedLocale) return savedLocale;

  return localeFromAcceptLanguage(request.headers.get("accept-language"));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname !== LANGUAGE_GATE_PATH &&
    !isPublisherPath(pathname) &&
    !isSearchBot(request.headers.get("user-agent"))
  ) {
    if (!hasCompletedLanguageGate(request) && isLocalizedHomePath(pathname)) {
      const gateUrl = request.nextUrl.clone();
      gateUrl.pathname = LANGUAGE_GATE_PATH;
      if (pathname !== "/") {
        gateUrl.searchParams.set("returnTo", pathname);
      }
      return NextResponse.redirect(gateUrl);
    }

    if (hasCompletedLanguageGate(request) && pathname === "/") {
      const saved = getSavedLocaleFromCookies(request);
      if (saved) {
        const target = localizedPath("/", saved);
        if (target !== pathname) {
          return NextResponse.redirect(new URL(target, request.url));
        }
      }
    }
  }

  const requestHeaders = new Headers(request.headers);
  const locale = getLocaleFromRequest(request);
  requestHeaders.set("x-varejo-locale", locale);
  requestHeaders.set("x-varejo-pathname", pathname);

  const parts = request.nextUrl.pathname.split("/").filter(Boolean);
  const firstSegment = parts[0];
  const urlLocale = normalizeUrlLocaleSegment(firstSegment);

  if (urlLocale) {
    const rest = parts.slice(1);
    const firstPageSegment = rest[0]?.toLowerCase();
    const targetUrl = request.nextUrl.clone();
    let targetPath: string | null = null;

    const localeSegment = urlLocale === "tl" ? "tl" : urlLocale;
    const localizedPageAliases: Record<string, string> = {
      sinais: "signals",
      educacao: "education",
      servicos: "services",
      sobre: "about",
      artigos: "articles",
    };

    const rootHandledPages = new Set([
      "select",
      "private",
      "ferramentas",
      "calculadora-de-risco",
      "eventos",
      "nivel-formiga",
      "nivel-lobo",
      "nivel-harpia",
      "relatorio-elite",
      "elite-report",
      "reporte-elite",
      "idioma",
      "admin",
      "auth",
    ]);

    if (firstPageSegment && localizedPageAliases[firstPageSegment]) {
      targetPath = `/${[localeSegment, localizedPageAliases[firstPageSegment], ...rest.slice(1)].join("/")}`;
    } else if (firstPageSegment && rootHandledPages.has(firstPageSegment)) {
      targetPath = `/${rest.join("/")}`;
    } else if (firstSegment === "fil") {
      targetPath = `/${["tl", ...rest].join("/")}`;
    }

    if (targetPath && targetPath !== request.nextUrl.pathname) {
      targetUrl.pathname = targetPath;
      return NextResponse.rewrite(targetUrl, {
        request: {
          headers: requestHeaders,
        },
      });
    }
  }

  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (isPublisherPath(pathname) || pathname.startsWith("/api/")) {
    response = await refreshPublisherSession(request, response);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
