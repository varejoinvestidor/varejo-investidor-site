import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("fr");

export default function FrenchArticlesPage() {
  return <InsightsPage pageLocale="fr" />;
}
