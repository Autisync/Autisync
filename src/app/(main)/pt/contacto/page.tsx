import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n/routes";
import ContactoClient from "./ContactoClient";

export const metadata: Metadata = {
  title: "Contacto",
  description:
      "Fale com a Autisync, agência digital em Luanda, Angola. Peça uma proposta para o seu website, branding, SEO ou consultoria de TI e responderemos em 1 dia útil.",
  alternates: alternatesFor("/contact", "pt"),
  openGraph: {
    title: "Contactar a Autisync",
    description:
        "Pronto para começar o seu projeto? Fale com a nossa equipa e responderemos no prazo de um dia útil.",
    url: "https://www.autisync.com/pt/contacto",
    locale: "pt_AO",
  },
};

export default function ContactoPage() {
  return (
    <div lang="pt">
      <ContactoClient />
    </div>
  );
}
