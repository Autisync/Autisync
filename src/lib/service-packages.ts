/**
 * Branding, social-media and bundle packages — the single source of truth
 * for /servicepackage. Website tiers live in ./website-packages.ts.
 *
 * Prices set Oct 2026 (~£1 = Kz 1,248). UK figures sit inside published
 * 2026 UK ranges (branding: logo £500–3k, logo + guidelines £1.5–5k;
 * social: entry £200–500/mo, mid £600–1.2k/mo, premium £1.5k+/mo).
 * Kz figures are scaled to our website prices — test on real proposals and
 * review every 6 months because of kwanza inflation.
 */
import type { Currency } from "./website-packages";

export type ServiceTier = {
    id: string;
    name: string;
    description: string;
    price: Record<Currency, number>;
    /** Shown under the price, e.g. delivery time or minimum term. */
    detail: string;
    features: string[];
    mostPopular?: boolean;
};

export const brandingTiers: ServiceTier[] = [
    {
        id: "branding-essentials",
        name: "Essentials",
        description: "A professional logo and the basics to start trading with confidence.",
        price: { AOA: 180_000, GBP: 490, EUR: 560 },
        detail: "one-off · delivered in ~10 days",
        features: [
            "Logo design — 2 concepts, 3 revision rounds",
            "Colour palette & fonts",
            "Business card design + 100 printed",
            "Company stamp",
            "Social profile kit (profile picture + cover)",
            "All file formats (SVG, PNG, PDF)",
        ],
    },
    {
        id: "branding-identity",
        name: "Identity",
        description: "A complete, consistent brand your team can use everywhere.",
        price: { AOA: 450_000, GBP: 1_450, EUR: 1_650 },
        detail: "one-off · delivered in ~21 days",
        features: [
            "Everything in Essentials",
            "Brand guidelines (12 pages)",
            "Letterhead, envelopes & email signature",
            "Word document templates",
            "Employee ID card design",
            "300 printed business cards",
            "6 branded social post templates",
        ],
        mostPopular: true,
    },
    {
        id: "branding-corporate",
        name: "Corporate",
        description: "Full corporate identity for established companies, sites and fleets.",
        price: { AOA: 1_200_000, GBP: 3_900, EUR: 4_500 },
        detail: "one-off · delivered in ~35 days",
        features: [
            "Everything in Identity",
            "Full brand manual",
            "Company profile design (9 pages)",
            "Presentation template & folder",
            "Rollup / exhibition stand design",
            "Uniform, PPE & vehicle graphics",
            "6 digital signatures",
            "6 printed employee cards",
            "600 printed business cards",
        ],
    },
];

export const socialTiers: ServiceTier[] = [
    {
        id: "social-essential",
        name: "Essential",
        description: "A consistent, professional presence on the platforms that matter.",
        price: { AOA: 150_000, GBP: 450, EUR: 520 },
        detail: "per month · 3-month minimum",
        features: [
            "12 posts / month, including 4 reels",
            "2 platforms",
            "Captions, hashtags & scheduling",
            "Monthly performance report",
        ],
    },
    {
        id: "social-growth",
        name: "Growth",
        description: "More video, paid reach and a team answering your audience.",
        price: { AOA: 280_000, GBP: 850, EUR: 980 },
        detail: "per month · 3-month minimum",
        features: [
            "16 posts / month, including 8 reels",
            "3 platforms (including LinkedIn)",
            "Paid ads management*",
            "Comment & DM replies on weekdays",
            "Monthly report + review call",
        ],
        mostPopular: true,
    },
    {
        id: "social-premium",
        name: "Premium",
        description: "Full-service content and campaigns built to bring in leads.",
        price: { AOA: 480_000, GBP: 1_600, EUR: 1_850 },
        detail: "per month · 3-month minimum",
        features: [
            "20 posts / month, including 12 reels",
            "1 on-site filming day per month",
            "Up to 4 platforms",
            "Paid ads + campaign strategy*",
            "Leads sent straight into your CRM",
            "Quarterly strategy session",
        ],
    },
];

/** Shown under the social tiers. */
export const socialTerms =
    "*Ad spend is paid by you directly to the platform and is not included in the monthly fee. All social plans have a 3-month minimum term.";

/**
 * The headline offer: Branding Identity + Small Business website.
 * Bought separately: Kz 1.400.000 / £4,400 / €5.040.
 */
export const launchBundle = {
    id: "launch-bundle",
    name: "Brand & Website Launch",
    tagline: "Look like the company you’re becoming — in 30 days.",
    description:
        "Your complete brand identity and a 10-page professional website, designed together so everything matches from day one. Tender-ready, bilingual on request.",
    price: { AOA: 1_250_000, GBP: 3_950, EUR: 4_490 } as Record<Currency, number>,
    separately: { AOA: 1_400_000, GBP: 4_400, EUR: 5_040 } as Record<Currency, number>,
    features: [
        "Branding Identity package (logo, guidelines, stationery, 300 cards)",
        "Small Business website (10 pages, SEO, domain & hosting 1st year)",
        "Business email accounts set up",
        "Social profiles set up with your new branding",
        "50% to start, 50% only when you’re happy with it live",
    ],
};
