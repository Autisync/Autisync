import type { Metadata } from "next";
import StepInside from "@/app/components/StepInside";
import { CafeNav, ProductRow, MixBlock, DemoEnd } from "./DemoCafe";
import { FunnelShell, BookSection, Faq, faqSchema, Check } from "@/app/components/FunnelShell";
import { carePlanMonthly, formatPrice, websiteTiers } from "@/lib/website-packages";
import s from "@/app/crm/crm.module.css";
import f from "@/app/components/funnel.module.css";

const URL = "https://www.autisync.com/websites/step-inside";
const TITLE = "Step-inside websites: let customers walk in before they arrive | Autisync";
const DESCRIPTION =
    "A website that opens with a walk from the street into your shop, café, salon or clinic, played as visitors scroll. Filmed on a phone in 20 seconds, built by Autisync, with bookings going straight into your CRM.";

// Which package a step-inside site is priced from. Change here if the offer changes.
const TIER = websiteTiers.find((t) => t.name === "Small Business") ?? websiteTiers[1];

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: URL },
    openGraph: { type: "website", url: URL, siteName: "Autisync", title: TITLE, description: DESCRIPTION, images: [{ url: "/step-inside/cafe-demo/desktop/f_0040.webp", width: 1200, height: 675 }] },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

// Demo walk-in cut from free Pexels footage (Pexels License; master in
// marketing/step-inside/walkin-demo-1080p.mp4). Swap for a real client walk-in
// (scripts/step-inside/make-frames.ps1) and update the counts.
const DESKTOP = { dir: "/step-inside/cafe-demo/desktop", count: 130 };
const MOBILE = { dir: "/step-inside/cafe-demo/mobile", count: 130 };

const STEPS = [
    { t: "We film 20 seconds", d: "On a phone, at your door: along the shopfront, open the door, step in and look across the counter. Five minutes, no film crew." },
    { t: "We build your site around it", d: "The walk-in becomes your homepage. Below it: your menu or services, real photos, real Google reviews, opening hours and a map." },
    { t: "Bookings land in your CRM", d: "Orders, bookings and enquiries go into your Autisync CRM, so nothing is lost in a notebook or a DM." },
];

const FITS = ["Cafés & restaurants", "Barbers & salons", "Aesthetics clinics", "Gyms & studios", "Shops & showrooms", "Estate agency offices"];

const INCLUDED = [
    "Scroll-driven walk-in hero, vertical version for phones",
    "Menu or services, with your real photos and prices",
    "Google reviews, map, hours, WhatsApp and call buttons",
    "Online booking or ordering into the Autisync CRM",
    "Fast on mobile: frames load progressively",
    "Local SEO setup for “[what you do] in [your area]”",
];

const FAQ = [
    { q: "Do I need a professional video?", a: "No. A modern phone is enough. We film it on a quick visit, or send you a one-page guide so you can film it yourself in five minutes." },
    { q: "Will the video slow my website down?", a: "No. It isn't a heavy video file. We turn it into small, compressed images that load in the background while the first screen appears, and phones get a lighter vertical version." },
    { q: "What if my shop changes?", a: "We re-film and swap it in. Updates are part of the monthly care plan." },
    { q: "Can customers book or order from the site?", a: "Yes. Bookings, orders and enquiries go into your Autisync CRM with notifications, so you can reply quickly." },
    { q: "What about people who prefer less motion?", a: "If someone's device is set to reduce motion, they see a still photo of your shop instead of the scroll effect." },
];

const schema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Service",
            name: "Step-inside website",
            serviceType: "Website design with scroll-driven walk-in video",
            provider: { "@type": "Organization", name: "Autisync", url: "https://www.autisync.com" },
            areaServed: ["GB", "PT", "AO"],
            url: URL,
            description: DESCRIPTION,
            offers: { "@type": "Offer", priceCurrency: "GBP", price: TIER.price.GBP, description: `From ${formatPrice(TIER.price.GBP, "GBP")}, first year` },
        },
        faqSchema(FAQ),
    ],
};

