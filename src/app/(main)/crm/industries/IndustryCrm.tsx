"use client";

/**
 * One industry page (/crm/trades, /crm/consultores, ...). Words come from the
 * industry's own file, prices from lib/industry-plans.ts, screens from
 * public/crm/industries/<id>/. Layout and styles are the estate page's
 * (crm.module.css, estate.module.css) so every CRM page looks like one family.
 */
import Image from "next/image";
import Link from "next/link";
import BookingEmbed from "../BookingEmbed";
import s from "../crm.module.css";
import e from "../estate-agents/estate.module.css";
import x from "./industry.module.css";
import Showcase from "./Showcase";
import LiveDemo from "./LiveDemo";
import { DEMO_SCRIPTS } from "./demoScripts";
import { useMarket, Flag } from "@/app/components/PackagePricing";
import { markets } from "@/lib/market";
import { formatPrice } from "@/lib/website-packages";
import {
    everyIndustryPlan, everyIndustryPlanPt, industryCompetitors, industryExtraUser, industryPlans,
    INDUSTRY_COMPARED_ON, INDUSTRY_COMPARED_ON_PT,
} from "@/lib/industry-plans";
import { LABELS } from "./labels";
import { INDUSTRY_CHIPS, demoSiteUrl } from "./index";
import type { IndustryCopy, IndustryLocale } from "./types";

const Check = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
    </svg>
);
const Cross = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M18 6 6 18M6 6l12 12" />
    </svg>
);

// One icon per feature card, in order (six cards on every page).
const FEAT_ICONS = [
    <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /><path d="m9 15 2 2 4-4" /></>,
    <><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /><path d="M9 11h.01M12 11h.01M15 11h.01" /></>,
    <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6" /><path d="m9 15 2 2 4-4" /></>,
    <><rect x="3" y="4" width="5" height="16" rx="1.5" /><rect x="10" y="4" width="5" height="11" rx="1.5" /><rect x="17" y="4" width="4" height="7" rx="1.5" /></>,
    <><rect x="2" y="6" width="20" height="13" rx="2" /><circle cx="12" cy="12.5" r="2.5" /><path d="M6 10v.01M18 15v.01" /></>,
    <><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" /></>,
];

