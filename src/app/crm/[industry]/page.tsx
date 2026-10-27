import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import IndustryCrm from "../industries/IndustryCrm";
import { INDUSTRY_PAGES } from "../industries";
import { shotSrc, type IndustryCopy, type IndustryLocale } from "../industries/types";
import { industryPlans } from "@/lib/industry-plans";

/**
 * Every industry page, English and Portuguese, from one route:
 * /crm/trades and /crm/servicos-tecnicos, /crm/consultants and
 * /crm/consultores, ... Built at deploy time; any other slug is a 404.
 * (/crm/estate-agents and /crm/imobiliarias are their own folders and win.)
 */

const display = localFont({ src: "../../fonts/Outfit-Variable.woff2", weight: "100 900", variable: "--font-crm-display", display: "swap" });
const body = localFont({ src: "../../fonts/DMSans-Variable.woff2", weight: "100 1000", variable: "--font-crm-body", display: "swap" });

const BASE = "https://www.autisync.com";
export const dynamicParams = false;

function find(slug: string): { copy: IndustryCopy; locale: IndustryLocale } | null {
    for (const pair of INDUSTRY_PAGES) {
        if (pair.en.slug === slug) return { copy: pair.en, locale: "en" };
        if (pair.pt.slug === slug) return { copy: pair.pt, locale: "pt" };
    }
    return null;
}

export function generateStaticParams() {
    return INDUSTRY_PAGES.flatMap((p) => [{ industry: p.en.slug }, { industry: p.pt.slug }]);
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
    const { industry } = await params;
    const hit = find(industry);
    if (!hit) return {};
    const { copy, locale } = hit;
    const url = `${BASE}/crm/${copy.slug}`;
    const en = locale === "en" ? url : `${BASE}/crm/${copy.otherSlug}`;
    const pt = locale === "pt" ? url : `${BASE}/crm/${copy.otherSlug}`;
    const image = shotSrc(copy.id, copy.hero.n, copy.hero.shot);
    return {
        title: { absolute: copy.metaTitle },
        description: copy.metaDesc,
        keywords: copy.keywords,
        alternates: { canonical: url, languages: { en, pt, "x-default": en } },
        openGraph: {
            type: "website", url, siteName: "Autisync", title: copy.metaTitle, description: copy.metaDesc,
            locale: locale === "pt" ? "pt_PT" : "en_GB",
            images: [{ url: image, width: 1800, height: 1125, alt: copy.hero.alt }],
        },
        twitter: { card: "summary_large_image", title: copy.metaTitle, description: copy.metaDesc, images: [image] },
    };
}

function structuredData(copy: IndustryCopy, locale: IndustryLocale) {
    const url = `${BASE}/crm/${copy.slug}`;
    const cur = locale === "pt" ? "EUR" : "GBP";
    const plans = industryPlans[copy.id];
    const offers = plans.map((p) => ({
        "@type": "Offer",
        name: `Autisync CRM — ${locale === "pt" ? p.namePt : p.name}`,
        price: p.price[cur],
        priceCurrency: cur,
        priceSpecification: {
            "@type": "UnitPriceSpecification", price: p.price[cur], priceCurrency: cur,
            unitText: p.perSite ? (locale === "pt" ? "mês por espaço" : "month per site") : (locale === "pt" ? "mês" : "month"),
            valueAddedTaxIncluded: false,
        },
        url: `${url}#prices`,
    }));
    const prices = plans.map((p) => p.price[cur]);
    return [
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: `Autisync CRM — ${copy.crumb}`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web, iOS, Android (browser)",
            url,
            description: copy.metaDesc,
            inLanguage: locale,
            areaServed: locale === "pt" ? ["PT"] : ["GB"],
            publisher: { "@type": "Organization", name: "Autisync", url: BASE },
            screenshot: copy.tour.map((t) => `${BASE}${shotSrc(copy.id, t.n, t.shot)}`),
            offers: { "@type": "AggregateOffer", lowPrice: Math.min(...prices), highPrice: Math.max(...prices), priceCurrency: cur, offerCount: offers.length, offers },
            featureList: copy.feats.map((f) => f.t),
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: copy.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Autisync", item: locale === "pt" ? `${BASE}/pt` : BASE },
                { "@type": "ListItem", position: 2, name: "CRM", item: locale === "pt" ? `${BASE}/pt/crm` : `${BASE}/crm` },
                { "@type": "ListItem", position: 3, name: copy.crumb, item: url },
            ],
        },
    ];
}

export default async function Page({ params }: { params: Promise<{ industry: string }> }) {
    const { industry } = await params;
    const hit = find(industry);
    if (!hit) notFound();
    const { copy, locale } = hit;
    return (
        <div className={`${display.variable} ${body.variable}`} lang={locale}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(copy, locale)) }} />
            <IndustryCrm copy={copy} locale={locale} />
        </div>
    );
}
