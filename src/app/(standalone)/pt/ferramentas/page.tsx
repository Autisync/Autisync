import type { Metadata } from "next";
import Link from "next/link";
import { PtFunnelShell, PtBookSection } from "./_components/PtFunnelShell";
import s from "@/app/crm/crm.module.css";
import f from "@/app/components/funnel.module.css";

const EN_URL = "https://www.autisync.com/tools";
const URL = "https://www.autisync.com/pt/ferramentas";
const TITLE = "Ferramentas grátis para pequenas empresas | Autisync";
const DESCRIPTION = "Calculadoras grátis para negócios locais: quanto lhe custam as chamadas perdidas e quanto custa um website.";

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: URL, languages: { en: EN_URL, pt: URL, "x-default": EN_URL } },
    openGraph: { type: "website", url: URL, siteName: "Autisync", title: TITLE, description: DESCRIPTION, locale: "pt_AO" },
};

// Cada ferramenta responde a algo que as pessoas pesquisam e aponta para o produto Autisync que o resolve.
const TOOLS = [
    { href: "/pt/ferramentas/custo-chamadas-perdidas", t: "Calculadora do custo das chamadas perdidas", d: "Veja quanto lhe custam por mês e por ano as chamadas que ficam por atender." },
    { href: "/pt/ferramentas/custo-website", t: "Simulador do custo de um website", d: "Escolha as páginas e funcionalidades e veja o preço, incluindo o do segundo ano." },
    { href: "/pt/websites/demonstracao", t: "Demonstração de website com visita virtual", d: "Percorra uma entrada da rua até ao interior de uma loja." },
];

export default function FerramentasIndex() {
    return (
        <PtFunnelShell>
            <header className={s.section}>
                <div className={s.wrap}>
                    <span className={s.pill}><i />Grátis</span>
                    <h1 className={s.heroTitle} style={{ marginTop: 14 }}>Ferramentas grátis para <span>negócios locais.</span></h1>
                    <div className={f.cards} style={{ marginTop: 32 }}>
                        {TOOLS.map((x) => (
                            <Link key={x.href} href={x.href} className={f.cardItem} style={{ textDecoration: "none" }}>
                                <h3>{x.t} →</h3>
                                <p>{x.d}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </header>
            <PtBookSection eyebrow="Fale connosco" title="Precisa de ajuda com alguma destas coisas?" text="Marque uma chamada curta com a equipa da Autisync." points={["Websites", "CRM e marcações", "WhatsApp com resposta imediata"]} />
        </PtFunnelShell>
    );
}
