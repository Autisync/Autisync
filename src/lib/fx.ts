"use client";

/**
 * Today's dollar rate for the price cards, from /api/fx (server-cached feed).
 *
 * A visitor in Luanda reads kwanza; the "≈ $397" underneath is for the many
 * who also think in dollars. Fetched once per page load and shared by every
 * card through a module-level promise, so one request serves all of them.
 */
import { useEffect, useState } from "react";
import type { Currency } from "./website-packages";

export type UsdRates = { rates: Partial<Record<Currency | "USD", number>>; asOf: string | null; fallback: boolean };

let cached: UsdRates | null = null;
let pending: Promise<UsdRates | null> | null = null;

function load(): Promise<UsdRates | null> {
    if (cached) return Promise.resolve(cached);
    if (!pending) {
        pending = fetch("/api/fx")
            .then((r) => (r.ok ? r.json() : null))
            .then((d) => {
                if (d && d.rates) cached = { rates: d.rates, asOf: d.asOf ?? null, fallback: !!d.fallback };
                return cached;
            })
            .catch(() => null);
    }
    return pending;
}

export function useUsdRates(): UsdRates | null {
    const [rates, setRates] = useState<UsdRates | null>(cached);
    useEffect(() => {
        let alive = true;
        if (!rates) void load().then((r) => { if (alive && r) setRates(r); });
        return () => { alive = false; };
    }, [rates]);
    return rates;
}

/** Which currencies get a dollar line. Pounds and euros do not need one. */
const SHOW_USD_FOR: Currency[] = ["AOA", "NAD"];

/** "≈ $397" for an amount in kwanza or N$; null for other currencies or before the rate arrives. */
export function approxUsd(amount: number, currency: Currency, rates: UsdRates | null): string | null {
    if (!SHOW_USD_FOR.includes(currency) || !rates) return null;
    const perUsd = rates.rates[currency];
    if (!perUsd || perUsd <= 0) return null;
    const usd = amount / perUsd;
    const rounded = usd >= 1000 ? Math.round(usd / 10) * 10 : Math.round(usd);
    return `≈ $${rounded.toLocaleString("en-US")}`;
}
