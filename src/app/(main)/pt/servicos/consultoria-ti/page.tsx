import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n/routes";
import ConsultoriaTiClient from "./ConsultoriaTiClient";

export const metadata: Metadata = {
    title: "Consultoria de TI e Suporte Técnico em Angola",
    description:
        "Consultoria de TI e suporte técnico em Luanda, Angola: configuração de sistemas, segurança de redes, helpdesk e manutenção contínua para a sua empresa.",
    alternates: alternatesFor("/solutions/itConsultation", "pt"),
    openGraph: {
        title: "Consultoria de TI e Suporte Técnico — Autisync",
        description:
            "Mantenha a sua empresa a funcionar sem falhas com os serviços de TI e gestão de infraestruturas da Autisync.",
        url: "https://www.autisync.com/pt/servicos/consultoria-ti",
        locale: "pt_AO",
    },
};

export default function ConsultoriaTiPage() {
    return (
        <div lang="pt">
            <ConsultoriaTiClient />
        </div>
    );
}
