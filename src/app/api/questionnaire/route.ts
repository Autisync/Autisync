import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

import { getRateLimiter } from "@/lib/security/rate-limit";
import { getRequestMeta } from "@/lib/security/request-meta";
import {
  assessSpam,
  extractEmailFromQuestionnaireAnswers,
  SpamDecision,
} from "@/lib/security/spam-score";
import { verifyTurnstile } from "@/lib/security/turnstile";

const MIN_HUMAN_SUBMIT_MS = 3_000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;
const MAX_PAYLOAD_BYTES = 200_000;

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

const FieldSchema = z.object({
  id: trimRequired(120),
  label: trimRequired(200),
  type: trimRequired(50),
  required: z.boolean().optional().default(false),
});

const SectionSchema = z.object({
  title: trimRequired(200),
  fields: z.array(FieldSchema).min(1).max(80),
});

const AnswerValueSchema = z.union([
  z.string().transform((value) => value.trim()),
  z.array(z.string().transform((value) => value.trim())).max(80),
]);

const QuestionnaireSchema = z
  .object({
    title: trimRequired(180),
    sections: z.array(SectionSchema).min(1).max(20),
    answers: z.record(z.string(), AnswerValueSchema),
    website: trimOptional(256),
    form_started_at: z.coerce.number().int().positive(),
    turnstileToken: trimRequired(2048),
  })
  .superRefine((payload, ctx) => {
    for (const [key, value] of Object.entries(payload.answers)) {
      if (typeof value === "string") {
        if (value.length > 3000) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["answers", key],
            message: "Answer too long.",
          });
        }
      } else {
        if (value.length > 80) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["answers", key],
            message: "Too many selections.",
          });
        }

        for (const option of value) {
          if (option.length > 300) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["answers", key],
              message: "Selection text too long.",
            });
          }
        }
      }
    }
  });

type Payload = z.infer<typeof QuestionnaireSchema>;

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

function formatValue(val: string | string[] | undefined): string {
  if (!val) return "-";
  if (Array.isArray(val)) return val.length > 0 ? val.join(", ") : "-";
  return val.trim() || "-";
}

