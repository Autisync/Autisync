"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
    carePlanMonthly,
    formatPrice,
    type Currency,
} from "@/lib/website-packages";
import { approxUsd, useUsdRates } from "@/lib/fx";
import {
    MARKET_EVENT,
    guessMarket,
    marketByCode,
    marketForCurrency,
    marketName,
    markets,
    readSavedMarket,
    saveMarket,
    type Market,
} from "@/lib/market";
import { ptUi } from "@/lib/i18n/pt";

export type Locale = "en" | "pt";

const DISMISSED_KEY = "autisync-market-asked";

/**
 * A small flag image. Emoji flags were the obvious choice and render as two
 * grey letters on Windows, which is where most of our visitors are; a 20px
 * PNG from flagcdn (public domain) looks the same everywhere.
 */
export function Flag({ market, size = 20, className = "" }: { market: Market; size?: number; className?: string }) {
    const h = Math.round(size * 0.75);
    return (
        // eslint-disable-next-line @next/next/no-img-element -- 1 KB flag, no need for the image pipeline
        <img
            src={`https://flagcdn.com/w${size <= 20 ? 20 : 40}/${market.iso}.png`}
            srcSet={`https://flagcdn.com/w${size <= 20 ? 40 : 80}/${market.iso}.png 2x`}
            width={size}
            height={h}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className={"inline-block rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,.08)] align-[-2px] " + className}
        />
    );
}

/**
 * The visitor's market: the saved choice, the URL's, or a guess from the
 * browser. `confirmed` is false until they have tapped a market (or said the
 * guess is right), which is when the chip stops asking. Every copy of this
 * hook on the page follows the same choice through a window event.
 */
export function useMarket(): { market: Market; setMarket: (m: Market, confirmed?: boolean) => void; confirmed: boolean; ready: boolean } {
    // Server render and first paint: Angola, as before, so the HTML is stable.
    const [market, setMarketState] = useState<Market>(markets[0]);
    const [confirmed, setConfirmed] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const saved = readSavedMarket();
        if (saved) {
            setMarketState(saved.market);
            setConfirmed(saved.confirmed);
        } else {
            setMarketState(guessMarket());
            setConfirmed(false);
        }
        setReady(true);
        const onChange = (e: Event) => {
            const detail = (e as CustomEvent<{ code: string; confirmed: boolean }>).detail;
            const m = marketByCode(detail?.code);
            if (m) { setMarketState(m); if (detail.confirmed) setConfirmed(true); }
        };
        window.addEventListener(MARKET_EVENT, onChange);
        return () => window.removeEventListener(MARKET_EVENT, onChange);
    }, []);

    const setMarket = useCallback((m: Market, isConfirmed = true) => {
        setMarketState(m);
        if (isConfirmed) setConfirmed(true);
        saveMarket(m, isConfirmed);
    }, []);

    return { market, setMarket, confirmed, ready };
}

/**
 * Which currency to show package prices in -- the market's. Kept with its
 * old shape so the pages that only care about the currency need no change.
 */
export function usePackageCurrency(): [Currency, (c: Currency) => void] {
    const { market, setMarket } = useMarket();
    const choose = (c: Currency) => setMarket(marketForCurrency(c), true);
    return [market.currency, choose];
}

const chipText = {
    en: {
        showing: (m: Market) => `Showing prices for ${m.name} in ${m.currency === "AOA" ? "kwanza" : m.currency === "NAD" ? "Namibian dollars" : m.currency === "GBP" ? "pounds" : "euros"}.`,
        question: "Is that where you are?",
        yes: "Yes, that's me",
        other: "Somewhere else",
        pick: "Pick your market:",
        close: "Close",
        label: "Your market",
    },
    pt: {
        showing: (m: Market) => `A mostrar preços para ${m.namePt} em ${m.currency === "AOA" ? "kwanzas" : m.currency === "NAD" ? "dólares namibianos" : m.currency === "GBP" ? "libras" : "euros"}.`,
        question: "É aí que está?",
        yes: "Sim, sou eu",
        other: "Noutro lugar",
        pick: "Escolha o seu mercado:",
        close: "Fechar",
        label: "O seu mercado",
    },
};

/**
 * The market switcher, with the chip that asks "is this you?" the first time.
 *
 * The chip only appears once the switcher has scrolled into view, slides up
 * from under it, and goes away for good when the visitor confirms or picks.
 * No modal: nothing blocks the page, and somebody who ignores it still sees
 * prices in the guessed market, which is right for almost everyone.
 */
