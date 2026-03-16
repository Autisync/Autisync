import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// ─── Payload schema ────────────────────────────────────────────────────────────
// This schema is the canonical shape shared between the frontend form and the
// API. When the Autisync CRM is ready, this same shape is forwarded to it.

const ContactSchema = z.object({
    source: z.string().default("website-contact"),
    page: z.string().default("/contact"),
    fullName: z.string().min(1, "Full name is required."),
    companyName: z.string().optional().default(""),
    email: z.string().email("A valid email address is required."),
    phone: z.string().optional().default(""),
    businessLocation: z.string().optional().default(""),
    serviceInterestedIn: z.string().min(1, "Service selection is required."),
    budgetRange: z.string().optional().default(""),
    preferredContactMethod: z.string().optional().default(""),
    message: z.string().optional().default(""),
    consent: z.literal(true, { message: "Consent must be given before submitting." }),
    utm: z
        .object({
            source: z.string().optional().default(""),
            medium: z.string().optional().default(""),
            campaign: z.string().optional().default(""),
        })
        .optional()
        .default({ source: "", medium: "", campaign: "" }),
    tracking: z
        .object({
            gclid: z.string().optional().default(""),
            fbclid: z.string().optional().default(""),
        })
        .optional()
        .default({ gclid: "", fbclid: "" }),
});

type ContactPayload = z.infer<typeof ContactSchema>;

// ─── Email helpers ─────────────────────────────────────────────────────────────

function fmt(val: string | undefined): string {
    return val?.trim() || "—";
}

function buildText(d: ContactPayload): string {
    const utm = d.utm ?? {};
    const trk = d.tracking ?? {};
    return [
        "NEW CONTACT FORM SUBMISSION",
        "=".repeat(44),
        "",
        `Full Name:               ${fmt(d.fullName)}`,
        `Company Name:            ${fmt(d.companyName)}`,
        `Email:                   ${fmt(d.email)}`,
        `Phone:                   ${fmt(d.phone)}`,
        `Business Location:       ${fmt(d.businessLocation)}`,
        "",
        `Service Interested In:   ${fmt(d.serviceInterestedIn)}`,
        `Budget Range:            ${fmt(d.budgetRange)}`,
        `Preferred Contact:       ${fmt(d.preferredContactMethod)}`,
        "",
        "── MESSAGE ──",
        fmt(d.message),
        "",
        "── TRACKING ──",
        `Source:                  ${fmt(d.source)}`,
        `Page:                    ${fmt(d.page)}`,
        `UTM Source:              ${fmt(utm.source)}`,
        `UTM Medium:              ${fmt(utm.medium)}`,
        `UTM Campaign:            ${fmt(utm.campaign)}`,
        `GCLID:                   ${fmt(trk.gclid)}`,
        `FBCLID:                  ${fmt(trk.fbclid)}`,
        "",
        `Submitted:               ${new Date().toISOString()}`,
    ].join("\n");
}

