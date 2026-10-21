import Link from "next/link";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import BookingEmbed from "@/app/crm/BookingEmbed";
import LegalLink from "@/app/components/LegalLink";
import { Check, WHATSAPP_DISPLAY } from "@/app/components/FunnelShell";
import s from "@/app/crm/crm.module.css";
import WhatsAppLink from "@/app/components/WhatsAppLink";

/**
 * Portuguese chrome for the step-inside page (/pt/websites/demonstracao):
 * the same shell, booking section and FAQ as components/FunnelShell, with the
 * words in Portuguese and links pointing at the /pt pages.
 */
const display = localFont({ src: "../../fonts/Outfit-Variable.woff2", weight: "100 900", variable: "--font-crm-display", display: "swap" });
const body = localFont({ src: "../../fonts/DMSans-Variable.woff2", weight: "100 1000", variable: "--font-crm-body", display: "swap" });

const BOOKING_PAGE = "https://book.autisync.com/apps/appointments/p/autisync-agency";

export function PtFunnelShell({ children, navCta = "Marcar uma chamada", schema, hideNav = false }: { children: ReactNode; navCta?: string; schema?: object; hideNav?: boolean }) {
    return (
        <div lang="pt" className={`${display.variable} ${body.variable} ${s.page}`}>
            {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
            {!hideNav && <nav className={s.nav}>
                <div className={`${s.wrap} ${s.navInner}`}>
                    <Link className={s.logo} href="/pt" aria-label="Página inicial da Autisync">
                        <img src="/crm/autisync-mark-white.svg" alt="" width={45} height={30} />
                        <span className={s.logoWord}>Autisync</span>
                    </Link>
                    <a className={`${s.btn} ${s.btnGold} ${s.navBtn}`} href="#book">{navCta}</a>
                </div>
            </nav>}
            <main>{children}</main>
            <footer className={s.footer}>
                <div className={`${s.wrap} ${s.footerInner}`}>
                    <span>© {new Date().getFullYear()} Autisync · Uma marca comercial da Maheldom Consulting, Lda</span>
                    <span>
                        <Link href="/pt">autisync.com</Link> · <Link href="/pt/ferramentas">Ferramentas grátis</Link> ·{" "}
                        <LegalLink href="/pt/privacidade">Política de Privacidade</LegalLink> · <LegalLink href="/TermsofUse">Termos de Utilização</LegalLink>
                    </span>
                </div>
            </footer>
        </div>
    );
}

/** "Marcar uma chamada" com o calendário da Autisync (as marcações entram no Autisync CRM). */
export function PtBookSection({ eyebrow, title, text, points }: { eyebrow: string; title: string; text: string; points: string[] }) {
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
                    <BookingEmbed lang="pt" />
                </div>
                <p className={s.bookFallback}>
                    O calendário não carrega?{" "}
                    <a href={BOOKING_PAGE} target="_blank" rel="noopener noreferrer">Abra a página de marcação num novo separador</a>
                    , ou envie-nos uma mensagem por <WhatsAppLink>WhatsApp para {WHATSAPP_DISPLAY}</WhatsAppLink>.
                </p>
            </div>
        </section>
    );
}

export function PtFaq({ items, title = "Antes de perguntar" }: { items: { q: string; a: string }[]; title?: string }) {
    return (
        <section className={s.section}>
            <div className={s.wrap}>
                <div className={s.faq}>
                    <div className={s.head}>
                        <span className={s.eyebrow}>Perguntas</span>
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
