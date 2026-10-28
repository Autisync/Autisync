"use client";

/**
 * The live demo on each industry page: the CRM on one side and the
 * customer's phone on the other, drawn in the page so it stays sharp at any
 * size. Six scenes play by themselves; at each step the button that moves it
 * on is highlighted, and a visitor can click it (or the scene list) instead
 * of waiting. On a phone the two screens become tabs that follow the action.
 *
 * Script: demoScripts.ts. Styles: demo.module.css.
 */
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import d from "./demo.module.css";
import { DEMO_UI, SCENES, type DemoScript, type SceneKey } from "./demoScripts";
import type { IndustryLocale } from "./types";

type Where = "crm" | "phone";
type Beat = { ms?: number; act?: Where; focus: Where };

/** Each scene's beats. A beat with `act` waits for its highlighted button. */
const BEATS: Record<SceneKey, Beat[]> = {
    enquiry: [{ ms: 1700, focus: "phone" }, { ms: 1500, focus: "crm" }, { ms: 1900, focus: "crm" }, { act: "crm", focus: "crm" }, { ms: 2600, focus: "phone" }],
    booking: [{ ms: 1500, focus: "phone" }, { act: "phone", focus: "phone" }, { ms: 2800, focus: "crm" }],
    quote: [{ ms: 1800, focus: "crm" }, { act: "crm", focus: "crm" }, { act: "phone", focus: "phone" }, { ms: 2600, focus: "crm" }],
    won: [{ ms: 1500, focus: "crm" }, { ms: 3200, focus: "crm" }],
    invoice: [{ ms: 1500, focus: "crm" }, { act: "crm", focus: "crm" }, { act: "phone", focus: "phone" }, { ms: 2800, focus: "crm" }],
    review: [{ ms: 1600, focus: "phone" }, { act: "phone", focus: "phone" }, { ms: 3600, focus: "crm" }],
};
const AUTO_TAP_MS = 2600;

const money = (n: number, cur: "GBP" | "EUR") => {
    const [i, f] = n.toFixed(2).split(".");
    if (cur === "GBP") return `£${i.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${f}`;
    return `${i.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${f} €`;
};

/* ── Icons (stroke, 24px grid) ─────────────────────────────────────── */
const ICONS: Record<string, ReactNode> = {
    dashboard: <><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></>,
    inbox: <><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1Z" /></>,
    bookings: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
    quotes: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h4" /></>,
    board: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 7v7M12 7v4M16 7v9" /></>,
    billing: <><path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 1 .7V2l-1 .7-3-2-3 2-3-2-3 2-3-2z" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
    reviews: <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />,
    clients: <><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0M16 3.1a4 4 0 0 1 0 7.8M22 21a7 7 0 0 0-4-6.3" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0" /></>,
    spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="m6 6 2 2M16 16l2 2M6 18l2-2M16 8l2-2" /></>,
    send: <><path d="m22 2-7 20-4-9-9-4z" /><path d="M22 2 11 13" /></>,
    check: <path d="M20 6 9 17l-5-5" />,
    lock: <><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>,
    back: <path d="m15 18-6-6 6-6" />,
    play: <path d="M7 4v16l13-8z" />,
    pause: <><path d="M7 4h3v16H7zM14 4h3v16h-3z" /></>,
    next: <><path d="m6 4 10 8-10 8z" /><path d="M19 5v14" /></>,
    wa: <path d="M20.5 12a8.5 8.5 0 0 1-12.4 7.5L3.5 20.5l1-4.4A8.5 8.5 0 1 1 20.5 12Z" />,
    email: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></>,
    web: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />,
};
const Ic = ({ n, className }: { n: string; className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[n]}</svg>
);
const Stars = ({ n = 5, className }: { n?: number; className?: string }) => (
    <span className={className} aria-label={`${n}/5`}>{"★★★★★".slice(0, n)}</span>
);

