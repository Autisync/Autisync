import type { Metadata } from "next";
import Clients from "@/app/(main)/solutions/clients";
import { PtHomeOffer } from "./PtPackages";
import { siteStats } from "@/lib/site-stats";

const URL = "https://www.autisync.com/pt";

export const metadata: Metadata = {
    title: { absolute: "Autisync — Agência de Websites, Branding e Marketing Digital em Angola" },
    description:
        "Criamos websites, identidade de marca, gestão de redes sociais e automação com IA para empresas em Angola, Namíbia e Portugal. Websites a partir de Kz 495.000. Clientes: Florentek, Grupo Girassol, Blue Horizon.",
    alternates: {
        canonical: URL,
        languages: {
            "pt": URL,
            "en": "https://www.autisync.com",
            "x-default": "https://www.autisync.com",
        },
    },
    openGraph: {
        title: "Autisync — Websites, Branding e Marketing Digital em Angola",
        description: "Websites, marca e redes sociais para empresas que querem crescer. Preços claros, pagamento 50/50.",
        url: URL,
        locale: "pt_AO",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Autisync" }],
    },
};

const services = [
    {
        title: "Criação de Websites",
        text: "Websites institucionais rápidos, bilingues e otimizados para o Google, com domínio, alojamento e e-mail incluídos.",
        href: "/solutions/devServices",
    },
    {
        title: "Branding e Identidade Visual",
        text: "Logótipo, manual de normas, papelaria, fardas, EPI e grafismo de viaturas para a sua empresa.",
        href: "/solutions/graphicDesign",
    },
    {
        title: "Gestão de Redes Sociais",
        text: "Publicações, reels e anúncios no Instagram, Facebook e LinkedIn que geram contactos, não só gostos.",
        href: "/solutions/seo",
    },
    {
        title: "SEO e Marketing Digital",
        text: "Apareça no Google e nas respostas de IA quando os seus clientes procuram o que faz.",
        href: "/solutions/seo",
    },
    {
        title: "Automação com IA e CRM",
        text: "Formulários, WhatsApp e e-mail ligados a um só CRM, para que nenhum contacto fique sem resposta.",
        href: "/crm",
    },
    {
        title: "Consultoria e Suporte de TI",
        text: "Configuração de equipamentos, redes, videovigilância e suporte técnico para o seu escritório.",
        href: "/solutions/itConsultation",
    },
];

const stats = [
    { value: `${siteStats.projects}+`, label: "projetos entregues" },
    { value: `${siteStats.clients}+`, label: "clientes" },
    { value: `${siteStats.years}+`, label: "anos de experiência" },
    { value: `${siteStats.countries}`, label: "países: Angola, Namíbia, Reino Unido, Portugal" },
];

const WHATSAPP = `https://wa.me/447883317646?text=${encodeURIComponent("Olá Autisync, gostaria de falar sobre um projeto.")}`;

export default function PtHome() {
    return (
        <div lang="pt">
            {/* Hero */}
            <section className="bg-[#1C1C1C] pt-32 pb-24 text-center text-white">
                <div className="max-w-4xl px-6 mx-auto">
                    <p className="text-sm font-semibold tracking-wide uppercase text-[#d1a94c]">
                        Agência digital · Luanda · Windhoek · Lisboa · Londres
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
                        Websites, marca e marketing digital para empresas que querem crescer
                    </h1>
                    <p className="mt-6 text-lg text-gray-300">
                        A Autisync cria websites, identidades de marca, gestão de redes sociais e automação com IA
                        para empresas em Angola, na Namíbia e em Portugal. Tudo feito por nós, do primeiro clique à
                        reunião marcada.
                    </p>
                    <div className="flex flex-col justify-center gap-3 mt-8 sm:flex-row">
                        <a
                            href={WHATSAPP}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 font-semibold text-white rounded-md shadow-lg bg-[#B28228] hover:bg-[#d1a94c] transition"
                        >
                            Falar no WhatsApp
                        </a>
                        <a
                            href="/pt/precos"
                            className="px-6 py-3 font-semibold text-white border rounded-md border-white/40 hover:bg-white hover:text-[#1C1C1C] transition"
                        >
                            Ver preços
                        </a>
                    </div>
                </div>
            </section>

            <Clients title="Empresas que confiam em nós" />

            {/* Services */}
            <section aria-labelledby="pt-servicos" className="py-20 bg-white">
                <div className="px-6 mx-auto max-w-7xl">
                    <h2 id="pt-servicos" className="text-3xl font-bold text-center text-[#3B3B3B] sm:text-4xl">
                        O que fazemos
                    </h2>
                    <div className="grid gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((s) => (
                            <a
                                key={s.title}
                                href={s.href}
                                className="block p-6 transition bg-white shadow-md rounded-2xl ring-1 ring-gray-200 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <h3 className="text-lg font-semibold text-[#3B3B3B]">{s.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-gray-600">{s.text}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Proof */}
            <section className="py-16 bg-gray-100">
                <dl className="grid max-w-5xl grid-cols-2 gap-8 px-6 mx-auto text-center lg:grid-cols-4">
                    {stats.map((s) => (
                        <div key={s.label}>
                            <dt className="sr-only">{s.label}</dt>
                            <dd className="text-4xl font-extrabold text-[#B28228]">{s.value}</dd>
                            <dd className="mt-1 text-sm text-gray-600">{s.label}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            {/* Offer */}
            <section aria-labelledby="pt-oferta" className="py-20 bg-[#F9F9F9]">
                <div className="px-6 mx-auto max-w-7xl">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 id="pt-oferta" className="text-3xl font-bold text-[#3B3B3B] sm:text-4xl">
                            A nossa oferta principal
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Marca completa e website profissional, criados em conjunto e prontos em cerca de 30 dias.
                            Paga 50% para começar e 50% só quando estiver satisfeito.
                        </p>
                    </div>
                    <div className="mt-8">
                        <PtHomeOffer />
                    </div>
                </div>
            </section>
        </div>
    );
}
