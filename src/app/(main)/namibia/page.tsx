import type { Metadata } from "next";
import CountryLanding, { type CountryCopy } from "@/app/components/CountryLanding";
import { formatPrice, websiteTiers } from "@/lib/website-packages";

const URL = "https://www.autisync.com/namibia";
const from = formatPrice(websiteTiers[0].price.NAD, "NAD");

export const metadata: Metadata = {
    title: "Website Design in Namibia (Windhoek)",
    description: `Professional website design for Namibian businesses, with your .na or .com domain, hosting and business email included for the first year. Prices in Namibian dollars from ${from}.`,
    alternates: { canonical: URL },
    openGraph: {
        title: "Website Design in Namibia — Autisync",
        description: `Fast, mobile-first websites connected to a CRM, priced in Namibian dollars from ${from}.`,
        url: URL,
        locale: "en_NA",
        type: "website",
    },
};

const copy: CountryCopy = {
    lang: "en",
    currency: "NAD",
    market: "na",
    url: URL,
    city: "Windhoek",
    country: "Namibia",
    phone: { display: "(+264) 927 114 403", href: "tel:+264927114403" },
    h1: "Website design in Namibia, priced in Namibian dollars",
    intro:
        "We build websites for businesses in Windhoek and across Namibia: fast on a phone, easy to find on Google and connected to a CRM, so every enquiry reaches the person who has to answer it. Your domain, hosting and business email are included for the first year.",
    primaryCta: { label: "Take the free 1-minute check", href: "/quiz" },
    secondaryCta: { label: "See prices", href: "/servicepackage?market=na" },
    whyTitle: "What you get with a website built by us",
    why: [
        {
            title: "A fixed price in N$",
            text: "You know what you pay before we start. No exchange-rate surprises and no hidden costs for the domain or hosting.",
        },
        {
            title: "Built for phones",
            text: "Most of your customers will open your site on a phone, often on mobile data. Light pages that load quickly.",
        },
        {
            title: "Enquiries that don't get lost",
            text: "Every form goes into the CRM and alerts your team, and customers can WhatsApp you from any page.",
        },
        {
            title: "Email on your own domain",
            text: "info@yourbusiness.com.na instead of a Gmail address: from 5 to 100 accounts depending on the package, set up by us.",
        },
        {
            title: "Local SEO",
            text: "Structure, titles and business details set up so you show when someone searches for your service in Windhoek, Swakopmund or Walvis Bay.",
        },
        {
            title: "One team, start to finish",
            text: "We set it all up. After launch you deal with a named person from our team, by WhatsApp, phone or email, on weekdays from 9:00 to 18:00 (London and Lisbon time).",
        },
    ],
    clientsTitle: "Businesses that work with us",
    pricesTitle: "How much does a website cost in Namibia?",
    pricesIntro:
        "Three packages, all with domain, hosting, SSL certificate and business email for the first year. Prices are starting points; the final quote depends on the number of pages and features.",
    from: "From",
    mostPopular: "Most popular",
    careNote: (care) =>
        `From year two, the care plan (hosting, email, backups, updates and 2 hours of changes a month) is ${care} a month.`,
    pricesTerms:
        "No 12-month contract: the Care Plan is monthly and you can cancel with 30 days' notice, by email or from your account. We remind you 30 days before your domain renews.",
    allPrices: { label: "See every package in detail", href: "/servicepackage?market=na" },
    servicesTitle: "Beyond the website",
    services: [
        {
            title: "Web development",
            text: "Company websites, online shops and lead-generation pages.",
            href: "/solutions/devServices",
        },
        {
            title: "SEO and digital marketing",
            text: "Social media, ads and content that bring in more enquiries.",
            href: "/solutions/seo",
        },
        {
            title: "Graphic design and branding",
            text: "Logo, visual identity and social media artwork.",
            href: "/solutions/graphicDesign",
        },
        {
            title: "Autisync CRM",
            text: "Contacts, quotes, invoices and WhatsApp in one place, so no customer slips through.",
            href: "/crm",
        },
    ],
    stepsTitle: "How we work",
    steps: [
        { title: "First conversation", text: "We learn about your business, your customers and what the site has to achieve." },
        { title: "Proposal and design", text: "You get a fixed quote and the first page designs to approve." },
        { title: "Build", text: "We write, build and connect the site to your domain, email and CRM." },
        { title: "Launch", text: "We publish, register you with Google and show your team how everything works." },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
        {
            q: "How much does a website cost in Namibia?",
            a: `Our packages start at ${from} (Startup, up to 6 pages). Small Business is ${formatPrice(websiteTiers[1].price.NAD, "NAD")} and Enterprise ${formatPrice(websiteTiers[2].price.NAD, "NAD")}. All include domain, hosting and business email for the first year.`,
        },
        {
            q: "How long does it take?",
            a: "Startup is delivered in 19 days, Small Business in 28 days and Enterprise in about 62 days, counted from when we have your text and images.",
        },
        {
            q: "Can I have a .na or .com.na domain?",
            a: "Yes. We register a .na, .com.na or .com domain in your business's name and cover the first year's renewal.",
        },
        {
            q: "Will my site show up on Google?",
            a: "Every package includes SEO (basic on Startup, advanced on the others): titles, descriptions, speed, business details and submitting the site to Google. To rank ahead of competitors for busy searches we also recommend our SEO and marketing service.",
        },
        {
            q: "How do I pay?",
            a: "Prices are in Namibian dollars, and the payment terms are written into the proposal before we start. Site, domain, email and CRM come from one partner, on one bill.",
        },
        {
            q: "Am I tied into a contract?",
            a: "There is no 12-month contract. The website is paid once; from year two the Care Plan is monthly and you can cancel with 30 days' notice, by email or from your account. We remind you 30 days before anything renews for a year, such as your domain.",
        },
        {
            q: "Who owns the website and the data?",
            a: "You do. The domain is registered in your business's name, and the site and your data are yours. Export your contacts and records to Excel or CSV any time; if you leave, we hand everything over within 30 days.",
        },
        {
            q: "Do you work outside Windhoek?",
            a: "Yes. We work with businesses across Namibia; meetings can be by video call, phone or WhatsApp.",
        },
    ],
    ctaTitle: "Ready for a website that brings in customers?",
    ctaText: "Take the free 1-minute check and get a recommendation for your business, or message us on WhatsApp.",
    whatsappText: "Hi Autisync, I saw your Namibia website page and I'm interested in the {tier} package {price}.",
};

export default function NamibiaPage() {
    return <CountryLanding c={copy} />;
}
