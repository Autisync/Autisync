/**
 * Autisync CRM for each kind of business: plans, prices and the published
 * prices we compare against. Used by the industry pages under /crm/* (English
 * and Portuguese) and by /llms.txt, so they never disagree.
 *
 * Prices set 27 Oct 2026. Per business (not per user), monthly, ex-VAT.
 * GBP for the UK, EUR for Portugal. Kz and N$ follow the same scaling as the
 * rest of the site (see lib/estate-agency-plans.ts), not the exchange rate.
 * To change a price, change it here: every page reads this file.
 */
import type { Currency } from "./website-packages";

export type IndustryId = "clinics" | "salons" | "consultants" | "legal" | "agencies" | "trades";
export type IndustryPlanId = "solo" | "team" | "pro" | "multi";

export type IndustryPlan = {
    id: IndustryPlanId;
    name: string;
    namePt: string;
    price: Record<Currency, number>;
    perSite?: boolean;
    users: number;
    aiReplies: number | null;
    highlight?: boolean;
    extras: string[];
    extrasPt: string[];
};

/** Kz and N$ from the GBP price, on the site's usual scale. */
const scaled = (gbp: number, eur: number): Record<Currency, number> => ({
    GBP: gbp,
    EUR: eur,
    AOA: Math.round((gbp * 367) / 500) * 500,
    NAD: Math.round((gbp * 6.53) / 10) * 10,
});

type Prices = { solo: [number, number]; team: [number, number]; pro: [number, number]; multi: [number, number]; extraUser: [number, number] };

const PRICES: Record<IndustryId, Prices> = {
    clinics:     { solo: [45, 49], team: [99, 115], pro: [179, 205], multi: [299, 345], extraUser: [20, 23] },
    salons:      { solo: [29, 35], team: [69, 79],  pro: [129, 149], multi: [219, 249], extraUser: [12, 14] },
    consultants: { solo: [35, 39], team: [79, 89],  pro: [149, 169], multi: [249, 279], extraUser: [15, 17] },
    legal:       { solo: [49, 55], team: [119, 135], pro: [219, 249], multi: [349, 395], extraUser: [25, 29] },
    agencies:    { solo: [39, 45], team: [89, 99],  pro: [169, 195], multi: [279, 319], extraUser: [15, 17] },
    trades:      { solo: [39, 45], team: [89, 99],  pro: [169, 195], multi: [279, 319], extraUser: [15, 17] },
};

/** What each tier adds, the same for every kind of business. */
const TIER = {
    solo: { users: 1, ai: null, en: ["Email and website chat in one inbox", "Online booking with reminders"], pt: ["Email e chat do site numa só caixa", "Marcações online com lembretes"] },
    team: { users: 5, ai: 500, en: ["WhatsApp, Instagram and Facebook in the inbox", "AI assistant: 500 replies a month", "Automatic follow-ups and review requests"], pt: ["WhatsApp, Instagram e Facebook na caixa de entrada", "Assistente de IA: 500 respostas por mês", "Seguimentos e pedidos de avaliação automáticos"] },
    pro: { users: 12, ai: 2000, en: ["AI assistant: 2,000 replies, answers out of hours", "Email sequences and reports", "Priority support"], pt: ["Assistente de IA: 2.000 respostas, responde fora de horas", "Sequências de email e relatórios", "Suporte prioritário"] },
    multi: { users: 20, ai: 6000, en: ["AI assistant: 6,000 replies", "One view across every site", "Priority support"], pt: ["Assistente de IA: 6.000 respostas", "Uma visão de todos os espaços", "Suporte prioritário"] },
} as const;

/** One line per plan that only this kind of business needs. */
const SPECIFIC: Record<IndustryId, { solo: [string, string]; team: [string, string]; multiName: [string, string] }> = {
    clinics: { solo: ["Deposits taken when patients book", "Sinal pago na marcação"], team: ["No-show follow-up and recall reminders", "Seguimento de faltas e lembretes de revisão"], multiName: ["Multi-clinic", "Multi-clínica"] },
    salons: { solo: ["Deposits for long appointments", "Sinal nas marcações longas"], team: ["Rebooking reminders by client", "Lembretes para voltar a marcar"], multiName: ["Multi-salon", "Multi-salão"] },
    consultants: { solo: ["Proposals accepted online", "Propostas aceites online"], team: ["Retainers invoiced every month", "Avenças faturadas todos os meses"], multiName: ["Firm", "Empresa"] },
    legal: { solo: ["Engagement letters signed online", "Cartas de compromisso assinadas online"], team: ["Deadlines as tasks, for the whole team", "Prazos como tarefas, para toda a equipa"], multiName: ["Multi-office", "Multi-escritório"] },
    agencies: { solo: ["Proposals accepted online", "Propostas aceites online"], team: ["Deposits, stage invoices and retainers", "Sinal, faturas por fase e avenças"], multiName: ["Studio", "Estúdio"] },
    trades: { solo: ["Quotes accepted online, turned into invoices", "Orçamentos aceites online e passados a fatura"], team: ["Jobs board from enquiry to paid", "Quadro de trabalhos, do pedido ao pagamento"], multiName: ["Multi-depot", "Multi-armazém"] },
};

