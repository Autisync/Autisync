import Image from "next/image";
import Link from "next/link";
import Clients from "@/app/(main)/solutions/clients";

type Feature = {
    name: string;
    description: string;
};

type Step = {
    title: string;
    subtitle: string;
    description: string;
};

type FAQ = {
    question: string;
    answer: string;
};

const features: Feature[] = [
    {
        name: "Avaliação do seu desempenho atual em SEO",
        description:
            "Começamos com uma auditoria aprofundada ao seu website, conteúdos e visibilidade nas pesquisas, para definir objetivos claros, acompanhar resultados e perceber o que funciona e o que precisa de melhorar.",
    },
    {
        name: "Ferramentas, dados e automação",
        description:
            "Combinamos Google Analytics, Search Console, ferramentas de palavras-chave e análises com IA para descobrir palavras-chave de alto valor, lacunas de conteúdo e oportunidades de otimização.",
    },
    {
        name: "SEO alinhado com as redes sociais",
        description:
            "Alinhamos o SEO com as suas redes sociais para aumentar a visibilidade, o envolvimento e a autoridade da marca, levando os seus conteúdos às pessoas certas com mais frequência.",
    },
];

const processSteps: Step[] = [
    {
        title: "Passo 1",
        subtitle: "Análise e auditoria",
        description:
            "Analisamos o seu website, a concorrência, as palavras-chave e o estado técnico do site para identificar ganhos rápidos e oportunidades a longo prazo.",
    },
    {
        title: "Passo 2",
        subtitle: "Estratégia e plano de ação",
        description:
            "Definimos um plano de SEO à medida, com otimização on-page, estratégia de conteúdos, SEO local (quando relevante) e reforço de autoridade.",
    },
    {
        title: "Passo 3",
        subtitle: "Implementação",
        description:
            "Otimizamos páginas, melhoramos as ligações internas, corrigimos problemas técnicos e criamos ou ajustamos conteúdos de acordo com aquilo que o seu público realmente pesquisa.",
    },
    {
        title: "Passo 4",
        subtitle: "Monitorização e relatórios",
        description:
            "Acompanhamos posições, tráfego e conversões e ajustamos a estratégia com base no desempenho real. Recebe relatórios claros e fáceis de ler.",
    },
];

const faqItems: FAQ[] = [
    {
        question: "Quanto tempo demora a ver resultados de SEO?",
        answer:
            "O SEO é um investimento a longo prazo. Muitas empresas começam a ver melhorias significativas em 3 a 6 meses, consoante a concorrência, o histórico do website e a rapidez com que as alterações são implementadas.",
    },
    {
        question: "Preciso de SEO se já faço anúncios pagos?",
        answer:
            "Sim. Os anúncios param assim que o orçamento acaba. O SEO cria visibilidade e autoridade duradouras para continuar a atrair clientes de forma orgânica, e os anúncios costumam ter melhor desempenho quando o website está bem otimizado.",
    },
    {
        question: "Podem ajudar com SEO local para a minha zona?",
        answer:
            "Sem dúvida. Otimizamos o seu Perfil da Empresa no Google, as referências locais, os conteúdos das páginas e a estratégia de avaliações, para que os clientes da sua zona o encontrem quando pesquisam.",
    },
    {
        question: "Vou receber relatórios sobre o vosso trabalho?",
        answer:
            "Sim. Recebe relatórios regulares com posições, evolução do tráfego, principais ações realizadas e explicações simples, para saber sempre onde está a ser aplicado o seu investimento.",
    },
];

