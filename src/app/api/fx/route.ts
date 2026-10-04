import { NextResponse } from "next/server";

/**
 * GET /api/fx — how many kwanza (and N$, £, €) one US dollar buys today.
 *
 * The price cards show "≈ $397" under a kwanza figure so a visitor who thinks
 * in dollars is not left doing the sum. The kwanza moves, so the rate is not
 * typed into the code: it comes from ExchangeRate-API's open feed (daily, no
 * key), cached on the server for twelve hours. If the feed is down the last
 * known figures below are used and the response says so.
 */
const FEED = "https://open.er-api.com/v6/latest/USD";
const WANTED = ["AOA", "NAD", "GBP", "EUR"] as const;

/** Last known rates (Oct 2026), used only when the feed cannot be reached. */
const FALLBACK: Record<(typeof WANTED)[number], number> = { AOA: 927, NAD: 17.4, GBP: 0.79, EUR: 0.88 };

export const revalidate = 43200;

export async function GET() {
    try {
        const res = await fetch(FEED, { next: { revalidate }, headers: { "User-Agent": "autisync.com" } });
        if (!res.ok) throw new Error(`feed ${res.status}`);
        const data = (await res.json()) as { result?: string; rates?: Record<string, number>; time_last_update_utc?: string };
        if (data.result !== "success" || !data.rates) throw new Error("feed shape");
        const rates: Record<string, number> = {};
        for (const code of WANTED) {
            const r = Number(data.rates[code]);
            rates[code] = Number.isFinite(r) && r > 0 ? r : FALLBACK[code];
        }
        return NextResponse.json(
            { base: "USD", rates, asOf: data.time_last_update_utc ? new Date(data.time_last_update_utc).toISOString().slice(0, 10) : null, source: "exchangerate-api.com", fallback: false },
            { headers: { "Cache-Control": "public, max-age=3600, s-maxage=43200, stale-while-revalidate=86400" } },
        );
    } catch {
        return NextResponse.json(
            { base: "USD", rates: FALLBACK, asOf: null, source: "fallback", fallback: true },
            { headers: { "Cache-Control": "public, max-age=600" } },
        );
    }
}
