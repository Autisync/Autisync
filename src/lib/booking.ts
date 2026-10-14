// Booking with the Autisync CRM, straight from the website.
//
// The site no longer frames book.autisync.com in an iframe. It asks the CRM
// for the calendar (opening hours, services, booked times) through
// /api/booking/availability and sends the booking through /api/booking/book;
// both are thin pass-throughs to the CRM's public booking API, so the browser
// only ever talks to autisync.com and the CRM's CORS list stays as it is.
//
// The slot arithmetic is ported from the CRM (app/src/sections/booking/slots.ts
// and lib/availability.ts). Keep the two in step: the CRM decides what is
// stored and checks every booking against opening hours and overlaps, so a
// drift here shows a slot the server then refuses, never a double booking.

export const BOOKING_SLUG = "autisync-agency";
export const CRM_API = (process.env.CRM_API_URL || "https://api.autisync.com/api").replace(/\/$/, "");
export const FULL_BOOKING_PAGE = `https://book.autisync.com/apps/appointments/p/${BOOKING_SLUG}`;

export type Interval = { start: string; end: string };
export type Week = Record<string, Interval[]>;

export type Service = {
    id: string;
    name: string;
    description: string | null;
    duration_minutes: number;
    price: string | null;
    currency: string;
    is_paid: boolean;
};

export type Availability = {
    calendar: { name: string; timezone: string; availabilityRules: unknown };
    selectedLocationId?: string | null;
    bookedSlots: { starts_at: string; ends_at: string }[];
    services: Service[];
};

export type Slot = { starts: Date; ends: Date; label: string };

const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Accepts the CRM's current { week } shape and the older { days, start, end } one. */
export function normalizeAvailability(raw: unknown): { slotMinutes: number; week: Week } {
    const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
    const slotMinutes = Number(r.slotMinutes) > 0 ? Number(r.slotMinutes) : 30;
    const week: Week = { "0": [], "1": [], "2": [], "3": [], "4": [], "5": [], "6": [] };
    if (r.week && typeof r.week === "object") {
        for (const d of Object.keys(week)) {
            const list = (r.week as Record<string, unknown>)[d];
            if (Array.isArray(list)) {
                week[d] = list
                    .filter((p): p is Interval => !!p && TIME_RE.test((p as Interval).start) && TIME_RE.test((p as Interval).end) && (p as Interval).start < (p as Interval).end)
                    .sort((a, b) => a.start.localeCompare(b.start));
            }
        }
    } else if (Array.isArray(r.days) && TIME_RE.test(String(r.start)) && TIME_RE.test(String(r.end))) {
        for (const d of r.days as number[]) week[String(d)] = [{ start: String(r.start), end: String(r.end) }];
    }
    return { slotMinutes, week };
}

/** How far `timeZone` is from UTC at an instant, in ms (DST-aware via Intl). */
function zoneOffsetMs(at: Date, timeZone: string): number {
    try {
        const p = new Intl.DateTimeFormat("en-US", {
            timeZone, hour12: false, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit",
        }).formatToParts(at).reduce<Record<string, string>>((acc, x) => { if (x.type !== "literal") acc[x.type] = x.value; return acc; }, {});
        return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second) - at.getTime();
    } catch {
        return 0;
    }
}

/** The instant at which it is hh:mm on y-m-d in timeZone. */
export function wallTimeToInstant(y: number, m: number, d: number, hh: number, mm: number, timeZone: string): Date {
    const guess = Date.UTC(y, m - 1, d, hh, mm);
    const once = guess - zoneOffsetMs(new Date(guess), timeZone);
    return new Date(guess - zoneOffsetMs(new Date(once), timeZone));
}

/** "YYYY-MM-DD" for a calendar day. */
export const dayKey = (y: number, m: number, d: number) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

/** Weekday (0 = Sunday) of a calendar date; a date's weekday doesn't depend on the zone. */
export const weekdayOf = (y: number, m: number, d: number) => new Date(Date.UTC(y, m - 1, d)).getUTCDay();

export function isOpenDay(rules: unknown, y: number, m: number, d: number): boolean {
    return (normalizeAvailability(rules).week[String(weekdayOf(y, m, d))] || []).length > 0;
}

/** Free slots on one day, in the business's timezone. A booking must end inside the period it starts in. */
export function generateSlots(
    y: number, m: number, d: number,
    rules: unknown,
    booked: { starts_at: string; ends_at: string }[],
    durationMinutes: number,
    timeZone: string,
): Slot[] {
    const { slotMinutes, week } = normalizeAvailability(rules);
    const periods = week[String(weekdayOf(y, m, d))] || [];
    const duration = Number(durationMinutes) || slotMinutes;
    const now = Date.now();
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", hour12: false });
    const out: Slot[] = [];
    for (const p of periods) {
        const [sh, sm] = p.start.split(":").map(Number);
        const [eh, em] = p.end.split(":").map(Number);
        const pEnd = wallTimeToInstant(y, m, d, eh, em, timeZone).getTime();
        for (let t = wallTimeToInstant(y, m, d, sh, sm, timeZone).getTime(); t < pEnd; t += slotMinutes * 60_000) {
            const end = t + duration * 60_000;
            if (end > pEnd) break;
            if (t <= now) continue;
            const clash = booked.some((b) => t < new Date(b.ends_at).getTime() && end > new Date(b.starts_at).getTime());
            if (!clash) out.push({ starts: new Date(t), ends: new Date(end), label: fmt.format(t) });
        }
    }
    return out.sort((a, b) => a.starts.getTime() - b.starts.getTime());
}
