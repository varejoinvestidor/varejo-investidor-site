import type { Metadata } from "next";
import { headers } from "next/headers";
import PartnersPage from "../../src/components/partners/PartnersPage";
import { absoluteSiteUrl } from "../../src/config/site";
import { buildPageMetadata } from "../../src/data/localeMetadata";
import { isSupportedLocale, type Locale } from "../../src/i18n";
import { partnersCopyFor } from "../../src/partners/copy";

export async function generateMetadata(): Promise<Metadata> {
  const requested = headers().get("x-varejo-locale");
  const locale: Locale = isSupportedLocale(requested) ? requested : "pt";
  const copy = partnersCopyFor(locale);
  return buildPageMetadata("/partners", locale, {
    title: copy.metaTitle,
    description: copy.metaDescription,
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      type: "website",
      url: absoluteSiteUrl("/partners"),
      siteName: "Varejo Investidor",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metaTitle,
      description: copy.metaDescription,
    },
  });
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Varejo Investidor Partners",
    url: absoluteSiteUrl("/partners"),
    description: partnersCopyFor("pt").metaDescription,
    isPartOf: { "@type": "WebSite", name: "Varejo Investidor", url: "https://www.varejoinvestidor.com" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PartnersPage />
    </>
  );
}
