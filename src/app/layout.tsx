import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const BASE_URL = "https://www.autisync.com";

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: "Autisync — Creative Digital Agency | UK, Portugal, Namibia & Angola",
        template: "%s | Autisync",
    },
    manifest: "/site.webmanifest",
    description:
        "Autisync is a creative digital agency offering web development, graphic design, social media management, IT support, e-commerce setup, and email marketing across the UK, Portugal, Namibia, and Angola.",
    keywords: [
        "digital agency", "web development", "graphic design", "IT support",
        "social media management", "e-commerce", "email marketing", "AI automation",
        "Autisync", "UK digital agency", "Portugal digital agency", "Angola tech",
        "Namibia digital agency", "CRM setup", "brand identity",
    ],
    authors: [{ name: "Autisync", url: BASE_URL }],
    creator: "Autisync",
    publisher: "Autisync",
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
        type: "website",
        locale: "en_GB",
        url: BASE_URL,
        siteName: "Autisync",
        title: "Autisync — Creative Digital Agency",
        description:
            "Web development, graphic design, IT support, and digital marketing across the UK, Portugal, Namibia & Angola.",
        images: [
            {
                url: "/og-image.png",        // create a 1200×630 branded image and place in /public
                width: 1200,
                height: 630,
                alt: "Autisync — Creative Digital Agency",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Autisync — Creative Digital Agency",
        description:
            "Web development, graphic design, IT support & digital marketing. UK · Portugal · Namibia · Angola.",
        images: ["/og-image.png"],
        creator: "@autisync",           // update if handle differs
    },
    alternates: {
        canonical: BASE_URL,
    },
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
            { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
        ],
        apple: "/apple-touch-icon.png",
    },
    // verification: {
    //     google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
    //     // bing: "REPLACE_WITH_BING_TOKEN",  // uncomment when ready
    // },
};

// Organisation JSON-LD schema — appears on every page
const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Autisync",
    url: BASE_URL,
    logo: `${BASE_URL}/Autisync.svg`,
    description:
        "Creative digital agency offering web development, graphic design, IT support, and digital marketing.",
    foundingDate: "2021",
    contactPoint: [
        {
            "@type": "ContactPoint",
            telephone: "+447883317646",
            contactType: "customer service",
            areaServed: ["GB", "PT", "NA", "AO"],
            availableLanguage: ["English", "Portuguese"],
        },
    ],
    address: {
        "@type": "PostalAddress",
        addressCountry: "GB",
    },
    sameAs: [
        "https://www.facebook.com/autisync",
        "https://www.instagram.com/autisync__/",
        "https://www.linkedin.com/company/autisync",
        "https://www.behance.net/autisync",
    ],
    areaServed: [
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "Portugal" },
        { "@type": "Country", name: "Namibia" },
        { "@type": "Country", name: "Angola" },
    ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <Analytics />
        {children}
        <Script
            src="https://beta.leadconnectorhq.com/loader.js"
            data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
            data-widget-id="69247f4a20fcaad59b0ea302"
            strategy="afterInteractive"
        />
        </body>
        </html>
    );
}