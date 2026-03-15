"use client";

import { motion } from "framer-motion";

const LAST_UPDATED = "15 March 2026";
const EFFECTIVE_DATE = "15 March 2026";

const sections = [
    {
        id: "acceptance",
        title: "Acceptance of Terms",
        content: [
            {
                heading: null,
                body: `By accessing or using the Autisync website (https://www.autisync.com) or any services offered by Autisync, you confirm that you have read, understood, and agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, you must not use our Website or services.`,
            },
            {
                heading: null,
                body: `These Terms apply to all visitors, users, clients, and anyone else who accesses or uses our Website or engages with our services. They should be read alongside our Privacy Policy, which governs how we handle your personal data.`,
            },
        ],
    },
    {
        id: "about",
        title: "About Autisync",
        content: [
            {
                heading: null,
                body: `Autisync is a creative digital agency offering services including website and application development, graphic design, social media management, technical support and maintenance, e-commerce store setup, and email marketing. We operate across the United Kingdom, Portugal, Namibia, and Angola.`,
            },
            {
                heading: null,
                body: `References to "Autisync", "we", "us", or "our" throughout these Terms refer to the Autisync agency and its team. References to "you" or "your" refer to the individual or organisation using our Website or engaging our services.`,
            },
        ],
    },
    {
        id: "services",
        title: "Our Services",
        content: [
            {
                heading: "Service delivery",
                body: `Autisync provides digital services to clients under separate service agreements, proposals, or statements of work. These Terms govern your use of our Website and general interaction with Autisync. Specific project terms, deliverables, timelines, payment schedules, and intellectual property arrangements are set out in individual client agreements.`,
            },
            {
                heading: "Service availability",
                body: `We reserve the right to modify, suspend, or discontinue any part of our Website or services at any time, with or without notice. We will not be liable to you or any third party for any such modification, suspension, or discontinuation.`,
            },
            {
                heading: "Enquiries and questionnaires",
                body: `Submitting a contact form or service questionnaire on our Website does not constitute a binding contract or guarantee of service. It is an expression of interest only. A binding engagement begins only when a formal written agreement or proposal has been accepted by both parties.`,
            },
        ],
    },
    {
        id: "use-of-website",
        title: "Use of Our Website",
        content: [
            {
                heading: "Permitted use",
                body: `You may use our Website for lawful purposes only. You agree to use the Website in a manner consistent with all applicable laws and regulations in your jurisdiction and in the jurisdictions in which we operate.`,
            },
            {
                heading: "Prohibited conduct",
                body: `You must not:`,
                list: [
                    `Use the Website in any way that violates applicable local, national, or international law or regulation.`,
                    `Transmit any unsolicited or unauthorised advertising or promotional material (spam).`,
                    `Impersonate any person or entity, or falsely claim an affiliation with any person or entity.`,
                    `Attempt to gain unauthorised access to any part of the Website, its servers, or any systems connected to the Website.`,
                    `Introduce viruses, trojans, worms, logic bombs, or other malicious or technologically harmful material.`,
                    `Scrape, crawl, or extract data from the Website using automated means without prior written permission from Autisync.`,
                    `Use the Website in any way that could damage, disable, overburden, or impair it, or interfere with any other user's use of the Website.`,
                    `Reproduce, duplicate, copy, sell, or exploit any portion of the Website without express written permission from Autisync.`,
                ],
            },
        ],
    },
    {
        id: "intellectual-property",
        title: "Intellectual Property",
        content: [
            {
                heading: "Autisync's content",
                body: `All content on this Website — including but not limited to text, graphics, logos, images, icons, design elements, and software — is the property of Autisync or its content suppliers and is protected by applicable copyright, trademark, and intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content on this Website without our express written permission.`,
            },
            {
                heading: "Client work",
                body: `Ownership of deliverables produced for clients — including designs, code, and creative assets — is governed exclusively by the terms of the individual client agreement. Unless otherwise agreed in writing, Autisync retains intellectual property rights in all work until full payment has been received, at which point ownership transfers to the client as specified in the relevant agreement.`,
            },
            {
                heading: "Your submissions",
                body: `By submitting information through our contact form or questionnaires, you grant Autisync a non-exclusive, royalty-free licence to use that information solely for the purpose of responding to your enquiry and delivering our services. We do not claim ownership over content you provide to us.`,
            },
            {
                heading: "Portfolio usage",
                body: `Unless you explicitly request otherwise in writing, Autisync reserves the right to display completed client work as part of our portfolio for marketing and promotional purposes. If you wish to restrict this, please notify us before or at the time of engagement.`,
            },
        ],
    },
    {
        id: "payments",
        title: "Payments & Refunds",
        content: [
            {
                heading: "Payment terms",
                body: `Payment terms for client projects are set out in individual service agreements or invoices. Generally, Autisync operates on a deposit-first model, where a percentage of the total project fee is due before work commences. Specific amounts and schedules vary by project and will be confirmed in writing.`,
            },
            {
                heading: "Late payments",
                body: `Autisync reserves the right to pause or suspend work on a project if invoices are not paid within the agreed payment period. We may charge interest on overdue amounts in accordance with applicable law.`,
            },
            {
                heading: "Refunds",
                body: `As our services involve the creation of custom digital work, refunds are not guaranteed once work has commenced. Refund eligibility is determined on a case-by-case basis and will be outlined in the client agreement. Where a project is cancelled by the client, any work completed up to the point of cancellation may be billed at a pro-rata rate.`,
            },
        ],
    },
    {
        id: "confidentiality",
        title: "Confidentiality",
        content: [
            {
                heading: null,
                body: `Both parties agree to treat as confidential any proprietary or sensitive information shared during the course of an engagement. Autisync will not disclose your business information, project details, or submitted questionnaire data to any third party except as required to deliver the agreed services or as required by law.`,
            },
            {
                heading: null,
                body: `Clients are similarly expected to keep Autisync's pricing, processes, and internal methodologies confidential and not share them with competitors or third parties without our written consent.`,
            },
        ],
    },
    {
        id: "disclaimers",
        title: "Disclaimers & Warranties",
        content: [
            {
                heading: "Website provided \"as is\"",
                body: `Our Website and its content are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. Autisync does not warrant that the Website will be uninterrupted, error-free, or free of viruses or other harmful components.`,
            },
            {
                heading: "No guarantee of results",
                body: `While we take pride in the quality of our work, Autisync does not guarantee specific outcomes from our services — including but not limited to search engine rankings, revenue growth, or social media engagement metrics. Results depend on many factors outside our control.`,
            },
            {
                heading: "Third-party content",
                body: `Our Website may include links to third-party websites or tools. These are provided for convenience only. Autisync has no control over the content, privacy practices, or reliability of third-party sites and accepts no responsibility for them. Accessing third-party links is at your own risk.`,
            },
        ],
    },
    {
        id: "liability",
        title: "Limitation of Liability",
        content: [
            {
                heading: null,
                body: `To the fullest extent permitted by applicable law, Autisync and its team members shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of (or inability to use) our Website or services — including but not limited to loss of profits, loss of data, loss of goodwill, or business interruption.`,
            },
            {
                heading: null,
                body: `In no event shall Autisync's total liability to you for all claims arising out of or relating to our services exceed the total amount paid by you to Autisync in the three (3) months immediately preceding the event giving rise to the claim.`,
            },
            {
                heading: null,
                body: `Some jurisdictions do not allow the exclusion or limitation of certain warranties or liabilities. In such cases, the above limitations apply to the fullest extent permitted by law in your jurisdiction.`,
            },
        ],
    },
    {
        id: "indemnification",
        title: "Indemnification",
        content: [
            {
                heading: null,
                body: `You agree to indemnify, defend, and hold harmless Autisync and its team members from and against any claims, liabilities, damages, losses, and expenses — including reasonable legal fees — arising out of or in any way connected with your use of our Website or services, your violation of these Terms, or your violation of any third-party rights.`,
            },
        ],
    },
    {
        id: "termination",
        title: "Termination",
        content: [
            {
                heading: null,
                body: `Autisync reserves the right to terminate or restrict your access to our Website at any time, without notice or liability, for conduct that we believe violates these Terms or is harmful to Autisync, other users, third parties, or for any other reason at our sole discretion.`,
            },
            {
                heading: null,
                body: `For client engagements, termination terms are governed by the relevant service agreement. Either party may terminate an engagement in accordance with the notice period and conditions set out in that agreement.`,
            },
        ],
    },
    {
        id: "governing-law",
        title: "Governing Law & Jurisdiction",
        content: [
            {
                heading: null,
                body: `These Terms are governed by and construed in accordance with the laws of England and Wales. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales, unless otherwise required by local mandatory law in the country where you reside.`,
            },
            {
                heading: "Users in Portugal / EU",
                body: `Users accessing our services from Portugal or other EU member states retain all consumer rights afforded to them under applicable EU law, including the right to bring claims before the courts of their country of residence where such rights cannot be contractually waived.`,
            },
            {
                heading: "Users in Namibia",
                body: `Users in Namibia are subject to the laws of the Republic of Namibia to the extent that applicable Namibian consumer or commercial law imposes mandatory protections that cannot be overridden by contract.`,
            },
            {
                heading: "Users in Angola",
                body: `Users in Angola are subject to applicable Angolan law to the extent required by mandatory local provisions, including Law No. 22/11 on consumer and data protection matters.`,
            },
        ],
    },
    {
        id: "changes",
        title: "Changes to These Terms",
        content: [
            {
                heading: null,
                body: `Autisync reserves the right to update or revise these Terms at any time. When we do, we will update the "Last updated" date at the top of this page. For material changes, we will endeavour to provide notice via email or a prominent notice on our Website prior to the change taking effect.`,
            },
            {
                heading: null,
                body: `Your continued use of our Website after any changes are posted constitutes your acceptance of the revised Terms. We encourage you to review this page periodically.`,
            },
        ],
    },
    {
        id: "contact",
        title: "Contact Us",
        content: [
            {
                heading: null,
                body: `If you have any questions about these Terms of Use, please contact us:`,
                list: [
                    `Email: info@autisync.com`,
                    `WhatsApp: +44 788 331 7646`,
                    `Website: https://www.autisync.com`,
                ],
            },
        ],
    },
];

