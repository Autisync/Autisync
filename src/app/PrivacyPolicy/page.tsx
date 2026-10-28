import type { Metadata } from "next";
import Privacy from "./privacy";

const URL = "https://www.autisync.com/PrivacyPolicy";
const PT_URL = "https://www.autisync.com/pt/privacidade";
const DESCRIPTION =
    "How Autisync (Maheldom Consulting, Lda.) collects, uses and protects personal data from its website, forms and visitor measurement.";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: DESCRIPTION,
    alternates: { canonical: URL, languages: { en: URL, pt: PT_URL, "x-default": URL } },
    openGraph: { type: "website", url: URL, siteName: "Autisync", title: "Privacy Policy | Autisync", description: DESCRIPTION, locale: "en_GB" },
    robots: { index: true, follow: true },
};

export default function PrivacyPage() {
    return <Privacy lang="en" />;
}