/** Scales a fixed-size drawing to the width it is given, so text stays vector-sharp. */
function Scaled({ w, h, children, className }: { w: number; h: number; children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;
        const set = () => setScale(el.clientWidth / w || 1);
        set();
        const ro = new ResizeObserver(set);
        ro.observe(el);
        return () => ro.disconnect();
    }, [w]);
    return (
        <div ref={ref} className={className} style={{ height: h * scale }}>
            <div style={{ width: w, height: h, transform: `scale(${scale})`, transformOrigin: "0 0" }}>{children}</div>
        </div>
    );
}

export default function LiveDemo({ script: S, locale }: { script: DemoScript; locale: IndustryLocale }) {
    const U = DEMO_UI[locale];
    const [scene, setScene] = useState(0);
    const [beat, setBeat] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [tapping, setTapping] = useState(false);
    const [inView, setInView] = useState(false);
    const [tab, setTab] = useState<Where | null>(null); // a tab the visitor chose, until the next scene
    const [narrow, setNarrow] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    const key = SCENES[scene];
    const b = BEATS[key][beat];
    const at = (k: SceneKey) => SCENES.indexOf(k);
    /** True once the story has reached scene k, beat n. */
    const past = (k: SceneKey, n = 0) => scene > at(k) || (scene === at(k) && beat >= n);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mq.matches) setPlaying(false);
        const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
        if (rootRef.current) io.observe(rootRef.current);
        const nm = window.matchMedia("(max-width: 860px)");
        const setN = () => setNarrow(nm.matches);
        setN();
        nm.addEventListener("change", setN);
        return () => { io.disconnect(); nm.removeEventListener("change", setN); };
    }, []);

    const advance = useCallback(() => {
        setTapping(false);
        if (beat + 1 < BEATS[key].length) { setBeat(beat + 1); return; }
        setTab(null);
        setBeat(0);
        setScene((scene + 1) % SCENES.length);
    }, [beat, key, scene]);

    // Timers: auto beats move on after their time; action beats are "tapped" for you while playing.
    useEffect(() => {
        // Paused: nothing moves by itself; the highlighted button and Next still work.
        if (!inView || !playing) return;
        if (b.ms) {
            const t = setTimeout(advance, b.ms);
            return () => clearTimeout(t);
        }
        if (b.act) {
            const t1 = setTimeout(() => setTapping(true), AUTO_TAP_MS - 350);
            const t2 = setTimeout(advance, AUTO_TAP_MS);
            return () => { clearTimeout(t1); clearTimeout(t2); };
        }
    }, [advance, b, beat, inView, playing]);

    const act = (where: Where) => { if (b.act === where) advance(); };
    const hot = (where: Where) => (b.act === where ? `${d.hot} ${tapping ? d.tap : ""}` : "");
    const goScene = (i: number) => { setScene(i); setBeat(0); setTab(null); setTapping(false); };

    const focus: Where = tab ?? b.focus;
    const cur = S.currency;
    const lines = S.quote.lines;
    const subtotal = lines.reduce((s, l) => s + l.q * l.p, 0);
    const vat = subtotal * (S.quote.vat / 100);
    const total = subtotal + vat;
    const invTotal = total * S.invoice.share;

    /* ── CRM screens ───────────────────────────────────────────────── */
    const navKey: Record<SceneKey, keyof typeof U.nav> = { enquiry: "inbox", booking: "bookings", quote: "quotes", won: "board", invoice: "billing", review: "reviews" };
    const navOrder: Array<keyof typeof U.nav> = ["dashboard", "inbox", "bookings", "clients", "board", "quotes", "billing", "reviews"];

    const Sidebar = (
        <aside className={d.side} style={{ ["--brand" as string]: S.brand.color }}>
            <div className={d.sideBrand}><span className={d.logoSq}>{S.brand.initial}</span>{!narrow && <b>{S.brand.name}</b>}</div>
            <nav>
                {navOrder.map((k) => (
                    <span key={k} className={`${d.sideItem} ${navKey[key] === k ? d.sideOn : ""}`}>
                        <Ic n={k} />{!narrow && <span>{U.nav[k]}</span>}
                        {k === "inbox" && past("enquiry", 1) && !past("enquiry", 4) ? <i className={d.dot} /> : null}
                    </span>
                ))}
            </nav>
        </aside>
    );

    const channelIcon = (c: string) => (c === "whatsapp" ? "wa" : c === "email" ? "email" : c === "phone" ? "phone" : "web");

    const Inbox = () => {
        const hasNew = past("enquiry", 1);
        const drafted = past("enquiry", 2);
        const replied = past("enquiry", 4);
        return (
            <div className={d.inbox}>
                {!narrow && (
                    <div className={d.card + " " + d.list}>
                        <div className={d.listHead}><Ic n="inbox" /><b>{U.inbox}</b>{hasNew && !replied && <span className={d.badge}>{U.unread}</span>}</div>
                        {hasNew && (
                            <div className={`${d.conv} ${d.convOn} ${!replied ? d.fresh : ""}`}>
                                <span className={`${d.chan} ${d.chanWa}`}><Ic n="wa" /></span>
                                <div><b>{S.customer.name}</b><p>{replied ? S.enquiry.reply : S.enquiry.msg}</p></div>
                                <small>{S.enquiry.time}</small>
                            </div>
                        )}
                        {S.others.map((o) => (
                            <div key={o.name} className={d.conv}>
                                <span className={d.chan}><Ic n={channelIcon(o.channel)} /></span>
                                <div><b>{o.name}</b><p>{o.preview}</p></div>
                                <small>{o.when}</small>
                            </div>
                        ))}
                    </div>
                )}
                <div className={d.card + " " + d.thread}>
                    {hasNew ? (
                        <>
                            <div className={d.threadHead}>
                                <b>{S.customer.name}</b>
                                <span className={d.waPill}><Ic n="wa" />WhatsApp</span>
                            </div>
                            <div className={d.msgs}>
                                <span className={d.dayRule}>{U.today}</span>
                                <div className={`${d.msgIn} ${d.pop}`}>{S.enquiry.msg}<small>{S.enquiry.time}</small></div>
                                {replied && <div className={`${d.msgOut} ${d.pop}`}>{S.enquiry.reply}<small>{U.sent}</small></div>}
                            </div>
                            <div className={d.replyBox}>
                                {drafted && !replied ? (
                                    <>
                                        <p className={d.typed}>{S.enquiry.reply}</p>
                                        <span className={d.aiNote}><Ic n="spark" />{U.aiNote}</span>
                                    </>
                                ) : <p className={d.ph}>{U.replyOn}</p>}
                                <div className={d.replyBar}>
                                    <span className={`${d.ghostBtn} ${past("enquiry", 2) ? d.used : ""}`}><Ic n="spark" />{U.suggest}</span>
                                    <button type="button" className={`${d.sendBtn} ${hot("crm")}`} onClick={() => act("crm")} tabIndex={b.act === "crm" ? 0 : -1}>
                                        <Ic n="send" />{U.send}
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : <div className={d.empty}><Ic n="inbox" /></div>}
                </div>
            </div>
        );
    };

    const Bookings = () => {
        const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
        const showNew = past("booking", 2);
        const [nd, nh, nl] = S.newBooking;
        return (
            <div className={d.card + " " + d.cal}>
                <div className={d.calHead}><b>{U.bookings}</b>{showNew && <span className={d.newTag}>{U.newBooking}</span>}</div>
                <div className={d.calGrid} style={{ gridTemplateColumns: `44px repeat(5, 1fr)` }}>
                    <span />
                    {U.week.map((w) => <span key={w} className={d.calDay}>{w}</span>)}
                    <div className={d.calHours}>{hours.map((h) => <span key={h}>{String(h).padStart(2, "0")}:00</span>)}</div>
                    {U.week.map((w, di) => (
                        <div key={w} className={d.calCol}>
                            {hours.map((h) => <i key={h} />)}
                            {S.diary.filter(([day]) => day === di).map(([, h, l, label]) => (
                                <span key={label} className={d.ev} style={{ top: `${(h - 8) * 10}%`, height: `${l * 10}%` }}>{label}</span>
                            ))}
                            {showNew && nd === di && (
                                <span className={`${d.ev} ${d.evNew}`} style={{ top: `${(nh - 8) * 10}%`, height: `${Math.max(nl, 0.75) * 10}%` }}>
                                    {S.booking.slots[S.booking.pick]} · {S.customer.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const Quote = () => {
        const status = past("quote", 3) ? U.accepted : past("quote", 2) ? U.opened : U.draft;
        const tone = past("quote", 3) ? d.stGreen : past("quote", 2) ? d.stBlue : d.stGrey;
        return (
            <div className={d.card + " " + d.doc}>
                <div className={d.docHead}>
                    <div><small>{S.quote.kind} {S.quote.ref}</small><b>{S.customer.name}</b></div>
                    <span className={`${d.status} ${tone}`}>{status}</span>
                </div>
                <table className={d.lines}>
                    <tbody>
                        {lines.map((l) => (
                            <tr key={l.d}><td>{l.d}</td><td>{l.q}</td><td>{money(l.q * l.p, cur)}</td></tr>
                        ))}
                    </tbody>
                </table>
                <div className={d.totals}>
                    <span>{U.subtotal}</span><span>{money(subtotal, cur)}</span>
                    <span>{U.vat} {S.quote.vat}%</span><span>{money(vat, cur)}</span>
                    <b>{U.total}</b><b>{money(total, cur)}</b>
                </div>
                <div className={d.docFoot}>
                    <small>{S.quote.validity}</small>
                    {past("quote", 2) ? (
                        <span className={d.sentNote}><Ic n="check" />{U.sentS}</span>
                    ) : (
                        <button type="button" className={`${d.sendBtn} ${hot("crm")}`} onClick={() => act("crm")} tabIndex={b.act === "crm" ? 0 : -1}><Ic n="send" />{U.sendQuote}</button>
                    )}
                </div>
            </div>
        );
    };

    const Board = () => {
        const won = past("won", 1);
        const cards = [...S.board.cards, { name: S.customer.name, what: S.quote.lines[0].d, value: total, stage: (won ? 3 : 2) as 0 | 1 | 2 | 3, me: true }];
        return (
            <div className={d.board}>
                {S.board.stages.map((st, i) => {
                    const here = cards.filter((c) => c.stage === i);
                    return (
                        <div key={st} className={`${d.col} ${i === 3 ? d.colWon : ""}`}>
                            <div className={d.colHead}><b>{st}</b><small>{money(here.reduce((s, c) => s + c.value, 0), cur)}</small></div>
                            {here.map((c) => (
                                <div key={c.name} className={`${d.deal} ${"me" in c ? d.dealMe : ""} ${"me" in c && won ? d.pop : ""}`}>
                                    <b>{c.name}</b><p>{c.what}</p><small>{money(c.value, cur)}</small>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        );
    };

    const Billing = () => {
        const sent = past("invoice", 2);
        const paid = past("invoice", 3);
        const base = cur === "GBP" ? 4820 : 5340;
        return (
            <div className={d.billing}>
                <div className={d.tiles}>
                    <div className={`${d.card} ${d.tile} ${paid ? d.tileUp : ""}`}><small>{U.moneyIn}</small><b>{money(base + (paid ? invTotal : 0), cur)}</b></div>
                    <div className={`${d.card} ${d.tile}`}><small>{S.invoice.label}</small><b>{money(invTotal, cur)}</b></div>
                </div>
                <div className={d.card + " " + d.doc}>
                    <div className={d.docHead}>
                        <div><small>{S.invoice.label} {S.invoice.ref}</small><b>{S.customer.name}</b></div>
                        <span className={`${d.status} ${paid ? d.stGreen : sent ? d.stBlue : d.stGrey}`}>{paid ? U.paid : sent ? U.sentS : U.draft}</span>
                    </div>
                    <p className={d.fromQuote}><Ic n="check" />{U.toInvoice} {S.quote.ref}</p>
                    <div className={d.totals}>
                        <b>{U.total}</b><b>{money(invTotal, cur)}</b>
                    </div>
                    {paid ? (
                        <p className={`${d.paidBanner} ${d.pop}`}><Ic n="check" />{U.paidBy} · {S.customer.name}</p>
                    ) : (
                        <div className={d.docFoot}>
                            <span />
                            {sent ? <span className={d.sentNote}><Ic n="check" />{U.sentS}</span> : (
                                <button type="button" className={`${d.sendBtn} ${hot("crm")}`} onClick={() => act("crm")} tabIndex={b.act === "crm" ? 0 : -1}><Ic n="send" />{U.sendInvoice}</button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const Reviews = () => {
        const fresh = past("review", 2);
        const list = fresh ? [{ name: S.customer.name, text: S.review.text, when: U.today, me: true }, ...S.reviews] : S.reviews;
        return (
            <div className={d.card + " " + d.reviews}>
                <div className={d.revHead}>
                    <div><small>{U.rating}</small><b>4.9 <Stars className={d.stars} /></b></div>
                    <span className={d.revCount}>{(fresh ? 48 : 47)} Google</span>
                </div>
                {list.map((r) => (
                    <div key={r.name} className={`${d.rev} ${"me" in r ? `${d.revMe} ${d.pop}` : ""}`}>
                        <div className={d.revTop}><b>{r.name}</b><Stars className={d.stars} />{"me" in r && <span className={d.newTag}>{U.newReview}</span>}<small>{r.when}</small></div>
                        <p>{r.text}</p>
                    </div>
                ))}
            </div>
        );
    };

    const crmView: Record<SceneKey, () => ReactNode> = { enquiry: Inbox, booking: Bookings, quote: Quote, won: Board, invoice: Billing, review: Reviews };

    const CRM = (
        <div className={`${d.crm} ${narrow ? d.compact : ""}`} style={{ ["--brand" as string]: S.brand.color }}>
            {Sidebar}
            <div className={d.mainCol}>
                <div className={d.top}>
                    <span className={d.search}><Ic n="search" />{U.search}</span>
                    <span className={d.bell}><Ic n="bell" />{past("enquiry", 1) && !past("enquiry", 4) ? <i /> : null}</span>
                    <span className={d.me}><i>{S.brand.ownerInitials}</i>{!narrow && <span><b>{S.brand.owner}</b><small>{S.brand.name}</small></span>}</span>
                </div>
                <div className={d.content} key={key}>{crmView[key]()}</div>
            </div>
        </div>
    );

    /* ── Phone screens ─────────────────────────────────────────────── */
    const chatMsgs = useMemo(() => {
        const m: Array<{ who: "me" | "them"; text: ReactNode; k: string }> = [];
        if (past("enquiry", 1)) m.push({ who: "me", text: S.enquiry.msg, k: "q" });
        if (past("enquiry", 4)) m.push({ who: "them", text: <>{S.enquiry.reply} <u>{S.brand.short.toLowerCase()}.autisync.com/book</u></>, k: "r" });
        if (past("booking", 2)) m.push({ who: "them", text: <><Ic n="check" className={d.inlineIc} /> {S.booking.service} · {S.booking.day}, {S.booking.slots[S.booking.pick]}</>, k: "b" });
        if (past("won", 1)) m.push({ who: "them", text: S.won.msg, k: "w" });
        if (past("review")) m.push({ who: "them", text: S.review.ask, k: "a" });
        return m;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scene, beat, S]);

    const Chat = ({ typing }: { typing?: boolean }) => (
        <div className={d.wa}>
            <div className={d.waHead} style={{ background: "#075e54" }}>
                <Ic n="back" /><span className={d.waAv} style={{ background: S.brand.color }}>{S.brand.initial}</span>
                <span><b>{S.brand.name}</b><small>{typing ? U.typing : U.wa}</small></span>
            </div>
            <div className={d.waBody}>
                {chatMsgs.map((m) => <div key={m.k} className={`${m.who === "me" ? d.waMe : d.waThem} ${d.pop}`}>{m.text}</div>)}
                {key === "review" && (
                    <div className={`${d.revCard} ${d.pop}`}>
                        <b>{U.leaveReview}</b>
                        {past("review", 2) ? (
                            <><Stars className={d.bigStars} /><p>{S.review.text}</p><small>{U.thanks}</small></>
                        ) : (
                            <button type="button" className={`${d.starBtn} ${hot("phone")}`} onClick={() => act("phone")} tabIndex={b.act === "phone" ? 0 : -1}>☆☆☆☆☆</button>
                        )}
                    </div>
                )}
            </div>
            <div className={d.waInput}>
                <span className={key === "enquiry" && beat === 0 ? d.waTyping : ""}>{key === "enquiry" && beat === 0 ? S.enquiry.msg : U.message}</span>
                <i className={d.waSend}><Ic n="send" /></i>
            </div>
        </div>
    );

    const BookingPage = () => {
        const done = past("booking", 2);
        const chosen = past("booking", 1);
        return (
            <div className={d.page}>
                <div className={d.pageHead} style={{ background: S.brand.color }}><span className={d.waAv}>{S.brand.initial}</span><b>{S.brand.name}</b></div>
                {done ? (
                    <div className={`${d.done} ${d.pop}`}>
                        <span className={d.doneIc}><Ic n="check" /></span>
                        <b>{U.booked}</b>
                        <p>{S.booking.service}<br />{S.booking.day}, {S.booking.slots[S.booking.pick]}<br />{S.booking.with}</p>
                        <small>{U.reminder}</small>
                    </div>
                ) : (
                    <div className={d.pageBody}>
                        <small>{U.bookTitle}</small>
                        <div className={d.svc}><b>{S.booking.service}</b><span>{S.booking.length} · {S.booking.price}</span></div>
                        <small>{S.booking.day}</small>
                        <div className={d.slots}>
                            {S.booking.slots.map((s, i) => <span key={s} className={chosen && i === S.booking.pick ? d.slotOn : ""}>{s}</span>)}
                        </div>
                        <button type="button" className={`${d.bigBtn} ${hot("phone")}`} style={{ background: S.brand.color }} onClick={() => act("phone")} tabIndex={b.act === "phone" ? 0 : -1} disabled={!chosen}>
                            {U.confirm} {chosen ? S.booking.slots[S.booking.pick] : ""}
                        </button>
                    </div>
                )}
            </div>
        );
    };

    const QuotePage = () => (
        <div className={d.page}>
            <div className={d.pageHead} style={{ background: S.brand.color }}><span className={d.waAv}>{S.brand.initial}</span><b>{S.brand.name}</b></div>
            <div className={d.pageBody}>
                <small>{S.quote.kind} {S.quote.ref}</small>
                {lines.map((l) => <div key={l.d} className={d.pLine}><span>{l.d}</span><b>{money(l.q * l.p, cur)}</b></div>)}
                <div className={d.pTotal}><span>{U.total} ({U.vat} {S.quote.vat}%)</span><b>{money(total, cur)}</b></div>
                {past("quote", 3) ? (
                    <p className={`${d.okMsg} ${d.pop}`}><Ic n="check" />{U.acceptedMsg}</p>
                ) : (
                    <button type="button" className={`${d.bigBtn} ${hot("phone")}`} style={{ background: S.brand.color }} onClick={() => act("phone")} tabIndex={b.act === "phone" ? 0 : -1}>{U.accept}</button>
                )}
            </div>
        </div>
    );

    const PayPage = () => (
        <div className={d.page}>
            <div className={d.pageHead} style={{ background: S.brand.color }}><span className={d.waAv}>{S.brand.initial}</span><b>{S.brand.name}</b></div>
            <div className={d.pageBody}>
                <small>{S.invoice.label} {S.invoice.ref}</small>
                <p className={d.amount}>{money(invTotal, cur)}</p>
                {past("invoice", 3) ? (
                    <p className={`${d.okMsg} ${d.pop}`}><Ic n="check" />{U.paidMsg}</p>
                ) : (
                    <>
                        <div className={d.cardRow}><span className={d.cardChip} />{U.card}</div>
                        <button type="button" className={`${d.bigBtn} ${hot("phone")}`} style={{ background: "#111" }} onClick={() => act("phone")} tabIndex={b.act === "phone" ? 0 : -1}>{U.pay} {money(invTotal, cur)}</button>
                        <small className={d.secure}><Ic n="lock" />{U.secure}</small>
                    </>
                )}
            </div>
        </div>
    );

    let phoneScreen: ReactNode;
    if (key === "booking") phoneScreen = BookingPage();
    else if (key === "quote" && beat >= 2) phoneScreen = QuotePage();
    else if (key === "invoice" && beat >= 2) phoneScreen = PayPage();
    else phoneScreen = Chat({ typing: key === "won" && beat === 0 });

    const Phone = (
        <div className={d.phone}>
            <div className={d.notch} />
            <div className={d.screen}>{phoneScreen}</div>
        </div>
    );

    const cap = S.captions[key];
    return (
        <div className={d.demo} ref={rootRef}>
            {narrow && (
                <div className={d.tabs} role="tablist">
                    {(["crm", "phone"] as Where[]).map((w) => (
                        <button key={w} type="button" role="tab" aria-selected={focus === w} className={focus === w ? d.tabOn : ""} onClick={() => setTab(w)}>
                            {w === "crm" ? U.crm : U.phone}
                            {b.act === w && focus !== w ? <i className={d.tabDot} /> : null}
                        </button>
                    ))}
                </div>
            )}
            <div className={d.stage}>
                <div className={d.crmPane} hidden={narrow && focus !== "crm"}>
                    {!narrow && <div className={d.paneLabel}>{U.crm}</div>}
                    <div className={d.window}>
                        <div className={d.winBar}><i /><i /><i /><span>app.autisync.com</span></div>
                        <Scaled w={narrow ? 560 : 960} h={narrow ? 640 : 600}>{CRM}</Scaled>
                    </div>
                </div>
                <div className={d.phonePane} hidden={narrow && focus !== "phone"}>
                    {!narrow && <div className={d.paneLabel}>{U.phone}</div>}
                    <Scaled w={300} h={620} className={d.phoneScale}>{Phone}</Scaled>
                </div>
            </div>

            <div className={d.bottom}>
                <div className={d.caption} aria-live="polite">
                    <span className={d.capStep}>{U.scene(scene + 1, SCENES.length)}</span>
                    <p className={d.capTitle}>{cap.t}</p>
                    <p className={d.capText}>{cap.d}</p>
                </div>
                <div className={d.controls}>
                    <button type="button" className={d.ctl} onClick={() => setPlaying((p) => !p)} aria-pressed={!playing}>
                        <Ic n={playing ? "pause" : "play"} />{playing ? U.pause : U.play}
                    </button>
                    <button type="button" className={d.ctl} onClick={advance}><Ic n="next" />{U.next}</button>
                </div>
            </div>
            <ol className={d.scenes}>
                {SCENES.map((k, i) => (
                    <li key={k}>
                        <button type="button" onClick={() => goScene(i)} className={`${i === scene ? d.sceneOn : ""} ${i < scene ? d.sceneDone : ""}`} aria-current={i === scene ? "step" : undefined}>
                            <span>{i + 1}</span>{S.captions[k].t}
                        </button>
                    </li>
                ))}
            </ol>
            <p className={d.note}>{U.note}</p>
        </div>
    );
}
