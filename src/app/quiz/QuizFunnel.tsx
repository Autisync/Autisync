"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import BookingWidget from "@/app/components/BookingWidget";
import { FULL_BOOKING_PAGE } from "@/lib/booking";
import { PLANS, PROBLEM_LINE, QUIZ_COPY, type BusinessKind, type ProblemKind, type QuizLang } from "./quizCopy";
import { quizEvent } from "./quizTrack";
import s from "./quiz.module.css";

/**
 * The quiz funnel: three taps, contact details, then a plan for this kind of
 * business with a call to book right there.
 *
 * The lead goes to the CRM (through /api/quiz) as if it had come from the
 * CRM's own quiz funnel, so it arrives tagged by business type with the post
 * or ad it came from, with the answers. The visitor tracker (t.js, in the root
 * layout) is told each step shown and each answer chosen (see quizTrack.ts).
 *
 * Nothing on the page takes a visitor out of the quiz by accident:
 * - the privacy links open a short notice over the quiz; the full policy opens
 *   in a new tab, as do the footer links;
 * - the step and the answers are kept for the visit (sessionStorage), so a
 *   reload, a Back from another page or the language switch carries on where
 *   they were;
 * - each question is a history entry, so the phone's Back button goes to the
 *   previous question rather than off the site.
 */

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const STORE = "autisync.quiz.utm";
// The same in both languages: answers are kept by option id, so switching
// EN/PT keeps them.
const PROGRESS = "autisync.quiz.progress.v1";
const WHATSAPP_URL = "https://wa.me/447795866571";

/** The visit's tags: from this address, else from earlier in the visit. */
function readUtm(): Record<string, string> {
    const here: Record<string, string> = {};
    try {
        const q = new URLSearchParams(window.location.search);
        for (const k of UTM_KEYS) { const v = q.get(k); if (v) here[k] = v.slice(0, 100); }
        if (Object.keys(here).length) { sessionStorage.setItem(STORE, JSON.stringify(here)); return here; }
        const kept = JSON.parse(sessionStorage.getItem(STORE) || "{}");
        return kept && typeof kept === "object" ? kept : {};
    } catch { return here; }
}

type Answers = Record<string, string>;
type Questions = (typeof QUIZ_COPY)["en"]["questions"];

function loadProgress(questions: Questions): { step: number; answers: Answers } | null {
    try {
        const raw = JSON.parse(sessionStorage.getItem(PROGRESS) || "null");
        if (!raw || typeof raw !== "object") return null;
        const answers: Answers = {};
        for (const q of questions) {
            const v = raw.answers?.[q.key];
            if (typeof v === "string" && q.options.some((o) => o.id === v)) answers[q.key] = v;
        }
        return { step: Number.isInteger(raw.step) ? raw.step : 0, answers };
    } catch { return null; }
}
function saveProgress(step: number, answers: Answers) {
    try { sessionStorage.setItem(PROGRESS, JSON.stringify({ step, answers, at: Date.now() })); } catch { /* private mode: carry on */ }
}
function clearProgress() {
    try { sessionStorage.removeItem(PROGRESS); } catch { /* ignore */ }
}

/** The quiz's own keys in the current history entry (quizStep, quizSheet, quizTalk, quizDone). */
type QuizHistory = { quizStep?: number; quizSheet?: number; quizTalk?: number; quizDone?: number };
function historyState(): Record<string, unknown> {
    try { return (window.history.state || {}) as Record<string, unknown>; } catch { return {}; }
}
function quizKeys(): QuizHistory {
    const cur = historyState();
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(cur)) if (k.startsWith("quiz")) out[k] = cur[k];
    return out as QuizHistory;
}
/**
 * A history entry for the same address. Next.js's own keys are carried over,
 * so its router treats Back/Forward between these entries as staying put.
 */
