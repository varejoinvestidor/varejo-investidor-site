import { InsightsPage } from "../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("en");

export default function GlobalInsightsPage() {
  return <InsightsPage pageLocale="en" />;
}
