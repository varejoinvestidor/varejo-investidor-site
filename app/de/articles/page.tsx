import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("de");

export default function GermanArticlesPage() {
  return <InsightsPage pageLocale="de" />;
}
