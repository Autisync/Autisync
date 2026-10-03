import React from "react";
import Landing from "@/app/(main)/homescreen/landing";
import WhyUs from "@/app/(main)/homescreen/whyUs";
import Packages from "@/app/(main)/homescreen/packages";
import Team from "@/app/(main)/homescreen/team";
import Tools from "@/app/(main)/homescreen/tools";
import Clients from "@/app/(main)/solutions/clients";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "We Systemize Your Success",
    description:
        "Autisync empowers service businesses with AI automation, creative design, and seamless system integration — from branding to backend. UK · Portugal · Namibia · Angola.",
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