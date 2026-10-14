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

export default function EstateAgents({ locale }: { locale: Locale }) {
    const t = T[locale];
    const pt = locale === "pt";
    const { market, setMarket } = useMarket();
    const cur = market.currency;
    const comparable = agencyPlans.filter((p) => p.id !== "multi");

    return (
        <div className={s.page}>
            <nav className={s.nav}>
                <div className={`${s.wrap} ${s.navInner}`}>
                    <Link className={s.logo} href={pt ? "/pt" : "/"} aria-label="Autisync">
                        <img src="/crm/autisync-mark-white.svg" alt="" width={45} height={30} />
                        <span className={s.logoWord}>Autisync</span>
                    </Link>
                    <div className={e.navRight}>
                        <Link className={e.langLink} href={t.otherHref} hrefLang={pt ? "en" : "pt"}>{t.other}</Link>
                        <a className={`${s.btn} ${s.btnGold} ${s.navBtn}`} href="#book">{t.book}</a>
                    </div>
                </div>
            </nav>

            <main>
                <header className={s.hero}>
                    <div className={s.wrap}>
                        <div className={s.heroCopy}>
                            <span className={s.pill}><i />{t.pill}</span>
                            <h1 className={s.heroTitle}>{t.h1a}<br /><span>{t.h1b}</span></h1>
                            <p className={s.lead}>{t.lead}</p>
                            <div className={s.ctaRow}>
                                <a className={`${s.btn} ${s.btnGold}`} href="#prices">{t.seePrices}</a>
                                <a className={`${s.btn} ${s.btnGhost}`} href="#book">{t.book}</a>
                            </div>
                            <p className={s.trust}>{t.trust}</p>
                        </div>
                        <figure className={s.shot}>
                            <Image
                                src="/crm/estate/properties.png"
                                alt={pt ? "Autisync CRM: lista de imóveis com fotos, preço, estado e interessados" : "Autisync CRM properties view: listings with photos, price, status and interested buyers"}
                                width={2400}
                                height={1400}
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
                            <figure className={e.miniShot}>
                                <Image src="/crm/estate/viewing-booking.png" alt={pt ? "Página de marcação de visita no telemóvel" : "Viewing booking page on a phone"} width={900} height={1200} sizes="(max-width: 800px) 100vw, 420px" />
                            </figure>
                            <figure className={e.miniShot}>
                                <Image src="/crm/estate/viewings-diary.png" alt={pt ? "Agenda de visitas da agência" : "The agency's viewings diary"} width={1400} height={1000} sizes="(max-width: 800px) 100vw, 620px" />
                            </figure>
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
                            {markets.map((m) => (
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
            </main>

            <footer className={s.footer}>
                <div className={`${s.wrap} ${s.footerInner}`}>
                    <span>© {new Date().getFullYear()} Autisync · {t.footer}</span>
                    <span>
                        <Link href={pt ? "/pt" : "/"}>autisync.com</Link> · <Link href="/crm">CRM</Link> · <Link href="/PrivacyPolicy">Privacy Policy</Link> ·{" "}
                        <Link href="/TermsofUse">Terms of Use</Link>
                    </span>
                </div>
            </footer>
        </div>
    );
}
