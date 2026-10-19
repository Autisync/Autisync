import type { Metadata } from "next";
import QuizShell from "./QuizShell";

// The landing page for social posts and ads (English). Portuguese twin:
// /pt/diagnostico. Not in the sitemap and not indexed: it is a page people
// are sent to, and the pages that should rank are the service pages.
const URL = "https://www.autisync.com/quiz";
const PT_URL = "https://www.autisync.com/pt/diagnostico";
const TITLE = "Find out what would save your business the most time | Autisync";
const DESCRIPTION = "Three quick questions, then a plan for a business like yours and a free 15-minute call. Takes under a minute.";

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: URL, languages: { en: URL, pt: PT_URL } },
    robots: { index: false, follow: true },
    openGraph: { type: "website", url: URL, siteName: "Autisync", title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png" }] },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og-image.png"] },
};

export default function QuizPage() {
    return <QuizShell lang="en" />;
}
