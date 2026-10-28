import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n/routes";
import BookCall from "@/app/(main)/book/BookCall";

export const metadata: Metadata = {
    title: "Marque uma chamada gratuita de 15 minutos",
    description: "Marque uma chamada gratuita de 15 minutos com a Autisync sobre sites, marcações online, chamadas perdidas e CRM para pequenas empresas.",
    alternates: alternatesFor("/book", "pt"),
    openGraph: { title: "Marque uma chamada gratuita de 15 minutos com a Autisync", url: "https://www.autisync.com/pt/marcar", locale: "pt_PT" },
};

export default function MarcarPage() {
    return <BookCall lang="pt" />;
}
