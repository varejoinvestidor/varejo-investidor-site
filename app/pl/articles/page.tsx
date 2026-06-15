import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("pl");

export default function PLArticlesPage() {
  return <InsightsPage pageLocale="pl" />;
}
