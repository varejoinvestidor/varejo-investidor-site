import { NextResponse } from "next/server";
import { countryDisplayName } from "../../../../src/analytics/regions";
import { languageGateUiLocale, suggestLocaleFromRequestHeaders } from "../../../../src/i18n/suggestLocale";
import { LANGUAGE_CATALOG } from "../../../../src/i18n/languageCatalog";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const headers = new Headers(request.headers);
  const suggested = suggestLocaleFromRequestHeaders(headers);
  const uiLocale = languageGateUiLocale(suggested.locale, suggested.source);

  const countryLabel = suggested.countryCode ? countryDisplayName(suggested.countryCode) : null;
  const languageName = LANGUAGE_CATALOG.find((item) => item.locale === suggested.locale)?.nativeName ?? "English";

  return NextResponse.json({
    ...suggested,
    uiLocale,
    countryLabel,
    languageName,
  });
}
