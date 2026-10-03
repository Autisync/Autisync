import type { Metadata } from "next";
import QuestionarioClient from "./QuestionarioClient";
import { alternatesFor } from "@/lib/i18n/routes";

export const metadata: Metadata = {
  // Form page: kept out of the index, like the English version.
  title: "Comece o Seu Projeto — Questionário de Serviços",
  description:
      "Fale-nos da sua empresa e do seu projeto em poucos minutos e respondemos com o pacote certo e uma proposta à medida.",
  alternates: alternatesFor("/ServiceQuestionaire", "pt"),
  robots: { index: false, follow: true },
};

export default function QuestionarioPage() {
  return (
    <div lang="pt">
      <QuestionarioClient />
    </div>
  );
}
