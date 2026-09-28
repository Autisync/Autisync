"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import TurnstileWidget from "@/app/components/TurnstileWidget";
import s from "./crm.module.css";

const WHATSAPP_NUMBER = "447883317646";

const COUNTRIES = ["United Kingdom", "Portugal", "Namibia", "Angola", "Other"];
const TEAM_SIZES = ["Just me", "2–5 people", "6–20 people", "21+ people"];
const CURRENT_TOOLS = ["Spreadsheets", "WhatsApp and email", "Another CRM", "Nothing formal yet"];
const PRIORITIES = [
    "Client records",
    "Sales pipeline",
    "Automated follow-ups",
    "Appointment booking",
    "Importing my contacts",
];
const CONTACT_METHODS = ["WhatsApp", "Email", "Phone"];

interface FormState {
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    country: string;
    teamSize: string;
    currentTool: string;
    priorities: string[];
    preferredContactMethod: string;
    notes: string;
    consent: boolean;
}

const EMPTY: FormState = {
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    country: "",
    teamSize: "",
    currentTool: "",
    priorities: [],
    preferredContactMethod: "WhatsApp",
    notes: "",
    consent: false,
};

type Field = keyof FormState;
type Errors = Partial<Record<Field, string>>;

declare global {
    interface Window {
        dataLayer?: Record<string, unknown>[];
    }
}

function buildMessage(f: FormState): string {
    return [
        "Autisync CRM proposal request",
        "",
        `Team size: ${f.teamSize}`,
        `Currently manages clients with: ${f.currentTool}`,
        `Priorities: ${f.priorities.length ? f.priorities.join(", ") : "-"}`,
        "",
        f.notes.trim() ? `Notes: ${f.notes.trim()}` : "Notes: -",
    ].join("\n");
}

