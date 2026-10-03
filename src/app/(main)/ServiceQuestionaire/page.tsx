import type { Metadata } from "next";
import Questionnaire from "./Questionnaire"; // or whatever your current component is named

export const metadata: Metadata = {
  // Was a copy of the About page's metadata (same title + canonical), which
  // told Google this page was a duplicate of /about. It's a form, so keep it
  // out of the index (robots.txt also disallows it).
  title: "Start Your Project — Service Questionnaire",
  description:
      "Tell Autisync about your business and project in a few minutes, and we'll come back with the right package and a proposal.",
  alternates: { canonical: "https://www.autisync.com/ServiceQuestionaire" },
  robots: { index: false, follow: true },
};

export default function QuestionnairePage() {
  return <Questionnaire />;
}