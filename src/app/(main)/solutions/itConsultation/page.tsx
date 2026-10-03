import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n/routes";
import Consult from "./consultpage";

export const metadata: Metadata = {
    title: "IT Consultation & Technical Support",
    description:
        "Expert IT consultation and technical support from Autisync. Device setup, system configuration, security monitoring, helpdesk, and ongoing maintenance.",
    alternates: alternatesFor("/solutions/itConsultation", "en"),
    openGraph: {
        title: "IT Consultation & Tech Support — Autisync",
        description:
            "Keep your business running smoothly with Autisync's end-to-end IT services and infrastructure management.",
        url: "https://www.autisync.com/solutions/itConsultation",
    },
};

export default function ConsultPage() {
    return <Consult />;
}