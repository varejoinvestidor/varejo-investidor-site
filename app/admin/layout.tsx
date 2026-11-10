import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "../../src/config/site";
import "./admin.css";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/characters/hero-official-transparent.png",
    apple: "/characters/hero-official-transparent.png",
  },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
