import type { Metadata } from "next";
import Terms from "./terms"; // or whatever your current component is named

export const metadata: Metadata = {
    title: "Terms of Use",
    description:
        "Read Autisync's Terms of Use — the rules and conditions governing use of our website and services.",
    alternates: { canonical: "https://www.autisync.com/TermsofUse", languages: { en: "https://www.autisync.com/TermsofUse", pt: "https://www.autisync.com/pt/termos", "x-default": "https://www.autisync.com/TermsofUse" } },
    robots: { index: true, follow: false },
};

export default function TermsPage() {
    return <Terms />;
}