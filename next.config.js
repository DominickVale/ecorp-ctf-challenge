/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  output: "standalone",
  options: {
    providerImportSource: '@mdx-js/react',
  },
  compiler: {
    reactRemoveProperties: true,
    removeConsole: true
  },
}

const withMDX = require('@next/mdx')()
module.exports = withMDX(nextConfig)
