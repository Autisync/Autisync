/**
 * Autisync for estate & letting agencies — plans and the published prices
 * we compare against. Used by /crm/estate-agents, /crm/imobiliarias and
 * /llms.txt, so the three never disagree.
 *
 * Prices set 28 Oct 2026. UK and EU prices are per agency (not per user), ex-VAT,
 * plus a one-off setup fee per plan (halved when paid yearly).
 * Kz and N$ follow the same scaling as the rest of the site
 * (see lib/service-packages.ts), not the market exchange rate.
 */
import type { Currency } from "./website-packages";

export type AgencyPlanId = "solo" | "starter" | "pro" | "multi";

export type AgencyPlan = {
    id: AgencyPlanId;
    name: string;
    namePt: string;
    price: Record<Currency, number>;
    perBranch?: boolean;
    /** One-off: set-up, data moved over, team training. */
    setup: Record<Currency, number>;
    users: number;
    listings: number | null; // null = unlimited
    aiReplies: number | null; // replies a month; null = only instant enquiry replies
    highlight?: boolean;
    extras: string[];
    extrasPt: string[];
};

export const agencyPlans: AgencyPlan[] = [
    {
        id: "solo", name: "Solo", namePt: "Solo",
        price: { GBP: 69, EUR: 79, AOA: 25_500, NAD: 450 }, setup: { GBP: 295, EUR: 345, AOA: 108_500, NAD: 1_930 },
        users: 1, listings: 50, aiReplies: null,
        extras: ["Instant email reply to every website enquiry"],
        extrasPt: ["Resposta imediata por email a cada pedido do site"],
    },
    {
        id: "starter", name: "Starter", namePt: "Starter",
        price: { GBP: 139, EUR: 159, AOA: 51_000, NAD: 910 }, setup: { GBP: 495, EUR: 575, AOA: 181_500, NAD: 3_230 },
        users: 3, listings: 150, aiReplies: 500,
        extras: ["AI assistant: 500 replies a month", "Website chat and email"],
        extrasPt: ["Assistente de IA: 500 respostas por mês", "Chat do site e email"],
    },
    {
        id: "pro", name: "Pro", namePt: "Pro",
        price: { GBP: 229, EUR: 265, AOA: 84_000, NAD: 1_500 }, setup: { GBP: 895, EUR: 1_045, AOA: 328_500, NAD: 5_840 },
        users: 8, listings: null, aiReplies: 2_000, highlight: true,
        extras: ["AI assistant: 2,000 replies, answers out of hours", "WhatsApp", "Rent billing and compliance reminders"],
        extrasPt: ["Assistente de IA: 2.000 respostas, responde fora de horas", "WhatsApp", "Faturação de rendas e alertas de conformidade"],
    },
    {
        id: "multi", name: "Multi-branch", namePt: "Multi-loja",
        price: { GBP: 379, EUR: 435, AOA: 139_000, NAD: 2_470 }, setup: { GBP: 1_495, EUR: 1_745, AOA: 548_500, NAD: 9_760 }, perBranch: true,
        users: 15, listings: null, aiReplies: 6_000,
        extras: ["AI assistant: 6,000 replies", "Portal feeds as each portal approves us", "Priority support"],
        extrasPt: ["Assistente de IA: 6.000 respostas", "Envio para portais à medida que cada um nos aprova", "Suporte prioritário"],
    },
];

export const extraUser: Record<Currency, number> = { GBP: 25, EUR: 29, AOA: 9_000, NAD: 160 };

/** In every plan. */
export const everyPlan = [
    "CRM: clients, leads, deals and tasks",
    "Properties with photos, video, map and documents",
    "Your website updated automatically, or reading the listings API",
    "Viewings: free times, self-booking link, reminders, no-show follow-up",
    "Buyers and tenants matched and emailed the right homes",
    "Import from Alto, Reapit, Jupix, Street, eGO, Casafari, idealista or a spreadsheet",
    "English, Portuguese, Spanish, French and German",
];
export const everyPlanPt = [
    "CRM: clientes, contactos, negócios e tarefas",
    "Imóveis com fotos, vídeo, mapa e documentos",
    "O seu site atualizado automaticamente, ou a ler a API de imóveis",
    "Visitas: horas livres, link de marcação, lembretes, seguimento de faltas",
    "Compradores e inquilinos associados aos imóveis certos, por email",
    "Importação do eGO, Casafari, idealista, Alto, Reapit, Jupix, Street ou de uma folha de cálculo",
    "Português, inglês, espanhol, francês e alemão",
];

/**
 * Published UK prices (ex-VAT), checked 12 Oct 2026. Only vendors that
 * publish a price; the larger suites (Reapit, Alto, Street, Rex) quote on
 * request. "team" is the monthly cost for the user count of each of our plans.
 */
export const ukCompetitors = [
    { name: "Apex27", basis: "£35 per user", basisPt: "£35 por utilizador", team: (users: number) => 35 * users, source: "https://apex27.co.uk/estate-agent-software-pricing" },
    { name: "Gnomen Pro", basis: "£45 per user", basisPt: "£45 por utilizador", team: (users: number) => 45 * users, source: "https://gnomen.co.uk/prices" },
    { name: "Loop", basis: "£100 + £50 per extra user", basisPt: "£100 + £50 por utilizador extra", team: (users: number) => 100 + 50 * Math.max(0, users - 1), source: "https://loop.software/pricing" },
];

export const COMPARED_ON = "12 October 2026";
