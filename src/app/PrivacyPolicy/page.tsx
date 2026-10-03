import type { Metadata } from "next";
import Privacy from "./privacy"; // or whatever your current component is named

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Autisync's Privacy Policy — how we collect, use, and protect your personal data across the UK, Portugal, Namibia, and Angola.",
    alternates: { canonical: "https://www.autisync.com/PrivacyPolicy" },
    robots: { index: true, follow: false },
};

export default function PrivacyPage() {
    return <Privacy />;
}