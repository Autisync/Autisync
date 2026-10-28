import type { Metadata } from "next";
import EstateAgents from "./EstateAgents";
import { ESTATE_COPY } from "./estateCopy";
import { agencyPlans } from "@/lib/estate-agency-plans";


const URL = "https://www.autisync.com/crm/estate-agents";
const TITLE = "Estate Agency CRM with AI Viewings | Autisync";
const DESCRIPTION =
    "CRM for UK estate and letting agents: sales, lettings and property management, viewings that book themselves, Rightmove and OnTheMarket feeds, and an AI assistant that answers enquiries out of hours. From £69 a month per agency, not per user.";

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    keywords: ["estate agency CRM", "letting agent software", "estate agent software UK", "property CRM", "viewing booking software", "AI for estate agents", "property management software UK", "lettings management software", "landlord statements software", "Rightmove feed CRM", "Apex27 alternative", "Reapit alternative", "Alto alternative"],
    alternates: { canonical: URL, languages: { en: URL, pt: "https://www.autisync.com/crm/imobiliarias", "x-default": URL } },
    openGraph: {
        type: "website", url: URL, siteName: "Autisync", title: TITLE, description: DESCRIPTION, locale: "en_GB",
        images: [{ url: "/crm/estate/og-estate.png", width: 1200, height: 630, alt: "Autisync CRM for estate and letting agents" }],
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/crm/estate/og-estate.png"] },
};

function structuredData() {
    const offers = agencyPlans.map((p) => ({
        "@type": "Offer",
        name: `Autisync for Agencies — ${p.name}`,
        price: p.price.GBP,
        priceCurrency: "GBP",
        priceSpecification: { "@type": "UnitPriceSpecification", price: p.price.GBP, priceCurrency: "GBP", unitText: p.perBranch ? "month per branch" : "month", valueAddedTaxIncluded: false },
        url: `${URL}#prices`,
    }));
    return [
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Autisync CRM for Estate & Letting Agents",
            applicationCategory: "BusinessApplication",
            applicationSubCategory: "Real estate CRM",
            operatingSystem: "Web, iOS, Android (browser)",
            url: URL,
            description: DESCRIPTION,
            inLanguage: ["en", "pt", "es", "fr", "de"],
            areaServed: ["GB"],
            publisher: { "@type": "Organization", name: "Autisync", url: "https://www.autisync.com" },
            offers: { "@type": "AggregateOffer", lowPrice: 49, highPrice: 299, priceCurrency: "GBP", offerCount: offers.length, offers },
            featureList: [
                "Property listings with photos, video, map and documents",
                "Viewing booking with reminders and no-show follow-up",
                "AI assistant answering enquiries out of hours",
                "Buyer and tenant matching emails",
                "Website listings feed and API",
                "Rent billing and compliance reminders",
                "Import from Alto, Reapit, Jupix, Street, eGO, Casafari and idealista",
            ],
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: ESTATE_COPY.en.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Autisync", item: "https://www.autisync.com" },
                { "@type": "ListItem", position: 2, name: "CRM", item: "https://www.autisync.com/crm" },
                { "@type": "ListItem", position: 3, name: "Estate agents", item: URL },
            ],
        },
    ];
}

export default function Page() {
    return (
        <div lang="en">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }} />
            <EstateAgents locale="en" />
        </div>
    );
}
