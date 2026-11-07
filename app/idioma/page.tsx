import { Suspense } from "react";
import { LanguageGateScreen } from "../../src/components/LanguageGateScreen";

export default function IdiomaPage() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-[#030303] text-[#f4f0e8]">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Varejo Investidor</p>
        </main>
      }
    >
      <LanguageGateScreen />
    </Suspense>
  );
}
