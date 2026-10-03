import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n/routes";
import SobreClient from "./SobreClient";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
      "Conheça a Autisync, agência digital em Luanda, Angola: design, desenvolvimento web e consultoria de TI para modernizar a marca e os sistemas da sua empresa.",
  alternates: alternatesFor("/about", "pt"),
  openGraph: {
    title: "Sobre a Autisync — A Nossa História, Equipa e Valores",
    description:
        "De startups a grandes empresas — a Autisync é o seu parceiro tecnológico de longo prazo para a transformação digital em Angola e não só.",
    url: "https://www.autisync.com/pt/sobre",
    locale: "pt_AO",
  },
};

export default function SobrePage() {
  return (
    <div lang="pt">
      <SobreClient />
    </div>
  );
}
