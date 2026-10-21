import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/solid";
import Promises from "@/app/components/Promises";
import BookingEmbed from "@/app/crm/BookingEmbed";
import { carePlanMonthly, formatPrice, websiteTiers } from "@/lib/website-packages";

/**
 * /clinics — clinics, dental practices, aesthetic clinics and salons in the UK.
 * The English twin of /pt/clinicas (same sections, same design).
 *
 * Only what the CRM does today for these businesses (see the clinic and
 * beauty playbooks in the CRM): website, online booking with reminders, an
 * instant WhatsApp reply to every new enquiry, review requests, rebooking and
 * recall reminders, and invoices. Unlike Portugal, missed-call text-back
 * (CallCatch) works here: it texts callers on UK mobiles. It replies by text
 * (SMS) only; do not promise WhatsApp replies from CallCatch until it has them.
 * No testimonials or statistics until there are real ones to show.
 */

const URL = "https://www.autisync.com/clinics";
const PT_URL = "https://www.autisync.com/pt/clinicas";
const WHATSAPP = "https://wa.me/447795866571";
const wa = (text: string) => `${WHATSAPP}?text=${encodeURIComponent(text)}`;
const WA_TEXT = "Hi Autisync, I saw your page for clinics and salons and would like to know more.";

const gbp = (n: number) => formatPrice(n, "GBP");
const [startup, smallBiz] = websiteTiers;
const care = gbp(carePlanMonthly.GBP);

const TITLE = "Missed-call text-back, online booking and WhatsApp for clinics and salons";
const DESCRIPTION =
    "For UK clinics, dental practices, aesthetic clinics and salons: missed callers texted back, online booking with reminders, instant WhatsApp replies, review requests and recall reminders. Set up for you, with no 12-month contract.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: URL, languages: { en: URL, pt: PT_URL, "x-default": URL } },
    openGraph: {
        title: "Every missed call is a missed booking — Autisync",
        description: DESCRIPTION,
        url: URL,
        locale: "en_GB",
        type: "website",
    },
};

// The first card (the UK's extra: missed-call text-back) runs the full width,
// so the other six sit in even rows.
const bundle = [
    {
        t: "Missed-call text-back",
        d: "When you can't pick up, a caller on a UK mobile gets a text from your business within seconds asking what they need. Their reply goes into your CRM inbox with a reminder to ring back. You keep your own number.",
    },
    {
        t: "A professional website",
        d: "Quick on a phone, with your treatments, your team and the booking button always in view. Domain, hosting and email included for the first year.",
    },
    {
        t: "Online booking with reminders",
        d: "Clients choose the treatment and the time, day or night. They get a confirmation and a reminder before they come, by WhatsApp or email.",
    },
    {
        t: "Instant WhatsApp replies",
        d: "Anyone who messages you on WhatsApp or through your website gets an instant reply, out of hours too. The conversation lands in your inbox with a task for the team to answer.",
    },
    {
        t: "Review requests",
        d: "A few hours after the appointment, the client is invited to leave a Google review while the visit is still fresh.",
    },
    {
        t: "Rebooking and recall reminders",
        d: "When the next check-up, top-up or trim is due, the client is invited to book. Anyone who misses an appointment is offered a new date.",
    },
    {
        t: "Invoices and payments",
        d: "Invoices and payment requests straight from the client's record.",
    },
];

const example = [
    { when: "11:20", what: "You're with a patient. A new client rings from their mobile and you can't answer." },
    { when: "11:20", what: "They get a text from your business straight away: sorry we missed you, how can we help?" },
    { when: "11:23", what: "They reply that they'd like a consultation. It's in your inbox with a reminder to ring back." },
    { when: "21:00", what: "Another client messages you on WhatsApp to ask if there's anything free on Friday." },
    { when: "21:00", what: "They get your reply at once, written by you once: for example, with the link to book online." },
    { when: "21:05", what: "They book themselves. It goes into the diary and they get a confirmation." },
    { when: "Before the visit", what: "They get a reminder of the appointment." },
    { when: "Afterwards", what: "They get the review request and, when it's due, the invitation to book again." },
];

