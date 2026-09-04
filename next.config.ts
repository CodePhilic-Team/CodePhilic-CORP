import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  headers: async () => {
    return [
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/favicon-:size(32x32|16x16).png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/apple-touch-icon.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/#about",
        permanent: false,
      },
      {
        source: "/overview",
        destination: "/#about",
        permanent: false,
      },
      {
        source: "/services",
        destination: "/#services",
        permanent: false,
      },
      {
        source: "/work",
        destination: "/#work",
        permanent: false,
      },
      {
        source: "/projects",
        destination: "/#projects",
        permanent: false,
      },
      {
        source: "/clients",
        destination: "/#clients",
        permanent: false,
      },
      {
        source: "/team",
        destination: "/#team",
        permanent: false,
      },
      {
        source: "/contact",
        destination: "/#contact",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
