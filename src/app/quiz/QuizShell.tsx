import localFont from "next/font/local";
import QuizFunnel from "./QuizFunnel";
import type { QuizLang } from "./quizCopy";
import s from "./quiz.module.css";

// The same self-hosted faces as the CRM page (Outfit for headings, DM Sans for text).
const display = localFont({ src: "../fonts/Outfit-Variable.woff2", weight: "100 900", variable: "--font-quiz-display", display: "swap" });
const body = localFont({ src: "../fonts/DMSans-Variable.woff2", weight: "100 1000", variable: "--font-quiz-body", display: "swap" });

/** The quiz page in either language: fonts and the dark ground here, the quiz itself in QuizFunnel. */
export default function QuizShell({ lang }: { lang: QuizLang }) {
    return (
        <div className={`${display.variable} ${body.variable} ${s.page}`} lang={lang === "pt" ? "pt" : undefined}>
            <QuizFunnel lang={lang} />
        </div>
    );
}
