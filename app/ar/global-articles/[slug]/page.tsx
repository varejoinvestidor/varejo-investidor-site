import { notFound } from "next/navigation";
import { InsightPostPage } from "../../../../src/components/InsightPostPage";
import { getPost, getPostsByLocale } from "../../../../src/data/insightsContent";
import { createInsightPostMetadata } from "../../../../src/data/insightsMetadata";

export async function generateStaticParams() {
  return getPostsByLocale("ar").map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return createInsightPostMetadata("ar", params.slug);
}

export default function ArabicGlobalArticlePostPage({ params }: { params: { slug: string } }) {
  if (!getPost("ar", params.slug)) notFound();
  return <InsightPostPage pageLocale="ar" slug={params.slug} />;
}
