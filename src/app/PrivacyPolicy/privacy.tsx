"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import LegalBackBar from "@/app/components/LegalBackBar";
import MeasurementChoice from "./MeasurementChoice";
import { POLICY, type PolicyLang } from "./policyContent";

/**
 * The website's privacy policy, in English (/PrivacyPolicy) and Portuguese
 * (/pt/privacidade). The words live in policyContent.ts; this is the page.
 */

// "[label](href)" links and email addresses, in that order of precedence.
const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|([\w.+-]+@[\w-]+\.[\w.-]*\w)/g;

function renderText(text: string): React.ReactNode[] {
    const out: React.ReactNode[] = [];
    let last = 0;
    let m: RegExpExecArray | null;
    INLINE.lastIndex = 0;
    while ((m = INLINE.exec(text)) !== null) {
        if (m.index > last) out.push(text.slice(last, m.index));
        const [whole, label, href, email] = m;
        const cls = "text-[#b98b2f] underline-offset-2 hover:underline break-words";
        if (email) {
            out.push(<a key={m.index} href={`mailto:${email}`} className={cls}>{email}</a>);
        } else if (href.startsWith("/")) {
            out.push(<Link key={m.index} href={href} className={cls}>{label}</Link>);
        } else {
            out.push(<a key={m.index} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{label}</a>);
        }
        last = m.index + whole.length;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
}

export default function PrivacyPolicyPage({ lang = "en" }: { lang?: PolicyLang }) {
    const doc = POLICY[lang];
    const sections = doc.sections;

    return (
        <main lang={lang === "pt" ? "pt-PT" : "en-GB"} className="min-h-screen bg-gray-50">
            {/* Back to where they came from, and home: this page has no navbar. */}
            <LegalBackBar lang={lang} />

            {/* ── Hero ─────────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-gradient-to-b from-black via-black/90 to-black/80">
                <div
                    className="absolute inset-0 bg-center bg-cover opacity-30"
                    style={{
                        backgroundImage:
                            "url('https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/95" />

                {/* Gold accent line */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ background: "linear-gradient(to right, transparent, #b98b2f, transparent)" }}
                />

                <div className="relative px-4 pt-14 pb-16 mx-auto sm:pt-20 max-w-4xl text-center sm:px-6 lg:px-8">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#b98b2f]"
                    >
                        {doc.kicker}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.05 }}
                        className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
                    >
                        {doc.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.12 }}
                        className="mt-4 text-sm text-gray-400"
                    >
                        {doc.lastUpdatedLabel}: {doc.lastUpdated}
                        <span aria-hidden="true"> · </span>
                        <Link
                            href={doc.otherLanguage.href}
                            hrefLang={doc.otherLanguage.hrefLang}
                            lang={doc.otherLanguage.hrefLang}
                            className="text-[#d1a94c] underline-offset-2 hover:underline"
                        >
                            {doc.otherLanguage.label}
                        </Link>
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.18 }}
                        className="mt-5 mx-auto max-w-2xl text-base text-gray-300 leading-relaxed"
                    >
                        {doc.standfirst}
                    </motion.p>
                </div>
            </section>

            {/* ── Body ─────────────────────────────────────────────────────────── */}
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">

                    {/* Sticky sidebar TOC — desktop only */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-16">
                            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#b98b2f]">
                                {doc.contents}
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
                        </div>
                    </aside>

                    {/* Main content */}
                    <div className="min-w-0 space-y-12">
                        {/* Intro blurb */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="rounded-xl border border-[#b98b2f]/20 bg-[#b98b2f]/5 px-6 py-5"
                        >
                            <p className="text-sm leading-relaxed text-gray-700">{renderText(doc.intro)}</p>
                        </motion.div>

                        {sections.map((section, sIdx) => (
                            <motion.section
                                key={section.id}
                                id={section.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.45, delay: Math.min(sIdx, 4) * 0.03 }}
                                className="scroll-mt-16"
                            >
                                {/* Section title */}
                                <div className="mb-5 flex items-start gap-3">
                                    <div
                                        className="mt-1 h-5 w-1 flex-shrink-0 rounded-full"
                                        style={{ background: "linear-gradient(to bottom, #b98b2f, #7a5a1d)" }}
                                    />
                                    <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                                </div>

                                <div className="space-y-5 pl-4">
                                    {section.content.map((block, bIdx) => (
                                        <div key={bIdx}>
                                            {block.heading && (
                                                <h3 className="mb-2 text-sm font-semibold text-gray-800">
                                                    {block.heading}
                                                </h3>
                                            )}

                                            {block.body && (
                                                <p className="text-sm leading-relaxed text-gray-600">{renderText(block.body)}</p>
                                            )}

                                            {block.widget === "measurement" && <MeasurementChoice lang={lang} />}

                                            {/* Definitions list */}
                                            {block.definitions && (
                                                <dl className="mt-3 space-y-3">
                                                    {block.definitions.map((d) => (
                                                        <div key={d.term} className="rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-sm">
                                                            <dt className="text-xs font-semibold text-[#b98b2f] break-words">{d.term}</dt>
                                                            <dd className="mt-0.5 text-sm text-gray-600 break-words">{renderText(d.def)}</dd>
                                                        </div>
                                                    ))}
                                                </dl>
                                            )}

                                            {/* Bullet list */}
                                            {block.list && (
                                                <ul className="mt-3 space-y-2">
                                                    {block.list.map((item, i) => (
                                                        <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-gray-600">
                                                            <span
                                                                className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                                                style={{ backgroundColor: "#b98b2f" }}
                                                            />
                                                            <span className="min-w-0">{renderText(item)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Divider */}
                                {sIdx < sections.length - 1 && (
                                    <div className="mt-10 h-px bg-gray-100" />
                                )}
                            </motion.section>
                        ))}

                        {/* Footer note */}
                        <div className="rounded-xl border border-gray-200 bg-white px-6 py-5 text-center shadow-sm">
                            <p className="text-xs text-gray-400">
                                © {new Date().getFullYear()} Autisync · MAHELDOM CONSULTING, LDA. {doc.rights}{" "}
                                <br className="sm:hidden" />
                                {doc.footerQuestions}{" "}
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
