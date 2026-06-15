import type { Metadata } from "next";
import { headers } from "next/headers";
import { DEFAULT_LOCALE, isRtlLocale, isSupportedLocale, localeToHtmlLang, type Locale } from "../src/i18n";
import "./globals.css";

const siteTitle = "Varejo Investidor | Sinais, Educação e Mercado Global";
const siteDescription =
  "Ecossistema global com sinais ao vivo, educação por níveis, análises de mercado e estrutura estratégica para investidores de varejo.";

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
    languages: {
      "x-default": "/en",
      "pt-BR": "/pt",
      en: "/en",
      es: "/es",
      fr: "/fr",
      it: "/it",
      de: "/de",
      fa: "/fa",
      hi: "/hi",
      ar: "/ar",
      tr: "/tr",
      id: "/id",
      vi: "/vi",
      th: "/th",
      ru: "/ru",
      ur: "/ur",
      bn: "/bn",
      ja: "/ja",
      ko: "/ko",
      zh: "/zh",
      pl: "/pl",
      tl: "/tl",
    },
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
