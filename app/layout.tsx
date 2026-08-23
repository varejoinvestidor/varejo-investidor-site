import type { Metadata } from "next";
import { headers } from "next/headers";
import { DEFAULT_LOCALE, isRtlLocale, isSupportedLocale, localeToHtmlLang, type Locale } from "../src/i18n";
import "./globals.css";
import "./institutional.css";

const siteTitle = "Varejo Investidor | Sinais, Educação e Mercado Global";
const siteDescription =
  "Ecossistema global com sinais ao vivo, educação por níveis, análises de mercado e estrutura estratégica para investidores de varejo.";

const languageAlternates: Record<string, string> = {
  "x-default": "/en",
  "pt-BR": "/",
  en: "/en",
  es: "/es",
  fr: "/fr",
  de: "/de",
  it: "/it",
  ar: "/ar",
  fa: "/fa",
  hi: "/hi",
  ur: "/ur",
  bn: "/bn",
  tr: "/tr",
  ru: "/ru",
  id: "/id",
  vi: "/vi",
  th: "/th",
  fil: "/fil",
  zh: "/zh",
  ja: "/ja",
  ko: "/ko",
  pl: "/pl",
};

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "pt_BR",
    siteName: "Varejo Investidor",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  alternates: {
    canonical: "/",
    languages: languageAlternates,
  },
};

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
      <body>{children}</body>
    </html>
  );
}
