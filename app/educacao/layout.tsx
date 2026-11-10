import type { Metadata } from "next";
import { buildPageMetadata } from "../../src/data/localeMetadata";

export const metadata: Metadata = buildPageMetadata("/educacao", "pt");

export default function EducacaoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
