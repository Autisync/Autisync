import Link from "next/link";
import type { ReactNode } from "react";
import BookingEmbed from "./BookingEmbed";
import DemoPicker from "./industries/DemoPicker";
import { CrmPrices } from "@/app/components/CrmPrices";
import s from "./crm.module.css";
import { INDUSTRY_CHIPS } from "./industries";

/**
 * The CRM landing page, in English (/crm) and Portuguese (/pt/crm). Both
 * pages render this with their own `lang`, so the layout stays identical and
 * only the words and links change.
 */


export type CrmLang = "en" | "pt";

const BOOKING_PAGE = "https://book.autisync.com/apps/appointments/p/autisync-agency";

const Cross = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M18 6 6 18M6 6l12 12" />
    </svg>
);
const Check = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
    </svg>
);
const icon = (d: ReactNode) => (
    <div className={s.featIcon}>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {d}
        </svg>
    </div>
);

// Feature icons, shared by both languages (same order as copy.features).
const FEATURE_ICONS: ReactNode[] = [
    (<><path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" /><circle cx="9" cy="7" r="4" /><path d="M22 19v-1a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>),
    (<><rect x="3" y="4" width="5" height="16" rx="1.5" /><rect x="10" y="4" width="5" height="11" rx="1.5" /><rect x="17" y="4" width="4" height="7" rx="1.5" /></>),
    (<><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0" /></>),
    (<><rect x="2" y="4" width="15" height="11" rx="2" /><rect x="15" y="9" width="7" height="12" rx="1.5" /><path d="M6 19h6" /></>),
];

type Item = { t: string; d: string };

const COPY = {
    en: {
        home: "/",
        homeLabel: "Autisync home",
        estateHref: "/crm/estate-agents",
        navCta: "Book a call",
        pill: "New · Autisync CRM",
        title1: "All your clients.",
        title2: "One dashboard.",
        lead: (
            <>
                The Autisync CRM brings your WhatsApp and email conversations, contacts and sales pipeline into one place, with automated
                follow-ups so no client slips through the cracks. We set it up for your business, so you can start
                using it straight away.
            </>
        ),
        ctaBook: "Book a discovery call",
        ctaInside: "See what's inside",
        trust: "For service businesses in the UK, Portugal, Namibia and Angola. Estate or letting agency?",
        trustLink: "See the property CRM and prices →",
        shotAlt: "Autisync CRM pipeline view with leads in New lead, Contacted, Proposal and Won columns",
        shotCaption: "Illustrative example",
        painsEyebrow: "Sound familiar?",
        painsTitle: "Your clients are spread across five different places.",
        pains: [
            { t: "Leads go cold", d: "A new enquiry arrives on WhatsApp on Friday and nobody replies until Tuesday." },
            { t: "Follow-ups depend on memory", d: "Quotes are sent but never chased, because the reminder was a note on someone's phone." },
            { t: "No clear view of sales", d: "You can't say how many deals are open or what they're worth without digging through spreadsheets." },
        ] as Item[],
        featEyebrow: "What's inside",
        featTitle: "Everything you need to win and keep clients.",
        features: [
            { t: "Every client, organised", d: "Keep contact details, notes and conversation history for each client in one shared record your whole team can see." },
            { t: "Visual sales pipeline", d: "Move each lead from first contact to won, and see at a glance how many deals are open and where they're stuck." },
            { t: "Automated follow-ups", d: "Reminders and notifications tell you who to contact next, so quotes get chased and appointments get confirmed." },
            { t: "Works on any device", d: "Check your pipeline and update a client from your laptop at the office or your phone between meetings." },
        ] as Item[],
        howEyebrow: "How it works",
        howTitle: "From first call to live CRM, done for you.",
        steps: [
            { t: "Book a call", d: "Pick a time that suits you in the calendar below." },
            { t: "Tailored proposal", d: "We learn how you work today, then send the setup, features and price for your team." },
            { t: "Setup and import", d: "We configure your pipeline stages and bring in your existing contacts." },
            { t: "Go live", d: "Your team gets a walkthrough and ongoing support from Autisync." },
        ] as Item[],
        builtFor: "Built for",
        chips: ["Clinics", "Salons & studios", "Consultants", "Legal & finance", "Agencies", "Trades & field services"],
        estateChip: "Estate & letting agents →",
        bookEyebrow: "Book a discovery call",
        bookTitle: "Pick a time to talk about your CRM.",
        bookText: (
            <>
                Choose a time that suits you. On the call we&apos;ll look at how you manage clients today, then
                send you a tailored proposal with the setup, features and price for your team.
            </>
        ),
        bookChecks: ["No commitment until you approve the proposal", "Setup handled by the Autisync team", "Your existing contacts imported for you"],
        fallback1: "Calendar not loading?",
        fallbackLink: "Open the booking page in a new tab",
        fallback2: ", or message us on WhatsApp at +44 7795 866571.",
        faqEyebrow: "Questions",
        faqTitle: "Before you ask",
        faq: [
            { q: "How much does the Autisync CRM cost?", a: "Pricing depends on your team size and how much setup you need. Your proposal includes a clear quote, and you don't commit to anything until you approve it." },
            { q: "Do I have to move my contacts myself?", a: "No. Setup is done for you. Send us your spreadsheet or contact list during onboarding and we'll bring it into the CRM." },
            { q: "Can my whole team use it?", a: "Yes. Everyone on your team works from the same client records and pipeline, so there's one version of the truth." },
            { q: "I already have a website with Autisync. Does the CRM connect to it?", a: "Tell us in the form. We'll look at how your current forms and booking tools can feed new leads straight into your pipeline." },
            { q: "Am I tied into a contract?", a: "There is no 12-month contract. Plans are monthly. After any minimum written on your proposal, cancel with 30 days' notice, by email or from your account. We remind you 30 days before anything renews for a year." },
            { q: "Who do we talk to when we need help?", a: "A named person from our team, on WhatsApp. Support hours are weekdays, 9:00 to 18:00 (London and Lisbon time)." },
            { q: "Can we take our data with us?", a: "Yes. Your enquiries and data are yours, and we never share or sell them. Export contacts and records to Excel or CSV any time. If you leave, we hand everything over within 30 days." },
        ],
        trading: "A trading name of Maheldom Consulting, Lda",
        privacy: "Privacy Policy",
        terms: "Terms of Use",
    },
    pt: {
        home: "/pt",
        homeLabel: "Página inicial da Autisync",
        estateHref: "/crm/imobiliarias",
        navCta: "Marcar uma chamada",
        pill: "Novo · Autisync CRM",
        title1: "Todos os seus clientes.",
        title2: "Um só painel.",
        lead: (
            <>
                O Autisync CRM junta as conversas de WhatsApp e e-mail, os seus contactos e o funil de vendas num só lugar, com
                seguimentos automáticos para que nenhum cliente fique esquecido. Nós configuramos tudo para a sua
                empresa, para que possa começar a usá-lo de imediato.
            </>
        ),
        ctaBook: "Marcar uma chamada de diagnóstico",
        ctaInside: "Ver o que inclui",
        trust: "Para empresas de serviços em Angola, Portugal, Namíbia e Reino Unido. Tem uma imobiliária?",
        trustLink: "Veja o CRM imobiliário e os preços →",
        shotAlt: "Funil de vendas do Autisync CRM com potenciais clientes nas colunas Novo contacto, Contactado, Proposta e Ganho",
        shotCaption: "Exemplo ilustrativo",
        painsEyebrow: "Parece-lhe familiar?",
        painsTitle: "Os seus clientes estão espalhados por cinco sítios diferentes.",
        pains: [
            { t: "Os contactos arrefecem", d: "Um pedido novo chega pelo WhatsApp na sexta-feira e ninguém responde até terça." },
            { t: "O seguimento depende da memória", d: "Os orçamentos são enviados mas ninguém volta a ligar, porque o lembrete era uma nota no telemóvel de alguém." },
            { t: "Sem visão clara das vendas", d: "Não consegue dizer quantos negócios estão em aberto nem quanto valem sem andar à procura em folhas de Excel." },
        ] as Item[],
        featEyebrow: "O que inclui",
        featTitle: "Tudo o que precisa para conquistar e manter clientes.",
        features: [
            { t: "Cada cliente, organizado", d: "Guarde os contactos, notas e o histórico de conversas de cada cliente numa ficha partilhada que toda a equipa pode ver." },
            { t: "Funil de vendas visual", d: "Acompanhe cada contacto desde a primeira conversa até ao negócio fechado e veja de relance quantos estão em aberto e onde estão parados." },
            { t: "Seguimentos automáticos", d: "Lembretes e notificações dizem-lhe quem contactar a seguir, para que os orçamentos tenham resposta e as marcações fiquem confirmadas." },
            { t: "Funciona em qualquer dispositivo", d: "Consulte o funil e atualize um cliente no portátil, no escritório, ou no telemóvel entre reuniões." },
        ] as Item[],
        howEyebrow: "Como funciona",
        howTitle: "Da primeira chamada ao CRM a funcionar, feito por nós.",
        steps: [
            { t: "Marque uma chamada", d: "Escolha um horário que lhe dê jeito no calendário abaixo." },
            { t: "Proposta à medida", d: "Percebemos como trabalha hoje e enviamos a configuração, as funcionalidades e o preço para a sua equipa." },
            { t: "Configuração e importação", d: "Configuramos as etapas do seu funil e importamos os contactos que já tem." },
            { t: "Arranque", d: "A sua equipa recebe uma demonstração e apoio contínuo da Autisync." },
        ] as Item[],
        builtFor: "Pensado para",
        chips: ["Clínicas", "Salões e estúdios", "Consultores", "Jurídico e finanças", "Agências", "Obras e serviços técnicos"],
        estateChip: "Imobiliárias e arrendamento →",
        bookEyebrow: "Marcar uma chamada de diagnóstico",
        bookTitle: "Escolha um horário para falarmos do seu CRM.",
        bookText: (
            <>
                Escolha o horário que mais lhe convém. Na chamada vemos como gere hoje os seus clientes e depois
                enviamos-lhe uma proposta à medida, com a configuração, as funcionalidades e o preço para a sua equipa.
            </>
        ),
        bookChecks: ["Sem compromisso até aprovar a proposta", "Configuração feita pela equipa da Autisync", "Importamos os contactos que já tem"],
        fallback1: "O calendário não carrega?",
        fallbackLink: "Abra a página de marcação num novo separador",
        fallback2: ", ou envie-nos uma mensagem por WhatsApp para +44 7795 866571.",
        faqEyebrow: "Perguntas",
        faqTitle: "Antes de perguntar",
        faq: [
            { q: "Quanto custa o Autisync CRM?", a: "O preço depende do tamanho da sua equipa e da configuração de que precisa. A proposta inclui um orçamento claro e não assume qualquer compromisso até a aprovar." },
            { q: "Tenho de passar os contactos sozinho?", a: "Não. A configuração é feita por nós. Envie-nos a sua folha de Excel ou lista de contactos durante a implementação e nós importamo-la para o CRM." },
            { q: "Toda a minha equipa pode usá-lo?", a: "Sim. Toda a equipa trabalha sobre as mesmas fichas de clientes e o mesmo funil, por isso há uma só versão dos factos." },
            { q: "Já tenho um website feito pela Autisync. O CRM liga-se a ele?", a: "Diga-nos no formulário. Vemos como os formulários e as ferramentas de marcação que já tem podem enviar novos contactos diretamente para o seu funil." },
            { q: "Há fidelização?", a: "Não há fidelização de 12 meses. Os planos são mensais. Depois do mínimo que ficar escrito na proposta, cancela com 30 dias de aviso, por e-mail ou na sua conta. Avisamos 30 dias antes de qualquer renovação anual." },
            { q: "Com quem falamos quando precisamos de ajuda?", a: "Com uma pessoa da nossa equipa, com nome, pelo WhatsApp. O apoio funciona nos dias úteis, das 9h00 às 18h00 (hora de Lisboa)." },
            { q: "Podemos levar os nossos dados?", a: "Sim. Os seus contactos e dados são seus e nunca os partilhamos nem vendemos. Exporte tudo para Excel ou CSV quando quiser; se sair, entregamos-lhe tudo em 30 dias." },
        ],
        trading: "Uma marca comercial da Maheldom Consulting, Lda",
        privacy: "Política de Privacidade",
        terms: "Termos de Utilização",
    },
};

/** FAQ entries, exported so each page can put them in its JSON-LD if needed. */
export const CRM_FAQ = { en: COPY.en.faq, pt: COPY.pt.faq };

export default function CrmLanding({ lang = "en", schema }: { lang?: CrmLang; schema?: object }) {
    const c = COPY[lang];
    return (
        <div className={`${s.page} ${s.light}`} lang={lang === "pt" ? "pt" : undefined}>
            {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}

            <main>
                <header className={s.hero}>
                    <div className={s.wrap}>
                        <div className={s.heroCopy}>
                            <span className={s.pill}><i />{c.pill}</span>
                            <h1 className={s.heroTitle}>{c.title1}<br /><span>{c.title2}</span></h1>
                            <p className={s.lead}>{c.lead}</p>
                            <div className={s.ctaRow}>
                                <a className={`${s.btn} ${s.btnGold}`} href="#book">{c.ctaBook}</a>
                                <a className={`${s.btn} ${s.btnGhost}`} href="#features">{c.ctaInside}</a>
                            </div>
                            <p className={s.trust}>{c.trust} <Link href={c.estateHref} style={{ color: "var(--gold)" }}>{c.trustLink}</Link></p>
                        </div>
                        <div id="demo" style={{ marginTop: "clamp(40px, 6vw, 64px)", paddingBottom: "clamp(48px, 6vw, 80px)", scrollMarginTop: 80 }}>
                            <DemoPicker locale={lang} />
                        </div>
                    </div>
                </header>

                <section className={`${s.section} ${s.pains}`}>
                    <div className={`${s.wrap} ${s.painsGrid}`}>
                        <div className={s.head} style={{ margin: 0 }}>
                            <span className={s.eyebrow}>{c.painsEyebrow}</span>
                            <h2>{c.painsTitle}</h2>
                        </div>
                        <div>
                            {c.pains.map((p) => (
                                <div className={s.pain} key={p.t}>
                                    <Cross />
                                    <div><h3>{p.t}</h3><p>{p.d}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={s.section} id="features">
                    <div className={s.wrap}>
                        <div className={s.head}>
                            <span className={s.eyebrow}>{c.featEyebrow}</span>
                            <h2>{c.featTitle}</h2>
                        </div>
                        <div className={s.featGrid}>
                            {c.features.map((f, i) => (
                                <div className={s.feat} key={f.t}>
                                    {icon(FEATURE_ICONS[i])}
                                    <h3>{f.t}</h3>
                                    <p>{f.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={s.section} style={{ paddingTop: 0 }}>
                    <div className={s.wrap}>
                        <div className={s.head}>
                            <span className={s.eyebrow}>{c.howEyebrow}</span>
                            <h2>{c.howTitle}</h2>
                        </div>
                        <div className={s.steps}>
                            {c.steps.map((st) => (
                                <div className={s.step} key={st.t}><h3>{st.t}</h3><p>{st.d}</p></div>
                            ))}
                        </div>
                        <div className={s.who}>
                            <b>{c.builtFor}</b>
                            {INDUSTRY_CHIPS[lang].map((x) => (x.href
                                ? <Link className={s.chip} key={x.label} href={x.href} style={{ textDecoration: "none" }}>{x.label}</Link>
                                : <span className={s.chip} key={x.label}>{x.label}</span>))}
                            <Link className={s.chip} href={c.estateHref} style={{ borderColor: "var(--gold-2)", color: "var(--fg)", textDecoration: "none" }}>{c.estateChip}</Link>
                        </div>
                    </div>
                </section>

                <section className={`${s.section} ${s.grey}`} id="prices" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                    <div className={s.wrap} style={{ marginTop: -64 }}>
                        <CrmPrices lang={lang} />
                    </div>
                </section>

                <section className={`${s.section} ${s.formSec}`} id="book">
                    <div className={s.wrap}>
                        <div className={s.bookHead}>
                            <div className={s.head} style={{ margin: 0 }}>
                                <span className={s.eyebrow}>{c.bookEyebrow}</span>
                                <h2>{c.bookTitle}</h2>
                                <p className={s.muted}>{c.bookText}</p>
                            </div>
                            <ul className={s.checks}>
                                {c.bookChecks.map((x) => <li key={x}><Check />{x}</li>)}
                            </ul>
                        </div>
                        <div className={s.bookingCard}>
                            <BookingEmbed lang={lang} />
                        </div>
                        <p className={s.bookFallback}>
                            {c.fallback1}{" "}
                            <a href={BOOKING_PAGE} target="_blank" rel="noopener noreferrer">
                                {c.fallbackLink}
                            </a>
                            {c.fallback2}
                        </p>
                    </div>
                </section>

                <section className={s.section}>
                    <div className={s.wrap}>
                        <div className={s.faq}>
                            <div className={s.head}>
                                <span className={s.eyebrow}>{c.faqEyebrow}</span>
                                <h2>{c.faqTitle}</h2>
                            </div>
                            {c.faq.map((f) => (
                                <details key={f.q}>
                                    <summary>{f.q}</summary>
                                    <p>{f.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

        </div>
    );
}
