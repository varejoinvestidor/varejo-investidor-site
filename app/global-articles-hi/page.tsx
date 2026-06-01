import { InsightsPage } from "../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("hi");

export default function GlobalArticlesHindiPage() {
  return <InsightsPage pageLocale="hi" />;
}
