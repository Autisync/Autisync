"use client";

/**
 * <UseCases /> — what the CRM does, one case at a time, played as a short
 * scene on a phone: the client's message, the automatic reply, the booking,
 * the task for the team. Pick a kind of business, pick a case, or let it
 * play: each case runs once and the next one starts.
 *
 * Plays only while on screen, holds while the visitor points at the phone
 * or uses the keyboard inside it, and has a pause button. Visitors who ask
 * for less motion see each scene complete, without the play-through.
 * Before it plays (and without JavaScript) the first scene shows complete.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    BellRing,
    CalendarCheck,
    CalendarX,
    ChevronLeft,
    ChevronRight,
    FileCheck2,
    Home,
    Inbox,
    KanbanSquare,
    ListChecks,
    Mail,
    Megaphone,
    MessageCircle,
    Pause,
    PhoneMissed,
    Play,
    Receipt,
    Repeat,
    Send,
    Star,
    Store,
} from "lucide-react";
import type { Beat, Group, UseCase, UseCaseCopy } from "./cases";

const ICONS = {
    missed: PhoneMissed,
    chat: MessageCircle,
    booking: CalendarCheck,
    bell: BellRing,
    noshow: CalendarX,
    star: Star,
    repeat: Repeat,
    inbox: Inbox,
    invoice: Receipt,
    quote: FileCheck2,
    mail: Mail,
    quiz: ListChecks,
    post: Send,
    ads: Megaphone,
    google: Store,
    home: Home,
    pipeline: KanbanSquare,
} as const;

const GROUP_ORDER: Group[] = ["clinics", "salons", "agencies", "services"];

// Timing (ms): when each beat appears, the "typing" before an outgoing
// message, and how long the finished scene stays before the next case.
const START = 500;
const TYPING = 800;
const HOLD = 3600;
const stepFor = (b: Beat) => (b.k === "pick" || b.k === "stars" || b.k === "card" ? 1700 : b.k === "sys" ? 1100 : 1500);

function schedule(beats: Beat[]) {
    const at: number[] = [];
    let t = START;
    beats.forEach((b) => {
        if (b.k === "out") t += TYPING;
        at.push(t);
        t += stepFor(b);
    });
    return { at, total: t + HOLD };
}

function useReducedMotion() {
    const [reduce, setReduce] = useState(false);
    useEffect(() => {
        const m = window.matchMedia("(prefers-reduced-motion: reduce)");
        const on = () => setReduce(m.matches);
        on();
        m.addEventListener("change", on);
        return () => m.removeEventListener("change", on);
    }, []);
    return reduce;
}

export default function UseCases({
    cases,
    copy,
    groups,
    initialGroup,
    idPrefix = "uc",
}: {
    cases: UseCase[];
    copy: UseCaseCopy;
    /** Which business filters to offer; none = no filter row. */
    groups?: Group[];
    initialGroup?: Group | "all";
    idPrefix?: string;
}) {
    const offered = useMemo(() => (groups ?? []).filter((g) => GROUP_ORDER.includes(g)), [groups]);
    const [group, setGroup] = useState<Group | "all">(initialGroup ?? (offered[0] || "all"));
    const shown = useMemo(
        () => cases.filter((c) => group === "all" || c.for === "all" || c.for.includes(group)),
        [cases, group],
    );
    const [idx, setIdx] = useState(0);
    const active = shown[Math.min(idx, shown.length - 1)];
    const plan = useMemo(() => schedule(active.beats), [active]);

    const reduce = useReducedMotion();
    const [started, setStarted] = useState(false); // false = show the scene complete
    const [t, setT] = useState(0);
    const [paused, setPaused] = useState(false);
    const [held, setHeld] = useState(false);
    const [visible, setVisible] = useState(false);
    const root = useRef<HTMLDivElement>(null);

    // On screen?
    useEffect(() => {
        const el = root.current;
        if (!el || !("IntersectionObserver" in window)) return;
        const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // The first time it is seen, the scene starts from the beginning.
    useEffect(() => {
        if (visible && !started && !reduce) {
            setStarted(true);
            setT(0);
        }
    }, [visible, started, reduce]);

    const running = started && visible && !paused && !held && !reduce;

    const go = useCallback(
        (i: number) => {
            setIdx(((i % shown.length) + shown.length) % shown.length);
            setT(0);
        },
        [shown.length],
    );

    // The clock.
    useEffect(() => {
        if (!running) return;
        const id = window.setInterval(() => setT((x) => x + 100), 100);
        return () => window.clearInterval(id);
    }, [running]);

    // At the end of a scene: the next case.
    useEffect(() => {
        if (running && t >= plan.total) go(idx + 1);
    }, [t, plan.total, running, go, idx]);

    // In reduced motion, a slow rotation through complete scenes.
    useEffect(() => {
        if (!reduce || paused || held || !visible) return;
        const id = window.setTimeout(() => go(idx + 1), 9000);
        return () => window.clearTimeout(id);
    }, [reduce, paused, held, visible, idx, go]);

    const clock = started && !reduce ? t : Number.POSITIVE_INFINITY;
    const shownBeats = active.beats.filter((_, i) => plan.at[i] <= clock);
    const nextOut = active.beats.findIndex((b, i) => b.k === "out" && plan.at[i] > clock);
    const typing = nextOut >= 0 && clock >= plan.at[nextOut] - TYPING && clock < plan.at[nextOut];
    const progress = started && !reduce ? Math.min(1, t / plan.total) : 1;

    const pick = (i: number) => {
        go(i);
        if (!started) setStarted(true);
    };
    const chooseGroup = (g: Group | "all") => {
        setGroup(g);
        setIdx(0);
        setT(0);
    };

    const Icon = ICONS[active.icon];
    const panelId = `${idPrefix}-panel`;

    return (
        <div ref={root} className="uc" data-motion-off>
            {offered.length > 0 && (
                <div className="uc-groups" role="group" aria-label={copy.all}>
                    {[...offered, "all" as const].map((g) => (
                        <button
                            key={g}
                            type="button"
                            className="uc-group"
                            aria-pressed={group === g}
                            onClick={() => chooseGroup(g)}
                        >
                            {g === "all" ? copy.all : copy.groups[g]}
                        </button>
                    ))}
                </div>
            )}

            <div className="uc-body">
                {/* The cases */}
                <ol className="uc-list" role="tablist" aria-orientation="vertical">
                    {shown.map((c, i) => {
                        const I = ICONS[c.icon];
                        const on = c.id === active.id;
                        return (
                            <li key={c.id} role="presentation">
                                <button
                                    type="button"
                                    role="tab"
                                    id={`${idPrefix}-tab-${c.id}`}
                                    aria-selected={on}
                                    aria-controls={panelId}
                                    className="uc-tab"
                                    onClick={() => pick(i)}
                                >
                                    <span className="uc-tab-icon" aria-hidden="true">
                                        <I size={18} strokeWidth={1.8} />
                                    </span>
                                    <span className="uc-tab-label">{c.label}</span>
                                    {c.extra && <span className="uc-extra">{copy.extraLabel}</span>}
                                    {on && (
                                        <span className="uc-tab-bar" aria-hidden="true">
                                            <span style={{ transform: `scaleX(${progress})` }} />
                                        </span>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ol>

                {/* The scene */}
                <div className="uc-stage">
                    <div
                        className="uc-phone"
                        aria-hidden="true"
                        onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
                        onPointerLeave={(e) => e.pointerType === "mouse" && setHeld(false)}
                    >
                        <div className="uc-phone-top">
                            <span className={"uc-chan uc-chan-" + active.channel}>{copy.channels[active.channel]}</span>
                            <b>{active.screen}</b>
                        </div>
                        <div className="uc-screen" key={active.id}>
                            {shownBeats.map((b, i) => (
                                <BeatView key={i} b={b} copy={copy} />
                            ))}
                            {typing && (
                                <div className="uc-typing">
                                    <i />
                                    <i />
                                    <i />
                                    <span className="sr-only">{copy.typing}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="uc-controls">
                        <button type="button" className="uc-ctl" onClick={() => pick(idx - 1)} aria-label={copy.prev}>
                            <ChevronLeft size={18} />
                        </button>
                        <span className="uc-count" aria-live="off">
                            {Math.min(idx, shown.length - 1) + 1} {copy.of} {shown.length}
                        </span>
                        <button type="button" className="uc-ctl" onClick={() => pick(idx + 1)} aria-label={copy.next}>
                            <ChevronRight size={18} />
                        </button>
                        <button
                            type="button"
                            className="uc-ctl uc-play"
                            onClick={() => setPaused((p) => !p)}
                            aria-pressed={paused}
                        >
                            {paused ? <Play size={15} /> : <Pause size={15} />}
                            <span>{paused ? copy.play : copy.pause}</span>
                        </button>
                    </div>
                </div>

                {/* What it is */}
                <div
                    className="uc-panel"
                    id={panelId}
                    role="tabpanel"
                    aria-labelledby={`${idPrefix}-tab-${active.id}`}
                    key={active.id}
                    onFocus={() => setHeld(true)}
                    onBlur={() => setHeld(false)}
                >
                    <p className="uc-who">
                        <Icon size={16} strokeWidth={1.8} aria-hidden="true" /> {active.who}
                    </p>
                    <h3 className="uc-title">
                        {active.label}
                        {active.extra && <span className="uc-extra">{copy.extraLabel}</span>}
                    </h3>
                    <p className="uc-desc">{active.desc}</p>
                    <p className="uc-result">
                        <span>{copy.resultLabel}</span>
                        {active.result}
                    </p>
                    {active.extra && <p className="uc-extra-note">{copy.extraNote}</p>}
                    <ol className="sr-only">
                        {active.beats.map((b, i) => (
                            <li key={i}>{beatText(b)}</li>
                        ))}
                    </ol>
                </div>
            </div>
            <p className="uc-foot">{copy.example}</p>
        </div>
    );
}

function beatText(b: Beat): string {
    switch (b.k) {
        case "sys":
        case "in":
        case "out":
            return b.text;
        case "card":
            return [b.title, ...b.lines].join(". ");
        case "pick":
            return `${b.title}: ${b.slots[b.chosen]}`;
        case "stars":
            return `${b.label}: 5/5`;
    }
}

function BeatView({ b, copy }: { b: Beat; copy: UseCaseCopy }) {
    switch (b.k) {
        case "sys":
            return <p className="uc-b uc-sys">{b.text}</p>;
        case "in":
            return <p className="uc-b uc-in">{b.text}</p>;
        case "out":
            return (
                <div className="uc-b uc-out">
                    {b.tag && <span className="uc-tag">{b.tag === "reply" ? copy.reply : copy.auto}</span>}
                    {b.text}
                </div>
            );
        case "card":
            return (
                <div className={"uc-b uc-card uc-" + (b.tone || "info")}>
                    <b>
                        {b.title}
                        {b.badge && <span className="uc-badge">{b.badge}</span>}
                    </b>
                    {b.lines.map((l, i) => (
                        <span key={i}>{l}</span>
                    ))}
                </div>
            );
        case "pick":
            return (
                <div className="uc-b uc-card uc-pick">
                    <b>{b.title}</b>
                    <div className="uc-slots">
                        {b.slots.map((s, i) => (
                            <span key={s} className={i === b.chosen ? "uc-slot is-on" : "uc-slot"} style={{ animationDelay: `${0.25 + i * 0.12}s` }}>
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            );
        case "stars":
            return (
                <div className="uc-b uc-card uc-stars">
                    <b>{b.label}</b>
                    <span className="uc-starrow">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <Star key={i} size={20} style={{ animationDelay: `${0.2 + i * 0.15}s` }} />
                        ))}
                    </span>
                </div>
            );
    }
}