function buildHtml(d: ContactPayload): string {
    const utm = d.utm ?? {};
    const trk = d.tracking ?? {};

    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #f0ede8;width:38%;vertical-align:top;">
          <span style="font-size:12px;color:#7a6040;font-weight:600;">${label}</span>
        </td>
        <td style="padding:10px 14px;border-bottom:1px solid #f0ede8;vertical-align:top;">
          <span style="font-size:13px;color:#2d2d2d;">${value || "—"}</span>
        </td>
      </tr>`;

    const section = (title: string, rows: string) => `
      <div style="margin-bottom:28px;">
        <div style="background:linear-gradient(to right,#7a5a1d,#d1a94c);height:3px;border-radius:3px;"></div>
        <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:0 0 8px 8px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
          <thead>
            <tr>
              <th colspan="2" style="padding:12px 14px;background:#fdf9f3;text-align:left;font-size:13px;font-weight:700;color:#b98b2f;letter-spacing:0.04em;border-bottom:1px solid #f0ede8;">
                ${title}
              </th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;

    const contactSection = section(
        "Contact Details",
        row("Full Name", fmt(d.fullName)) +
        row("Company Name", fmt(d.companyName)) +
        row("Email", `<a href="mailto:${d.email}" style="color:#b98b2f;">${d.email}</a>`) +
        row("Phone", fmt(d.phone)) +
        row("Business Location", fmt(d.businessLocation))
    );

    const enquirySection = section(
        "Enquiry Details",
        row("Service Interested In", fmt(d.serviceInterestedIn)) +
        row("Budget Range", fmt(d.budgetRange)) +
        row("Preferred Contact Method", fmt(d.preferredContactMethod))
    );

    const messageSection = section(
        "Message",
        row("Message", `<span style="white-space:pre-wrap;">${fmt(d.message)}</span>`)
    );

    const hasTracking = utm.source || utm.medium || utm.campaign || trk.gclid || trk.fbclid;
    const trackingSection = hasTracking
        ? section(
            "Tracking",
            row("Source", fmt(d.source)) +
            row("Page", fmt(d.page)) +
            row("UTM Source", fmt(utm.source)) +
            row("UTM Medium", fmt(utm.medium)) +
            row("UTM Campaign", fmt(utm.campaign)) +
            row("GCLID", fmt(trk.gclid)) +
            row("FBCLID", fmt(trk.fbclid))
        )
        : "";

    const receivedAt = new Date();

    return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ec;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:640px;">

        <tr><td style="background:linear-gradient(135deg,#7a5a1d,#d1a94c);border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.75);">New Submission</p>
          <h1 style="margin:0;font-size:22px;font-weight:700;color:#fff;">New Website Lead — Autisync</h1>
          <p style="margin:8px 0 0;font-size:12px;color:rgba(255,255,255,0.65);">
            Received ${receivedAt.toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            at ${receivedAt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </td></tr>

        <tr><td style="background:#f4f1ec;padding:24px 0;">
          ${contactSection}
          ${enquirySection}
          ${messageSection}
          ${trackingSection}
        </td></tr>

        <tr><td style="background:#fff;border-radius:0 0 12px 12px;padding:20px 32px;text-align:center;border-top:1px solid #f0ede8;">
          <p style="margin:0;font-size:11px;color:#aaa;">
            Sent automatically by the Autisync website contact form.<br>
            Reply directly to <a href="mailto:${d.email}" style="color:#b98b2f;">${d.email}</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildConfirmationText(d: ContactPayload): string {
    const supportEmail = process.env.OUTLOOK_SUPPORT_EMAIL ?? "support@austisync.com";
        return [
                `Hi ${d.fullName || "there"},`,
                "",
                "Thank you for contacting Autisync.",
                "We have received your enquiry and a member of our team will contact you shortly.",
                "",
                "Submission summary:",
                `- Service interested in: ${fmt(d.serviceInterestedIn)}`,
                `- Preferred contact method: ${fmt(d.preferredContactMethod)}`,
                `- Budget range: ${fmt(d.budgetRange)}`,
                "",
                `If you need to add anything else, reply to ${supportEmail}.`,
                "",
                "Autisync Team",
        ].join("\n");
}

function buildConfirmationHtml(d: ContactPayload): string {
            const supportEmail = process.env.OUTLOOK_SUPPORT_EMAIL ?? "support@austisync.com";
        const fullName = d.fullName || "there";
        return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ec;padding:32px 16px;">
        <tr><td align="center">
            <table width="100%" style="max-width:640px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
                <tr><td style="background:linear-gradient(135deg,#7a5a1d,#d1a94c);padding:28px 32px;text-align:center;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.75);">Autisync</p>
                    <h1 style="margin:0;font-size:22px;font-weight:700;color:#fff;">We Received Your Message</h1>
                </td></tr>
                <tr><td style="padding:26px 32px;color:#2d2d2d;">
                    <p style="margin:0 0 12px;font-size:15px;line-height:1.65;">Hi ${fullName},</p>
                    <p style="margin:0 0 12px;font-size:15px;line-height:1.65;">
                        Thank you for contacting Autisync. We have received your enquiry and a member of our team will be in touch shortly.
                    </p>
                    <p style="margin:0 0 12px;font-size:15px;line-height:1.65;">Here is a quick summary of your request:</p>

                    <table style="width:100%;border-collapse:collapse;background:#fdf9f3;border:1px solid #f0ede8;border-radius:8px;overflow:hidden;">
                        <tr>
                            <td style="padding:10px 14px;border-bottom:1px solid #f0ede8;width:42%;font-size:12px;color:#7a6040;font-weight:600;">Service Interested In</td>
                            <td style="padding:10px 14px;border-bottom:1px solid #f0ede8;font-size:13px;color:#2d2d2d;">${fmt(d.serviceInterestedIn)}</td>
                        </tr>
                        <tr>
                            <td style="padding:10px 14px;border-bottom:1px solid #f0ede8;width:42%;font-size:12px;color:#7a6040;font-weight:600;">Preferred Contact Method</td>
                            <td style="padding:10px 14px;border-bottom:1px solid #f0ede8;font-size:13px;color:#2d2d2d;">${fmt(d.preferredContactMethod)}</td>
                        </tr>
                        <tr>
                            <td style="padding:10px 14px;width:42%;font-size:12px;color:#7a6040;font-weight:600;">Budget Range</td>
                            <td style="padding:10px 14px;font-size:13px;color:#2d2d2d;">${fmt(d.budgetRange)}</td>
                        </tr>
                    </table>

                    <p style="margin:14px 0 0;font-size:14px;line-height:1.65;color:#5a5a5a;">
                        If you need to add anything else, contact us at
                        <a href="mailto:${supportEmail}" style="color:#b98b2f;">${supportEmail}</a>.
                    </p>
                    <p style="margin:14px 0 0;font-size:14px;line-height:1.65;color:#5a5a5a;">Autisync Team</p>
                </td></tr>
            </table>
        </td></tr>
    </table>
</body>
</html>`;
}

interface GraphMessage {
        subject: string;
        html: string;
        to: string;
        replyTo?: string;
}

async function sendGraphMessage(accessToken: string, fromEmail: string, message: GraphMessage): Promise<void> {
        const mailRes = await fetch(
                `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(fromEmail)}/sendMail`,
                {
                        method: "POST",
                        headers: {
                                Authorization: `Bearer ${accessToken}`,
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                                message: {
                                        subject: message.subject,
                                        body: { contentType: "HTML", content: message.html },
                                        toRecipients: [{ emailAddress: { address: message.to } }],
                                        ...(message.replyTo
                                                ? { replyTo: [{ emailAddress: { address: message.replyTo } }] }
                                                : {}),
                                },
                                saveToSentItems: false,
                        }),
                }
        );

        if (!mailRes.ok) {
                const body = await mailRes.text();
                throw new Error(`Graph sendMail failed (${mailRes.status}): ${body}`);
        }
}

// ─── Microsoft Graph API sender ───────────────────────────────────────────────
// Used when MICROSOFT_TENANT_ID / CLIENT_ID / CLIENT_SECRET are set.
// Works even when SMTP AUTH is disabled at the tenant level (the default for
// Microsoft 365 tenants with modern security policies).
//
// Setup (one-time, ~5 minutes):
//   1. Azure Portal → Entra ID → App registrations → New registration
//      Name: "Autisync Website Mailer"  |  Account type: single tenant
//   2. API permissions → Add → Microsoft Graph → Application → Mail.Send → Grant admin consent
//   3. Certificates & secrets → New client secret → copy the VALUE (not the ID)
//   4. Overview → copy Application (client) ID and Directory (tenant) ID
//   5. Add the three env vars below to .env.local
//
// The sending mailbox (OUTLOOK_FROM_EMAIL) must be a licensed M365 user in your tenant.

async function sendViaGraphApi(
    data: ContactPayload,
    fromEmail: string,
    toEmail: string,
    noReplyEmail: string,
    supportEmail: string
): Promise<void> {
    const tenantId     = process.env.MICROSOFT_TENANT_ID!;
    const clientId     = process.env.MICROSOFT_CLIENT_ID!;
    const clientSecret = process.env.MICROSOFT_CLIENT_SECRET!;

    // 1. Obtain an access token using the client credentials flow
    const tokenRes = await fetch(
        `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type:    "client_credentials",
                client_id:     clientId,
                client_secret: clientSecret,
                scope:         "https://graph.microsoft.com/.default",
            }),
        }
    );

    if (!tokenRes.ok) {
        const body = await tokenRes.text();
        throw new Error(`Graph token request failed (${tokenRes.status}): ${body}`);
    }

    const { access_token } = (await tokenRes.json()) as { access_token: string };

    // 2. Send internal lead notification
    await sendGraphMessage(access_token, fromEmail, {
        subject: `New Website Lead — ${data.fullName} | Autisync`,
        html: buildHtml(data),
        to: toEmail,
        replyTo: data.email,
    });

    // 3. Send user confirmation email from noreply mailbox
    await sendGraphMessage(access_token, noReplyEmail, {
        subject: "We received your message - Autisync",
        html: buildConfirmationHtml(data),
        to: data.email,
        replyTo: supportEmail,
    });
}

