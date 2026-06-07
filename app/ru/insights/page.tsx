import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("ru");

export default function RussianInsightsPage() {
  return <InsightsPage pageLocale="ru" />;
}
