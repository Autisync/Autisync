import type { Metadata } from "next";
import CountryLanding, { type CountryCopy } from "@/app/components/CountryLanding";
import { formatPrice, websiteTiers } from "@/lib/website-packages";

// The UK landing page for "small business website fixed price" searches.
// UK visitors otherwise land on the mixed-market home page.
const URL = "https://www.autisync.com/web-design-uk";
const from = formatPrice(websiteTiers[0].price.GBP, "GBP");

export const metadata: Metadata = {
    title: `Small Business Websites from ${from}, Fixed Price (UK)`,
    description: `Small business websites from ${from}, fixed price, with domain, hosting and business email included for the first year. Built for phones and Google.`,
    alternates: { canonical: URL },
    openGraph: {
        title: `Small Business Websites from ${from}, Fixed Price — Autisync`,
        description: `Fast, mobile-first websites connected to a CRM, at a fixed price in pounds from ${from}.`,
        url: URL,
        locale: "en_GB",
        type: "website",
    },
};

const copy: CountryCopy = {
    lang: "en",
    currency: "GBP",
    market: "gb",
    url: URL,
    city: "UK-wide",
    country: "United Kingdom",
    phone: { display: "+44 7795 866571", href: "tel:+447795866571" },
    h1: `Small business websites from ${from}, fixed price`,
    intro:
        "We design and build websites for UK small businesses: fast on a phone, easy to find on Google and connected to a CRM, so every enquiry reaches the person who has to answer it. You get a fixed quote before we start, and your domain, hosting and business email are included for the first year.",
    primaryCta: { label: "Book a free 15-minute call", href: "/book" },
    secondaryCta: { label: "See prices", href: "/servicepackage?market=gb" },
    whyTitle: "What you get with a website built by us",
    why: [
        {
            title: "A fixed price in pounds",
            text: "You know what you pay before we start. No day rates that keep running and no hidden costs for the domain or hosting.",
        },
        {
            title: "Built for phones",
            text: "Most of your customers will find you on a phone. Light pages that load quickly, with your phone number and WhatsApp one tap away.",
        },
        {
            title: "Enquiries that don't get lost",
            text: "Every form goes into the CRM and alerts your team, and customers can WhatsApp you from any page.",
        },
        {
            title: "Email on your own domain",
            text: "hello@yourbusiness.co.uk instead of a Gmail address: from 5 to 100 accounts depending on the package, set up by us.",
        },
        {
            title: "Local SEO",
            text: "Structure, titles and business details set up so you show when someone searches for your service in your town, and ready to link to your Google Business Profile.",
        },
        {
            title: "A named person on our team",
            text: "We set it all up. After launch you deal with a named person from our team, by WhatsApp, phone or email, on weekdays from 9:00 to 18:00 UK time.",
        },
    ],
    clientsTitle: "Businesses that work with us",
    pricesTitle: "How much does a small business website cost in the UK?",
    pricesIntro:
        "Three packages, all with domain, hosting, SSL certificate and business email for the first year. Prices are starting points; the final quote depends on the number of pages and features, and is fixed before we start.",
    from: "From",
    mostPopular: "Most popular",
    careNote: (care) =>
        `From year two, the care plan (hosting, email, backups, updates and 2 hours of changes a month) is ${care} a month.`,
    pricesTerms:
        "No 12-month contract: the Care Plan is monthly and you can cancel with 30 days' notice, by email or from your account. We remind you 30 days before your domain renews.",
    allPrices: { label: "See every package in detail", href: "/servicepackage?market=gb" },
    servicesTitle: "Beyond the website",
    services: [
        {
            title: "Clinics and salons",
            text: "Online booking, missed-call text-back and WhatsApp replies for UK clinics, practices and salons.",
            href: "/clinics",
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
            text: "Contacts, quotes, invoices and WhatsApp in one place, priced per business rather than per user.",
            href: "/crm",
        },
    ],
    stepsTitle: "How we work",
    steps: [
        { title: "First conversation", text: "We learn about your business, your customers and what the site has to achieve." },
        { title: "Fixed quote and design", text: "You get a fixed price and the first page designs to approve." },
        { title: "Build", text: "We write, build and connect the site to your domain, email and CRM." },
        { title: "Launch", text: "We publish, register you with Google and show your team how everything works." },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
        {
            q: "How much does a small business website cost in the UK?",
            a: `Our packages start at ${from} (Startup, up to 6 pages). Small Business is ${formatPrice(websiteTiers[1].price.GBP, "GBP")} and Enterprise ${formatPrice(websiteTiers[2].price.GBP, "GBP")}. All include domain, hosting and business email for the first year. You can get a rough figure for your own site with our free website cost estimator.`,
        },
        {
            q: "Is the price really fixed?",
            a: "Yes. We agree the pages and features first and put the price in the proposal. It only changes if you ask for something that wasn't in it, and we quote that before doing it.",
        },
        {
            q: "How long does it take?",
            a: "Startup is delivered in 19 days, Small Business in 28 days and Enterprise in about 62 days, counted from when we have your text and images.",
        },
        {
            q: "Can I have a .co.uk domain?",
            a: "Yes. We register a .co.uk, .uk or .com domain in your business's name and cover the first year's renewal. If you already have one, we connect it.",
        },
        {
            q: "Will my site show up on Google?",
            a: "Every package includes SEO (basic on Startup, advanced on the others): titles, descriptions, speed, business details and submitting the site to Google. To rank ahead of competitors for busy local searches we also recommend our SEO and marketing service.",
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
            q: "Do you work outside London?",
            a: "Yes. We work with businesses across England, Scotland, Wales and Northern Ireland; meetings are by video call, phone or WhatsApp.",
        },
    ],
    ctaTitle: "Ready for a website that brings in customers?",
    ctaText: "Book a free 15-minute call and we'll show you what we would build for your business, or message us on WhatsApp.",
    whatsappText: "Hi Autisync, I saw your UK website page and I'm interested in the {tier} package {price}.",
};

export default function WebDesignUkPage() {
    return <CountryLanding c={copy} />;
}
