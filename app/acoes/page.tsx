import { MarketPage } from "../../src/components/MarketPage";
import { createMarketMetadata } from "../../src/data/marketMetadata";

export const metadata = createMarketMetadata("acoes");

export default function AcoesPage() {
  return <MarketPage slug="acoes" />;
}