const promises = [
    { t: "No 12-month contract", d: "Monthly. After any minimum written in your proposal, cancel with 30 days' notice, by email or from your account." },
    { t: "Renewals flagged", d: "We remind you 30 days before anything renews for a year, such as your domain." },
    { t: "One partner, one bill", d: "Website, domain, email, CRM, booking, missed-call text-back, invoices, posts and ads, with the same team." },
    { t: "Set up for you", d: "We do the set-up and import your client list. You talk to a named person on our team, on WhatsApp, weekdays 9:00 to 18:00 (UK time)." },
    { t: "Your records are yours", d: "Your website, your domain and your clients' data belong to you. Export everything to Excel or CSV whenever you like; if you leave, we hand it all over within 30 days." },
    { t: "Prices up front", d: "Website and care plan prices are on this page. The monthly price of the CRM and the text-back is written in your proposal, before you decide." },
];

const steps = [
    { t: "1-minute quiz", d: "Three questions about your business, and you get a plan for a clinic or salon like yours." },
    { t: "15-minute call", d: "We look at how calls and bookings reach you today and send you a proposal with the price." },
    { t: "We set it all up", d: "Website, diary, missed-call text-back, WhatsApp, automatic messages and your client list, ready to use." },
    { t: "Go live", d: "We show your team how it works, and you keep a named person from our team on WhatsApp." },
];

const faq = [
    {
        q: "Do you answer the calls I can't?",
        a: "We don't answer them for you, but no caller is left waiting. When you miss a call, a caller on a UK mobile gets a text from your business within seconds, and their reply goes into your CRM with a reminder to ring back. The text-back works by text message (SMS), so callers from a landline won't receive one. Clients who prefer to write get an instant reply on WhatsApp or through your website, and can book themselves online.",
    },
    {
        q: "Do I need a new phone number?",
        a: "No. You keep your own number. Calls you can't answer are forwarded to a business number that sends the text and logs the enquiry in your CRM.",
    },
    {
        q: "Is it right for my kind of business?",
        a: "We set the CRM up for aesthetic clinics, dental practices, physiotherapy and other clinics, hair salons, barbers, beauty salons and spas. Rebooking reminders follow each one's rhythm: a dental check-up after six months, an aesthetic top-up after three, a haircut after a few weeks.",
    },
    {
        q: "How much does it cost?",
        a: `Websites start at ${gbp(startup.price.GBP)} (Startup, up to 6 pages) or ${gbp(smallBiz.price.GBP)} (Small Business, 10 pages), paid 50% at the start and 50% at launch, with domain, hosting and email for the first year. From year two, the care plan is ${care} a month. The CRM and the missed-call text-back have a fixed monthly price, written in your proposal before you decide.`,
    },
    {
        q: "Is there a contract?",
        a: "There is no 12-month contract. Plans are monthly: after any minimum written in your proposal, cancel with 30 days' notice, by email or from your account. We remind you 30 days before anything renews for a year, such as your domain.",
    },
    {
        q: "Are my clients' records mine?",
        a: "Yes. Client records, bookings and history are yours. Export everything to Excel or CSV whenever you like and, if you leave, we hand it all over within 30 days.",
    },
    {
        q: "Where is my clients' data kept?",
        a: "On our servers in Germany, in the EU. You decide what happens to your clients' data; we handle it only on your instructions, as your processor. The Autisync CRM Privacy Policy explains the details.",
    },
    {
        q: "Who helps me?",
        a: "A named person from our team, on WhatsApp, weekdays 9:00 to 18:00 (UK time). We set everything up, so you don't have to learn a new system on your own.",
    },
];

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Autisync for clinics and salons",
        serviceType: "Website, online booking, missed-call text-back and CRM with WhatsApp for clinics and salons",
        provider: { "@type": "Organization", name: "Autisync", url: "https://www.autisync.com" },
        areaServed: { "@type": "Country", name: "United Kingdom" },
        audience: { "@type": "BusinessAudience", name: "Clinics, dental practices, aesthetic clinics and salons" },
        url: URL,
        inLanguage: "en-GB",
        description: DESCRIPTION,
        offers: websiteTiers.slice(0, 2).map((t) => ({
            "@type": "Offer",
            name: `${t.name} website`,
            price: t.price.GBP,
            priceCurrency: "GBP",
        })),
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: "en-GB",
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Autisync", item: "https://www.autisync.com" },
            { "@type": "ListItem", position: 2, name: "Clinics and salons", item: URL },
        ],
    },
];

