"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { PhoneIcon } from "@heroicons/react/24/outline";
import Items from "./items";
import Packages from "./packages";
import { ApproxUsd, CurrencyToggle, OngoingNote, TierPrice, usePackageCurrency } from "@/app/components/PackagePricing";
import { formatPrice, websiteTiers, type Currency } from "@/lib/website-packages";
import { brandingTiers, launchBundle, socialTiers, socialTerms, type ServiceTier } from "@/lib/service-packages";
import { faqSchema, pricingFaq } from "@/lib/faq";

/* ------------------------------ Shared bits ------------------------------- */

const WHATSAPP = "https://wa.me/447883317646";

function whatsappLink(message: string) {
    return `${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function TierCard({ tier, currency, kind }: { tier: ServiceTier; currency: Currency; kind: string }) {
    const price = formatPrice(tier.price[currency], currency);
    return (
        <div
            className={
                "relative flex flex-col justify-between rounded-3xl p-6 bg-white shadow-md " +
                (tier.mostPopular ? "ring-2 ring-[#B28228]" : "ring-1 ring-gray-200")
            }
        >
            <div>
                <div className="flex items-center justify-between gap-x-4">
                    <h3 className="text-xl font-bold text-[#3B3B3B]">
                        <span className="text-[#B28228]">{kind}</span> {tier.name}
                    </h3>
                    {tier.mostPopular && (
                        <p className="rounded-full bg-[#B28228]/10 px-2.5 py-1 text-xs font-semibold leading-5 text-[#B28228]">
                            Most Popular
                        </p>
                    )}
                </div>
                <p className="mt-2 text-sm text-gray-600">{tier.description}</p>
                <div className="mt-5">
                    <TierPrice amount={tier.price[currency]} currency={currency} note={tier.detail} ongoing={kind === "Branding" ? "none" : undefined} />
                </div>
                <ul className="mt-6 space-y-2 text-sm text-gray-700">
                    {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-2">
                            <CheckIcon className="flex-none w-4 h-5 text-[#B28228]" aria-hidden="true" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
            <a
                href={whatsappLink(`Hi Autisync, I'm interested in the ${kind} ${tier.name} package (${price}).`)}
                target="_blank"
                rel="noopener noreferrer"
                className={
                    "mt-6 inline-block w-full text-center py-2 px-4 rounded-md font-semibold border border-[#B28228] transition " +
                    (tier.mostPopular
                        ? "bg-[#B28228] text-white hover:bg-[#1C1C1C] hover:border-[#1C1C1C]"
                        : "text-[#B28228] hover:bg-[#B28228] hover:text-white")
                }
            >
                Choose {tier.name}
            </a>
        </div>
    );
}

/* ---------------------------- Launch bundle ------------------------------- */

