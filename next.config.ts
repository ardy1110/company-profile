import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "kyejfiwsedfkyfnpjcrv.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  serverActions: {
    bodySizeLimit: "2mb", // bisa sesuaikan 5mb, 20mb, dll.
  },
};

export default nextConfig;
