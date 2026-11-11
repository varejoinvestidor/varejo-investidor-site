import { buildLegacyArticleRedirects } from "./src/i18n/legacyArticleRedirects.mjs";

/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

function supabaseStoragePattern() {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!raw) return null;
  try {
    const host = new URL(raw).hostname;
    return {
      protocol: "https",
      hostname: host,
      pathname: "/storage/v1/object/public/publisher-media/**",
    };
  } catch {
    return null;
  }
}

const supabasePattern = supabaseStoragePattern();

const nextConfig = {
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "@tiptap/react",
      "@tiptap/starter-kit",
      "@tiptap/extension-image",
      "@tiptap/extension-link",
      "@tiptap/extension-table",
      "@supabase/supabase-js",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fxpro-cdn.cloud",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
        pathname: "/**",
      },
      ...(supabasePattern ? [supabasePattern] : []),
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/api/publisher/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
      {
        source: "/api/cron/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/calculadora-de-risco",
        destination: "/ferramentas/calculadora-forex",
        permanent: true,
      },
      {
        source: "/ferramentas/calculadora-de-risco",
        destination: "/ferramentas/calculadora-forex",
        permanent: true,
      },
      {
        source: "/ferramentas/lote-correto-forex",
        destination: "/ferramentas/calculadora-forex",
        permanent: true,
      },
      {
        source: "/artigos-globais",
        destination: "/artigos",
        permanent: true,
      },
      {
        source: "/artigos-globais/:slug",
        destination: "/artigos/:slug",
        permanent: true,
      },
      {
        source: "/artigos-globais/feed.xml",
        destination: "/artigos",
        permanent: true,
      },
      {
        source: "/articulos-globales",
        destination: "/es/artigos",
        permanent: true,
      },
      {
        source: "/articulos-globales/:slug",
        destination: "/es/artigos/:slug",
        permanent: true,
      },
      {
        source: "/global-articles",
        destination: "/en/artigos",
        permanent: true,
      },
      {
        source: "/global-articles/:slug",
        destination: "/en/artigos/:slug",
        permanent: true,
      },
      ...buildLegacyArticleRedirects(),
    ];
  },
};

export default nextConfig;
