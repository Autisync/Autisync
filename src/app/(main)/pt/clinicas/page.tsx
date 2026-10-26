import type { Metadata } from "next";
import Link from "next/link";
import Promises from "@/app/components/Promises";
import { carePlanMonthly, formatPrice, websiteTiers } from "@/lib/website-packages";
import { ptWebsite } from "@/lib/i18n/pt";
import { waLink } from "@/lib/whatsapp";
import UseCases from "@/app/components/useCases/UseCases";
import DayTimeline from "@/app/components/useCases/DayTimeline";
import { ptCases, ptCopy } from "@/app/components/useCases/cases";

/**
 * /pt/clinicas — clinics, aesthetic clinics and salons in Portugal.
 *
 * Only what the CRM does today for these businesses (see the clinic and
 * beauty playbooks in the CRM): site, online bookings with reminders, an
 * instant WhatsApp reply to every new request, review requests, rebooking
 * reminders and invoices. Missed-call answering (CallCatch) works with UK
 * numbers only, so this page does not promise it for Portugal. Invoicing
 * certification is still pending, and the page says so.
 */

const URL = "https://www.autisync.com/pt/clinicas";
// The UK twin, /clinics, offers the missed-call text-back as well.
const EN_URL = "https://www.autisync.com/clinics";
const wa = (text: string) => waLink(text, "WEB-clinicas");
const WA_TEXT = "Olá, Autisync. Vi a página para clínicas e salões e gostava de saber mais.";

const eur = (n: number) => formatPrice(n, "EUR");
const [startup, smallBiz] = websiteTiers;
const care = eur(carePlanMonthly.EUR);

const TITLE = "Marcações online e WhatsApp para clínicas e salões";
const DESCRIPTION =
    "Para clínicas, clínicas de estética e salões em Portugal: site, marcações online com lembretes, WhatsApp com resposta imediata, pedidos de avaliação e convites para voltar. Tudo configurado por nós, sem fidelização de 12 meses.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: URL, languages: { en: EN_URL, pt: URL, "x-default": EN_URL } },
    openGraph: {
        title: "Cada chamada perdida é uma marcação perdida — Autisync",
        description: DESCRIPTION,
        url: URL,
        locale: "pt_PT",
        type: "website",
    },
};

// The use cases for clinics and salons (and those for any business), from
// the shared list: the same cases play on the home page.
const cases = ptCases.filter((c) => c.for === "all" || c.for.includes("clinics") || c.for.includes("salons"));

const example = [
    { when: "21h00", what: "Uma cliente escreve no WhatsApp a perguntar se há vaga na sexta." },
    { when: "21h00", what: "A cliente recebe logo a resposta automática que a clínica escreveu uma única vez, por exemplo com o link para marcar online." },
    { when: "21h05", what: "Marca sozinha online. A marcação entra na agenda da clínica e ela recebe de imediato a confirmação." },
    { when: "Antes da consulta", what: "Recebe um lembrete da marcação." },
    { when: "Depois da consulta", what: "Recebe o pedido de avaliação e, na altura certa, o convite para voltar." },
];

const promises = [
    { t: "Sem fidelização de 12 meses", d: "Pagamento mensal. Depois do período mínimo indicado na proposta, pode cancelar com 30 dias de antecedência, por e-mail ou na sua conta." },
    { t: "Renovações com aviso prévio", d: "Avisamos 30 dias antes de qualquer renovação anual, como a do domínio." },
    { t: "Um só parceiro, uma só conta", d: "Site, domínio, e-mail, CRM, marcações, faturas, publicações e anúncios, com a mesma equipa." },
    { t: "Configurado por nós", d: "Fazemos a configuração e importamos a sua lista de clientes. Fala sempre com uma pessoa da nossa equipa, a quem trata pelo nome. Está disponível no WhatsApp nos dias úteis, das 9h00 às 18h00 (hora de Lisboa)." },
    { t: "As fichas são suas", d: "O site, o domínio e os dados dos clientes são seus. Pode exportar os dados para Excel ou CSV quando quiser e, se deixar de trabalhar connosco, entregamos-lhe tudo no prazo de 30 dias." },
    { t: "Preços claros", d: "Os preços do site e da manutenção estão nesta página. O preço mensal do CRM fica indicado na proposta, antes de decidir." },
];

