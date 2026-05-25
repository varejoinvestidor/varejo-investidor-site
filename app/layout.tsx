import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Varejo Investidor | Sinais, Educação e Mercado Global",
  description:
    "Ecossistema global com sinais ao vivo, educação por níveis, análises de mercado e estrutura estratégica para investidores de varejo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
