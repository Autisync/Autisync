import type { Metadata } from "next";
import EstateAgents from "../estate-agents/EstateAgents";
import { ESTATE_COPY } from "../estate-agents/estateCopy";
import { agencyPlans } from "@/lib/estate-agency-plans";


const URL = "https://www.autisync.com/crm/imobiliarias";
const EN_URL = "https://www.autisync.com/crm/estate-agents";
const TITLE = "CRM para Imobiliárias com IA e Marcação de Visitas | Autisync";
const DESCRIPTION =
    "Desde 79 € por mês por agência: venda, arrendamento e gestão, visitas que se marcam sozinhas, ligação à CASAFARI e assistente de IA fora de horas.";

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    keywords: ["CRM imobiliário", "software para imobiliárias", "CRM para imobiliárias Portugal", "software de gestão de arrendamento", "CRM com CASAFARI", "marcação de visitas", "IA para imobiliárias", "alternativa eGO", "alternativa Casafari"],
    alternates: { canonical: URL, languages: { en: EN_URL, pt: URL, "x-default": EN_URL } },
    openGraph: {
        type: "website", url: URL, siteName: "Autisync", title: TITLE, description: DESCRIPTION, locale: "pt_PT",
        images: [{ url: "/crm/estate/og-estate.png", width: 1200, height: 630, alt: "Autisync CRM para imobiliárias" }],
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/crm/estate/og-estate.png"] },
};

function structuredData() {
    const offers = agencyPlans.map((p) => ({
        "@type": "Offer",
        name: `Autisync para Imobiliárias — ${p.namePt}`,
        price: p.price.EUR,
        priceCurrency: "EUR",
        priceSpecification: { "@type": "UnitPriceSpecification", price: p.price.EUR, priceCurrency: "EUR", unitText: p.perBranch ? "mês por loja" : "mês", valueAddedTaxIncluded: false },
        url: `${URL}#prices`,
    }));
    return [
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Autisync CRM para Imobiliárias",
            applicationCategory: "BusinessApplication",
            applicationSubCategory: "Real estate CRM",
            operatingSystem: "Web, iOS, Android (browser)",
            url: URL,
            description: DESCRIPTION,
            inLanguage: ["en", "pt", "es", "fr", "de"],
            areaServed: ["PT"],
            publisher: { "@type": "Organization", name: "Autisync", url: "https://www.autisync.com" },
            offers: { "@type": "AggregateOffer", lowPrice: 55, highPrice: 345, priceCurrency: "EUR", offerCount: offers.length, offers },
            featureList: [
                "Imóveis com fotos, vídeo, mapa e documentos",
                "Marcação de visitas com lembretes e seguimento de faltas",
                "Assistente de IA que responde fora de horas",
                "Emails a compradores e inquilinos compatíveis",
                "Envio de imóveis para o site e API",
                "Faturação de rendas e alertas de conformidade",
                "Licença AMI e classe energética em cada anúncio",
                "Importação do eGO, Casafari, idealista e outros",
            ],
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: ESTATE_COPY.pt.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Autisync", item: "https://www.autisync.com" },
                { "@type": "ListItem", position: 2, name: "CRM", item: "https://www.autisync.com/crm" },
                { "@type": "ListItem", position: 3, name: "Imobiliárias", item: URL },
            ],
        },
    ];
}

export default function Page() {
    return (
        <div lang="pt-PT">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }} />
            <EstateAgents locale="pt" />
        </div>
    );
}
