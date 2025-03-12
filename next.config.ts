import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/original/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
//(https://image.tmdb.org/t/p/original/q0bCG4NX32iIEsRFZqRtuvzNCyZ.jpg
