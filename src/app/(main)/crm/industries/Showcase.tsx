"use client";

/**
 * The walkthrough on each industry page: real CRM screens that play like a
 * short video. Each step crossfades in and zooms slowly towards the part of
 * the screen it is about; a bar fills while it plays, then the next step
 * starts. It only plays while on screen, pauses on hover or focus, and stands
 * still for people who ask for reduced motion (the steps still work by tap).
 */
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { IndustryId } from "@/lib/industry-plans";
import { shotSrc, type ShotKind, type TourStep } from "./types";
import x from "./industry.module.css";

const STEP_MS = 6500;

/** Where on each kind of screen the zoom heads (transform-origin), and how far. */
const FOCUS: Record<ShotKind, { origin: string; z: number }> = {
    dashboard: { origin: "40% 30%", z: 1.12 },
    public: { origin: "50% 25%", z: 1.14 },
    bookings: { origin: "45% 35%", z: 1.18 },
    inbox: { origin: "70% 45%", z: 1.22 },
    client: { origin: "80% 25%", z: 1.18 },
    reputation: { origin: "60% 70%", z: 1.14 },
    quotes: { origin: "60% 40%", z: 1.18 },
    opportunities: { origin: "50% 45%", z: 1.18 },
    billing: { origin: "55% 30%", z: 1.18 },
    tasks: { origin: "60% 40%", z: 1.14 },
};

type Labels = { play: string; pause: string; step: (i: number, n: number) => string; note: string; address: string };

export default function Showcase({ id, steps, labels }: { id: IndustryId; steps: TourStep[]; labels: Labels }) {
    const [i, setI] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [hover, setHover] = useState(false);
    const [inView, setInView] = useState(false);
    const [reduced, setReduced] = useState(false);
    const root = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const m = window.matchMedia("(prefers-reduced-motion: reduce)");
        const set = () => { setReduced(m.matches); if (m.matches) setPlaying(false); };
        set();
        m.addEventListener("change", set);
        return () => m.removeEventListener("change", set);
    }, []);

    useEffect(() => {
        const el = root.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const running = playing && !hover && inView && !reduced;

    // Advance on a timer that restarts whenever the step changes or play resumes.
    useEffect(() => {
        if (!running) return;
        const t = window.setTimeout(() => setI((v) => (v + 1) % steps.length), STEP_MS);
        return () => window.clearTimeout(t);
    }, [running, i, steps.length]);

    const go = useCallback((n: number) => { setI(n); }, []);
    const step = steps[i];

    return (
        <div ref={root}>
            <div className={x.tour}>
                <div>
                    <div
                        className={x.frame}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                        <div className={x.bar} aria-hidden="true"><i /><i /><i /><span>{labels.address}</span></div>
                        <div className={x.viewport} role="img" aria-label={step.alt}>
                            {steps.map((s, k) => {
                                const f = FOCUS[s.shot];
                                return (
                                    <div key={s.n} className={`${x.slide} ${k === i ? x.slideOn : ""} ${running || k === i ? x.zoom : ""}`} aria-hidden={k !== i}>
                                        <Image
                                            src={shotSrc(id, s.n, s.shot)}
                                            alt=""
                                            width={1800}
                                            height={1125}
                                            sizes="(max-width: 960px) 100vw, 700px"
                                            loading={k === 0 ? "eager" : "lazy"}
                                            style={{ transformOrigin: f.origin, ["--z" as string]: reduced ? 1 : f.z }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <p className={x.note}>{labels.note}</p>
                    <div className={x.mobileText} aria-live="polite">
                        <h3>{step.t}</h3>
                        <p>{step.d}</p>
                    </div>
                </div>

                <div>
                    <ol className={`${x.steps} ${running ? x.run : x.paused}`}>
                        {steps.map((s, k) => (
                            <li key={s.n}>
                                <button
                                    type="button"
                                    className={`${x.stepBtn} ${k === i ? x.stepOn : ""}`}
                                    aria-current={k === i ? "step" : undefined}
                                    aria-label={`${labels.step(k + 1, steps.length)}: ${s.t}`}
                                    onClick={() => go(k)}
                                    onFocus={() => setHover(true)}
                                    onBlur={() => setHover(false)}
                                >
                                    <span className={x.num}>{k + 1}</span>
                                    <span>
                                        <span className={x.stepT}>{s.t}</span>
                                        <span className={x.stepD}>{s.d}</span>
                                    </span>
                                    {k === i ? <span key={`${i}-${running}`} className={x.progress} style={{ ["--ms" as string]: `${STEP_MS}ms` }} /> : null}
                                </button>
                            </li>
                        ))}
                    </ol>
                    <div className={x.controls}>
                        <button type="button" className={x.playBtn} onClick={() => setPlaying((p) => !p)} aria-pressed={!playing}>
                            {playing && !reduced
                                ? <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                                : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" /></svg>}
                            {playing && !reduced ? labels.pause : labels.play}
                        </button>
                        <span>{labels.step(i + 1, steps.length)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
