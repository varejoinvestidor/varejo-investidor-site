import { MarketPage } from "../../src/components/MarketPage";
import { createMarketMetadata } from "../../src/data/marketMetadata";

export const metadata = createMarketMetadata("commodities");

export default function CommoditiesPage() {
  return <MarketPage slug="commodities" />;
}
