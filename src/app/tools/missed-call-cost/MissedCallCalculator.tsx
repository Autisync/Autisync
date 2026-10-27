"use client";

import { useState } from "react";
import f from "@/app/components/funnel.module.css";
import s from "@/app/(main)/crm/crm.module.css";
import { useMarket } from "@/app/components/PackagePricing";
import { currencies, formatPrice, type Currency } from "@/lib/website-packages";
import { useLang, type Lang } from "@/lib/i18n/lang";

// English page: pounds, as it always was. Portuguese page: the visitor's market
// currency (see lib/market.ts), written the way that market reads it.
const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

/** Starting job value and slider range per currency (roughly the £ figures at the Oct 2026 rates). */
const JOB_VALUE: Record<Currency, { def: number; min: number; max: number; step: number }> = {
    GBP: { def: 300, min: 20, max: 5000, step: 10 },
    EUR: { def: 350, min: 20, max: 6000, step: 10 },
    AOA: { def: 250_000, min: 10_000, max: 5_000_000, step: 5_000 },
    NAD: { def: 5_000, min: 300, max: 100_000, step: 100 },
};

const COPY = {
    en: {
        missed: "Missed calls a week",
        missedHint: "Check your phone's call log for a typical week.",
        newer: "How many are new enquiries",
        newerHint: "The rest are existing customers, suppliers or spam.",
        win: "Enquiries you usually win when you answer",
        value: (sym: string) => `Average job or booking value (${sym})`,
        recover: "Missed callers a text-back would win back",
        recoverHint: "An instant 'Sorry we missed you' text keeps some callers from ringing the next business.",
        resultLabel: "Estimated work lost to missed calls",
        perMonth: " /month",
        jobsLost: "Jobs lost a month",
        lostYear: "Lost a year",
        wonBack: "Won back with a text-back",
        cta: "Stop losing missed calls",
        note: "An estimate from your own numbers, not a guarantee. Change any figure to see the effect.",
    },
    pt: {
        missed: "Chamadas perdidas por semana",
        missedHint: "Veja o registo de chamadas do telemóvel numa semana normal.",
        newer: "Quantas são pedidos novos",
        newerHint: "As restantes são clientes atuais, fornecedores ou spam.",
        win: "Pedidos que costuma fechar quando atende",
        value: (sym: string) => `Valor médio de um trabalho ou marcação (${sym})`,
        recover: "Clientes que uma resposta imediata recuperaria",
        recoverHint: "Dar outra forma rápida de chegar até si (WhatsApp, marcação online) evita que alguns procurem logo a concorrência.",
        resultLabel: "Trabalho que estima perder com chamadas não atendidas",
        perMonth: " /mês",
        jobsLost: "Trabalhos perdidos por mês",
        lostYear: "Perdido por ano",
        wonBack: "Recuperado com resposta imediata",
        cta: "Deixar de perder chamadas",
        note: "Uma estimativa feita com os seus números, não uma garantia. Altere qualquer valor para ver o efeito.",
    },
} satisfies Record<Lang, unknown>;

function Field({ id, label, hint, value, set, min, max, step = 1, suffix }: {
    id: string; label: string; hint?: string; value: number; set: (n: number) => void; min: number; max: number; step?: number; suffix?: string;
}) {
    return (
        <div className={f.fieldRow}>
            <label htmlFor={id}>{label}</label>
            <div className={f.inputLine}>
                <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(Number(e.target.value))} aria-label={label} />
                <input id={id} type="number" min={min} max={max * 10} step={step} value={value}
                    onChange={(e) => set(Math.max(0, Number(e.target.value) || 0))} />
                {suffix && <span className={s.muted}>{suffix}</span>}
            </div>
            {hint && <small>{hint}</small>}
        </div>
    );
}

export default function MissedCallCalculator({ lang: langProp }: { lang?: Lang } = {}) {
    const urlLang = useLang();
    const lang = langProp ?? urlLang;
    const t = COPY[lang];
    const { market } = useMarket();
    const currency: Currency = lang === "pt" ? market.currency : "GBP";
    const range = JOB_VALUE[currency];
    const symbol = currencies.find((c) => c.code === currency)?.label ?? "£";
    const money = (n: number) => (lang === "pt" ? formatPrice(n, currency) : gbp(n));

    const [missed, setMissed] = useState(10);       // missed calls a week
    const [newPct, setNewPct] = useState(60);       // % of those that are new enquiries
    const [winPct, setWinPct] = useState(40);       // % of answered enquiries you'd normally win
    // Average job / booking value. Until the visitor types one, it follows the
    // market's default, so a market that resolves after first paint is right.
    const [typedValue, setValue] = useState<number | null>(null);
    const value = typedValue ?? range.def;
    const [recoverPct, setRecoverPct] = useState(30); // % a text-back wins back

    const weeks = 52 / 12;
    const lostJobsMonth = missed * weeks * (newPct / 100) * (winPct / 100);
    const lostMonth = lostJobsMonth * value;
    const lostYear = lostMonth * 12;
    const backMonth = lostMonth * (recoverPct / 100);
    const jobs = lang === "pt" ? lostJobsMonth.toFixed(1).replace(".", ",") : lostJobsMonth.toFixed(1);

    return (
        <div className={f.tool}>
            <div className={f.panel}>
                <Field id="missed" label={t.missed} hint={t.missedHint} value={missed} set={setMissed} min={0} max={60} />
                <Field id="new" label={t.newer} hint={t.newerHint} value={newPct} set={setNewPct} min={0} max={100} suffix="%" />
                <Field id="win" label={t.win} value={winPct} set={setWinPct} min={0} max={100} suffix="%" />
                <Field id="value" label={t.value(symbol)} value={value} set={setValue} min={range.min} max={range.max} step={range.step} />
                <Field id="recover" label={t.recover} hint={t.recoverHint} value={recoverPct} set={setRecoverPct} min={0} max={100} suffix="%" />
            </div>
            <div className={`${f.panel} ${f.result}`} aria-live="polite">
                <div className={f.resultLabel}>{t.resultLabel}</div>
                <div className={f.resultBig}>{money(lostMonth)}<span style={{ fontSize: "0.4em", color: "var(--muted)" }}>{t.perMonth}</span></div>
                <div className={f.resultRows}>
                    <div><span>{t.jobsLost}</span><b>{jobs}</b></div>
                    <div><span>{t.lostYear}</span><b>{money(lostYear)}</b></div>
                    <div><span>{t.wonBack}</span><b style={{ color: "var(--gold)" }}>{money(backMonth)}{t.perMonth}</b></div>
                </div>
                <a className={`${s.btn} ${s.btnGold}`} href="#book" style={{ width: "100%", justifyContent: "center" }}>{t.cta}</a>
                <p className={f.note}>{t.note}</p>
            </div>
        </div>
    );
}
