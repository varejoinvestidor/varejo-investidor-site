import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("it");

export default function ItalianArticlesPage() {
  return <InsightsPage pageLocale="it" />;
}
