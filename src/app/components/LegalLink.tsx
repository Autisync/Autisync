"use client";

import type { MouseEvent, ReactNode } from "react";

/**
 * A link to a legal page from inside a form or funnel. It opens in a new tab,
 * so the form behind it keeps what the visitor typed, and it leaves a short
 * note (localStorage, read once by components/LegalBackBar) saying which page
 * it was opened from. With rel="noreferrer" the new tab has no referrer and a
 * one-entry history, so without the note its Back button could only go home;
 * with it, Back closes the tab and the visitor is on the form again.
 */
export const LEGAL_OPENED_FROM = "autisync.legal.openedFrom";

export function rememberLegalOrigin() {
    try {
        localStorage.setItem(LEGAL_OPENED_FROM, JSON.stringify({ path: location.pathname + location.search, at: Date.now() }));
    } catch { /* storage blocked: the legal page falls back to the home page */ }
}

export default function LegalLink({ href, children, className, track }: {
    href: string;
    children: ReactNode;
    className?: string;
    /** Label for the visitor tracker (t.js reads data-track). */
    track?: string;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            data-track={track}
            onClick={(e: MouseEvent<HTMLAnchorElement>) => { if (!e.defaultPrevented) rememberLegalOrigin(); }}
        >
            {children}
        </a>
    );
}
