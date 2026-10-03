import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n/routes";
import SEO from "./seopage";

export const metadata: Metadata = {
  title: "SEO & Digital Marketing",
  description:
      "Autisync's SEO and digital marketing services — social media management, email campaigns, content strategy, and analytics to grow your online presence.",
  alternates: alternatesFor("/solutions/seo", "en"),
  openGraph: {
    title: "SEO & Digital Marketing — Autisync",
    description:
        "Drive traffic, build authority, and convert visitors with Autisync's data-driven marketing solutions.",
    url: "https://www.autisync.com/solutions/seo",
  },
};

export default function SEOPage() {
  return <SEO />;
}