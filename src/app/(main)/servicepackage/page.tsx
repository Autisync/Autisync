import type { Metadata } from "next";
import ServicePackages from "./ServicePackages"; // or whatever your current component is named

export const metadata: Metadata = {
  title: "Prices: Websites, Branding, Social Media and CRM",
  description:
      "Websites from £1,490 / Kz 495.000, branding from £490, social media from £450 a month and the Autisync CRM from £29 a month. Clear, fixed prices.",
  alternates: {
    canonical: "https://www.autisync.com/servicepackage",
    languages: {
      "en": "https://www.autisync.com/servicepackage",
      "pt": "https://www.autisync.com/pt/precos",
      "x-default": "https://www.autisync.com/servicepackage",
    },
  },
  openGraph: {
    title: "Autisync Prices — Websites, Branding & Social Media Packages",
    description:
        "Affordable digital packages combining stunning design, automation, and strategy. Every package scales with your growth.",
    url: "https://www.autisync.com/servicepackage",
  },
};

export default function ServicePackage() {
  return <ServicePackages />;

}