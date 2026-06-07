import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("ko");

export default function KoreanArticlesPage() {
  return <InsightsPage pageLocale="ko" />;
}
