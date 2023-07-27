/** @type {import('next').NextConfig} */
const nextConfig = {
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
