import { notFound } from "next/navigation";
import { InsightPostPage } from "../../../../src/components/InsightPostPage";
import { getPost, getPostsByLocale } from "../../../../src/data/insightsContent";
import { createInsightPostMetadata } from "../../../../src/data/insightsMetadata";

export function generateStaticParams() {
  return getPostsByLocale("tr").map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return createInsightPostMetadata("tr", params.slug);
}

export default function InsightPostRoute({ params }: { params: { slug: string } }) {
  if (!getPost("tr", params.slug)) notFound();
  return <InsightPostPage pageLocale="tr" slug={params.slug} />;
}
