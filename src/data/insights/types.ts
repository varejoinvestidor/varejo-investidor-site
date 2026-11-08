import type { Locale } from "../../i18n";

export type InsightPublicationStatus =
  | "draft"
  | "review"
  | "scheduled"
  | "published"
  | "archived";

export type InsightPersona = "formiga" | "lobo" | "harpia";

export type InsightCategoryKey =
  | "global-economy"
  | "monetary-policy"
  | "forex"
  | "stocks"
  | "crypto"
  | "gold-metals"
  | "oil-energy"
  | "etfs"
  | "geopolitics"
  | "risk"
  | "wealth";

export type InsightContentBlock =
  | { type: "heading"; id: string; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | {
      type: "table";
      caption?: string;
      headers: string[];
      rows: string[][];
    }
  | { type: "figure"; src: string; alt: string; caption?: string }
  | { type: "persona"; persona: InsightPersona; title: string; text: string };

export type InsightArticleSource = { label: string; url: string };

export type InsightFaqItem = { question: string; answer: string };

/** Canonical editorial record (usually loaded from content/insights). */
export type InsightArticleRecord = {
  slug: string;
  locale: Locale;
  translationKey: string;
  status: InsightPublicationStatus;
  featured?: boolean;
  title: string;
  subtitle: string;
  description: string;
  category: InsightCategoryKey;
  author: string;
  personaLead?: InsightPersona;
  datePublished: string;
  dateModified: string;
  scheduledAt?: string;
  image: string;
  imageAlt: string;
  imageCaption?: string;
  tags: string[];
  relatedPosts: string[];
  seoTitle: string;
  seoDescription: string;
  introduction: string;
  blocks: InsightContentBlock[];
  sources?: InsightArticleSource[];
  faq?: InsightFaqItem[];
};

/** Runtime shape used across hub and article pages (legacy fields kept). */
export type InsightPost = {
  slug: string;
  locale: Locale;
  translationKey: string;
  status: InsightPublicationStatus;
  featured?: boolean;
  title: string;
  subtitle: string;
  description: string;
  category: InsightCategoryKey;
  author: string;
  personaLead?: InsightPersona;
  date: string;
  dateModified: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  imageCaption?: string;
  tags: string[];
  content: string[];
  blocks: InsightContentBlock[];
  introduction: string;
  relatedPosts: string[];
  seoTitle: string;
  seoDescription: string;
  sources?: InsightArticleSource[];
  faq?: InsightFaqItem[];
};
