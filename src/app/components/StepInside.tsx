"use client";

import { useEffect, useRef, type ReactNode } from "react";
import s from "./StepInside.module.css";

/**
 * "Step inside" hero: a phone-filmed walk into the business, played by
 * scrolling. The video is pre-cut into numbered WebP frames
 * (scripts/step-inside/make-frames.ps1) and painted on a canvas, which scrubs
 * smoothly on every browser, iPhone Safari included; scrubbing an <video>
 * does not.
 *
 * Frames live in /public/<dir>/f_0001.webp … f_NNNN.webp. Pass a portrait
 * sequence as `mobile` so phones get a vertical walk-in.
 */
export type FrameSet = { dir: string; count: number };

type Props = {
    desktop: FrameSet;
    mobile?: FrameSet;
    /** Small label in the corner, e.g. "Step inside Bob's". */
    label?: string;
    /** Name revealed over the last frames, set big in a serif face. */
    logo?: ReactNode;
    /** Shown while frames load and to visitors who prefer reduced motion. */
    poster?: string;
    /** Overlay shown over the first frames (headline, buttons). Fades as you scroll. */
    children?: ReactNode;
    /** Scroll length of the walk-in, in viewport heights. */
    length?: number;
    /** Always-visible layer over the walk-in, e.g. the business's own nav bar. */
    overlay?: ReactNode;
};

const frameUrl = (set: FrameSet, i: number) => `${set.dir}/f_${String(i + 1).padStart(4, "0")}.webp`;

export default function StepInside({ desktop, mobile, label, logo, poster, children, length = 4, overlay }: Props) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const introRef = useRef<HTMLDivElement | null>(null);
    const logoRef = useRef<HTMLDivElement | null>(null);
    const hintRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const canvas = canvasRef.current;
        if (!section || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const portrait = window.matchMedia("(max-aspect-ratio: 4/5)").matches;
        const set = portrait && mobile ? mobile : desktop;

        const images: HTMLImageElement[] = new Array(set.count);
        let current = -1;
        let raf = 0;

        const load = (i: number) => {
            if (images[i]) return images[i];
            const im = new Image();
            im.decoding = "async";
            im.src = frameUrl(set, i);
            im.onload = () => { if (i === current || current === -1) paint(i, true); };
            images[i] = im;
            return im;
        };

        const size = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(canvas.clientWidth * dpr);
            canvas.height = Math.round(canvas.clientHeight * dpr);
        };

        // Draw frame i "cover"-fitted; if it hasn't loaded, fall back to the nearest one that has.
        const paint = (i: number, force = false) => {
            if (i === current && !force) return;
            let k = i;
            for (let step = 0; step < set.count; step++) {
                const a = images[i - step], b = images[i + step];
                if (a?.complete && a.naturalWidth) { k = i - step; break; }
                if (b?.complete && b.naturalWidth) { k = i + step; break; }
            }
            const im = images[k];
            if (!im?.complete || !im.naturalWidth) return;
            current = i;
            const scale = Math.max(canvas.width / im.naturalWidth, canvas.height / im.naturalHeight);
            const w = im.naturalWidth * scale, h = im.naturalHeight * scale;
            ctx.drawImage(im, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
        };

        const progress = () => {
            const r = section.getBoundingClientRect();
            const run = r.height - window.innerHeight;
            return run <= 0 ? 0 : Math.min(1, Math.max(0, -r.top / run));
        };

        const update = () => {
            raf = 0;
            const p = reduced ? 1 : progress();
            paint(Math.round(p * (set.count - 1)));
            const fade = (from: number, to: number) => Math.min(1, Math.max(0, (p - from) / (to - from)));
            if (introRef.current) introRef.current.style.opacity = String(1 - fade(0.02, 0.16));
            if (hintRef.current) hintRef.current.style.opacity = String(1 - fade(0, 0.05));
            if (logoRef.current) {
                const t = fade(0.8, 0.97);
                logoRef.current.style.opacity = String(t);
                logoRef.current.style.transform = `translateY(${(1 - t) * 24}px)`;
            }
        };
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
        const onResize = () => { size(); current = -1; update(); };

        size();
        if (reduced) {
            load(set.count - 1);
        } else {
            // First frames now, the rest once the page has settled, so the hero isn't held up.
            for (let i = 0; i < Math.min(12, set.count); i++) load(i);
            const rest = () => { for (let i = 0; i < set.count; i++) load(i); };
            if (document.readyState === "complete") setTimeout(rest, 150);
            else window.addEventListener("load", rest, { once: true });
        }
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [desktop, mobile]);

    return (
        <section ref={sectionRef} className={s.walk} style={{ height: `${length * 100}vh` }} aria-label={label ?? "Walk-in video"}>
            <div className={s.sticky}>
                <canvas
                    ref={canvasRef}
                    className={s.canvas}
                    style={poster ? { backgroundImage: `url(${poster})` } : undefined}
                    role="img"
                    aria-label={label ?? "A walk from the street into the business"}
                />
                <div className={s.shade} aria-hidden="true" />
                {children && <div ref={introRef} className={s.intro}>{children}</div>}
                {logo && <div ref={logoRef} className={s.logo}>{logo}</div>}
                {label && <div className={s.label}>{label}</div>}
                {overlay && <div className={s.overlay}>{overlay}</div>}
                <div ref={hintRef} className={s.hint} aria-hidden="true">Scroll to step inside<span /></div>
            </div>
        </section>
    );
}
