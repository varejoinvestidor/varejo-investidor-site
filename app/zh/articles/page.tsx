import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("zh");

export default function ChineseArticlesPage() {
  return <InsightsPage pageLocale="zh" />;
}