const steps = [
    { t: "Diagnóstico de 1 minuto", d: "Responde a três perguntas sobre o seu negócio e recebe um plano pensado para uma clínica ou um salão como o seu." },
    { t: "Chamada de 15 minutos", d: "Vemos como lhe chegam hoje as marcações e enviamos uma proposta com o preço." },
    { t: "Configuramos tudo", d: "Site, agenda, WhatsApp, mensagens automáticas e a sua lista de clientes, prontos a usar." },
    { t: "Arranque", d: "Mostramos à sua equipa como funciona e fica com uma pessoa da nossa equipa disponível no WhatsApp." },
];

const faq = [
    {
        q: "Atendem as chamadas que eu não consigo atender?",
        a: "Em Portugal, ainda não: a resposta automática a chamadas perdidas funciona, por agora, só no Reino Unido. Por cá, damos aos seus clientes formas mais rápidas de marcar: quem lhe escreve pelo WhatsApp ou pelo site recebe resposta imediata, mesmo fora de horas, e pode marcar sozinho online.",
    },
    {
        q: "Serve para o meu tipo de negócio?",
        a: "Sim. Configuramos o CRM para clínicas (de estética, dentárias, de fisioterapia e outras), cabeleireiros, barbearias, salões de beleza e spas. Os convites para voltar seguem o ritmo de cada serviço, como a manutenção de um tratamento ou a consulta de rotina.",
    },
    {
        q: "Quanto custa?",
        a: `O site começa em ${eur(startup.price.EUR)} (Startup, até 6 páginas) ou ${eur(smallBiz.price.EUR)} (Pequena Empresa, 10 páginas). Paga-se em duas partes: 50% no início e 50% no lançamento. Inclui domínio, alojamento e e-mail no primeiro ano. A partir do 2.º ano, a manutenção custa ${care} por mês. O CRM tem um preço mensal fixo, indicado na proposta antes de decidir.`,
    },
    {
        q: "Há fidelização?",
        a: "Não há fidelização de 12 meses. Os planos são mensais: depois do período mínimo indicado na proposta, pode cancelar com 30 dias de antecedência, por e-mail ou na sua conta. Avisamos 30 dias antes de qualquer renovação anual, como a do domínio.",
    },
    {
        q: "Os dados dos meus clientes são meus?",
        a: "Sim. As fichas, as marcações e o histórico são seus. Pode exportar os dados para Excel ou CSV quando quiser e, se deixar de trabalhar connosco, entregamos-lhe tudo no prazo de 30 dias.",
    },
    {
        q: "A faturação é certificada?",
        a: "Ainda não: o processo de certificação está em curso. Até lá, se já usa um programa de faturação certificado, continue a usá-lo para as faturas. Tudo o resto (site, marcações, WhatsApp, avaliações e convites para voltar) já funciona.",
    },
    {
        q: "Quem me ajuda?",
        a: "Uma pessoa da nossa equipa, a quem trata pelo nome e pode escrever pelo WhatsApp nos dias úteis, das 9h00 às 18h00 (hora de Lisboa). Nós configuramos tudo, por isso não tem de aprender um sistema novo sozinho.",
    },
];

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Autisync para clínicas e salões",
        serviceType: "Site, marcações online e CRM com WhatsApp para clínicas e salões",
        provider: { "@type": "Organization", name: "Autisync", url: "https://www.autisync.com" },
        areaServed: { "@type": "Country", name: "Portugal" },
        audience: { "@type": "BusinessAudience", name: "Clínicas, clínicas de estética e salões" },
        url: URL,
        inLanguage: "pt-PT",
        description: DESCRIPTION,
        offers: websiteTiers.slice(0, 2).map((t) => ({
            "@type": "Offer",
            name: `Website ${ptWebsite[t.id]?.name ?? t.name}`,
            price: t.price.EUR,
            priceCurrency: "EUR",
        })),
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: "pt-PT",
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Autisync", item: "https://www.autisync.com/pt" },
            { "@type": "ListItem", position: 2, name: "Clínicas e salões", item: URL },
        ],
    },
];

