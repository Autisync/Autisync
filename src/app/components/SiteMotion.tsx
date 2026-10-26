"use client";

/**
 * <SiteMotion /> — the same motion on every page of the main site, without
 * touching each page: mounted once in (main)/layout.tsx, it looks at the page
 * after each navigation and
 *
 *   - reveals sections as they come into view: headings, paragraphs, cards,
 *     list items, FAQ rows and images fade up once, one after another within
 *     a group (classes .rv / .rv-in in motion.css);
 *   - pops the numbers of numbered steps (1, 2, 3, 4) when their step arrives;
 *   - counts big figures up (40+, 100%) the first time they are seen;
 *   - gives every button the Autisync fill: it fills from where the pointer
 *     comes in, lifts slightly and presses down on click (.fx-btn).
 *
 * Anything already on screen when the page opens stays as it is (no flash),
 * and a jump down the page (a menu link) shows everything it passed. Scrolling
 * back up never hides anything again. Things that animate themselves
 * (framer-motion, the use cases player) are left alone, as is anything inside
 * [data-motion-off]. Visitors who ask for less motion get plain fades.
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const BLOCKS = [
    "h1", "h2", "h3", "p", "dl > div", "ul > li", "ol > li", "details", "table", "figure", "blockquote",
    "img", "form", ".grid > *", "[data-reveal]",
].join(",");
const SKIP = "nav, header, footer, [data-motion-off], [role=dialog], .uc, .tl, svg";
const MAX_STAGGER = 6;
const STEP_MS = 80;

function hasOwnMotion(el: Element): boolean {
    // framer-motion and similar write opacity/transform inline.
    for (let n: Element | null = el; n && n !== document.body; n = n.parentElement) {
        const st = (n as HTMLElement).getAttribute?.("style") || "";
        if (/opacity|transform/.test(st)) return true;
    }
    return false;
}

function isRevealable(el: HTMLElement): boolean {
    if (el.closest(SKIP)) return false;
    if (hasOwnMotion(el)) return false;
    const cs = getComputedStyle(el);
    if (cs.position === "fixed" || cs.position === "absolute" || cs.position === "sticky") return false;
    if (cs.display === "none" || cs.visibility === "hidden") return false;
    if (cs.transform !== "none" || cs.animationName !== "none") return false;
    const r = el.getBoundingClientRect();
    if (r.height === 0 || r.width === 0) return false;
    if (r.height > window.innerHeight * 1.2) return false; // too tall to fade as one piece
    return true;
}

function setupReveal(first: boolean): () => void {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chosen: HTMLElement[] = [];
    const inChosen = (el: Element) => chosen.some((c) => c.contains(el));
    const vh = window.innerHeight;

    document.querySelectorAll<HTMLElement>(BLOCKS).forEach((el) => {
        if (el.classList.contains("rv") || inChosen(el) || !isRevealable(el)) return;
        chosen.push(el);
    });

    // Stagger siblings that share a parent.
    const byParent = new Map<Element, HTMLElement[]>();
    chosen.forEach((el) => {
        const p = el.parentElement!;
        const list = byParent.get(p) || [];
        list.push(el);
        byParent.set(p, list);
    });

    const pending: HTMLElement[] = [];
    chosen.forEach((el) => {
        const sibs = byParent.get(el.parentElement!)!;
        const k = sibs.indexOf(el);
        const top = el.getBoundingClientRect().top;
        // Numbered steps: a number badge as the first thing in a list item.
        if (el.tagName === "LI" && el.parentElement?.tagName === "OL") {
            const badge = el.firstElementChild as HTMLElement | null;
            if (badge && /^\d{1,2}$/.test((badge.textContent || "").trim()) && badge.getBoundingClientRect().width <= 64) {
                badge.classList.add("rv-step");
            }
        }
        if (top < vh * 0.92 && first) {
            // Already on screen at load: no flash, no animation.
            el.classList.add("rv", "rv-now", "rv-in");
            return;
        }
        el.style.setProperty("--rv-d", `${Math.min(k, MAX_STAGGER) * STEP_MS}ms`);
        el.classList.add("rv");
        pending.push(el);
    });

    const show = (el: HTMLElement) => {
        if (el.classList.contains("rv-in")) return;
        el.classList.add("rv-in");
        countUp(el, reduce);
        // Hand the element back to its own styles once it has arrived.
        const d = parseInt(el.style.getPropertyValue("--rv-d") || "0", 10) || 0;
        window.setTimeout(() => {
            if (el.querySelector(".rv-step")) return; // keep the step's state
            el.classList.remove("rv", "rv-in", "rv-now");
            el.style.removeProperty("--rv-d");
        }, 1000 + d);
    };

    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
        io = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) {
                    show(e.target as HTMLElement);
                    io?.unobserve(e.target);
                }
            }),
            { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
        );
        pending.forEach((el) => io!.observe(el));
    } else {
        pending.forEach(show);
    }

    // On a page change the loader covers the screen: what is on screen
    // arrives as the loader lifts.
    if (!first) {
        window.setTimeout(() => {
            pending.forEach((el) => { if (el.getBoundingClientRect().top < vh * 0.92) show(el); });
        }, 650);
    }

    // A jump (menu link, fast fling) can pass a section without it ever
    // touching the screen: anything above the bottom edge shows.
    let ticking = false;
    const sweep = () => {
        ticking = false;
        const h = window.innerHeight;
        for (const el of pending) if (!el.classList.contains("rv-in") && el.getBoundingClientRect().top < h) show(el);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(sweep); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onScroll);

    return () => {
        io?.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("hashchange", onScroll);
        // Anything not yet shown is shown, so a half-set-up page never sticks.
        pending.forEach((el) => el.classList.add("rv-in"));
    };
}

/** 40+, 120, 98% — counted up from zero the first time they are seen. */
function countUp(root: HTMLElement, reduce: boolean) {
    if (reduce) return;
    const els = [root, ...Array.from(root.querySelectorAll<HTMLElement>("*"))];
    for (const el of els) {
        if (el.children.length !== 0 || el.dataset.counted) continue;
        const node = el.firstChild;
        if (!node || node.nodeType !== Node.TEXT_NODE) continue;
        const m = /^(\d{1,4})(\+|%)?$/.exec((node.nodeValue || "").trim());
        if (!m) continue;
        if (parseFloat(getComputedStyle(el).fontSize) < 24) continue;
        const end = parseInt(m[1], 10);
        const suffix = m[2] || "";
        if (end < 2) continue;
        el.dataset.counted = "1";
        el.classList.add("rv-count");
        const t0 = performance.now();
        const dur = 1100;
        const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / dur);
            const v = Math.round(end * (1 - Math.pow(1 - p, 3)));
            node.nodeValue = `${v}${suffix}`;
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }
}