function writeHistory(mode: "push" | "replace", quiz: QuizHistory) {
    try {
        const cur = historyState();
        const next: Record<string, unknown> = {};
        for (const k of Object.keys(cur)) if (!k.startsWith("quiz")) next[k] = cur[k];
        Object.assign(next, quiz);
        if (mode === "push") window.history.pushState(next, ""); else window.history.replaceState(next, "");
    } catch { /* history blocked: the card's Back button still works */ }
}

const EARLY_TAP = `(function(){if(window.__quizEarlyOn)return;window.__quizEarlyOn=1;document.addEventListener('click',function(e){if(window.__quizReady)return;var b=e.target&&e.target.closest&&e.target.closest('[data-q0]');if(!b)return;window.__quizEarly=b.getAttribute('data-q0');b.setAttribute('aria-checked','true');b.style.borderColor='#c9a14a';},true);})();`;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s().-]{7,20}$/;
const MAIL_IN_TEXT = /([\w.+-]+@[\w-]+\.[\w.-]+)/;

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
);
const BackIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
);
const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
);

function withMailLink(text: string): ReactNode {
    const parts = text.split(MAIL_IN_TEXT);
    return parts.map((p, i) => (i % 2 ? <a key={i} href={`mailto:${p}`}>{p}</a> : p));
}

