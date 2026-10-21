"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

/**
 * Vercel Web Analytics, honouring the same choices as the CRM's tracker
 * (t.js): nothing is sent when the visitor has switched measurement off on
 * the privacy policy (localStorage "autisync_track_ignore" = "1", see
 * PrivacyPolicy/MeasurementChoice.tsx) or when the browser sends Global
 * Privacy Control or Do Not Track. The privacy policy says so; keep the two
 * in step.
 */
function measurementAllowed(): boolean {
    try {
        const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
        if (nav.globalPrivacyControl || nav.doNotTrack === "1") return false;
    } catch { /* no navigator: carry on */ }
    try {
        if (localStorage.getItem("autisync_track_ignore") === "1") return false;
    } catch { /* storage blocked: no choice saved */ }
    return true;
}

export default function SiteAnalytics() {
    return <Analytics beforeSend={(event: BeforeSendEvent) => (measurementAllowed() ? event : null)} />;
}
