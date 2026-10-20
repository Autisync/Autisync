"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import BookingWidget from "@/app/components/BookingWidget";
import { PLANS, PROBLEM_LINE, QUIZ_COPY, businessKind, problemKind, type QuizLang } from "./quizCopy";
import s from "./quiz.module.css";

/**
 * The quiz funnel: three taps, contact details, then a plan for this kind of
 * business with a call to book right there.
 *
 * The lead goes to the CRM (through /api/quiz) as if it had come from the
 * CRM's own quiz funnel, so it arrives tagged by business type with the post
 * or ad it came from. The visitor tracker (t.js, in the root layout) is told
 * each question reached, so the Visitors report shows where people stop.
 */

type Track = (type: "click" | "convert", label: string) => void;
const track: Track = (type, label) => {
    try { (window as unknown as { autisyncTrack?: Track }).autisyncTrack?.(type, label); } catch { /* never break the page */ }
};

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const STORE = "autisync.quiz.utm";

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

const EARLY_TAP = `(function(){if(window.__quizEarlyOn)return;window.__quizEarlyOn=1;document.addEventListener('click',function(e){if(window.__quizReady)return;var b=e.target&&e.target.closest&&e.target.closest('[data-q0]');if(!b)return;window.__quizEarly=b.getAttribute('data-q0');b.setAttribute('aria-checked','true');b.style.borderColor='#c9a14a';},true);})();`;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s().-]{7,20}$/;

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
);
const BackIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
);

export default function QuizFunnel({ lang }: { lang: QuizLang }) {
    const c = QUIZ_COPY[lang];
    const questions = c.questions;
    const total = questions.length + 1;

    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [contact, setContact] = useState({ nome: "", telefone: "", email: "", consent: false, website: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [sending, setSending] = useState(false);
    const [sendErr, setSendErr] = useState<string | null>(null);
    const [done, setDone] = useState(false);
    const utm = useRef<Record<string, string>>({});
    const cardRef = useRef<HTMLDivElement | null>(null);
    const resultRef = useRef<HTMLDivElement | null>(null);
    const shown = useRef<Set<number>>(new Set([0]));

    useEffect(() => { utm.current = readUtm(); }, []);

    // An answer tapped before the page finished loading (slow phone, ad traffic):
    // the small script under the card kept it, so it counts now instead of being lost.
    useEffect(() => {
        const w = window as unknown as { __quizReady?: boolean; __quizEarly?: string };
        w.__quizReady = true;
        const early = w.__quizEarly;
        if (early && questions[0]?.options.some((o) => o.value === early)) {
            w.__quizEarly = undefined;
            choose(questions[0].key, early);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Each question reached, once per visit: "Step 2/4 · What gets in the way most?"
    useEffect(() => {
        if (done || shown.current.has(step)) return;
        shown.current.add(step);
        const title = step < questions.length ? questions[step].title : c.contactTitle;
        track("click", `Step ${step + 1}/${total} · ${title}`);
    }, [step, done, questions, total, c.contactTitle]);

    // On a phone the card can sit below the fold after an answer; keep it in view.
    useEffect(() => {
        if (step === 0) return;
        const el = cardRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top < 0 || r.top > window.innerHeight * 0.5) el.scrollIntoView({ block: "start", behavior: "smooth" });
    }, [step]);

    useEffect(() => {
        if (done) resultRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    }, [done]);

    const choose = (key: string, value: string) => {
        setAnswers((p) => ({ ...p, [key]: value }));
        window.setTimeout(() => setStep((n) => Math.min(n + 1, total - 1)), 180);
    };

    // 1–4 on a keyboard answers the question on screen.
    useEffect(() => {
        if (done || step >= questions.length) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            const tag = (e.target as HTMLElement | null)?.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA") return;
            const i = Number(e.key) - 1;
            const q = questions[step];
            if (i >= 0 && i < q.options.length) choose(q.key, q.options[i].value);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step, done, questions]);

    const check = () => {
        const e: Record<string, string> = {};
        if (contact.nome.trim().length < 2) e.nome = c.errName;
        if (!PHONE.test(contact.telefone.trim()) || contact.telefone.replace(/\D/g, "").length < 7) e.telefone = c.errPhone;
        // Email is optional: a phone (WhatsApp) is enough to reach them, and every
        // extra required field was costing people at this step.
        if (contact.email.trim() && !EMAIL.test(contact.email.trim())) e.email = c.errEmail;
        return e;
    };

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
                    answers,
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
            track("convert", "Quiz sent");
            setDone(true);
        } catch {
            setSendErr(c.errSend);
        } finally {
            setSending(false);
        }
    }

    const kind = businessKind(answers.business_type || "");
    const plan = PLANS[lang][kind];
    const problem = PROBLEM_LINE[lang][problemKind(answers.main_problem || "")];
    const prefill = useMemo(() => ({
        name: contact.nome.trim(),
        email: contact.email.trim(),
        phone: contact.telefone.trim(),
        topic: [answers.business_type, answers.main_problem, answers.team_size].filter(Boolean).join(" · "),
    }), [contact, answers]);

    const onContact = step === questions.length;
    const q = questions[step];
    const err = (k: string) => (errors[k] ? <p className={s.err} role="alert">{errors[k]}</p> : null);

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
                                <div className={s.cardTop}>
                                    {step > 0 ? (
                                        <button type="button" className={s.back} onClick={() => setStep((n) => Math.max(0, n - 1))}>
                                            <BackIcon />{c.back}
                                        </button>
                                    ) : <span />}
                                    <span className={s.count}>{onContact ? c.contactStepOf(total) : c.stepOf(step + 1, total)}</span>
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
                                                    const on = answers[q.key] === o.value;
                                                    return (
                                                        <button key={o.value} type="button" role="radio" aria-checked={on}
                                                            data-q0={step === 0 ? o.value : undefined}
                                                            className={`${s.option} ${on ? s.optionOn : ""}`} onClick={() => choose(q.key, o.value)}>
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
                                            {/* Contact about the results they asked for: stated next to the button that sends. */}
                                            <p className={s.small}>{c.consent}</p>
                                            {sendErr ? <p className={s.err} role="alert">{sendErr}</p> : null}
                                            <p className={s.small}>{c.privacyPre}<Link href={c.privacyHref}>{c.privacyLabel}</Link>.</p>
                                        </form>
                                    )}
                                </div>
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

            <footer className={s.footer}>
                <div className={`${s.wrap} ${s.footInner}`}>
                    <span>© {new Date().getFullYear()} {c.footer}</span>
                    <span className={s.footLinks}>
                        <Link href={c.privacyHref}>{c.footPrivacy}</Link>
                        <Link href={c.termsHref}>{c.terms}</Link>
                    </span>
                </div>
            </footer>
        </>
    );
}
