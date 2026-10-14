import Link from "next/link";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import BookingEmbed from "@/app/crm/BookingEmbed";
import s from "@/app/crm/crm.module.css";

// Same self-hosted faces and charcoal/gold look as the CRM landing page, so the
// funnel pages (step-inside websites, free tools) read as one family.
const display = localFont({ src: "../fonts/Outfit-Variable.woff2", weight: "100 900", variable: "--font-crm-display", display: "swap" });
const body = localFont({ src: "../fonts/DMSans-Variable.woff2", weight: "100 1000", variable: "--font-crm-body", display: "swap" });

export const WHATSAPP_DISPLAY = "+44 7795 866571";
export const WHATSAPP_URL = "https://wa.me/447795866571";
const BOOKING_PAGE = "https://book.autisync.com/apps/appointments/p/autisync-agency";

export const Check = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
    </svg>
);

export function FunnelShell({ children, navCta = "Book a call", schema, hideNav = false }: { children: ReactNode; navCta?: string; schema?: object; hideNav?: boolean }) {
    return (
        <div className={`${display.variable} ${body.variable} ${s.page}`}>
            {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
            {!hideNav && <nav className={s.nav}>
                <div className={`${s.wrap} ${s.navInner}`}>
                    <Link className={s.logo} href="/" aria-label="Autisync home">
                        <img src="/crm/autisync-mark-white.svg" alt="" width={45} height={30} />
                        <span className={s.logoWord}>Autisync</span>
                    </Link>
                    <a className={`${s.btn} ${s.btnGold} ${s.navBtn}`} href="#book">{navCta}</a>
                </div>
            </nav>}
            <main>{children}</main>
            <footer className={s.footer}>
                <div className={`${s.wrap} ${s.footerInner}`}>
                    <span>© {new Date().getFullYear()} Autisync · A trading name of Maheldom Consulting, Lda</span>
                    <span>
                        <Link href="/">autisync.com</Link> · <Link href="/tools">Free tools</Link> ·{" "}
                        <Link href="/PrivacyPolicy">Privacy Policy</Link> · <Link href="/TermsofUse">Terms of Use</Link>
                    </span>
                </div>
            </footer>
        </div>
    );
}

/** "Book a call" section with the Autisync booking calendar (bookings land in the Autisync CRM). */
export function BookSection({ eyebrow, title, text, points }: { eyebrow: string; title: string; text: string; points: string[] }) {
    return (
        <section className={`${s.section} ${s.formSec}`} id="book">
            <div className={s.wrap}>
                <div className={s.bookHead}>
                    <div className={s.head} style={{ margin: 0 }}>
                        <span className={s.eyebrow}>{eyebrow}</span>
                        <h2>{title}</h2>
                        <p className={s.muted}>{text}</p>
                    </div>
                    <ul className={s.checks}>
                        {points.map((p) => <li key={p}><Check />{p}</li>)}
                    </ul>
                </div>
                <div className={s.bookingCard}>
                    <BookingEmbed />
                </div>
                <p className={s.bookFallback}>
                    Calendar not loading?{" "}
                    <a href={BOOKING_PAGE} target="_blank" rel="noopener noreferrer">Open the booking page in a new tab</a>
                    , or message us on <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp at {WHATSAPP_DISPLAY}</a>.
                </p>
            </div>
        </section>
    );
}

export function Faq({ items, title = "Before you ask" }: { items: { q: string; a: string }[]; title?: string }) {
    return (
        <section className={s.section}>
            <div className={s.wrap}>
                <div className={s.faq}>
                    <div className={s.head}>
                        <span className={s.eyebrow}>Questions</span>
                        <h2>{title}</h2>
                    </div>
                    {items.map((f) => (
                        <details key={f.q}>
                            <summary>{f.q}</summary>
                            <p>{f.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

export const faqSchema = (items: { q: string; a: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
