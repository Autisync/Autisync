import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n/routes";
import DesignGraficoClient from "./DesignGraficoClient";

export const metadata: Metadata = {
    title: "Design Gráfico e Identidade Visual em Angola",
    description:
        "Design gráfico em Luanda, Angola: logótipos, identidade visual, papelaria, materiais de impressão e conteúdos para redes sociais que destacam a sua marca.",
    alternates: alternatesFor("/solutions/graphicDesign", "pt"),
    openGraph: {
        title: "Design Gráfico e Identidade Visual — Autisync",
        description:
            "Do logótipo à identidade visual completa. Design que comunica o valor da sua marca à primeira vista.",
        url: "https://www.autisync.com/pt/servicos/design-grafico",
        locale: "pt_AO",
    },
};

export default function DesignGraficoPage() {
    return (
        <div lang="pt">
            <DesignGraficoClient />
        </div>
    );
}
