import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n/routes";
import Consult from "./consultpage";

export const metadata: Metadata = {
    title: "IT Consulting & Systems",
    description:
        "IT consulting from Autisync: system configuration, network security, infrastructure planning and ongoing maintenance for growing businesses.",
    alternates: alternatesFor("/solutions/itConsultation", "en"),
    openGraph: {
        title: "IT Consulting & Systems — Autisync",
        description:
            "Keep your business running smoothly with Autisync's end-to-end IT services and infrastructure management.",
        url: "https://www.autisync.com/solutions/itConsultation",
    },
};

export default function ConsultPage() {
    return <Consult />;
}