export default function ClinicasPage() {
    return (
        <div lang="pt-PT" className="bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <section className="px-6 pt-32 pb-16 mx-auto max-w-5xl lg:px-8 sm:pt-40">
                <p className="text-sm font-semibold text-[#B28228]">Clínicas, clínicas de estética e salões · Portugal</p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl [text-wrap:balance]">
                    Cada chamada perdida é uma marcação perdida.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                    Com uma cliente na cadeira ou um paciente no gabinete, não pode atender o telefone. Por isso, damos aos seus
                    clientes outras formas de marcar, a qualquer hora. Quem lhe escreve pelo WhatsApp ou pelo site recebe resposta
                    imediata, marca sozinho online e recebe um lembrete antes de vir.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-10">
                    <Link
                        href="/pt/diagnostico"
                        className="rounded-md bg-[#1C1C1C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#B28228] transition"
                    >
                        Fazer o diagnóstico grátis
                    </Link>
                    <a
                        href={wa(WA_TEXT)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 hover:border-[#B28228] hover:text-[#B28228] transition"
                    >
                        Falar no WhatsApp
                    </a>
                </div>
                <p className="mt-4 text-sm text-gray-500">Sem fidelização de 12 meses. Tudo configurado por nós.</p>
            </section>

            {/* Use cases, played one by one */}
            <section aria-labelledby="clinicas-casos" className="py-20 bg-gray-50">
                <div className="px-6 mx-auto max-w-6xl lg:px-8">
                    <p className="text-sm font-semibold text-[#B28228]">Casos de uso</p>
                    <h2 id="clinicas-casos" className="mt-2 text-3xl font-semibold text-gray-800 [text-wrap:balance]">
                        Veja o CRM a trabalhar na sua clínica ou no seu salão
                    </h2>
                    <p className="mt-4 max-w-2xl text-gray-600">
                        Escolha um caso, ou deixe-os passar: cada um mostra o que o cliente vê e o que a sua equipa recebe. Os casos
                        marcados como Extra são módulos à parte, com preço próprio na proposta.
                    </p>
                    <div className="mt-10">
                        <UseCases cases={cases} copy={ptCopy} groups={["clinics", "salons"]} idPrefix="clinicas-uc" />
                    </div>
                </div>
            </section>

            {/* An evening, step by step */}
            <section aria-labelledby="clinicas-exemplo" className="px-6 py-20 mx-auto max-w-5xl lg:px-8">
                <h2 id="clinicas-exemplo" className="text-3xl font-semibold text-gray-800 [text-wrap:balance]">
                    Uma terça-feira às 21h00, com a clínica fechada
                </h2>
                <DayTimeline items={example} replay="Ver outra vez" />
                <p className="mt-6 text-xs text-gray-500">Exemplo ilustrativo de como as mensagens automáticas funcionam.</p>
            </section>

            {/* Promises */}
            <section className="px-6 py-20 bg-gray-50 lg:px-8">
                <Promises id="clinicas-sem-surpresas" eyebrow="Sem surpresas" title="Como trabalhamos consigo" items={promises} />
            </section>

            {/* Prices */}
            <section aria-labelledby="clinicas-precos" className="px-6 py-20 mx-auto max-w-5xl lg:px-8">
                <h2 id="clinicas-precos" className="text-3xl font-semibold text-gray-800">Quanto custa</h2>
                <div className="grid gap-6 mt-8 sm:grid-cols-3">
                    {[startup, smallBiz].map((t) => (
                        <div key={t.id} className={"rounded-2xl p-6 ring-1 " + (t.mostPopular ? "ring-2 ring-[#B28228]" : "ring-gray-200")}>
                            <h3 className="font-semibold text-gray-800">Site {ptWebsite[t.id]?.name ?? t.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">A partir de</p>
                            <p className="text-3xl font-bold tracking-tight text-gray-900 tabular-nums">{eur(t.price.EUR)}</p>
                            <p className="mt-2 text-sm text-gray-600">
                                {ptWebsite[t.id]?.features[0]}. Pago uma só vez, em duas partes: 50% no início e 50% no lançamento.
                            </p>
                        </div>
                    ))}
                    <div className="rounded-2xl p-6 ring-1 ring-gray-200">
                        <h3 className="font-semibold text-gray-800">Manutenção do site</h3>
                        <p className="mt-1 text-sm text-gray-500">A partir do 2.º ano</p>
                        <p className="text-3xl font-bold tracking-tight text-gray-900 tabular-nums">
                            {care}
                            <span className="text-base font-medium text-gray-500">/mês</span>
                        </p>
                        <p className="mt-2 text-sm text-gray-600">Alojamento, e-mail, cópias de segurança, atualizações e 2 horas de alterações.</p>
                    </div>
                </div>
                <p className="mt-6 max-w-3xl text-sm text-gray-600">
                    O CRM (marcações, WhatsApp, avaliações, convites para voltar e faturas) tem um preço mensal fixo, indicado na
                    proposta antes de decidir. Pagamento mensal, sem fidelização de 12 meses: pode cancelar com 30 dias de antecedência.
                </p>
                <Link href="/pt/precos?market=pt" className="inline-block mt-3 text-sm font-semibold text-[#B28228] hover:underline">
                    Ver todos os pacotes e preços
                </Link>
            </section>

            {/* How it works */}
            <section aria-labelledby="clinicas-como" className="py-20 bg-gray-50">
                <div className="px-6 mx-auto max-w-5xl lg:px-8">
                    <h2 id="clinicas-como" className="text-3xl font-semibold text-gray-800">Como funciona</h2>
                    <ol className="grid gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-4">
                        {steps.map((s, i) => (
                            <li key={s.t}>
                                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#1C1C1C] text-sm font-semibold text-white">{i + 1}</span>
                                <h3 className="mt-4 font-semibold text-gray-800">{s.t}</h3>
                                <p className="mt-2 text-sm leading-6 text-gray-600">{s.d}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* FAQ */}
            <section aria-labelledby="clinicas-faq" className="py-20">
                <div className="px-6 mx-auto max-w-3xl lg:px-8">
                    <h2 id="clinicas-faq" className="text-3xl font-semibold text-gray-800">Perguntas frequentes</h2>
                    <div className="mt-8 divide-y divide-gray-200">
                        {faq.map((f) => (
                            <details key={f.q} className="py-5 group">
                                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-gray-800">
                                    {f.q}
                                    <span className="text-[#B28228] transition group-open:rotate-45" aria-hidden="true">+</span>
                                </summary>
                                <p className="mt-3 text-sm leading-6 text-gray-600">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 py-20 mx-auto max-w-5xl text-center lg:px-8 bg-white">
                <h2 className="text-3xl font-semibold text-gray-800 [text-wrap:balance]">Veja o que podemos fazer pela sua agenda</h2>
                <p className="mx-auto mt-4 max-w-xl text-gray-600">
                    Faça o diagnóstico grátis de 1 minuto e receba um plano para o seu negócio, ou fale connosco no WhatsApp.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <Link href="/pt/diagnostico" className="rounded-md bg-[#1C1C1C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#B28228] transition">
                        Fazer o diagnóstico grátis
                    </Link>
                    <a
                        href={wa(WA_TEXT)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 hover:border-[#B28228] hover:text-[#B28228] transition"
                    >
                        Falar no WhatsApp
                    </a>
                </div>
                <p className="mt-8 text-sm text-gray-500">
                    Tem uma imobiliária?{" "}
                    <Link href="/crm/imobiliarias" className="font-semibold text-[#B28228] hover:underline">
                        Veja o CRM para imobiliárias
                    </Link>
                </p>
            </section>
        </div>
    );
}