function plansFor(ind: IndustryId): IndustryPlan[] {
    const p = PRICES[ind];
    const sp = SPECIFIC[ind];
    return [
        { id: "solo", name: "Solo", namePt: "Solo", price: scaled(...p.solo), users: TIER.solo.users, aiReplies: null,
          extras: [sp.solo[0], ...TIER.solo.en], extrasPt: [sp.solo[1], ...TIER.solo.pt] },
        { id: "team", name: "Team", namePt: "Equipa", price: scaled(...p.team), users: TIER.team.users, aiReplies: TIER.team.ai,
          extras: [sp.team[0], ...TIER.team.en], extrasPt: [sp.team[1], ...TIER.team.pt] },
        { id: "pro", name: "Pro", namePt: "Pro", price: scaled(...p.pro), users: TIER.pro.users, aiReplies: TIER.pro.ai, highlight: true,
          extras: [...TIER.pro.en], extrasPt: [...TIER.pro.pt] },
        { id: "multi", name: sp.multiName[0], namePt: sp.multiName[1], price: scaled(...p.multi), perSite: ind !== "consultants" && ind !== "agencies",
          users: TIER.multi.users, aiReplies: TIER.multi.ai, extras: [...TIER.multi.en], extrasPt: [...TIER.multi.pt] },
    ];
}

export const industryPlans: Record<IndustryId, IndustryPlan[]> = {
    clinics: plansFor("clinics"), salons: plansFor("salons"), consultants: plansFor("consultants"),
    legal: plansFor("legal"), agencies: plansFor("agencies"), trades: plansFor("trades"),
};

export const industryExtraUser: Record<IndustryId, Record<Currency, number>> = Object.fromEntries(
    (Object.keys(PRICES) as IndustryId[]).map((k) => [k, scaled(...PRICES[k].extraUser)]),
) as Record<IndustryId, Record<Currency, number>>;

/** In every plan, for every kind of business. */
export const everyIndustryPlan = [
    "Clients, enquiries, deals and tasks in one place",
    "Online booking page and calendar, with reminders",
    "Quotes and invoices with a card payment link",
    "One inbox for email and website chat, with WhatsApp from Team",
    "Your branding: your logo, colours and email address",
    "Import from a spreadsheet or your current system",
    "English, Portuguese, Spanish, French and German",
];
export const everyIndustryPlanPt = [
    "Clientes, contactos, negócios e tarefas num só lugar",
    "Página de marcações e agenda, com lembretes",
    "Orçamentos e faturas com link de pagamento por cartão",
    "Uma caixa de entrada para email e chat do site, com WhatsApp a partir do Equipa",
    "A sua marca: logótipo, cores e endereço de email",
    "Importação de uma folha de cálculo ou do sistema que usa hoje",
    "Português, inglês, espanhol, francês e alemão",
];

/**
 * Published prices of the tools each kind of business usually uses, checked
 * 27 October 2026 (monthly list price, before tax). `team` is the monthly cost
 * for the team size of each of our plans, in the vendor's own currency.
 * Only where a price is published; vendors that quote on request are left out.
 */
export type Competitor = { name: string; basis: string; basisPt: string; cur: "GBP" | "USD"; team: (users: number) => number; source: string };

const cliniko = (u: number) => (u <= 1 ? 45 : u <= 5 ? 95 : u <= 8 ? 145 : u <= 12 ? 195 : u <= 25 ? 295 : 395);

export const industryCompetitors: Record<IndustryId, Competitor[]> = {
    clinics: [
        { name: "Cliniko", basis: "Priced by number of practitioners", basisPt: "Preço por número de profissionais", cur: "USD", team: cliniko, source: "https://costbench.com/software/scheduling/cliniko/" },
    ],
    salons: [
        { name: "Fresha", basis: "$14.95 per team member; 20% on new marketplace clients", basisPt: "$14,95 por profissional; 20% nos clientes novos do marketplace", cur: "USD", team: (u) => (u <= 1 ? 19.95 : Math.round(14.95 * u * 100) / 100), source: "https://www.costbench.com/software/salon-spa/fresha/" },
    ],
    consultants: [
        { name: "HubSpot Starter", basis: "£16 per seat, billed yearly; no booking page or invoices", basisPt: "£16 por utilizador, faturado anualmente; sem marcações nem faturas", cur: "GBP", team: (u) => 16 * u, source: "https://www.comparethecloud.net/articles/hubspot-crm-vs-salesforce-essentials-vs-pipedrive-uk-b2b-company-10-50-staff-gbp" },
    ],
    legal: [
        { name: "Clio Manage (EasyStart)", basis: "$49 per user", basisPt: "$49 por utilizador", cur: "USD", team: (u) => 49 * u, source: "https://costbench.com/software/legal-practice-management/clio-manage/" },
    ],
    agencies: [
        { name: "HubSpot Starter", basis: "£16 per seat, billed yearly; no booking page or invoices", basisPt: "£16 por utilizador, faturado anualmente; sem marcações nem faturas", cur: "GBP", team: (u) => 16 * u, source: "https://www.comparethecloud.net/articles/hubspot-crm-vs-salesforce-essentials-vs-pipedrive-uk-b2b-company-10-50-staff-gbp" },
    ],
    trades: [
        { name: "Tradify (Lite)", basis: "£34 per user", basisPt: "£34 por utilizador", cur: "GBP", team: (u) => 34 * u, source: "https://www.kaeltripton.com/tradify-pricing-uk/" },
        { name: "Jobber", basis: "From $49 (1 user) to $299 (5 users, Grow)", basisPt: "De $49 (1 utilizador) a $299 (5 utilizadores, Grow)", cur: "USD", team: (u) => (u <= 1 ? 49 : u <= 5 ? 299 : u <= 10 ? 399 : 499), source: "https://www.getonecrew.com/post/jobber-pricing" },
    ],
};

export const INDUSTRY_COMPARED_ON = "27 October 2026";
export const INDUSTRY_COMPARED_ON_PT = "27 de outubro de 2026";
