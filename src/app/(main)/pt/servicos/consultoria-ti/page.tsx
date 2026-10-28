import BreadcrumbSchema from "@/app/components/BreadcrumbSchema";
import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n/routes";
import ConsultoriaTiClient from "./ConsultoriaTiClient";

export const metadata: Metadata = {
    title: "Consultoria de TI e Sistemas em Angola",
    description:
        "Consultoria de TI em Luanda, Angola: configuração de sistemas, segurança de redes, planeamento de infraestrutura e manutenção contínua para a sua empresa.",
    alternates: alternatesFor("/solutions/itConsultation", "pt"),
    openGraph: {
        title: "Consultoria de TI e Sistemas — Autisync",
        description:
            "Mantenha a sua empresa a funcionar sem falhas com os serviços de TI e gestão de infraestruturas da Autisync.",
        url: "https://www.autisync.com/pt/servicos/consultoria-ti",
        locale: "pt_AO",
    },
};

export default function ConsultoriaTiPage() {
    return (
        <>
            <BreadcrumbSchema items={[{ name: "Início", path: "/pt" }, { name: "Serviços", path: "/pt/precos" }, { name: "Consultoria de TI", path: "/pt/servicos/consultoria-ti" }]} />

        <div lang="pt">
            <ConsultoriaTiClient />
        </div>
        </>
    );
}
