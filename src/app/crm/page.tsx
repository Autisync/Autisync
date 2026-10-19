import type { Metadata } from "next";
import CrmLanding from "./CrmLanding";

// The page itself (copy, layout, fonts) lives in CrmLanding.tsx, shared with
// the Portuguese twin at /pt/crm (src/app/(standalone)/pt/crm/page.tsx).

const URL = "https://www.autisync.com/crm";
const PT_URL = "https://www.autisync.com/pt/crm";
const TITLE = "Autisync CRM: All your clients in one dashboard";
const DESCRIPTION =
    "The Autisync CRM brings your contacts, leads and sales pipeline into one place, with automated follow-ups. Set up for your business by Autisync. Book a discovery call.";

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: URL, languages: { en: URL, pt: PT_URL, "x-default": URL } },
    openGraph: {
        type: "website",
        url: URL,
        siteName: "Autisync",
        title: TITLE,
        description: DESCRIPTION,
        images: [{ url: "/crm/og-crm.png", width: 1200, height: 630, alt: "Autisync CRM: All your clients. One dashboard." }],
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        images: ["/crm/og-crm.png"],
    },
};

const productSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Autisync CRM",
    serviceType: "Customer relationship management setup",
    provider: { "@type": "Organization", name: "Autisync", url: "https://www.autisync.com" },
    areaServed: ["GB", "PT", "NA", "AO"],
    url: URL,
    description: DESCRIPTION,
};

export default function CrmLandingPage() {
    return <CrmLanding lang="en" schema={productSchema} />;
}
