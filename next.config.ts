import type { NextConfig } from "next";
import { PT_PATHS_OUTSIDE_PT } from "./src/lib/i18n/routes";

// Sent on every page. No script-source rules yet (inline JSON-LD, Vercel
// Analytics and the visitor tracker would need allow-listing first); these
// directives only stop other sites framing the pages, <base> hijacking,
// plugins, and forms posting to plain http.
const SECURITY_HEADERS = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
    { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self' https:; upgrade-insecure-requests" },
];

// The page language for crawlers (Bing reads it), matching <html lang>
// (lib/i18n/routes.ts htmlLangFor). Later rules win, so pt-AO comes last.
const LANGUAGE_HEADERS = [
    { source: "/:path*", headers: [{ key: "Content-Language", value: "en-GB" }] },
    { source: "/pt", headers: [{ key: "Content-Language", value: "pt-PT" }] },
    { source: "/pt/:path*", headers: [{ key: "Content-Language", value: "pt-PT" }] },
    ...PT_PATHS_OUTSIDE_PT.map((source) => ({ source, headers: [{ key: "Content-Language", value: "pt-PT" }] })),
    { source: "/pt/angola", headers: [{ key: "Content-Language", value: "pt-AO" }] },
];

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
    // /solutions has no index page (only sub-pages); send visitors and
    // crawlers to the main services page.
    // Marketing assets (LinkedIn graphics) are fetched cross-origin by the
    // LinkedIn composer when we attach them to posts.
    async headers() {
        return [
            { source: "/:path*", headers: SECURITY_HEADERS },
            ...LANGUAGE_HEADERS,
            {
                source: "/marketing/:path*",
                headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
            },
        ];
    },
    async redirects() {
        return [
            { source: "/solutions", destination: "/solutions/devServices", permanent: true },
            // Old addresses Google still asks for (Search Console: Not found).
            { source: "/home", destination: "/", permanent: true },
            { source: "/homepage", destination: "/", permanent: true },
            { source: "/messaging", destination: "/crm", permanent: true },
            // One address for the site: Search Console was counting
            // https://autisync.com/ and https://www.autisync.com/ as two
            // pages, splitting what Google knows between them.
            { source: "/:path*", has: [{ type: "host", value: "autisync.com" }], destination: "https://www.autisync.com/:path*", permanent: true },
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