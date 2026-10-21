"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    type Availability, type Service, type Slot,
    FULL_BOOKING_PAGE, dayKey, generateSlots, isOpenDay,
} from "@/lib/booking";
import LegalLink from "./LegalLink";
import w from "./BookingWidget.module.css";

/**
 * Autisync's own booking section: pick what the call is about, a day this
 * week, a time, then your details. Talks to the Autisync CRM through
 * /api/booking/*, so the booking lands in the CRM (client, booking,
 * confirmation email) exactly as it did from the old embedded page.
 */
type Lang = "en" | "pt";

const COPY = {
    en: {
        steps: ["Service", "Date & time", "Your details", "Confirm"],
        stepOf: (n: number) => `Step ${n} of 4`, complete: (p: number) => `${p}% complete`,
        loading: "Loading the calendar…",
        down: "The calendar isn't loading right now.", openFull: "Open the booking page",
        free: "Free", chooseTime: "Choose a time",
        prevWeek: "Earlier days", nextWeek: "Later days",
        closed: "Closed", full: "Full", none: "No times", today: "Today", freeN: (n: number) => `${n} free`,
        pickDay: "Pick a day to see free times.", noTimes: "No free times on this day. Try another day.",
        tz: (z: string) => `Times shown in ${z} time`,
        cont: "Continue", back: "Back",
        name: "Your name", email: "Email", phone: "Phone or WhatsApp", optional: "optional",
        company: "Business name or website", topic: "What would you like to talk about?",
        topicPh: "e.g. a new website with online booking, or moving our clients into a CRM",
        review: "Review booking", needName: "Please add your name.", needEmail: "That email address doesn't look right.",
        summary: "Check the details", what: "Call", when: "When", who: "Name", mail: "Email",
        confirm: "Confirm booking", sending: "Booking…",
        doneTitle: "You're booked.",
        doneText: (e: string) => `We've sent a confirmation to ${e}. To change the time, use the link in that email.`,
        another: "Book another time",
        paid: "This one is paid in advance, on a secure payment page.", payBtn: "Continue to payment",
        powered: "Bookings go straight into the Autisync CRM",
        privacyPre: "We use these details only to book and hold the call. ", privacyLink: "How we use your details", privacyHref: "/PrivacyPolicy",
        durations: (m: number) => (m % 60 === 0 ? `${m / 60} hour${m === 60 ? "" : "s"}` : m > 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m} min`),
    },
    pt: {
        steps: ["Serviço", "Data e hora", "Os seus dados", "Confirmar"],
        stepOf: (n: number) => `Passo ${n} de 4`, complete: (p: number) => `${p}% concluído`,
        loading: "A carregar o calendário…",
        down: "O calendário não está a carregar.", openFull: "Abrir a página de marcação",
        free: "Gratuito", chooseTime: "Escolher horário",
        prevWeek: "Dias anteriores", nextWeek: "Dias seguintes",
        closed: "Fechado", full: "Cheio", none: "Sem horas", today: "Hoje", freeN: (n: number) => `${n} livres`,
        pickDay: "Escolha um dia para ver os horários livres.", noTimes: "Sem horários livres neste dia. Experimente outro dia.",
        tz: (z: string) => `Horas de ${z}`,
        cont: "Continuar", back: "Voltar",
        name: "O seu nome", email: "E-mail", phone: "Telefone ou WhatsApp", optional: "opcional",
        company: "Empresa ou website", topic: "Sobre o que gostaria de falar?",
        topicPh: "ex.: um website novo com marcações online, ou passar os clientes para um CRM",
        review: "Rever marcação", needName: "Indique o seu nome, por favor.", needEmail: "Esse e-mail não parece correto.",
        summary: "Confirme os dados", what: "Chamada", when: "Quando", who: "Nome", mail: "E-mail",
        confirm: "Confirmar marcação", sending: "A marcar…",
        doneTitle: "Está marcado.",
        doneText: (e: string) => `Enviámos a confirmação para ${e}. Para mudar o horário, use o link nesse e-mail.`,
        another: "Marcar outro horário",
        paid: "Este serviço é pago antecipadamente, numa página de pagamento segura.", payBtn: "Continuar para pagamento",
        powered: "As marcações entram diretamente no Autisync CRM",
        privacyPre: "Usamos estes dados apenas para marcar e fazer a chamada. ", privacyLink: "Como usamos os seus dados", privacyHref: "/pt/privacidade",
        durations: (m: number) => (m % 60 === 0 ? `${m / 60} hora${m === 60 ? "" : "s"}` : m > 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m} min`),
    },
} as const;

