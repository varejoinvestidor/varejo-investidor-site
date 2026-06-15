import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("fa");

export default function FAArticlesPage() {
  return <InsightsPage pageLocale="fa" />;
}