function buildHtml(payload: Payload, meta?: InternalLeadMeta): string {
  const sectionBlocks = payload.sections
    .map((section) => {
      const rows = section.fields
        .map((field) => {
          const val = formatValue(payload.answers[field.id]);
          return `
            <tr>
              <td style="padding:10px 14px;border-bottom:1px solid #f0ede8;width:38%;vertical-align:top;">
                <span style="font-size:12px;color:#7a6040;font-weight:600;">${field.label}</span>
              </td>
              <td style="padding:10px 14px;border-bottom:1px solid #f0ede8;vertical-align:top;">
                <span style="font-size:13px;color:#2d2d2d;">${val}</span>
              </td>
            </tr>`;
        })
        .join("");

      return `
        <div style="margin-bottom:28px;">
          <div style="background:linear-gradient(to right,#7a5a1d,#d1a94c);height:3px;border-radius:3px;margin-bottom:0;"></div>
          <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:0 0 8px 8px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
            <thead>
              <tr>
                <th colspan="2" style="padding:12px 14px;background:#fdf9f3;text-align:left;font-size:13px;font-weight:700;color:#b98b2f;letter-spacing:0.04em;border-bottom:1px solid #f0ede8;">
                  ${section.title}
                </th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>`;
    })
    .join("");

  const securitySection = meta
    ? `
        <div style="margin-bottom:28px;">
          <div style="background:linear-gradient(to right,#7a5a1d,#d1a94c);height:3px;border-radius:3px;margin-bottom:0;"></div>
          <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:0 0 8px 8px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
            <thead>
              <tr>
                <th colspan="2" style="padding:12px 14px;background:#fdf9f3;text-align:left;font-size:13px;font-weight:700;color:#b98b2f;letter-spacing:0.04em;border-bottom:1px solid #f0ede8;">
                  Security Review
                </th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding:10px 14px;border-bottom:1px solid #f0ede8;width:38%;font-size:12px;color:#7a6040;font-weight:600;">Decision</td><td style="padding:10px 14px;border-bottom:1px solid #f0ede8;font-size:13px;color:#2d2d2d;">${meta.decision}</td></tr>
              <tr><td style="padding:10px 14px;border-bottom:1px solid #f0ede8;width:38%;font-size:12px;color:#7a6040;font-weight:600;">Spam Score</td><td style="padding:10px 14px;border-bottom:1px solid #f0ede8;font-size:13px;color:#2d2d2d;">${meta.score}</td></tr>
              <tr><td style="padding:10px 14px;border-bottom:1px solid #f0ede8;width:38%;font-size:12px;color:#7a6040;font-weight:600;">Reasons</td><td style="padding:10px 14px;border-bottom:1px solid #f0ede8;font-size:13px;color:#2d2d2d;">${meta.reasons.join(", ") || "none"}</td></tr>
              <tr><td style="padding:10px 14px;border-bottom:1px solid #f0ede8;width:38%;font-size:12px;color:#7a6040;font-weight:600;">Client IP</td><td style="padding:10px 14px;border-bottom:1px solid #f0ede8;font-size:13px;color:#2d2d2d;">${meta.ip}</td></tr>
              <tr><td style="padding:10px 14px;width:38%;font-size:12px;color:#7a6040;font-weight:600;">User Agent</td><td style="padding:10px 14px;font-size:13px;color:#2d2d2d;">${meta.userAgent}</td></tr>
            </tbody>
          </table>
        </div>`
    : "";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ec;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:640px;">

        <tr><td style="background:linear-gradient(135deg,#7a5a1d,#d1a94c);border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.75);">New Submission</p>
          <h1 style="margin:0;font-size:22px;font-weight:700;color:#fff;">${payload.title}</h1>
          <p style="margin:8px 0 0;font-size:12px;color:rgba(255,255,255,0.65);">
            Received ${new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            at ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </td></tr>

        <tr><td style="background:#f4f1ec;padding:24px 0;">
          ${sectionBlocks}
          ${securitySection}
        </td></tr>

        <tr><td style="background:#fff;border-radius:0 0 12px 12px;padding:20px 32px;text-align:center;border-top:1px solid #f0ede8;">
          <p style="margin:0;font-size:11px;color:#aaa;">
            This email was sent automatically by the Autisync questionnaire system.<br>
            Reply directly to the client's email address provided in the Contact section.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildText(payload: Payload, meta?: InternalLeadMeta): string {
  const lines: string[] = [
    `NEW QUESTIONNAIRE SUBMISSION\n${"=".repeat(40)}`,
    `Form: ${payload.title}`,
    `Date: ${new Date().toISOString()}\n`,
  ];

  payload.sections.forEach((section) => {
    lines.push(`\n-- ${section.title.toUpperCase()} --`);
    section.fields.forEach((field) => {
      lines.push(`${field.label}: ${formatValue(payload.answers[field.id])}`);
    });
  });

  if (meta) {
    lines.push(
      "\n-- SECURITY --",
      `Decision: ${meta.decision}`,
      `Spam Score: ${meta.score}`,
      `Reasons: ${meta.reasons.join(", ") || "none"}`,
      `Client IP: ${meta.ip}`,
      `User Agent: ${meta.userAgent}`
    );
  }

  return lines.join("\n");
}

function buildConfirmationText(payload: Payload, supportEmail: string): string {
  return [
    "Thank you for your submission.",
    "",
    `We have received your ${payload.title} and our team will review it shortly.`,
    "",
    `If you want to add more details, reply to ${supportEmail}.`,
    "",
    "Autisync Team",
  ].join("\n");
}

function buildConfirmationHtml(payload: Payload, supportEmail: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ec;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:640px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
        <tr><td style="background:linear-gradient(135deg,#7a5a1d,#d1a94c);padding:28px 32px;text-align:center;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.75);">Autisync</p>
          <h1 style="margin:0;font-size:22px;font-weight:700;color:#fff;">We Received Your Questionnaire</h1>
        </td></tr>
        <tr><td style="padding:26px 32px;color:#2d2d2d;">
          <p style="margin:0 0 12px;font-size:15px;line-height:1.65;">
            Thank you for your submission. We have received your <strong>${payload.title}</strong> and our team will review it shortly.
          </p>
          <p style="margin:0;font-size:14px;line-height:1.65;color:#5a5a5a;">
            If you want to add more details, contact us at
            <a href="mailto:${supportEmail}" style="color:#b98b2f;">${supportEmail}</a>.
          </p>
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

async function getGraphAccessToken(): Promise<string> {
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

  const tokenJson = (await tokenRes.json()) as { access_token: string };
  return tokenJson.access_token;
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
  payload: Payload,
  fromEmail: string,
  toEmail: string,
  noReplyEmail: string,
  supportEmail: string,
  submitterEmail: string | undefined,
  reviewPrefix: string,
  internalMeta: InternalLeadMeta
): Promise<void> {
  const accessToken = await getGraphAccessToken();

  await sendGraphMessage(accessToken, fromEmail, {
    subject: `${reviewPrefix}New submission: ${payload.title} | Autisync`,
    html: buildHtml(payload, internalMeta),
    to: toEmail,
    ...(submitterEmail ? { replyTo: submitterEmail } : {}),
  });

  if (submitterEmail) {
    await sendGraphMessage(accessToken, noReplyEmail, {
      subject: "We received your questionnaire - Autisync",
      html: buildConfirmationHtml(payload, supportEmail),
      to: submitterEmail,
      replyTo: supportEmail,
    });
  }
}

async function sendViaSmtp(
  payload: Payload,
  fromEmail: string,
  toEmail: string,
  noReplyEmail: string,
  supportEmail: string,
  submitterEmail: string | undefined,
  reviewPrefix: string,
  internalMeta: InternalLeadMeta
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Autisync Questionnaires" <${fromEmail}>`,
    to: toEmail,
    ...(submitterEmail ? { replyTo: submitterEmail } : {}),
    subject: `${reviewPrefix}New submission: ${payload.title} | Autisync`,
    text: buildText(payload, internalMeta),
    html: buildHtml(payload, internalMeta),
  });

  if (submitterEmail) {
    await transporter.sendMail({
      from: `"Autisync" <${noReplyEmail}>`,
      to: submitterEmail,
      replyTo: supportEmail,
      subject: "We received your questionnaire - Autisync",
      text: buildConfirmationText(payload, supportEmail),
      html: buildConfirmationHtml(payload, supportEmail),
    });
  }
}

