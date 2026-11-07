import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("he");

export default function HebrewGlobalArticlesPage() {
  return <InsightsPage pageLocale="he" />;
}
