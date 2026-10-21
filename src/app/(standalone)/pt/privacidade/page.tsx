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
    "Como a Autisync (MAHELDOM CONSULTING, LDA.) recolhe, utiliza e protege dados pessoais através do seu website, formulários e medição de visitas, de acordo com o RGPD, a Lei n.º 58/2019 e a Lei n.º 41/2004.";

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
