import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("th");

export default function ThaiArticlesPage() {
  return <InsightsPage pageLocale="th" />;
}
