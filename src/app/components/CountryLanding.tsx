/**
 * Country landing pages (/pt/angola, /namibia) — the page someone lands on
 * from "criação de sites Angola" or "website design Namibia".
 *
 * Server-rendered on purpose: the prices, FAQ and contact details are in the
 * HTML Google fetches, not filled in by script. Prices come from the shared
 * package data, so they can never disagree with /pt/precos or /servicepackage.
 * Nothing here is invented: the clients are the logos already on the site,
 * the address is the company's registered one.
 */
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/solid";
import Clients from "@/app/(main)/solutions/clients";
import { carePlanMonthly, formatPrice, websiteTiers, type Currency } from "@/lib/website-packages";
import { ptWebsite } from "@/lib/i18n/pt";
import { waLink } from "@/lib/whatsapp";

export type CountryCopy = {
    lang: "en" | "pt";
    currency: Currency;
    /** ?market= value for links to the price page. */
    market: "ao" | "na";
    url: string;
    city: string;
    country: string;
    phone: { display: string; href: string };
    h1: string;
    intro: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    whyTitle: string;
    why: { title: string; text: string }[];
    servicesTitle: string;
    services: { title: string; text: string; href: string }[];
    pricesTitle: string;
    pricesIntro: string;
    from: string;
    mostPopular: string;
    careNote: (care: string) => string;
    /** Contract, cancellation and renewal terms, shown under the care note. */
    pricesTerms?: string;
    allPrices: { label: string; href: string };
    stepsTitle: string;
    steps: { title: string; text: string }[];
    faqTitle: string;
    faq: { q: string; a: string }[];
    ctaTitle: string;
    ctaText: string;
    whatsappText: string;
    clientsTitle: string;
};


