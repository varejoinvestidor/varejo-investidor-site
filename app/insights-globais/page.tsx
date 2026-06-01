import { InsightsPage } from "../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("pt");

export default function InsightsGlobaisPage() {
  return <InsightsPage pageLocale="pt" />;
}
