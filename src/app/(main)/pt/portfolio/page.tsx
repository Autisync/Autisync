import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";
import { alternatesFor } from "@/lib/i18n/routes";

export const metadata: Metadata = {
    title: "Portfólio",
    description:
        "O portfólio da Autisync: websites, aplicações web, identidade visual, consultoria de TI e marketing digital para empresas em Angola e não só.",
    alternates: alternatesFor("/portfolio", "pt"),
    openGraph: {
        title: "Portfólio Autisync — Trabalho de Que Nos Orgulhamos",
        description:
            "Websites institucionais, lojas online, identidades visuais e muito mais. Criados com rigor pela equipa da Autisync.",
        url: "https://www.autisync.com/pt/portfolio",
        locale: "pt_AO",
    },
};

export default function PortfolioPagePt() {
    return (
        <div lang="pt">
            <PortfolioClient />
        </div>
    );
}