export default function CountryLanding({ c }: { c: CountryCopy }) {
    const pt = c.lang === "pt";
    // The marker says which landing page the chat came from: WEB-angola, WEB-namibia.
    const wa = (text: string) => waLink(text, c.market === "ao" ? "WEB-angola" : "WEB-namibia");
    const care = formatPrice(carePlanMonthly[c.currency], c.currency);

    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Autisync",
            url: c.url,
            image: "https://www.autisync.com/android-chrome-512x512.png",
            telephone: c.phone.href.replace("tel:", ""),
            areaServed: { "@type": "Country", name: c.country },
            address: {
                "@type": "PostalAddress",
                streetAddress: "Talatona",
                addressLocality: "Luanda",
                addressCountry: "AO",
            },
            priceRange: `${formatPrice(websiteTiers[0].price[c.currency], c.currency)} – ${formatPrice(websiteTiers[websiteTiers.length - 1].price[c.currency], c.currency)}`,
            makesOffer: websiteTiers.map((t) => ({
                "@type": "Offer",
                name: pt ? `Website ${ptWebsite[t.id]?.name ?? t.name}` : `${t.name} website`,
                price: t.price[c.currency],
                priceCurrency: c.currency,
            })),
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: c.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
        },
    ];

    return (
        <div lang={c.lang} className="bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <section className="px-6 pt-32 pb-16 mx-auto max-w-5xl lg:px-8 sm:pt-40">
                <p className="text-sm font-semibold text-[#B28228]">
                    {c.city}, {c.country}
                </p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl [text-wrap:balance]">{c.h1}</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">{c.intro}</p>
                <div className="flex flex-wrap items-center gap-4 mt-10">
                    <Link
                        href={c.primaryCta.href}
                        className="rounded-md bg-[#1C1C1C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#B28228] transition"
                    >
                        {c.primaryCta.label}
                    </Link>
                    <Link
                        href={c.secondaryCta.href}
                        className="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 hover:border-[#B28228] hover:text-[#B28228] transition"
                    >
                        {c.secondaryCta.label}
                    </Link>
                    <a href={c.phone.href} className="text-sm font-semibold text-gray-700 hover:text-[#B28228]">
                        {c.phone.display}
                    </a>
                </div>
            </section>

            {/* Why */}
            <section className="px-6 pb-20 mx-auto max-w-5xl lg:px-8">
                <h2 className="text-2xl font-semibold text-gray-800">{c.whyTitle}</h2>
                <dl className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
                    {c.why.map((w) => (
                        <div key={w.title} className="border-l-2 border-[#B28228] pl-4">
                            <dt className="font-semibold text-gray-800">{w.title}</dt>
                            <dd className="mt-2 text-sm leading-6 text-gray-600">{w.text}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            <Clients lang={c.lang} title={c.clientsTitle} />

            {/* Prices */}
            <section className="px-6 py-20 mx-auto max-w-6xl lg:px-8" id={pt ? "precos" : "prices"}>
                <h2 className="text-3xl font-semibold text-gray-800">{c.pricesTitle}</h2>
                <p className="mt-4 max-w-2xl text-gray-600">{c.pricesIntro}</p>
                <div className="grid gap-6 mt-10 lg:grid-cols-3">
                    {websiteTiers.map((t) => {
                        const copy = pt ? ptWebsite[t.id] ?? t : t;
                        const price = formatPrice(t.price[c.currency], c.currency);
                        return (
                            <div
                                key={t.id}
                                className={
                                    "flex flex-col justify-between rounded-2xl p-6 bg-white " +
                                    (t.mostPopular ? "ring-2 ring-[#B28228] shadow-md" : "ring-1 ring-gray-200")
                                }
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-4">
                                        <h3 className="text-xl font-bold text-gray-800">{copy.name}</h3>
                                        {t.mostPopular && (
                                            <span className="rounded-full bg-[#B28228]/10 px-2.5 py-1 text-xs font-semibold text-[#B28228]">
                                                {c.mostPopular}
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600">{copy.description}</p>
                                    <p className="mt-5 text-sm text-gray-500">{c.from}</p>
                                    <p className="text-3xl font-bold tracking-tight text-gray-900 tabular-nums">{price}</p>
                                    <ul className="mt-6 space-y-2 text-sm text-gray-700">
                                        {copy.features.slice(0, 9).map((f) => (
                                            <li key={f} className="flex gap-2">
                                                <CheckIcon className="flex-none w-4 h-5 text-[#B28228]" aria-hidden="true" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <a
                                    href={wa(c.whatsappText.replace("{tier}", copy.name).replace("{price}", price))}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={
                                        "mt-6 block w-full text-center py-2 px-4 rounded-md font-semibold border transition " +
                                        (t.mostPopular
                                            ? "bg-[#B28228] border-[#B28228] text-white hover:bg-[#1C1C1C] hover:border-[#1C1C1C]"
                                            : "border-[#B28228] text-[#B28228] hover:bg-[#B28228] hover:text-white")
                                    }
                                >
                                    WhatsApp
                                </a>
                            </div>
                        );
                    })}
                </div>
                <p className="mt-6 text-sm text-gray-500">{c.careNote(care)}</p>
                {c.pricesTerms && <p className="mt-2 max-w-3xl text-sm font-medium text-gray-700">{c.pricesTerms}</p>}
                <Link href={c.allPrices.href} className="inline-block mt-2 text-sm font-semibold text-[#B28228] hover:underline">
                    {c.allPrices.label}
                </Link>
            </section>

            {/* Services */}
            <section className="py-20 bg-gray-50">
                <div className="px-6 mx-auto max-w-5xl lg:px-8">
                    <h2 className="text-3xl font-semibold text-gray-800">{c.servicesTitle}</h2>
                    <div className="grid gap-6 mt-10 sm:grid-cols-2">
                        {c.services.map((s) => (
                            <Link key={s.href} href={s.href} className="group block rounded-xl bg-white p-6 ring-1 ring-gray-200 hover:ring-[#B28228] transition">
                                <h3 className="font-semibold text-gray-800 group-hover:text-[#B28228]">{s.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-gray-600">{s.text}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="px-6 py-20 mx-auto max-w-5xl lg:px-8">
                <h2 className="text-3xl font-semibold text-gray-800">{c.stepsTitle}</h2>
                <ol className="grid gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-4">
                    {c.steps.map((s, i) => (
                        <li key={s.title}>
                            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#1C1C1C] text-sm font-semibold text-white">{i + 1}</span>
                            <h3 className="mt-4 font-semibold text-gray-800">{s.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-gray-600">{s.text}</p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-gray-50">
                <div className="px-6 mx-auto max-w-3xl lg:px-8">
                    <h2 className="text-3xl font-semibold text-gray-800">{c.faqTitle}</h2>
                    <div className="mt-8 divide-y divide-gray-200">
                        {c.faq.map((f) => (
                            <details key={f.q} className="py-5 group">
                                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-gray-800">
                                    {f.q}
                                    <span className="text-[#B28228] transition group-open:rotate-45" aria-hidden="true">+</span>
                                </summary>
                                <p className="mt-3 text-sm leading-6 text-gray-600">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 py-20 mx-auto max-w-5xl text-center lg:px-8">
                <h2 className="text-3xl font-semibold text-gray-800 [text-wrap:balance]">{c.ctaTitle}</h2>
                <p className="mx-auto mt-4 max-w-xl text-gray-600">{c.ctaText}</p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <Link href={c.primaryCta.href} className="rounded-md bg-[#1C1C1C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#B28228] transition">
                        {c.primaryCta.label}
                    </Link>
                    <a
                        href={wa(c.whatsappText.replace("{tier}", "website").replace("{price}", ""))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 hover:border-[#B28228] hover:text-[#B28228] transition"
                    >
                        WhatsApp
                    </a>
                </div>
                <p className="mt-6 text-sm text-gray-500">{c.phone.display}</p>
            </section>
        </div>
    );
}
