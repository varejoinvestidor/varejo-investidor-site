import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("ur");

export default function UrduInsightsPage() {
  return <InsightsPage pageLocale="ur" />;
}
