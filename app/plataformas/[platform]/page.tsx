import { notFound } from "next/navigation";
import { PlatformPage } from "../../../src/components/PlatformPage";
import { getPlatformContent, platformSlugs } from "../../../src/data/platformContent";

export function generateStaticParams() {
  return platformSlugs.map((platform) => ({ platform }));
}

export function generateMetadata({ params }: { params: { platform: string } }) {
  const content = getPlatformContent("pt", params.platform);
  if (!content) return {};
  return {
    title: `${content.title} | Varejo Investidor`,
    description: content.metaDescription,
  };
}

export default function PlatformPtPage({ params }: { params: { platform: string } }) {
  if (!getPlatformContent("pt", params.platform)) notFound();
  return <PlatformPage pageLocale="pt" slug={params.platform} />;
}
