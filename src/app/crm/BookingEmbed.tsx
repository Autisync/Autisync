"use client";

import { useEffect, useRef } from "react";

const BOOKING_ORIGIN = "https://book.autisync.com";
const BOOKING_URL = `${BOOKING_ORIGIN}/apps/appointments/p/autisync-agency?embed=1`;

/**
 * Autisync booking calendar. The embedded page posts
 * { type: "autisync:booking:height", height } so the frame can grow to fit
 * its content without an inner scrollbar.
 */
export default function BookingEmbed() {
    const frameRef = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
        function onMessage(event: MessageEvent) {
            // Only trust resize messages from the booking site itself.
            if (event.origin !== BOOKING_ORIGIN) return;
            const data = event.data as { type?: string; height?: unknown } | null;
            if (!data || data.type !== "autisync:booking:height") return;
            const height = Number(data.height);
            if (!Number.isFinite(height) || height <= 0) return;
            if (frameRef.current) frameRef.current.style.height = `${Math.min(Math.ceil(height), 4000)}px`;
        }
        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
    }, []);

    return (
        <iframe
            ref={frameRef}
            id="autisync-booking"
            src={BOOKING_URL}
            title="Book an appointment"
            loading="lazy"
            style={{ width: "100%", border: 0, minHeight: 640, overflow: "hidden", display: "block" }}
        />
    );
}