const LaunchBundle = ({ currency }: { currency: Currency }) => {
    const price = formatPrice(launchBundle.price[currency], currency);
    const separately = formatPrice(launchBundle.separately[currency], currency);
    const saving = formatPrice(launchBundle.separately[currency] - launchBundle.price[currency], currency);
    return (
        <section
            aria-labelledby="launch-bundle"
            className="relative overflow-hidden rounded-3xl bg-[#1C1C1C] text-white shadow-xl ring-1 ring-[#B28228]/40 mb-10"
        >
            <div className="grid gap-8 p-8 lg:grid-cols-5 lg:p-10">
                <div className="lg:col-span-3">
                    <p className="inline-block rounded-full bg-[#B28228] px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                        Best value · Save {saving}
                    </p>
                    <h2 id="launch-bundle" className="mt-4 text-3xl font-bold sm:text-4xl">
                        {launchBundle.name}
                    </h2>
                    <p className="mt-2 text-lg text-[#d1a94c]">{launchBundle.tagline}</p>
                    <p className="mt-4 text-gray-300">{launchBundle.description}</p>
                    <ul className="mt-6 space-y-2 text-sm text-gray-200">
                        {launchBundle.features.map((f) => (
                            <li key={f} className="flex gap-2">
                                <CheckIcon className="flex-none w-4 h-5 text-[#d1a94c]" aria-hidden="true" />
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col justify-center rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 lg:col-span-2">
                    <p className="text-sm text-gray-400 line-through">{separately} separately</p>
                    <p className="mt-1 text-4xl font-extrabold">{price}</p>
                    <ApproxUsd amount={launchBundle.price[currency]} currency={currency} className="text-gray-300" />
                    <p className="mt-1 text-xs text-gray-400">one-off · 50% to start, 50% at launch</p>
                    <OngoingNote currency={currency} dark />
                    <a
                        href={whatsappLink(`Hi Autisync, I'm interested in the ${launchBundle.name} bundle (${price}).`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex justify-center rounded-md bg-[#B28228] px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-[#d1a94c]"
                    >
                        Start my launch
                    </a>
                    <p className="mt-3 text-xs text-gray-400">Reply on WhatsApp within one business day.</p>
                </div>
            </div>
        </section>
    );
};

/* -------------------------- Branding cards block -------------------------- */

const BrandingGrid = ({ currency }: { currency: Currency }) => (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {brandingTiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} currency={currency} kind="Branding" />
        ))}
    </div>
);

/* --------------------- Social media management block ---------------------- */

const SocialMediaPackages = ({ currency }: { currency: Currency }) => (
    <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#3B3B3B] sm:text-4xl">
                Social Media Management
            </h2>
            <p className="mt-4 text-lg text-gray-600">
                Consistent content, short-form video and paid reach that turn followers
                into enquiries.
            </p>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-12 lg:grid-cols-3">
            {socialTiers.map((tier) => (
                <TierCard key={tier.id} tier={tier} currency={currency} kind="Social" />
            ))}
        </div>
        <p className="max-w-3xl mx-auto mt-8 text-xs leading-5 text-center text-gray-500">{socialTerms}</p>
    </div>
);

/* ---------------------------- Main page block ----------------------------- */

export default function ServicePackagesPage() {
    const [openSection, setOpenSection] = useState("web-packages");
    const [currency, setCurrency] = usePackageCurrency();
    const from = (amount: number) => formatPrice(amount, currency);

    const sections = [
        {
            id: "web-packages",
            title: "Website Packages",
            subtitle: `Professional websites from ${from(websiteTiers[0].price[currency])} — domain, hosting & email included.`,
            content: <Packages currency={currency} />,
        },
        {
            id: "branding",
            title: "Branding Packages",
            subtitle: `Logo, stationery & full identity from ${from(brandingTiers[0].price[currency])}.`,
            content: <BrandingGrid currency={currency} />,
        },
        {
            id: "social",
            title: "Social Media Management",
            subtitle: `Content, reels, ads and reporting from ${from(socialTiers[0].price[currency])}/month.`,
            content: <SocialMediaPackages currency={currency} />,
        },
        {
            id: "services-table",
            title: "Individual Design Services",
            subtitle: "Rollups, flyers, company profiles and more — quoted per job.",
            content: <Items />,
        },
    ];

    return (
<>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    provider: { "@type": "Organization", name: "Autisync", url: "https://www.autisync.com" },
                    serviceType: "Digital Agency Services",
                    areaServed: ["GB", "PT", "NA", "AO"],
                    hasOfferCatalog: {
                        "@type": "OfferCatalog",
                        name: "Service Packages",
                        itemListElement: [
                            ...websiteTiers.map((t) => ({ name: `${t.name} Website`, price: t.price })),
                            ...brandingTiers.map((t) => ({ name: `Branding ${t.name}`, price: t.price })),
                            ...socialTiers.map((t) => ({ name: `Social Media ${t.name}`, price: t.price })),
                            { name: launchBundle.name, price: launchBundle.price },
                        ].map((o) => ({
                            "@type": "Offer",
                            itemOffered: { "@type": "Service", name: o.name },
                            price: o.price.AOA,
                            priceCurrency: "AOA",
                        })),
                    },
                }),
            }}
        />
        <div className="bg-[#F9F9F9]">
            <div className="py-16 mt-12 px-6 mx-auto max-w-7xl">
                {/* Top intro */}
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <p className="text-base font-base text-[#B28228]">
                        Website, Branding &amp; Social Media Packages
                    </p>
                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#3B3B3B] sm:text-5xl">
                        Let&apos;s Tailor the<br/>Right Package for You
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Clear starting prices, no surprises. Pick a package, or message us
                        and we&apos;ll shape it around your business.
                    </p>
                    <CurrencyToggle value={currency} onChange={setCurrency} />
                </div>

                <LaunchBundle currency={currency} />

                {/* Accordion sections */}
                <div className="space-y-3">
                    {sections.map((section) => {
                        const isOpen = openSection === section.id;
                        return (
                            <div
                                key={section.id}
                                className="bg-white rounded-lg shadow-md ring-1 ring-gray-200 overflow-hidden"
                            >
                                {/* Header */}
                                <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    aria-controls={`section-${section.id}`}
                                    onClick={() =>
                                        setOpenSection((prev) =>
                                            prev === section.id ? "" : section.id
                                        )
                                    }
                                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold text-[#3B3B3B]">
                                            {section.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {section.subtitle}
                                        </p>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="ml-4 flex items-center justify-center rounded-full bg-gray-100 w-8 h-8"
                                    >
                                        <ChevronDown className="w-4 h-4 text-gray-600" />
                                    </motion.div>
                                </button>

                                {/* Content */}
                                {/*
                                  Always rendered (only collapsed), so every package and
                                  price is in the HTML that Google and AI crawlers read.
                                */}
                                <motion.div
                                    id={`section-${section.id}`}
                                    initial={false}
                                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                                    transition={{ duration: 0.35, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                    inert={!isOpen}
                                >
                                    <div className="border-t border-gray-100 px-6 py-8">
                                        {section.content}
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>

                {/* Pricing FAQ — visible text + FAQPage schema (SEO / AI answers) */}
                <section aria-labelledby="pricing-faq" className="mt-16 max-w-4xl mx-auto">
                    <h2 id="pricing-faq" className="text-3xl font-bold tracking-tight text-center text-[#3B3B3B]">
                        Pricing questions, answered
                    </h2>
                    <dl className="mt-8 divide-y divide-gray-200 rounded-2xl bg-white shadow-md ring-1 ring-gray-200">
                        {pricingFaq.map(({ q, a }) => (
                            <div key={q} className="px-6 py-5">
                                <dt className="font-semibold text-[#3B3B3B]">{q}</dt>
                                <dd className="mt-2 text-sm leading-6 text-gray-600">{a}</dd>
                            </div>
                        ))}
                    </dl>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                    />
                </section>

                {/* Contact CTA (fixed at bottom) */}
                <div className="mt-12 text-center">
                    <a
                        className="inline-flex items-center justify-center px-6 py-2 text-white bg-[var(--autisync-gold,#b98b2f)] rounded-md shadow-lg hover:bg-gray-900 transition-all hover:shadow-[0_16px_30px_rgba(0,0,0,0.25)]/10"
                        href={whatsappLink("Hi Autisync, I'd like help choosing the right package.")}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <PhoneIcon className="w-5 h-5 mr-2 text-white" />
                        Not sure? Ask us on WhatsApp
                    </a>
                </div>
            </div>
        </div>
</>
    );
}