export default function ProposalForm() {
    const [form, setForm] = useState<FormState>(EMPTY);
    const [errors, setErrors] = useState<Errors>({});
    const [website, setWebsite] = useState("");
    const [formStartedAt, setFormStartedAt] = useState<number>(() => Date.now());
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [submittedName, setSubmittedName] = useState("");
    const [submittedBiz, setSubmittedBiz] = useState("");
    const doneRef = useRef<HTMLDivElement | null>(null);
    const utmRef = useRef<Record<string, string>>({});
    const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
    const onToken = useCallback((t: string | null) => setTurnstileToken(t), []);

    useEffect(() => {
        const p = new URLSearchParams(window.location.search);
        utmRef.current = {
            source: p.get("utm_source") ?? "",
            medium: p.get("utm_medium") ?? "",
            campaign: p.get("utm_campaign") ?? "",
            gclid: p.get("gclid") ?? "",
            fbclid: p.get("fbclid") ?? "",
        };
    }, []);

    useEffect(() => {
        if (status === "success") doneRef.current?.focus();
    }, [status]);

    function set<K extends Field>(key: K, value: FormState[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    }

    function togglePriority(p: string) {
        set(
            "priorities",
            form.priorities.includes(p) ? form.priorities.filter((x) => x !== p) : [...form.priorities, p]
        );
    }

    function validate(): boolean {
        const next: Errors = {};
        if (!form.fullName.trim()) next.fullName = "Enter your full name.";
        if (!form.companyName.trim()) next.companyName = "Enter your business name.";
        if (!form.email.trim()) next.email = "Enter your email address.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email, like name@business.com.";
        if (!form.country) next.country = "Choose your country.";
        if (!form.teamSize) next.teamSize = "Choose your team size.";
        if (!form.currentTool) next.currentTool = "Choose how you manage clients today.";
        if (!form.consent) next.consent = "Tick this box so we can contact you about your proposal.";
        setErrors(next);
        if (Object.keys(next).length) {
            setErrorMessage("");
            const first = Object.keys(next)[0];
            document.getElementById(`crm-${first}`)?.focus();
            return false;
        }
        if (!turnstileSiteKey || !turnstileToken) {
            setErrorMessage("Please complete the verification check above the button.");
            return false;
        }
        return true;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        setStatus("loading");
        setErrorMessage("");

        const payload = {
            source: "crm-landing",
            page: "/crm",
            fullName: form.fullName,
            companyName: form.companyName,
            email: form.email,
            phone: form.phone,
            businessLocation: form.country,
            serviceInterestedIn: "Autisync CRM",
            budgetRange: "",
            preferredContactMethod: form.preferredContactMethod,
            message: buildMessage(form),
            consent: true,
            website,
            form_started_at: formStartedAt,
            turnstileToken,
            utm: {
                source: utmRef.current.source ?? "",
                medium: utmRef.current.medium ?? "",
                campaign: utmRef.current.campaign ?? "",
            },
            tracking: {
                gclid: utmRef.current.gclid ?? "",
                fbclid: utmRef.current.fbclid ?? "",
            },
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setErrorMessage(
                    res.status === 429
                        ? "Too many requests from this connection. Please wait a few minutes, or message us on WhatsApp."
                        : data.error ?? "We couldn't send your request. Please try again, or message us on WhatsApp."
                );
                setStatus("error");
                setTurnstileToken(null);
                return;
            }
            setSubmittedName(form.fullName.trim().split(" ")[0]);
            setSubmittedBiz(form.companyName.trim());
            window.dataLayer?.push({ event: "crm_proposal_form_completed" });
            setStatus("success");
            setForm(EMPTY);
            setWebsite("");
            setTurnstileToken(null);
            setFormStartedAt(Date.now());
        } catch {
            setErrorMessage("Network error. Check your connection and try again.");
            setStatus("error");
        }
    }

    if (status === "success") {
        const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            `Hi Autisync, I've just requested a CRM proposal for ${submittedBiz}.`
        )}`;
        return (
            <div className={s.card} ref={doneRef} tabIndex={-1} role="status">
                <span className={s.eyebrow}>Request received</span>
                <h3 className={s.doneTitle}>Thanks{submittedName ? `, ${submittedName}` : ""}. Your request is with our team.</h3>
                <p className={s.muted}>
                    We&apos;ve sent a confirmation to your email. Someone from Autisync will contact you shortly
                    to book a short discovery call, then we&apos;ll prepare your proposal.
                </p>
                <p className={s.muted}>Want to skip the wait? Book your discovery call now, or message us on WhatsApp.</p>
                <div className={s.ctaRow} style={{ marginTop: 4 }}>
                    <a className={`${s.btn} ${s.btnGold}`} href="#book">
                        Book my discovery call
                    </a>
                    <a className={`${s.btn} ${s.btnGhost}`} href={wa} target="_blank" rel="noopener noreferrer">
                        Message us on WhatsApp
                    </a>
                </div>
            </div>
        );
    }

    const inv = (f: Field) => (errors[f] ? { "aria-invalid": true as const, "aria-describedby": `crm-${f}-err` } : {});
    const err = (f: Field) =>
        errors[f] ? (
            <span className={s.fieldErr} id={`crm-${f}-err`}>
                {errors[f]}
            </span>
        ) : null;

    return (
        <form className={s.card} onSubmit={handleSubmit} noValidate>
            <div className={s.row}>
                <div className={s.field}>
                    <label className={s.label} htmlFor="crm-fullName">Full name</label>
                    <input id="crm-fullName" className={s.input} autoComplete="name" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} {...inv("fullName")} />
                    {err("fullName")}
                </div>
                <div className={s.field}>
                    <label className={s.label} htmlFor="crm-companyName">Business name</label>
                    <input id="crm-companyName" className={s.input} autoComplete="organization" value={form.companyName} onChange={(e) => set("companyName", e.target.value)} {...inv("companyName")} />
                    {err("companyName")}
                </div>
            </div>

            <div className={s.row}>
                <div className={s.field}>
                    <label className={s.label} htmlFor="crm-email">Email</label>
                    <input id="crm-email" type="email" className={s.input} autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} {...inv("email")} />
                    {err("email")}
                </div>
                <div className={s.field}>
                    <label className={s.label} htmlFor="crm-phone">
                        WhatsApp / phone <span className={s.opt}>(optional)</span>
                    </label>
                    <input id="crm-phone" type="tel" className={s.input} autoComplete="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                </div>
            </div>

            <div className={s.row}>
                <div className={s.field}>
                    <label className={s.label} htmlFor="crm-country">Country</label>
                    <select id="crm-country" className={s.input} value={form.country} onChange={(e) => set("country", e.target.value)} {...inv("country")}>
                        <option value="">Select…</option>
                        {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                    {err("country")}
                </div>
                <div className={s.field}>
                    <label className={s.label} htmlFor="crm-teamSize">Team size</label>
                    <select id="crm-teamSize" className={s.input} value={form.teamSize} onChange={(e) => set("teamSize", e.target.value)} {...inv("teamSize")}>
                        <option value="">Select…</option>
                        {TEAM_SIZES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                    {err("teamSize")}
                </div>
            </div>

            <div className={s.row}>
                <div className={s.field}>
                    <label className={s.label} htmlFor="crm-currentTool">How do you manage clients today?</label>
                    <select id="crm-currentTool" className={s.input} value={form.currentTool} onChange={(e) => set("currentTool", e.target.value)} {...inv("currentTool")}>
                        <option value="">Select…</option>
                        {CURRENT_TOOLS.map((c) => <option key={c}>{c}</option>)}
                    </select>
                    {err("currentTool")}
                </div>
                <div className={s.field}>
                    <label className={s.label} htmlFor="crm-preferredContactMethod">Best way to reach you</label>
                    <select id="crm-preferredContactMethod" className={s.input} value={form.preferredContactMethod} onChange={(e) => set("preferredContactMethod", e.target.value)}>
                        {CONTACT_METHODS.map((c) => <option key={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            <div className={s.field}>
                <span className={s.label} id="crm-priorities-label">
                    What matters most? <span className={s.opt}>(pick any)</span>
                </span>
                <fieldset className={s.tags} aria-labelledby="crm-priorities-label">
                    {PRIORITIES.map((p) => {
                        const on = form.priorities.includes(p);
                        return (
                            <label key={p} className={`${s.tag} ${on ? s.tagOn : ""}`}>
                                <input type="checkbox" checked={on} onChange={() => togglePriority(p)} />
                                {p}
                            </label>
                        );
                    })}
                </fieldset>
            </div>

            <div className={s.field}>
                <label className={s.label} htmlFor="crm-notes">
                    Anything else? <span className={s.opt}>(optional)</span>
                </label>
                <textarea id="crm-notes" className={s.input} maxLength={2000} placeholder="e.g. We get most enquiries on Instagram and lose track of them." value={form.notes} onChange={(e) => set("notes", e.target.value)} />
            </div>

            {/* Honeypot: hidden from people, filled by bots */}
            <div className={s.honeypot} aria-hidden="true">
                <label htmlFor="crm-website">Website</label>
                <input id="crm-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>

            <div className={s.field}>
                <label className={s.consent}>
                    <input id="crm-consent" type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} {...inv("consent")} />
                    <span>
                        I agree that Autisync may contact me about this request, as described in the{" "}
                        <a href="/PrivacyPolicy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
                    </span>
                </label>
                {err("consent")}
            </div>

            {turnstileSiteKey ? (
                <TurnstileWidget siteKey={turnstileSiteKey} onTokenChange={onToken} theme="dark" />
            ) : (
                <p className={s.formErr}>Verification is not configured, so the form can&apos;t be sent yet. Please message us on WhatsApp.</p>
            )}

            {errorMessage ? <p className={s.formErr} role="alert">{errorMessage}</p> : null}

            <button className={`${s.btn} ${s.btnGold}`} type="submit" disabled={status === "loading" || !turnstileSiteKey}>
                {status === "loading" ? "Sending…" : "Request my proposal"}
            </button>
        </form>
    );
}