// ─── Generic SMTP sender (fallback for non-Microsoft providers) ───────────────
// Uses Nodemailer. Only reached if Graph API env vars are NOT set.
// Note: will NOT work with Microsoft 365 tenants that have SMTP AUTH disabled.

async function sendViaSmtp(
    data: ContactPayload,
    fromEmail: string,
    toEmail: string,
    noReplyEmail: string,
    supportEmail: string
): Promise<void> {
    const transporter = nodemailer.createTransport({
        host:   process.env.OUTLOOK_SMTP_HOST,
        port:   Number(process.env.OUTLOOK_SMTP_PORT ?? 587),
        secure: process.env.OUTLOOK_SMTP_PORT === "465",
        auth: {
            user: process.env.OUTLOOK_SMTP_USER,
            pass: process.env.OUTLOOK_SMTP_PASS,
        },
    });

    await transporter.sendMail({
        from:    `"Autisync Website" <${fromEmail}>`,
        to:      toEmail,
        replyTo: data.email,
        subject: `New Website Lead — ${data.fullName} | Autisync`,
        text:    buildText(data),
        html:    buildHtml(data),
    });

    await transporter.sendMail({
        from:    `"Autisync" <${noReplyEmail}>`,
        to:      data.email,
        replyTo: supportEmail,
        subject: "We received your message - Autisync",
        text:    buildConfirmationText(data),
        html:    buildConfirmationHtml(data),
    });
}

