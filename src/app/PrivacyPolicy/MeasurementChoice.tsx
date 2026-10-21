"use client";

import { useEffect, useState } from "react";
import type { PolicyLang } from "./policyContent";

/**
 * The switch the privacy policy promises: visit measurement off (or back on)
 * in this browser.
 *
 * One flag stops both tools. The CRM's tracker (t.js) reads
 * localStorage "autisync_track_ignore" === "1" before it starts and does
 * nothing when it is set; Vercel Web Analytics checks the same flag in
 * components/SiteAnalytics.tsx. Both also stand down for Global Privacy
 * Control and Do Not Track, which this control reports.
 */
export const TRACK_IGNORE_KEY = "autisync_track_ignore";

const COPY = {
    en: {
        on: "Visit measurement is on in this browser.",
        off: "Visit measurement is off in this browser.",
        signal: "Your browser sends a Global Privacy Control or Do Not Track signal, so visits are not measured whatever this switch says.",
        turnOff: "Switch off",
        turnOn: "Switch back on",
        blocked: "This browser is blocking site storage, so the choice cannot be saved. Turning on Do Not Track or Global Privacy Control in your browser has the same effect.",
        reload: "Takes effect on the next page you open.",
    },
    pt: {
        on: "A medição de visitas está ligada neste navegador.",
        off: "A medição de visitas está desligada neste navegador.",
        signal: "O seu navegador envia um sinal Global Privacy Control ou Do Not Track, por isso as visitas não são medidas, seja qual for a posição deste botão.",
        turnOff: "Desligar",
        turnOn: "Voltar a ligar",
        blocked: "Este navegador bloqueia o armazenamento do site, por isso a escolha não pode ser guardada. Ativar o Do Not Track ou o Global Privacy Control no navegador tem o mesmo efeito.",
        reload: "Aplica-se a partir da próxima página que abrir.",
    },
} as const;

type State = "loading" | "on" | "off" | "blocked";

export default function MeasurementChoice({ lang }: { lang: PolicyLang }) {
    const t = COPY[lang];
    const [state, setState] = useState<State>("loading");
    const [signal, setSignal] = useState(false);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        try {
            const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
            setSignal(!!nav.globalPrivacyControl || nav.doNotTrack === "1");
        } catch { /* no navigator */ }
        try {
            setState(localStorage.getItem(TRACK_IGNORE_KEY) === "1" ? "off" : "on");
        } catch {
            setState("blocked");
        }
    }, []);

    const toggle = () => {
        try {
            if (state === "on") localStorage.setItem(TRACK_IGNORE_KEY, "1");
            else localStorage.removeItem(TRACK_IGNORE_KEY);
            setState(state === "on" ? "off" : "on");
            setChanged(true);
        } catch {
            setState("blocked");
        }
    };

    return (
        <div className="rounded-lg border border-[#b98b2f]/30 bg-white px-4 py-4 shadow-sm" aria-live="polite">
            {state === "blocked" ? (
                <p className="text-sm text-gray-600">{t.blocked}</p>
            ) : (
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-medium text-gray-800">
                        {state === "loading" ? " " : state === "on" ? t.on : t.off}
                    </p>
                    <button
                        type="button"
                        onClick={toggle}
                        disabled={state === "loading"}
                        data-track={state === "on" ? "Privacy · measurement switched off" : "Privacy · measurement switched on"}
                        className="rounded-md bg-[#1C1C1C] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#b98b2f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b98b2f] disabled:opacity-40"
                    >
                        {state === "on" ? t.turnOff : t.turnOn}
                    </button>
                </div>
            )}
            {changed && state !== "blocked" && <p className="mt-2 text-xs text-gray-500">{t.reload}</p>}
            {signal && <p className="mt-2 text-xs text-gray-500">{t.signal}</p>}
        </div>
    );
}
