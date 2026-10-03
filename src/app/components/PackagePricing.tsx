"use client";

import { useEffect, useState } from "react";
import {
    carePlanMonthly,
    currencies,
    formatPrice,
    guessCurrency,
    type Currency,
} from "@/lib/website-packages";

const STORAGE_KEY = "autisync-currency";

/**
 * Which currency to show package prices in.
 * Server render (and first paint) uses Kz; after mount we switch to the
 * visitor's saved choice, or a guess from their time zone.
 */
export function usePackageCurrency(): [Currency, (c: Currency) => void] {
    const [currency, setCurrency] = useState<Currency>("AOA");

    useEffect(() => {
        let saved: string | null = null;
        try {
            saved = window.localStorage.getItem(STORAGE_KEY);
        } catch {
            /* storage blocked: ignore */
        }
        if (saved === "AOA" || saved === "GBP" || saved === "EUR") setCurrency(saved);
        else setCurrency(guessCurrency());
    }, []);

    const choose = (c: Currency) => {
        setCurrency(c);
        try {
            window.localStorage.setItem(STORAGE_KEY, c);
        } catch {
            /* storage blocked: ignore */
        }
    };

    return [currency, choose];
}

export function CurrencyToggle({
    value,
    onChange,
}: {
    value: Currency;
    onChange: (c: Currency) => void;
}) {
    return (
        <div className="flex justify-center mt-8">
            <div
                role="radiogroup"
                aria-label="Show prices in"
                className="inline-flex p-1 bg-white rounded-full shadow-sm ring-1 ring-gray-200"
            >
                {currencies.map((c) => {
                    const active = c.code === value;
                    return (
                        <button
                            key={c.code}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            title={c.region}
                            onClick={() => onChange(c.code)}
                            className={
                                "px-4 py-1.5 text-sm font-semibold rounded-full transition-colors " +
                                (active
                                    ? "bg-[var(--autisync-gold,#b98b2f)] text-white"
                                    : "text-gray-600 hover:text-gray-900")
                            }
                        >
                            {c.label} <span className="hidden sm:inline font-normal opacity-80">· {c.region}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

/** "From Kz 495.000" with a small note underneath (one-off terms by default). */
export function TierPrice({
    amount,
    currency,
    note = "one-off · 50% to start, 50% at launch",
}: {
    amount: number;
    currency: Currency;
    note?: string;
}) {
    return (
        <span className="block">
            <small className="block text-xs font-semibold uppercase tracking-wide text-[var(--autisync-gold,#b98b2f)]">
                From
            </small>
            <span className="text-4xl font-bold tracking-tight text-gray-900">
                {formatPrice(amount, currency)}
            </span>
            <span className="block mt-1 text-xs text-gray-500">{note}</span>
        </span>
    );
}

export function CarePlanNote({ currency }: { currency: Currency }) {
    return (
        <p className="max-w-3xl mx-auto mt-10 text-sm leading-6 text-center text-gray-600">
            Hosting and domain are free for the first year. After that, our{" "}
            <span className="font-semibold text-gray-800">Care Plan</span> keeps your site
            hosted, backed up, updated and secure, with 2 hours of changes a month, for{" "}
            <span className="font-semibold text-gray-800">
                {formatPrice(carePlanMonthly[currency], currency)}/month
            </span>
            .
        </p>
    );
}
