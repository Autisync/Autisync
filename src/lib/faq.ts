/**
 * Pricing FAQ for /servicepackage — rendered as visible text AND as
 * FAQPage structured data. Answers pull prices from the package data files,
 * so they can never drift from what the cards show.
 *
 * Written to be quotable: AI assistants (ChatGPT, Claude, Perplexity, Google
 * AI Overviews) lift short, factual, self-contained answers like these.
 */
import { carePlanMonthly, formatPrice, websiteTiers } from "./website-packages";
import { brandingTiers, launchBundle, socialTiers } from "./service-packages";

const kz = (n: number) => formatPrice(n, "AOA");
const gbp = (n: number) => formatPrice(n, "GBP");
const eur = (n: number) => formatPrice(n, "EUR");
const [startup, smallBiz, enterprise] = websiteTiers;

export const pricingFaq: { q: string; a: string }[] = [
    {
        q: "How much does a business website cost with Autisync?",
        a: `Autisync websites start at ${kz(startup.price.AOA)} in Angola (${gbp(startup.price.GBP)} in the UK, ${eur(startup.price.EUR)} in Portugal/EU) for a Startup site of up to 6 pages. The 10-page Small Business website is ${kz(smallBiz.price.AOA)} (${gbp(smallBiz.price.GBP)}), and Enterprise sites start at ${kz(enterprise.price.AOA)} (${gbp(enterprise.price.GBP)}). Every package includes the domain and hosting for the first year, SSL, business email accounts and SEO setup.`,
    },
    {
        q: "How long does it take to build a website?",
        a: "A Startup website is delivered in about 19 days, a Small Business website in about 28 days and an Enterprise website in about 62 days, depending on how quickly content and approvals come back.",
    },
    {
        q: "How do payments work?",
        a: "Website and branding projects are paid 50% to start and 50% at launch, so the second half is only due once you are happy with the result live. Social media management is billed monthly with a 3-month minimum term.",
    },
    {
        q: "What happens after the first year of hosting?",
        a: `Hosting and the domain are free for the first year. After that, the Autisync Care Plan costs ${kz(carePlanMonthly.AOA)} per month (${gbp(carePlanMonthly.GBP)} in the UK, ${eur(carePlanMonthly.EUR)} in the EU) and covers hosting, email, backups, updates, security and 2 hours of changes a month.`,
    },
    {
        q: "How much does a logo and brand identity cost?",
        a: `Branding starts at ${kz(brandingTiers[0].price.AOA)} (${gbp(brandingTiers[0].price.GBP)}) for the Essentials package: a logo, colours and fonts, 100 printed business cards, a company stamp and a social profile kit. The Identity package, with 12-page brand guidelines and full stationery, is ${kz(brandingTiers[1].price.AOA)} (${gbp(brandingTiers[1].price.GBP)}). Corporate identities for larger companies start at ${kz(brandingTiers[2].price.AOA)} (${gbp(brandingTiers[2].price.GBP)}).`,
    },
    {
        q: "How much does social media management cost?",
        a: `Social media management starts at ${kz(socialTiers[0].price.AOA)} per month (${gbp(socialTiers[0].price.GBP)}) for 12 posts including 4 reels on 2 platforms. The Growth plan is ${kz(socialTiers[1].price.AOA)} per month (${gbp(socialTiers[1].price.GBP)}) and adds paid ads management, LinkedIn and community replies. Ad spend is paid separately, directly to the platform.`,
    },
    {
        q: "Is there a package that includes both branding and a website?",
        a: `Yes. The ${launchBundle.name} bundle combines the Branding Identity package with a 10-page Small Business website for ${kz(launchBundle.price.AOA)} (${gbp(launchBundle.price.GBP)}), instead of ${kz(launchBundle.separately.AOA)} bought separately. It is designed to make a company look professional and tender-ready in about 30 days.`,
    },
    {
        q: "Which countries and languages does Autisync work in?",
        a: "Autisync works with clients in Angola, Namibia, the United Kingdom and Portugal, in English and Portuguese. Websites can be built bilingual (Portuguese and English) on request.",
    },
];

export const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pricingFaq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
    })),
};
