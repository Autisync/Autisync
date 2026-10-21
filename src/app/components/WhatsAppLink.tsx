"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { pageRef, pageWaLink } from "@/lib/whatsapp";

/**
 * A WhatsApp link in the page's words, with the page's marker
 * ("(ref WEB-tools)"), for components shared by many pages.
 */
export default function WhatsAppLink({ children, text, className }: { children: ReactNode; text?: string; className?: string }) {
    const pathname = usePathname() || "/";
    return (
        <a href={pageWaLink(pathname, text)} target="_blank" rel="noopener noreferrer" className={className} data-track={`WhatsApp link · ${pageRef(pathname)}`}>
            {children}
        </a>
    );
}
