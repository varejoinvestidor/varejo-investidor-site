import { Suspense } from "react";
import { ArticleListFilters } from "../../../../src/publisher/admin/ArticleListFilters";
import { ArticleListTable } from "../../../../src/publisher/admin/ArticleListTable";
import { listArticles } from "../../../../src/publisher/articles/actions";
import type { ArticleStatus } from "../../../../src/publisher/types";
import { getPublisherSession } from "../../../../src/publisher/supabase/server";
import { listCategories } from "../../../../src/publisher/taxonomy/actions";
import { ArticleBannersBackfillButton } from "../../../../src/publisher/admin/ArticleBannersBackfillButton";

type Props = {
  searchParams?: {
    status?: string;
    q?: string;
    language?: string;
    category?: string;
    sort?: string;
  };
};

export default async function AdminArtigosPage({ searchParams }: Props) {
  const status = searchParams?.status as ArticleStatus | undefined;
  const sort = searchParams?.sort as "updated" | "views" | "published" | undefined;

  const [{ profile }, categoriesResult, result] = await Promise.all([
    getPublisherSession(),
    listCategories(),
    listArticles({
      status: status && status.length ? status : undefined,
      q: searchParams?.q,
      language: searchParams?.language || undefined,
      category_id: searchParams?.category || undefined,
      sort: sort && ["updated", "views", "published"].includes(sort) ? sort : "updated",
    }),
  ]);

  if (!result.ok) {
    return <p className="text-sm text-fall">{result.error}</p>;
  }

  const items = result.data ?? [];
  const categories =
    categoriesResult.ok && categoriesResult.data
      ? categoriesResult.data.map((c) => ({ id: c.id, name_pt: c.name_pt }))
      : [];

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h2 className="font-serif text-3xl tracking-tight text-paper">Artigos</h2>
        <p className="mt-2 text-sm text-paper/55">
          {items.length} registro(s). Vídeos de capa: camadas 16:9 e 9:16 no editor de cada artigo.
        </p>
      </div>

      <Suspense fallback={null}>
        <ArticleListFilters categories={categories} />
      </Suspense>

      {profile?.role === "admin" ? <ArticleBannersBackfillButton /> : null}

      <div className="overflow-x-auto rounded-xl border border-line/12">
        <ArticleListTable items={items} isAdmin={profile?.role === "admin"} />
      </div>
    </div>
  );
}
