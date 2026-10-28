import type { Metadata } from "next";
import StepInsideLanding, { STEP_INSIDE_FAQ, TIER } from "@/app/websites/step-inside/StepInsideLanding";
import { faqSchema } from "@/app/components/FunnelShell";
import { formatPrice } from "@/lib/website-packages";

// Portuguese twin of /websites/step-inside. Same component and look, words in
// Portuguese; in the (standalone) group so there is no site navbar or footer.

const URL = "https://www.autisync.com/pt/websites/demonstracao";
const EN_URL = "https://www.autisync.com/websites/step-inside";
const TITLE = "Websites com entrada em vídeo: o cliente entra antes de chegar";
const DESCRIPTION =
    "Um website que abre com um passeio da rua até ao interior da sua loja, café ou clínica, ao ritmo do scroll. Filmado com um telemóvel em 20 segundos.";

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: URL, languages: { en: EN_URL, pt: URL, "x-default": EN_URL } },
    openGraph: {
        type: "website", url: URL, siteName: "Autisync", title: TITLE, description: DESCRIPTION, locale: "pt_AO",
        images: [{ url: "/step-inside/cafe-demo/desktop/f_0040.webp", width: 1200, height: 675 }],
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

// Portuguese readers are mostly in Angola and Portugal, so the offer is given
// in kwanza and euros (the page itself shows the visitor's market).
const offer = (currency: "AOA" | "EUR") => ({
    "@type": "Offer",
    priceCurrency: currency,
    price: TIER.price[currency],
    description: `Desde ${formatPrice(TIER.price[currency], currency)}, primeiro ano`,
});

const schema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Service",
            name: "Website com entrada em vídeo",
            serviceType: "Design de websites com vídeo de entrada controlado pelo scroll",
            provider: { "@id": "https://www.autisync.com/#organization" },
            areaServed: ["AO", "PT", "GB"],
            url: URL,
            description: DESCRIPTION,
            inLanguage: "pt",
            offers: [offer("AOA"), offer("EUR")],
        },
        { ...faqSchema(STEP_INSIDE_FAQ.pt), inLanguage: "pt" },
    ],
};

export default function DemonstracaoPage() {
    return <StepInsideLanding lang="pt" schema={schema} />;
}