function collectAnswerText(answers: Record<string, string | string[]>): string[] {
  const values: string[] = [];
  for (const value of Object.values(answers)) {
    if (typeof value === "string") {
      values.push(value);
    } else {
      values.push(...value);
    }
  }
  return values;
}

export async function POST(req: NextRequest) {
  const { ip, userAgent } = getRequestMeta(req);

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return invalidSubmission();
  }

  const size = JSON.stringify(raw).length;
  if (size > MAX_PAYLOAD_BYTES) {
    console.warn("[questionnaire] payload too large", { ip, size });
    return invalidSubmission();
  }

  const parsed = QuestionnaireSchema.safeParse(raw);
  if (!parsed.success) {
    return invalidSubmission(422);
  }

  const payload = parsed.data;

  if (payload.website) {
    console.warn("[questionnaire] honeypot triggered", { ip });
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const formAgeMs = Date.now() - payload.form_started_at;
  if (!Number.isFinite(formAgeMs) || formAgeMs < MIN_HUMAN_SUBMIT_MS || formAgeMs > MAX_FORM_AGE_MS) {
    console.warn("[questionnaire] failed human-time gate", { ip, formAgeMs });
    return invalidSubmission();
  }

  const turnstileOk = await verifyTurnstile({ token: payload.turnstileToken, ip });
  if (!turnstileOk) {
    return invalidSubmission();
  }

  const submitterEmail = extractEmailFromQuestionnaireAnswers(payload.answers);

  const limiter = getRateLimiter();
  const ipKey = `questionnaire:ip:${ip}`;
  const ipRecentCount = limiter.getRecentCount(ipKey, 10 * 60 * 1000);
  const ipRate = limiter.consume(ipKey, 5, 10 * 60 * 1000);
  if (!ipRate.ok) {
    console.warn("[questionnaire] ip rate limit exceeded", { ip });
    return invalidSubmission(429);
  }

  if (submitterEmail) {
    const emailRate = limiter.consume(`questionnaire:email:${submitterEmail}`, 3, 60 * 60 * 1000);
    if (!emailRate.ok) {
      console.warn("[questionnaire] email rate limit exceeded", { ip, submitterEmail });
      return invalidSubmission(429);
    }
  }

  const spam = assessSpam({
    email: submitterEmail,
    ipRecentCount,
    textFields: [payload.title, ...collectAnswerText(payload.answers)],
  });

  if (spam.decision === "rejected") {
    console.warn("[questionnaire] rejected spam submission", {
      ip,
      submitterEmail,
      score: spam.score,
      reasons: spam.reasons,
    });
    // Extension point: status can be forwarded to CRM/n8n/Nextcloud as "rejected" later.
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const fromEmail = process.env.OUTLOOK_FROM_EMAIL ?? process.env.SMTP_USER ?? "";
  const noReplyEmail = process.env.OUTLOOK_NOREPLY_EMAIL ?? fromEmail;
  const supportEmail = process.env.OUTLOOK_SUPPORT_EMAIL ?? "support@austisync.com";
  const toEmail =
    process.env.OUTLOOK_QUESTIONNAIRE_TO_EMAIL ??
    process.env.OUTLOOK_TO_EMAIL ??
    "info@autisync.com";

  const useGraph =
    process.env.MICROSOFT_TENANT_ID &&
    process.env.MICROSOFT_CLIENT_ID &&
    process.env.MICROSOFT_CLIENT_SECRET;

  const useSmtp = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

  if (!fromEmail || (!useGraph && !useSmtp)) {
    console.error("[questionnaire] No valid email transport configuration found.");
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
      await sendViaGraphApi(
        payload,
        fromEmail,
        toEmail,
        noReplyEmail,
        supportEmail,
        submitterEmail,
        reviewPrefix,
        internalMeta
      );
    } else {
      await sendViaSmtp(
        payload,
        fromEmail,
        toEmail,
        noReplyEmail,
        supportEmail,
        submitterEmail,
        reviewPrefix,
        internalMeta
      );
    }

    // Extension point: accepted/review status can be sent to CRM/n8n/EspoCRM/Nextcloud.
    // Example status values: "accepted" | "review" | "rejected".
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[questionnaire] send error:", error);
    return processingError(500);
  }
}
