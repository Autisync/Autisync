import { NextRequest, NextResponse } from "next/server";
import { BOOKING_SLUG, CRM_API } from "@/lib/booking";

// Pass-through to the CRM's public availability for Autisync's own calendar.
// Only the fields the booking section needs go back to the browser.
export async function GET(req: NextRequest) {
    const date = req.nextUrl.searchParams.get("date") || "";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return NextResponse.json({ error: "Pick a day to see free times." }, { status: 400 });
    }
    try {
        const r = await fetch(`${CRM_API}/bookings/public/${BOOKING_SLUG}/availability?date=${date}`, {
            cache: "no-store",
            signal: AbortSignal.timeout(10_000),
        });
        const data = await r.json().catch(() => null);
        if (!r.ok || !data) {
            return NextResponse.json({ error: "The calendar is not answering right now." }, { status: 502 });
        }
        return NextResponse.json({
            calendar: {
                name: data.calendar?.name,
                timezone: data.calendar?.timezone || "Europe/London",
                availabilityRules: data.calendar?.availabilityRules,
            },
            selectedLocationId: data.selectedLocationId ?? null,
            bookedSlots: (data.bookedSlots || []).map((b: { starts_at: string; ends_at: string }) => ({ starts_at: b.starts_at, ends_at: b.ends_at })),
            services: (data.services || []).map((s: Record<string, unknown>) => ({
                id: s.id, name: s.name, description: s.description, duration_minutes: s.duration_minutes,
                price: s.price, currency: s.currency, is_paid: s.is_paid,
            })),
        }, { headers: { "Cache-Control": "no-store" } });
    } catch {
        return NextResponse.json({ error: "The calendar is not answering right now." }, { status: 502 });
    }
}
