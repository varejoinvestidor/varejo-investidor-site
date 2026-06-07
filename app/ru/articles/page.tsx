import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("ru");

export default function RussianArticlesPage() {
  return <InsightsPage pageLocale="ru" />;
}
