import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

import { getRateLimiter } from "@/lib/security/rate-limit";
import { getRequestMeta } from "@/lib/security/request-meta";
import { assessSpam, SpamDecision } from "@/lib/security/spam-score";
import { verifyTurnstile } from "@/lib/security/turnstile";

const MIN_HUMAN_SUBMIT_MS = 3_000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;

const trimOptional = (max: number) =>
  z
    .union([z.string(), z.null(), z.undefined()])
    .transform((value) => (typeof value === "string" ? value.trim() : ""))
    .refine((value) => value.length <= max);

const trimRequired = (max: number) =>
  z
    .string()
    .transform((value) => value.trim())
    .pipe(z.string().min(1).max(max));

const normalizePhone = (value: string): string =>
  value.replace(/[^\d+\s().-]/g, "").replace(/\s+/g, " ").trim().slice(0, 40);

const ContactSchema = z.object({
  source: trimOptional(80).transform((value) => value || "website-contact"),
  page: trimOptional(120).transform((value) => value || "/contact"),
  fullName: trimRequired(120),
  companyName: trimOptional(120),
  email: trimRequired(254).transform((value) => value.toLowerCase()).pipe(z.string().email()),
  phone: trimOptional(120).transform((value) => normalizePhone(value)),
  businessLocation: trimOptional(120),
  serviceInterestedIn: trimRequired(120),
  budgetRange: trimOptional(120),
  preferredContactMethod: trimOptional(120),
  message: trimOptional(3000),
  consent: z.literal(true),
  website: trimOptional(256),
  form_started_at: z.coerce.number().int().positive(),
  turnstileToken: trimRequired(2048),
  utm: z
    .object({
      source: trimOptional(120),
      medium: trimOptional(120),
      campaign: trimOptional(120),
    })
    .optional()
    .default({ source: "", medium: "", campaign: "" }),
  tracking: z
    .object({
      gclid: trimOptional(120),
      fbclid: trimOptional(120),
    })
    .optional()
    .default({ gclid: "", fbclid: "" }),
});

type ContactPayload = z.infer<typeof ContactSchema>;

interface InternalLeadMeta {
  decision: SpamDecision;
  score: number;
  reasons: string[];
  ip: string;
  userAgent: string;
}

function invalidSubmission(status = 400) {
  return NextResponse.json({ ok: false, error: "Invalid submission." }, { status });
}

function processingError(status = 500) {
  return NextResponse.json({ ok: false, error: "Unable to process request." }, { status });
}

function fmt(val: string | undefined): string {
  return val?.trim() || "-";
}

function buildText(d: ContactPayload, meta?: InternalLeadMeta): string {
  const utm = d.utm ?? {};
  const trk = d.tracking ?? {};
  const lines = [
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
    "-- MESSAGE --",
    fmt(d.message),
    "",
    "-- TRACKING --",
    `Source:                  ${fmt(d.source)}`,
    `Page:                    ${fmt(d.page)}`,
    `UTM Source:              ${fmt(utm.source)}`,
    `UTM Medium:              ${fmt(utm.medium)}`,
    `UTM Campaign:            ${fmt(utm.campaign)}`,
    `GCLID:                   ${fmt(trk.gclid)}`,
    `FBCLID:                  ${fmt(trk.fbclid)}`,
  ];

  if (meta) {
    lines.push(
      "",
      "-- SECURITY --",
      `Decision:                ${meta.decision}`,
      `Spam score:              ${meta.score}`,
      `Reasons:                 ${meta.reasons.join(", ") || "none"}`,
      `Client IP:               ${meta.ip}`,
      `User Agent:              ${meta.userAgent}`
    );
  }

  lines.push("", `Submitted:               ${new Date().toISOString()}`);
  return lines.join("\n");
}

