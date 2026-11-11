import { NextResponse, type NextRequest } from "next/server";
import {
  LANGUAGE_GATE_COOKIE,
  LANGUAGE_GATE_PATH,
} from "./src/i18n/languageCatalog";
import { DEFAULT_LOCALE, isSupportedLocale, type SupportedLocale } from "./src/i18n/locales";
import { localeFromPublicPath, localizedPath, normalizeUrlLocaleSegment } from "./src/i18n/routing";
import { localeFromAcceptLanguage, suggestLocale } from "./src/i18n/suggestLocale";
import { countryCodeFromRequestHeaders } from "./src/analytics/regions";
import { refreshPublisherSession } from "./src/publisher/supabase/middleware";

function isPublisherPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/auth/");
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

  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/publisher/") && !pathname.startsWith("/api/cron/")) {
    return NextResponse.next();
  }

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
      const redirect = NextResponse.redirect(gateUrl);
      const country = countryCodeFromRequestHeaders(request.headers);
      const suggested = suggestLocale({
        countryCode: country,
        acceptLanguage: request.headers.get("accept-language"),
      });
      redirect.cookies.set("varejo_geo_country", country ?? "", { path: "/", maxAge: 3600, sameSite: "lax" });
      redirect.cookies.set("varejo_geo_locale", suggested.locale, { path: "/", maxAge: 3600, sameSite: "lax" });
      return redirect;
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

    const localizedPageAliases: Record<string, string> = {
      sinais: "signals",
      educacao: "education",
      servicos: "services",
      sobre: "about",
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
      "elite-report-hi",
      "idioma",
      "banners-preview",
      "admin",
      "auth",
    ]);

    const articleAliasSegments = new Set(["articles", "insights"]);
    const routeLocaleFolder =
      urlLocale === "tl"
        ? firstPageSegment && (firstPageSegment === "artigos" || articleAliasSegments.has(firstPageSegment))
          ? "fil"
          : "tl"
        : urlLocale;

    if (firstPageSegment && localizedPageAliases[firstPageSegment]) {
      targetPath = `/${[routeLocaleFolder, localizedPageAliases[firstPageSegment], ...rest.slice(1)].join("/")}`;
    } else if (firstPageSegment && articleAliasSegments.has(firstPageSegment)) {
      targetPath = `/${[routeLocaleFolder === "tl" && firstSegment === "fil" ? "fil" : routeLocaleFolder, "artigos", ...rest.slice(1)].join("/")}`;
    } else if (firstPageSegment && rootHandledPages.has(firstPageSegment)) {
      targetPath = `/${rest.join("/")}`;
    } else if (firstSegment === "fil" && rest[0] !== "artigos" && !articleAliasSegments.has(rest[0] ?? "")) {
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
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
    "/api/publisher/:path*",
    "/api/cron/:path*",
  ],
};