type Ymd = { y: number; m: number; d: number };

/** Today's date where the business is. */
function todayIn(timeZone: string): Ymd {
    const p = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()).split("-").map(Number);
    return { y: p[0], m: p[1], d: p[2] };
}
const addDays = ({ y, m, d }: Ymd, n: number): Ymd => {
    const t = new Date(Date.UTC(y, m - 1, d + n));
    return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
};
const keyOf = (x: Ymd) => dayKey(x.y, x.m, x.d);
const zoneCity = (tz: string) => (tz === "Europe/Lisbon" || tz === "Europe/London" ? "UK & Portugal" : tz.split("/").pop()!.replace(/_/g, " "));

function money(price: string | null, currency: string, lang: Lang) {
    const n = Number(price);
    if (!price || !Number.isFinite(n) || n <= 0) return null;
    try { return new Intl.NumberFormat(lang === "pt" ? "pt-PT" : "en-GB", { style: "currency", currency, maximumFractionDigits: n % 1 ? 2 : 0 }).format(n); }
    catch { return `${n} ${currency}`; }
}

/**
 * The booking in progress, kept for the visit (sessionStorage), so a visitor
 * who opens another page (a legal page, a reload, Back from somewhere else)
 * comes back to the same step, call, day, time and details. One booking per
 * visit, whichever page the calendar is on: they all book the same calendar.
 * Cleared once the booking is made.
 */
const PROGRESS = "autisync.booking.v1";
type Details = { name: string; email: string; phone: string; company: string; topic: string };
type SavedBooking = {
    step: number; serviceId: string | null; day: Ymd | null;
    slot: { starts: string; ends: string; label: string } | null; form: Partial<Details>;
};

function loadBooking(): SavedBooking | null {
    try {
        const raw = JSON.parse(sessionStorage.getItem(PROGRESS) || "null");
        return raw && typeof raw === "object" ? (raw as SavedBooking) : null;
    } catch { return null; }
}
function saveBooking(b: SavedBooking) {
    try { sessionStorage.setItem(PROGRESS, JSON.stringify({ ...b, at: Date.now() })); } catch { /* private mode: carry on */ }
}
function clearBooking() {
    try { sessionStorage.removeItem(PROGRESS); } catch { /* ignore */ }
}
const isYmd = (x: unknown): x is Ymd =>
    !!x && typeof x === "object" && ["y", "m", "d"].every((k) => Number.isInteger((x as Record<string, unknown>)[k]));
const daysBetween = (a: Ymd, b: Ymd) => Math.round((Date.UTC(b.y, b.m - 1, b.d) - Date.UTC(a.y, a.m - 1, a.d)) / 86_400_000);

export interface BookingPrefill { name?: string; email?: string; phone?: string; company?: string; topic?: string }

