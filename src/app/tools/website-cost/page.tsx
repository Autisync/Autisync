import type { Metadata } from "next";
import { FunnelShell, BookSection, Faq, faqSchema } from "@/app/components/FunnelShell";
import WebsiteCostEstimator from "./WebsiteCostEstimator";
import { carePlanMonthly, formatPrice, websiteTiers } from "@/lib/website-packages";
import s from "@/app/crm/crm.module.css";
import f from "@/app/components/funnel.module.css";

const URL = "https://www.autisync.com/tools/website-cost";
const TITLE = "How much does a website cost in the UK? Free small business estimator";
const DESCRIPTION =
    "Pick your pages and features and see what a small business website costs with Autisync, including domain, hosting and what you pay from year two.";

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: URL },
    openGraph: { type: "website", url: URL, siteName: "Autisync", title: TITLE, description: DESCRIPTION },
};

const low = formatPrice(websiteTiers[0].price.GBP, "GBP");
const care = formatPrice(carePlanMonthly.GBP, "GBP");

const FAQ = [
    { q: "How much does a small business website cost with Autisync?", a: `Our websites start at ${low} for the first year, including the domain, hosting and SSL. From the second year it's ${care} a month for hosting, email, backups and small changes.` },
    { q: "What makes a website cost more?", a: "Mostly the number of pages, writing and photography, online booking or payments, an online shop, and connections to other systems such as a CRM. Ongoing costs are hosting, the domain, email and updates." },
    { q: "Are there hidden costs?", a: "Ask any web designer what happens after year one. Domain, hosting and email renew every year. With Autisync that is the monthly care plan, shown up front." },
    { q: "How long does it take?", a: "From about three weeks for a small site to around two months for a large one with integrations. The estimator shows the time for each package." },
];

const schema = {
    "@context": "https://schema.org",
    "@graph": [
        { "@type": "WebApplication", name: "Website cost estimator (UK)", url: URL, applicationCategory: "BusinessApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: 0, priceCurrency: "GBP" }, provider: { "@type": "Organization", name: "Autisync", url: "https://www.autisync.com" } },
        faqSchema(FAQ),
    ],
};

export default function WebsiteCostPage() {
    return (
        <FunnelShell schema={schema} navCta="Get a quote">
            <header className={s.section} style={{ paddingBottom: 0 }}>
                <div className={s.wrap}>
                    <span className={s.pill}><i />Free tool</span>
                    <h1 className={s.heroTitle} style={{ marginTop: 14, maxWidth: 880 }}>How much does a website <span>cost in the UK?</span></h1>
                    <p className={s.lead} style={{ maxWidth: 680, marginTop: 14 }}>
                        Choose what your business needs and see the price straight away, including what you&apos;ll pay after the
                        first year.
                    </p>
                    <WebsiteCostEstimator />
                </div>
            </header>

            <section className={s.section}>
                <div className={`${s.wrap} ${f.prose}`}>
                    <h2>What you&apos;re paying for</h2>
                    <p><strong>The build.</strong> Design, pages, writing, photos and making it work well on phones. More pages and custom features take longer.</p>
                    <p><strong>Features that bring in work.</strong> Online booking, enquiry forms that go into a CRM, WhatsApp and call buttons, reviews and a map.</p>
                    <p><strong>Running costs.</strong> Domain, hosting, SSL, business email, backups and updates. These renew every year with any provider, so always ask what year two costs.</p>
                    <p><strong>Being found.</strong> Basic local SEO, so you show up for &ldquo;[what you do] in [your town]&rdquo;.</p>
                </div>
            </section>

            <BookSection
                eyebrow="Get a fixed quote"
                title="Tell us about your business."
                text="Book a short call. We'll recommend the right package and send a fixed price before any work starts."
                points={["Fixed price, no surprises", "Domain and hosting included in year one", "Bookings and enquiries into the Autisync CRM"]}
            />
            <Faq items={FAQ} />
        </FunnelShell>
    );
}
