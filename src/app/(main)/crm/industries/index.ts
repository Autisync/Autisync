/**
 * The industry pages that exist, in the order they are listed. Clinics links
 * to its own page (/clinics, /pt/clinicas); salons and legal & finance have
 * prices and screenshots ready (lib/industry-plans.ts, public/crm/industries)
 * and get a page once their words are written.
 */
import type { IndustryLocale, IndustryPair } from "./types";
import type { IndustryId } from "@/lib/industry-plans";
import { TRADES } from "./trades";
import { CONSULTANTS } from "./consultants";
import { AGENCIES } from "./agencies";

export const INDUSTRY_PAGES: IndustryPair[] = [TRADES, CONSULTANTS, AGENCIES];

export function industryBySlug(slug: string, locale: IndustryLocale) {
    return INDUSTRY_PAGES.find((p) => p[locale].slug === slug)?.[locale];
}

/** Every industry chip shown on /crm and /pt/crm, with where it links (null = no page yet). */
export const INDUSTRY_CHIPS: Record<IndustryLocale, Array<{ label: string; href: string | null }>> = {
    en: [
        { label: "Clinics", href: "/clinics" },
        { label: "Salons & studios", href: null },
        { label: "Consultants", href: "/crm/consultants" },
        { label: "Legal & finance", href: null },
        { label: "Agencies", href: "/crm/agencies" },
        { label: "Trades & field services", href: "/crm/trades" },
        { label: "Deliveries & logistics", href: "/crm/deliveries" },
    ],
    pt: [
        { label: "Clínicas", href: "/pt/clinicas" },
        { label: "Salões e estúdios", href: null },
        { label: "Consultores", href: "/crm/consultores" },
        { label: "Jurídico e finanças", href: null },
        { label: "Agências", href: "/crm/agencias" },
        { label: "Obras e serviços técnicos", href: "/crm/servicos-tecnicos" },
        { label: "Entregas e logística", href: "/crm/entregas" },
    ],
};

/**
 * Each demo account's website. Where a stand-alone site exists on Vercel
 * (its own GitHub repo, booking into the demo account in the CRM) the page
 * links there; otherwise it links to the site the CRM hosts at
 * app.autisync.com/p/<slug>, built by: npm run demo:business -- <kind>.
 * Screenshots are in public/crm/industries/<id>/site.webp and site-phone.webp.
 */
export const DEMO_SITES: Record<IndustryId, string> = {
    trades: "https://kestrel-demo-site-brown.vercel.app",
    clinics: "https://alvura-demo-site.vercel.app",
    consultants: "https://app.autisync.com/p/harbourline-demo",
    agencies: "https://app.autisync.com/p/northlight-demo",
    salons: "https://app.autisync.com/p/mare-demo",
    legal: "https://app.autisync.com/p/ashcombe-demo",
};
export const demoSiteUrl = (id: IndustryId) => DEMO_SITES[id];
