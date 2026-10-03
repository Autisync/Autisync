import type { Metadata } from "next";
import ServicePackages from "./ServicePackages"; // or whatever your current component is named

export const metadata: Metadata = {
  title: "Prices: Website, Branding & Social Media Packages",
  description:
      "Autisync packages with clear prices: websites from Kz 495.000 / £1,490, branding from Kz 180.000 / £490, social media management from Kz 150.000 / £450 a month, and the Brand & Website Launch bundle.",
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