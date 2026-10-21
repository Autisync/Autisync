import type { MetadataRoute } from "next";
import { EN_TO_PT } from "@/lib/i18n/routes";

const BASE_URL = "https://www.autisync.com";

// When the pages last really changed. A lastmod of "now" on every request
// tells Google nothing, so it learns to ignore it; a real date gets pages
// recrawled when they change. Bump it when the site's content changes.
const UPDATED = new Date("2026-10-20");

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
            alternates: { languages: { en: `${BASE_URL}/crm`, pt: `${BASE_URL}${EN_TO_PT["/crm"]}` } },
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
        // The website's privacy policy, in English and Portuguese (same text).
        ...["/PrivacyPolicy", "/pt/privacidade"].map((path) => ({
            url: `${BASE_URL}${path}`,
            lastModified: new Date("2026-10-21"),
            changeFrequency: "yearly" as const,
            priority: 0.3,
            alternates: { languages: { en: `${BASE_URL}/PrivacyPolicy`, pt: `${BASE_URL}/pt/privacidade` } },
        })),
        {
            url: `${BASE_URL}/TermsofUse`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        // Step-inside websites and the free tools (SEO problem pages), each
        // with its Portuguese twin.
        ...["/websites/step-inside", "/tools", "/tools/missed-call-cost", "/tools/website-cost", "/book"].flatMap((path) => {
            const languages = { en: `${BASE_URL}${path}`, pt: `${BASE_URL}${EN_TO_PT[path]}` };
            const priority = path === "/tools" ? 0.6 : 0.8;
            return [
                { url: languages.en, lastModified: now, changeFrequency: "monthly" as const, priority, alternates: { languages } },
                { url: languages.pt, lastModified: now, changeFrequency: "monthly" as const, priority, alternates: { languages } },
            ];
        }),
        // The CRM page in Portuguese, and the legal pages' Portuguese twins.
        ...["/crm", "/legal/privacy", "/legal/terms", "/legal/data-deletion"].map((path) => ({
            url: `${BASE_URL}${EN_TO_PT[path]}`,
            lastModified: now,
            changeFrequency: path === "/crm" ? ("monthly" as const) : ("yearly" as const),
            priority: path === "/crm" ? 0.9 : 0.3,
            alternates: { languages: { en: `${BASE_URL}${path}`, pt: `${BASE_URL}${EN_TO_PT[path]}` } },
        })),
        // Niche landing page: clinics, dental practices, aesthetic clinics and
        // salons, in the UK (/clinics) and Portugal (/pt/clinicas).
        ...["/clinics", "/pt/clinicas"].map((path) => ({
            url: `${BASE_URL}${path}`,
            lastModified: new Date("2026-10-21"),
            changeFrequency: "monthly" as const,
            priority: 0.9,
            alternates: { languages: { en: `${BASE_URL}/clinics`, pt: `${BASE_URL}/pt/clinicas` } },
        })),
        // Country landing pages (searches like "criação de sites Angola").
        {
            url: `${BASE_URL}/pt/angola`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/namibia`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        // Autisync CRM's own legal pages. Meta's App Review fetches these, so
        // they need to be indexable and reachable, not only linked.
        {
            url: `${BASE_URL}/legal/privacy`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
            alternates: { languages: { en: `${BASE_URL}/legal/privacy`, pt: `${BASE_URL}${EN_TO_PT["/legal/privacy"]}` } },
        },
        {
            url: `${BASE_URL}/legal/terms`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
            alternates: { languages: { en: `${BASE_URL}/legal/terms`, pt: `${BASE_URL}${EN_TO_PT["/legal/terms"]}` } },
        },
        {
            url: `${BASE_URL}/legal/data-deletion`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
            alternates: { languages: { en: `${BASE_URL}/legal/data-deletion`, pt: `${BASE_URL}${EN_TO_PT["/legal/data-deletion"]}` } },
        },
    ];
}