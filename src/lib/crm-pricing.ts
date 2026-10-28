/**
 * Every CRM price in one place, for the main site's price pages, the menu,
 * the home page card, the Deliveries page and /llms.txt.
 *
 * Prices set 28 Oct 2026, monthly, ex-VAT, each plan with a one-off setup fee
 * (set-up, data moved over, training; halved when paid yearly). GBP for the UK, EUR for Portugal;
 * Kz and N$ follow the site's usual scale (GBP × 367 and × 6.53), not the
 * exchange rate. The per-business plans themselves live in
 * lib/industry-plans.ts and lib/estate-agency-plans.ts.
 */
import type { Currency } from "./website-packages";
import { industryPlans } from "./industry-plans";
import { agencyPlans } from "./estate-agency-plans";

const scaled = (gbp: number, eur: number, step = 500): Record<Currency, number> => ({
    GBP: gbp,
    EUR: eur,
    AOA: Math.round((gbp * 367) / step) * step,
    NAD: Math.round((gbp * 6.53) / 10) * 10,
});

/* ── CRM Lite: the CRM on its own, no website ─────────────────────────── */

export const crmLite = {
    price: scaled(29, 35),
    setup: scaled(149, 169),
    en: {
        name: "CRM Lite",
        tagline: "Just the CRM, for one person. No website.",
        features: [
            "Clients, enquiries, deals and tasks",
            "Your email in a shared inbox",
            "Quotes and invoices with a card payment link",
            "Import from a spreadsheet",
            "1 user",
        ],
        notIncluded: "No website, online booking, WhatsApp or AI assistant. Move up to any plan when you need them.",
    },
    pt: {
        name: "CRM Lite",
        tagline: "Só o CRM, para uma pessoa. Sem site.",
        features: [
            "Clientes, contactos, negócios e tarefas",
            "O seu email numa caixa de entrada partilhada",
            "Orçamentos e faturas com link de pagamento por cartão",
            "Importação de uma folha de cálculo",
            "1 utilizador",
        ],
        notIncluded: "Sem site, marcações online, WhatsApp nem assistente de IA. Passe para qualquer plano quando precisar.",
    },
};

/* ── Deliveries ───────────────────────────────────────────────────────── */

export type DeliveryPlan = {
    id: "starter" | "fleet" | "depot";
    name: string;
    namePt: string;
    price: Record<Currency, number>;
    perDepot?: boolean;
    setup: Record<Currency, number>;
    drivers: number;
    officeUsers: number;
    highlight?: boolean;
    extras: string[];
    extrasPt: string[];
};

export const deliveryPlans: DeliveryPlan[] = [
    {
        id: "starter", name: "Starter", namePt: "Starter", price: scaled(99, 115), setup: scaled(695, 795), drivers: 3, officeUsers: 2,
        extras: ["Driver app with proof of delivery: photo, signature, QR scan", "Live tracking link by text and email", "Invoice sent at the drop, with a payment link"],
        extrasPt: ["App do motorista com prova de entrega: foto, assinatura, leitura de QR", "Link de seguimento em direto por SMS e email", "Fatura enviada na entrega, com link de pagamento"],
    },
    {
        id: "fleet", name: "Fleet", namePt: "Frota", price: scaled(229, 265), setup: scaled(1495, 1745), drivers: 10, officeUsers: 5, highlight: true,
        extras: ["Orders read from email and WhatsApp by themselves", "Late warnings with a new arrival time", "AI replies to “where’s my delivery?”"],
        extrasPt: ["Encomendas lidas do email e do WhatsApp automaticamente", "Avisos de atraso com nova hora de chegada", "Respostas de IA a “onde está a minha entrega?”"],
    },
    {
        id: "depot", name: "Depot", namePt: "Armazém", price: scaled(449, 515), setup: scaled(2495, 2895), perDepot: true, drivers: 25, officeUsers: 12,
        extras: ["Several depots on one board", "Your own branding on the customer screens", "Priority support"],
        extrasPt: ["Vários armazéns num só quadro", "A sua marca nos ecrãs do cliente", "Suporte prioritário"],
    },
];

export const deliveryExtraDriver = scaled(15, 17);

export const everyDeliveryPlan = [
    "Office board: today’s drops, vans and drivers on a live map",
    "Routes in order, with time windows",
    "Customers in the CRM, with every delivery and invoice",
    "Labels with QR codes, scanned at loading and at the door",
    "English and Portuguese, for the office, drivers and customers",
];
export const everyDeliveryPlanPt = [
    "Quadro do escritório: entregas do dia, carrinhas e motoristas num mapa em direto",
    "Rotas por ordem, com janelas horárias",
    "Clientes no CRM, com todas as entregas e faturas",
    "Etiquetas com QR, lidas no carregamento e à porta",
    "Português e inglês, para o escritório, motoristas e clientes",
];

/**
 * Published prices of delivery tools, checked 27 Oct 2026 (USD, monthly).
 * Track-POD: Upper's review of its plans; Onfleet: Shipday's comparison.
 */
export const deliveryCompetitors = [
    { name: "Track-POD (Advanced)", basis: "$59 per driver a month, 3-driver minimum", basisPt: "$59 por motorista por mês, mínimo de 3", cur: "USD" as const, drivers: (d: number) => 59 * Math.max(3, d), source: "https://www.upperinc.com/blog/track-pod-pricing/" },
    { name: "Onfleet", basis: "$599 a month for 2,500 deliveries", basisPt: "$599 por mês para 2.500 entregas", cur: "USD" as const, drivers: () => 599, source: "https://www.shipday.com/post/6-best-track-pod-alternatives-for-delivery-teams-in-2026" },
];

