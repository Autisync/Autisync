import { NextRequest, NextResponse } from "next/server";
import { BOOKING_SLUG, CRM_API } from "@/lib/booking";
import { getRateLimiter } from "@/lib/security/rate-limit";
import { getClientIp } from "@/lib/security/request-meta";

// Sends a booking to the CRM. The CRM validates everything again (opening
// hours, overlaps, service) and creates the client, the booking and the
// confirmation email; this route only limits abuse and forwards known fields.
const FIELDS = ["fullName", "email", "phone", "notes", "startsAt", "endsAt", "timezone", "serviceId", "locationId", "language", "utm_source", "utm_medium", "utm_campaign"] as const;

export async function POST(req: NextRequest) {
    const limit = getRateLimiter().consume(`booking:${getClientIp(req)}`, 5, 10 * 60_000);
    if (!limit.ok) {
        return NextResponse.json({ error: "Too many tries. Please wait a few minutes and try again." }, { status: 429 });
    }
    const input = await req.json().catch(() => null);
    if (!input || typeof input !== "object") {
        return NextResponse.json({ error: "Something went wrong sending your booking. Please try again." }, { status: 400 });
    }
    // Hidden field people never see; bots fill it. Pretend it worked.
    if (String(input.website || "").trim()) return NextResponse.json({ ok: true }, { status: 201 });

    const body: Record<string, string> = {};
    for (const k of FIELDS) {
        const v = input[k];
        if (typeof v === "string" && v.trim()) body[k] = v.trim().slice(0, k === "notes" ? 2000 : 200);
    }

    try {
        const r = await fetch(`${CRM_API}/bookings/public/${BOOKING_SLUG}/book`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-Forwarded-For": getClientIp(req) },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(15_000),
        });
        const data = await r.json().catch(() => ({}));
        if (r.ok) {
            return NextResponse.json({ ok: true, startsAt: data.booking?.starts_at ?? body.startsAt }, { status: 201 });
        }
        if (r.status === 409) {
            return NextResponse.json({ error: "Someone has just taken that time. Please pick another.", taken: true }, { status: 409 });
        }
        const message = data.error || data.errors?.[0]?.msg || "We couldn't book that time. Please try again or message us on WhatsApp.";
        return NextResponse.json({ error: message }, { status: r.status === 400 ? 400 : 502 });
    } catch {
        return NextResponse.json({ error: "The calendar is not answering right now. Please try again or message us on WhatsApp." }, { status: 502 });
    }
}
