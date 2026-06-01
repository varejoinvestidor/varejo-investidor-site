import { InsightsPage } from "../../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("vi");

export default function VietnameseArticlesPage() {
  return <InsightsPage pageLocale="vi" />;
}
