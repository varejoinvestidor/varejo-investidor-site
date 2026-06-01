import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("ar");

export default function ArabicGlobalInsightsPage() {
  return <InsightsPage pageLocale="ar" />;
}
