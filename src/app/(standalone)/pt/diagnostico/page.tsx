import type { Metadata } from "next";
import QuizShell from "@/app/quiz/QuizShell";

// A página para onde vão as publicações e os anúncios em português.
// Gémea inglesa: /quiz. Fora do sitemap e não indexada, como a inglesa.
const URL = "https://www.autisync.com/pt/diagnostico";
const EN_URL = "https://www.autisync.com/quiz";
const TITLE = "Descubra o que pouparia mais tempo ao seu negócio | Autisync";
const DESCRIPTION = "Três perguntas rápidas, um plano para um negócio como o seu e uma chamada gratuita de 15 minutos. Demora menos de um minuto.";

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: URL, languages: { pt: URL, en: EN_URL } },
    robots: { index: false, follow: true },
    openGraph: { type: "website", url: URL, siteName: "Autisync", locale: "pt_PT", title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png" }] },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og-image.png"] },
};

export default function DiagnosticoPage() {
    return <QuizShell lang="pt" />;
}