function buildHtml(d: ContactPayload, meta?: InternalLeadMeta): string {
  const utm = d.utm ?? {};
  const trk = d.tracking ?? {};

  const row = (label: string, value: string) => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #f0ede8;width:38%;vertical-align:top;">
          <span style="font-size:12px;color:#7a6040;font-weight:600;">${label}</span>
        </td>
        <td style="padding:10px 14px;border-bottom:1px solid #f0ede8;vertical-align:top;">
          <span style="font-size:13px;color:#2d2d2d;">${value || "-"}</span>
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

  const messageSection = section("Message", row("Message", `<span style="white-space:pre-wrap;">${fmt(d.message)}</span>`));

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

  const securitySection = meta
    ? section(
        "Security Review",
        row("Decision", meta.decision) +
          row("Spam Score", String(meta.score)) +
          row("Reasons", meta.reasons.join(", ") || "none") +
          row("Client IP", meta.ip) +
          row("User Agent", meta.userAgent)
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
          <h1 style="margin:0;font-size:22px;font-weight:700;color:#fff;">New Website Lead - Autisync</h1>
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
          ${securitySection}
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
  const mailRes = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(fromEmail)}/sendMail`, {
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
        ...(message.replyTo ? { replyTo: [{ emailAddress: { address: message.replyTo } }] } : {}),
      },
      saveToSentItems: false,
    }),
  });

  if (!mailRes.ok) {
    const body = await mailRes.text();
    throw new Error(`Graph sendMail failed (${mailRes.status}): ${body}`);
  }
}

async function sendViaGraphApi(
  data: ContactPayload,
  fromEmail: string,
  toEmail: string,
  noReplyEmail: string,
  supportEmail: string,
  internalMeta: InternalLeadMeta,
  reviewPrefix: string
): Promise<void> {
  const tenantId = process.env.MICROSOFT_TENANT_ID!;
  const clientId = process.env.MICROSOFT_CLIENT_ID!;
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET!;

  const tokenRes = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      scope: "https://graph.microsoft.com/.default",
    }),
  });

  if (!tokenRes.ok) {
    const body = await tokenRes.text();
    throw new Error(`Graph token request failed (${tokenRes.status}): ${body}`);
  }

  const { access_token } = (await tokenRes.json()) as { access_token: string };

  await sendGraphMessage(access_token, fromEmail, {
    subject: `${reviewPrefix}New Website Lead - ${data.fullName} | Autisync`,
    html: buildHtml(data, internalMeta),
    to: toEmail,
    replyTo: data.email,
  });

  await sendGraphMessage(access_token, noReplyEmail, {
    subject: "We received your message - Autisync",
    html: buildConfirmationHtml(data),
    to: data.email,
    replyTo: supportEmail,
  });
}

async function sendViaSmtp(
  data: ContactPayload,
  fromEmail: string,
  toEmail: string,
  noReplyEmail: string,
  supportEmail: string,
  internalMeta: InternalLeadMeta,
  reviewPrefix: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.OUTLOOK_SMTP_HOST,
    port: Number(process.env.OUTLOOK_SMTP_PORT ?? 587),
    secure: process.env.OUTLOOK_SMTP_PORT === "465",
    auth: {
      user: process.env.OUTLOOK_SMTP_USER,
      pass: process.env.OUTLOOK_SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Autisync Website" <${fromEmail}>`,
    to: toEmail,
    replyTo: data.email,
    subject: `${reviewPrefix}New Website Lead - ${data.fullName} | Autisync`,
    text: buildText(data, internalMeta),
    html: buildHtml(data, internalMeta),
  });

  await transporter.sendMail({
    from: `"Autisync" <${noReplyEmail}>`,
    to: data.email,
    replyTo: supportEmail,
    subject: "We received your message - Autisync",
    text: buildConfirmationText(data),
    html: buildConfirmationHtml(data),
  });
}

export async function POST(req: NextRequest) {
  const { ip, userAgent } = getRequestMeta(req);

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return invalidSubmission();
  }

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    return invalidSubmission(422);
  }

  const data = parsed.data;

  if (data.website) {
    console.warn("[contact] honeypot triggered", { ip });
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const formAgeMs = Date.now() - data.form_started_at;
  if (!Number.isFinite(formAgeMs) || formAgeMs < MIN_HUMAN_SUBMIT_MS || formAgeMs > MAX_FORM_AGE_MS) {
    console.warn("[contact] failed human-time gate", { ip, formAgeMs });
    return invalidSubmission();
  }

  const turnstileOk = await verifyTurnstile({ token: data.turnstileToken, ip });
  if (!turnstileOk) {
    return invalidSubmission();
  }

  const limiter = getRateLimiter();
  const ipKey = `contact:ip:${ip}`;
  const emailKey = `contact:email:${data.email}`;
  const ipRecentCount = limiter.getRecentCount(ipKey, 10 * 60 * 1000);

  const ipRate = limiter.consume(ipKey, 5, 10 * 60 * 1000);
  if (!ipRate.ok) {
    console.warn("[contact] ip rate limit exceeded", { ip });
    return invalidSubmission(429);
  }

  const emailRate = limiter.consume(emailKey, 3, 60 * 60 * 1000);
  if (!emailRate.ok) {
    console.warn("[contact] email rate limit exceeded", { email: data.email, ip });
    return invalidSubmission(429);
  }

  const spam = assessSpam({
    email: data.email,
    ipRecentCount,
    textFields: [
      data.fullName,
      data.companyName,
      data.message,
      data.businessLocation,
      data.serviceInterestedIn,
    ],
  });

  if (spam.decision === "rejected") {
    console.warn("[contact] rejected spam submission", { ip, email: data.email, score: spam.score, reasons: spam.reasons });
    // Extension point: status can be forwarded to CRM/n8n/Nextcloud as "rejected" later.
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const fromEmail = process.env.OUTLOOK_FROM_EMAIL ?? process.env.OUTLOOK_SMTP_USER ?? "";
  const toEmail = process.env.OUTLOOK_TO_EMAIL ?? "info@autisync.com";
  const noReplyEmail = process.env.OUTLOOK_NOREPLY_EMAIL ?? fromEmail;
  const supportEmail = process.env.OUTLOOK_SUPPORT_EMAIL ?? "support@austisync.com";

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
    return processingError(503);
  }

  const reviewPrefix = spam.decision === "review" ? "[REVIEW] " : "";
  const internalMeta: InternalLeadMeta = {
    decision: spam.decision,
    score: spam.score,
    reasons: spam.reasons,
    ip,
    userAgent,
  };

  try {
    if (useGraph) {
      await sendViaGraphApi(data, fromEmail, toEmail, noReplyEmail, supportEmail, internalMeta, reviewPrefix);
    } else {
      await sendViaSmtp(data, fromEmail, toEmail, noReplyEmail, supportEmail, internalMeta, reviewPrefix);
    }
  } catch (error) {
    console.error("[contact] send error:", error);
    return processingError(500);
  }

  // Extension point: accepted/review status can be sent to CRM/n8n/EspoCRM/Nextcloud.
  // Example status values: "accepted" | "review" | "rejected".

  return NextResponse.json({ ok: true }, { status: 200 });
}
