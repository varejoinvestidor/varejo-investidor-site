/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ];
  },
};

export default nextConfig;
