import { InsightsPage } from "../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../src/data/insightsMetadata";
import "../insights-research.css";

export const metadata = createInsightsMetadata("pt");

export default function ArtigosGlobaisPage() {
  return <InsightsPage pageLocale="pt" />;
}
