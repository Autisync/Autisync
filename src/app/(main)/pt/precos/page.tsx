import type { Metadata } from "next";
import { PtPricing } from "../PtPackages";
import { ptFaq, ptFaqSchema } from "@/lib/i18n/pt";

const URL = "https://www.autisync.com/pt/precos";

export const metadata: Metadata = {
    title: "Preços: Websites, Branding e Redes Sociais em Angola",
    description:
        "Preços claros da Autisync: websites a partir de Kz 495.000, branding a partir de Kz 180.000 e gestão de redes sociais a partir de Kz 150.000/mês. Pagamento 50% no início, 50% no lançamento.",
    alternates: {
        canonical: URL,
        languages: {
            "pt": URL,
            "en": "https://www.autisync.com/servicepackage",
            "x-default": "https://www.autisync.com/servicepackage",
        },
    },
    openGraph: {
        title: "Autisync — Preços de Websites, Branding e Redes Sociais",
        description: "Websites a partir de Kz 495.000. Pacote Lançamento Marca & Website por Kz 1.250.000.",
        url: URL,
        locale: "pt_AO",
    },
};

export default function PrecosPage() {
    return (
        <div lang="pt" className="bg-[#F9F9F9]">
            <div className="px-6 py-16 mx-auto mt-12 max-w-7xl">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-base text-[#B28228]">Websites, Branding e Redes Sociais</p>
                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#3B3B3B] sm:text-5xl">
                        Preços claros,<br />sem surpresas
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Escolha um pacote ou fale connosco no WhatsApp e adaptamos a proposta à sua empresa.
                    </p>
                </div>

                <div className="mt-6">
                    <PtPricing />
                </div>

                <section aria-labelledby="pt-faq" className="max-w-4xl mx-auto mt-20">
                    <h2 id="pt-faq" className="text-3xl font-bold tracking-tight text-center text-[#3B3B3B]">
                        Perguntas frequentes sobre preços
                    </h2>
                    <dl className="mt-8 bg-white divide-y divide-gray-200 shadow-md rounded-2xl ring-1 ring-gray-200">
                        {ptFaq.map(({ q, a }) => (
                            <div key={q} className="px-6 py-5">
                                <dt className="font-semibold text-[#3B3B3B]">{q}</dt>
                                <dd className="mt-2 text-sm leading-6 text-gray-600">{a}</dd>
                            </div>
                        ))}
                    </dl>
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ptFaqSchema) }} />
                </section>

                <div className="mt-12 text-center">
                    <a
                        href={`https://wa.me/447883317646?text=${encodeURIComponent("Olá Autisync, gostaria de ajuda para escolher o pacote certo.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-[#B28228] rounded-md shadow-lg hover:bg-gray-900 transition"
                    >
                        Tem dúvidas? Fale connosco no WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
}
