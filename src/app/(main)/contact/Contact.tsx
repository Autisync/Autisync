"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const offices = [
    { id: 1, city: "Europe", address: ["(+44) 788 331 7646"] },
    { id: 2, city: "Namibia & Angola", address: ["(+244) 927 114 400", "(+264) 927 114 403"] },
    { id: 3, city: "General contact", address: ["info@autisync.com"] },
];

const SERVICE_OPTIONS = [
    "Web Development",
    "Mobile App Development",
    "Graphic Design & Branding",
    "SEO & Digital Marketing",
    "IT Consultation",
    "Other",
];

const BUDGET_OPTIONS = [
    "Under 5,000 (local currency)",
    "5,000 - 15,000 (local currency)",
    "15,000 - 30,000 (local currency)",
    "30,000+ (local currency)",
    "Not Sure Yet",
];

const CONTACT_METHOD_OPTIONS = ["Email", "Phone", "WhatsApp"];

interface FormState {
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    businessLocation: string;
    serviceInterestedIn: string;
    budgetRange: string;
    preferredContactMethod: string;
    message: string;
    consent: boolean;
}

const EMPTY_FORM: FormState = {
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    businessLocation: "",
    serviceInterestedIn: "",
    budgetRange: "",
    preferredContactMethod: "",
    message: "",
    consent: false,
};

