import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteAnalytics from "@/app/components/SiteAnalytics";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import Script from "next/script";
import React from "react";
import HtmlLang from "@/app/components/HtmlLang";
import { PT_PATHS_OUTSIDE_PT } from "@/lib/i18n/routes";

// Fonts are self-hosted (src/app/fonts, SIL Open Font License) rather than
// fetched from Google at build time: Google's newer font URLs break the
// Turbopack build on Vercel, and local files also load faster.
const geistSans = localFont({
    src: "./fonts/Geist-Variable.woff2",
    weight: "100 900",
    variable: "--font-geist-sans",
    display: "swap",
});
const geistMono = localFont({
    src: "./fonts/GeistMono-Variable.woff2",
    weight: "100 900",
    variable: "--font-geist-mono",
    display: "swap",
});

const BASE_URL = "https://www.autisync.com";

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: "Autisync — Web Design & Digital Agency | Angola · UK · Portugal",
        template: "%s | Autisync",
    },
    manifest: "/site.webmanifest",
    description:
        "Websites, branding, social media and AI automation for businesses in Angola, Namibia, the UK and Portugal. Websites from Kz 495.000 / £1,490.",
    keywords: [
        "digital agency", "web development", "graphic design", "IT consulting",
        "social media management", "e-commerce", "email marketing", "AI automation",
        "Autisync", "UK digital agency", "Portugal digital agency", "Angola tech",
        "Namibia digital agency", "CRM setup", "brand identity",
    ],
    authors: [{ name: "Autisync", url: BASE_URL }],
    creator: "Autisync",
    publisher: "Autisync",
    // Index and follow are the defaults, so they are not set here: a page
    // that says noindex (the 404 page, the questionnaire) then says only that.
    robots: {
        googleBot: { "max-image-preview": "large" },
    },
    openGraph: {
        type: "website",
        locale: "en_GB",
        url: BASE_URL,
        siteName: "Autisync",
        title: "Autisync — Creative Digital Agency",
        description:
            "Web development, graphic design, IT consulting, and digital marketing across the UK, Portugal, Namibia & Angola.",
        images: [
            {
                url: "/og-image.png",        // create a 1200×630 branded image and place in /public
                width: 1200,
                height: 630,
                alt: "Autisync — Creative Digital Agency",
            },
        ],
    },
    // No title or description here: each page's own Open Graph title and
    // description are used, so Portuguese pages don't inherit English ones.
    twitter: {
        card: "summary_large_image",
        images: ["/og-image.png"],
        creator: "@autisync",           // update if handle differs
    },
    // No canonical here: every page sets its own, and an inherited one would
    // point any page that forgot (and the 404 page) at the home page.
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
        "AI automation", "IT consulting",
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
            telephone: "+447795866571",
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
    // Only profiles that are live: a 404 here makes search engines and AI
    // assistants less sure these pages are one business. Add the LinkedIn
    // company page, Google Business Profile and Clutch listing here (and in
    // the footer) once they exist.
    sameAs: [
        "https://www.facebook.com/autisync",
        "https://www.instagram.com/autisync__/",
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
    inLanguage: ["en-GB", "pt-PT", "pt-AO"],
    publisher: { "@id": `${BASE_URL}/#organization` },
};

// Autisync's own visitor tracker (CRM → Visitors): which pages people open,
// which sections they reach, where they stop, and bookings made. No cookies.
// The privacy policy (/PrivacyPolicy, /pt/privacidade) describes what it
// sends and offers a switch to turn it off; update it if this changes.
// The key is autisync.com's, from Visitors → Tracking. It is public (it sits
// in the page), so it lives here; NEXT_PUBLIC_AUTISYNC_TRACK_KEY overrides it
// and an empty value turns tracking off.
const TRACK_KEY = process.env.NEXT_PUBLIC_AUTISYNC_TRACK_KEY ?? "as_8977a056d170c44dc266d420";
const APP_URL = (process.env.NEXT_PUBLIC_AUTISYNC_APP_URL || "https://app.autisync.com").replace(/\/+$/, "");

// One root layout serves both languages, and reading the path on the server
// would make every page dynamic (no edge cache). So the HTML ships as en-GB
// and this runs before the page paints to set pt-PT / pt-AO on Portuguese
// pages; the same rule (htmlLangFor) sends a Content-Language header from
// next.config.ts, and <HtmlLang /> keeps it right on client navigation.
const langScript = `(function(){try{var p=location.pathname.replace(/\\/+$/,"")||"/";var o=${JSON.stringify(PT_PATHS_OUTSIDE_PT)};var l=(p==="/pt/angola"||p.indexOf("/pt/angola/")===0)?"pt-AO":(p==="/pt"||p.indexOf("/pt/")===0||o.indexOf(p)>-1)?"pt-PT":"";if(l)document.documentElement.lang=l}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en-GB" suppressHydrationWarning>
        <head>
            <script dangerouslySetInnerHTML={{ __html: langScript }} />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Vercel Web Analytics: off for Do Not Track, GPC and the privacy policy's switch. */}
        <SiteAnalytics />
        {TRACK_KEY ? <Script src={`${APP_URL}/t.js`} data-site={TRACK_KEY} strategy="lazyOnload" /> : null}
        <HtmlLang />
        {children}
        {/* "Chat on WhatsApp" on every page, with the page's marker (lib/whatsapp.ts). */}
        <WhatsAppButton />

        </body>
        </html>
    );
}