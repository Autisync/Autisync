/**
 * Website enquiries into the Autisync CRM.
 *
 * The contact form and the questionnaires used to send an email and nothing
 * else, so a lead from the website never appeared in the CRM, and the
 * Visitors report could not tie it to an ad or a post. Each accepted
 * submission is now also sent to the CRM's website intake
 * (POST /api/public/forms/contact), which makes the client, the conversation
 * and the follow-up there. Email still goes out as before: if the CRM is down
 * for a moment, nothing is lost.
 */
import { CRM_API } from "@/lib/booking";

export interface CrmLead {
    source: string;
    page: string;
    fullName: string;
    companyName?: string;
    email: string;
    phone?: string;
    businessLocation?: string;
    serviceInterestedIn?: string;
    budgetRange?: string;
    preferredContactMethod?: string;
    message?: string;
    utm?: { source?: string; medium?: string; campaign?: string };
    tracking?: { gclid?: string; fbclid?: string };
}

/** true when the CRM has it. Never throws: the email path carries on either way. */
export async function sendLeadToCrm(lead: CrmLead, ip: string, review = false): Promise<boolean> {
    try {
        const r = await fetch(`${CRM_API}/public/forms/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-Forwarded-For": ip },
            body: JSON.stringify({
                ...lead,
                // Flagged by the spam check but not rejected: kept, and marked.
                message: review ? `[Possible spam: check before replying]\n\n${lead.message || ""}`.slice(0, 5000) : (lead.message || "").slice(0, 5000),
                consent: true,
                utm: lead.utm || {},
                tracking: lead.tracking || {},
            }),
            signal: AbortSignal.timeout(8000),
        });
        if (!r.ok) console.warn("[crm] lead not accepted", r.status, await r.text().catch(() => ""));
        return r.ok;
    } catch (error) {
        console.warn("[crm] lead not sent", error instanceof Error ? error.message : error);
        return false;
    }
}

/** A questionnaire's answers as readable text, section by section. */
export function questionnaireText(
    title: string,
    sections: Array<{ title: string; fields: Array<{ id: string; label: string }> }>,
    answers: Record<string, string | string[]>,
): string {
    const lines: string[] = [title, ""];
    for (const s of sections) {
        const rows = s.fields
            .map((f) => {
                const v = answers[f.id];
                const text = Array.isArray(v) ? v.join(", ") : (v || "").trim();
                return text ? `${f.label}: ${text}` : "";
            })
            .filter(Boolean);
        if (rows.length) lines.push(`— ${s.title}`, ...rows, "");
    }
    return lines.join("\n").slice(0, 5000);
}
