import BreadcrumbSchema from "@/app/components/BreadcrumbSchema";
import type { Metadata } from "next";
import CrmLanding from "@/app/(main)/crm/CrmLanding";

// Portuguese twin of /crm. Same component, same look; only the words and
// links change. Lives in the (standalone) group so it gets no site navbar or
// footer, exactly like the English page.

const URL = "https://www.autisync.com/pt/crm";
const EN_URL = "https://www.autisync.com/crm";
const TITLE = "Autisync CRM: todos os seus clientes num só painel";
const DESCRIPTION =
    "Desde 35 € por mês: o CRM Autisync junta contactos, potenciais clientes e funil de vendas num só lugar, com seguimentos automáticos.";

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: URL, languages: { en: EN_URL, pt: URL, "x-default": EN_URL } },
    openGraph: {
        type: "website",
        url: URL,
        siteName: "Autisync",
        title: TITLE,
        description: DESCRIPTION,
        locale: "pt_AO",
        images: [{ url: "/crm/og-crm.png", width: 1200, height: 630, alt: "Autisync CRM: todos os seus clientes num só painel" }],
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        images: ["/crm/og-crm.png"],
    },
};

const productSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Autisync CRM",
    serviceType: "Implementação de CRM (gestão de relacionamento com clientes)",
    provider: { "@id": "https://www.autisync.com/#organization" },
    areaServed: ["AO", "PT", "NA", "GB"],
    url: URL,
    description: DESCRIPTION,
    inLanguage: "pt",
};

export default function CrmPtPage() {
    return (
        <>
            <BreadcrumbSchema items={[{ name: "Início", path: "/pt" }, { name: "CRM", path: "/pt/crm" }]} />
            <CrmLanding lang="pt" schema={productSchema} />
        </>
    );
}
