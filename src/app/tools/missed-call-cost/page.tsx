import type { Metadata } from "next";
import { FunnelShell, BookSection, Faq, faqSchema } from "@/app/components/FunnelShell";
import MissedCallCalculator from "./MissedCallCalculator";
import s from "@/app/crm/crm.module.css";
import f from "@/app/components/funnel.module.css";

const URL = "https://www.autisync.com/tools/missed-call-cost";
const TITLE = "Missed call cost calculator: how much are missed calls costing your business?";
const DESCRIPTION =
    "Free calculator for trades, clinics and local businesses. Enter your missed calls a week and average job value to see what they cost you a month and a year.";

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: {
        canonical: URL,
        languages: { en: "https://www.autisync.com/tools/missed-call-cost", pt: "https://www.autisync.com/pt/ferramentas/custo-chamadas-perdidas", "x-default": "https://www.autisync.com/tools/missed-call-cost" },
    },
    openGraph: { type: "website", url: URL, siteName: "Autisync", title: TITLE, description: DESCRIPTION },
};

const FAQ = [
    { q: "How do I count my missed calls?", a: "Open your phone's recent calls and filter by missed. Count a normal week, not a holiday week. If you have a business line or a VoIP system, its call report will show unanswered calls." },
    { q: "Why do missed callers not call back?", a: "Most people who need a plumber, a dentist or a table tonight simply ring the next business on Google. The first business to respond usually gets the job." },
    { q: "What is a missed call text-back?", a: "When you can't answer, the caller gets an instant text from your business, for example 'Sorry we missed you, what can we help with?'. Their reply, name and postcode go into your CRM with a reminder to ring back." },
    { q: "Does this work for sole traders on a mobile?", a: "Yes. Missed calls on your mobile can be forwarded to a business number that sends the text and logs the lead, so you keep your own phone." },
    { q: "Are my calls shared with other trades?", a: "No. Your calls and enquiries are yours, never shared or sold. Each one goes to you and into your own CRM, not to four other businesses." },
];

const schema = {
    "@context": "https://schema.org",
    "@graph": [
        { "@type": "WebApplication", name: "Missed call cost calculator", url: URL, applicationCategory: "BusinessApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: 0, priceCurrency: "GBP" }, provider: { "@type": "Organization", name: "Autisync", url: "https://www.autisync.com" } },
        faqSchema(FAQ),
    ],
};

export default function MissedCallCostPage() {
    return (
        <FunnelShell schema={schema} navCta="Fix missed calls">
            <header className={s.section} style={{ paddingBottom: 0 }}>
                <div className={s.wrap}>
                    <span className={s.pill}><i />Free tool</span>
                    <h1 className={s.heroTitle} style={{ marginTop: 14, maxWidth: 860 }}>How much are missed calls <span>costing you?</span></h1>
                    <p className={s.lead} style={{ maxWidth: 680, marginTop: 14 }}>
                        Every call you can&apos;t answer while you&apos;re on a job or with a client could be work for someone else.
                        Put in your own numbers to see what it adds up to.
                    </p>
                    <MissedCallCalculator />
                </div>
            </header>

            <section className={s.section}>
                <div className={`${s.wrap} ${f.prose}`}>
                    <h2>How the calculation works</h2>
                    <p>
                        We take your <strong>missed calls a week</strong>, keep only the share that are <strong>new enquiries</strong>,
                        then apply the share you <strong>normally win</strong> when you do pick up. That gives the jobs lost each
                        month, multiplied by your <strong>average job value</strong>.
                    </p>
                    <p>
                        The last line shows what you&apos;d keep if an instant text-back stopped some of those callers ringing the next
                        business. That&apos;s what Autisync&apos;s missed-call text-back does: the caller gets a text in seconds, their answer
                        goes into your Autisync CRM, and you get a &ldquo;Ring back&rdquo; reminder with the job details.
                    </p>
                    <p>
                        Run a clinic or a salon? <a href="/clinics">See what we set up for clinics and salons</a>.
                    </p>
                </div>
            </section>

            <BookSection
                eyebrow="Stop losing missed calls"
                title="Set up a missed-call text-back for your business."
                text="Book a short call. We'll look at how your calls come in today and set up the text-back on your number."
                points={["Keep your own mobile number", "Missed callers on a mobile texted back in seconds", "Your calls and enquiries are yours, never shared or sold"]}
            />
            <Faq items={FAQ} />
        </FunnelShell>
    );
}
