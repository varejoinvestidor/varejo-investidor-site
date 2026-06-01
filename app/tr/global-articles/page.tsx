import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("tr");

export default function TurkishGlobalArticlesPage() {
  return <InsightsPage pageLocale="tr" />;
}
