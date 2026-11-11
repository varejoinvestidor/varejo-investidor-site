import type { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import { getIdiomaPageTitle } from "../../src/i18n/languageGateCopy";
import { SUPPORTED_LANGUAGE_COUNT } from "../../src/data/languageCountCopy";
import { LanguageGateScreen } from "../../src/components/LanguageGateScreen";
import { countryDisplayName } from "../../src/analytics/regions";
import { LANGUAGE_CATALOG } from "../../src/i18n/languageCatalog";
import { languageGateUiLocale, suggestLocaleFromRequestHeaders, type SuggestedLocaleResult } from "../../src/i18n/suggestLocale";

export function generateMetadata(): Metadata {
  const h = headers();
  const fromEdge = suggestLocaleFromRequestHeaders(h);
  const uiLocale = languageGateUiLocale(fromEdge.locale, fromEdge.source);
  return {
    title: getIdiomaPageTitle(uiLocale),
    description: `Choose or confirm your language among ${SUPPORTED_LANGUAGE_COUNT} options on Varejo Investidor.`,
    robots: { index: false, follow: true },
  };
}

function resolveInitialSuggestion(): SuggestedLocaleResult & { uiLocale: ReturnType<typeof languageGateUiLocale> } {
  const h = headers();
  const fromEdge = suggestLocaleFromRequestHeaders(h);
  const uiLocale = languageGateUiLocale(fromEdge.locale, fromEdge.source);
  return { ...fromEdge, uiLocale };
}

export default function IdiomaPage() {
  const initial = resolveInitialSuggestion();
  const countryLabel = initial.countryCode ? countryDisplayName(initial.countryCode) : null;
  const languageName =
    LANGUAGE_CATALOG.find((item) => item.locale === initial.locale)?.nativeName ?? "English";

  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-[#030303] text-[#f4f0e8]">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Varejo Investidor</p>
        </main>
      }
    >
      <LanguageGateScreen initial={initial} countryLabel={countryLabel} languageName={languageName} />
    </Suspense>
  );
}
