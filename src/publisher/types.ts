export type PublisherRole = "admin" | "editor" | "author" | "reviewer";

export type ArticleStatus = "draft" | "review" | "scheduled" | "published" | "archived";

export type ArticleSource = "publisher" | "legacy_import" | "legacy_generated";

export type PublisherProfile = {
  id: string;
  email: string;
  full_name: string | null;
  role: PublisherRole;
  avatar_url: string | null;
};

export type DashboardCounts = {
  published: number;
  draft: number;
  review: number;
  scheduled: number;
};
