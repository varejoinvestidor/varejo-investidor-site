import type { PublisherRole } from "./types";

export const ROLE_LABELS: Record<PublisherRole, string> = {
  admin: "Administrador",
  editor: "Editor",
  author: "Autor",
  reviewer: "Revisor",
};

export function canPublish(role: PublisherRole) {
  return role === "admin" || role === "editor";
}

export function canManageUsers(role: PublisherRole) {
  return role === "admin";
}

export function canManageTaxonomy(role: PublisherRole) {
  return role === "admin" || role === "editor";
}

export function canEditArticle(role: PublisherRole, authorId: string | null, userId: string) {
  if (role === "admin" || role === "editor" || role === "reviewer") return true;
  if (role === "author") return authorId === userId;
  return false;
}
