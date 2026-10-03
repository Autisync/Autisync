/**
 * English ⇄ Portuguese page map. Used by the navbar language switch, the
 * footer, hreflang metadata and the sitemap. Add a line here when a page
 * gets a Portuguese twin.
 */
import type { Metadata } from "next";

export const BASE_URL = "https://www.autisync.com";

export const EN_TO_PT: Record<string, string> = {
    "/": "/pt",
    "/servicepackage": "/pt/precos",
    "/about": "/pt/sobre",
    "/contact": "/pt/contacto",
    "/portfolio": "/pt/portfolio",
    "/ServiceQuestionaire": "/pt/questionario",
    "/solutions/devServices": "/pt/servicos/desenvolvimento",
    "/solutions/graphicDesign": "/pt/servicos/design-grafico",
    "/solutions/seo": "/pt/servicos/seo-marketing",
    "/solutions/itConsultation": "/pt/servicos/consultoria-ti",
};

export const PT_TO_EN: Record<string, string> = Object.fromEntries(
    Object.entries(EN_TO_PT).map(([en, pt]) => [pt, en]),
);

const clean = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path) || "/";

export const isPtPath = (path: string) => {
    const p = clean(path);
    return p === "/pt" || p.startsWith("/pt/");
};

/** Portuguese twin of an English path (falls back to the PT home). */
export const toPt = (path: string) => EN_TO_PT[clean(path)] ?? "/pt";
/** English twin of a Portuguese path (falls back to the EN home). */
export const toEn = (path: string) => PT_TO_EN[clean(path)] ?? "/";

/** Same link in the current language: href("/contact", true) → "/pt/contacto". */
export const localHref = (enPath: string, pt: boolean) => (pt ? toPt(enPath) : enPath);

const abs = (p: string) => (p === "/" ? BASE_URL : `${BASE_URL}${p}`);

/** Metadata `alternates` (canonical + hreflang) for a page, given its English path. */
export function alternatesFor(enPath: string, current: "en" | "pt"): Metadata["alternates"] {
    const en = abs(enPath);
    const pt = abs(EN_TO_PT[enPath]);
    return {
        canonical: current === "pt" ? pt : en,
        languages: { en, pt, "x-default": en },
    };
}
