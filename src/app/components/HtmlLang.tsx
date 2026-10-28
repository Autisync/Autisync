"use client";

/**
 * Keeps <html lang> right as the visitor moves between English and
 * Portuguese pages without a full reload. The first paint is set by the
 * inline script in the root layout (langScript), and the Content-Language
 * header in next.config.ts tells crawlers the same thing.
 */
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { htmlLangFor } from "@/lib/i18n/routes";

export default function HtmlLang() {
    const path = usePathname() || "/";
    useEffect(() => {
        document.documentElement.lang = htmlLangFor(path);
    }, [path]);
    return null;
}
