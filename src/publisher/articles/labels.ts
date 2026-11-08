import type { ArticleStatus } from "../types";

export const STATUS_LABELS: Record<ArticleStatus, string> = {
  draft: "Rascunho",
  review: "Em revisão",
  scheduled: "Agendado",
  published: "Publicado",
  archived: "Arquivado",
};

export const STATUS_BADGE: Record<ArticleStatus, string> = {
  draft: "border-line/30 text-paper/70",
  review: "border-gold/40 text-gold",
  scheduled: "border-paper/25 text-paper/80",
  published: "border-rise/40 text-rise",
  archived: "border-fall/30 text-paper/50",
};
