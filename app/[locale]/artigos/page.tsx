import { notFound } from "next/navigation";
import {
  createPublisherHubMetadata,
  PublisherArticlesHubPage,
  PUBLISHER_ARTICLE_REVALIDATE,
} from "../../../src/publisher/public/articleRoutes";
import { SUPPORTED_LOCALES, type SupportedLocale } from "../../../src/i18n/locales";
import { localeToUrlSegment, normalizeUrlLocaleSegment } from "../../../src/i18n/routing";
import "../../insights-research.css";

export const revalidate = PUBLISHER_ARTICLE_REVALIDATE;

type Props = { params: { locale: string } };

export function generateStaticParams() {
  return SUPPORTED_LOCALES.filter((l) => l !== "pt").map((locale) => ({
    locale: localeToUrlSegment(locale as SupportedLocale) || locale,
  }));
}

function resolveLocale(segment: string): SupportedLocale | null {
  const locale = normalizeUrlLocaleSegment(segment);
  if (!locale || locale === "pt") return null;
  return locale;
}

export async function generateMetadata({ params }: Props) {
  const locale = resolveLocale(params.locale);
  if (!locale) return { title: "Artigos" };
  return createPublisherHubMetadata(locale, locale);
}

export default async function LocalizedPublisherArticlesHub({ params }: Props) {
  const locale = resolveLocale(params.locale);
  if (!locale) notFound();
  return PublisherArticlesHubPage({ language: locale, pageLocale: locale });
}
