"use client";

import { useState } from "react";
import { carePlanMonthly, formatPrice, websiteTiers, type Currency } from "@/lib/website-packages";
import { useMarket } from "@/app/components/PackagePricing";
import { ptWebsite } from "@/lib/i18n/pt";
import { useLang, type Lang } from "@/lib/i18n/lang";
import f from "@/app/components/funnel.module.css";
import s from "@/app/(main)/crm/crm.module.css";

type Pages = "small" | "medium" | "large";
const PAGES: { id: Pages; label: string; pt: string }[] = [
    { id: "small", label: "Up to 6 pages", pt: "Até 6 páginas" },
    { id: "medium", label: "7 to 10 pages", pt: "7 a 10 páginas" },
    { id: "large", label: "More than 10", pt: "Mais de 10" },
];

// Which extras push a site up to which package. Keep in step with lib/website-packages.ts.
const EXTRAS = [
    { id: "booking", label: "Online booking or enquiries into a CRM", pt: "Marcações online ou pedidos direto para um CRM", tier: 0 },
    { id: "brand", label: "Logo and brand kit", pt: "Logótipo e kit de marca", tier: 1 },
    { id: "walkin", label: "Step-inside walk-in video", pt: "Vídeo de visita virtual à loja", tier: 1 },
    { id: "shop", label: "Online shop", pt: "Loja online", tier: 2 },
    { id: "pipeline", label: "Full CRM with sales pipeline", pt: "CRM completo com funil de vendas", tier: 2 },
    { id: "chat", label: "AI chatbot and live chat", pt: "Chatbot com IA e chat ao vivo", tier: 2 },
] as const;

const delivery = (features: string[]) => features.find((x) => x.startsWith("Delivery in"))?.replace("Delivery in ", "") ?? "";
const entrega = (features: string[]) => features.find((x) => x.startsWith("Entrega em"))?.replace("Entrega em ", "") ?? "";

const COPY = {
    en: {
        pagesQ: "How many pages?",
        pagesHint: "Home, about, services, contact… each counts as one.",
        extrasQ: "What should it do?",
        result: (name: string) => `With Autisync, the ${name} package`,
        firstYear: "First year",
        includes: "Includes",
        includesWhat: "Domain, hosting, SSL",
        fromYear2: "From year 2",
        perMonth: "/month",
        readyIn: "Ready in",
        cta: "Get a fixed quote",
        note: "A starting price. Your quote is fixed before any work starts.",
    },
    pt: {
        pagesQ: "Quantas páginas?",
        pagesHint: "Início, sobre nós, serviços, contacto… cada uma conta como uma.",
        extrasQ: "O que deve fazer?",
        result: (name: string) => `Com a Autisync, o pacote ${name}`,
        firstYear: "Primeiro ano",
        includes: "Inclui",
        includesWhat: "Domínio, alojamento, SSL",
        fromYear2: "A partir do 2.º ano",
        perMonth: "/mês",
        readyIn: "Pronto em",
        cta: "Pedir um orçamento fixo",
        note: "Preço de partida. O seu orçamento fica fechado antes de começarmos qualquer trabalho.",
    },
} satisfies Record<Lang, unknown>;

export default function WebsiteCostEstimator({ lang: langProp }: { lang?: Lang } = {}) {
    const urlLang = useLang();
    const lang = langProp ?? urlLang;
    const t = COPY[lang];
    const pt = lang === "pt";
    // English page: pounds, as it always was. Portuguese page: the visitor's market (lib/market.ts).
    const { market } = useMarket();
    const currency: Currency = pt ? market.currency : "GBP";

    const [pages, setPages] = useState<Pages>("small");
    const [extras, setExtras] = useState<string[]>(["booking"]);
    const toggle = (id: string) => setExtras((xs) => (xs.includes(id) ? xs.filter((x) => x !== id) : [...xs, id]));

    const level = Math.max(
        pages === "small" ? 0 : pages === "medium" ? 1 : 2,
        ...EXTRAS.filter((e) => extras.includes(e.id)).map((e) => e.tier),
    );
    const tier = websiteTiers[Math.min(level, websiteTiers.length - 1)];
    const ptTier = ptWebsite[tier.id];
    const year1 = tier.price[currency];
    const care = carePlanMonthly[currency];
    const name = pt ? ptTier?.name ?? tier.name : tier.name;
    const ready = pt && ptTier ? entrega(ptTier.features) : delivery(tier.features);

    return (
        <div className={f.tool}>
            <div className={f.panel}>
                <div className={f.fieldRow}>
                    <label id="pages-l">{t.pagesQ}</label>
                    <small>{t.pagesHint}</small>
                    <div className={f.choices} role="group" aria-labelledby="pages-l">
                        {PAGES.map((p) => (
                            <button type="button" key={p.id} className={f.choice} aria-pressed={pages === p.id} onClick={() => setPages(p.id)}>{pt ? p.pt : p.label}</button>
                        ))}
                    </div>
                </div>
                <div className={f.fieldRow}>
                    <label id="extras-l">{t.extrasQ}</label>
                    <div className={f.choices} role="group" aria-labelledby="extras-l">
                        {EXTRAS.map((e) => (
                            <button type="button" key={e.id} className={f.choice} aria-pressed={extras.includes(e.id)} onClick={() => toggle(e.id)}>{pt ? e.pt : e.label}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`${f.panel} ${f.result}`} aria-live="polite">
                <div className={f.resultLabel}>{t.result(name)}</div>
                <div className={f.resultBig}>{formatPrice(year1, currency)}</div>
                <div className={f.resultRows}>
                    <div><span>{t.firstYear}</span><b>{formatPrice(year1, currency)}</b></div>
                    <div><span>{t.includes}</span><b>{t.includesWhat}</b></div>
                    <div><span>{t.fromYear2}</span><b>{formatPrice(care, currency)}{t.perMonth}</b></div>
                    <div><span>{t.readyIn}</span><b>{ready}</b></div>
                </div>
                <a className={`${s.btn} ${s.btnGold}`} href="#book" style={{ width: "100%", justifyContent: "center" }}>{t.cta}</a>
                <p className={f.note}>{t.note}</p>
            </div>
        </div>
    );
}