export default function SeoMarketingClient() {
    return (
        <>
            {/* HERO / LANDING */}
            <div className="relative overflow-hidden bg-gray-100 isolate mt-12">
                <svg
                    className="absolute inset-0 -z-10 h-full w-full stroke-[var(--autisync-gold,#B98B2F)] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="seo-grid-pattern"
                            width={200}
                            height={200}
                            x="50%"
                            y={-1}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M.5 200V.5H200" fill="none" />
                        </pattern>
                    </defs>
                    <rect
                        width="100%"
                        height="100%"
                        strokeWidth={0}
                        fill="url(#seo-grid-pattern)"
                    />
                </svg>

                <div className="px-6 pt-10 pb-24 mx-auto max-w-7xl sm:pb-32 lg:flex lg:px-8 lg:py-20">
                    {/* LEFT HERO TEXT */}
                    <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                        <p className="mt-4 text-base font-base text-[var(--autisync-gold,#B98B2F)]">
                            Chegue ao seu público
                        </p>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-800 sm:text-6xl">
                            SEO e Marketing Digital
                        </h1>
                        <p className="mt-6 text-base leading-8 text-gray-600">
                            Transforme pesquisas em pedidos de contacto e clientes reais. O nosso
                            serviço de envolvimento estratégico do público combina SEO, conteúdos e
                            análise de dados para que a sua empresa suba no Google, seja descoberta
                            e fique na memória dos clientes.
                        </p>

                        <div className="flex flex-wrap items-center mt-8 gap-4">
                            <Link
                                href="/pt/precos"
                                className="px-5 py-2 text-sm text-white bg-[#1C1C1C] rounded-md shadow hover:bg-[var(--autisync-gold,#B98B2F)] hover:shadow-lg transition"
                            >
                                Ver pacotes de serviços
                            </Link>
                            <Link
                                href="https://wa.me/+447883317646?text=Ol%C3%A1%20Autisync%2C%20gostaria%20de%20pedir%20uma%20an%C3%A1lise%20de%20SEO%20gratuita."
                                target="_blank"
                                className="text-sm font-medium text-gray-700 hover:text-[var(--autisync-gold,#B98B2F)] underline underline-offset-4"
                            >
                                Pedir análise de SEO gratuita
                            </Link>
                        </div>

                        <ul className="mt-6 space-y-2 text-sm text-gray-600">
                            <li>• Estratégias de SEO local e nacional</li>
                            <li>• Ideal para empresas de serviços e marcas em crescimento</li>
                            <li>• Relatórios transparentes, sem jargão confuso</li>
                        </ul>
                    </div>

                    {/* RIGHT HERO IMAGE */}
                    <div className="flex max-w-2xl mx-auto mt-16 sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                        <div className="flex-none max-w-3xl sm:max-w-5xl lg:max-w-none">
                            <div className="p-2 -m-2 bg-[#1C1C1C] rounded-xl ring-1 ring-inset ring-gray-800 lg:-m-4 lg:rounded-2xl lg:p-4">
                                <Image
                                    src="https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80"
                                    alt="Painéis de SEO e análise de dados"
                                    width={1200}
                                    height={1200}
                                    className="w-[40rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* EVERYTHING YOU NEED / SCREENSHOT SECTION */}
            <div className="py-12 bg-gray-100 sm:py-16">
                <div className="px-6 mx-auto max-w-7xl lg:px-8">
                    <div className="max-w-2xl mx-auto sm:text-center">
                        <h2 className="text-base font-base leading-7 text-[var(--autisync-gold,#B98B2F)]">
                            Tudo o que precisa
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl">
                            Um único parceiro para todo o SEO
                        </p>
                        <p className="mt-2 text-base text-gray-600">
                            Da auditoria à implementação e aos relatórios, tratamos de todo o
                            processo de SEO, para que não tenha de gerir vários freelancers ou
                            ferramentas.
                        </p>
                    </div>
                </div>

                <div className="relative pt-16 overflow-hidden">
                    <div className="px-6 mx-auto max-w-7xl lg:px-8">
                        <Image
                            src="/seos.png"
                            alt="Painel geral de SEO"
                            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-white/10"
                            width={2432}
                            height={1442}
                        />
                        <div className="relative" aria-hidden="true">
                            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-gray-100 pt-[7%]" />
                        </div>
                    </div>
                </div>

                {/* FEATURE GRID */}
                <div className="px-6 mx-auto mt-16 max-w-7xl sm:mt-20 md:mt-24 lg:px-8">
                    <dl className="grid max-w-2xl grid-cols-1 mx-auto text-base leading-7 text-gray-300 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-9">
                                <dt className="inline font-semibold text-[#1C1C1C]">
                                    <span className="absolute left-0 top-1 h-5 w-5 rounded-full bg-[var(--autisync-gold,#B98B2F)]/10 border border-[var(--autisync-gold,#B98B2F)]" />
                                    {feature.name}
                                </dt>{" "}
                                <dd className="inline text-gray-600">
                                    {feature.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            {/* PROCESS SECTION */}
            <section className="bg-white py-16 sm:py-20 border-t border-gray-200">
                <div className="max-w-7xl px-6 mx-auto lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-base font-base uppercase text-[var(--autisync-gold,#B98B2F)]">
                            A nossa abordagem
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
                            Como funciona o nosso processo de SEO
                        </p>
                        <p className="mt-2 text-base text-gray-600">
                            Passos claros e transparentes, para saber sempre o que está a
                            acontecer e o que vem a seguir.
                        </p>
                    </div>

                    <div className="grid gap-8 mt-10 md:grid-cols-2 lg:grid-cols-4">
                        {processSteps.map((step) => (
                            <div
                                key={step.title}
                                className="flex flex-col h-full rounded-2xl border border-gray-200 bg-gray-50/80 p-5 shadow-sm"
                            >
                                <p className="text-xs font-semibold tracking-[0.2em] text-[var(--autisync-gold,#B98B2F)] uppercase">
                                    {step.title}
                                </p>
                                <h3 className="mt-2 text-lg font-semibold text-gray-800">
                                    {step.subtitle}
                                </h3>
                                <p className="mt-3 text-sm text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SIMPLE CASE STUDY / RESULT HIGHLIGHT */}
            <section className="bg-[#1C1C1C] py-16 sm:py-20">
                <div className="max-w-6xl px-6 mx-auto lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div>
                            <p className="text-base font-base text-[var(--autisync-gold,#B98B2F)]">
                                Exemplo de resultado
                            </p>
                            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                                De invisível a visível na pesquisa local.
                            </h2>
                            <p className="mt-4 text-sm text-gray-300">
                                Uma empresa local de serviços passou de quase não aparecer no Google
                                para surgir de forma consistente na primeira página para pesquisas
                                locais com forte intenção de compra. Resultado: mais chamadas, mais
                                marcações e uma marca mais forte, tudo graças à pesquisa orgânica.
                            </p>
                            <ul className="mt-5 space-y-2 text-sm text-gray-300">
                                <li>• Correções técnicas e otimização on-page</li>
                                <li>• Foco em SEO local com otimização do Perfil da Empresa no Google</li>
                                <li>• Conteúdos ajustados às perguntas e intenções reais dos clientes</li>
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-gray-700 bg-[#1C1C1C]/60 p-6 shadow-lg">
                            <h3 className="text-lg font-semibold text-white">
                                O que pode esperar ao trabalhar connosco
                            </h3>
                            <ul className="mt-4 space-y-2 text-sm text-gray-200">
                                <li>• Plano e prioridades claros todos os meses</li>
                                <li>• Relatórios práticos em vez de folhas de cálculo confusas</li>
                                <li>• Um parceiro que domina tecnologia e marketing</li>
                                <li>• Estratégias alinhadas com os objetivos do seu negócio, não com métricas de vaidade</li>
                            </ul>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link
                                    href="https://wa.me/+447883317646?text=Ol%C3%A1%20Autisync%2C%20gostaria%20de%20falar%20sobre%20SEO%20e%20marketing%20digital%20para%20a%20minha%20empresa."
                                    target="_blank"
                                    className="inline-flex items-center rounded-md bg-white px-4 py-2 text-xs font-semibold text-gray-900 shadow-sm hover:bg-gray-200"
                                >
                                    Falar sobre o seu SEO
                                </Link>
                                <Link
                                    href="/pt/questionario"
                                    className="inline-flex items-center rounded-md border border-gray-500 px-4 py-2 text-xs font-semibold text-gray-100 hover:border-[var(--autisync-gold,#B98B2F)] hover:text-[var(--autisync-gold,#B98B2F)]"
                                >
                                    Preencher o questionário de serviços
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="bg-gray-100 py-16 sm:py-20 border-t border-gray-200">
                <div className="max-w-3xl px-6 mx-auto lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base font-base text-[var(--autisync-gold,#B98B2F)]">
                            Perguntas
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
                            Perguntas frequentes sobre SEO
                        </p>
                        <p className="mt-2 text-base text-gray-600">
                            Se não encontrar aqui a sua dúvida, fale connosco diretamente.
                            Teremos todo o gosto em esclarecer.
                        </p>
                    </div>

                    <div className="mt-10 space-y-4">
                        {faqItems.map((item) => (
                            <details
                                key={item.question}
                                className="group rounded-lg border border-gray-200 bg-white px-5 py-4"
                            >
                                <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-gray-800 list-none">
                                    <span>{item.question}</span>
                                    <span className="ml-4 text-xs text-gray-500 group-open:hidden">
                    +
                  </span>
                                    <span className="ml-4 text-xs text-gray-500 hidden group-open:inline">
                    –
                  </span>
                                </summary>
                                <p className="mt-2 text-sm text-gray-600">{item.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <div className="relative overflow-hidden bg-[#1C1C1C] isolate">
                <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
              <span className="text-[var(--autisync-gold,#B98B2F)]">
                Alargue o seu alcance
              </span>
                            <br />
                            Comece hoje a atrair o público certo.
                        </h2>

                        <p className="mt-4 text-sm text-gray-300">
                            Partilhe os seus objetivos: analisamos a sua visibilidade atual e
                            sugerimos um plano para aumentar o tráfego orgânico, sem pressão
                            nem vendas forçadas.
                        </p>

                        <div className="flex items-center justify-center mt-10 gap-x-6">
                            <Link
                                href="https://wa.me/+447883317646?text=Ol%C3%A1%20Autisync%2C%20gostaria%20de%20falar%20sobre%20SEO%20e%20marketing%20digital%20para%20a%20minha%20empresa."
                                target="_blank"
                                className="rounded-md group bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm hover:bg-gray-200 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Fale connosco <span className="group-hover:text-[var(--autisync-gold,#B98B2F)]">(WhatsApp)</span>
                            </Link>
                            <Link
                                href="/pt/contacto"
                                className="text-sm leading-6 font-semibold text-gray-50 hover:text-[var(--autisync-gold,#B98B2F)]"
                            >
                                Marcar uma consulta <span aria-hidden="true">→</span>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>

            {/* CLIENT LOGOS / SOCIAL PROOF */}
            <Clients title="Empresas que confiam em nós" />
        </>
    );
}
