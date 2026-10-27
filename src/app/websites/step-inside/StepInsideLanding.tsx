import type { ReactNode } from "react";
import StepInside from "@/app/components/StepInside";
import { CafeNav, ProductRow, MixBlock, DemoEnd } from "./DemoCafe";
import { FunnelShell, BookSection, Faq, Check } from "@/app/components/FunnelShell";
import { PtFunnelShell, PtBookSection, PtFaq } from "./PtFunnel";
import PtPrice from "./PtPrice";
import { carePlanMonthly, formatPrice, websiteTiers } from "@/lib/website-packages";
import { ptWebsite } from "@/lib/i18n/pt";
import s from "@/app/(main)/crm/crm.module.css";
import f from "@/app/components/funnel.module.css";

/**
 * The step-inside websites page, in English (/websites/step-inside) and
 * Portuguese (/pt/websites/demonstracao). One layout; each language brings
 * its own words, chrome and price display.
 */
export type StepLang = "en" | "pt";

// Which package a step-inside site is priced from. Change here if the offer changes.
export const TIER = websiteTiers.find((t) => t.name === "Small Business") ?? websiteTiers[1];
const TIER_NAME_PT = ptWebsite[TIER.id]?.name ?? TIER.name;

// Demo walk-in cut from free Pexels footage (Pexels License; master in
// marketing/step-inside/walkin-demo-1080p.mp4). Swap for a real client walk-in
// (scripts/step-inside/make-frames.ps1) and update the counts.
const DESKTOP = { dir: "/step-inside/cafe-demo/desktop", count: 130 };
const MOBILE = { dir: "/step-inside/cafe-demo/mobile", count: 130 };

type Faqs = { q: string; a: string }[];

