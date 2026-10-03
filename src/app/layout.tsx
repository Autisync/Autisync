import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import React from "react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const BASE_URL = "https://www.autisync.com";

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: "Autisync — Web Design, Branding & Digital Agency | Angola · UK · Portugal",
        template: "%s | Autisync",
    },
    manifest: "/site.webmanifest",
    description:
        "Autisync is a digital agency building websites, brand identities, social media and AI automation for businesses in Angola, Namibia, the UK and Portugal. Websites from Kz 495.000 / £1,490.",
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
    verification: {
        // google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
        // bing: "REPLACE_WITH_BING_TOKEN",  // uncomment when ready
        other: {
            // Proves to Meta that this portfolio owns autisync.com. It has to
            // stay: the Autisync CRM app points its Privacy Policy, Terms and
            // Data Deletion URLs at this domain, and Business Verification
            // checks the website against the company record. Removing the tag
            // un-verifies the domain.
            "facebook-domain-verification": "yz8uskotx7zglfbl0nqgp7wu1bg510",
        },
    },
};

// Organisation JSON-LD schema — appears on every page
const orgSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${BASE_URL}/#organization`,
    name: "Autisync",
    alternateName: "AutiSync",
    // The registered entity behind the trading name. Meta's business
    // verification looks for the razão social on the site; structured data is
    // the machine-readable half of the footer line that carries it.
    legalName: "Maheldom Consulting, Lda",
    taxID: "5003472418",
    url: BASE_URL,
    logo: `${BASE_URL}/Autisync.svg`,
    description:
        "Digital agency building websites, brand identities, social media management and AI automation for service businesses in Angola, Namibia, the United Kingdom and Portugal.",
    foundingDate: "2021",
    email: "info@autisync.com",
    telephone: "+244927114400",
    priceRange: "Kz 150.000 – Kz 2.500.000",
    image: `${BASE_URL}/og-image.png`,
    knowsAbout: [
        "Web design", "Web development", "Brand identity", "Logo design",
        "Social media management", "Search engine optimisation", "CRM setup",
        "AI automation", "IT support",
    ],
    contactPoint: [
        {
            "@type": "ContactPoint",
            telephone: "+244927114400",
            contactType: "sales",
            areaServed: ["AO", "NA"],
            availableLanguage: ["Portuguese", "English"],
        },
        {
            "@type": "ContactPoint",
            telephone: "+447883317646",
            contactType: "sales",
            areaServed: ["GB", "PT"],
            availableLanguage: ["English", "Portuguese"],
        },
    ],
    // Registered office, as printed in the footer.
    address: {
        "@type": "PostalAddress",
        addressLocality: "Talatona, Luanda",
        addressCountry: "AO",
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

// WebSite schema — ties pages to the organisation for search and AI answers
const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Autisync",
    inLanguage: "en",
    publisher: { "@id": `${BASE_URL}/#organization` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Analytics />
        {children}

        </body>
        </html>
    );
}