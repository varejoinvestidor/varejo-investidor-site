import PosPadraoOuroReel from "../../../src/components/reels/PosPadraoOuroReel";

export const metadata = {
  title: "Reels Studio · Pós-padrão-ouro",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams?: { export?: string };
};

export default function PosPadraoOuroReelPage({ searchParams }: PageProps) {
  return <PosPadraoOuroReel exportMode={searchParams?.export === "1"} />;
}
