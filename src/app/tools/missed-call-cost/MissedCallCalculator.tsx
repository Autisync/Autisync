"use client";

import { useState } from "react";
import f from "@/app/components/funnel.module.css";
import s from "@/app/crm/crm.module.css";

const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

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

export default function MissedCallCalculator() {
    const [missed, setMissed] = useState(10);       // missed calls a week
    const [newPct, setNewPct] = useState(60);       // % of those that are new enquiries
    const [winPct, setWinPct] = useState(40);       // % of answered enquiries you'd normally win
    const [value, setValue] = useState(300);        // average job / booking value, £
    const [recoverPct, setRecoverPct] = useState(30); // % a text-back wins back

    const weeks = 52 / 12;
    const lostJobsMonth = missed * weeks * (newPct / 100) * (winPct / 100);
    const lostMonth = lostJobsMonth * value;
    const lostYear = lostMonth * 12;
    const backMonth = lostMonth * (recoverPct / 100);

    return (
        <div className={f.tool}>
            <div className={f.panel}>
                <Field id="missed" label="Missed calls a week" hint="Check your phone's call log for a typical week." value={missed} set={setMissed} min={0} max={60} />
                <Field id="new" label="How many are new enquiries" hint="The rest are existing customers, suppliers or spam." value={newPct} set={setNewPct} min={0} max={100} suffix="%" />
                <Field id="win" label="Enquiries you usually win when you answer" value={winPct} set={setWinPct} min={0} max={100} suffix="%" />
                <Field id="value" label="Average job or booking value (£)" value={value} set={setValue} min={20} max={5000} step={10} />
                <Field id="recover" label="Missed callers a text-back would win back" hint="An instant 'Sorry we missed you' text keeps some callers from ringing the next business." value={recoverPct} set={setRecoverPct} min={0} max={100} suffix="%" />
            </div>
            <div className={`${f.panel} ${f.result}`} aria-live="polite">
                <div className={f.resultLabel}>Estimated work lost to missed calls</div>
                <div className={f.resultBig}>{gbp(lostMonth)}<span style={{ fontSize: "0.4em", color: "var(--muted)" }}> /month</span></div>
                <div className={f.resultRows}>
                    <div><span>Jobs lost a month</span><b>{lostJobsMonth.toFixed(1)}</b></div>
                    <div><span>Lost a year</span><b>{gbp(lostYear)}</b></div>
                    <div><span>Won back with a text-back</span><b style={{ color: "var(--gold)" }}>{gbp(backMonth)} /month</b></div>
                </div>
                <a className={`${s.btn} ${s.btnGold}`} href="#book" style={{ width: "100%", justifyContent: "center" }}>Stop losing missed calls</a>
                <p className={f.note}>An estimate from your own numbers, not a guarantee. Change any figure to see the effect.</p>
            </div>
        </div>
    );
}
