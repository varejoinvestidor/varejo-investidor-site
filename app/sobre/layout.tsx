import type { Metadata } from "next";
import { buildPageMetadata } from "../../src/data/localeMetadata";

export const metadata: Metadata = buildPageMetadata("/sobre", "pt");

export default function SobreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