export default function QuizFunnel({ lang }: { lang: QuizLang }) {
    const c = QUIZ_COPY[lang];
    const questions = c.questions;
    const total = questions.length + 1;

    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Answers>({});
    const [contact, setContact] = useState({ nome: "", telefone: "", email: "", website: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [sending, setSending] = useState(false);
    const [sendErr, setSendErr] = useState<string | null>(null);
    const [done, setDone] = useState(false);
    const [ready, setReady] = useState(false);
    const [sheet, setSheet] = useState(false);
    const [talk, setTalk] = useState(false);

    const utm = useRef<Record<string, string>>({});
    const cardRef = useRef<HTMLDivElement | null>(null);
    const resultRef = useRef<HTMLDivElement | null>(null);
    const sheetRef = useRef<HTMLDivElement | null>(null);
    const lastFocus = useRef<HTMLElement | null>(null);
    const shown = useRef<Set<number>>(new Set());
    const stepRef = useRef(0);
    const answersRef = useRef<Answers>({});
    const doneRef = useRef(false);
    const cardBack = useRef(false);
    const movedAt = useRef(0);

    /** The furthest step these answers allow (the first unanswered question, or the contact step). */
    const clampStep = useCallback((n: number, a: Answers) => {
        let furthest = 0;
        while (furthest < questions.length && a[questions[furthest].key]) furthest += 1;
        return Math.max(0, Math.min(n, furthest));
    }, [questions]);

    /** advanced: moved on by an answer, so a second tap in the next moment is ignored. */
    const goTo = useCallback((n: number, advanced = false) => {
        stepRef.current = n;
        if (advanced) movedAt.current = Date.now();
        setStep(n);
    }, []);

    const label = (n: number) => `step ${n + 1}/${total}`;

    const choose = (key: string, id: string, via: "click" | "key" | "early") => {
        const qi = questions.findIndex((q) => q.key === key);
        if (qi < 0 || doneRef.current) return;
        const next = { ...answersRef.current, [key]: id };
        answersRef.current = next;
        setAnswers(next);
        quizEvent("answer", `Answer · ${key}: ${id}`, { question: key, answer: id, step: qi + 1 }, { viaClick: via === "click" });
        window.setTimeout(() => {
            // Moved on meanwhile (a double tap, or Back): don't jump twice.
            if (doneRef.current || stepRef.current !== qi) return;
            const to = Math.min(qi + 1, total - 1);
            writeHistory("push", { quizStep: to });
            goTo(to, true);
        }, 180);
    };

    // Where they were: the history entry (reload, Back from another page),
    // else what this visit kept. Then the history entries for the questions
    // before it, so Back walks back through them.
    useEffect(() => {
        utm.current = readUtm();
        const w = window as unknown as { __quizReady?: boolean; __quizEarly?: string };
        w.__quizReady = true;

        const saved = loadProgress(questions);
        const a = saved?.answers || {};
        const hs = quizKeys();
        let target = 0;
        if (typeof hs.quizStep === "number" && !hs.quizDone) {
            target = clampStep(hs.quizStep, a);
            if (target !== hs.quizStep) writeHistory("replace", { quizStep: target });
        } else {
            target = saved ? clampStep(saved.step, a) : 0;
            writeHistory("replace", { quizStep: 0 });
            for (let i = 1; i <= target; i++) writeHistory("push", { quizStep: i });
        }
        answersRef.current = a;
        setAnswers(a);
        goTo(target);
        if (hs.quizSheet && !hs.quizDone) setSheet(true);
        if (hs.quizTalk && !hs.quizDone) setTalk(true);
        setReady(true);
        if (target > 0 || Object.keys(a).length) {
            quizEvent("resumed", `Quiz resumed at ${label(target)}`, { step: target + 1, answered: Object.keys(a).length });
        }

        // An answer tapped before the page finished loading (slow phone, ad traffic):
        // the small script under the card kept it, so it counts now instead of being lost.
        const early = w.__quizEarly;
        w.__quizEarly = undefined;
        if (early && target === 0 && questions[0]?.options.some((o) => o.id === early)) choose(questions[0].key, early, "early");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Back and Forward: between questions, and closing the notice or the booking panel.
    useEffect(() => {
        const onPop = (e: PopStateEvent) => {
            const st = (e.state || {}) as QuizHistory;
            setSheet(!!st.quizSheet);
            setTalk(!!st.quizTalk);
            if (doneRef.current) {
                // Back from the plan leaves the page, rather than stepping through
                // questions that have already been sent.
                if (!st.quizDone && typeof st.quizStep === "number") window.history.go(-(st.quizStep + 1));
                return;
            }
            const to = clampStep(typeof st.quizStep === "number" ? st.quizStep : 0, answersRef.current);
            if (to !== stepRef.current) {
                if (to < stepRef.current && !cardBack.current) quizEvent("back", `Back to ${label(to)}`, { step: to + 1, how: "browser" });
                goTo(to);
            }
            cardBack.current = false;
        };
        window.addEventListener("popstate", onPop);
        return () => window.removeEventListener("popstate", onPop);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clampStep, goTo]);

    // Kept for the visit, so nothing is lost on a reload or a trip elsewhere.
    useEffect(() => {
        if (ready && !done) saveProgress(step, answers);
    }, [ready, step, answers, done]);

    // Each step shown, once per page load: "Step 2/4 · What gets in the way most?"
    useEffect(() => {
        if (!ready || done || shown.current.has(step)) return;
        shown.current.add(step);
        const title = step < questions.length ? questions[step].title : c.contactTitle;
        quizEvent("step_viewed", `Step ${step + 1}/${total} · ${title}`, { step: step + 1, key: step < questions.length ? questions[step].key : "contact" });
    }, [ready, step, done, questions, total, c.contactTitle]);

    // On a phone the card can sit below the fold after an answer; keep it in view.
    useEffect(() => {
        if (!ready || (step === 0 && !talk)) return;
        const el = cardRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top < 0 || r.top > window.innerHeight * 0.5) el.scrollIntoView({ block: "start", behavior: "smooth" });
    }, [step, talk, ready]);

    useEffect(() => {
        if (done) resultRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    }, [done]);

    // 1–4 on a keyboard answers the question on screen.
    useEffect(() => {
        if (done || sheet || talk || step >= questions.length) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            const tag = (e.target as HTMLElement | null)?.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA") return;
            const i = Number(e.key) - 1;
            const q = questions[step];
            if (i >= 0 && i < q.options.length) choose(q.key, q.options[i].id, "key");
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step, done, sheet, talk, questions]);

    // ── The short privacy notice, over the quiz ──────────────────────────────
    const openSheet = (e: ReactMouseEvent, from: "form" | "footer") => {
        e.preventDefault();
        lastFocus.current = document.activeElement as HTMLElement | null;
        quizEvent("legal_opened", `Privacy notice opened (${from}) · ${doneRef.current ? "plan" : label(stepRef.current)}`, { from, step: stepRef.current + 1 }, { viaClick: true });
        writeHistory("push", { ...quizKeys(), quizSheet: 1 });
        setSheet(true);
    };
    const closeSheet = () => {
        if (quizKeys().quizSheet) window.history.back();
        else setSheet(false);
    };
    useEffect(() => {
        if (!sheet) {
            lastFocus.current?.focus?.();
            return;
        }
        const root = document.documentElement;
        const before = root.style.overflow;
        root.style.overflow = "hidden";
        sheetRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") { e.preventDefault(); closeSheet(); return; }
            if (e.key !== "Tab" || !sheetRef.current) return;
            const f = sheetRef.current.querySelectorAll<HTMLElement>("a[href], button");
            if (!f.length) return;
            const first = f[0], last = f[f.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        };
        window.addEventListener("keydown", onKey);
        return () => { root.style.overflow = before; window.removeEventListener("keydown", onKey); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sheet]);

    // ── "Prefer to talk?": the calendar in place of the questions ───────────
    const openTalk = (e: ReactMouseEvent) => {
        e.preventDefault();
        quizEvent("talk_opened", `Prefer to talk · booking opened · ${label(stepRef.current)}`, { step: stepRef.current + 1 }, { viaClick: true });
        writeHistory("push", { quizStep: stepRef.current, quizTalk: 1 });
        setTalk(true);
    };
    const closeTalk = () => {
        if (quizKeys().quizTalk) window.history.back();
        else setTalk(false);
    };

    const cardBackClick = () => {
        const n = stepRef.current;
        if (n <= 0) return;
        quizEvent("back", `Back to ${label(n - 1)}`, { step: n, how: "card" }, { viaClick: true });
        const hs = quizKeys();
        if (hs.quizStep === n && !hs.quizSheet && !hs.quizTalk) {
            cardBack.current = true;
            window.history.back();
        } else {
            writeHistory("replace", { quizStep: n - 1 });
            goTo(n - 1);
        }
    };

    const check = () => {
        const e: Record<string, string> = {};
        if (contact.nome.trim().length < 2) e.nome = c.errName;
        if (!PHONE.test(contact.telefone.trim()) || contact.telefone.replace(/\D/g, "").length < 7) e.telefone = c.errPhone;
        // Email is optional: a phone (WhatsApp) is enough to reach them, and every
        // extra required field was costing people at this step.
        if (contact.email.trim() && !EMAIL.test(contact.email.trim())) e.email = c.errEmail;
        return e;
    };

    // The answers in the CRM funnel's wording (what /api/quiz and the CRM expect).
    const answerValues = useMemo(() => {
        const out: Record<string, string> = {};
        for (const q of questions) {
            const o = q.options.find((x) => x.id === answers[q.key]);
            if (o) out[q.key] = o.value;
        }
        return out;
    }, [answers, questions]);

    async function submit(ev: FormEvent) {
        ev.preventDefault();
        const e = check();
        setErrors(e);
        if (Object.keys(e).length) return;
        setSending(true);
        setSendErr(null);
        try {
            const r = await fetch("/api/quiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    lang,
                    answers: answerValues,
                    nome: contact.nome.trim(),
                    telefone: contact.telefone.trim(),
                    email: contact.email.trim(),
                    consentimento: "sim",
                    website: contact.website,
                    pagina: window.location.href.slice(0, 300),
                    ...utm.current,
                }),
            });
            const data = await r.json().catch(() => ({}));
            if (!r.ok) {
                setSendErr(r.status === 429 ? c.errBusy : data.error || c.errSend);
                return;
            }
            quizEvent("submitted", "Quiz sent", { ...answersRef.current }, { convert: true });
            clearProgress();
            doneRef.current = true;
            writeHistory("replace", { quizStep: stepRef.current, quizDone: 1 });
            setDone(true);
        } catch {
            setSendErr(c.errSend);
        } finally {
            setSending(false);
        }
    }

    const kind: BusinessKind = (["trades", "property", "beauty", "other"] as const).find((k) => k === answers.business_type) || "other";
    const plan = PLANS[lang][kind];
    const pk: ProblemKind = (["calls", "enquiries", "admin", "website"] as const).find((k) => k === answers.main_problem) || "website";
    const problem = PROBLEM_LINE[lang][pk];
    const prefill = useMemo(() => ({
        name: contact.nome.trim(),
        email: contact.email.trim(),
        phone: contact.telefone.trim(),
        topic: [answerValues.business_type, answerValues.main_problem, answerValues.team_size].filter(Boolean).join(" · "),
    }), [contact, answerValues]);

    const onContact = step === questions.length;
    const q = questions[step];
    const err = (k: string) => (errors[k] ? <p className={s.err} role="alert">{errors[k]}</p> : null);
    const where = done ? "plan" : label(step);

    return (
        <>
            <nav className={s.nav}>
                <div className={`${s.wrap} ${s.navInner}`}>
                    <Link className={s.logo} href={c.home} aria-label={c.homeLabel}>
                        <img src="/crm/autisync-mark-white.svg" alt="" width={45} height={30} />
                        <span>Autisync</span>
                    </Link>
                    <Link className={s.lang} href={c.switchHref} aria-label={c.switchAria} hrefLang={lang === "en" ? "pt" : "en"}>{c.switchLabel}</Link>
                </div>
            </nav>

            <main>
                {!done ? (
                    <section className={s.hero}>
                        <div className={`${s.wrap} ${s.grid}`}>
                            <div className={s.copy}>
                                <p className={s.kicker}>{c.kicker}</p>
                                <h1 className={s.title}>{c.title}</h1>
                                <p className={s.lead}>{c.lead}</p>
                                <ul className={s.promises}>
                                    {c.promises.map((p) => (<li key={p}><CheckIcon />{p}</li>))}
                                </ul>
                            </div>

                            <div className={s.card} ref={cardRef} aria-live="polite">
                                {talk ? (
                                    <div className={s.talkPanel} key="talk">
                                        <div className={s.cardTop}>
                                            <button type="button" className={s.back} onClick={closeTalk} data-track={`Back to the questions · ${label(step)}`}>
                                                <BackIcon />{c.backToQuiz}
                                            </button>
                                            <span />
                                        </div>
                                        <h2 className={`${s.question} ${s.talkTitle}`}>{c.talkTitle}</h2>
                                        <p className={s.talkLead}>{c.talkLead}</p>
                                        <div className={s.talkBook}>
                                            <BookingWidget lang={lang} prefill={{ name: "", email: "", phone: "", topic: Object.values(answerValues).join(" · ") }} />
                                        </div>
                                        <p className={`${s.small} ${s.talkWa}`}>
                                            {c.whatsappPre}
                                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-track={`WhatsApp from quiz · ${label(step)}`}>{c.whatsappLabel}</a>.
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <div className={s.cardTop}>
                                            {step > 0 ? (
                                                <button type="button" className={s.back} onClick={cardBackClick} data-track={`Back to ${label(step - 1)}`}>
                                                    <BackIcon />{c.back}
                                                </button>
                                            ) : <span />}
                                            <span className={s.count}>{onContact ? c.contactStepOf : c.stepOf(step + 1, questions.length)}</span>
                                        </div>
                                        <div className={s.progress} aria-hidden="true">
                                            {Array.from({ length: total }, (_, i) => (<i key={i} className={i <= step ? s.on : undefined} />))}
                                        </div>

                                        <div key={step} className={s.stage}>
                                            {!onContact && q ? (
                                                <fieldset className={s.fieldset}>
                                                    <legend className={s.question}>{q.title}</legend>
                                                    <div className={s.options} role="radiogroup" aria-label={q.title}>
                                                        {q.options.map((o, i) => {
                                                            const on = answers[q.key] === o.id;
                                                            return (
                                                                <button key={o.id} type="button" role="radio" aria-checked={on}
                                                                    data-q0={step === 0 ? o.id : undefined}
                                                                    data-track={`Answer · ${q.key}: ${o.id}`}
                                                                    className={`${s.option} ${on ? s.optionOn : ""}`}
                                                                    onClick={() => {
                                                                        // A second tap landing on the next question
                                                                        // as it appears is not an answer to it.
                                                                        if (Date.now() - movedAt.current < 250) return;
                                                                        choose(q.key, o.id, "click");
                                                                    }}>
                                                                    <span className={s.key} aria-hidden="true">{i + 1}</span>
                                                                    <span className={s.optText}>
                                                                        <span className={s.optLabel}>{o.value}</span>
                                                                        {o.hint ? <span className={s.optHint}>{o.hint}</span> : null}
                                                                    </span>
                                                                    <span className={s.tick} aria-hidden="true">{on ? <CheckIcon /> : null}</span>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                    {step === 0 ? (
                                                        // Before React has loaded, a tap on an answer would do nothing. This keeps
                                                        // the choice and marks it; the component picks it up as soon as it is ready.
                                                        <script dangerouslySetInnerHTML={{ __html: EARLY_TAP }} />
                                                    ) : null}
                                                </fieldset>
                                            ) : (
                                                // data-track-ignore: the tracker's own submit listener would count a
                                                // refused submit as a conversion; "Quiz sent" is sent once it is saved.
                                                <form noValidate onSubmit={submit} data-track-ignore="" className={s.form}>
                                                    <h2 className={s.question}>{c.contactTitle}</h2>
                                                    {/* What they get, before they are asked for anything: the plan for their kind of business. */}
                                                    <p className={s.teaser}><span>{c.teaser}</span> {plan.title}</p>
                                                    <p className={s.hint}>{c.contactHint}</p>
                                                    <div aria-hidden="true" className={s.trap}>
                                                        <label>Website<input tabIndex={-1} autoComplete="off" value={contact.website} onChange={(e) => setContact((p) => ({ ...p, website: e.target.value }))} /></label>
                                                    </div>
                                                    <label className={s.field}>
                                                        <span>{c.name}</span>
                                                        <input autoComplete="name" value={contact.nome} aria-invalid={!!errors.nome}
                                                            onChange={(e) => setContact((p) => ({ ...p, nome: e.target.value }))} />
                                                        {err("nome")}
                                                    </label>
                                                    <div className={s.pair}>
                                                        <label className={s.field}>
                                                            <span>{c.phone}</span>
                                                            <input type="tel" inputMode="tel" autoComplete="tel" value={contact.telefone} aria-invalid={!!errors.telefone}
                                                                onChange={(e) => setContact((p) => ({ ...p, telefone: e.target.value }))} />
                                                            {err("telefone")}
                                                        </label>
                                                        <label className={s.field}>
                                                            <span>{c.email}</span>
                                                            <input type="email" inputMode="email" autoComplete="email" value={contact.email} aria-invalid={!!errors.email}
                                                                onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))} />
                                                            {err("email")}
                                                        </label>
                                                    </div>
                                                    <button type="submit" className={s.submit} disabled={sending}>{sending ? c.sending : c.submit}</button>
                                                    {sendErr ? <p className={s.err} role="alert">{sendErr}</p> : null}
                                                    {/* Contact about the results they asked for: stated next to the button that sends.
                                                        The notice opens over the quiz; the full policy, from there, in a new tab. */}
                                                    <p className={s.small}>
                                                        {c.consent}{" "}
                                                        <a href={c.privacyHref} target="_blank" rel="noopener" onClick={(e) => openSheet(e, "form")}
                                                            data-track={`Privacy notice opened (form) · ${where}`}>{c.privacyLink}</a>.
                                                    </p>
                                                </form>
                                            )}
                                        </div>

                                        {/* For people who would rather not do a quiz. */}
                                        <p className={s.talk}>
                                            {c.talkPrompt}{" "}
                                            <a href={FULL_BOOKING_PAGE} target="_blank" rel="noopener" onClick={openTalk}
                                                data-track={`Prefer to talk · booking opened · ${label(step)}`}>{c.talkLink}</a>
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className={s.result} ref={resultRef}>
                        <div className={`${s.wrap} ${s.resultGrid}`}>
                            <div className={s.plan}>
                                <p className={s.kicker}>{c.resultKicker}</p>
                                <h1 className={s.planTitle}>{plan.title}</h1>
                                <p className={s.lead}>{plan.lead}</p>
                                <ul className={s.points}>
                                    {plan.points.map((p) => (
                                        <li key={p.t}>
                                            <span className={s.pointIcon}><CheckIcon /></span>
                                            <span><strong>{p.t}</strong>{p.d}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className={s.callout}>{problem}</p>
                            </div>
                            <div className={s.book} id="book">
                                <h2 className={s.bookTitle}>{c.bookTitle}</h2>
                                <p className={s.bookLead}>{c.bookLead}</p>
                                <BookingWidget lang={lang} prefill={prefill} />
                                <p className={s.small}>{c.bookPre}</p>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            {/* Nothing here leaves the quiz: the notice opens over it, the rest in a new tab. */}
            <footer className={s.footer}>
                <div className={`${s.wrap} ${s.footInner}`}>
                    <span>© {new Date().getFullYear()} {c.footer}</span>
                    <span className={s.footLinks}>
                        <a href={c.privacyHref} target="_blank" rel="noopener" onClick={(e) => openSheet(e, "footer")}
                            data-track={`Privacy notice opened (footer) · ${where}`}>{c.footPrivacy}</a>
                        <a href={c.termsHref} target="_blank" rel="noopener" data-track={`Terms of use opened · ${where}`}>{c.terms}</a>
                    </span>
                </div>
            </footer>

            {sheet ? (
                <div className={s.sheetWrap}>
                    <div className={s.sheetBack} onClick={closeSheet} aria-hidden="true" />
                    <div className={s.sheet} role="dialog" aria-modal="true" aria-labelledby="quiz-notice-title" ref={sheetRef}>
                        <div className={s.sheetHead}>
                            <h2 id="quiz-notice-title" className={s.sheetTitle}>{c.notice.title}</h2>
                            <button type="button" className={s.sheetX} onClick={closeSheet} aria-label={c.notice.closeAria} data-track={`Privacy notice closed · ${where}`}>
                                <CloseIcon />
                            </button>
                        </div>
                        <dl className={s.notice}>
                            {c.notice.rows.map(([t, d]) => (
                                <div key={t}>
                                    <dt>{t}</dt>
                                    <dd>{withMailLink(d)}</dd>
                                </div>
                            ))}
                        </dl>
                        <a className={s.noticeFull} href={c.privacyHref} target="_blank" rel="noopener"
                            data-track={`Full privacy policy opened · ${where}`}
                            onClick={() => quizEvent("full_policy_opened", `Full privacy policy opened · ${where}`, { step: stepRef.current + 1 }, { viaClick: true })}>
                            {c.notice.full} <span>{c.newTab}</span>
                        </a>
                        <button type="button" className={s.submit} onClick={closeSheet} data-autofocus="" data-track={`Privacy notice closed · ${where}`}>
                            {done ? c.notice.closeDone : c.notice.close}
                        </button>
                    </div>
                </div>
            ) : null}
        </>
    );
}
