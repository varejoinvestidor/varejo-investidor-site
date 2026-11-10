import { notFound } from "next/navigation";
import {
  createPublisherSlugMetadata,
  PublisherArticleSlugPage,
  PUBLISHER_ARTICLE_REVALIDATE,
  staticParamsForPublisherAndLegacy,
} from "../../../../src/publisher/public/articleRoutes";
import { SUPPORTED_LOCALES, type SupportedLocale } from "../../../../src/i18n/locales";
import { localeToUrlSegment, normalizeUrlLocaleSegment } from "../../../../src/i18n/routing";
import "../../../insights-research.css";

export const revalidate = PUBLISHER_ARTICLE_REVALIDATE;

type Props = { params: { locale: string; slug: string } };

export async function generateStaticParams() {
  const locales = SUPPORTED_LOCALES.filter((l) => l !== "pt" && l !== "en");
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const segment = localeToUrlSegment(locale as SupportedLocale) || locale;
    const slugs = await staticParamsForPublisherAndLegacy(locale, locale);
    for (const { slug } of slugs) {
      params.push({ locale: segment, slug });
    }
  }
  return params;
}

function resolveLocale(segment: string): SupportedLocale | null {
  const locale = normalizeUrlLocaleSegment(segment);
  if (!locale || locale === "pt") return null;
  return locale;
}

export async function generateMetadata({ params }: Props) {
  const locale = resolveLocale(params.locale);
  if (!locale) return { title: "Artigo" };
  return createPublisherSlugMetadata(locale, locale, params.slug);
}

export default async function LocalizedPublisherArticleSlug({ params }: Props) {
  const locale = resolveLocale(params.locale);
  if (!locale) notFound();
  return PublisherArticleSlugPage({ language: locale, pageLocale: locale, slug: params.slug });
}
