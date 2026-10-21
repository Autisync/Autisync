import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n/routes";
import BookCall from "@/app/(main)/book/BookCall";

export const metadata: Metadata = {
    title: "Marque uma chamada gratuita de 15 minutos",
    description: "Escolha a hora para uma chamada gratuita de 15 minutos com a Autisync: sites, marcações online, resposta a chamadas perdidas e CRM para pequenas empresas. Sem compromisso.",
    alternates: alternatesFor("/book", "pt"),
    openGraph: { title: "Marque uma chamada gratuita de 15 minutos com a Autisync", url: "https://www.autisync.com/pt/marcar", locale: "pt_PT" },
};

export default function MarcarPage() {
    return <BookCall lang="pt" />;
}
