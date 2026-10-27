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
    ],
    pt: [
        { label: "Clínicas", href: "/pt/clinicas" },
        { label: "Salões e estúdios", href: null },
        { label: "Consultores", href: "/crm/consultores" },
        { label: "Jurídico e finanças", href: null },
        { label: "Agências", href: "/crm/agencias" },
        { label: "Obras e serviços técnicos", href: "/crm/servicos-tecnicos" },
    ],
};

/**
 * Each demo account's website, hosted by the CRM at app.autisync.com/p/<slug>.
 * Built by the CRM backend: npm run demo:business -- <kind> (trades, clinic,
 * dental, salon, consulting, legal, agency). Screenshots of them are in
 * public/crm/industries/<id>/site.webp and site-phone.webp.
 */
export const DEMO_SITES: Record<IndustryId, string> = {
    trades: "kestrel-demo",
    consultants: "harbourline-demo",
    agencies: "northlight-demo",
    clinics: "alvura-demo",
    salons: "mare-demo",
    legal: "ashcombe-demo",
};
export const demoSiteUrl = (id: IndustryId) => `https://app.autisync.com/p/${DEMO_SITES[id]}`;
