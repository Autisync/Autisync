import BreadcrumbSchema from "@/app/components/BreadcrumbSchema";
import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n/routes";
import DesenvolvimentoClient from "./DesenvolvimentoClient";

export const metadata: Metadata = {
    title: "Desenvolvimento de Websites e Aplicações em Angola",
    description:
        "Criação de websites, aplicações web e aplicações móveis à medida em Luanda, Angola. Desenvolvimento web com Next.js e React, do design ao lançamento e suporte.",
    alternates: alternatesFor("/solutions/devServices", "pt"),
    openGraph: {
        title: "Desenvolvimento de Websites e Aplicações — Autisync",
        description:
            "Websites e aplicações web à medida, criados para desempenho, escalabilidade e conversão.",
        url: "https://www.autisync.com/pt/servicos/desenvolvimento",
        locale: "pt_AO",
    },
};

export default function DesenvolvimentoPage() {
    return (
        <>
            <BreadcrumbSchema items={[{ name: "Início", path: "/pt" }, { name: "Serviços", path: "/pt/precos" }, { name: "Desenvolvimento Web e Apps", path: "/pt/servicos/desenvolvimento" }]} />

        <div lang="pt">
            <DesenvolvimentoClient />
        </div>
        </>
    );
}