export default function Contact() {
    const [form, setForm] = useState<FormState>(EMPTY_FORM);
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    // Capture UTM / tracking params from the URL query string on mount
    const utmRef = useRef<{
        source?: string; medium?: string; campaign?: string; gclid?: string; fbclid?: string;
    }>({});

    useEffect(() => {
        const p = new URLSearchParams(window.location.search);
        utmRef.current = {
            source: p.get("utm_source") ?? undefined,
            medium: p.get("utm_medium") ?? undefined,
            campaign: p.get("utm_campaign") ?? undefined,
            gclid: p.get("gclid") ?? undefined,
            fbclid: p.get("fbclid") ?? undefined,
        };
    }, []);

    function validate(): boolean {
        const next: Partial<Record<keyof FormState, string>> = {};
        if (!form.fullName.trim()) next.fullName = "Full name is required.";
        if (!form.email.trim()) {
            next.email = "Email address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            next.email = "Please enter a valid email address.";
        }
        if (!form.serviceInterestedIn) next.serviceInterestedIn = "Please select a service.";
        if (!form.consent) next.consent = "You must agree to be contacted before submitting.";
        setErrors(next);
        return Object.keys(next).length === 0;
    }

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        const { name, type, value } = e.target;
        if (type === "checkbox") {
            setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
        // Clear field error on change
        if (errors[name as keyof FormState]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        setStatus("loading");

        const payload = {
            source: "website-contact",
            page: "/contact",
            ...form,
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
            const data = await res.json();
            if (!res.ok) {
                setErrorMessage(data.error ?? "Something went wrong. Please try again.");
                setStatus("error");
            } else {
                setStatus("success");
                setForm(EMPTY_FORM);
            }
        } catch {
            setErrorMessage("Network error. Please check your connection and try again.");
            setStatus("error");
        }
    }

    const inputClass = (field: keyof FormState) =>
        `w-full rounded-lg border px-4 py-2.5 text-sm text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B98B2F]/40 focus:border-[#B98B2F] transition-colors ${
            errors[field] ? "border-red-400 bg-red-50" : "border-gray-200"
        }`;

    const labelClass = "block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1";

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ContactPage",
                        name: "Contact Autisync",
                        url: "https://www.autisync.com/contact",
                        mainEntity: {
                            "@type": "Organization",
                            name: "Autisync",
                            email: "info@autisync.com",
                            telephone: "+447883317646",
                            url: "https://www.autisync.com",
                        },
                    }),
                }}
            />

            {/* Hero */}
            <div className="relative flex items-center content-center justify-center pt-36 pb-76 min-h-screen-75">
                <div
                    className="absolute top-0 w-full h-full bg-center bg-cover"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
                    }}
                >
                    <span id="blackOverlay" className="absolute w-full h-full bg-black opacity-75" />
                </div>

                <div className="container relative mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="w-full px-4 ml-auto mr-auto text-center lg:w-6/12">
                            <div className="p-4">
                                <h1 className="text-5xl font-semibold text-white">
                                    Get in touch with us.
                                </h1>
                                <p className="mt-4 text-lg text-gray-200">
                                    Need finding the right fit for your business? - We are here to
                                    help. If you need a solution to a specific challenge, or just
                                    want to know more about what we offer, get in touch with the
                                    right people at Autisync.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="absolute bottom-0 left-0 right-0 top-auto w-full h-16 overflow-hidden pointer-events-none"
                    style={{ transform: "translateZ(0)" }}
                >
                    <svg
                        className="absolute bottom-0 overflow-hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <polygon className="text-gray-100 fill-current" points="2560 0 2560 100 0 100" />
                    </svg>
                </div>
            </div>

            <section className="relative py-16 bg-gray-100">
                <div className="container px-4 mx-auto">
                    <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded-lg shadow-xl -mt-44">
                        <div className="px-6">
                            {/* Stats / CTA */}
                            <div className="flex flex-wrap justify-center">
                                <div className="flex justify-center w-full px-4 lg:w-3/12 lg:order-2">
                                    <div className="relative">
                                        <img
                                            alt="Autisync team"
                                            src="/img/team-2-800x800.jpg"
                                            className="absolute h-auto -m-16 -ml-20 align-middle border-none rounded-full shadow-xl lg:-ml-16 max-w-150-px"
                                        />
                                    </div>
                                </div>

                                <div className="w-full px-4 lg:w-4/12 lg:order-3 lg:text-right lg:self-center">
                                    <div className="px-3 py-0 mt-32 sm:mt-0">
                                        <Link
                                            href="/servicepackage"
                                            className="px-4 py-2 mb-1 text-xs text-white uppercase duration-150 ease-linear bg-[#1C1C1C] rounded shadow outline-none hover:bg-[var(--autisync-gold,#B98B2F)] hover:shadow-md focus:outline-none sm:mr-2 transition-all hover:shadow-[0_16px_30px_rgba(0,0,0,0.18)]/10"
                                        >
                                            Service Package
                                        </Link>
                                    </div>
                                </div>

                                <div className="w-full px-4 lg:w-4/12 lg:order-1">
                                    <div className="flex justify-center py-0 pt-8 lg:pt-4">
                                        <div className="p-3 mr-4 text-center">
                                            <span className="block text-xl font-bold tracking-wide text-gray-600 uppercase">239</span>
                                            <span className="text-sm text-gray-400">Queries</span>
                                        </div>
                                        <div className="p-3 mr-4 text-center">
                                            <span className="block text-xl font-bold tracking-wide text-gray-600 uppercase">2</span>
                                            <span className="text-sm text-gray-400">Support Line</span>
                                        </div>
                                        <div className="p-3 text-center lg:mr-4">
                                            <span className="block text-xl font-bold tracking-wide text-gray-600 uppercase">95%</span>
                                            <span className="text-sm text-gray-400">Customer Satisfaction</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form + Contact Info */}
                            <div className="py-12 bg-white">
                                <div className="flex justify-center">
                                    <div className="w-full max-w-[800px]">

                                        {/* Native contact form */}
                                        <div className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-100">
                                            {status === "success" ? (
                                                /* Success state */
                                                <div className="py-16 text-center">
                                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#B98B2F]/10">
                                                        <svg className="h-8 w-8 text-[#B98B2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message sent!</h3>
                                                    <p className="text-gray-500 max-w-sm mx-auto text-sm">
                                                        Thank you for reaching out. A member of our team will get back to you within one business day.
                                                    </p>
                                                    <button
                                                        onClick={() => setStatus("idle")}
                                                        className="mt-6 text-sm text-[#B98B2F] underline-offset-2 hover:underline"
                                                    >
                                                        Send another message
                                                    </button>
                                                </div>
                                            ) : (
                                                /* Form */
                                                <form onSubmit={handleSubmit} noValidate>
                                                    <h2 className="text-xl font-bold text-gray-900 mb-1">Send us a message</h2>
                                                    <p className="text-sm text-gray-500 mb-6">
                                                        Fill in the form below and we&apos;ll respond within one business day.
                                                    </p>

                                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                                                        {/* Full Name */}
                                                        <div>
                                                            <label className={labelClass} htmlFor="fullName">
                                                                Full Name <span className="text-red-400">*</span>
                                                            </label>
                                                            <input
                                                                id="fullName" name="fullName" type="text"
                                                                value={form.fullName} onChange={handleChange}
                                                                placeholder="Jane Smith" autoComplete="name"
                                                                className={inputClass("fullName")}
                                                            />
                                                            {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
                                                        </div>

                                                        {/* Company Name */}
                                                        <div>
                                                            <label className={labelClass} htmlFor="companyName">Company Name</label>
                                                            <input
                                                                id="companyName" name="companyName" type="text"
                                                                value={form.companyName} onChange={handleChange}
                                                                placeholder="Acme Ltd" autoComplete="organization"
                                                                className={inputClass("companyName")}
                                                            />
                                                        </div>

                                                        {/* Email */}
                                                        <div>
                                                            <label className={labelClass} htmlFor="email">
                                                                Email Address <span className="text-red-400">*</span>
                                                            </label>
                                                            <input
                                                                id="email" name="email" type="email"
                                                                value={form.email} onChange={handleChange}
                                                                placeholder="jane@example.com" autoComplete="email"
                                                                className={inputClass("email")}
                                                            />
                                                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                                                        </div>

                                                        {/* Phone */}
                                                        <div>
                                                            <label className={labelClass} htmlFor="phone">Phone Number</label>
                                                            <input
                                                                id="phone" name="phone" type="tel"
                                                                value={form.phone} onChange={handleChange}
                                                                placeholder="+44 7700 000000" autoComplete="tel"
                                                                className={inputClass("phone")}
                                                            />
                                                        </div>

                                                        {/* Business Location */}
                                                        <div>
                                                            <label className={labelClass} htmlFor="businessLocation">Business Location</label>
                                                            <input
                                                                id="businessLocation" name="businessLocation" type="text"
                                                                value={form.businessLocation} onChange={handleChange}
                                                                placeholder="London, UK"
                                                                className={inputClass("businessLocation")}
                                                            />
                                                        </div>

                                                        {/* Service Interested In */}
                                                        <div>
                                                            <label className={labelClass} htmlFor="serviceInterestedIn">
                                                                Service Interested In <span className="text-red-400">*</span>
                                                            </label>
                                                            <select
                                                                id="serviceInterestedIn" name="serviceInterestedIn"
                                                                value={form.serviceInterestedIn} onChange={handleChange}
                                                                className={inputClass("serviceInterestedIn")}
                                                            >
                                                                <option value="">Select a service...</option>
                                                                {SERVICE_OPTIONS.map((s) => (
                                                                    <option key={s} value={s}>{s}</option>
                                                                ))}
                                                            </select>
                                                            {errors.serviceInterestedIn && (
                                                                <p className="mt-1 text-xs text-red-500">{errors.serviceInterestedIn}</p>
                                                            )}
                                                        </div>

                                                        {/* Budget Range */}
                                                        <div>
                                                            <label className={labelClass} htmlFor="budgetRange">Budget Range</label>
                                                            <p className="mb-1 text-xs text-gray-400">Please use your local currency.</p>
                                                            <select
                                                                id="budgetRange" name="budgetRange"
                                                                value={form.budgetRange} onChange={handleChange}
                                                                className={inputClass("budgetRange")}
                                                            >
                                                                <option value="">Select a range...</option>
                                                                {BUDGET_OPTIONS.map((b) => (
                                                                    <option key={b} value={b}>{b}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        {/* Preferred Contact Method */}
                                                        <div>
                                                            <label className={labelClass} htmlFor="preferredContactMethod">Preferred Contact Method</label>
                                                            <select
                                                                id="preferredContactMethod" name="preferredContactMethod"
                                                                value={form.preferredContactMethod} onChange={handleChange}
                                                                className={inputClass("preferredContactMethod")}
                                                            >
                                                                <option value="">Select...</option>
                                                                {CONTACT_METHOD_OPTIONS.map((m) => (
                                                                    <option key={m} value={m}>{m}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        {/* Message */}
                                                        <div className="sm:col-span-2">
                                                            <label className={labelClass} htmlFor="message">Message</label>
                                                            <textarea
                                                                id="message" name="message" rows={4}
                                                                value={form.message} onChange={handleChange}
                                                                placeholder="Tell us about your project or challenge..."
                                                                className={`${inputClass("message")} resize-none`}
                                                            />
                                                        </div>

                                                        {/* Consent */}
                                                        <div className="sm:col-span-2">
                                                            <label className="flex items-start gap-3 cursor-pointer">
                                                                <input
                                                                    type="checkbox" name="consent"
                                                                    checked={form.consent} onChange={handleChange}
                                                                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-[#B98B2F]"
                                                                />
                                                                <span className="text-xs text-gray-500 leading-relaxed">
                                                                    I agree to be contacted by Autisync regarding my enquiry. View our{" "}
                                                                    <Link href="/PrivacyPolicy" className="text-[#B98B2F] hover:underline">
                                                                        Privacy Policy
                                                                    </Link>.
                                                                </span>
                                                            </label>
                                                            {errors.consent && <p className="mt-1 text-xs text-red-500">{errors.consent}</p>}
                                                        </div>
                                                    </div>

                                                    {/* Error banner */}
                                                    {status === "error" && (
                                                        <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                                                            {errorMessage}
                                                        </div>
                                                    )}

                                                    {/* Submit */}
                                                    <div className="mt-6">
                                                        <button
                                                            type="submit"
                                                            disabled={status === "loading"}
                                                            className="w-full px-6 py-3 text-sm font-semibold text-white uppercase tracking-wider rounded-lg bg-[#1C1C1C] hover:bg-[#B98B2F] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
                                                        >
                                                            {status === "loading" ? "Sending..." : "Send Message"}
                                                        </button>
                                                    </div>
                                                </form>
                                            )}
                                        </div>

                                        <p className="mt-3 text-xs text-gray-500 text-center">
                                            Protected by Autisync - your details are safe with us.
                                        </p>

                                        {/* Contact Info */}
                                        <div className="mt-14">
                                            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 text-center">
                                                Our contact information
                                            </h2>
                                            <p className="mb-10 text-lg text-gray-600 text-center max-w-[600px] mx-auto">
                                                Customer care is our top priority. Client satisfaction is our gain,
                                                and we look forward to hearing from you and working with you.
                                            </p>
                                            <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-3">
                                                {offices.map((office) => (
                                                    <div key={office.id}>
                                                        <h3 className="text-lg font-medium text-gray-900">{office.city}</h3>
                                                        <p className="mt-2 text-base text-gray-600">
                                                            {office.address.map((line) => (
                                                                <span key={line} className="block">{line}</span>
                                                            ))}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
