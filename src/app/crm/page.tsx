import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DM_Sans, Outfit } from "next/font/google";
import ProposalForm from "./ProposalForm";
import s from "./crm.module.css";

const display = Outfit({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-crm-display" });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-crm-body" });

const URL = "https://www.autisync.com/crm";
const TITLE = "Autisync CRM: All your clients in one dashboard";
const DESCRIPTION =
    "The Autisync CRM brings your contacts, leads and sales pipeline into one place, with automated follow-ups. Set up for your business by Autisync. Request a tailored proposal.";

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: URL },
    openGraph: {
        type: "website",
        url: URL,
        siteName: "Autisync",
        title: TITLE,
        description: DESCRIPTION,
        images: [{ url: "/crm/og-crm.png", width: 1200, height: 630, alt: "Autisync CRM: All your clients. One dashboard." }],
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        images: ["/crm/og-crm.png"],
    },
};

const productSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Autisync CRM",
    serviceType: "Customer relationship management setup",
    provider: { "@type": "Organization", name: "Autisync", url: "https://www.autisync.com" },
    areaServed: ["GB", "PT", "NA", "AO"],
    url: URL,
    description: DESCRIPTION,
};

const Cross = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M18 6 6 18M6 6l12 12" />
    </svg>
);
const Check = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
    </svg>
);
const icon = (d: React.ReactNode) => (
    <div className={s.featIcon}>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {d}
        </svg>
    </div>
);

const PAINS = [
    { t: "Leads go cold", d: "A new enquiry arrives on WhatsApp on Friday and nobody replies until Tuesday." },
    { t: "Follow-ups depend on memory", d: "Quotes are sent but never chased, because the reminder was a note on someone's phone." },
    { t: "No clear view of sales", d: "You can't say how many deals are open or what they're worth without digging through spreadsheets." },
];

