import type { Metadata } from "next";
import Link from "next/link";
import { faqSchema } from "@/app/components/FunnelShell";
import { PtFunnelShell, PtBookSection, PtFaq } from "../_components/PtFunnelShell";
import MissedCallCalculator from "@/app/tools/missed-call-cost/MissedCallCalculator";
import s from "@/app/(main)/crm/crm.module.css";
import f from "@/app/components/funnel.module.css";

const EN_URL = "https://www.autisync.com/tools/missed-call-cost";
const URL = "https://www.autisync.com/pt/ferramentas/custo-chamadas-perdidas";
const TITLE = "Calculadora de chamadas perdidas: quanto lhe custam por mês?";
const DESCRIPTION =
    "Calculadora grátis para técnicos, clínicas e negócios locais: indique as chamadas perdidas por semana e o valor de um trabalho e veja quanto perde.";

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: URL, languages: { en: EN_URL, pt: URL, "x-default": EN_URL } },
    openGraph: { type: "website", url: URL, siteName: "Autisync", title: TITLE, description: DESCRIPTION, locale: "pt_AO" },
};

const FAQ = [
    { q: "Como conto as minhas chamadas perdidas?", a: "Abra as chamadas recentes do telemóvel e filtre pelas não atendidas. Conte uma semana normal, não uma semana de férias. Se tiver uma linha empresarial ou um sistema VoIP, o relatório de chamadas mostra as que ficaram sem resposta." },
    { q: "Porque é que quem não é atendido não volta a ligar?", a: "A maioria das pessoas que precisa de um canalizador, de um dentista ou de uma mesa para hoje à noite liga simplesmente para o negócio seguinte no Google. Normalmente fica com o trabalho quem responde primeiro." },
    { q: "A Autisync responde às chamadas que eu não atendo?", a: "Em Portugal e em Angola, ainda não: a resposta automática a chamadas perdidas funciona, por agora, só no Reino Unido. Aqui, damos aos seus clientes formas mais rápidas de chegar até si: quem lhe escreve no WhatsApp ou pelo site recebe resposta imediata, também fora de horas, e pode marcar sozinho online." },
    { q: "Funciona para quem trabalha por conta própria só com o telemóvel?", a: "Sim. Os pedidos do WhatsApp e do site entram no seu CRM Autisync, que abre no telemóvel, com uma tarefa para responder. Continua a usar o seu próprio número." },
];

const schema = {
    "@context": "https://schema.org",
    "@graph": [
        { "@type": "WebApplication", name: "Calculadora do custo das chamadas perdidas", url: URL, inLanguage: "pt", applicationCategory: "BusinessApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: 0, priceCurrency: "AOA" }, provider: { "@id": "https://www.autisync.com/#organization" } },
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
                        A última linha mostra o que manteria se uma resposta imediata impedisse parte dessas pessoas de procurar o negócio
                        seguinte. Em Portugal e em Angola, a Autisync faz isso pelo WhatsApp e pelo site: quem lhe escreve recebe resposta
                        imediata, também fora de horas, e o pedido entra no seu CRM Autisync com uma tarefa para responder.
                    </p>
                    <p>
                        Tem uma clínica ou um salão? <Link href="/pt/clinicas">Veja o que preparámos para clínicas e salões</Link>.
                    </p>
                </div>
            </section>

            <PtBookSection
                eyebrow="Deixe de perder pedidos"
                title="Responda a todos, mesmo quando não pode atender."
                text="Marque uma chamada curta. Vemos como os pedidos lhe chegam hoje e pomos o WhatsApp e as marcações online a responder por si."
                points={["Resposta imediata a quem escreve no WhatsApp ou pelo site", "Marcações online a qualquer hora", "Cada pedido no seu CRM, com tarefa para responder"]}
            />
            <PtFaq items={FAQ} />
        </PtFunnelShell>
    );
}
