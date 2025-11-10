// next.config.js

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true, // Twoja istniejąca opcja pozostaje bez zmian

  // DODANA SEKCJA: Konfiguracja dla next/image
  // Pozwala na ładowanie obrazów z zewnętrznego hosta, w tym przypadku z CDN Sanity.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
