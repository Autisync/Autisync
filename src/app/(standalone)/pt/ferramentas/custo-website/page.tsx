import type { Metadata } from "next";
import { faqSchema } from "@/app/components/FunnelShell";
import { PtFunnelShell, PtBookSection, PtFaq } from "../_components/PtFunnelShell";
import WebsiteCostEstimator from "@/app/tools/website-cost/WebsiteCostEstimator";
import { carePlanMonthly, formatPrice, websiteTiers } from "@/lib/website-packages";
import s from "@/app/crm/crm.module.css";
import f from "@/app/components/funnel.module.css";

const EN_URL = "https://www.autisync.com/tools/website-cost";
const URL = "https://www.autisync.com/pt/ferramentas/custo-website";
const TITLE = "Quanto custa um website? Simulador grátis para pequenas empresas";
const DESCRIPTION =
    "Escolha as páginas e funcionalidades e veja quanto custa o website da sua empresa com a Autisync, incluindo domínio, alojamento e o que paga a partir do segundo ano.";

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: URL, languages: { en: EN_URL, pt: URL, "x-default": EN_URL } },
    openGraph: { type: "website", url: URL, siteName: "Autisync", title: TITLE, description: DESCRIPTION, locale: "pt_AO" },
};

// The page is rendered once for everyone, so the answers quote Angola and Portugal; the estimator above shows the visitor's own market.
const lowKz = formatPrice(websiteTiers[0].price.AOA, "AOA");
const lowEur = formatPrice(websiteTiers[0].price.EUR, "EUR");
const careKz = formatPrice(carePlanMonthly.AOA, "AOA");
const careEur = formatPrice(carePlanMonthly.EUR, "EUR");

const FAQ = [
    { q: "Quanto custa um website para uma pequena empresa com a Autisync?", a: `Os nossos websites começam em ${lowKz} em Angola ou ${lowEur} em Portugal no primeiro ano, com domínio, alojamento e SSL incluídos. A partir do segundo ano paga ${careKz} (ou ${careEur}) por mês pelo alojamento, e-mail, cópias de segurança e pequenas alterações.` },
    { q: "O que faz um website custar mais?", a: "Sobretudo o número de páginas, os textos e as fotografias, as marcações ou pagamentos online, uma loja online e as ligações a outros sistemas, como um CRM. Os custos contínuos são o alojamento, o domínio, o e-mail e as atualizações." },
    { q: "Há custos escondidos?", a: "Pergunte a qualquer web designer o que acontece depois do primeiro ano. O domínio, o alojamento e o e-mail renovam-se todos os anos. Na Autisync, isso é o plano de manutenção mensal, apresentado logo à partida." },
    { q: "Quanto tempo demora?", a: "Desde cerca de três semanas para um website pequeno até perto de dois meses para um grande, com integrações. O simulador mostra o prazo de cada pacote." },
];

const schema = {
    "@context": "https://schema.org",
    "@graph": [
        { "@type": "WebApplication", name: "Simulador do custo de um website", url: URL, inLanguage: "pt", applicationCategory: "BusinessApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: 0, priceCurrency: "AOA" }, provider: { "@type": "Organization", name: "Autisync", url: "https://www.autisync.com" } },
        { ...faqSchema(FAQ), inLanguage: "pt" },
    ],
};

export default function CustoWebsitePage() {
    return (
        <PtFunnelShell schema={schema} navCta="Pedir orçamento">
            <header className={s.section} style={{ paddingBottom: 0 }}>
                <div className={s.wrap}>
                    <span className={s.pill}><i />Ferramenta grátis</span>
                    <h1 className={s.heroTitle} style={{ marginTop: 14, maxWidth: 880 }}>Quanto custa um website <span>para a sua empresa?</span></h1>
                    <p className={s.lead} style={{ maxWidth: 680, marginTop: 14 }}>
                        Escolha o que a sua empresa precisa e veja o preço de imediato, incluindo o que vai pagar depois do primeiro ano.
                    </p>
                    <WebsiteCostEstimator lang="pt" />
                </div>
            </header>

            <section className={s.section}>
                <div className={`${s.wrap} ${f.prose}`}>
                    <h2>O que está a pagar</h2>
                    <p><strong>A construção.</strong> Design, páginas, textos, fotografias e um website que funcione bem no telemóvel. Mais páginas e funcionalidades à medida levam mais tempo.</p>
                    <p><strong>Funcionalidades que trazem trabalho.</strong> Marcações online, formulários de contacto que entram num CRM, botões de WhatsApp e de chamada, avaliações e um mapa.</p>
                    <p><strong>Custos de funcionamento.</strong> Domínio, alojamento, SSL, e-mail profissional, cópias de segurança e atualizações. Renovam-se todos os anos com qualquer fornecedor, por isso pergunte sempre quanto custa o segundo ano.</p>
                    <p><strong>Ser encontrado.</strong> SEO local básico, para aparecer quando procuram &ldquo;[o que faz] em [a sua cidade]&rdquo;.</p>
                </div>
            </section>

            <PtBookSection
                eyebrow="Peça um orçamento fixo"
                title="Fale-nos da sua empresa."
                text="Marque uma chamada curta. Recomendamos o pacote certo e enviamos um preço fixo antes de começarmos qualquer trabalho."
                points={["Preço fixo, sem surpresas", "Domínio e alojamento incluídos no primeiro ano", "Marcações e pedidos de contacto no CRM da Autisync"]}
            />
            <PtFaq items={FAQ} />
        </PtFunnelShell>
    );
}
