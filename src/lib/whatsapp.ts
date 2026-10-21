// WhatsApp links for autisync.com, all in one place.
//
// Every "Chat on WhatsApp" link opens WhatsApp with a message already typed,
// ending in a short marker that says where it was clicked: "(ref WEB-pricing)",
// "(ref WEB-quiz)", "(ref WEB-clinicas)". The Autisync CRM reads that marker
// off the first message of a new conversation and records the source on the
// contact and the lead (utm_source "website", utm_campaign "pricing"), so the
// reports show which pages bring conversations. Nothing is stripped from the
// message: the person sees and can edit what they send.
//
// Number: +44 7795 866571 (UK and Portugal sales line).

import { isPtPath } from "@/lib/i18n/routes";

export const WHATSAPP_NUMBER = "447795866571";
export const WHATSAPP_DISPLAY = "+44 7795 866571";
export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

/** Paths whose last part is not a good name for the marker. */
const REF_NAMES: Record<string, string> = {
    "/": "home",
    "/pt": "pt",
    "/servicepackage": "pricing",
    "/ServiceQuestionaire": "questionnaire",
    "/solutions/devServices": "development",
    "/solutions/graphicDesign": "design",
    "/solutions/itConsultation": "it",
    "/PrivacyPolicy": "privacy",
    "/TermsofUse": "terms",
    "/crm/estate-agents": "estate-agents",
    "/crm/imobiliarias": "imobiliarias",
    "/pt/crm": "pt-crm",
    "/websites/step-inside": "step-inside",
    "/pt/websites/demonstracao": "demonstracao",
};

/** "WEB-pricing" for /servicepackage, "WEB-clinicas" for /pt/clinicas, "WEB-home" for /. */
export function pageRef(pathname: string | null | undefined): string {
    const path = (String(pathname || "/").split(/[?#]/)[0].replace(/\/+$/, "") || "/");
    const named = REF_NAMES[path];
    const last = named || path.split("/").filter(Boolean).pop() || "home";
    const slug = last.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 28) || "home";
    return `WEB-${slug}`;
}

/** The message with its marker, unless it already has one. */
export function withRef(text: string, ref: string): string {
    const t = String(text || "").trim();
    if (/\(ref [^)]+\)/i.test(t)) return t;
    return `${t}${t ? " " : ""}(ref ${ref})`;
}

/** A wa.me link with the message typed: waLink("Hi Autisync!", "WEB-pricing"). */
export function waLink(text?: string, ref?: string): string {
    const t = ref ? withRef(text || "", ref) : String(text || "").trim();
    return t ? `${WHATSAPP_BASE}?text=${encodeURIComponent(t)}` : WHATSAPP_BASE;
}

/** The default message for a page, in its language. */
export function pageMessage(pathname: string | null | undefined): string {
    const pt = isPtPath(pathname || "/");
    return pt
        ? "Olá Autisync! Estive no vosso site e tenho uma pergunta."
        : "Hi Autisync! I was on your website and have a question.";
}

/** The link for a page: its message, in its language, with its marker. */
export function pageWaLink(pathname: string | null | undefined, text?: string): string {
    return waLink(text || pageMessage(pathname), pageRef(pathname));
}
