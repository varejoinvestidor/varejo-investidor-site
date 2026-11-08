"use server";

import { revalidatePath } from "next/cache";
import { canManageTaxonomy } from "../permissions";
import { getPublisherSession } from "../supabase/server";

export type CategoryRow = {
  id: string;
  slug: string;
  name_pt: string;
  name_en: string;
  sort_order: number;
};

export type TagRow = {
  id: string;
  slug: string;
  name: string;
};

async function requireStaff() {
  const { supabase, profile } = await getPublisherSession();
  if (!supabase || !profile) return { error: "Sessão inválida." as const };
  return { supabase, profile };
}

export async function listCategories(): Promise<{ ok: true; data: CategoryRow[] } | { ok: false; error: string }> {
  const ctx = await requireStaff();
  if ("error" in ctx) return { ok: false, error: ctx.error ?? "Sessão inválida." };

  const { data, error } = await ctx.supabase.from("categories").select("*").order("sort_order");
  if (error) return { ok: false, error: error.message };
  return { ok: true, data: (data ?? []) as CategoryRow[] };
}

export async function updateCategory(
  id: string,
  patch: { name_pt?: string; name_en?: string; sort_order?: number },
) {
  const ctx = await requireStaff();
  if ("error" in ctx) return { ok: false as const, error: ctx.error };
  if (!canManageTaxonomy(ctx.profile.role)) return { ok: false as const, error: "Sem permissão." };

  const { error } = await ctx.supabase.from("categories").update(patch).eq("id", id);
  if (error) return { ok: false as const, error: error.message };
  revalidatePath("/admin/categorias");
  return { ok: true as const };
}

export async function listTags() {
  const ctx = await requireStaff();
  if ("error" in ctx) return { ok: false as const, error: ctx.error };

  const { data, error } = await ctx.supabase.from("tags").select("*").order("name");
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, data: (data ?? []) as TagRow[] };
}

export async function createTag(name: string) {
  const ctx = await requireStaff();
  if ("error" in ctx) return { ok: false as const, error: ctx.error };
  if (!canManageTaxonomy(ctx.profile.role)) return { ok: false as const, error: "Sem permissão." };

  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const { error } = await ctx.supabase.from("tags").insert({ name: name.trim(), slug });
  if (error) return { ok: false as const, error: error.message };
  revalidatePath("/admin/tags");
  return { ok: true as const };
}