export default function StepInsidePage() {
    const from = formatPrice(TIER.price.GBP, "GBP");
    const care = formatPrice(carePlanMonthly.GBP, "GBP");
    return (
        <FunnelShell schema={schema} hideNav>
            {/* The demo café: what a client's site looks like. */}
            <StepInside desktop={DESKTOP} mobile={MOBILE} poster="/step-inside/cafe-demo/desktop/f_0001.webp"
                label="Step inside Your Café · demo" logo="Your Café" overlay={<CafeNav />}>
                <p className={s.lead} style={{ color: "#fff", maxWidth: 520, fontWeight: 500 }}>
                    Fresh bakes from 7am. Coffee you&apos;ll come back for.
                </p>
            </StepInside>
            <ProductRow />
            <MixBlock />
            <DemoEnd />

            {/* Autisync's own sales page from here. */}
            <section className={s.section}>
                <div className={s.wrap}>
                    <span className={s.pill}><i />Step-inside websites by Autisync</span>
                    <h1 className={s.heroTitle} style={{ maxWidth: 860, marginTop: 14 }}>
                        Let customers walk in<br /><span>before they arrive.</span>
                    </h1>
                    <p className={s.lead} style={{ maxWidth: 680, marginTop: 16 }}>
                        People decide whether to visit a café, salon or clinic in a few seconds on their phone. A real walk
                        through your door shows them the place, the counter and the vibe, before they&apos;ve read a word.
                    </p>
                    <div className={s.ctaRow} style={{ marginTop: 22 }}>
                        <a className={`${s.btn} ${s.btnGold}`} href="#book">Get one for your business</a>
                        <a className={`${s.btn} ${s.btnGhost}`} href="#how">How it works</a>
                    </div>
                </div>
            </section>

            <section className={s.section} id="how" style={{ paddingTop: 0 }}>
                <div className={s.wrap}>
                    <div className={s.head}>
                        <span className={s.eyebrow}>How it works</span>
                        <h2>From your front door to a live website.</h2>
                    </div>
                    <div className={f.cards}>
                        {STEPS.map((st, i) => (
                            <div className={f.cardItem} key={st.t}>
                                <span className={f.num}>{i + 1}</span>
                                <h3>{st.t}</h3>
                                <p>{st.d}</p>
                            </div>
                        ))}
                    </div>
                    <div className={s.who}>
                        <b>Made for</b>
                        {FITS.map((c) => <span className={s.chip} key={c}>{c}</span>)}
                    </div>
                </div>
            </section>

            <section className={s.section} style={{ paddingTop: 0 }}>
                <div className={s.wrap}>
                    <div className={s.head}>
                        <span className={s.eyebrow}>What you get</span>
                        <h2>Everything a local business site needs, with a front door.</h2>
                    </div>
                    <ul className={s.checks} style={{ columns: 2, columnGap: 32 }}>
                        {INCLUDED.map((x) => <li key={x}><Check />{x}</li>)}
                    </ul>
                    <div className={f.price} style={{ marginTop: 32 }}>
                        <span className={s.muted}>From</span>
                        <span className={f.priceBig}>{from}</span>
                        <span className={s.muted}>first year, domain and hosting included</span>
                        <p>Built on our {TIER.name} package. From year 2: {care}/month for hosting, email, backups and changes.</p>
                    </div>
                </div>
            </section>

            <section className={s.section} style={{ paddingTop: 0 }}>
                <div className={`${s.wrap} ${f.statement}`}>
                    <div>
                        <span className={s.eyebrow}>Add-on</span>
                        <h2>Tap-for-review tags.</h2>
                        <p className={s.lead} style={{ marginTop: 12 }}>
                            When a customer is clearly enjoying themselves, your team asks for a review before they leave. They
                            tap the tag with their phone and land straight on your Google review page.
                        </p>
                    </div>
                    <ul className={s.checks}>
                        <li><Check />No app, no searching for your business</li>
                        <li><Check />Works on iPhone and Android, with a QR code as backup</li>
                        <li><Check />More reviews each week helps you show up in &ldquo;best [what you do] near me&rdquo; searches</li>
                    </ul>
                </div>
            </section>

            <BookSection
                eyebrow="Book a call"
                title="Want your business to have one?"
                text="Pick a time. We'll look at your current site, plan the walk-in and send you a fixed price."
                points={["Fixed price before we start", "We film, or guide you to film it", "Bookings into the Autisync CRM"]}
            />
            <Faq items={FAQ} />
        </FunnelShell>
    );
}
