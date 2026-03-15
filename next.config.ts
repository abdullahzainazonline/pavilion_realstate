import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/isp-proxy/:path*",
        destination: "https://pavilionsquarekl.com/ISP/:path*",
      },
      {
        source: "/media/:path*",
        destination: "https://pavilionsquarekl.com/ISP/media/:path*",
      },
      // Proxy Supabase video through our own domain to avoid CORS/CSP blocks in Next.js
      {
        source: "/supabase-video/:path*",
        destination: "https://kaoljqciecsnafblzmci.supabase.co/storage/v1/object/public/:path*",
      },
    ];
  },
};

export default nextConfig;
