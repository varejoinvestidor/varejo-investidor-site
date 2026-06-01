import { InsightsPage } from "../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("es");

export default function InsightsGlobalesPage() {
  return <InsightsPage pageLocale="es" />;
}