const FEATURES = [
    {
        t: "Every client, organised",
        d: "Keep contact details, notes and conversation history for each client in one shared record your whole team can see.",
        i: (<><path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" /><circle cx="9" cy="7" r="4" /><path d="M22 19v-1a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>),
    },
    {
        t: "Visual sales pipeline",
        d: "Move each lead from first contact to won, and see at a glance how many deals are open and where they're stuck.",
        i: (<><rect x="3" y="4" width="5" height="16" rx="1.5" /><rect x="10" y="4" width="5" height="11" rx="1.5" /><rect x="17" y="4" width="4" height="7" rx="1.5" /></>),
    },
    {
        t: "Automated follow-ups",
        d: "Reminders and notifications tell you who to contact next, so quotes get chased and appointments get confirmed.",
        i: (<><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0" /></>),
    },
    {
        t: "Works on any device",
        d: "Check your pipeline and update a client from your laptop at the office or your phone between meetings.",
        i: (<><rect x="2" y="4" width="15" height="11" rx="2" /><rect x="15" y="9" width="7" height="12" rx="1.5" /><path d="M6 19h6" /></>),
    },
];

const STEPS = [
    { t: "Request a proposal", d: "Tell us about your business in the short form below." },
    { t: "Discovery call", d: "We learn how you find, sell to and serve clients today." },
    { t: "Setup and import", d: "We configure your pipeline stages and bring in your existing contacts." },
    { t: "Go live", d: "Your team gets a walkthrough and ongoing support from Autisync." },
];

const FAQ = [
    { q: "How much does the Autisync CRM cost?", a: "Pricing depends on your team size and how much setup you need. Your proposal includes a clear quote, and you don't commit to anything until you approve it." },
    { q: "Do I have to move my contacts myself?", a: "No. Setup is done for you. Send us your spreadsheet or contact list during onboarding and we'll bring it into the CRM." },
    { q: "Can my whole team use it?", a: "Yes. Everyone on your team works from the same client records and pipeline, so there's one version of the truth." },
    { q: "I already have a website with Autisync. Does the CRM connect to it?", a: "Tell us in the form. We'll look at how your current forms and booking tools can feed new leads straight into your pipeline." },
];

export default function CrmLandingPage() {
    return (
        <div className={`${display.variable} ${body.variable} ${s.page}`}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

            <nav className={s.nav}>
                <div className={`${s.wrap} ${s.navInner}`}>
                    <Link className={s.logo} href="/" aria-label="Autisync home">
                        <img src="/crm/autisync-mark-white.svg" alt="" width={45} height={30} />
                        <span className={s.logoWord}>Autisync</span>
                    </Link>
                    <a className={`${s.btn} ${s.btnGold} ${s.navBtn}`} href="#proposal">Request a proposal</a>
                </div>
            </nav>

            <main>
                <header className={s.hero}>
                    <div className={s.wrap}>
                        <div className={s.heroCopy}>
                            <span className={s.pill}><i />New · Autisync CRM</span>
                            <h1 className={s.heroTitle}>All your clients.<br /><span>One dashboard.</span></h1>
                            <p className={s.lead}>
                                The Autisync CRM brings your contacts, leads and sales pipeline into one place, with automated
                                follow-ups so no client slips through the cracks. We set it up for your business, so you can start
                                using it straight away.
                            </p>
                            <div className={s.ctaRow}>
                                <a className={`${s.btn} ${s.btnGold}`} href="#proposal">Request your proposal</a>
                                <a className={`${s.btn} ${s.btnGhost}`} href="#features">See what&apos;s inside</a>
                            </div>
                            <p className={s.trust}>For service businesses in the UK, Portugal, Namibia and Angola.</p>
                        </div>
                        <figure className={s.shot}>
                            <Image
                                src="/crm/crm-dashboard.webp"
                                alt="Autisync CRM pipeline view with leads in New lead, Contacted, Proposal and Won columns"
                                width={2120}
                                height={1200}
                                priority
                                sizes="(max-width: 1120px) 100vw, 1060px"
                            />
                            <figcaption>Illustrative example</figcaption>
                        </figure>
                    </div>
                </header>

                <section className={`${s.section} ${s.pains}`}>
                    <div className={`${s.wrap} ${s.painsGrid}`}>
                        <div className={s.head} style={{ margin: 0 }}>
                            <span className={s.eyebrow}>Sound familiar?</span>
                            <h2>Your clients are spread across five different places.</h2>
                        </div>
                        <div>
                            {PAINS.map((p) => (
                                <div className={s.pain} key={p.t}>
                                    <Cross />
                                    <div><h3>{p.t}</h3><p>{p.d}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={s.section} id="features">
                    <div className={s.wrap}>
                        <div className={s.head}>
                            <span className={s.eyebrow}>What&apos;s inside</span>
                            <h2>Everything you need to win and keep clients.</h2>
                        </div>
                        <div className={s.featGrid}>
                            {FEATURES.map((f) => (
                                <div className={s.feat} key={f.t}>
                                    {icon(f.i)}
                                    <h3>{f.t}</h3>
                                    <p>{f.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={s.section} style={{ paddingTop: 0 }}>
                    <div className={s.wrap}>
                        <div className={s.head}>
                            <span className={s.eyebrow}>How it works</span>
                            <h2>From proposal to live CRM, done for you.</h2>
                        </div>
                        <div className={s.steps}>
                            {STEPS.map((st) => (
                                <div className={s.step} key={st.t}><h3>{st.t}</h3><p>{st.d}</p></div>
                            ))}
                        </div>
                        <div className={s.who}>
                            <b>Built for</b>
                            {["Clinics", "Salons & studios", "Consultants", "Legal & finance", "Agencies", "Trades & field services"].map((c) => (
                                <span className={s.chip} key={c}>{c}</span>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={`${s.section} ${s.formSec}`} id="proposal">
                    <div className={`${s.wrap} ${s.formGrid}`}>
                        <div className={s.formSide}>
                            <span className={s.eyebrow}>Request a proposal</span>
                            <h2>Get a CRM plan and quote for your business.</h2>
                            <p className={s.muted}>
                                Answer a few questions and our team will send you a tailored proposal, with the setup, features and
                                price for your team.
                            </p>
                            <ul className={s.checks}>
                                <li><Check />Takes about 2 minutes</li>
                                <li><Check />No commitment until you approve the proposal</li>
                                <li><Check />Setup handled by the Autisync team</li>
                            </ul>
                        </div>
                        <div>
                            <ProposalForm />
                        </div>
                    </div>
                </section>

                <section className={s.section}>
                    <div className={s.wrap}>
                        <div className={s.faq}>
                            <div className={s.head}>
                                <span className={s.eyebrow}>Questions</span>
                                <h2>Before you ask</h2>
                            </div>
                            {FAQ.map((f) => (
                                <details key={f.q}>
                                    <summary>{f.q}</summary>
                                    <p>{f.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className={s.footer}>
                <div className={`${s.wrap} ${s.footerInner}`}>
                    <span>© {new Date().getFullYear()} Autisync · A trading name of Maheldom Consulting, Lda</span>
                    <span>
                        <Link href="/">autisync.com</Link> · <Link href="/PrivacyPolicy">Privacy Policy</Link> ·{" "}
                        <Link href="/TermsofUse">Terms of Use</Link>
                    </span>
                </div>
            </footer>
        </div>
    );
}
