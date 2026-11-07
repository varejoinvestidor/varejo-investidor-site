import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Research | Varejo Investidor",
  description: "Elite Research: global market structure, WhatsApp delivery, and subscriptions via Stripe or Lastlink.",
};

export default function SignalsLayout({ children }: { children: ReactNode }) {
  return children;
}
