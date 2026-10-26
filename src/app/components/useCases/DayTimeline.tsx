"use client";

/**
 * <DayTimeline /> — "a Tuesday with your hands full", told one moment at a
 * time: when it comes into view, each step lights up in turn, the gold line
 * grows down to it and the current moment pulses. A replay button runs it
 * again. Before it plays (and without JavaScript, or with less motion asked
 * for) every step is shown.
 */

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

export default function DayTimeline({
    items,
    replay,
    stepMs = 1100,
}: {
    items: { when: string; what: string }[];
    replay: string;
    stepMs?: number;
}) {
    const ref = useRef<HTMLOListElement>(null);
    const [on, setOn] = useState(items.length); // complete at rest
    const [run, setRun] = useState(0);
    const [seen, setSeen] = useState(false);
    const [lineH, setLineH] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el || !("IntersectionObserver" in window)) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setSeen(true);
                    io.disconnect();
                }
            },
            { threshold: 0.35 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        if (!seen) return;
        setOn(1);
        let i = 1;
        const id = window.setInterval(() => {
            i += 1;
            setOn(i);
            if (i >= items.length) window.clearInterval(id);
        }, stepMs);
        return () => window.clearInterval(id);
    }, [seen, run, items.length, stepMs]);

    // The gold line reaches the centre of the last lit dot.
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const lit = el.querySelectorAll<HTMLElement>(".tl-item")[Math.max(0, on - 1)];
        if (lit) setLineH(lit.offsetTop + 12 - 6);
    }, [on]);

    return (
        <div className="tl-wrap">
            <span className="tl-line" style={{ height: lineH }} aria-hidden="true" />
            <ol ref={ref} className="tl">
                {items.map((e, i) => (
                    <li key={i} className={"tl-item" + (i < on ? " is-on" : "") + (seen && i === on - 1 && on < items.length ? " is-now" : "")}>
                        <span className="tl-dot" aria-hidden="true" />
                        <p className="tl-when">{e.when}</p>
                        <p className="tl-what">{e.what}</p>
                    </li>
                ))}
            </ol>
            {seen && on >= items.length && (
                <button type="button" className="tl-replay" onClick={() => setRun((r) => r + 1)}>
                    <RotateCcw size={14} aria-hidden="true" /> {replay}
                </button>
            )}
        </div>
    );
}