/** prefill: details the visitor has already given on this page (the quiz), so they are not asked twice. */
/** preferMinutes: start on the free service of that length ("Book a free 15-minute call"), when there is one. */
export default function BookingWidget({ lang = "en", prefill, preferMinutes }: { lang?: Lang; prefill?: BookingPrefill; preferMinutes?: number }) {
    const t = COPY[lang];
    const locale = lang === "pt" ? "pt-PT" : "en-GB";

    const [base, setBase] = useState<Availability | null>(null);
    const [failed, setFailed] = useState(false);
    const [days, setDays] = useState<Record<string, Availability | "error">>({});
    const [step, setStep] = useState(1);
    const [service, setService] = useState<Service | null>(null);
    const [offset, setOffset] = useState(0);
    const [day, setDay] = useState<Ymd | null>(null);
    const [slot, setSlot] = useState<Slot | null>(null);
    const [form, setForm] = useState({
        name: prefill?.name || "", email: prefill?.email || "", phone: prefill?.phone || "",
        company: prefill?.company || "", topic: prefill?.topic || "", website: "",
    });
    const [formErr, setFormErr] = useState<string | null>(null);
    const [sending, setSending] = useState(false);
    const [sendErr, setSendErr] = useState<string | null>(null);
    const [done, setDone] = useState<{ email: string; slot: Slot } | null>(null);
    const topRef = useRef<HTMLDivElement | null>(null);

    const tz = base?.calendar.timezone || "Europe/London";
    const today = useMemo(() => todayIn(tz), [tz]);

    const load = useCallback(async (date: string): Promise<Availability> => {
        const r = await fetch(`/api/booking/availability?date=${date}`, { cache: "no-store" });
        if (!r.ok) throw new Error("unavailable");
        return r.json();
    }, []);

    // The calendar's hours and services come with any day's answer; start with today's.
    useEffect(() => {
        load(keyOf(todayIn("Europe/London")))
            .then((a) => {
                setBase(a);
                // Pick up a booking started earlier in the visit, as far as it still holds.
                const saved = loadBooking();
                const svc = (saved?.serviceId && a.services.find((s) => s.id === saved.serviceId)) || (a.services.length === 1 ? a.services[0] : null)
                    || (preferMinutes ? a.services.find((s) => s.duration_minutes === preferMinutes && !s.is_paid) || null : null);
                if (svc) setService(svc);
                if (!saved) return;
                const kept: Partial<Details> = {};
                for (const k of ["name", "email", "phone", "company", "topic"] as const) {
                    const v = saved.form?.[k];
                    if (typeof v === "string" && v) kept[k] = v;
                }
                setForm((f) => ({ ...f, ...kept }));
                if (!svc) return;
                const now = todayIn(a.calendar.timezone || "Europe/London");
                const ahead = isYmd(saved.day) ? daysBetween(now, saved.day) : -1;
                const dayOk = ahead >= 0 && ahead < 56;
                const starts = saved.slot ? new Date(saved.slot.starts) : null;
                const slotOk = dayOk && !!saved.slot && !!starts && starts.getTime() > Date.now();
                if (dayOk && saved.day) {
                    setOffset(Math.floor(ahead / 7));
                    setDay(saved.day);
                }
                if (slotOk && saved.slot && starts) setSlot({ starts, ends: new Date(saved.slot.ends), label: saved.slot.label });
                const st = Number.isInteger(saved.step) ? Math.max(1, Math.min(saved.step, 4)) : 1;
                setStep(slotOk ? st : Math.min(st, 2));
            })
            .catch(() => setFailed(true));
    }, [load]);

    // Keep the booking in progress for the visit (see PROGRESS).
    useEffect(() => {
        if (!base || done) return;
        const { name, email, phone, company, topic } = form;
        const typed = [name, email, phone, company, topic].some((v) => v.trim());
        if (step === 1 && !typed) { clearBooking(); return; }
        saveBooking({
            step, serviceId: service?.id ?? null, day,
            slot: slot ? { starts: slot.starts.toISOString(), ends: slot.ends.toISOString(), label: slot.label } : null,
            form: { name, email, phone, company, topic },
        });
    }, [base, done, step, service, day, slot, form]);

    const week = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(today, offset * 7 + i)), [today, offset]);

    // Fetch the visible week's bookings so full days can say so before they're clicked.
    useEffect(() => {
        if (!base || step !== 2) return;
        week.forEach((x) => {
            const k = keyOf(x);
            if (days[k] || !isOpenDay(base.calendar.availabilityRules, x.y, x.m, x.d)) return;
            load(k).then((a) => setDays((s) => ({ ...s, [k]: a }))).catch(() => setDays((s) => ({ ...s, [k]: "error" })));
        });
    }, [base, step, week, days, load]);

    const duration = service?.duration_minutes || 30;
    const slotsFor = useCallback((x: Ymd): Slot[] | null => {
        const a = days[keyOf(x)];
        if (!base || !a || a === "error") return null;
        return generateSlots(x.y, x.m, x.d, base.calendar.availabilityRules, a.bookedSlots, duration, tz);
    }, [base, days, duration, tz]);

    const daySlots = day ? slotsFor(day) : null;

    // First open day with free times becomes the default choice on the date step.
    useEffect(() => {
        if (step !== 2 || day || !base) return;
        const first = week.find((x) => (slotsFor(x)?.length ?? 0) > 0);
        if (first) setDay(first);
    }, [step, day, base, week, slotsFor]);

    const go = (n: number) => {
        setStep(n);
        setSendErr(null);
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };

    const fmtDay = (x: Ymd, opts: Intl.DateTimeFormatOptions) =>
        new Intl.DateTimeFormat(locale, { timeZone: "UTC", ...opts }).format(new Date(Date.UTC(x.y, x.m - 1, x.d, 12)));
    const fmtWhen = (s: Slot) =>
        `${new Intl.DateTimeFormat(locale, { timeZone: tz, weekday: "long", day: "numeric", month: "long" }).format(s.starts)}, ${s.label}–${new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit" }).format(s.ends)}`;

    const checkDetails = () => {
        if (form.name.trim().length < 2) return setFormErr(t.needName);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) return setFormErr(t.needEmail);
        setFormErr(null);
        go(4);
    };

    const submit = async () => {
        if (!service || !slot || !base) return;
        setSending(true);
        setSendErr(null);
        const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
        const notes = [form.topic.trim(), form.company.trim() && `Business: ${form.company.trim()}`, `Booked on ${typeof window !== "undefined" ? window.location.pathname : "autisync.com"}`]
            .filter(Boolean).join("\n\n");
        try {
            const r = await fetch("/api/booking/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), notes,
                    startsAt: slot.starts.toISOString(), endsAt: slot.ends.toISOString(),
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    serviceId: service.id, locationId: base.selectedLocationId || undefined, language: lang,
                    utm_source: params?.get("utm_source") || undefined, utm_medium: params?.get("utm_medium") || undefined,
                    utm_campaign: params?.get("utm_campaign") || undefined, website: form.website,
                }),
            });
            const data = await r.json().catch(() => ({}));
            if (r.ok) {
                clearBooking();
                setDone({ email: form.email.trim(), slot });
                // Counted as a conversion in the CRM's Visitors reports (when the tracker is on the page).
                try { (window as unknown as { autisyncTrack?: (t: string, l: string) => void }).autisyncTrack?.("convert", `Booked: ${service.name}`); } catch { /* never block a booking */ }
                topRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                return;
            }
            setSendErr(data.error || t.down);
            if (data.taken && day) {
                // Refresh that day so the taken time disappears, and send them back to pick.
                const k = keyOf(day);
                load(k).then((a) => setDays((s) => ({ ...s, [k]: a }))).catch(() => {});
                setSlot(null);
                setStep(2);
            }
        } catch {
            setSendErr(t.down);
        } finally {
            setSending(false);
        }
    };

    const fallback = (
        <p className={w.muted}>{t.down} <a href={FULL_BOOKING_PAGE} target="_blank" rel="noopener noreferrer">{t.openFull} →</a></p>
    );

    if (failed) return <div data-wa-avoid className={w.widget}><div className={w.body}>{fallback}</div></div>;
    if (!base) {
        return (
            <div data-wa-avoid className={w.widget} aria-busy="true">
                <div className={w.body}><div className={w.skeleton} /><div className={w.skeleton} /><p className={w.muted}>{t.loading}</p></div>
            </div>
        );
    }

    if (done) {
        return (
            <div data-wa-avoid className={w.widget} ref={topRef}>
                <div className={`${w.body} ${w.done}`} role="status">
                    <span className={w.tick} aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    </span>
                    <h3>{t.doneTitle}</h3>
                    <p className={w.when}>{fmtWhen(done.slot)}</p>
                    <p className={w.muted}>{t.doneText(done.email)}</p>
                    <button type="button" className={w.ghost} onClick={() => { setDone(null); setSlot(null); setStep(2); }}>{t.another}</button>
                </div>
            </div>
        );
    }

    const pct = step * 25;
    const price = service ? money(service.price, service.currency, lang) : null;
    const paid = !!(service?.is_paid && price);

    return (
        <div data-wa-avoid className={w.widget} ref={topRef}>
            <div className={w.progress}>
                <div className={w.progressTop}><span>{t.stepOf(step)}</span><span>{t.complete(pct)}</span></div>
                <div className={w.bar}><i style={{ width: `${pct}%` }} /></div>
                <ol className={w.dots}>
                    {t.steps.map((label, i) => {
                        const n = i + 1;
                        const reachable = n < step;
                        return (
                            <li key={label} data-state={n === step ? "now" : n < step ? "done" : "next"}>
                                <button type="button" disabled={!reachable} onClick={() => reachable && go(n)} aria-current={n === step ? "step" : undefined}>
                                    <span className={w.dot}>{n < step ? "✓" : n}</span>
                                    <span className={w.dotLabel}>{label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ol>
            </div>

            <div className={w.body}>
                {step === 1 && (
                    <>
                        <div className={w.list} role="radiogroup" aria-label={t.steps[0]}>
                            {base.services.map((s) => {
                                const p = money(s.price, s.currency, lang);
                                const on = service?.id === s.id;
                                return (
                                    <button type="button" role="radio" aria-checked={on} key={s.id} className={w.option} onClick={() => { setService(s); setSlot(null); }}>
                                        <span className={w.optMain}>
                                            <b>{s.name}</b>
                                            <small>{t.durations(s.duration_minutes)}</small>
                                            {s.description && on && <span className={w.desc}>{s.description}</span>}
                                        </span>
                                        <span className={w.price}>{p ?? t.free}</span>
                                    </button>
                                );
                            })}
                        </div>
                        <button type="button" className={w.primary} disabled={!service} onClick={() => go(2)}>{t.chooseTime} →</button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className={w.weekHead}>
                            <b>{fmtDay(week[0], { month: "long", year: "numeric" })}</b>
                            <span>
                                <button type="button" className={w.arrow} aria-label={t.prevWeek} disabled={offset === 0} onClick={() => { setOffset((o) => o - 1); setDay(null); setSlot(null); }}>‹</button>
                                <button type="button" className={w.arrow} aria-label={t.nextWeek} disabled={offset >= 7} onClick={() => { setOffset((o) => o + 1); setDay(null); setSlot(null); }}>›</button>
                            </span>
                        </div>
                        <div className={w.days} role="radiogroup" aria-label={t.steps[1]}>
                            {week.map((x) => {
                                const open = isOpenDay(base.calendar.availabilityRules, x.y, x.m, x.d);
                                const s = open ? slotsFor(x) : [];
                                const full = open && s !== null && s.length === 0;
                                const on = !!day && keyOf(day) === keyOf(x);
                                const isToday = keyOf(x) === keyOf(today);
                                return (
                                    <button type="button" role="radio" aria-checked={on} key={keyOf(x)} className={w.day} disabled={!open || full}
                                        onClick={() => { setDay(x); setSlot(null); }}>
                                        <small>{isToday ? t.today : fmtDay(x, { weekday: "short" })}</small>
                                        <b>{x.d}</b>
                                        <em>{!open ? t.closed : full ? (isToday ? t.none : t.full) : s === null ? "·" : t.freeN(s.length)}</em>
                                    </button>
                                );
                            })}
                        </div>

                        {!day ? (
                            <p className={w.muted}>{t.pickDay}</p>
                        ) : daySlots === null ? (
                            <div className={w.slots}>{Array.from({ length: 6 }, (_, i) => <span key={i} className={w.slotGhost} />)}</div>
                        ) : daySlots.length === 0 ? (
                            <p className={w.muted}>{t.noTimes}</p>
                        ) : (
                            <>
                                <div className={w.slots} role="radiogroup" aria-label={fmtDay(day, { weekday: "long", day: "numeric", month: "long" })}>
                                    {daySlots.map((s) => (
                                        <button type="button" role="radio" aria-checked={slot?.starts.getTime() === s.starts.getTime()} key={s.starts.toISOString()} className={w.slot} onClick={() => setSlot(s)}>
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                                <p className={w.note}>{t.tz(zoneCity(tz))} · {t.durations(duration)}</p>
                            </>
                        )}
                        {sendErr && <p className={w.error} role="alert">{sendErr}</p>}
                        <div className={w.actions}>
                            <button type="button" className={w.ghost} onClick={() => go(1)}>{t.back}</button>
                            <button type="button" className={w.primary} disabled={!slot} onClick={() => go(3)}>{t.cont} →</button>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <form className={w.form} noValidate onSubmit={(e) => { e.preventDefault(); checkDetails(); }}>
                        <div className={w.two}>
                            <label>{t.name}<input id="bk-name" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
                            <label>{t.email}<input id="bk-email" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
                            <label><span>{t.phone} <i>({t.optional})</i></span><input id="bk-phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
                            <label><span>{t.company} <i>({t.optional})</i></span><input id="bk-company" autoComplete="organization" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></label>
                        </div>
                        <label><span>{t.topic} <i>({t.optional})</i></span><textarea id="bk-topic" rows={3} placeholder={t.topicPh} value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} /></label>
                        <input className={w.hp} tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
                        {formErr && <p className={w.error} role="alert">{formErr}</p>}
                        <div className={w.actions}>
                            <button type="button" className={w.ghost} onClick={() => go(2)}>{t.back}</button>
                            <button type="submit" className={w.primary}>{t.review} →</button>
                        </div>
                    </form>
                )}

                {step === 4 && service && slot && (
                    <>
                        <h3 className={w.h3}>{t.summary}</h3>
                        <dl className={w.summary}>
                            <div><dt>{t.what}</dt><dd>{service.name} · {t.durations(service.duration_minutes)}{price ? ` · ${price}` : ""}</dd></div>
                            <div><dt>{t.when}</dt><dd>{fmtWhen(slot)} <small>({zoneCity(tz)})</small></dd></div>
                            <div><dt>{t.who}</dt><dd>{form.name}</dd></div>
                            <div><dt>{t.mail}</dt><dd>{form.email}</dd></div>
                        </dl>
                        <p className={w.note}>
                            {t.privacyPre}
                            <LegalLink href={t.privacyHref} track="Privacy policy opened · booking">{t.privacyLink}</LegalLink>.
                        </p>
                        {sendErr && <p className={w.error} role="alert">{sendErr}</p>}
                        {paid ? (
                            <>
                                <p className={w.muted}>{t.paid}</p>
                                <div className={w.actions}>
                                    <button type="button" className={w.ghost} onClick={() => go(3)}>{t.back}</button>
                                    <a className={w.primary} href={FULL_BOOKING_PAGE} target="_blank" rel="noopener noreferrer">{t.payBtn} →</a>
                                </div>
                            </>
                        ) : (
                            <div className={w.actions}>
                                <button type="button" className={w.ghost} onClick={() => go(3)} disabled={sending}>{t.back}</button>
                                <button type="button" className={w.primary} onClick={submit} disabled={sending}>{sending ? t.sending : t.confirm}</button>
                            </div>
                        )}
                    </>
                )}
            </div>
            <p className={w.powered}><span aria-hidden="true">●</span> {t.powered}</p>
        </div>
    );
}
