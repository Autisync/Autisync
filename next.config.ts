import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.pexels.com",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
    // /solutions has no index page (only sub-pages) but is linked from the
    // sitemap; send visitors and crawlers to the main services page.
    // Marketing assets (LinkedIn graphics) are fetched cross-origin by the
    // LinkedIn composer when we attach them to posts.
    async headers() {
        return [
            {
                source: "/marketing/:path*",
                headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
            },
        ];
    },
    async redirects() {
        return [
            { source: "/solutions", destination: "/solutions/devServices", permanent: false },
        ];
    },
};

export default nextConfig;

// import { withBotId } from 'botid/next/config';
//
// const nextConfig = {
//     images: {
//         remotePatterns: [
//             {
//                 protocol: "https",
//                 hostname: "images.pexels.com",
//             },
//             {
//                 protocol: "https",
//                 hostname: "images.unsplash.com",
//             },
//         ],
//     },
//
// };
//
// export default withBotId(nextConfig);