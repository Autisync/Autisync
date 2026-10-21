"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isPtPath } from "@/lib/i18n/routes";
import { pageRef, pageWaLink } from "@/lib/whatsapp";

/**
 * "Chat on WhatsApp", on every page: a small round button at the bottom right
 * (with its words beside it on a wide screen). The message it opens carries
 * the page's marker, "(ref WEB-pricing)", so the CRM knows which page the
 * conversation started on.
 *
 * It keeps out of the way:
 *   - not on the quiz (/quiz, /pt/diagnostico): the quiz keeps one thing on
 *     screen at a time and has its own WhatsApp link where a question is asked;
 *   - on a phone, hidden while someone is typing in a field (the keyboard is
 *     up) and while a form, the booking calendar or anything marked
 *     data-wa-avoid is in the bottom of the screen, where it would cover the
 *     button they are about to press;
 *   - lifted above a bar fixed to the bottom of the screen (data-wa-lift).
 */

const HIDDEN_ON = ["/quiz", "/pt/diagnostico"];

function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="currentColor">
            <path d="M16.02 3C8.84 3 3 8.83 3 16c0 2.3.6 4.53 1.75 6.5L3 29l6.68-1.74A12.94 12.94 0 0 0 16.02 29C23.2 29 29 23.17 29 16S23.2 3 16.02 3Zm0 23.6c-1.98 0-3.92-.53-5.62-1.54l-.4-.24-3.96 1.03 1.06-3.86-.26-.4A10.56 10.56 0 0 1 5.4 16c0-5.85 4.77-10.6 10.62-10.6 5.85 0 10.6 4.75 10.6 10.6 0 5.85-4.75 10.6-10.6 10.6Zm5.82-7.94c-.32-.16-1.89-.93-2.18-1.04-.3-.1-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.6-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.3.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.48 4.84.77.33 1.37.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.89-.77 2.16-1.52.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37Z" />
        </svg>
    );
}

export default function WhatsAppButton() {
    const pathname = usePathname() || "/";
    const pt = isPtPath(pathname);
    const hiddenHere = HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`));
    const [typing, setTyping] = useState(false);
    const [overForm, setOverForm] = useState(false);
    const [lift, setLift] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // Shown after the page has settled, so it never jumps in on top of the first paint.
        const t = window.setTimeout(() => setReady(true), 600);
        return () => window.clearTimeout(t);
    }, []);

    useEffect(() => {
        if (hiddenHere) return;
        const isField = (el: EventTarget | null) =>
            el instanceof HTMLElement && (el.matches("input, textarea, select, [contenteditable='true']"));
        const onIn = (e: FocusEvent) => { if (isField(e.target)) setTyping(true); };
        const onOut = () => window.setTimeout(() => setTyping(isField(document.activeElement)), 50);
        document.addEventListener("focusin", onIn);
        document.addEventListener("focusout", onOut);

        // The bottom fifth of the screen: what the button would sit on.
        const watched = new Set<Element>();
        const showing = new Set<Element>();
        const io = new IntersectionObserver((entries) => {
            for (const e of entries) { if (e.isIntersecting) showing.add(e.target); else showing.delete(e.target); }
            setOverForm(showing.size > 0);
        }, { rootMargin: "-80% 0px 0px 0px" });
        const scan = () => {
            document.querySelectorAll("form, [data-wa-avoid]").forEach((el) => {
                if (!watched.has(el)) { watched.add(el); io.observe(el); }
            });
            setLift(Boolean(document.querySelector("[data-wa-lift]")));
        };
        scan();
        const mo = new MutationObserver(() => scan());
        mo.observe(document.body, { childList: true, subtree: true });
        return () => {
            document.removeEventListener("focusin", onIn);
            document.removeEventListener("focusout", onOut);
            io.disconnect(); mo.disconnect();
            setOverForm(false); setTyping(false);
        };
    }, [pathname, hiddenHere]);

    if (hiddenHere) return null;
    const label = pt ? "Falar no WhatsApp" : "Chat on WhatsApp";
    // On a phone it steps aside for typing and forms; on a wide screen there is room for both.
    const tuck = typing || overForm;

    return (
        <a
            href={pageWaLink(pathname)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (+44 7795 866571)`}
            title={label}
            data-track={`WhatsApp button · ${pageRef(pathname)}`}
            className={[
                "fixed right-4 z-40 flex items-center gap-2 rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)]",
                "h-[52px] w-[52px] justify-center md:h-12 md:w-auto md:px-4 md:right-6 md:bottom-6",
                "transition-[opacity,transform,background-color] duration-300 hover:bg-[#1ebe5b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40",
                lift ? "bottom-[84px]" : "bottom-4",
                !ready ? "pointer-events-none translate-y-3 opacity-0" : tuck ? "pointer-events-none translate-y-3 opacity-0 md:pointer-events-auto md:translate-y-0 md:opacity-100" : "opacity-100",
            ].join(" ")}
        >
            <WhatsAppIcon className="h-7 w-7 md:h-6 md:w-6" />
            <span className="hidden text-sm font-semibold md:inline">{label}</span>
        </a>
    );
}
