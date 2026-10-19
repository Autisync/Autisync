import type { Metadata } from "next";
import { faqSchema } from "@/app/components/FunnelShell";
import { PtFunnelShell, PtBookSection, PtFaq } from "../_components/PtFunnelShell";
import MissedCallCalculator from "@/app/tools/missed-call-cost/MissedCallCalculator";
import s from "@/app/crm/crm.module.css";
import f from "@/app/components/funnel.module.css";

const EN_URL = "https://www.autisync.com/tools/missed-call-cost";
const URL = "https://www.autisync.com/pt/ferramentas/custo-chamadas-perdidas";
const TITLE = "Calculadora de chamadas perdidas: quanto custam ao seu negócio as chamadas que não atende?";
const DESCRIPTION =
    "Calculadora grátis para técnicos, clínicas e negócios locais. Indique as chamadas perdidas por semana e o valor médio de um trabalho e veja quanto lhe custam por mês e por ano.";

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: URL, languages: { en: EN_URL, pt: URL, "x-default": EN_URL } },
    openGraph: { type: "website", url: URL, siteName: "Autisync", title: TITLE, description: DESCRIPTION, locale: "pt_AO" },
};

const FAQ = [
    { q: "Como conto as minhas chamadas perdidas?", a: "Abra as chamadas recentes do telemóvel e filtre pelas não atendidas. Conte uma semana normal, não uma semana de férias. Se tiver uma linha empresarial ou um sistema VoIP, o relatório de chamadas mostra as que ficaram sem resposta." },
    { q: "Porque é que quem não é atendido não volta a ligar?", a: "A maioria das pessoas que precisa de um canalizador, de um dentista ou de uma mesa para hoje à noite liga simplesmente para o negócio seguinte no Google. Normalmente fica com o trabalho quem responde primeiro." },
    { q: "O que é a SMS automática para chamadas perdidas?", a: "Quando não consegue atender, quem ligou recebe de imediato uma SMS do seu negócio, por exemplo 'Desculpe não termos atendido. Em que podemos ajudar?'. A resposta, o nome e a localização entram no seu CRM com um lembrete para devolver a chamada." },
    { q: "Funciona para quem trabalha por conta própria só com o telemóvel?", a: "Sim. As chamadas não atendidas no seu telemóvel podem ser reencaminhadas para um número empresarial que envia a SMS e regista o contacto, por isso continua a usar o seu próprio telemóvel." },
];

const schema = {
    "@context": "https://schema.org",
    "@graph": [
        { "@type": "WebApplication", name: "Calculadora do custo das chamadas perdidas", url: URL, inLanguage: "pt", applicationCategory: "BusinessApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: 0, priceCurrency: "AOA" }, provider: { "@type": "Organization", name: "Autisync", url: "https://www.autisync.com" } },
        { ...faqSchema(FAQ), inLanguage: "pt" },
    ],
};

export default function CustoChamadasPerdidasPage() {
    return (
        <PtFunnelShell schema={schema} navCta="Resolver chamadas perdidas">
            <header className={s.section} style={{ paddingBottom: 0 }}>
                <div className={s.wrap}>
                    <span className={s.pill}><i />Ferramenta grátis</span>
                    <h1 className={s.heroTitle} style={{ marginTop: 14, maxWidth: 860 }}>Quanto lhe custam as <span>chamadas perdidas?</span></h1>
                    <p className={s.lead} style={{ maxWidth: 680, marginTop: 14 }}>
                        Cada chamada que não consegue atender enquanto está num trabalho ou com um cliente pode ser trabalho
                        para outra pessoa. Introduza os seus números e veja quanto isso representa.
                    </p>
                    <MissedCallCalculator lang="pt" />
                </div>
            </header>

            <section className={s.section}>
                <div className={`${s.wrap} ${f.prose}`}>
                    <h2>Como é feito o cálculo</h2>
                    <p>
                        Partimos das suas <strong>chamadas perdidas por semana</strong>, ficamos só com a parte que são <strong>pedidos
                        novos</strong> e aplicamos a percentagem que <strong>costuma fechar</strong> quando atende. Isso dá os trabalhos
                        perdidos por mês, multiplicados pelo <strong>valor médio de um trabalho</strong>.
                    </p>
                    <p>
                        A última linha mostra o que manteria se uma SMS imediata impedisse parte dessas pessoas de ligar para o negócio
                        seguinte. É isso que faz a SMS automática da Autisync para chamadas perdidas: quem ligou recebe uma mensagem em
                        segundos, a resposta entra no seu CRM Autisync e recebe um lembrete &ldquo;Devolver chamada&rdquo; com os
                        detalhes do trabalho.
                    </p>
                </div>
            </section>

            <PtBookSection
                eyebrow="Deixe de perder chamadas"
                title="Ative a SMS automática para chamadas perdidas no seu negócio."
                text="Marque uma chamada curta. Vemos como as chamadas lhe chegam hoje e configuramos a SMS automática no seu número."
                points={["Mantém o seu número de telemóvel", "Cada chamada perdida recebe uma SMS em segundos", "Contactos e lembretes para devolver chamadas no seu CRM"]}
            />
            <PtFaq items={FAQ} />
        </PtFunnelShell>
    );
}
