import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("bn");

export default function BengaliInsightsPage() {
  return <InsightsPage pageLocale="bn" />;
}
