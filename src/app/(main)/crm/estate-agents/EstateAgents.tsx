"use client";

/**
 * Autisync for estate & letting agencies — the landing page, in English
 * (/crm/estate-agents) and Portuguese (/crm/imobiliarias). Prices follow the
 * visitor's market (lib/market.ts); the UK comparison uses published prices
 * only (lib/estate-agency-plans.ts).
 */
import Image from "next/image";
import Link from "next/link";
import BookingEmbed from "../BookingEmbed";
import s from "../crm.module.css";
import e from "./estate.module.css";
import { useMarket, Flag } from "@/app/components/PackagePricing";
import { markets } from "@/lib/market";
import { formatPrice } from "@/lib/website-packages";
import { agencyPlans, everyPlan, everyPlanPt, extraUser, ukCompetitors } from "@/lib/estate-agency-plans";
import { ESTATE_COPY, type EstateLocale } from "./estateCopy";

type Locale = EstateLocale;

/** The demo agency's website on Vercel: every listing read live from the CRM. */
const DEMO_AGENCY_SITE = "https://miralume-demo-site.vercel.app";

const T = ESTATE_COPY;

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

const FEAT_ICONS = [
    <><path d="M3 10.5 12 3l9 7.5V21H3z" /><path d="M9 21v-6h6v6" /></>,
    <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /><path d="m9 15 2 2 4-4" /></>,
    <><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /><path d="M9 11h.01M12 11h.01M15 11h.01" /></>,
    <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="m16 11 2 2 4-4" /></>,
    <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M7 9h10M7 13h6M7 17h4" /></>,
    <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" /><path d="m9 12 2 2 4-4" /></>,
];

const PM_ICONS = [
    <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6" /><path d="m9 15 2 2 4-4" /></>,
    <><rect x="2" y="6" width="20" height="13" rx="2" /><circle cx="12" cy="12.5" r="2.5" /><path d="M6 10v.01M18 15v.01" /></>,
    <><path d="M4 4h16v16H4z" /><path d="M8 9h8M8 13h8M8 17h5" /></>,
    <><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z" /></>,
    <><path d="M9 3h6l1 3h4v15H4V6h4z" /><path d="m9 14 2 2 4-4" /></>,
    <><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5M9 2h6" /></>,
];