const COPY = {
    en: {
        label: "Step inside Your Café · demo",
        logo: "Your Café",
        intro: "Fresh bakes from 7am. Coffee you'll come back for.",
        pill: "Step-inside websites by Autisync",
        title1: "Let customers walk in",
        title2: "before they arrive.",
        lead: (
            <>
                People decide whether to visit a café, salon or clinic in a few seconds on their phone. A real walk
                through your door shows them the place, the counter and the vibe, before they&apos;ve read a word.
            </>
        ),
        ctaGet: "Get one for your business",
        ctaHow: "How it works",
        howEyebrow: "How it works",
        howTitle: "From your front door to a live website.",
        steps: [
            { t: "We film 20 seconds", d: "On a phone, at your door: along the shopfront, open the door, step in and look across the counter. Five minutes, no film crew." },
            { t: "We build your site around it", d: "The walk-in becomes your homepage. Below it: your menu or services, real photos, real Google reviews, opening hours and a map." },
            { t: "Bookings land in your CRM", d: "Orders, bookings and enquiries go into your Autisync CRM, so nothing is lost in a notebook or a DM." },
        ],
        madeFor: "Made for",
        fits: ["Cafés & restaurants", "Barbers & salons", "Aesthetics clinics", "Gyms & studios", "Shops & showrooms", "Estate agency offices"],
        getEyebrow: "What you get",
        getTitle: "Everything a local business site needs, with a front door.",
        included: [
            "Scroll-driven walk-in hero, vertical version for phones",
            "Menu or services, with your real photos and prices",
            "Google reviews, map, hours, WhatsApp and call buttons",
            "Online booking or ordering into the Autisync CRM",
            "Fast on mobile: frames load progressively",
            "Local SEO setup for “[what you do] in [your area]”",
        ],
        addonEyebrow: "Add-on",
        addonTitle: "Tap-for-review tags.",
        addonText: (
            <>
                When a customer is clearly enjoying themselves, your team asks for a review before they leave. They
                tap the tag with their phone and land straight on your Google review page.
            </>
        ),
        addonPoints: [
            <>No app, no searching for your business</>,
            <>Works on iPhone and Android, with a QR code as backup</>,
            <>More reviews each week helps you show up in &ldquo;best [what you do] near me&rdquo; searches</>,
        ] as ReactNode[],
        book: {
            eyebrow: "Book a call",
            title: "Want your business to have one?",
            text: "Pick a time. We'll look at your current site, plan the walk-in and send you a fixed price.",
            points: ["Fixed price before we start", "We film, or guide you to film it", "Bookings into the Autisync CRM"],
        },
        faq: [
            { q: "Do I need a professional video?", a: "No. A modern phone is enough. We film it on a quick visit, or send you a one-page guide so you can film it yourself in five minutes." },
            { q: "Will the video slow my website down?", a: "No. It isn't a heavy video file. We turn it into small, compressed images that load in the background while the first screen appears, and phones get a lighter vertical version." },
            { q: "What if my shop changes?", a: "We re-film and swap it in. Updates are part of the monthly care plan." },
            { q: "Can customers book or order from the site?", a: "Yes. Bookings, orders and enquiries go into your Autisync CRM with notifications, so you can reply quickly." },
            { q: "What about people who prefer less motion?", a: "If someone's device is set to reduce motion, they see a still photo of your shop instead of the scroll effect." },
        ] as Faqs,
    },
    pt: {
        label: "Entre n'O Seu Café · demonstração",
        logo: "O Seu Café",
        intro: "Pastelaria acabada de sair do forno desde as 7h. Um café que o faz voltar.",
        pill: "Websites com entrada em vídeo, pela Autisync",
        title1: "Deixe os clientes entrar",
        title2: "antes de chegarem.",
        lead: (
            <>
                As pessoas decidem se vão a um café, salão ou clínica em poucos segundos, no telemóvel. Uma entrada
                real pela sua porta mostra-lhes o espaço, o balcão e o ambiente, antes de lerem uma única palavra.
            </>
        ),
        ctaGet: "Quero um para o meu negócio",
        ctaHow: "Como funciona",
        howEyebrow: "Como funciona",
        howTitle: "Da sua porta a um website no ar.",
        steps: [
            { t: "Filmamos 20 segundos", d: "Com um telemóvel, à sua porta: ao longo da fachada, abrimos a porta, entramos e olhamos para o balcão. Cinco minutos, sem equipa de filmagem." },
            { t: "Construímos o site à volta disso", d: "A entrada passa a ser a sua página inicial. Por baixo: a ementa ou os serviços, fotografias reais, avaliações reais do Google, horário e mapa." },
            { t: "As marcações entram no seu CRM", d: "Encomendas, marcações e pedidos de contacto entram no seu Autisync CRM, para que nada se perca num caderno ou numa mensagem privada." },
        ],
        madeFor: "Feito para",
        fits: ["Cafés e restaurantes", "Barbearias e salões", "Clínicas de estética", "Ginásios e estúdios", "Lojas e showrooms", "Agências imobiliárias"],
        getEyebrow: "O que recebe",
        getTitle: "Tudo o que o site de um negócio local precisa, com porta de entrada.",
        included: [
            "Entrada em vídeo que avança com o scroll, com versão vertical para telemóvel",
            "Ementa ou serviços, com as suas fotografias e preços reais",
            "Avaliações do Google, mapa, horário e botões de WhatsApp e chamada",
            "Marcações ou encomendas online diretamente no Autisync CRM",
            "Rápido no telemóvel: as imagens carregam aos poucos",
            "SEO local para «[o que faz] em [a sua zona]»",
        ],
        addonEyebrow: "Extra",
        addonTitle: "Etiquetas de avaliação por toque.",
        addonText: (
            <>
                Quando um cliente está claramente satisfeito, a sua equipa pede-lhe uma avaliação antes de ele sair.
                Basta encostar o telemóvel à etiqueta para abrir diretamente a sua página de avaliações do Google.
            </>
        ),
        addonPoints: [
            <>Sem aplicações e sem ter de procurar o seu negócio</>,
            <>Funciona em iPhone e Android, com um código QR como alternativa</>,
            <>Mais avaliações todas as semanas ajudam-no a aparecer nas pesquisas «melhor [o que faz] perto de mim»</>,
        ] as ReactNode[],
        book: {
            eyebrow: "Marcar uma chamada",
            title: "Quer um assim para o seu negócio?",
            text: "Escolha um horário. Analisamos o seu site atual, planeamos a entrada em vídeo e enviamos-lhe um preço fixo.",
            points: ["Preço fixo antes de começarmos", "Nós filmamos, ou ensinamos a filmar", "Marcações diretamente no Autisync CRM"],
        },
        faq: [
            { q: "Preciso de um vídeo profissional?", a: "Não. Um telemóvel recente chega. Filmamos numa visita rápida, ou enviamos-lhe um guia de uma página para que o filme em cinco minutos." },
            { q: "O vídeo vai tornar o meu website lento?", a: "Não. Não é um ficheiro de vídeo pesado. Transformamo-lo em imagens pequenas e comprimidas que carregam em segundo plano enquanto aparece o primeiro ecrã, e os telemóveis recebem uma versão vertical mais leve." },
            { q: "E se o meu espaço mudar?", a: "Voltamos a filmar e substituímos a entrada. As atualizações fazem parte do plano de manutenção mensal." },
            { q: "Os clientes podem marcar ou encomendar pelo site?", a: "Sim. Marcações, encomendas e pedidos entram no seu Autisync CRM com notificações, para que possa responder depressa." },
            { q: "E quem prefere menos movimento no ecrã?", a: "Se o dispositivo estiver configurado para reduzir o movimento, a pessoa vê uma fotografia fixa do seu espaço em vez do efeito de scroll." },
        ] as Faqs,
    },
};

