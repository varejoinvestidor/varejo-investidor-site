import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("id");

export default function IndonesianArticlesPage() {
  return <InsightsPage pageLocale="id" />;
}
