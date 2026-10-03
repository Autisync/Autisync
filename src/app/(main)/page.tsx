import React from "react";
import Landing from "@/app/(main)/homescreen/landing";
import WhyUs from "@/app/(main)/homescreen/whyUs";
import Packages from "@/app/(main)/homescreen/packages";
import Team from "@/app/(main)/homescreen/team";
import Tools from "@/app/(main)/homescreen/tools";
import Clients from "@/app/(main)/solutions/clients";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: { absolute: "Autisync — Web Design, Branding & Digital Agency | Angola · UK · Portugal" },
    description:
        "Websites, brand identities, social media and AI automation for growing businesses in Angola, the UK and Portugal. Clear prices: websites from Kz 495.000 / £1,490. Trusted by Florentek, Grupo Girassol, Blue Horizon and more.",
    alternates: { canonical: "https://www.autisync.com" },
    openGraph: {
        title: "Autisync — We Systemize Your Success",
        description:
            "AI automation, web development, graphic design, and IT support for growing businesses worldwide.",
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
            <WhyUs />
            <Team />
            <Packages/>
            <Tools />
        </>
    );
}