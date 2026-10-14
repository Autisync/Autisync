import type { Metadata } from "next";
import Link from "next/link";
import { FunnelShell, BookSection } from "@/app/components/FunnelShell";
import s from "@/app/crm/crm.module.css";
import f from "@/app/components/funnel.module.css";

export const metadata: Metadata = {
    title: { absolute: "Free tools for small businesses | Autisync" },
    description: "Free calculators for local businesses: what missed calls cost you, and what a website costs in the UK.",
    alternates: { canonical: "https://www.autisync.com/tools" },
};

// Each tool answers something people search for, then points to the Autisync product that solves it.
const TOOLS = [
    { href: "/tools/missed-call-cost", t: "Missed call cost calculator", d: "See what unanswered calls cost your business a month and a year." },
    { href: "/tools/website-cost", t: "Website cost estimator (UK)", d: "Pick your pages and features and see the price, including year two." },
    { href: "/websites/step-inside", t: "Step-inside website demo", d: "Scroll through a walk-in from the street into a shop." },
];

export default function ToolsIndex() {
    return (
        <FunnelShell>
            <header className={s.section}>
                <div className={s.wrap}>
                    <span className={s.pill}><i />Free</span>
                    <h1 className={s.heroTitle} style={{ marginTop: 14 }}>Free tools for <span>local businesses.</span></h1>
                    <div className={f.cards} style={{ marginTop: 32 }}>
                        {TOOLS.map((x) => (
                            <Link key={x.href} href={x.href} className={f.cardItem} style={{ textDecoration: "none" }}>
                                <h3>{x.t} →</h3>
                                <p>{x.d}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </header>
            <BookSection eyebrow="Talk to us" title="Want help with any of this?" text="Book a short call with the Autisync team." points={["Websites", "CRM and bookings", "Missed-call text-back"]} />
        </FunnelShell>
    );
}
