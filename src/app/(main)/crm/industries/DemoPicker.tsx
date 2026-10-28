"use client";

/**
 * The live demo on /crm and /pt/crm, with a choice of business: each tab
 * plays that industry's demo (LiveDemo.tsx) and links to its own page.
 */
import { useState } from "react";
import Link from "next/link";
import LiveDemo from "./LiveDemo";
import { DEMO_SCRIPTS } from "./demoScripts";
import type { IndustryLocale } from "./types";
import d from "./demo.module.css";

const TABS = {
    en: [
        { id: "trades", label: "Trades", href: "/crm/trades" },
        { id: "consultants", label: "Consultants", href: "/crm/consultants" },
        { id: "agencies", label: "Agencies", href: "/crm/agencies" },
        { id: "salons", label: "Salons", href: "/crm/salons" },
        { id: "legal", label: "Accountants", href: "/crm/legal-finance" },
    ],
    pt: [
        { id: "trades", label: "Serviços técnicos", href: "/crm/servicos-tecnicos" },
        { id: "consultants", label: "Consultores", href: "/crm/consultores" },
        { id: "agencies", label: "Agências", href: "/crm/agencias" },
        { id: "salons", label: "Salões", href: "/crm/saloes" },
        { id: "legal", label: "Contabilistas", href: "/crm/juridico-financas" },
    ],
};
const MORE = {
    en: { pick: "See it for", page: "Full page for", deliveries: "Deliveries", deliveriesHref: "/crm/deliveries", estate: "Estate agents", estateHref: "/crm/estate-agents" },
    pt: { pick: "Ver para", page: "Página completa de", deliveries: "Entregas", deliveriesHref: "/crm/entregas", estate: "Imobiliárias", estateHref: "/crm/imobiliarias" },
};

export default function DemoPicker({ locale }: { locale: IndustryLocale }) {
    const tabs = TABS[locale];
    const m = MORE[locale];
    const [on, setOn] = useState(tabs[0].id);
    const tab = tabs.find((t) => t.id === on)!;
    const script = DEMO_SCRIPTS[on]?.[locale];
    return (
        <div>
            <div className={d.picker} role="tablist" aria-label={m.pick}>
                <span>{m.pick}</span>
                {tabs.map((t) => (
                    <button key={t.id} type="button" role="tab" aria-selected={t.id === on} className={t.id === on ? d.pickOn : ""} onClick={() => setOn(t.id)}>
                        {t.label}
                    </button>
                ))}
                <Link href={m.deliveriesHref}>{m.deliveries}</Link>
                <Link href={m.estateHref}>{m.estate}</Link>
            </div>
            {script && <LiveDemo key={on} script={script} locale={locale} />}
            <p className={d.pickMore}><Link href={tab.href}>{m.page} {tab.label.toLowerCase()}</Link></p>
        </div>
    );
}
