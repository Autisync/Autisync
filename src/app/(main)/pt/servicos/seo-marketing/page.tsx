import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n/routes";
import SeoMarketingClient from "./SeoMarketingClient";

export const metadata: Metadata = {
    title: "SEO e Marketing Digital em Angola",
    description:
        "SEO e marketing digital em Luanda, Angola: gestão de redes sociais, e-mail marketing, conteúdos e análise de dados para pôr a sua empresa no topo do Google.",
    alternates: alternatesFor("/solutions/seo", "pt"),
    openGraph: {
        title: "SEO e Marketing Digital — Autisync",
        description:
            "Mais tráfego, mais autoridade e mais clientes com as soluções de marketing digital da Autisync, orientadas por dados.",
        url: "https://www.autisync.com/pt/servicos/seo-marketing",
        locale: "pt_AO",
    },
};

export default function SeoMarketingPage() {
    return (
        <div lang="pt">
            <SeoMarketingClient />
        </div>
    );
}
