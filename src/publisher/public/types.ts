export type PublicArticleSummary = {
  id: string;
  language: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  cover_image: string | null;
  published_at: string;
  updated_at: string;
  featured: boolean;
  category_id: string | null;
  category_slug: string | null;
  category_name: string | null;
  author_name: string | null;
  seo_title: string | null;
  seo_description: string | null;
};

export type PublicArticleDetail = PublicArticleSummary & {
  content: Record<string, unknown>;
  references_text: string | null;
  sources: { label: string; url: string }[];
};
