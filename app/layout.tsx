import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Varejo Investidor | Sinais, Educação e Mercado Global",
  description:
    "Ecossistema global com sinais ao vivo, educação por níveis, análises de mercado e estrutura estratégica para investidores de varejo.",
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/pt",
      en: "/en",
      es: "/es",
      fr: "/fr",
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
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body>{children}</body>
    </html>
  );
}
