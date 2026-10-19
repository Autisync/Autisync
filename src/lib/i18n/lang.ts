"use client";
/**
 * Which language a shared component should speak: the page's own address
 * decides (/pt/… is Portuguese), so the same component serves both sites and
 * nothing has to pass a prop down. Server components take `lang` as a prop
 * instead (see the homescreen sections).
 */
import { usePathname } from "next/navigation";
import { isPtPath } from "./routes";

export type Lang = "en" | "pt";

export function useLang(): Lang {
    return isPtPath(usePathname() || "/") ? "pt" : "en";
}

/** Pick the words for the current language: pick(lang, "Book a call", "Marcar chamada"). */
export const pick = <T,>(lang: Lang, en: T, pt: T): T => (lang === "pt" ? pt : en);
