/**
 * Shapes for the industry pages under /crm/* and their Portuguese twins.
 * Each industry has its own words file (consultants.ts, legal.ts, ...);
 * shared labels live in labels.ts. Kept out of the client component so the
 * server pages build metadata and structured data from the same text.
 *
 * Screenshots are of the real Autisync CRM, from demo accounts filled with
 * invented businesses (CRM backend: npm run demo:business -- <kind>).
 */
import type { IndustryId } from "@/lib/industry-plans";

export type IndustryLocale = "en" | "pt";
export type ShotKind = "dashboard" | "public" | "bookings" | "inbox" | "client" | "reputation" | "quotes" | "opportunities" | "billing" | "tasks";

export type TourStep = { n: number; shot: ShotKind; t: string; d: string; alt: string };

export type IndustryCopy = {
    id: IndustryId;
    slug: string;
    otherSlug: string;
    crumb: string;
    metaTitle: string;
    metaDesc: string;
    keywords: string[];
    pill: string;
    h1a: string;
    h1b: string;
    lead: string;
    trust: string;
    hero: { n: number; shot: ShotKind; alt: string };
    demoName: string;
    painsTitle: string;
    pains: Array<{ t: string; d: string }>;
    tourTitle: string;
    tourSub: string;
    tour: TourStep[];
    featTitle: string;
    feats: Array<{ t: string; d: string }>;
    faq: Array<{ q: string; a: string }>;
};

export type IndustryPair = Record<IndustryLocale, IndustryCopy>;

/** The screenshot file for a step: public/crm/industries/<id>/<n>-<shot>.webp */
export const shotSrc = (id: IndustryId, n: number, shot: ShotKind) => `/crm/industries/${id}/${n}-${shot}.webp`;
