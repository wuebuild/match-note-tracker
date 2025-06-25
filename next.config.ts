import type { NextConfig } from "next";

const nextConfig: NextConfig = {/* config options here */
    async redirects() {
        return [
          {
            source: '/auth/login',
            destination: '/404', // Redirect to a 404 page
            permanent: false, // Set to true for permanent redirects
          },
        ];
      },
};

export default nextConfig;
