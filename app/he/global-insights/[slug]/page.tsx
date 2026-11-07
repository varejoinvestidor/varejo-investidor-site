import { notFound } from "next/navigation";
import { InsightPostPage } from "../../../../src/components/InsightPostPage";
import { getPost, getPostsByLocale } from "../../../../src/data/insightsContent";
import { createInsightPostMetadata } from "../../../../src/data/insightsMetadata";

export function generateStaticParams() {
  return getPostsByLocale("he").map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return createInsightPostMetadata("he", params.slug);
}

export default function HebrewInsightPostRoute({ params }: { params: { slug: string } }) {
  if (!getPost("he", params.slug)) notFound();
  return <InsightPostPage pageLocale="he" slug={params.slug} />;
}