/* ── White-label build, handed over ───────────────────────────────────── */

export const whiteLabelBuild = {
    price: scaled(14_900, 16_900, 10_000),
    dayRate: scaled(450, 520),
    support: scaled(490, 560),
    en: {
        name: "White-label build, handed over",
        tagline: "Your own system, in your name, on your servers.",
        text: "We build the office app, the driver app and the customer screens in your branding, starting from our working system, then hand over the code and set it up on your own hosting. Final price after a scoping call.",
        features: [
            "Office, driver and customer apps in your brand and on your domain",
            "Source code and documentation handed over",
            "Set up on your own hosting, with your team trained",
            "Integrations with your systems, scoped up front",
        ],
        priceNote: "one-off, from",
        dayRateLabel: "Consulting after handover",
        supportLabel: "Optional support plan",
        perDay: "a day",
        perMonth: "a month",
        compare: "Agencies quote $30,000 to $80,000 for a customised white-label delivery app, and $50,000 to $150,000 for a custom multi-app platform.",
    },
    pt: {
        name: "Sistema com a sua marca, entregue a si",
        tagline: "O seu próprio sistema, em seu nome, nos seus servidores.",
        text: "Construímos a app do escritório, a app do motorista e os ecrãs do cliente com a sua marca, a partir do nosso sistema já em funcionamento, e entregamos o código instalado no seu alojamento. Preço final depois de uma chamada de levantamento.",
        features: [
            "Apps do escritório, do motorista e do cliente com a sua marca e domínio",
            "Código-fonte e documentação entregues",
            "Instalado no seu alojamento, com a equipa formada",
            "Integrações com os seus sistemas, definidas à partida",
        ],
        priceNote: "pagamento único, desde",
        dayRateLabel: "Consultoria depois da entrega",
        supportLabel: "Plano de suporte opcional",
        perDay: "por dia",
        perMonth: "por mês",
        compare: "As agências pedem entre 30.000 e 80.000 dólares por uma app de entregas personalizada com marca própria, e entre 50.000 e 150.000 por uma plataforma à medida com várias apps.",
    },
    sources: [
        "https://www.ongraph.com/white-label-food-delivery-app-cost/",
        "https://unicoconnect.com/blogs/logistics-app-development-cost",
    ],
};

/* ── Overview: "from" price per kind of business ──────────────────────── */

const minOf = (prices: Record<Currency, number>[]) =>
    (["GBP", "EUR", "AOA", "NAD"] as Currency[]).reduce(
        (acc, c) => ({ ...acc, [c]: Math.min(...prices.map((p) => p[c])) }),
        {} as Record<Currency, number>,
    );

export type CrmPriceRow = {
    id: string;
    en: string;
    pt: string;
    from: Record<Currency, number>;
    href: { en: string; pt: string } | null;
    perMonth: boolean;
};

export const crmPriceRows: CrmPriceRow[] = [
    { id: "lite", en: "CRM Lite, no website", pt: "CRM Lite, sem site", from: crmLite.price, href: null, perMonth: true },
    { id: "estate", en: "Estate & letting agents", pt: "Imobiliárias", from: minOf(agencyPlans.map((p) => p.price)), href: { en: "/crm/estate-agents", pt: "/crm/imobiliarias" }, perMonth: true },
    { id: "clinics", en: "Clinics & dental", pt: "Clínicas e dentistas", from: minOf(industryPlans.clinics.map((p) => p.price)), href: { en: "/clinics", pt: "/pt/clinicas" }, perMonth: true },
    { id: "salons", en: "Salons & studios", pt: "Salões e estúdios", from: minOf(industryPlans.salons.map((p) => p.price)), href: { en: "/crm/salons", pt: "/crm/saloes" }, perMonth: true },
    { id: "trades", en: "Trades & field services", pt: "Obras e serviços técnicos", from: minOf(industryPlans.trades.map((p) => p.price)), href: { en: "/crm/trades", pt: "/crm/servicos-tecnicos" }, perMonth: true },
    { id: "consultants", en: "Consultants", pt: "Consultores", from: minOf(industryPlans.consultants.map((p) => p.price)), href: { en: "/crm/consultants", pt: "/crm/consultores" }, perMonth: true },
    { id: "agencies", en: "Agencies", pt: "Agências", from: minOf(industryPlans.agencies.map((p) => p.price)), href: { en: "/crm/agencies", pt: "/crm/agencias" }, perMonth: true },
    { id: "legal", en: "Legal & finance", pt: "Jurídico e finanças", from: minOf(industryPlans.legal.map((p) => p.price)), href: { en: "/crm/legal-finance", pt: "/crm/juridico-financas" }, perMonth: true },
    { id: "deliveries", en: "Deliveries & logistics", pt: "Entregas e logística", from: minOf(deliveryPlans.map((p) => p.price)), href: { en: "/crm/deliveries", pt: "/crm/entregas" }, perMonth: true },
    { id: "whitelabel", en: "White-label build, handed over", pt: "Sistema com a sua marca, entregue a si", from: whiteLabelBuild.price, href: { en: "/crm/deliveries#white-label", pt: "/crm/entregas#white-label" }, perMonth: false },
];