// ─── CRM forward (future — disabled until CRM backend is live) ─────────────────
// When the Autisync CRM is ready:
//   1. Set AUTISYNC_CRM_ENABLED=true, AUTISYNC_CRM_URL, AUTISYNC_CRM_API_KEY
//   2. Uncomment the forwardToCRM call in the handler below
//
// async function forwardToCRM(payload: ContactPayload): Promise<void> {
//     const res = await fetch(`${process.env.AUTISYNC_CRM_URL}/api/public/forms/contact`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "x-api-key": process.env.AUTISYNC_CRM_API_KEY! },
//         body: JSON.stringify(payload),
//     });
//     if (!res.ok) throw new Error(`CRM responded with HTTP ${res.status}`);
// }

// ─── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
    // 1. Parse request body
    let raw: unknown;
    try {
        raw = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    // 2. Validate with Zod
    const parsed = ContactSchema.safeParse(raw);
    if (!parsed.success) {
        const firstError = parsed.error.issues[0];
        return NextResponse.json({ error: firstError?.message ?? "Invalid form data." }, { status: 422 });
    }
    const data = parsed.data;

    const fromEmail = process.env.OUTLOOK_FROM_EMAIL ?? process.env.OUTLOOK_SMTP_USER ?? "";
    const toEmail   = process.env.OUTLOOK_TO_EMAIL   ?? "info@autisync.com";
    const noReplyEmail = process.env.OUTLOOK_NOREPLY_EMAIL ?? fromEmail;
    const supportEmail = process.env.OUTLOOK_SUPPORT_EMAIL ?? "support@austisync.com";

    // 3. Choose sender: Graph API (preferred for M365) → SMTP fallback
    const useGraph =
        process.env.MICROSOFT_TENANT_ID &&
        process.env.MICROSOFT_CLIENT_ID &&
        process.env.MICROSOFT_CLIENT_SECRET;

    const useSmtp =
        process.env.OUTLOOK_SMTP_HOST &&
        process.env.OUTLOOK_SMTP_USER &&
        process.env.OUTLOOK_SMTP_PASS;

    if (!useGraph && !useSmtp) {
        console.error("[contact] No email transport configured.");
        return NextResponse.json(
            { error: "Email service is not configured. Please contact us directly at info@autisync.com." },
            { status: 503 }
        );
    }

    try {
        if (useGraph) {
            await sendViaGraphApi(data, fromEmail, toEmail, noReplyEmail, supportEmail);
        } else {
            await sendViaSmtp(data, fromEmail, toEmail, noReplyEmail, supportEmail);
        }
    } catch (err) {
        console.error("[contact] send error:", err);

        const message = err instanceof Error ? err.message : "";
        if (message.includes("AADSTS7000215") || message.includes("invalid_client")) {
            return NextResponse.json(
                {
                    error:
                        "Email service is misconfigured: MICROSOFT_CLIENT_SECRET must be the Azure client secret VALUE (not the secret ID).",
                },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { error: "Failed to send your message. Please try again or email us directly." },
            { status: 500 }
        );
    }

    // 4. Future: forward payload to Autisync CRM (non-fatal if it fails)
    // if (process.env.AUTISYNC_CRM_ENABLED === "true") {
    //     try { await forwardToCRM(data); }
    //     catch (err) { console.warn("[contact] CRM forward failed:", err); }
    // }

    return NextResponse.json({ ok: true }, { status: 200 });
}
