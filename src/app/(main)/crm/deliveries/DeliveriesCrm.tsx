"use client";

/**
 * The Deliveries page (/crm/deliveries, /crm/entregas): the live demo of the
 * office board, driver app and customer tracking (public/demos/deliveries,
 * the same demo as deliveries-demo-site), prices per fleet and the
 * white-label build. Styled like the other CRM pages.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BookingEmbed from "../BookingEmbed";
import s from "../crm.module.css";
import e from "../estate-agents/estate.module.css";
import x from "../industries/industry.module.css";
import { LABELS } from "../industries/labels";
import { INDUSTRY_CHIPS } from "../industries";
import { useMarket, Flag } from "@/app/components/PackagePricing";
import { markets } from "@/lib/market";
import { formatPrice } from "@/lib/website-packages";
import {
    deliveryCompetitors, deliveryExtraDriver, deliveryPlans, everyDeliveryPlan, everyDeliveryPlanPt, whiteLabelBuild,
} from "@/lib/crm-pricing";
import { DELIVERIES, type DeliveriesLocale } from "./copy";

const Check = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
);
const Cross = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
);
const FEAT_ICONS = [
    <><path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" /><path d="M8 2v16M16 6v16" /></>,
    <><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></>,
    <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
    <><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1z" /></>,
    <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    <><path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 1 .7V2l-1 .7-3-2-3 2-3-2-3 2-3-2z" /><path d="M8 8h8M8 12h8" /></>,
];

/** The demo in an iframe that grows to the demo's own height. */
function DemoFrame({ locale, title }: { locale: DeliveriesLocale; title: string }) {
    const ref = useRef<HTMLIFrameElement>(null);
    const [h, setH] = useState(900);
    useEffect(() => {
        const on = (ev: MessageEvent) => {
            if (ev.source !== ref.current?.contentWindow) return;
            const d = ev.data as { type?: string; h?: number };
            if (d?.type === "autisync-demo-height" && typeof d.h === "number") setH(Math.max(480, Math.ceil(d.h)));
        };
        window.addEventListener("message", on);
        return () => window.removeEventListener("message", on);
    }, []);
    return (
        <iframe
            ref={ref}
            src={`/demos/deliveries/index.html?embed=1&lang=${locale}`}
            title={title}
            loading="lazy"
            style={{ width: "100%", height: h, border: 0, display: "block", borderRadius: 16, background: "#f4f3ef" }}
        />
    );
}

