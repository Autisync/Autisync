import Link from "next/link";
import BookingWidget from "@/app/components/BookingWidget";
import { WHATSAPP_DISPLAY, waLink } from "@/lib/whatsapp";

const COPY = {
    en: {
        eyebrow: "Free, no obligation",
        h1: "Book a free 15-minute call",
        intro: "Pick a time that suits you. We listen to what you need (a website, online booking, missed-call text-back, a CRM) and tell you straight how we would do it and what it costs.",
        points: ["15 minutes, on the phone or a video call", "A plain answer: what to do first, and the price", "Bookings go straight into our calendar; you get a confirmation by email"],
        alt: "Rather write?",
        wa: `Message us on WhatsApp at ${WHATSAPP_DISPLAY}`,
        waText: "Hi Autisync! I'd like to book a free 15-minute call.",
        quiz: "Or take the 1-minute quiz",
        quizHref: "/quiz",
    },
    pt: {
        eyebrow: "Gratuito, sem compromisso",
        h1: "Marque uma chamada gratuita de 15 minutos",
        intro: "Escolha a hora que lhe der mais jeito. Ouvimos o que precisa (um site, marcações online, resposta automática a chamadas perdidas, um CRM) e dizemos-lhe com clareza como o faríamos e quanto custa.",
        points: ["15 minutos, por telefone ou videochamada", "Uma resposta clara: por onde começar e o preço", "A marcação entra logo no nosso calendário; recebe a confirmação por email"],
        alt: "Prefere escrever?",
        wa: `Envie-nos uma mensagem no WhatsApp para ${WHATSAPP_DISPLAY}`,
        waText: "Olá Autisync! Gostaria de marcar uma chamada gratuita de 15 minutos.",
        quiz: "Ou faça o diagnóstico de 1 minuto",
        quizHref: "/pt/diagnostico",
    },
};

/** The free 15-minute call, on its own page (linked from every page's footer). */
export default function BookCall({ lang }: { lang: "en" | "pt" }) {
    const c = COPY[lang];
    return (
        <main className="bg-white">
            <section className="px-6 pt-32 pb-20 mx-auto max-w-5xl lg:px-8">
                <p className="text-sm font-semibold tracking-wide uppercase text-[#B28228]">{c.eyebrow}</p>
                <h1 className="mt-2 text-4xl font-semibold text-gray-900 [text-wrap:balance] sm:text-5xl">{c.h1}</h1>
                <p className="max-w-2xl mt-4 text-lg text-gray-600">{c.intro}</p>
                <ul className="grid gap-2 mt-6 text-gray-700 sm:grid-cols-3">
                    {c.points.map((p) => (
                        <li key={p} className="flex gap-2 text-sm"><span aria-hidden="true" className="text-[#B28228]">✓</span>{p}</li>
                    ))}
                </ul>
                <div id="book" className="mt-10 max-w-[760px] scroll-mt-24">
                    <BookingWidget lang={lang} preferMinutes={15} />
                </div>
                <p className="mt-8 text-sm text-gray-600">
                    {c.alt}{" "}
                    <a href={waLink(c.waText, lang === "pt" ? "WEB-marcar" : "WEB-book")} target="_blank" rel="noopener noreferrer"
                        className="font-semibold text-[#128C7E] hover:underline" data-track={`WhatsApp from booking page · ${lang}`}>{c.wa}</a>
                    {" · "}
                    <Link href={c.quizHref} className="font-semibold text-[#B28228] hover:underline">{c.quiz}</Link>
                </p>
            </section>
        </main>
    );
}
