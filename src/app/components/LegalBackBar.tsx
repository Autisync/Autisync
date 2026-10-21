"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LEGAL_OPENED_FROM } from "./LegalLink";

/**
 * The bar at the top of every legal page: "← Back" and a link home.
 *
 * The legal pages sit outside the site's navbar layout, and on a phone their
 * contents menu is hidden, so before this bar the only way off one was the
 * browser's own Back button, and a visitor who had come from a form often
 * did not find it. Back means "where you were":
 *
 * - came from a page of this site in this tab (a same-origin referrer, or a
 *   client-side navigation, which leaves no referrer): history.back(), so the
 *   page they left comes back as they left it;
 * - opened in a new tab from this site (Footer, quiz, a form's LegalLink: the
 *   tab's history is this page alone): close the tab, which puts them back on
 *   the form; if the browser will not let a script close it, go to that page;
 * - anything else (a search result, a link in an email, typed in): the home
 *   page in the visitor's language.
 *
 * What was worked out is kept for the tab (sessionStorage), so a reload of the
 * legal page still knows its way back.
 */
type Lang = "en" | "pt";
type Mode = "history" | "tab" | "home";
type From = { mode: Mode; path?: string };

const FROM = "autisync.legal.from";
const NOTE_MAX_AGE = 5 * 60 * 1000;

const COPY = {
    en: { back: "Back", home: "Home", homeLabel: "Autisync home page" },
    pt: { back: "Voltar", home: "Início", homeLabel: "Página inicial da Autisync" },
} as const;

const isPt = (path?: string) => !!path && (path === "/pt" || path.startsWith("/pt/") || path.startsWith("/pt?"));

function readJson<T>(store: Storage, key: string): T | null {
    try { return JSON.parse(store.getItem(key) || "null") as T | null; } catch { return null; }
}

function detect(): From {
    const here = location.pathname;
    const single = history.length <= 1;

    // A full page load from a page of this site.
    try {
        if (document.referrer) {
            const ref = new URL(document.referrer);
            if (ref.origin === location.origin && ref.pathname !== here) {
                return { mode: single ? "tab" : "history", path: ref.pathname + ref.search };
            }
        }
    } catch { /* malformed referrer */ }

    // A client-side navigation (Next.js Link): the document was loaded at another address of this site.
    try {
        const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
        if (nav && !single) {
            const first = new URL(nav.name);
            if (first.origin === location.origin && first.pathname !== here) return { mode: "history", path: first.pathname };
        }
    } catch { /* no Navigation Timing */ }

    // A new tab opened by a LegalLink a moment ago (rel="noreferrer" hides the referrer).
    if (single) {
        const note = readJson<{ path?: string; at?: number }>(localStorage, LEGAL_OPENED_FROM);
        if (note?.path && note.path.startsWith("/") && typeof note.at === "number" && Date.now() - note.at < NOTE_MAX_AGE) {
            try { localStorage.removeItem(LEGAL_OPENED_FROM); } catch { /* ignore */ }
            return { mode: "tab", path: note.path };
        }
    }

    // Worked out earlier in this tab, before a reload.
    const kept = readJson<From & { here?: string }>(sessionStorage, FROM);
    if (kept && kept.here === here && (kept.mode === "history" || kept.mode === "tab")) return { mode: kept.mode, path: kept.path };

    return { mode: "home" };
}

export default function LegalBackBar({ lang: langProp }: { lang?: Lang }) {
    const [from, setFrom] = useState<From>({ mode: "home" });

    useEffect(() => {
        let f: From = { mode: "home" };
        try { f = detect(); } catch { /* storage blocked: home */ }
        setFrom(f);
        if (f.mode !== "home") {
            try { sessionStorage.setItem(FROM, JSON.stringify({ ...f, here: location.pathname })); } catch { /* ignore */ }
        }
    }, []);

    // The documents bring their own language (both versions of the website's
    // policy pass it too); a page that does not, such as /TermsofUse, gets a
    // bar in the language of the page they came from.
    const lang: Lang = langProp ?? (isPt(from.path) ? "pt" : "en");
    const t = COPY[lang];
    const home = lang === "pt" ? "/pt" : "/";

    const goBack = () => {
        if (from.mode === "history") {
            history.back();
            return;
        }
        if (from.mode === "tab") {
            const path = from.path || home;
            window.close();
            // Still here: the browser keeps tabs it did not open by script.
            window.setTimeout(() => { if (!window.closed) location.assign(path); }, 250);
            return;
        }
        location.assign(home);
    };

    return (
        <div className="sticky top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-md">
            <div className="mx-auto flex h-12 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <button
                    type="button"
                    onClick={goBack}
                    data-track={`Legal page back · ${from.mode}`}
                    className="-ml-2 inline-flex items-center gap-1.5 rounded-md px-2 py-2 text-sm font-medium text-white transition-colors hover:text-[#d1a94c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b98b2f]"
                >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                    {t.back}
                </button>
                <Link
                    href={home}
                    aria-label={t.homeLabel}
                    className="-mr-2 inline-flex items-center gap-1.5 rounded-md px-2 py-2 text-sm text-gray-300 transition-colors hover:text-[#d1a94c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b98b2f]"
                >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3 10.5 12 3l9 7.5" />
                        <path d="M5 9.5V21h14V9.5" />
                    </svg>
                    <span>
                        <span className="font-semibold text-white">Autisync</span> · {t.home}
                    </span>
                </Link>
            </div>
        </div>
    );
}
