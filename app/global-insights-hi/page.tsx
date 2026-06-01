import { InsightsPage } from "../../src/components/InsightsPage";
import { createInsightsMetadata } from "../../src/data/insightsMetadata";

export const metadata = createInsightsMetadata("hi");

export default function GlobalInsightsHindiPage() {
  return <InsightsPage pageLocale="hi" />;
}
