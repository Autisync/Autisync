"use client";

/**
 * The shell the Autisync CRM legal pages share.
 *
 * These three pages exist because Meta's App Review will not look at an app
 * whose Privacy Policy, Terms and Data Deletion URLs are not live, and the
 * agency's own /PrivacyPolicy does not cover them: it is about this website,
 * and says nothing about WhatsApp, Messenger or Instagram message content
 * passing through a product. A policy that does not describe the platform
 * data an app uses is a standard rejection.
 *
 * They are written in the same visual language as /PrivacyPolicy - the same
 * hero, the same gold rule, the same sticky contents - so that a reviewer who
 * follows the link from the app dashboard lands somewhere that looks like the
 * company that filed it.
 */

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export type LegalBlock = {
    heading?: string;
    body?: string;
    list?: string[];
    definitions?: { term: string; def: string }[];
};

export type LegalSection = {
    id: string;
    title: string;
    content: LegalBlock[];
};

export type LegalDocumentProps = {
    title: string;
    lastUpdated: string;
    /** One sentence under the title, in the hero. */
    standfirst: string;
    /** The boxed paragraph above the first section. */
    intro: string;
    sections: LegalSection[];
};

/**
 * Make the addresses in the prose clickable.
 *
 * The content is plain strings, which keeps the pages readable as data, but
 * the one thing a person actually needs to act on - the address to write to
 * about their data - should not be something they have to retype. Emails and
 * our own legal URLs become links; everything else is left alone.
 */
const LINKABLE = /([\w.+-]+@[\w-]+\.[\w.-]+)|(autisync\.com\/legal\/[a-z-]+)/g;

function linkify(text: string): React.ReactNode[] {
    const out: React.ReactNode[] = [];
    let last = 0;
    let match: RegExpExecArray | null;
    LINKABLE.lastIndex = 0;

    while ((match = LINKABLE.exec(text)) !== null) {
        if (match.index > last) out.push(text.slice(last, match.index));
        const [whole, email, legalPath] = match;
        out.push(
            <a
                key={`${match.index}-${whole}`}
                href={email ? `mailto:${email}` : `/${legalPath.split("autisync.com/")[1]}`}
                className="text-[#b98b2f] hover:underline"
            >
                {whole}
            </a>,
        );
        last = match.index + whole.length;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
}

const LEGAL_LINKS = [
    { href: "/legal/privacy", label: "Privacy" },
    { href: "/legal/terms", label: "Terms" },
    { href: "/legal/data-deletion", label: "Data deletion" },
];

export default function LegalDocument({
    title,
    lastUpdated,
    standfirst,
    intro,
    sections,
}: LegalDocumentProps) {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* ── Hero ─────────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-gradient-to-b from-black via-black/90 to-black/80">
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
                        Autisync CRM
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.05 }}
                        className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.12 }}
                        className="mt-4 text-sm text-gray-400"
                    >
                        Last updated: {lastUpdated}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.18 }}
                        className="mt-5 mx-auto max-w-2xl text-base text-gray-300 leading-relaxed"
                    >
                        {standfirst}
                    </motion.p>
                </div>
            </section>

            {/* ── Body ─────────────────────────────────────────────────────────── */}
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
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

                            <p className="mt-8 mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#b98b2f]">
                                Also
                            </p>
                            <nav className="space-y-1">
                                {LEGAL_LINKS.map((l) => (
                                    <Link
                                        key={l.href}
                                        href={l.href}
                                        className="block rounded-md px-3 py-1.5 text-xs text-gray-500 transition-colors hover:bg-[#b98b2f]/8 hover:text-[#b98b2f]"
                                    >
                                        {l.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="rounded-xl border border-[#b98b2f]/20 bg-[#b98b2f]/5 px-6 py-5"
                        >
                            <p className="text-sm leading-relaxed text-gray-700">{linkify(intro)}</p>
                        </motion.div>

                        {sections.map((section, sIdx) => (
                            <motion.section
                                key={section.id}
                                id={section.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.45, delay: sIdx * 0.03 }}
                                className="scroll-mt-24"
                            >
                                <div className="mb-5 flex items-center gap-3">
                                    <div
                                        className="h-5 w-1 flex-shrink-0 rounded-full"
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
                                                <p className="text-sm leading-relaxed text-gray-600">
                                                    {linkify(block.body)}
                                                </p>
                                            )}

                                            {block.definitions && (
                                                <dl className="mt-3 space-y-3">
                                                    {block.definitions.map((d) => (
                                                        <div
                                                            key={d.term}
                                                            className="rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-sm"
                                                        >
                                                            <dt className="text-xs font-semibold text-[#b98b2f]">{d.term}</dt>
                                                            <dd className="mt-0.5 text-sm text-gray-600">{d.def}</dd>
                                                        </div>
                                                    ))}
                                                </dl>
                                            )}

                                            {block.list && (
                                                <ul className="mt-3 space-y-2">
                                                    {block.list.map((item, i) => (
                                                        <li key={i} className="flex gap-2.5 text-sm text-gray-600">
                                                            <span
                                                                className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                                                style={{ backgroundColor: "#b98b2f" }}
                                                            />
                                                            <span>{linkify(item)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {sIdx < sections.length - 1 && <div className="mt-10 h-px bg-gray-100" />}
                            </motion.section>
                        ))}

                        {/*
                          The registered company, on the domain. Business
                          Verification cross-checks the website against the
                          company record, and nothing about autisync.com says
                          Maheldom Consulting on its face.
                        */}
                        <div className="rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
                            <p className="text-xs font-semibold text-gray-700">Maheldom Consulting, Lda</p>
                            <p className="mt-1 text-xs leading-relaxed text-gray-500">
                                Edifício do Shopping Jardim do Patriota, casa s/n.º
                                <br />
                                Rua Lar do Patriota, Bairro Patriota
                                <br />
                                Talatona, Luanda, Angola
                                <br />
                                NIF 5003472418 · Matrícula 41063-26/260824
                                <br />
                                <a href="mailto:info@autisync.com" className="text-[#b98b2f] hover:underline">
                                    info@autisync.com
                                </a>
                            </p>
                            <p className="mt-4 text-xs text-gray-400">
                                © {new Date().getFullYear()} Maheldom Consulting, Lda. Autisync is a product of
                                Maheldom Consulting, Lda.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
