import type { MetadataRoute } from "next";

const BASE_URL = "https://www.autisync.com";

// When the pages last really changed. A lastmod of "now" on every request
// tells Google nothing, so it learns to ignore it; a real date gets pages
// recrawled when they change. Bump it when the site's content changes.
const UPDATED = new Date("2026-10-15");

export default function sitemap(): MetadataRoute.Sitemap {
    const now = UPDATED;

    return [
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/pt`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0,
            alternates: { languages: { en: BASE_URL, pt: `${BASE_URL}/pt` } },
        },
        {
            url: `${BASE_URL}/pt/precos`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
            alternates: { languages: { en: `${BASE_URL}/servicepackage`, pt: `${BASE_URL}/pt/precos` } },
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/portfolio`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/crm`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/crm/estate-agents`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
            alternates: { languages: { en: `${BASE_URL}/crm/estate-agents`, pt: `${BASE_URL}/crm/imobiliarias` } },
        },
        {
            url: `${BASE_URL}/crm/imobiliarias`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
            alternates: { languages: { en: `${BASE_URL}/crm/estate-agents`, pt: `${BASE_URL}/crm/imobiliarias` } },
        },
        {
            url: `${BASE_URL}/servicepackage`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/solutions/devServices`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/solutions/graphicDesign`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/solutions/itConsultation`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/solutions/seo`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/pt/sobre`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
            alternates: { languages: { en: `${BASE_URL}/about`, pt: `${BASE_URL}/pt/sobre` } },
        },
        {
            url: `${BASE_URL}/pt/contacto`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.6,
            alternates: { languages: { en: `${BASE_URL}/contact`, pt: `${BASE_URL}/pt/contacto` } },
        },
        {
            url: `${BASE_URL}/pt/portfolio`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
            alternates: { languages: { en: `${BASE_URL}/portfolio`, pt: `${BASE_URL}/pt/portfolio` } },
        },
        {
            url: `${BASE_URL}/pt/servicos/desenvolvimento`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
            alternates: { languages: { en: `${BASE_URL}/solutions/devServices`, pt: `${BASE_URL}/pt/servicos/desenvolvimento` } },
        },
        {
            url: `${BASE_URL}/pt/servicos/design-grafico`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
            alternates: { languages: { en: `${BASE_URL}/solutions/graphicDesign`, pt: `${BASE_URL}/pt/servicos/design-grafico` } },
        },
        {
            url: `${BASE_URL}/pt/servicos/seo-marketing`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
            alternates: { languages: { en: `${BASE_URL}/solutions/seo`, pt: `${BASE_URL}/pt/servicos/seo-marketing` } },
        },
        {
            url: `${BASE_URL}/pt/servicos/consultoria-ti`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
            alternates: { languages: { en: `${BASE_URL}/solutions/itConsultation`, pt: `${BASE_URL}/pt/servicos/consultoria-ti` } },
        },
        {
            url: `${BASE_URL}/PrivacyPolicy`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/TermsofUse`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        // Step-inside websites and the free tools (SEO problem pages).
        ...["/websites/step-inside", "/tools", "/tools/missed-call-cost", "/tools/website-cost"].map((path) => ({
            url: `${BASE_URL}${path}`,
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: path === "/tools" ? 0.6 : 0.8,
        })),
        // Autisync CRM's own legal pages. Meta's App Review fetches these, so
        // they need to be indexable and reachable, not only linked.
        {
            url: `${BASE_URL}/legal/privacy`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/legal/terms`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/legal/data-deletion`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];
}