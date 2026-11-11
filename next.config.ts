import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackPluginRuntimeStrategy: "workerThreads",
  },
  // The root path sends visitors to a language once: French when the browser
  // asks for French first, English otherwise. /en and /fr never redirect, so
  // a language the visitor picked is never overridden.
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "header", key: "accept-language", value: "fr.*" }],
        destination: "/fr",
        permanent: false,
      },
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
