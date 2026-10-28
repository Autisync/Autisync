import BreadcrumbSchema from "@/app/components/BreadcrumbSchema";
import type { Metadata } from "next";
import CrmLanding from "./CrmLanding";

// The page itself (copy, layout, fonts) lives in CrmLanding.tsx, shared with
// the Portuguese twin at /pt/crm (src/app/(standalone)/pt/crm/page.tsx).

const URL = "https://www.autisync.com/crm";
const PT_URL = "https://www.autisync.com/pt/crm";
const TITLE = "Autisync CRM: All your clients in one dashboard";
const DESCRIPTION =
    "From £29 a month: the Autisync CRM puts contacts, leads and your sales pipeline in one place, with automatic follow-ups, set up for you.";

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
    provider: { "@id": "https://www.autisync.com/#organization" },
    areaServed: ["GB", "PT", "NA", "AO"],
    url: URL,
    description: DESCRIPTION,
};

export default function CrmLandingPage() {
    return (
        <>
            <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "CRM", path: "/crm" }]} />
            <CrmLanding lang="en" schema={productSchema} />
        </>
    );
}
