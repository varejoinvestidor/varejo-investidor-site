import type { Metadata } from "next";
import { headers } from "next/headers";
import { ViSiteAnalytics } from "../src/analytics/ViSiteAnalytics";
import { SiteJsonLd } from "../src/components/SiteJsonLd";
import { buildPageMetadata } from "../src/data/localeMetadata";
import { DEFAULT_LOCALE, isRtlLocale, isSupportedLocale, localeToHtmlLang, type Locale } from "../src/i18n";
import "./globals.css";
import "./institutional.css";
import "./mobile-system.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030303",
};

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = headers();
  const pathname = headerStore.get("x-varejo-pathname") ?? "/";
  const requestedLocale = headerStore.get("x-varejo-locale");
  const locale: Locale = isSupportedLocale(requestedLocale) ? requestedLocale : DEFAULT_LOCALE;
  return buildPageMetadata(pathname, locale);
}

function getRequestLocale(): Locale {
  const requestedLocale = headers().get("x-varejo-locale");
  return isSupportedLocale(requestedLocale) ? requestedLocale : DEFAULT_LOCALE;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getRequestLocale();

  return (
    <html lang={localeToHtmlLang(locale)} dir={isRtlLocale(locale) ? "rtl" : "ltr"}>
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body>
        <SiteJsonLd />
        <ViSiteAnalytics />
        {children}
      </body>
    </html>
  );
}
