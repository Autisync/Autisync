import type { Metadata } from "next";
import StepInsideLanding, { STEP_INSIDE_FAQ, TIER } from "./StepInsideLanding";
import { faqSchema } from "@/app/components/FunnelShell";
import { formatPrice } from "@/lib/website-packages";

// The page itself lives in StepInsideLanding.tsx, shared with the Portuguese
// twin at /pt/websites/demonstracao (src/app/(standalone)/pt/websites/demonstracao).

const URL = "https://www.autisync.com/websites/step-inside";
const PT_URL = "https://www.autisync.com/pt/websites/demonstracao";
const TITLE = "Step-inside websites: customers walk in before they arrive | Autisync";
const DESCRIPTION =
    "A website that opens with a walk from the street into your shop, café, salon or clinic as visitors scroll. Filmed on a phone in 20 seconds.";

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: URL, languages: { en: URL, pt: PT_URL, "x-default": URL } },
    openGraph: { type: "website", url: URL, siteName: "Autisync", title: TITLE, description: DESCRIPTION, images: [{ url: "/step-inside/cafe-demo/desktop/f_0040.webp", width: 1200, height: 675 }] },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const schema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Service",
            name: "Step-inside website",
            serviceType: "Website design with scroll-driven walk-in video",
            provider: { "@id": "https://www.autisync.com/#organization" },
            areaServed: ["GB", "PT", "AO"],
            url: URL,
            description: DESCRIPTION,
            offers: { "@type": "Offer", priceCurrency: "GBP", price: TIER.price.GBP, description: `From ${formatPrice(TIER.price.GBP, "GBP")}, first year` },
        },
        faqSchema(STEP_INSIDE_FAQ.en),
    ],
};

export default function StepInsidePage() {
    return <StepInsideLanding lang="en" schema={schema} />;
}
