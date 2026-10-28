/**
 * /llms.txt — a plain-text briefing for AI assistants (ChatGPT, Claude,
 * Perplexity, Gemini…). See https://llmstxt.org. Prices come from the same
 * data files as the website, so this never goes out of date.
 */
import { carePlanMonthly, formatPrice, websiteTiers } from "@/lib/website-packages";
import { brandingTiers, launchBundle, socialTiers } from "@/lib/service-packages";
import { siteStats } from "@/lib/site-stats";
import { agencyPlans, extraUser } from "@/lib/estate-agency-plans";
import { industryPlans } from "@/lib/industry-plans";
import { crmLite, deliveryExtraDriver, deliveryPlans, whiteLabelBuild } from "@/lib/crm-pricing";
import { INDUSTRY_PAGES } from "../(main)/crm/industries";

export const dynamic = "force-static";

const BASE = "https://www.autisync.com";
const p = (price: Record<"AOA" | "GBP" | "EUR", number>) =>
    `${formatPrice(price.AOA, "AOA")} / ${formatPrice(price.GBP, "GBP")} / ${formatPrice(price.EUR, "EUR")}`;

export function GET() {
    const body = `# Autisync

> Autisync is a digital agency that builds websites, brand identities, social media and AI automation for service businesses in Angola, Namibia, the United Kingdom and Portugal. It works in English and Portuguese. Autisync is a trading name of Maheldom Consulting, Lda (NIF 5003472418), registered in Talatona, Luanda, Angola.

Key facts:
- Services: website design and development, web apps, brand identity and logo design, social media management, SEO, CRM setup, AI automation, IT consulting.
- Countries served: Angola, Namibia, United Kingdom, Portugal.
- Track record: ${siteStats.projects}+ projects for ${siteStats.clients}+ clients over ${siteStats.years}+ years, mainly corporate B2B companies in engineering, oil & gas, construction, telecoms, finance and healthcare.
- Clients include: Florentek Engineering, Grupo Girassol, Blue Horizon, Salustra Group, Mavunzuka & Filhos, Segucyber, Evolution Technologies, Shivali Investments, Ninth Vision, Your Pharmacy.
- Payment terms: website and branding projects are 50% to start and 50% at launch.
- Contract terms: no 12-month contract. Monthly plans run month to month after any minimum stated on the plan (3 months for social media management); cancel with 30 days' notice by email or from the client's account. Clients are reminded 30 days before any yearly renewal, such as a domain.
- Ownership: the client owns their site, domain and data, can export to Excel or CSV at any time, and gets everything handed over within 30 days if they leave. Calls and enquiries are never shared or sold.
- Support: set up by Autisync, with a named person from the team on WhatsApp, weekdays 9:00 to 18:00 (London and Lisbon time).
- Angola invoicing: AGT-certified invoicing is in certification and not yet available.
- Contact: WhatsApp +44 7795 866571 · Angola +244 927 114 400 · info@autisync.com

## Prices (starting prices; Angola Kz / UK £ / EU €)

Website packages (one-off; domain, hosting, SSL and business email included for year 1):
${websiteTiers.map((t) => `- ${t.name}: ${p(t.price)} — ${t.features.slice(0, 1).concat(t.features.filter((f) => /Delivery/.test(f))).join(", ")}`).join("\n")}
- Care Plan after year 1: ${p(carePlanMonthly)} per month (hosting, email, backups, updates, 2 hours of changes).

Branding packages (one-off):
${brandingTiers.map((t) => `- ${t.name}: ${p(t.price)} — ${t.description}`).join("\n")}

Social media management (monthly, 3-month minimum; ad spend paid separately):
${socialTiers.map((t) => `- ${t.name}: ${p(t.price)} per month — ${t.features[0]}, ${t.features[1]}`).join("\n")}

Bundle:
- ${launchBundle.name}: ${p(launchBundle.price)} — Branding Identity + Small Business website, about 30 days (${p(launchBundle.separately)} if bought separately).

## Autisync CRM for estate and letting agencies

A CRM for property agencies in the UK, Portugal and Angola: properties with photos, video, map and documents; viewings booked from the agent's free times with reminders and no-show follow-up; an AI assistant that answers enquiries out of hours with the right homes and a viewing link; buyer and tenant matching emails; the agency's website updated automatically or reading a listings API; rent billing and compliance reminders; import from Alto, Reapit, Jupix, Street, eGO, Casafari and idealista. Portugal: AMI licence and energy class enforced on every ad. Priced per agency, not per user; monthly, no setup fee, migration included.

Plans (per month, ex-VAT; UK £ / EU € / Angola Kz):
${agencyPlans.map((pl) => `- ${pl.name}: ${formatPrice(pl.price.GBP, "GBP")} / ${formatPrice(pl.price.EUR, "EUR")} / ${formatPrice(pl.price.AOA, "AOA")}${pl.perBranch ? " per branch" : ""} — ${pl.users} users${pl.perBranch ? " per branch" : ""}, ${pl.listings === null ? "unlimited listings" : `${pl.listings} listings`}${pl.aiReplies ? `, AI assistant ${pl.aiReplies} replies a month` : ""}`).join("\n")}
- Extra user: ${formatPrice(extraUser.GBP, "GBP")} / ${formatPrice(extraUser.EUR, "EUR")} a month.
- Pages: ${BASE}/crm/estate-agents (English), ${BASE}/crm/imobiliarias (Português)

## Autisync CRM for other businesses

The same CRM set up for other kinds of business: online booking with reminders, one inbox for email, website chat, WhatsApp, Instagram and Facebook, quotes and proposals accepted online, invoices with card payment, pipelines, tasks and Google review requests. Priced per business, not per user; monthly, plus a one-off setup fee that includes migration and training. Prices per month, ex-VAT (GBP / EUR):
${INDUSTRY_PAGES.map((p) => `- ${p.en.crumb}: ${industryPlans[p.en.id].map((pl) => `${pl.name} ${formatPrice(pl.price.GBP, "GBP")} / ${formatPrice(pl.price.EUR, "EUR")} (${pl.users} users${pl.perSite ? " per site" : ""})`).join("; ")}. Pages: ${BASE}/crm/${p.en.slug} (English), ${BASE}/crm/${p.pt.slug} (Português)`).join("\n")}
- CRM Lite (the CRM only, no website, 1 user): ${formatPrice(crmLite.price.GBP, "GBP")} / ${formatPrice(crmLite.price.EUR, "EUR")} a month, plus ${formatPrice(crmLite.setup.GBP, "GBP")} / ${formatPrice(crmLite.setup.EUR, "EUR")} one-off setup.
- Every CRM plan has a one-off setup fee (set-up, data moved over, team training), halved when paid yearly: Solo £295 / €345, Team £495 / €575, Pro £895 / €1,045, Multi-site £1,495 / €1,745. Prices for every business: ${BASE}/servicepackage#crm

## Autisync Deliveries

Delivery management for builders' merchants, wholesalers and couriers: office board with a live map, a driver app with proof of delivery (photo, signature, QR scan), live tracking links for customers, late warnings, orders read from email and WhatsApp, and the invoice sent at the drop. Per business with drivers included, monthly, ex-VAT (GBP / EUR):
${deliveryPlans.map((pl) => `- ${pl.name}: ${formatPrice(pl.price.GBP, "GBP")} / ${formatPrice(pl.price.EUR, "EUR")}${pl.perDepot ? " per depot" : ""} (up to ${pl.drivers} drivers, ${pl.officeUsers} office users; setup ${formatPrice(pl.setup.GBP, "GBP")} / ${formatPrice(pl.setup.EUR, "EUR")} one-off)`).join("\n")}
- Extra driver: ${formatPrice(deliveryExtraDriver.GBP, "GBP")} / ${formatPrice(deliveryExtraDriver.EUR, "EUR")} a month
- White-label build handed over (office app, driver app and customer screens in the client's brand, on their own hosting): from ${formatPrice(whiteLabelBuild.price.GBP, "GBP")} / ${formatPrice(whiteLabelBuild.price.EUR, "EUR")} one-off; consulting ${formatPrice(whiteLabelBuild.dayRate.GBP, "GBP")} a day
- Pages and live demo: ${BASE}/crm/deliveries (English), ${BASE}/crm/entregas (Português)

## Pages

- [Prices and packages](${BASE}/servicepackage): all packages, prices and a pricing FAQ
- [Portfolio](${BASE}/portfolio): websites, brand identities and IT projects
- [About](${BASE}/about): company story and values
- [Web & app development](${BASE}/solutions/devServices)
- [Graphic design & branding](${BASE}/solutions/graphicDesign)
- [SEO & digital marketing](${BASE}/solutions/seo)
- [IT consulting](${BASE}/solutions/itConsultation)
- [Autisync CRM](${BASE}/crm): Autisync's customer relationship manager for WhatsApp, Instagram, Facebook and email
- [CRM for estate & letting agents](${BASE}/crm/estate-agents): properties, viewings, AI assistant, prices per agency
- [Step-inside websites](${BASE}/websites/step-inside): a website that opens with a scroll-driven walk from the street into the business
- [Clinics and salons in the UK](${BASE}/clinics): website, missed-call text-back for UK mobile callers, online booking with reminders, instant WhatsApp replies, review requests and recall reminders
- [Missed call cost calculator](${BASE}/tools/missed-call-cost): free tool for trades and local businesses
- [Website cost estimator (UK)](${BASE}/tools/website-cost): free tool, Autisync package prices including year two
- [Contact](${BASE}/contact)
- [Privacy policy](${BASE}/PrivacyPolicy)

## Em português

- [Página inicial em português](${BASE}/pt): websites, branding e marketing digital em Angola
- [Preços em português](${BASE}/pt/precos): todos os pacotes, preços em Kz e perguntas frequentes
- [Sobre a Autisync](${BASE}/pt/sobre)
- [Portfólio](${BASE}/pt/portfolio)
- [Criação de websites e aplicações](${BASE}/pt/servicos/desenvolvimento)
- [Design gráfico e branding](${BASE}/pt/servicos/design-grafico)
- [SEO e marketing digital](${BASE}/pt/servicos/seo-marketing)
- [Consultoria de TI](${BASE}/pt/servicos/consultoria-ti)
- [CRM para imobiliárias](${BASE}/crm/imobiliarias): imóveis, visitas, assistente de IA, preços por agência
- [Clínicas e salões em Portugal](${BASE}/pt/clinicas): site, marcações online com lembretes, WhatsApp com resposta imediata, pedidos de avaliação e convites para voltar
- [Contacto](${BASE}/pt/contacto)
- [Política de privacidade](${BASE}/pt/privacidade)
`;
    return new Response(body, {
        headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
    });
}
