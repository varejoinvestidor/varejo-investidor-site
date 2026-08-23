import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isSupportedLocale } from "./src/i18n/locales";
import { localeFromPublicPath, normalizeUrlLocaleSegment } from "./src/i18n/routing";

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

function getLocaleFromRequest(request: NextRequest) {
  const firstSegment = request.nextUrl.pathname.split("/").filter(Boolean)[0];
  const urlLocale = normalizeUrlLocaleSegment(firstSegment);
  if (urlLocale) return urlLocale;
  if (!firstSegment) return "pt";
  const publicPathLocale = localeFromPublicPath(request.nextUrl.pathname);
  if (publicPathLocale) return publicPathLocale;

  const savedLocale =
    request.cookies.get("varejo_language")?.value ??
    request.cookies.get("language")?.value ??
    request.cookies.get("varejo-investidor-locale")?.value;

  if (isSupportedLocale(savedLocale)) return savedLocale;

  return localeFromAcceptLanguage(request.headers.get("accept-language"));
}

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const locale = getLocaleFromRequest(request);
  requestHeaders.set("x-varejo-locale", locale);

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

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
