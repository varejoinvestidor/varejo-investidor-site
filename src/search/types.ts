export type SiteSearchResult = {
  id: string;
  title: string;
  description: string;
  href: string;
  group: string;
  score: number;
};

export type SiteSearchDocument = {
  id: string;
  title: string;
  description?: string;
  href: string;
  group: string;
  keywords?: string;
  locale?: string;
};
