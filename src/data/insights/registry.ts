import dolarGlobal from "../../../content/insights/pt/dolar-juros-e-mercado-global.json";
import forexOuroPetroleo from "../../../content/insights/pt/forex-ouro-e-petroleo.json";
import ciclosVarejo from "../../../content/insights/pt/ciclos-economicos-varejo.json";
import bitcoinLiquidez from "../../../content/insights/pt/bitcoin-liquidez-e-risco.json";
import etfsPatrimonio from "../../../content/insights/pt/etfs-acoes-globais-patrimonio.json";
import type { InsightArticleRecord, InsightPost } from "./types";
import { collectArticlePlainText, estimateReadingTimeMinutes } from "./readingTime";

const editorialRecords: InsightArticleRecord[] = [
  dolarGlobal as InsightArticleRecord,
  forexOuroPetroleo as InsightArticleRecord,
  ciclosVarejo as InsightArticleRecord,
  bitcoinLiquidez as InsightArticleRecord,
  etfsPatrimonio as InsightArticleRecord,
];

function isPublic(record: InsightArticleRecord, now = new Date()) {
  if (record.status === "archived" || record.status === "draft" || record.status === "review") {
    return false;
  }
  if (record.status === "scheduled" && record.scheduledAt) {
    return new Date(record.scheduledAt) <= now;
  }
  return record.status === "published" || record.status === "scheduled";
}

export function recordToPost(record: InsightArticleRecord): InsightPost {
  const plain = collectArticlePlainText(record);
  const legacyParagraphs = plain.slice(1);
  return {
    slug: record.slug,
    locale: record.locale,
    translationKey: record.translationKey,
    status: record.status,
    featured: record.featured,
    title: record.title,
    subtitle: record.subtitle,
    description: record.description,
    category: record.category,
    author: record.author,
    personaLead: record.personaLead,
    date: record.datePublished,
    dateModified: record.dateModified,
    readingTime: estimateReadingTimeMinutes(plain, record.locale),
    image: record.image,
    imageAlt: record.imageAlt,
    imageCaption: record.imageCaption,
    tags: record.tags,
    content: legacyParagraphs.length ? legacyParagraphs : [record.description],
    blocks: record.blocks,
    introduction: record.introduction,
    relatedPosts: record.relatedPosts,
    seoTitle: record.seoTitle,
    seoDescription: record.seoDescription,
    sources: record.sources,
    faq: record.faq,
  };
}

export const editorialPosts: InsightPost[] = editorialRecords.filter((record) => isPublic(record)).map(recordToPost);

export function getEditorialRecord(locale: string, slug: string) {
  return editorialRecords.find((record) => record.locale === locale && record.slug === slug);
}

export function getTranslationAlternates(translationKey: string) {
  return editorialRecords
    .filter((record) => record.translationKey === translationKey && isPublic(record))
    .map((record) => ({ locale: record.locale, slug: record.slug }));
}
