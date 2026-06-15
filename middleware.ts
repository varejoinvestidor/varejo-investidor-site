import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isSupportedLocale } from "./src/i18n/locales";

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
  if (isSupportedLocale(firstSegment)) return firstSegment;

  const savedLocale =
    request.cookies.get("varejo_language")?.value ??
    request.cookies.get("language")?.value ??
    request.cookies.get("varejo-investidor-locale")?.value;

  if (isSupportedLocale(savedLocale)) return savedLocale;

  return localeFromAcceptLanguage(request.headers.get("accept-language"));
}

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-varejo-locale", getLocaleFromRequest(request));

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
