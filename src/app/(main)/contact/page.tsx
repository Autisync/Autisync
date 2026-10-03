import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n/routes";
import Contact from "./Contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
      "Get in touch with Autisync. We're available across the UK, Portugal, Namibia, and Angola. Start a conversation about your next digital project.",
  alternates: alternatesFor("/contact", "en"),
  openGraph: {
    title: "Contact Autisync",
    description:
        "Ready to start your project? Reach out to our team and we'll get back to you within one business day.",
    url: "https://www.autisync.com/contact",
  },
};

export default function ContactPage() {
  return <Contact />;
}