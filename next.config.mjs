/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // PPR(Partial Prerendering)은 canary 채널에서만 동작하므로 기본은 끔
    // ppr: 'incremental',
  },
};

export default nextConfig;
