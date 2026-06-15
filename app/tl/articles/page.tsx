import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("tl");

export default function TLArticlesPage() {
  return <InsightsPage pageLocale="tl" />;
}
