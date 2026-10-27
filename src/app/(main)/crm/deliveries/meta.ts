import type { Metadata } from "next";
import { deliveryPlans } from "@/lib/crm-pricing";
import { DELIVERIES, type DeliveriesLocale } from "./copy";

const BASE = "https://www.autisync.com";

export function deliveriesMetadata(locale: DeliveriesLocale): Metadata {
    const c = DELIVERIES[locale];
    const url = `${BASE}/crm/${c.slug}`;
    const en = `${BASE}/crm/deliveries`;
    const pt = `${BASE}/crm/entregas`;
    return {
        title: { absolute: c.metaTitle },
        description: c.metaDesc,
        keywords: c.keywords,
        alternates: { canonical: url, languages: { en, pt, "x-default": en } },
        openGraph: { type: "website", url, siteName: "Autisync", title: c.metaTitle, description: c.metaDesc, locale: locale === "pt" ? "pt_PT" : "en_GB", images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
        twitter: { card: "summary_large_image", title: c.metaTitle, description: c.metaDesc },
    };
}

export function deliveriesSchema(locale: DeliveriesLocale) {
    const c = DELIVERIES[locale];
    const url = `${BASE}/crm/${c.slug}`;
    const cur = locale === "pt" ? "EUR" : "GBP";
    const prices = deliveryPlans.map((p) => p.price[cur]);
    return [
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: `Autisync ${locale === "pt" ? "Entregas" : "Deliveries"}`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web, iOS, Android (browser)",
            url,
            description: c.metaDesc,
            inLanguage: locale,
            publisher: { "@type": "Organization", name: "Autisync", url: BASE },
            offers: {
                "@type": "AggregateOffer", lowPrice: Math.min(...prices), highPrice: Math.max(...prices), priceCurrency: cur, offerCount: prices.length,
                offers: deliveryPlans.map((p) => ({ "@type": "Offer", name: locale === "pt" ? p.namePt : p.name, price: p.price[cur], priceCurrency: cur, url: `${url}#prices` })),
            },
            featureList: c.feats.map((f) => f.t),
        },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        {
            "@context": "https://schema.org", "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Autisync", item: locale === "pt" ? `${BASE}/pt` : BASE },
                { "@type": "ListItem", position: 2, name: "CRM", item: locale === "pt" ? `${BASE}/pt/crm` : `${BASE}/crm` },
                { "@type": "ListItem", position: 3, name: c.crumb, item: url },
            ],
        },
    ];
}
