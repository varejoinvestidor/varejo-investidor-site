import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("ja");

export default function JapaneseArticlesPage() {
  return <InsightsPage pageLocale="ja" />;
}
