import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("tr");

export default function TurkishGlobalInsightsPage() {
  return <InsightsPage pageLocale="tr" />;
}
