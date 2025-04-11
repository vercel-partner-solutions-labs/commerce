export default {
  experimental: {
    ppr: false,
    inlineCss: true,
    useCache: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zylq-002.dx.commercecloud.salesforce.com",
      },
      {
        protocol: "https",
        hostname: "edge.disstg.commercecloud.salesforce.com",
      },
    ],
  },
};
