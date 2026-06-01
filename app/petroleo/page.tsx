import { MarketPage } from "../../src/components/MarketPage";
import { createMarketMetadata } from "../../src/data/marketMetadata";

export const metadata = createMarketMetadata("petroleo");

export default function PetroleoPage() {
  return <MarketPage slug="petroleo" />;
}