export default function IndustryCrm({ copy, locale }: { copy: IndustryCopy; locale: IndustryLocale }) {
    const L = LABELS[locale];
    const pt = locale === "pt";
    const { market: detected, setMarket } = useMarket();
    // Sold in the UK and Portugal; anyone else sees the page's own market.
    const crmMarkets = markets.filter((m) => m.code === "GB" || m.code === "PT");
    const market = crmMarkets.find((m) => m.code === detected.code) || crmMarkets.find((m) => m.code === (pt ? "PT" : "GB")) || detected;
    const cur = market.currency;
    const plans = industryPlans[copy.id];
    const competitors = industryCompetitors[copy.id] || [];
    const comparable = plans.filter((p) => p.id !== "multi");
    const money = (n: number, c: "GBP" | "USD") => (c === "GBP" ? `£${n.toLocaleString("en-GB", { maximumFractionDigits: 2 })}` : `$${n.toLocaleString("en-US", { maximumFractionDigits: 2 })}`);
    const script = DEMO_SCRIPTS[copy.id]?.[locale];
    const others = INDUSTRY_CHIPS[locale].filter((c) => c.href && !c.href.endsWith(`/${copy.slug}`));

    return (
        <div className={`${s.page} ${s.light}`}>
            <main>
                <header className={s.hero}>
                    <div className={s.wrap}>
                        <div className={s.heroCopy}>
                            <span className={s.pill}><i />{copy.pill}</span>
                            <h1 className={s.heroTitle}>{copy.h1a}<br /><span>{copy.h1b}</span></h1>
                            <p className={s.lead}>{copy.lead}</p>
                            <div className={s.ctaRow}>
                                <a className={`${s.btn} ${s.btnGold}`} href="#how">{L.watch}</a>
                                <a className={`${s.btn} ${s.btnGhost}`} href="#prices">{L.seePrices}</a>
                            </div>
                            <p className={s.trust}>{copy.trust}</p>
                        </div>
                        <div className={x.heroDemo} id="how">
                            {script ? (
                                <LiveDemo script={script} locale={locale} />
                            ) : (
                                <Showcase
                                    id={copy.id}
                                    steps={copy.tour}
                                    labels={{ play: L.play, pause: L.pause, step: L.step, note: L.demoNote(copy.demoName), address: "app.autisync.com" }}
                                />
                            )}
                        </div>
                    </div>
                </header>

                <section className={`${s.section} ${s.pains}`}>
                    <div className={`${s.wrap} ${s.painsGrid}`}>
                        <div className={s.head} style={{ margin: 0 }}>
                            <span className={s.eyebrow}>{L.painsEyebrow}</span>
                            <h2>{copy.painsTitle}</h2>
                        </div>
                        <div>
                            {copy.pains.map((p) => (
                                <div className={s.pain} key={p.t}><Cross /><div><h3>{p.t}</h3><p>{p.d}</p></div></div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={s.section} id="website" style={{ paddingTop: 0 }}>
                    <div className={s.wrap}>
                        <div className={s.head}>
                            <span className={s.eyebrow}>{L.siteEyebrow}</span>
                            <h2>{L.siteTitle}</h2>
                            <p className={s.muted}>{L.siteSub}</p>
                        </div>
                        <div className={x.site}>
                            <figure className={x.siteLaptop}>
                                <Image src={`/crm/industries/${copy.id}/site.webp`} alt={L.siteAlt(copy.demoName)} width={1800} height={1125} sizes="(max-width: 960px) 75vw, 800px" />
                            </figure>
                            <figure className={x.sitePhone}>
                                <Image src={`/crm/industries/${copy.id}/site-phone.webp`} alt={L.sitePhoneAlt(copy.demoName)} width={585} height={1266} sizes="220px" />
                            </figure>
                        </div>
                        <div className={x.siteCta}>
                            <a className={`${s.btn} ${s.btnGhost}`} href={demoSiteUrl(copy.id)} target="_blank" rel="noopener noreferrer">{L.siteOpen}</a>
                        </div>
                    </div>
                </section>

                <section className={s.section} id="features" style={{ paddingTop: 0 }}>
                    <div className={s.wrap}>
                        <div className={s.head}>
                            <span className={s.eyebrow}>{L.featEyebrow}</span>
                            <h2>{copy.featTitle}</h2>
                        </div>
                        <div className={`${s.featGrid} ${e.featGrid3}`}>
                            {copy.feats.map((f, i) => (
                                <div className={s.feat} key={f.t}>
                                    <div className={s.featIcon}>
                                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{FEAT_ICONS[i % FEAT_ICONS.length]}</svg>
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
                            <span className={s.eyebrow}>{L.priceEyebrow}</span>
                            <h2>{L.priceTitle}</h2>
                            <p className={s.muted}>{L.priceSub}</p>
                        </div>
                        <div className={e.marketRow} role="group" aria-label={L.market}>
                            <span className={s.muted}>{L.market}</span>
                            {crmMarkets.map((m) => (
                                <button key={m.code} type="button" onClick={() => setMarket(m, true)}
                                    className={`${e.marketChip} ${m.code === market.code ? e.marketOn : ""}`} aria-pressed={m.code === market.code}>
                                    <Flag market={m} size={18} />{pt ? m.namePt : m.name}
                                </button>
                            ))}
                        </div>
                        <div className={e.plans}>
                            {plans.map((p) => (
                                <div key={p.id} className={`${e.plan} ${p.highlight ? e.planHot : ""}`}>
                                    {p.highlight && <span className={e.hotTag}>{L.popular}</span>}
                                    <h3>{pt ? p.namePt : p.name}</h3>
                                    <p className={e.price}>
                                        <b>{formatPrice(p.price[cur], cur)}</b>
                                        <span>{p.perSite ? L.perSite : L.perMonth}</span>
                                    </p>
                                    <p className={e.setup}>{L.setup(formatPrice(p.setup[cur], cur))}</p>
                                    <ul className={e.planList}>
                                        <li><Check />{p.perSite ? L.perSiteUsers(p.users) : L.users(p.users)}</li>
                                        {(pt ? p.extrasPt : p.extras).map((v) => <li key={v}><Check />{v}</li>)}
                                    </ul>
                                    <a className={`${s.btn} ${p.highlight ? s.btnGold : s.btnGhost} ${e.planBtn}`} href="#book">{L.choose}</a>
                                </div>
                            ))}
                        </div>
                        <p className={`${s.muted} ${e.small}`}>{L.extraUser(formatPrice(industryExtraUser[copy.id][cur], cur))} {L.vat}</p>
                        <div className={e.every}>
                            <div>
                                <h3>{L.every}</h3>
                                <ul className={s.checks}>
                                    {(pt ? everyIndustryPlanPt : everyIndustryPlan).map((v) => <li key={v}><Check />{v}</li>)}
                                </ul>
                            </div>
                            <div className={e.promises}>
                                {L.promises.map((v) => <span key={v} className={e.promise}><Check />{v}</span>)}
                            </div>
                        </div>
                    </div>
                </section>

                {competitors.length ? (
                    <section className={s.section}>
                        <div className={s.wrap}>
                            <div className={s.head}>
                                <span className={s.eyebrow}>{L.cmpEyebrow}</span>
                                <h2>{L.cmpTitle}</h2>
                                <p className={`${s.muted} ${e.small}`}>{L.cmpSub(pt ? INDUSTRY_COMPARED_ON_PT : INDUSTRY_COMPARED_ON)}</p>
                            </div>
                            <div className={e.tableWrap}>
                                <table className={e.cmp}>
                                    <thead>
                                        <tr>
                                            <th scope="col">{L.cmpTeam}</th>
                                            <th scope="col" className={e.us}>{L.cmpUs}</th>
                                            {competitors.map((c) => (
                                                <th scope="col" key={c.name}>
                                                    <a href={c.source} target="_blank" rel="noopener noreferrer nofollow">{c.name}</a>
                                                    <small>{pt ? c.basisPt : c.basis}</small>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparable.map((p) => (
                                            <tr key={p.id}>
                                                <th scope="row">{L.users(p.users)}</th>
                                                <td className={e.us}><b>{formatPrice(p.price[cur], cur)}</b></td>
                                                {competitors.map((c) => <td key={c.name}>{money(c.team(p.users), c.cur)}</td>)}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                ) : null}

                <section className={s.section} style={{ paddingTop: 0 }}>
                    <div className={s.wrap}>
                        <div className={s.head}>
                            <span className={s.eyebrow}>{L.startEyebrow}</span>
                            <h2>{L.startTitle}</h2>
                        </div>
                        <div className={s.steps}>
                            {L.start.map((st) => <div className={s.step} key={st.t}><h3>{st.t}</h3><p>{st.d}</p></div>)}
                        </div>
                    </div>
                </section>

                <section className={`${s.section} ${s.formSec}`} id="book">
                    <div className={s.wrap}>
                        <div className={s.bookHead}>
                            <div className={s.head} style={{ margin: 0 }}>
                                <span className={s.eyebrow}>{L.bookEyebrow}</span>
                                <h2>{L.bookTitle}</h2>
                                <p className={s.muted}>{L.bookSub}</p>
                            </div>
                            <ul className={s.checks}>
                                {L.checks.map((c) => <li key={c}><Check />{c}</li>)}
                            </ul>
                        </div>
                        <div className={s.bookingCard}><BookingEmbed lang={pt ? "pt" : "en"} /></div>
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
                                <h2>{L.faqTitle}</h2>
                            </div>
                            {copy.faq.map((f) => (
                                <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
                            ))}
                        </div>
                        <div className={x.others}>
                            <b>{L.others}</b>
                            {others.map((c) => <Link key={c.href} className={s.chip} href={c.href!}>{c.label}</Link>)}
                            <Link className={s.chip} href={pt ? "/crm/imobiliarias" : "/crm/estate-agents"}>{pt ? "Imobiliárias" : "Estate & letting agents"}</Link>
                        </div>
                    </div>
                </section>
            </main>

        </div>
    );
}
