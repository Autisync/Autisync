import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n/routes";
import Development from "./development";

export const metadata: Metadata = {
    title: "Web & App Development",
    description:
        "Custom website and application development by Autisync. From marketing sites to full-stack web apps — built with Next.js, React, and modern technologies.",
    alternates: alternatesFor("/solutions/devServices", "en"),
    openGraph: {
        title: "Web & App Development — Autisync",
        description:
            "Bespoke websites and web applications built for performance, scalability, and conversion.",
        url: "https://www.autisync.com/solutions/devServices",
    },
};

export default function DevelopmentPage() {
    return <Development />;
}