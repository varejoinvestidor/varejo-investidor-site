import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("id");

export default function IndonesianInsightsPage() {
  return <InsightsPage pageLocale="id" />;
}
