"use client";

import { useEffect, useRef } from "react";
import localFont from "next/font/local";
import d from "./demo.module.css";

// The demo café's own look: a condensed poster face for headlines, the way a
// real client site would have its own identity separate from Autisync's.
const poster = localFont({ src: "../../fonts/Anton-Regular.woff2", weight: "400", variable: "--font-demo-poster", display: "swap" });

const FOOD = "/step-inside/cafe-demo/food";

/** The café's nav bar, laid over the walk-in like the reference site. */
export function CafeNav() {
    return (
        <div className={`${poster.variable} ${d.nav}`}>
            <a className={d.brand} href="#menu" aria-label="Your Café demo">
                <span>your café</span><sup>*</sup>
                <small>Café · Deli · Est. 2026</small>
            </a>
            <nav className={d.links} aria-label="Demo café">
                <a href="#menu">Menu</a>
                <a href="#mix">The mix</a>
                <a href="#how">Visit</a>
            </nav>
            <a className={d.order} href="#book">Order online</a>
        </div>
    );
}

const MENU = [
    { img: "card-croissant", name: "Butter croissant", note: "Baked here every morning", price: "£2.80" },
    { img: "card-flat-white", name: "Flat white", note: "Double shot, house blend", price: "£3.40" },
    { img: "card-toastie", name: "Toastie & coffee", note: "Our lunchtime regular", price: "£8.50" },
    { img: "card-panini", name: "Ham & cheese panini", note: "Pressed to order", price: "£7.20" },
    { img: "card-brunch", name: "Garden brunch plate", note: "Eggs, greens, sourdough", price: "£10.50" },
    { img: "card-breakfast", name: "Full breakfast stack", note: "Bacon, eggs, pancakes", price: "£12.90" },
    { img: "card-pancakes", name: "Strawberry pancakes", note: "With maple and cream", price: "£9.80" },
    { img: "card-cheesecake", name: "Lemon cheesecake", note: "One slice is never enough", price: "£4.50" },
    { img: "card-iced-latte", name: "Iced latte", note: "Oat milk on request", price: "£3.90" },
];

/** "Good taste. On repeat." A swipeable row of menu cards. */
export function ProductRow() {
    const row = useRef<HTMLDivElement | null>(null);
    const nudge = (dir: number) => row.current?.scrollBy({ left: dir * Math.min(640, row.current.clientWidth * 0.8), behavior: "smooth" });
    return (
        <section className={`${poster.variable} ${d.light} ${d.menu}`} id="menu" aria-label="Demo café menu">
            <div className={d.wrap}>
                <div className={d.menuHead}>
                    <div>
                        <span className={d.kicker}>Your daily good mood</span>
                        <h2 className={d.poster}>Good taste.<br /><em>On repeat.</em></h2>
                    </div>
                    <div className={d.arrows}>
                        <button type="button" onClick={() => nudge(-1)} aria-label="Previous dishes">←</button>
                        <button type="button" onClick={() => nudge(1)} aria-label="More dishes">→</button>
                    </div>
                </div>
            </div>
            <div className={d.row} ref={row} tabIndex={0} aria-label="Menu items, scroll sideways">
                {MENU.map((m) => (
                    <article className={d.card} key={m.img}>
                        <div className={d.cardImg}><img src={`${FOOD}/${m.img}.webp`} alt={m.name} loading="lazy" width={720} height={900} /></div>
                        <div className={d.cardBody}>
                            <div><h3>{m.name}</h3><p>{m.note}</p></div>
                            <b>{m.price}</b>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

const MIX = [
    { img: "mix-counter", x: 4, y: 4, w: 34, speed: -0.18, r: -3 },
    { img: "mix-latte-art", x: 58, y: 0, w: 26, speed: 0.12, r: 4 },
    { img: "mix-buns", x: 36, y: 22, w: 30, speed: -0.06, r: 2 },
    { img: "mix-cappuccino", x: 72, y: 34, w: 24, speed: 0.22, r: -5 },
    { img: "mix-display", x: 6, y: 56, w: 30, speed: 0.1, r: 3 },
    { img: "mix-cakes", x: 44, y: 62, w: 24, speed: -0.2, r: -2 },
    { img: "mix-coffees", x: 70, y: 70, w: 26, speed: 0.05, r: 5 },
];

/** "It's all in the mix." Big headline with photos that drift at different speeds as you scroll. */
export function MixBlock() {
    const box = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const el = box.current;
        if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let raf = 0;
        const tick = () => {
            raf = 0;
            const r = el.getBoundingClientRect();
            const centre = r.top + r.height / 2 - window.innerHeight / 2;
            el.querySelectorAll<HTMLElement>("[data-speed]").forEach((img) => {
                const sp = Number(img.dataset.speed);
                img.style.transform = `translate3d(0, ${(centre * sp).toFixed(1)}px, 0) rotate(${img.dataset.r}deg)`;
            });
        };
        const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
        tick();
        window.addEventListener("scroll", on, { passive: true });
        window.addEventListener("resize", on);
        return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
    }, []);
    return (
        <section className={`${poster.variable} ${d.light} ${d.mix}`} id="mix" aria-label="Demo café story">
            <div className={`${d.wrap} ${d.mixGrid}`}>
                <div className={d.mixCopy}>
                    <span className={d.kicker}>A different kind of everyday</span>
                    <h2 className={`${d.poster} ${d.mixTitle}`}>It&apos;s all<br />in the<br /><em>mix.</em></h2>
                    <p>The first sip. The lunch break. The slice you didn&apos;t plan on. A little of everything, all together, five minutes from your door.</p>
                    <div className={d.mixCtas}>
                        <a className={d.orderDark} href="#book">Book a table</a>
                        <a className={d.textLink} href="#menu">See the menu →</a>
                    </div>
                </div>
                <div className={d.collage} ref={box} aria-hidden="true">
                    {MIX.map((m) => (
                        <img key={m.img} src={`${FOOD}/${m.img}.webp`} alt="" loading="lazy" data-speed={m.speed} data-r={m.r}
                            style={{ left: `${m.x}%`, top: `${m.y}%`, width: `${m.w}%`, transform: `rotate(${m.r}deg)` }} />
                    ))}
                </div>
            </div>
        </section>
    );
}

/** The seam between the demo café and Autisync's own sales page. */
export function DemoEnd() {
    return (
        <div className={d.seam}>
            <span>That was a demo website built by Autisync.</span>
            <a href="#how">Here&apos;s how we build yours ↓</a>
        </div>
    );
}