/** FAQ per language, for each page's JSON-LD. */
export const STEP_INSIDE_FAQ: Record<StepLang, Faqs> = { en: COPY.en.faq, pt: COPY.pt.faq };

export default function StepInsideLanding({ lang = "en", schema }: { lang?: StepLang; schema?: object }) {
    const c = COPY[lang];
    const pt = lang === "pt";
    const Shell = pt ? PtFunnelShell : FunnelShell;
    const Book = pt ? PtBookSection : BookSection;
    const FaqBlock = pt ? PtFaq : Faq;
    return (
        <Shell schema={schema} hideNav>
            {/* The demo café: what a client's site looks like. */}
            <StepInside desktop={DESKTOP} mobile={MOBILE} poster="/step-inside/cafe-demo/desktop/f_0001.webp"
                label={c.label} logo={c.logo} overlay={<CafeNav />}>
                <p className={s.lead} style={{ color: "#fff", maxWidth: 520, fontWeight: 500 }}>
                    {c.intro}
                </p>
            </StepInside>
            <ProductRow />
            <MixBlock />
            <DemoEnd />

            {/* Autisync's own sales page from here. */}
            <section className={s.section}>
                <div className={s.wrap}>
                    <span className={s.pill}><i />{c.pill}</span>
                    <h1 className={s.heroTitle} style={{ maxWidth: 860, marginTop: 14 }}>
                        {c.title1}<br /><span>{c.title2}</span>
                    </h1>
                    <p className={s.lead} style={{ maxWidth: 680, marginTop: 16 }}>
                        {c.lead}
                    </p>
                    <div className={s.ctaRow} style={{ marginTop: 22 }}>
                        <a className={`${s.btn} ${s.btnGold}`} href="#book">{c.ctaGet}</a>
                        <a className={`${s.btn} ${s.btnGhost}`} href="#how">{c.ctaHow}</a>
                    </div>
                </div>
            </section>

            <section className={s.section} id="how" style={{ paddingTop: 0 }}>
                <div className={s.wrap}>
                    <div className={s.head}>
                        <span className={s.eyebrow}>{c.howEyebrow}</span>
                        <h2>{c.howTitle}</h2>
                    </div>
                    <div className={f.cards}>
                        {c.steps.map((st, i) => (
                            <div className={f.cardItem} key={st.t}>
                                <span className={f.num}>{i + 1}</span>
                                <h3>{st.t}</h3>
                                <p>{st.d}</p>
                            </div>
                        ))}
                    </div>
                    <div className={s.who}>
                        <b>{c.madeFor}</b>
                        {c.fits.map((x) => <span className={s.chip} key={x}>{x}</span>)}
                    </div>
                </div>
            </section>

            <section className={s.section} style={{ paddingTop: 0 }}>
                <div className={s.wrap}>
                    <div className={s.head}>
                        <span className={s.eyebrow}>{c.getEyebrow}</span>
                        <h2>{c.getTitle}</h2>
                    </div>
                    <ul className={s.checks} style={{ columns: 2, columnGap: 32 }}>
                        {c.included.map((x) => <li key={x}><Check />{x}</li>)}
                    </ul>
                    {pt ? (
                        <PtPrice tier={TIER} tierName={TIER_NAME_PT} />
                    ) : (
                        <div className={f.price} style={{ marginTop: 32 }}>
                            <span className={s.muted}>From</span>
                            <span className={f.priceBig}>{formatPrice(TIER.price.GBP, "GBP")}</span>
                            <span className={s.muted}>first year, domain and hosting included</span>
                            <p>Built on our {TIER.name} package. From year 2: {formatPrice(carePlanMonthly.GBP, "GBP")}/month for hosting, email, backups and changes.</p>
                        </div>
                    )}
                </div>
            </section>

            <section className={s.section} style={{ paddingTop: 0 }}>
                <div className={`${s.wrap} ${f.statement}`}>
                    <div>
                        <span className={s.eyebrow}>{c.addonEyebrow}</span>
                        <h2>{c.addonTitle}</h2>
                        <p className={s.lead} style={{ marginTop: 12 }}>
                            {c.addonText}
                        </p>
                    </div>
                    <ul className={s.checks}>
                        {c.addonPoints.map((x, i) => <li key={i}><Check />{x}</li>)}
                    </ul>
                </div>
            </section>

            <Book eyebrow={c.book.eyebrow} title={c.book.title} text={c.book.text} points={c.book.points} />
            <FaqBlock items={c.faq} />
        </Shell>
    );
}
