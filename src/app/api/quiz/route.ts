import { NextRequest, NextResponse } from "next/server";
import { CRM_API } from "@/lib/booking";
import { getRateLimiter } from "@/lib/security/rate-limit";
import { getClientIp } from "@/lib/security/request-meta";
import { QUIZ_COPY, type QuizLang } from "@/app/quiz/quizCopy";

// Sends a quiz (/quiz, /pt/diagnostico) to the CRM as a submission of the
// CRM's own quiz funnel, so the lead lands there as a contact and a deal,
// tagged by business type, linked to the post or ad it came from. The CRM
// checks everything again; this route limits abuse and forwards known fields.

const MESSAGES = {
    en: { bad: "Something went wrong. Please try again.", down: "We couldn't send that right now. Please try again in a moment.", busy: "Too many tries. Please wait a few minutes and try again.", phone: "That phone number looks incomplete.", email: "That email address doesn't look right." },
    pt: { bad: "Algo correu mal. Tente novamente.", down: "Não foi possível enviar agora. Tente de novo daqui a pouco.", busy: "Demasiadas tentativas. Aguarde alguns minutos e tente de novo.", phone: "Esse número parece incompleto.", email: "Esse email parece incompleto." },
};

const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: NextRequest) {
    const input = await req.json().catch(() => null);
    const lang: QuizLang = input?.lang === "pt" ? "pt" : "en";
    const m = MESSAGES[lang];

    const limit = getRateLimiter().consume(`quiz:${getClientIp(req)}`, 5, 10 * 60_000);
    if (!limit.ok) return NextResponse.json({ error: m.busy }, { status: 429 });
    if (!input || typeof input !== "object") return NextResponse.json({ error: m.bad }, { status: 400 });
    // Hidden field people never see; bots fill it. Pretend it worked.
    if (str(input.website, 200)) return NextResponse.json({ ok: true }, { status: 201 });

    const copy = QUIZ_COPY[lang];
    const data: Record<string, string> = { _form: "steps" };
    // Only the answers the quiz offers, worded exactly as the CRM funnel has them.
    for (const q of copy.questions) {
        const v = str(input.answers?.[q.key], 120);
        if (v && q.options.some((o) => o.value === v)) data[q.key] = v;
    }
    data.nome = str(input.nome, 200);
    data.telefone = str(input.telefone, 40);
    data.email = str(input.email, 254);
    data.consentimento = input.consentimento === "sim" ? "sim" : "";
    data.pagina = str(input.pagina, 300);
    if (!data.nome || !data.telefone || !data.consentimento) return NextResponse.json({ error: m.bad }, { status: 400 });
    // The answers again as one readable line, in "mensagem": the CRM keeps that
    // key on every steps form (lead request, deal and the new-lead email), so the
    // answers reach the team even if the CRM funnel's questions are later edited
    // and stop matching the keys above. (The CRM turns line breaks into spaces.)
    const said = copy.questions.filter((q) => data[q.key]).map((q) => `${q.title} ${data[q.key]}`);
    if (said.length) data.mensagem = `${lang === "pt" ? "Respostas do diagnóstico" : "Quiz answers"}: ${said.join(" · ")}`.slice(0, 2000);

    const body: Record<string, unknown> = { data };
    for (const k of UTM) { const v = str(input[k], 120); if (v) body[k] = v; }

    try {
        const r = await fetch(`${CRM_API}/funnels/public/${copy.crmFunnel}/submit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Forwarded-For": getClientIp(req),
                "User-Agent": req.headers.get("user-agent")?.slice(0, 300) || "autisync.com quiz",
                Origin: "https://www.autisync.com",
                Referer: data.pagina || "https://www.autisync.com/quiz",
            },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(15_000),
        });
        const out = await r.json().catch(() => ({}));
        if (r.ok) return NextResponse.json({ ok: true }, { status: 201 });
        if (r.status === 429) return NextResponse.json({ error: m.busy }, { status: 429 });
        if (r.status === 400) {
            const code = String(out.code || "");
            const error = code === "lead_form.phone" ? m.phone : code === "lead_form.email" ? m.email : m.bad;
            return NextResponse.json({ error }, { status: 400 });
        }
        return NextResponse.json({ error: m.down }, { status: 502 });
    } catch {
        return NextResponse.json({ error: m.down }, { status: 502 });
    }
}