export default function DeliveriesCrm({ locale }: { locale: DeliveriesLocale }) {
    const c = DELIVERIES[locale];
    const L = LABELS[locale];
    const pt = locale === "pt";
    const wl = whiteLabelBuild[locale];
    const { market: detected, setMarket } = useMarket();
    const crmMarkets = markets.filter((m) => m.code === "GB" || m.code === "PT");
    const market = crmMarkets.find((m) => m.code === detected.code) || crmMarkets.find((m) => m.code === (pt ? "PT" : "GB")) || detected;
    const cur = market.currency;
    const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
    const others = INDUSTRY_CHIPS[locale].filter((ch) => ch.href && !ch.href.endsWith(`/${c.slug}`));

    return (
        <div className={`${s.page} ${s.light}`}>
            <main>
                <header className={s.hero}>
                    <div className={s.wrap}>
                        <div className={s.heroCopy}>
                            <span className={s.pill}><i />{c.pill}</span>
                            <h1 className={s.heroTitle}>{c.h1a}<br /><span>{c.h1b}</span></h1>
                            <p className={s.lead}>{c.lead}</p>
                            <div className={s.ctaRow}>
                                <a className={`${s.btn} ${s.btnGold}`} href="#demo">{c.ctaDemo}</a>
                                <a className={`${s.btn} ${s.btnGhost}`} href="#prices">{c.ctaPrices}</a>
                            </div>
                            <p className={s.trust}>{c.trust}</p>
                        </div>
                    </div>
                </header>

                <section className={s.section} id="demo" style={{ paddingTop: "clamp(40px, 6vw, 64px)", scrollMarginTop: 72 }}>
                    <div className={s.wrap} style={{ maxWidth: 1360 }}>
                        <div className={s.head}>
                            <span className={s.eyebrow}>{c.demoEyebrow}</span>
                            <h2>{c.demoTitle}</h2>
                            <p className={s.muted}>{c.demoSub}</p>
                        </div>
                        <DemoFrame locale={locale} title={c.demoTitle} />
                        <p style={{ marginTop: 14 }}>
                            <a href={`/demos/deliveries/index.html?lang=${locale}`} target="_blank" rel="noopener" style={{ color: "var(--gold)", fontWeight: 600 }}>{c.demoOpen}</a>
                        </p>
                        <div className={x.merchant}>
                            <div>
                                <h3>{c.siteTitle}</h3>
                                <p className={s.muted}>{c.siteText}</p>
                            </div>
                            <a className={`${s.btn} ${s.btnGhost}`} href={`https://deliveries-demo-site.vercel.app/?lang=${locale}`} target="_blank" rel="noopener">{c.siteCta}</a>
                        </div>
                    </div>
                </section>

                <section className={`${s.section} ${s.pains}`}>
                    <div className={`${s.wrap} ${s.painsGrid}`}>
                        <div className={s.head} style={{ margin: 0 }}>
                            <span className={s.eyebrow}>{c.painsEyebrow}</span>
                            <h2>{c.painsTitle}</h2>
                        </div>
                        <div>
                            {c.pains.map((p) => <div className={s.pain} key={p.t}><Cross /><div><h3>{p.t}</h3><p>{p.d}</p></div></div>)}
                        </div>
                    </div>
                </section>

                <section className={s.section} id="features">
                    <div className={s.wrap}>
                        <div className={s.head}>
                            <span className={s.eyebrow}>{c.featEyebrow}</span>
                            <h2>{c.featTitle}</h2>
                        </div>
                        <div className={`${s.featGrid} ${e.featGrid3}`}>
                            {c.feats.map((f, i) => (
                                <div className={s.feat} key={f.t}>
                                    <div className={s.featIcon}>
                                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{FEAT_ICONS[i]}</svg>
                                    </div>
                                    <h3>{f.t}</h3>
                                    <p>{f.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={`${s.section} ${e.priceSec}`} id="prices">
                    <div className={s.wrap}>
                        <div className={s.head}>
                            <span className={s.eyebrow}>{c.priceEyebrow}</span>
                            <h2>{c.priceTitle}</h2>
                            <p className={s.muted}>{c.priceSub}</p>
                        </div>
                        <div className={e.marketRow} role="group" aria-label={c.market}>
                            <span className={s.muted}>{c.market}</span>
                            {crmMarkets.map((m) => (
                                <button key={m.code} type="button" onClick={() => setMarket(m, true)}
                                    className={`${e.marketChip} ${m.code === market.code ? e.marketOn : ""}`} aria-pressed={m.code === market.code}>
                                    <Flag market={m} size={18} />{pt ? m.namePt : m.name}
                                </button>
                            ))}
                        </div>
                        <div className={e.plans} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                            {deliveryPlans.map((p) => (
                                <div key={p.id} className={`${e.plan} ${p.highlight ? e.planHot : ""}`}>
                                    {p.highlight && <span className={e.hotTag}>{c.popular}</span>}
                                    <h3>{pt ? p.namePt : p.name}</h3>
                                    <p className={e.price}><b>{formatPrice(p.price[cur], cur)}</b><span>{p.perDepot ? c.perDepot : c.perMonth}</span></p>
                                    <ul className={e.planList}>
                                        <li><Check />{c.drivers(p.drivers)}</li>
                                        <li><Check />{c.office(p.officeUsers)}</li>
                                        {(pt ? p.extrasPt : p.extras).map((v) => <li key={v}><Check />{v}</li>)}
                                    </ul>
                                    <a className={`${s.btn} ${p.highlight ? s.btnGold : s.btnGhost} ${e.planBtn}`} href="#book">{c.choose}</a>
                                </div>
                            ))}
                        </div>
                        <p className={`${s.muted} ${e.small}`}>{c.extraDriver(formatPrice(deliveryExtraDriver[cur], cur))} {L.vat}</p>
                        <div className={e.every}>
                            <div>
                                <h3>{c.every}</h3>
                                <ul className={s.checks}>{(pt ? everyDeliveryPlanPt : everyDeliveryPlan).map((v) => <li key={v}><Check />{v}</li>)}</ul>
                            </div>
                            <div className={e.promises}>{L.promises.map((v) => <span key={v} className={e.promise}><Check />{v}</span>)}</div>
                        </div>
                    </div>
                </section>

                <section className={s.section} style={{ paddingTop: 0 }}>
                    <div className={s.wrap}>
                        <div className={s.head}>
                            <span className={s.eyebrow}>{c.cmpEyebrow}</span>
                            <h2>{c.cmpTitle}</h2>
                            <p className={`${s.muted} ${e.small}`}>{c.cmpSub}</p>
                        </div>
                        <div className={e.tableWrap}>
                            <table className={e.cmp}>
                                <thead>
                                    <tr>
                                        <th scope="col">{c.cmpFleet}</th>
                                        <th scope="col" className={e.us}>{c.cmpUs}</th>
                                        {deliveryCompetitors.map((k) => (
                                            <th scope="col" key={k.name}>
                                                <a href={k.source} target="_blank" rel="noopener noreferrer nofollow">{k.name}</a>
                                                <small>{pt ? k.basisPt : k.basis}</small>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {deliveryPlans.map((p) => (
                                        <tr key={p.id}>
                                            <th scope="row">{p.drivers}</th>
                                            <td className={e.us}><b>{formatPrice(p.price[cur], cur)}</b></td>
                                            {deliveryCompetitors.map((k) => <td key={k.name}>{usd(k.drivers(p.drivers))}</td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section className={s.section} id="white-label" style={{ paddingTop: 0, scrollMarginTop: 72 }}>
                    <div className={s.wrap}>
                        <div className={x.wl}>
                            <div>
                                <span className={x.wlEyebrow}>{c.wlEyebrow}</span>
                                <h2>{wl.name}</h2>
                                <p className={x.wlTag}>{wl.tagline}</p>
                                <p className={x.wlText}>{wl.text}</p>
                                <ul className={x.wlList}>{wl.features.map((f) => <li key={f}><Check />{f}</li>)}</ul>
                            </div>
                            <div className={x.wlPrice}>
                                <small>{wl.priceNote}</small>
                                <b>{formatPrice(whiteLabelBuild.price[cur], cur)}</b>
                                <p>{wl.dayRateLabel}: {formatPrice(whiteLabelBuild.dayRate[cur], cur)} {wl.perDay}</p>
                                <p>{wl.supportLabel}: {formatPrice(whiteLabelBuild.support[cur], cur)} {wl.perMonth}</p>
                                <a className={`${s.btn} ${s.btnGold}`} href="#book">{c.choose}</a>
                                <small className={x.wlCompare}>
                                    {wl.compare}{" "}
                                    {whiteLabelBuild.sources.map((u, i) => <a key={u} href={u} target="_blank" rel="noopener noreferrer nofollow">[{i + 1}]</a>)}
                                </small>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={`${s.section} ${s.formSec}`} id="book">
                    <div className={s.wrap}>
                        <div className={s.bookHead}>
                            <div className={s.head} style={{ margin: 0 }}>
                                <span className={s.eyebrow}>{c.bookEyebrow}</span>
                                <h2>{c.bookTitle}</h2>
                                <p className={s.muted}>{c.bookSub}</p>
                            </div>
                            <ul className={s.checks}>{c.checks.map((v) => <li key={v}><Check />{v}</li>)}</ul>
                        </div>
                        <div className={s.bookingCard}><BookingEmbed lang={locale} /></div>
                        <p className={s.bookFallback}>
                            {L.fallback}{" "}
                            <a href="https://book.autisync.com/apps/appointments/p/autisync-agency" target="_blank" rel="noopener noreferrer">{L.fallbackLink}</a>
                            {L.fallbackTail}
                        </p>
                    </div>
                </section>

                <section className={s.section}>
                    <div className={s.wrap}>
                        <div className={s.faq}>
                            <div className={s.head}>
                                <span className={s.eyebrow}>FAQ</span>
                                <h2>{c.faqTitle}</h2>
                            </div>
                            {c.faq.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
                        </div>
                        <div className={x.others}>
                            <b>{c.others}</b>
                            {others.map((ch) => <Link key={ch.href} className={s.chip} href={ch.href!}>{ch.label}</Link>)}
                            <Link className={s.chip} href={pt ? "/crm/imobiliarias" : "/crm/estate-agents"}>{pt ? "Imobiliárias" : "Estate & letting agents"}</Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
