/**
 * /llms.txt — a plain-text briefing for AI assistants (ChatGPT, Claude,
 * Perplexity, Gemini…). See https://llmstxt.org. Prices come from the same
 * data files as the website, so this never goes out of date.
 */
import { carePlanMonthly, formatPrice, websiteTiers } from "@/lib/website-packages";
import { brandingTiers, launchBundle, socialTiers } from "@/lib/service-packages";
import { siteStats } from "@/lib/site-stats";
import { agencyPlans, extraUser } from "@/lib/estate-agency-plans";

export const dynamic = "force-static";

const BASE = "https://www.autisync.com";
const p = (price: Record<"AOA" | "GBP" | "EUR", number>) =>
    `${formatPrice(price.AOA, "AOA")} / ${formatPrice(price.GBP, "GBP")} / ${formatPrice(price.EUR, "EUR")}`;

export function GET() {
    const body = `# Autisync

> Autisync is a digital agency that builds websites, brand identities, social media and AI automation for service businesses in Angola, Namibia, the United Kingdom and Portugal. It works in English and Portuguese. Autisync is a trading name of Maheldom Consulting, Lda (NIF 5003472418), registered in Talatona, Luanda, Angola.

Key facts:
- Services: website design and development, web apps, brand identity and logo design, social media management, SEO, CRM setup, AI automation, IT support.
- Countries served: Angola, Namibia, United Kingdom, Portugal.
- Track record: ${siteStats.projects}+ projects for ${siteStats.clients}+ clients over ${siteStats.years}+ years, mainly corporate B2B companies in engineering, oil & gas, construction, telecoms, finance and healthcare.
- Clients include: Florentek Engineering, Grupo Girassol, Blue Horizon, Salustra Group, Mavunzuka & Filhos, Segucyber, Evolution Technologies, Shivali Investments, Ninth Vision, Occucare Medical, Omatapalo, Your Pharmacy.
- Payment terms: website and branding projects are 50% to start and 50% at launch.
- Contact: WhatsApp +44 7883 317646 · Angola +244 927 114 400 · info@autisync.com

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

## Pages

- [Prices and packages](${BASE}/servicepackage): all packages, prices and a pricing FAQ
- [Portfolio](${BASE}/portfolio): websites, brand identities and IT projects
- [About](${BASE}/about): company story and values
- [Web & app development](${BASE}/solutions/devServices)
- [Graphic design & branding](${BASE}/solutions/graphicDesign)
- [SEO & digital marketing](${BASE}/solutions/seo)
- [IT consultation & support](${BASE}/solutions/itConsultation)
- [Autisync CRM](${BASE}/crm): Autisync's customer relationship manager for WhatsApp, Instagram, Facebook and email
- [CRM for estate & letting agents](${BASE}/crm/estate-agents): properties, viewings, AI assistant, prices per agency
- [Contact](${BASE}/contact)

## Em português

- [Página inicial em português](${BASE}/pt): websites, branding e marketing digital em Angola
- [Preços em português](${BASE}/pt/precos): todos os pacotes, preços em Kz e perguntas frequentes
- [Sobre a Autisync](${BASE}/pt/sobre)
- [Portfólio](${BASE}/pt/portfolio)
- [Criação de websites e aplicações](${BASE}/pt/servicos/desenvolvimento)
- [Design gráfico e branding](${BASE}/pt/servicos/design-grafico)
- [SEO e marketing digital](${BASE}/pt/servicos/seo-marketing)
- [Consultoria e suporte de TI](${BASE}/pt/servicos/consultoria-ti)
- [CRM para imobiliárias](${BASE}/crm/imobiliarias): imóveis, visitas, assistente de IA, preços por agência
- [Contacto](${BASE}/pt/contacto)
`;
    return new Response(body, {
        headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
    });
}