export default function TermsOfUsePage() {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* ── Hero ─────────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-gradient-to-b from-black via-black/90 to-black/80">
                <div
                    className="absolute inset-0 bg-center bg-cover opacity-30"
                    style={{
                        backgroundImage:
                            "url('https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/95" />

                {/* Gold accent line */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ background: "linear-gradient(to right, transparent, #b98b2f, transparent)" }}
                />

                <div className="relative px-4 pt-28 pb-16 mx-auto max-w-4xl text-center sm:px-6 lg:px-8">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#b98b2f]"
                    >
                        Legal
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.05 }}
                        className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
                    >
                        Terms of Use
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.12 }}
                        className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-400"
                    >
                        <span>Effective: {EFFECTIVE_DATE}</span>
                        <span className="h-1 w-1 rounded-full bg-gray-600" />
                        <span>Last updated: {LAST_UPDATED}</span>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.18 }}
                        className="mt-5 mx-auto max-w-2xl text-base text-gray-300 leading-relaxed"
                    >
                        Please read these Terms carefully before using our Website or engaging our services.
                        They set out the rules governing your relationship with Autisync.
                    </motion.p>
                </div>
            </section>

            {/* ── Body ─────────────────────────────────────────────────────────── */}
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">

                    {/* Sticky sidebar TOC */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24">
                            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#b98b2f]">
                                Contents
                            </p>
                            <nav className="space-y-1">
                                {sections.map((s) => (
                                    <a
                                        key={s.id}
                                        href={`#${s.id}`}
                                        className="block rounded-md px-3 py-1.5 text-xs text-gray-500 transition-colors hover:bg-[#b98b2f]/8 hover:text-[#b98b2f]"
                                    >
                                        {s.title}
                                    </a>
                                ))}
                            </nav>

                            {/* Quick links */}
                            <div className="mt-8 rounded-xl border border-[#b98b2f]/20 bg-[#b98b2f]/5 p-4">
                                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b98b2f]">
                                    Related
                                </p>
                                <a
                                    href="/privacy-policy"
                                    className="block text-xs text-gray-500 transition-colors hover:text-[#b98b2f]"
                                >
                                    Privacy Policy →
                                </a>
                            </div>
                        </div>
                    </aside>

                    {/* Main content */}
                    <div className="space-y-12">

                        {/* Intro notice */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="rounded-xl border border-[#b98b2f]/20 bg-[#b98b2f]/5 px-6 py-5"
                        >
                            <p className="text-sm leading-relaxed text-gray-700">
                                These Terms of Use govern your access to and use of the Autisync website and services.
                                Autisync operates across the <strong>United Kingdom, Portugal, Namibia, and Angola</strong>.
                                By continuing to use our Website, you acknowledge that you have read and agree to these Terms.
                                These Terms were last updated on <strong>{LAST_UPDATED}</strong>.
                            </p>
                        </motion.div>

                        {sections.map((section, sIdx) => (
                            <motion.section
                                key={section.id}
                                id={section.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.45, delay: sIdx * 0.02 }}
                                className="scroll-mt-24"
                            >
                                {/* Section number + title */}
                                <div className="mb-5 flex items-center gap-3">
                                    <div
                                        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                                        style={{ background: "linear-gradient(135deg, #7a5a1d, #d1a94c)" }}
                                    >
                                        {sIdx + 1}
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                                </div>

                                <div className="space-y-5 pl-9">
                                    {section.content.map((block, bIdx) => (
                                        <div key={bIdx}>
                                            {block.heading && (
                                                <h3 className="mb-2 text-sm font-semibold text-gray-800">
                                                    {block.heading}
                                                </h3>
                                            )}
                                            {block.body && (
                                                <p className="text-sm leading-relaxed text-gray-600">{block.body}</p>
                                            )}
                                            {"list" in block && block.list && (
                                                <ul className="mt-3 space-y-2">
                                                    {block.list.map((item: string, i: number) => (
                                                        <li key={i} className="flex gap-2.5 text-sm text-gray-600">
                              <span
                                  className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                  style={{ backgroundColor: "#b98b2f" }}
                              />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {sIdx < sections.length - 1 && (
                                    <div className="mt-10 h-px bg-gray-100" />
                                )}
                            </motion.section>
                        ))}

                        {/* Footer note */}
                        <div className="rounded-xl border border-gray-200 bg-white px-6 py-5 text-center shadow-sm">
                            <p className="text-xs text-gray-400">
                                © {new Date().getFullYear()} Autisync. All rights reserved.
                                <br className="sm:hidden" />
                                {" "}Questions? Email us at{" "}
                                <a href="mailto:info@autisync.com" className="text-[#b98b2f] hover:underline">
                                    info@autisync.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}