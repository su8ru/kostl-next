const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV !== "production",
  runtimeCaching: [
    {
      urlPattern: ({ url }) =>
        url.origin === "https://api.kostl.info" &&
        url.pathname.startsWith("/api/traffic/"),
      handler: "NetworkOnly",
      method: "GET",
    },
    ...runtimeCaching,
  ],
  skipWaiting: true,
});

module.exports = withPWA({
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    externalDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});
