import React from "react";
import Link from "next/link";
import Landing from "@/app/(main)/homescreen/landing";
import WhyUs from "@/app/(main)/homescreen/whyUs";
import Packages from "@/app/(main)/homescreen/packages";
import Team from "@/app/(main)/homescreen/team";
import Tools from "@/app/(main)/homescreen/tools";
import Clients from "@/app/(main)/solutions/clients";
import UseCasesSection from "@/app/components/useCases/UseCasesSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: { absolute: "Autisync — Web Design, Branding & Digital Agency | Angola · UK · Portugal" },
    description:
        "Websites, brand identities, social media and AI automation for growing businesses in Angola, the UK and Portugal. Clear prices: websites from Kz 495.000 / £1,490. Trusted by Florentek, Grupo Girassol, Blue Horizon and more.",
    alternates: {
        canonical: "https://www.autisync.com",
        languages: {
            "en": "https://www.autisync.com",
            "pt": "https://www.autisync.com/pt",
            "x-default": "https://www.autisync.com",
        },
    },
    openGraph: {
        title: "Autisync — We Systemize Your Success",
        description:
            "AI automation, web development, graphic design, and IT consulting for growing businesses worldwide.",
        url: "https://www.autisync.com",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Autisync Homepage" }],
    },
};

export default function Home() {
    return (
        <>
            <Landing />
            {/* Social proof high on the page: real client logos */}
            <Clients />
            {/* The UK clinics page, linked the way /pt links /pt/clinicas. */}
            <p className="px-6 py-8 text-center">
                <Link href="/clinics" className="font-semibold text-[#B28228] hover:underline">
                    Run a clinic, dental practice or salon in the UK? See what we set up for you →
                </Link>
            </p>
            <UseCasesSection lang="en" />
            <WhyUs />
            <Team />
            <Packages/>
            <Tools />
        </>
    );
}