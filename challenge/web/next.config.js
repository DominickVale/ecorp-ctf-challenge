/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/api/**',
      },
    ],
  },
  experimental: {
    mdxRs: true,
  },
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
}

const withMDX = require('@next/mdx')({
  options: {
    providerImportSource: '@mdx-js/react',
  }
})
module.exports = withMDX(nextConfig)
