/**
 * Markets — where the visitor is, and therefore which prices they see.
 *
 * Four markets, each with its own currency. The visitor's market is guessed
 * from the browser (time zone first, then language), shown straight away,
 * and confirmed or corrected with one tap on the market chip next to the
 * price switcher. The choice is remembered on that device, and `?market=na`
 * in the URL wins over everything (for a link sent to a Namibian client).
 *
 * Nothing here calls a geolocation service: no third-party request, nothing
 * to disclose, and the guess is right for almost everyone who has their
 * device set to where they live. The chip is there for everyone else.
 */
import type { Currency } from "./website-packages";

export type MarketCode = "AO" | "NA" | "GB" | "PT";

export type Market = {
    code: MarketCode;
    name: string;
    namePt: string;
    currency: Currency;
    flag: string;
    /** Phone shown in the "Call us" button for this market. */
    phone: { display: string; href: string };
    timeZones: string[];
    languages: string[];
};

export const markets: Market[] = [
    {
        code: "AO", name: "Angola", namePt: "Angola", currency: "AOA", flag: "🇦🇴",
        phone: { display: "(+244) 927 114 400", href: "tel:+244927114400" },
        timeZones: ["Africa/Luanda"], languages: ["pt-ao"],
    },
    {
        code: "NA", name: "Namibia", namePt: "Namíbia", currency: "NAD", flag: "🇳🇦",
        phone: { display: "(+264) 927 114 403", href: "tel:+264927114403" },
        timeZones: ["Africa/Windhoek"], languages: ["en-na", "af-na"],
    },
    {
        code: "GB", name: "United Kingdom", namePt: "Reino Unido", currency: "GBP", flag: "🇬🇧",
        phone: { display: "(+44) 788 331 7646", href: "tel:+447883317646" },
        timeZones: ["Europe/London", "Europe/Belfast"], languages: ["en-gb"],
    },
    {
        code: "PT", name: "Portugal", namePt: "Portugal", currency: "EUR", flag: "🇵🇹",
        phone: { display: "(+44) 788 331 7646", href: "tel:+447883317646" },
        timeZones: ["Europe/Lisbon", "Atlantic/Azores", "Atlantic/Madeira"], languages: ["pt-pt", "pt"],
    },
];

export const DEFAULT_MARKET: MarketCode = "AO";
export const MARKET_STORAGE_KEY = "autisync-market";
/** Set once the visitor has confirmed or chosen; until then the chip asks. */
export const MARKET_CONFIRMED_KEY = "autisync-market-confirmed";
export const MARKET_EVENT = "autisync:market";

export function marketByCode(code: string | null | undefined): Market | null {
    const c = String(code || "").toUpperCase();
    return markets.find((m) => m.code === c) ?? null;
}

export function marketForCurrency(currency: Currency): Market {
    return markets.find((m) => m.currency === currency) ?? markets[0];
}

export function marketName(m: Market, locale: "en" | "pt" = "en"): string {
    return locale === "pt" ? m.namePt : m.name;
}

/** Best guess from the browser alone. Angola when nothing matches. */
export function guessMarket(): Market {
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
        const byTz = markets.find((m) => m.timeZones.includes(tz));
        if (byTz) return byTz;
        const langs = (navigator.languages?.length ? navigator.languages : [navigator.language]).map((l) => String(l || "").toLowerCase());
        for (const lang of langs) {
            const byLang = markets.find((m) => m.languages.includes(lang));
            if (byLang) return byLang;
        }
        // Somewhere else in Europe: euros read better than kwanzas.
        if (tz.startsWith("Europe/")) return marketByCode("PT")!;
        // Southern Africa outside Namibia: the rand-pegged dollar is closest.
        if (tz === "Africa/Johannesburg" || tz === "Africa/Gaborone" || tz === "Africa/Maseru" || tz === "Africa/Mbabane") return marketByCode("NA")!;
    } catch {
        /* fall through */
    }
    return marketByCode(DEFAULT_MARKET)!;
}

/** The saved choice, the URL's say, or null when the visitor has never chosen. */
export function readSavedMarket(): { market: Market; confirmed: boolean } | null {
    try {
        const fromUrl = new URLSearchParams(window.location.search).get("market");
        const byUrl = marketByCode(fromUrl);
        if (byUrl) return { market: byUrl, confirmed: true };
    } catch { /* no window */ }
    try {
        const saved = marketByCode(window.localStorage.getItem(MARKET_STORAGE_KEY));
        if (saved) return { market: saved, confirmed: window.localStorage.getItem(MARKET_CONFIRMED_KEY) === "1" };
    } catch { /* storage blocked */ }
    return null;
}

export function saveMarket(m: Market, confirmed: boolean): void {
    try {
        window.localStorage.setItem(MARKET_STORAGE_KEY, m.code);
        if (confirmed) window.localStorage.setItem(MARKET_CONFIRMED_KEY, "1");
    } catch { /* storage blocked */ }
    try {
        window.dispatchEvent(new CustomEvent(MARKET_EVENT, { detail: { code: m.code, confirmed } }));
    } catch { /* no CustomEvent */ }
}
