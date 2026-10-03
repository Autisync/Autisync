import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n/routes";
import GraphicPage from "./graphicPage";

export const metadata: Metadata = {
    title: "Graphic Design",
    description:
        "Brand identities, logos, print collateral, social media kits, and more. Autisync's graphic design team crafts visuals that make lasting impressions.",
    alternates: alternatesFor("/solutions/graphicDesign", "en"),
    openGraph: {
        title: "Graphic Design Services — Autisync",
        description:
            "From logo design to full brand identity packages. Visuals that communicate your value at a glance.",
        url: "https://www.autisync.com/solutions/graphicDesign",
    },
};

export default function Graphic() {
    return <GraphicPage />;
}