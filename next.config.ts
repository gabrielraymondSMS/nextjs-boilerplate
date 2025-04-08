import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // i18n: {
  //   locales: ["en", "id"],
  //   defaultLocale: "id",
  //   localeDetection: false, // Mencegah redirect otomatis berdasarkan browser
  // },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true, // Use false if the redirect might change in the future
      },
    ];
  },
};

export default nextConfig;
