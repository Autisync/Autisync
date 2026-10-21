import type { Metadata } from "next";
import Terms from "@/app/TermsofUse/terms";

/**
 * /pt/termos — the website's Terms of Use in European Portuguese.
 *
 * Not to be confused with /pt/legal/termos, which is the Autisync CRM
 * product's terms. Same terms as /TermsofUse (TermsofUse/termsPt.ts).
 */
const URL = "https://www.autisync.com/pt/termos";
const EN_URL = "https://www.autisync.com/TermsofUse";
const TITLE = "Termos de Utilização";
const DESCRIPTION =
    "Os Termos de Utilização da Autisync: as regras e condições de utilização do nosso site e dos nossos serviços.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: URL, languages: { en: EN_URL, pt: URL, "x-default": EN_URL } },
    openGraph: { type: "website", url: URL, siteName: "Autisync", title: `${TITLE} | Autisync`, description: DESCRIPTION, locale: "pt_PT" },
    robots: { index: true, follow: false },
};

export default function TermosDeUtilizacaoPage() {
    return <Terms lang="pt" />;
}
