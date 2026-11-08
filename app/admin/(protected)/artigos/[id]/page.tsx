import { notFound } from "next/navigation";
import { getArticle } from "../../../../../src/publisher/articles/actions";
import { ArticleEditorWorkspace } from "../../../../../src/publisher/editor/ArticleEditorWorkspace";
import { getPublisherSession } from "../../../../../src/publisher/supabase/server";
import { listCategories, listTags } from "../../../../../src/publisher/taxonomy/actions";

type Props = {
  params: { id: string };
};

export default async function AdminEditArticlePage({ params }: Props) {
  const [articleResult, categoriesRes, tagsRes, session] = await Promise.all([
    getArticle(params.id),
    listCategories(),
    listTags(),
    getPublisherSession(),
  ]);

  if (!articleResult.ok || !articleResult.data) {
    if (articleResult.ok === false && articleResult.error === "Artigo não encontrado.") notFound();
    return <p className="text-fall">{articleResult.ok ? "Erro" : articleResult.error}</p>;
  }

  const data = articleResult.data;

  if (!session.profile) notFound();

  const categories = categoriesRes.ok ? categoriesRes.data : [];
  const tags = tagsRes.ok ? tagsRes.data : [];

  return <ArticleEditorWorkspace initial={data} categories={categories} tags={tags} profile={session.profile} />;
}
