import { notFound } from "next/navigation";
import { InsightPostPage } from "../../../src/components/InsightPostPage";
import { getPost, getPostsByLocale } from "../../../src/data/insightsContent";
import { createInsightPostMetadata } from "../../../src/data/insightsMetadata";

export async function generateStaticParams() {
  return getPostsByLocale("pt").map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return createInsightPostMetadata("pt", params.slug);
}

export default function ArtigoGlobalPostPage({ params }: { params: { slug: string } }) {
  if (!getPost("pt", params.slug)) notFound();
  return <InsightPostPage pageLocale="pt" slug={params.slug} />;
}
