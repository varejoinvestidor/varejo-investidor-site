import { NextResponse } from "next/server";
import { searchSite } from "../../../src/search/siteSearchIndex";
import { isSupportedLocale, type Locale } from "../../../src/i18n/locales";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim() ?? "";
  const localeRaw = url.searchParams.get("locale") ?? "pt";
  const locale: Locale = isSupportedLocale(localeRaw) ? localeRaw : "pt";
  const limit = Math.min(24, Math.max(1, Number(url.searchParams.get("limit") ?? 12) || 12));

  if (q.length < 2) {
    return NextResponse.json({ results: [], query: q });
  }

  try {
    const results = await searchSite(q, locale, limit);
    return NextResponse.json(
      { results, query: q },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      },
    );
  } catch (error) {
    console.error("[site-search]", error);
    return NextResponse.json({ results: [], query: q, error: "search_failed" }, { status: 500 });
  }
}
