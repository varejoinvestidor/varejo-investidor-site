import Link from "next/link";
import { Suspense } from "react";
import { ArticleListFilters } from "../../../../src/publisher/admin/ArticleListFilters";
import { listArticles } from "../../../../src/publisher/articles/actions";
import { STATUS_BADGE, STATUS_LABELS } from "../../../../src/publisher/articles/labels";
import type { ArticleStatus } from "../../../../src/publisher/types";

type Props = {
  searchParams?: { status?: string; q?: string };
};

export default async function AdminArtigosPage({ searchParams }: Props) {
  const status = searchParams?.status as ArticleStatus | undefined;
  const result = await listArticles({
    status: status && status.length ? status : undefined,
    q: searchParams?.q,
  });

  if (!result.ok) {
    return <p className="text-sm text-fall">{result.error}</p>;
  }

  const items = result.data ?? [];

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h2 className="font-serif text-3xl tracking-tight text-paper">Artigos</h2>
        <p className="mt-2 text-sm text-paper/55">{items.length} registro(s)</p>
      </div>

      <Suspense fallback={null}>
        <ArticleListFilters />
      </Suspense>

      <div className="overflow-x-auto rounded-xl border border-line/12">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-line/10 text-xs uppercase tracking-wider text-paper/45">
            <tr>
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Idioma</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Atualizado</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-line/5 hover:bg-paper/[0.02]">
                <td className="px-4 py-3">
                  <Link href={`/admin/artigos/${item.id}`} className="font-medium text-paper hover:text-gold">
                    {item.title}
                  </Link>
                  <p className="text-xs text-paper/40">{item.slug}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded border px-2 py-0.5 text-xs ${STATUS_BADGE[item.status]}`}>
                    {STATUS_LABELS[item.status]}
                  </span>
                </td>
                <td className="px-4 py-3 uppercase text-paper/60">{item.language}</td>
                <td className="px-4 py-3 text-paper/60">{item.category_name ?? "—"}</td>
                <td className="px-4 py-3 text-paper/50">{new Date(item.updated_at).toLocaleString("pt-BR")}</td>
              </tr>
            ))}
            {!items.length ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-paper/50">
                  Nenhum artigo. Crie o primeiro em &quot;Novo artigo&quot;.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