export default function EstateAgents({ locale }: { locale: Locale }) {
    const t = T[locale];
    const pt = locale === "pt";
    const { market: detected, setMarket } = useMarket();
    // The agency CRM is sold in the UK and Portugal; a visitor from elsewhere
    // (Angola, Namibia) sees this page's own market.
    const crmMarkets = markets.filter((m) => m.code === "GB" || m.code === "PT");
    const market = crmMarkets.find((m) => m.code === detected.code) || crmMarkets.find((m) => m.code === (pt ? "PT" : "GB")) || detected;
    const cur = market.currency;
    const comparable = agencyPlans.filter((p) => p.id !== "multi");

    return (
        <div className={`${s.page} ${s.light}`}>
            <div>
                <header className={s.hero}>
                    <div className={s.wrap}>
                        <div className={s.heroCopy}>
                            <span className={s.pill}><i />{t.pill}</span>
                            <h1 className={s.heroTitle}>{t.h1a}<br /><span>{t.h1b}</span></h1>
                            <p className={s.lead}>{t.lead}</p>
                            <div className={s.ctaRow}>
                                <a className={`${s.btn} ${s.btnGold}`} href="#prices">{t.seePrices}</a>
                                <a className={`${s.btn} ${s.btnGhost}`} href="#book">{t.book}</a>
                                <a className={`${s.btn} ${s.btnGhost}`} href={DEMO_AGENCY_SITE} target="_blank" rel="noopener noreferrer">
                                    {t.heroSite} <span aria-hidden="true">↗</span>
                                </a>
                            </div>
                            <p className={s.trust}>{t.trust}</p>
                        </div>
                        <figure className={s.shot}>
                            <Image
                                src="/crm/estate/properties-live.webp"
                                alt={pt ? "Autisync CRM da Miralume Homes: imóveis com fotos, preço, estado e interessados" : "Miralume Homes in Autisync CRM: listings with photos, price, status and interested buyers"}
                                width={1552}
                                height={698}
                                priority
                                sizes="(max-width: 1120px) 100vw, 1060px"
                            />
                            <figcaption>{t.caption}</figcaption>
                        </figure>
                    </div>
                </header>

                <section className={`${s.section} ${s.pains}`}>
                    <div className={`${s.wrap} ${s.painsGrid}`}>
                        <div className={s.head} style={{ margin: 0 }}>
                            <span className={s.eyebrow}>{t.painsEyebrow}</span>
                            <h2>{t.painsTitle}</h2>
                        </div>
                        <div>
                            {t.pains.map((p) => (
                                <div className={s.pain} key={p.t}><Cross /><div><h3>{p.t}</h3><p>{p.d}</p></div></div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={s.section} id="features">
                    <div className={s.wrap}>
                        <div className={s.head}>
                            <span className={s.eyebrow}>{t.featEyebrow}</span>
                            <h2>{t.featTitle}</h2>
                        </div>
                        <div className={`${s.featGrid} ${e.featGrid3}`}>
                            {t.feats.map((f, i) => (
                                <div className={s.feat} key={f.t}>
                                    <div className={s.featIcon}>
                                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{FEAT_ICONS[i]}</svg>
                                    </div>
                                    <h3>{f.t}</h3>
                                    <p>{f.d}</p>
                                </div>
                            ))}
                        </div>
                        <div className={e.shots}>
                            <figure className={`${e.miniShot} ${e.phoneShot}`}>
                                <Image src="/crm/estate/viewing-booking-live.webp" alt={pt ? "Marcação de visita no site da Miralume Homes, no telemóvel" : "Booking a viewing on the Miralume Homes website, on a phone"} width={403} height={911} sizes="(max-width: 800px) 70vw, 300px" />
                            </figure>
                            <figure className={e.miniShot}>
                                <Image src="/crm/estate/property-live.webp" alt={pt ? "Um imóvel no CRM: fotos, mapa, consultor e separadores para interessados, visitas e documentos" : "A home in the CRM: photos, map, agent, and tabs for interested people, viewings and documents"} width={1552} height={698} sizes="(max-width: 800px) 100vw, 620px" />
                            </figure>
                        </div>
                    </div>
                </section>

                <section className={s.section} id="lettings" style={{ paddingTop: 0 }}>
                    <div className={s.wrap}>
                        <div className={s.head}>
                            <span className={s.eyebrow}>{t.pmEyebrow}</span>
                            <h2>{t.pmTitle}</h2>
                            <p className={s.muted}>{t.pmSub}</p>
                        </div>
                        <div className={`${s.featGrid} ${e.featGrid3}`}>
                            {t.pm.map((f, i) => (
                                <div className={s.feat} key={f.t}>
                                    <div className={s.featIcon}>
                                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{PM_ICONS[i]}</svg>
                                    </div>
                                    <h3>{f.t}</h3>
                                    <p>{f.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={s.section} id="connections" style={{ paddingTop: 0 }}>
                    <div className={s.wrap}>
                        <div className={s.head}>
                            <span className={s.eyebrow}>{t.connEyebrow}</span>
                            <h2>{t.connTitle}</h2>
                        </div>
                        <div className={`${s.featGrid} ${e.featGrid3}`}>
                            {t.conns.map((c) => (
                                <div className={s.feat} key={c.t}>
                                    <h3>{c.t}</h3>
                                    <p>{c.d}</p>
                                    <p className={e.small}><b>{c.s}</b></p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={s.section} id="website" style={{ paddingTop: 0 }}>
                    <div className={s.wrap}>
                        <div className={e.siteDemo}>
                            <div>
                                <span className={s.eyebrow}>{t.siteEyebrow}</span>
                                <h2>{t.siteTitle}</h2>
                                <p className={s.muted}>{t.siteSub}</p>
                                <ul className={e.sitePoints}>
                                    {t.sitePoints.map((pt2) => <li key={pt2}><Check />{pt2}</li>)}
                                </ul>
                                <a className={`${s.btn} ${s.btnGold}`} href={DEMO_AGENCY_SITE} target="_blank" rel="noopener noreferrer">
                                    {t.siteOpen} <span aria-hidden="true">↗</span>
                                </a>
                            </div>
                            <a className={e.siteShot} href={DEMO_AGENCY_SITE} target="_blank" rel="noopener noreferrer" aria-label={t.siteOpen}>
                                <span className={e.siteBadge}><i aria-hidden="true" />{t.siteBadge}</span>
                                <Image src="/crm/estate/devices.webp" alt={pt ? "O site da Miralume Homes no portátil, tablet e telemóvel" : "The Miralume Homes website on a laptop, tablet and phone"} width={2071} height={1204} sizes="(max-width: 900px) 100vw, 640px" />
                            </a>
                        </div>
                    </div>
                </section>

                <section className={`${s.section} ${e.priceSec}`} id="prices">
                    <div className={s.wrap}>
                        <div className={s.head}>
                            <span className={s.eyebrow}>{t.priceEyebrow}</span>
                            <h2>{t.priceTitle}</h2>
                            <p className={s.muted}>{t.priceSub}</p>
                        </div>
                        <div className={e.marketRow} role="group" aria-label={t.market}>
                            <span className={s.muted}>{t.market}</span>
                            {crmMarkets.map((m) => (
                                <button key={m.code} type="button" onClick={() => setMarket(m, true)}
                                    className={`${e.marketChip} ${m.code === market.code ? e.marketOn : ""}`} aria-pressed={m.code === market.code}>
                                    <Flag market={m} size={18} />{pt ? m.namePt : m.name}
                                </button>
                            ))}
                        </div>
                        <div className={e.plans}>
                            {agencyPlans.map((p) => (
                                <div key={p.id} className={`${e.plan} ${p.highlight ? e.planHot : ""}`}>
                                    {p.highlight && <span className={e.hotTag}>{t.popular}</span>}
                                    <h3>{pt ? p.namePt : p.name}</h3>
                                    <p className={e.price}>
                                        <b>{formatPrice(p.price[cur], cur)}</b>
                                        <span>{p.perBranch ? t.perBranch : t.perMonth}</span>
                                    </p>
                                    <p className={e.setup}>{t.setup(formatPrice(p.setup[cur], cur))}</p>
                                    <ul className={e.planList}>
                                        <li><Check />{p.perBranch ? t.perBranchUsers(p.users) : t.users(p.users)}</li>
                                        <li><Check />{t.listings(p.listings)}</li>
                                        {(pt ? p.extrasPt : p.extras).map((x) => <li key={x}><Check />{x}</li>)}
                                    </ul>
                                    <a className={`${s.btn} ${p.highlight ? s.btnGold : s.btnGhost} ${e.planBtn}`} href="#book">{t.choose}</a>
                                </div>
                            ))}
                        </div>
                        <p className={`${s.muted} ${e.small}`}>{t.extraUser(formatPrice(extraUser[cur], cur))} {t.vat}</p>
                        <div className={e.every}>
                            <div>
                                <h3>{t.every}</h3>
                                <ul className={s.checks}>
                                    {(pt ? everyPlanPt : everyPlan).map((x) => <li key={x}><Check />{x}</li>)}
                                </ul>
                            </div>
                            <div className={e.promises}>
                                {t.promises.map((x) => <span key={x} className={e.promise}><Check />{x}</span>)}
                            </div>
                        </div>
                    </div>
                </section>

                {pt ? null : (
                <section className={s.section}>
                    <div className={s.wrap}>
                        <div className={s.head}>
                            <span className={s.eyebrow}>{t.cmpEyebrow}</span>
                            <h2>{t.cmpTitle}</h2>
                            <p className={`${s.muted} ${e.small}`}>{t.cmpSub}</p>
                        </div>
                        <div className={e.tableWrap}>
                            <table className={e.cmp}>
                                <thead>
                                    <tr>
                                        <th scope="col">{t.cmpTeam}</th>
                                        <th scope="col" className={e.us}>{t.cmpUs}</th>
                                        {ukCompetitors.map((c) => <th scope="col" key={c.name}>{c.name}<small>{pt ? c.basisPt : c.basis}</small></th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparable.map((p) => (
                                        <tr key={p.id}>
                                            <th scope="row">{t.users(p.users)}</th>
                                            <td className={e.us}><b>£{p.price.GBP}</b>{p.aiReplies ? <small>{t.cmpAi}</small> : null}</td>
                                            {ukCompetitors.map((c) => <td key={c.name}>£{c.team(p.users)}</td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                )}

                <section className={s.section} style={{ paddingTop: 0 }}>
                    <div className={s.wrap}>
                        <div className={s.head}>
                            <span className={s.eyebrow}>{t.switchEyebrow}</span>
                            <h2>{t.switchTitle}</h2>
                        </div>
                        <div className={`${s.steps} ${pt ? e.stepsPt : ""}`}>
                            {t.steps.map((st) => <div className={s.step} key={st.t}><h3>{st.t}</h3><p>{st.d}</p></div>)}
                        </div>
                        <div className={e.portals}>
                            <b>{t.portalsTitle}</b>
                            <p>{t.portals}</p>
                        </div>
                    </div>
                </section>

                <section className={`${s.section} ${s.formSec}`} id="book">
                    <div className={s.wrap}>
                        <div className={s.bookHead}>
                            <div className={s.head} style={{ margin: 0 }}>
                                <span className={s.eyebrow}>{t.bookEyebrow}</span>
                                <h2>{t.bookTitle}</h2>
                                <p className={s.muted}>{t.bookSub}</p>
                            </div>
                            <ul className={s.checks}>
                                {t.checks.map((c) => <li key={c}><Check />{c}</li>)}
                            </ul>
                        </div>
                        <div className={s.bookingCard}><BookingEmbed lang={pt ? "pt" : "en"} /></div>
                        <p className={s.bookFallback}>
                            {t.fallback}{" "}
                            <a href="https://book.autisync.com/apps/appointments/p/autisync-agency" target="_blank" rel="noopener noreferrer">{t.fallbackLink}</a>
                            {t.fallbackTail}
                        </p>
                    </div>
                </section>

                <section className={s.section}>
                    <div className={s.wrap}>
                        <div className={s.faq}>
                            <div className={s.head}>
                                <span className={s.eyebrow}>FAQ</span>
                                <h2>{t.faqTitle}</h2>
                            </div>
                            {t.faq.map((f) => (
                                <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

        </div>
    );
}