export function CurrencyToggle({
    value,
    onChange,
    locale = "en",
}: {
    value: Currency;
    onChange: (c: Currency) => void;
    locale?: Locale;
}) {
    const { market, setMarket, confirmed, ready } = useMarket();
    const t = chipText[locale];
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    const [dismissed, setDismissed] = useState(true);
    const [picking, setPicking] = useState(false);

    useEffect(() => {
        try { setDismissed(window.sessionStorage.getItem(DISMISSED_KEY) === "1"); } catch { setDismissed(false); }
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
        const io = new IntersectionObserver((entries) => {
            if (entries.some((e) => e.isIntersecting)) { setInView(true); io.disconnect(); }
        }, { threshold: 0.4 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const dismiss = () => {
        setDismissed(true);
        try { window.sessionStorage.setItem(DISMISSED_KEY, "1"); } catch { /* ignore */ }
    };
    const choose = (m: Market) => {
        setMarket(m, true);
        onChange(m.currency);
        dismiss();
    };

    const showChip = ready && !confirmed && !dismissed && inView;
    const current = marketForCurrency(value);

    return (
        <div ref={ref} className="relative flex flex-col items-center mt-8">
            <style>{`
                @keyframes autisync-chip-in { from { opacity: 0; transform: translateY(8px) scale(.97); } to { opacity: 1; transform: none; } }
                @keyframes autisync-ring { 0%,100% { box-shadow: 0 0 0 0 rgba(185,139,47,.0); } 50% { box-shadow: 0 0 0 6px rgba(185,139,47,.22); } }
                .autisync-chip { animation: autisync-chip-in .45s cubic-bezier(.2,.8,.2,1) both; }
                .autisync-ask { animation: autisync-ring 1.8s ease-in-out 2; }
                @media (prefers-reduced-motion: reduce) { .autisync-chip, .autisync-ask { animation: none; } }
            `}</style>
            <div
                role="radiogroup"
                aria-label={t.label}
                className={
                    "inline-flex flex-wrap justify-center p-1 bg-white rounded-full shadow-sm ring-1 ring-gray-200 transition-shadow " +
                    (showChip ? "autisync-ask ring-[var(--autisync-gold,#b98b2f)]/60" : "")
                }
            >
                {markets.map((m) => {
                    const active = m.currency === value;
                    const label = locale === "pt" ? ptUi.regions[m.currency] : m.name;
                    return (
                        <button
                            key={m.code}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            title={label}
                            onClick={() => choose(m)}
                            className={
                                "px-3 sm:px-4 py-1.5 text-sm font-semibold rounded-full transition-colors whitespace-nowrap " +
                                (active
                                    ? "bg-[var(--autisync-gold,#b98b2f)] text-white"
                                    : "text-gray-600 hover:text-gray-900")
                            }
                        >
                            <Flag market={m} className="mr-1.5" />
                            <span className="sm:hidden">{m.code === "GB" ? (locale === "pt" ? "Reino Unido" : "UK") : marketName(m, locale)}</span>
                            <span className="hidden sm:inline">{marketName(m, locale)}</span>
                        </button>
                    );
                })}
            </div>

            {showChip && (
                <div
                    role="status"
                    aria-live="polite"
                    className="autisync-chip mt-3 max-w-md w-full sm:w-auto rounded-2xl border border-[var(--autisync-gold,#b98b2f)]/40 bg-white px-4 py-3 shadow-lg text-left"
                >
                    <div className="flex items-start gap-3">
                        <Flag market={market} size={32} className="mt-0.5" />
                        <div className="min-w-0 flex-1 text-sm text-gray-700">
                            <p className="font-medium text-gray-900">{t.showing(current)}</p>
                            {!picking ? (
                                <>
                                    <p className="mt-0.5 text-gray-600">{t.question}</p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        <button
                                            type="button"
                                            onClick={() => choose(current)}
                                            className="px-3 py-1.5 text-sm font-semibold rounded-full bg-[var(--autisync-gold,#b98b2f)] text-white hover:bg-[#1C1C1C] transition-colors"
                                        >
                                            {t.yes}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPicking(true)}
                                            className="px-3 py-1.5 text-sm font-semibold rounded-full ring-1 ring-gray-300 text-gray-700 hover:bg-gray-50"
                                        >
                                            {t.other}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="mt-0.5 text-gray-600">{t.pick}</p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {markets.filter((m) => m.code !== current.code).map((m) => (
                                            <button
                                                key={m.code}
                                                type="button"
                                                onClick={() => choose(m)}
                                                className="px-3 py-1.5 text-sm font-semibold rounded-full ring-1 ring-gray-300 text-gray-700 hover:ring-[var(--autisync-gold,#b98b2f)] hover:text-gray-900"
                                            >
                                                <Flag market={m} size={16} className="mr-1" />{marketName(m, locale)}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        <button type="button" onClick={dismiss} aria-label={t.close} className="-mr-1 -mt-1 rounded-full p-1 text-gray-400 hover:text-gray-700">
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

/** "≈ $397" under a kwanza or N$ figure, once the day's rate has arrived. */
export function ApproxUsd({ amount, currency, className = "" }: { amount: number; currency: Currency; className?: string }) {
    const rates = useUsdRates();
    const text = approxUsd(amount, currency, rates);
    if (!text) return null;
    return (
        <span className={"block text-sm font-medium text-gray-500 tabular-nums " + className} title={rates?.asOf ? `Rate of ${rates.asOf}` : undefined}>
            {text}
        </span>
    );
}

const ongoingText = {
    en: {
        year1: "Domain, hosting & email included for the first year.",
        after: (price: string) => `From year 2: ${price}/month for hosting, email, backups & 2h of changes.`,
        none: "One-off. Nothing to pay afterwards.",
    },
    pt: {
        year1: "Domínio, alojamento e e-mail incluídos no primeiro ano.",
        after: (price: string) => `A partir do 2.º ano: ${price}/mês por alojamento, e-mail, cópias de segurança e 2h de alterações.`,
        none: "Pagamento único. Nada a pagar depois.",
    },
};

/** The year-one inclusions and the Care Plan from year two, as one small block. */
export function OngoingNote({ currency, locale = "en", dark = false }: { currency: Currency; locale?: Locale; dark?: boolean }) {
    const o = ongoingText[locale];
    const rates = useUsdRates();
    const care = carePlanMonthly[currency];
    const usd = approxUsd(care, currency, rates);
    const careText = `${formatPrice(care, currency)}${usd ? ` (${usd})` : ""}`;
    return (
        <span className={"mt-3 block rounded-lg px-3 py-2 text-xs leading-5 ring-1 " + (dark ? "bg-white/5 text-gray-300 ring-white/10" : "bg-gray-50 text-gray-600 ring-gray-200/80")}>
            <span className="block">{o.year1}</span>
            <span className={"block font-medium " + (dark ? "text-white" : "text-gray-800")}>{o.after(careText)}</span>
        </span>
    );
}

/**
 * "From Kz 495.000" with the terms under it. Says what the figure buys and
 * what comes after it: a website price is for year one, with domain, hosting
 * and email inside it, and the Care Plan starts in year two. A client who
 * learns that from the second-year invoice was not told the price.
 */
export function TierPrice({
    amount,
    currency,
    note,
    locale = "en",
    ongoing,
}: {
    amount: number;
    currency: Currency;
    note?: string;
    locale?: Locale;
    /** "website": year-one inclusions + Care Plan from year 2; "none": one-off, nothing after. */
    ongoing?: "website" | "none";
}) {
    const label = locale === "pt" ? ptUi.from : "From";
    const sub = note ?? (locale === "pt" ? ptUi.oneOff : "one-off · 50% to start, 50% at launch");
    const o = ongoingText[locale];
    return (
        <span className="block">
            <small className="block text-xs font-semibold uppercase tracking-wide text-[var(--autisync-gold,#b98b2f)]">
                {label}
            </small>
            <span className="text-4xl font-bold tracking-tight text-gray-900">
                {formatPrice(amount, currency)}
            </span>
            <ApproxUsd amount={amount} currency={currency} />
            <span className="block mt-1 text-xs text-gray-500">{sub}</span>
            {ongoing === "website" && <OngoingNote currency={currency} locale={locale} />}
            {ongoing === "none" && (
                <span className="mt-2 block text-xs text-gray-500">{o.none}</span>
            )}
        </span>
    );
}

export function CarePlanNote({ currency, locale = "en" }: { currency: Currency; locale?: Locale }) {
    const rates = useUsdRates();
    const usd = approxUsd(carePlanMonthly[currency], currency, rates);
    const careText = `${formatPrice(carePlanMonthly[currency], currency)}${usd ? ` (${usd})` : ""}`;
    if (locale === "pt") {
        return (
            <p className="max-w-3xl mx-auto mt-10 text-sm leading-6 text-center text-gray-600">
                {ptUi.carePlan(careText)}
            </p>
        );
    }
    return (
        <p className="max-w-3xl mx-auto mt-10 text-sm leading-6 text-center text-gray-600">
            Hosting and domain are free for the first year. After that, our{" "}
            <span className="font-semibold text-gray-800">Care Plan</span> keeps your site
            hosted, backed up, updated and secure, with 2 hours of changes a month, for{" "}
            <span className="font-semibold text-gray-800">
                {careText}/month
            </span>
            .
        </p>
    );
}
