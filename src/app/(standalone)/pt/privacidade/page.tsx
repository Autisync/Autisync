import type { Metadata } from "next";
import Privacy from "@/app/PrivacyPolicy/privacy";

/**
 * /pt/privacidade — the website's privacy policy in European Portuguese.
 *
 * Not to be confused with /pt/legal/privacidade, which is the Autisync CRM
 * product's policy. Same text as /PrivacyPolicy, from the same file
 * (PrivacyPolicy/policyContent.ts); neither version prevails.
 */
const URL = "https://www.autisync.com/pt/privacidade";
const EN_URL = "https://www.autisync.com/PrivacyPolicy";
const TITLE = "Política de Privacidade";
const DESCRIPTION =
    "Como a Autisync (Maheldom Consulting, Lda.) recolhe, usa e protege dados pessoais no site, nos formulários e na medição de visitas, segundo o RGPD.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: URL, languages: { en: EN_URL, pt: URL, "x-default": EN_URL } },
    openGraph: { type: "website", url: URL, siteName: "Autisync", title: `${TITLE} | Autisync`, description: DESCRIPTION, locale: "pt_PT" },
    robots: { index: true, follow: true },
};

export default function PoliticaDePrivacidadePage() {
    return <Privacy lang="pt" />;
}
