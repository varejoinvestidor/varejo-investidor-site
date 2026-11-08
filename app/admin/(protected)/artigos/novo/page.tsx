import { redirect } from "next/navigation";
import { createDraftArticle } from "../../../../../src/publisher/articles/actions";

export default async function AdminNovoArtigoPage() {
  const result = await createDraftArticle("pt");

  if (result.ok && result.data) {
    redirect(`/admin/artigos/${result.data.id}`);
  }

  return (
    <div className="mx-auto max-w-lg rounded-lg border border-fall/30 bg-fall/5 p-6 text-sm text-paper/80">
      <p className="font-medium text-paper">Não foi possível criar o rascunho</p>
      <p className="mt-2">{result.ok ? "Erro desconhecido." : result.error}</p>
      <p className="mt-4 text-paper/55">Verifique Supabase, migration e sessão em /admin/login.</p>
    </div>
  );
}
