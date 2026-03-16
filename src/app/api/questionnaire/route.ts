import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ─── Types (mirrors the client) ───────────────────────────────────────────────

interface Field {
    id: string;
    label: string;
    type: string;
    required?: boolean;
}

interface Section {
    title: string;
    fields: Field[];
}

interface Payload {
    title: string;
    sections: Section[];
    answers: Record<string, string | string[]>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatValue(val: string | string[] | undefined): string {
    if (!val) return "—";
    if (Array.isArray(val)) return val.length > 0 ? val.join(", ") : "—";
    return val.trim() || "—";
}

function buildHtml(payload: Payload): string {
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

    return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ec;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:640px;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#7a5a1d,#d1a94c);border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.75);">New Submission</p>
          <h1 style="margin:0;font-size:22px;font-weight:700;color:#fff;">${payload.title}</h1>
          <p style="margin:8px 0 0;font-size:12px;color:rgba(255,255,255,0.65);">
            Received ${new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            at ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#f4f1ec;padding:24px 0;">
          ${sectionBlocks}
        </td></tr>

        <!-- Footer -->
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

function buildText(payload: Payload): string {
    const lines: string[] = [`NEW QUESTIONNAIRE SUBMISSION\n${"=".repeat(40)}`, `Form: ${payload.title}`, `Date: ${new Date().toISOString()}\n`];
    payload.sections.forEach((section) => {
        lines.push(`\n── ${section.title.toUpperCase()} ──`);
        section.fields.forEach((field) => {
            lines.push(`${field.label}: ${formatValue(payload.answers[field.id])}`);
        });
    });
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

  const tokenRes = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        scope: "https://graph.microsoft.com/.default",
      }),
    }
  );

  if (!tokenRes.ok) {
    const body = await tokenRes.text();
    throw new Error(`Graph token request failed (${tokenRes.status}): ${body}`);
  }

  const tokenJson = (await tokenRes.json()) as { access_token: string };
  return tokenJson.access_token;
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

async function sendViaGraphApi(
  payload: Payload,
  fromEmail: string,
  toEmail: string,
  noReplyEmail: string,
  supportEmail: string,
  submitterEmail?: string
): Promise<void> {
  const accessToken = await getGraphAccessToken();

  // Internal notification to team
  await sendGraphMessage(accessToken, fromEmail, {
    subject: `New submission: ${payload.title} | Autisync`,
    html: buildHtml(payload),
    to: toEmail,
    ...(submitterEmail ? { replyTo: submitterEmail } : {}),
  });

  // Confirmation to submitter
  if (submitterEmail) {
    await sendGraphMessage(accessToken, noReplyEmail, {
      subject: `We received your questionnaire - Autisync`,
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
  submitterEmail?: string
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
    subject: `New submission: ${payload.title} | Autisync`,
    text: buildText(payload),
    html: buildHtml(payload),
  });

  if (submitterEmail) {
    await transporter.sendMail({
      from: `"Autisync" <${noReplyEmail}>`,
      to: submitterEmail,
      replyTo: supportEmail,
      subject: `We received your questionnaire - Autisync`,
      text: buildConfirmationText(payload, supportEmail),
      html: buildConfirmationHtml(payload, supportEmail),
    });
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
    let payload: Payload;

    try {
        payload = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    if (!payload.title || !payload.sections || !payload.answers) {
        return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Derive a reply-to from the contact_email field if present
    const submitterEmail = typeof payload.answers["contact_email"] === "string"
        ? payload.answers["contact_email"]
        : undefined;

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
      return NextResponse.json(
        { error: "Email service is not configured. Please contact us directly." },
        { status: 503 }
      );
    }

    try {
      if (useGraph) {
        await sendViaGraphApi(payload, fromEmail, toEmail, noReplyEmail, supportEmail, submitterEmail);
      } else {
        await sendViaSmtp(payload, fromEmail, toEmail, noReplyEmail, supportEmail, submitterEmail);
      }

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (err) {
      console.error("[questionnaire] send error:", err);

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

        return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
    }
}