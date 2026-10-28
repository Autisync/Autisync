import type { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n/routes";
import Questionnaire from "./Questionnaire";

export const metadata: Metadata = {
  // Was a copy of the About page's metadata (same title + canonical), which
  // told Google this page was a duplicate of /about. It's a form, so keep it
  // out of the index (its noindex tag; robots.txt leaves it crawlable so Google can read the tag).
  title: "Start Your Project — Service Questionnaire",
  description:
      "Tell Autisync about your business and project in a few minutes, and we'll come back with the right package and a proposal.",
  alternates: alternatesFor("/ServiceQuestionaire", "en"),
  robots: { index: false, follow: true },
};

export default function QuestionnairePage() {
  return <Questionnaire />;
}