// ── Buttons ─────────────────────────────────────────────────────────────────

// Any CSS colour (rgb, oklch, …) to RGBA, by painting one pixel.
let paint: CanvasRenderingContext2D | null = null;
function rgb(c: string): [number, number, number, number] | null {
    if (!c || c === "transparent") return [0, 0, 0, 0];
    try {
        paint = paint || document.createElement("canvas").getContext("2d", { willReadFrequently: true });
        if (!paint) return null;
        paint.clearRect(0, 0, 1, 1);
        paint.fillStyle = "#000";
        paint.fillStyle = c;
        paint.fillRect(0, 0, 1, 1);
        const d = paint.getImageData(0, 0, 1, 1).data;
        return [d[0], d[1], d[2], d[3] / 255];
    } catch {
        return null;
    }
}
const lum = ([r, g, b]: number[]) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
const isGold = ([r, g, b]: number[]) => r > 150 && r - b > 60 && g > 100 && g < r;

function tagButtons() {
    document.querySelectorAll<HTMLElement>("a, button").forEach((el) => {
        if (el.classList.contains("fx-btn") || el.closest("nav, header, [data-motion-off], .uc, [role=dialog], [role=tablist], [role=radiogroup]")) return;
        // Toggles and tabs keep their own look (only the chosen one is filled).
        if (el.matches("[aria-pressed], [aria-selected], [aria-checked], [role=tab], [role=radio], [role=switch]")) return;
        const text = (el.textContent || "").trim();
        if (text.length < 2 || text.length > 60) return;
        const cs = getComputedStyle(el);
        if (cs.display === "inline" || cs.position === "fixed" || cs.position === "absolute") return;
        const padX = parseFloat(cs.paddingLeft);
        const padY = parseFloat(cs.paddingTop);
        const radius = parseFloat(cs.borderTopLeftRadius);
        const r = el.getBoundingClientRect();
        if (padX < 12 || padY < 6 || radius < 2 || r.height < 30 || r.height > 72 || r.width > 420) return;
        const bg = rgb(cs.backgroundColor);
        const bc = parseFloat(cs.borderTopWidth) >= 1 && cs.borderTopStyle !== "none" ? rgb(cs.borderTopColor) : null;
        const border = bc && bc[3] > 0.2;
        const solid = !!bg && bg[3] > 0.5;
        if (!solid && !border) return;
        let fill = "#B28228";
        if (solid && isGold(bg!)) fill = "#1C1C1C";
        else if (solid && lum(bg!) > 0.85) fill = "#1C1C1C";
        // An outline button on a dark band fills gold too; text turns white.
        el.style.setProperty("--fx-bg", cs.backgroundColor);
        el.style.setProperty("--fx-fill", fill);
        el.style.setProperty("--fx-ink", "#ffffff");
        el.style.setProperty("--fx-s", `${Math.ceil(Math.hypot(r.width, r.height) * 2 + 8)}px`);
        el.classList.add("fx-btn");
    });
}

function setupButtons(): () => void {
    tagButtons();
    const onEnter = (e: PointerEvent) => {
        const el = (e.target as HTMLElement).closest?.(".fx-btn") as HTMLElement | null;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--fx-x", `${e.clientX - r.left}px`);
        el.style.setProperty("--fx-y", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointerover", onEnter, { passive: true });
    return () => document.removeEventListener("pointerover", onEnter);
}

function tagButtonsLater(): () => void {
    let t = 0;
    const mo = new MutationObserver(() => {
        window.clearTimeout(t);
        t = window.setTimeout(tagButtons, 250);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { mo.disconnect(); window.clearTimeout(t); };
}

export default function SiteMotion() {
    const pathname = usePathname();
    const first = useRef(true);

    useEffect(() => {
        let undoReveal: (() => void) | null = null;
        let undoButtons: (() => void) | null = null;
        // Wait a frame so the new page is in the DOM and laid out.
        const raf = requestAnimationFrame(() => {
            try {
                undoReveal = setupReveal(first.current);
                const a = setupButtons();
                const b = tagButtonsLater();
                undoButtons = () => { a(); b(); };
            } catch {
                /* motion is a nicety: never break the page */
            }
            first.current = false;
        });
        return () => {
            cancelAnimationFrame(raf);
            undoReveal?.();
            undoButtons?.();
        };
    }, [pathname]);

    return null;
}
