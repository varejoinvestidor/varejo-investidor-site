"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";
import type { ArticleStatus } from "../types";

const STATUS_OPTIONS: { value: ArticleStatus | ""; label: string }[] = [
  { value: "", label: "Todos" },
  { value: "draft", label: "Rascunho" },
  { value: "review", label: "Revisão" },
  { value: "scheduled", label: "Agendado" },
  { value: "published", label: "Publicado" },
  { value: "archived", label: "Arquivado" },
];

type CategoryOption = { id: string; name_pt: string };

type Props = {
  categories?: CategoryOption[];
};

export function ArticleListFilters({ categories = [] }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams?.get("status") ?? "";
  const q = searchParams?.get("q") ?? "";
  const language = searchParams?.get("language") ?? "";
  const category = searchParams?.get("category") ?? "";
  const sort = searchParams?.get("sort") ?? "updated";

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    const nextStatus = String(form.get("status") ?? "");
    const nextQ = String(form.get("q") ?? "").trim();
    const nextLanguage = String(form.get("language") ?? "");
    const nextCategory = String(form.get("category") ?? "");
    const nextSort = String(form.get("sort") ?? "updated");
    if (nextStatus) params.set("status", nextStatus);
    if (nextQ) params.set("q", nextQ);
    if (nextLanguage) params.set("language", nextLanguage);
    if (nextCategory) params.set("category", nextCategory);
    if (nextSort && nextSort !== "updated") params.set("sort", nextSort);
    router.push(`/admin/artigos${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-wrap items-end gap-3">
      <div>
        <label className="text-xs uppercase tracking-wider text-paper/45">Status</label>
        <select
          name="status"
          defaultValue={status}
          className="mt-1 block rounded border border-line/20 bg-[#0a0a0a] px-3 py-2 text-sm"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.label} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs uppercase tracking-wider text-paper/45">Idioma</label>
        <select
          name="language"
          defaultValue={language}
          className="mt-1 block rounded border border-line/20 bg-[#0a0a0a] px-3 py-2 text-sm"
        >
          <option value="">Todos</option>
          <option value="pt">PT</option>
          <option value="en">EN</option>
        </select>
      </div>
      {categories.length ? (
        <div>
          <label className="text-xs uppercase tracking-wider text-paper/45">Categoria</label>
          <select
            name="category"
            defaultValue={category}
            className="mt-1 block max-w-[180px] rounded border border-line/20 bg-[#0a0a0a] px-3 py-2 text-sm"
          >
            <option value="">Todas</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name_pt}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      <div>
        <label className="text-xs uppercase tracking-wider text-paper/45">Ordenar</label>
        <select
          name="sort"
          defaultValue={sort}
          className="mt-1 block rounded border border-line/20 bg-[#0a0a0a] px-3 py-2 text-sm"
        >
          <option value="updated">Última edição</option>
          <option value="published">Publicação</option>
          <option value="views">Visualizações</option>
        </select>
      </div>
      <div className="min-w-[200px] flex-1">
        <label className="text-xs uppercase tracking-wider text-paper/45">Busca</label>
        <input
          name="q"
          defaultValue={q}
          placeholder="Título ou slug"
          className="mt-1 w-full rounded border border-line/20 bg-[#0a0a0a] px-3 py-2 text-sm"
        />
      </div>
      <button type="submit" className="rounded bg-gold px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink">
        Filtrar
      </button>
      <Link href="/admin/artigos/novo" className="rounded border border-line/25 px-4 py-2 text-xs font-bold uppercase tracking-wider">
        Novo artigo
      </Link>
    </form>
  );
}
