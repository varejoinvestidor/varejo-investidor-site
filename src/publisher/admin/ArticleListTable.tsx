"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteArticle, type ArticleListItem } from "../articles/actions";
import { STATUS_BADGE, STATUS_LABELS } from "../articles/labels";
import type { ArticleStatus } from "../types";
import { AdminPasswordDialog } from "./AdminPasswordDialog";

type Props = {
  items: ArticleListItem[];
  isAdmin: boolean;
};

export function ArticleListTable({ items, isAdmin }: Props) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [passwordOpen, setPasswordOpen] = useState(false);

  function requestDelete(id: string) {
    setPendingId(id);
    setPasswordOpen(true);
  }

  async function confirmDelete(password: string) {
    if (!pendingId) return;
    const result = await deleteArticle(pendingId, password);
    if (!result.ok) {
      alert(result.error);
      return;
    }
    setPasswordOpen(false);
    setPendingId(null);
    router.refresh();
  }

  return (
    <>
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-line/10 text-xs font-bold uppercase tracking-wider text-paper/60">
          <tr>
            <th className="px-4 py-3">Título</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Vídeo</th>
            <th className="px-4 py-3">Views</th>
            <th className="px-4 py-3">Idioma</th>
            <th className="px-4 py-3">Categoria</th>
            <th className="px-4 py-3">Autor</th>
            <th className="px-4 py-3">Atualizado</th>
            {isAdmin ? <th className="px-4 py-3 text-right">Ações</th> : null}
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
                <span className={`rounded border px-2 py-0.5 text-xs ${STATUS_BADGE[item.status as ArticleStatus]}`}>
                  {STATUS_LABELS[item.status as ArticleStatus]}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="flex flex-wrap gap-1 text-[10px] font-bold uppercase tracking-wider">
                  {item.has_video_horizontal ? (
                    <span className="rounded border border-gold/35 px-1.5 py-0.5 text-gold">16:9</span>
                  ) : null}
                  {item.has_video_vertical ? (
                    <span className="rounded border border-rise/35 px-1.5 py-0.5 text-rise/90">9:16</span>
                  ) : null}
                  {!item.has_video_horizontal && !item.has_video_vertical ? (
                    <span className="text-paper/35">—</span>
                  ) : null}
                </span>
              </td>
              <td className="px-4 py-3 tabular-nums text-paper/70">{item.view_count.toLocaleString("pt-BR")}</td>
              <td className="px-4 py-3 uppercase text-paper/60">{item.language}</td>
              <td className="px-4 py-3 text-paper/60">{item.category_name ?? "—"}</td>
              <td className="px-4 py-3 text-paper/55">{item.author_name ?? "—"}</td>
              <td className="px-4 py-3 text-paper/50">{new Date(item.updated_at).toLocaleString("pt-BR")}</td>
              {isAdmin ? (
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => requestDelete(item.id)}
                    className="text-xs text-fall hover:underline"
                  >
                    Excluir
                  </button>
                </td>
              ) : null}
            </tr>
          ))}
          {!items.length ? (
            <tr>
              <td colSpan={isAdmin ? 9 : 8} className="px-4 py-8 text-center text-paper/50">
                Nenhum artigo encontrado.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>

      <AdminPasswordDialog
        open={passwordOpen}
        title="Excluir artigo"
        description="Esta ação é permanente. Confirme com sua senha de administrador."
        confirmLabel="Excluir"
        onClose={() => {
          setPasswordOpen(false);
          setPendingId(null);
        }}
        onConfirm={confirmDelete}
      />
    </>
  );
}
