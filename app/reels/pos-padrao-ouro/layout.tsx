import type { ReactNode } from "react";

export default function ReelLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#07060c] text-[#f7f3eb] antialiased">{children}</div>
  );
}
