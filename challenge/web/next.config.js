/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "randomuser.me",
                pathname: "/api/**",
            },
        ],
    },
    experimental: {
        mdxRs: true,
    },
    output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.glsl/,
            type: "asset/source",
        });
        return config;
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
};

const withMDX = require("@next/mdx")({
    options: {
        providerImportSource: "@mdx-js/react",
    },
});
module.exports = withMDX(nextConfig);
