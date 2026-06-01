import { notFound } from "next/navigation";
import { PlatformPage } from "../../../../src/components/PlatformPage";
import { getPlatformContent, platformSlugs } from "../../../../src/data/platformContent";
import type { Locale } from "../../../../src/i18n";

const locales: Locale[] = ["en", "es", "hi", "ar", "tr", "id", "vi"];

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function generateStaticParams() {
  return locales.flatMap((locale) => platformSlugs.map((platform) => ({ locale, platform })));
}

export function generateMetadata({ params }: { params: { locale: string; platform: string } }) {
  if (!isLocale(params.locale)) return {};
  const content = getPlatformContent(params.locale, params.platform);
  if (!content) return {};
  return {
    title: `${content.title} | Varejo Investidor`,
    description: content.metaDescription,
  };
}

export default function LocalizedPlatformPage({ params }: { params: { locale: string; platform: string } }) {
  if (!isLocale(params.locale)) notFound();
  if (!getPlatformContent(params.locale, params.platform)) notFound();
  return <PlatformPage pageLocale={params.locale} slug={params.platform} />;
}
