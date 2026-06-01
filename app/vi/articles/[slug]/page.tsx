import { notFound } from "next/navigation";
import { InsightPostPage } from "../../../../src/components/InsightPostPage";
import { getPost, getPostsByLocale } from "../../../../src/data/insightsContent";
import { createInsightPostMetadata } from "../../../../src/data/insightsMetadata";

export async function generateStaticParams() {
  return getPostsByLocale("vi").map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return createInsightPostMetadata("vi", params.slug);
}

export default function VietnameseArticlePostPage({ params }: { params: { slug: string } }) {
  if (!getPost("vi", params.slug)) notFound();
  return <InsightPostPage pageLocale="vi" slug={params.slug} />;
}
