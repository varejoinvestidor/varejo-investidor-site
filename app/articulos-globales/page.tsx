import { InsightsPage } from "../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("es");

export default function ArticulosGlobalesPage() {
  return <InsightsPage pageLocale="es" />;
}
