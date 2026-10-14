"use client";

import { useState } from "react";
import { carePlanMonthly, formatPrice, websiteTiers } from "@/lib/website-packages";
import f from "@/app/components/funnel.module.css";
import s from "@/app/crm/crm.module.css";

type Pages = "small" | "medium" | "large";
const PAGES: { id: Pages; label: string }[] = [
    { id: "small", label: "Up to 6 pages" },
    { id: "medium", label: "7 to 10 pages" },
    { id: "large", label: "More than 10" },
];

// Which extras push a site up to which package. Keep in step with lib/website-packages.ts.
const EXTRAS = [
    { id: "booking", label: "Online booking or enquiries into a CRM", tier: 0 },
    { id: "brand", label: "Logo and brand kit", tier: 1 },
    { id: "walkin", label: "Step-inside walk-in video", tier: 1 },
    { id: "shop", label: "Online shop", tier: 2 },
    { id: "pipeline", label: "Full CRM with sales pipeline", tier: 2 },
    { id: "chat", label: "AI chatbot and live chat", tier: 2 },
] as const;

const delivery = (features: string[]) => features.find((x) => x.startsWith("Delivery in"))?.replace("Delivery in ", "") ?? "";

export default function WebsiteCostEstimator() {
    const [pages, setPages] = useState<Pages>("small");
    const [extras, setExtras] = useState<string[]>(["booking"]);
    const toggle = (id: string) => setExtras((xs) => (xs.includes(id) ? xs.filter((x) => x !== id) : [...xs, id]));

    const level = Math.max(
        pages === "small" ? 0 : pages === "medium" ? 1 : 2,
        ...EXTRAS.filter((e) => extras.includes(e.id)).map((e) => e.tier),
    );
    const tier = websiteTiers[Math.min(level, websiteTiers.length - 1)];
    const year1 = tier.price.GBP;
    const care = carePlanMonthly.GBP;

    return (
        <div className={f.tool}>
            <div className={f.panel}>
                <div className={f.fieldRow}>
                    <label id="pages-l">How many pages?</label>
                    <small>Home, about, services, contact… each counts as one.</small>
                    <div className={f.choices} role="group" aria-labelledby="pages-l">
                        {PAGES.map((p) => (
                            <button type="button" key={p.id} className={f.choice} aria-pressed={pages === p.id} onClick={() => setPages(p.id)}>{p.label}</button>
                        ))}
                    </div>
                </div>
                <div className={f.fieldRow}>
                    <label id="extras-l">What should it do?</label>
                    <div className={f.choices} role="group" aria-labelledby="extras-l">
                        {EXTRAS.map((e) => (
                            <button type="button" key={e.id} className={f.choice} aria-pressed={extras.includes(e.id)} onClick={() => toggle(e.id)}>{e.label}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`${f.panel} ${f.result}`} aria-live="polite">
                <div className={f.resultLabel}>With Autisync, the {tier.name} package</div>
                <div className={f.resultBig}>{formatPrice(year1, "GBP")}</div>
                <div className={f.resultRows}>
                    <div><span>First year</span><b>{formatPrice(year1, "GBP")}</b></div>
                    <div><span>Includes</span><b>Domain, hosting, SSL</b></div>
                    <div><span>From year 2</span><b>{formatPrice(care, "GBP")}/month</b></div>
                    <div><span>Ready in</span><b>{delivery(tier.features)}</b></div>
                </div>
                <a className={`${s.btn} ${s.btnGold}`} href="#book" style={{ width: "100%", justifyContent: "center" }}>Get a fixed quote</a>
                <p className={f.note}>A starting price. Your quote is fixed before any work starts.</p>
            </div>
        </div>
    );
}
