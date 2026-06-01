import { InsightsPage } from "../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("pt");

export default function ArtigosGlobaisPage() {
  return <InsightsPage pageLocale="pt" />;
}
