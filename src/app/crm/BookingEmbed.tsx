import BookingWidget from "@/app/components/BookingWidget";

/**
 * Autisync's booking section. It used to frame book.autisync.com in an
 * iframe; it now books natively against the Autisync CRM (see
 * components/BookingWidget.tsx and lib/booking.ts), so it matches the site
 * and every page that already uses <BookingEmbed /> picks it up.
 */
export default function BookingEmbed({ lang = "en" }: { lang?: "en" | "pt" }) {
    return <BookingWidget lang={lang} />;
}