const primaryBtn = "rounded-md bg-[#1C1C1C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#B28228] transition";
const secondaryBtn =
    "rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 hover:border-[#B28228] hover:text-[#B28228] transition";

export default function ClinicsPage() {
    return (
        <div lang="en-GB" className="bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <section className="px-6 pt-32 pb-16 mx-auto max-w-5xl lg:px-8 sm:pt-40">
                <p className="text-sm font-semibold text-[#B28228]">Clinics, dental practices, aesthetic clinics and salons · UK</p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl [text-wrap:balance]">
                    Every missed call is a missed booking.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                    With a client in the chair or a patient in the room, you can&apos;t pick up the phone. So when you miss a call from a
                    mobile, the caller gets a text from your business within seconds. Anyone who writes to you on WhatsApp or through
                    your website gets an instant reply, can book online and gets a reminder before they come.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-10">
                    <Link href="/quiz" className={primaryBtn}>
                        Take the free 1-minute quiz
                    </Link>
                    <a href={wa(WA_TEXT)} target="_blank" rel="noopener noreferrer" className={secondaryBtn}>
                        Message us on WhatsApp
                    </a>
                    <a href="#book" className="text-sm font-semibold text-[#B28228] hover:underline">
                        Book a 15-minute call →
                    </a>
                </div>
                <p className="mt-4 text-sm text-gray-500">No 12-month contract. Set up for you.</p>
            </section>

            {/* What's in the bundle */}
            <section aria-labelledby="clinics-included" className="py-20 bg-gray-50">
                <div className="px-6 mx-auto max-w-5xl lg:px-8">
                    <h2 id="clinics-included" className="text-3xl font-semibold text-gray-800 [text-wrap:balance]">
                        Everything you need to fill the diary, in one place
                    </h2>
                    <p className="mt-4 max-w-2xl text-gray-600">
                        What the Autisync CRM already does today for clinics and salons, connected to your website, your phone and your
                        WhatsApp.
                    </p>
                    <ul className="grid gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3">
                        {bundle.map((b, i) => (
                            <li key={b.t} className={"rounded-xl bg-white p-6 " + (i === 0 ? "ring-2 ring-[#B28228] sm:col-span-2 lg:col-span-3" : "ring-1 ring-gray-200")}>
                                <h3 className="flex items-start gap-2 font-semibold text-gray-800">
                                    <CheckIcon className="flex-none w-5 h-5 mt-0.5 text-[#B28228]" aria-hidden="true" />
                                    {b.t}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-gray-600">{b.d}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* A day, step by step */}
            <section aria-labelledby="clinics-example" className="px-6 py-20 mx-auto max-w-5xl lg:px-8">
                <h2 id="clinics-example" className="text-3xl font-semibold text-gray-800 [text-wrap:balance]">
                    A Tuesday with your hands full
                </h2>
                <ol className="mt-8 space-y-4 border-l-2 border-[#B28228] pl-6">
                    {example.map((e, i) => (
                        <li key={i} className="relative">
                            <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#B28228]" aria-hidden="true" />
                            <p className="text-sm font-semibold text-[#B28228]">{e.when}</p>
                            <p className="text-gray-700">{e.what}</p>
                        </li>
                    ))}
                </ol>
                <p className="mt-6 text-xs text-gray-500">
                    An illustrative example of how the automatic messages work. The text-back reaches callers on mobiles.
                </p>
            </section>

            {/* Promises */}
            <section className="px-6 py-20 bg-gray-50 lg:px-8">
                <Promises id="clinics-no-surprises" eyebrow="No surprises" title="How we work with you" items={promises} />
            </section>

            {/* Prices */}
            <section aria-labelledby="clinics-prices" className="px-6 py-20 mx-auto max-w-5xl lg:px-8">
                <h2 id="clinics-prices" className="text-3xl font-semibold text-gray-800">What it costs</h2>
                <div className="grid gap-6 mt-8 sm:grid-cols-3">
                    {[startup, smallBiz].map((t) => (
                        <div key={t.id} className={"rounded-2xl p-6 ring-1 " + (t.mostPopular ? "ring-2 ring-[#B28228]" : "ring-gray-200")}>
                            <h3 className="font-semibold text-gray-800">{t.name} website</h3>
                            <p className="mt-1 text-sm text-gray-500">From</p>
                            <p className="text-3xl font-bold tracking-tight text-gray-900 tabular-nums">{gbp(t.price.GBP)}</p>
                            <p className="mt-2 text-sm text-gray-600">
                                {t.features[0]}. One-off payment: 50% to start, 50% at launch.
                            </p>
                        </div>
                    ))}
                    <div className="rounded-2xl p-6 ring-1 ring-gray-200">
                        <h3 className="font-semibold text-gray-800">Website care plan</h3>
                        <p className="mt-1 text-sm text-gray-500">From year two</p>
                        <p className="text-3xl font-bold tracking-tight text-gray-900 tabular-nums">
                            {care}
                            <span className="text-base font-medium text-gray-500">/month</span>
                        </p>
                        <p className="mt-2 text-sm text-gray-600">Hosting, email, backups, updates and 2 hours of changes.</p>
                    </div>
                </div>
                <p className="mt-6 max-w-3xl text-sm text-gray-600">
                    The CRM (booking, WhatsApp, reviews, rebooking reminders and invoices) and the missed-call text-back have a fixed
                    monthly price, written in your proposal before you decide. Monthly, with no 12-month contract: cancel with 30 days&apos;
                    notice.
                </p>
                <Link href="/servicepackage?market=gb" className="inline-block mt-3 text-sm font-semibold text-[#B28228] hover:underline">
                    See all packages and prices
                </Link>
            </section>

            {/* How it works */}
            <section aria-labelledby="clinics-how" className="py-20 bg-gray-50">
                <div className="px-6 mx-auto max-w-5xl lg:px-8">
                    <h2 id="clinics-how" className="text-3xl font-semibold text-gray-800">How it works</h2>
                    <ol className="grid gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-4">
                        {steps.map((s, i) => (
                            <li key={s.t}>
                                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#1C1C1C] text-sm font-semibold text-white">{i + 1}</span>
                                <h3 className="mt-4 font-semibold text-gray-800">{s.t}</h3>
                                <p className="mt-2 text-sm leading-6 text-gray-600">{s.d}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* FAQ */}
            <section aria-labelledby="clinics-faq" className="py-20">
                <div className="px-6 mx-auto max-w-3xl lg:px-8">
                    <h2 id="clinics-faq" className="text-3xl font-semibold text-gray-800">Questions</h2>
                    <div className="mt-8 divide-y divide-gray-200">
                        {faq.map((f) => (
                            <details key={f.q} className="py-5 group">
                                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-gray-800">
                                    {f.q}
                                    <span className="text-[#B28228] transition group-open:rotate-45" aria-hidden="true">+</span>
                                </summary>
                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    {f.a}
                                    {f.q.startsWith("Where is my") && (
                                        <>
                                            {" "}
                                            <Link href="/legal/privacy" className="font-semibold text-[#B28228] hover:underline">
                                                Read it here
                                            </Link>
                                            .
                                        </>
                                    )}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA, with the booking calendar */}
            <section id="book" aria-labelledby="clinics-cta" className="px-6 py-20 mx-auto max-w-5xl text-center lg:px-8 bg-white scroll-mt-24">
                <h2 id="clinics-cta" className="text-3xl font-semibold text-gray-800 [text-wrap:balance]">See what it would do for your diary</h2>
                <p className="mx-auto mt-4 max-w-xl text-gray-600">
                    Take the free 1-minute quiz and get a plan for your business, book a 15-minute call below, or message us on WhatsApp.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <Link href="/quiz" className={primaryBtn}>
                        Take the free 1-minute quiz
                    </Link>
                    <a href={wa(WA_TEXT)} target="_blank" rel="noopener noreferrer" className={secondaryBtn}>
                        Message us on WhatsApp
                    </a>
                </div>
                <h3 className="mt-14 text-xl font-semibold text-gray-800">Book a 15-minute call</h3>
                <div className="mx-auto mt-6 max-w-[760px] text-left">
                    <BookingEmbed lang="en" />
                </div>
                <p className="mt-8 text-sm text-gray-500">
                    Run an estate agency?{" "}
                    <Link href="/crm/estate-agents" className="font-semibold text-[#B28228] hover:underline">
                        See the CRM for estate agents
                    </Link>
                </p>
            </section>
        </div>
    );
}
