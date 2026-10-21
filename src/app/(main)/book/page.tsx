import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n/routes";
import BookCall from "./BookCall";

export const metadata: Metadata = {
    title: "Book a free 15-minute call",
    description: "Pick a time for a free 15-minute call with Autisync: websites, online booking, missed-call text-back and CRM for small businesses. No obligation.",
    alternates: alternatesFor("/book", "en"),
    openGraph: { title: "Book a free 15-minute call with Autisync", url: "https://www.autisync.com/book" },
};

export default function BookPage() {
    return <BookCall lang="en" />;
}
