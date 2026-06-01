import { notFound } from "next/navigation";
import { InsightPostPage } from "../../../../src/components/InsightPostPage";
import { getPost, getPostsByLocale } from "../../../../src/data/insightsContent";
import { createInsightPostMetadata } from "../../../../src/data/insightsMetadata";

export async function generateStaticParams() {
  return getPostsByLocale("id").map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return createInsightPostMetadata("id", params.slug);
}

export default function IndonesianArticlePostPage({ params }: { params: { slug: string } }) {
  if (!getPost("id", params.slug)) notFound();
  return <InsightPostPage pageLocale="id" slug={params.slug} />;
}
