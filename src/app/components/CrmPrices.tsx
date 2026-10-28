"use client";

/**
 * CRM prices on the main site: a full section for /servicepackage and
 * /pt/precos (id="crm", linked from the menu), and a compact card for the
 * home page. Every figure comes from lib/crm-pricing.ts.
 */
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/solid";
import { ArrowRight } from "lucide-react";
import { usePackageCurrency } from "@/app/components/PackagePricing";
import { formatPrice } from "@/lib/website-packages";
import { crmLite, crmPriceRows, whiteLabelBuild } from "@/lib/crm-pricing";

type Lang = "en" | "pt";

const T = {
    en: {
        eyebrow: "CRM",
        title: "CRM prices by type of business",
        sub: "Monthly, per business rather than per person, before VAT, plus a one-off setup fee: we set it up for you, move your data over and train your team. Setup is halved if you pay yearly. Cancel with 30 days’ notice.",
        setup: "one-off setup",
        from: "from",
        month: "/ month",
        oneOff: "one-off",
        see: "See plans",
        ask: "Ask us",
        book: "/book",
        liteCta: "Start with CRM Lite",
        wlCta: "See the white-label build",
        wlHref: "/crm/deliveries#white-label",
        cardTitle: "Autisync CRM",
        cardText: "Clients, inbox, bookings, quotes and invoices in one place, set up for your kind of business.",
        cardCta: "See CRM prices",
        cardHref: "/servicepackage#crm",
    },
    pt: {
        eyebrow: "CRM",
        title: "Preços do CRM por tipo de negócio",
        sub: "Mensal, por negócio e não por pessoa, sem IVA, mais uma taxa de instalação única: configuramos por si, passamos os seus dados e formamos a equipa. A instalação fica a metade com pagamento anual. Cancela com 30 dias de aviso.",
        setup: "de instalação (pagamento único)",
        from: "desde",
        month: "/ mês",
        oneOff: "pagamento único",
        see: "Ver planos",
        ask: "Fale connosco",
        book: "/pt/marcar",
        liteCta: "Começar com o CRM Lite",
        wlCta: "Ver o sistema com a sua marca",
        wlHref: "/crm/entregas#white-label",
        cardTitle: "CRM Autisync",
        cardText: "Clientes, caixa de entrada, marcações, orçamentos e faturas num só lugar, configurado para o seu tipo de negócio.",
        cardCta: "Ver preços do CRM",
        cardHref: "/pt/precos#crm",
    },
};

export function CrmPrices({ lang = "en" }: { lang?: Lang }) {
    const [currency] = usePackageCurrency();
    const t = T[lang];
    const lite = crmLite[lang];
    const wl = whiteLabelBuild[lang];
    const rows = crmPriceRows.filter((r) => r.id !== "lite" && r.id !== "whitelabel");

    return (
        <section id="crm" aria-labelledby="crm-prices" className="mt-16 scroll-mt-24">
            <div className="max-w-3xl">
                <p className="text-base font-semibold text-[#B28228]">{t.eyebrow}</p>
                <h2 id="crm-prices" className="mt-2 text-3xl font-bold tracking-tight text-[#3B3B3B] sm:text-4xl">{t.title}</h2>
                <p className="mt-3 text-lg text-gray-600">{t.sub}</p>
            </div>

            <div className="grid gap-6 mt-10 lg:grid-cols-5">
                {/* Every kind of business, with its starting price */}
                <ul className="lg:col-span-3 bg-white rounded-3xl shadow-md ring-1 ring-gray-200 divide-y divide-gray-100 overflow-hidden">
                    {rows.map((r) => {
                        const href = r.href ? r.href[lang] : t.book;
                        return (
                            <li key={r.id}>
                                <Link href={href} className="group flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                                    <span className="flex-1 min-w-0 font-semibold text-[#3B3B3B] group-hover:text-[#B28228]">{lang === "pt" ? r.pt : r.en}</span>
                                    <span className="text-right whitespace-nowrap">
                                        <span className="text-xs text-gray-500">{t.from} </span>
                                        <span className="font-bold text-[#3B3B3B] tabular-nums">{formatPrice(r.from[currency], currency)}</span>
                                        <span className="text-xs text-gray-500"> {r.perMonth ? t.month : t.oneOff}</span>
                                    </span>
                                    <span className="hidden sm:inline-flex items-center gap-1 w-24 justify-end text-sm font-semibold text-[#B28228]">
                                        {r.href ? t.see : t.ask}
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="lg:col-span-2 grid gap-6 content-start">
                    {/* CRM Lite */}
                    <div className="rounded-3xl bg-white p-6 shadow-md ring-2 ring-[#B28228]">
                        <h3 className="text-xl font-bold text-[#3B3B3B]">{lite.name}</h3>
                        <p className="mt-1 text-sm text-gray-600">{lite.tagline}</p>
                        <p className="mt-4">
                            <span className="text-4xl font-extrabold text-[#3B3B3B] tabular-nums">{formatPrice(crmLite.price[currency], currency)}</span>
                            <span className="text-sm text-gray-500"> {t.month}</span>
                        </p>
                        <p className="mt-1 text-sm text-gray-500">+ {formatPrice(crmLite.setup[currency], currency)} {t.setup}</p>
                        <ul className="mt-4 space-y-2 text-sm text-gray-700">
                            {lite.features.map((f) => (
                                <li key={f} className="flex gap-2">
                                    <CheckIcon className="flex-none w-4 h-5 text-[#B28228]" aria-hidden="true" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 text-xs leading-5 text-gray-500">{lite.notIncluded}</p>
                        <Link href={t.book} className="mt-5 block w-full text-center py-2.5 px-4 rounded-md font-semibold bg-[#B28228] text-white hover:bg-[#1C1C1C] transition-colors">
                            {t.liteCta}
                        </Link>
                    </div>

                    {/* White-label build, handed over */}
                    <div className="rounded-3xl bg-[#1C1C1C] p-6 text-white shadow-xl ring-1 ring-[#B28228]/40">
                        <h3 className="text-xl font-bold">{wl.name}</h3>
                        <p className="mt-1 text-sm text-[#d1a94c]">{wl.tagline}</p>
                        <p className="mt-4">
                            <span className="text-xs text-gray-400">{wl.priceNote} </span>
                            <span className="text-3xl font-extrabold tabular-nums">{formatPrice(whiteLabelBuild.price[currency], currency)}</span>
                        </p>
                        <p className="mt-2 text-xs text-gray-400">
                            {wl.dayRateLabel}: {formatPrice(whiteLabelBuild.dayRate[currency], currency)} {wl.perDay}
                        </p>
                        <Link href={t.wlHref} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#d1a94c] hover:text-white">
                            {t.wlCta}
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

/** The home page card: one line of what it is, the lowest price, and a link. */
export function CrmPriceCard({ lang = "en" }: { lang?: Lang }) {
    const [currency] = usePackageCurrency();
    const t = T[lang];
    return (
        <div className="px-6 mx-auto max-w-7xl lg:px-8 -mt-4 pb-16">
            <Link
                href={t.cardHref}
                className="group flex flex-col gap-4 sm:flex-row sm:items-center rounded-3xl bg-white p-6 sm:p-8 ring-1 ring-gray-200 shadow-sm hover:ring-[#B28228] transition"
            >
                <div className="flex-1 min-w-0">
                    <p className="text-lg font-bold text-gray-900">{t.cardTitle}</p>
                    <p className="mt-1 text-gray-600">{t.cardText}</p>
                </div>
                <p className="whitespace-nowrap">
                    <span className="text-sm text-gray-500">{t.from} </span>
                    <span className="text-3xl font-extrabold text-gray-900 tabular-nums">{formatPrice(crmLite.price[currency], currency)}</span>
                    <span className="text-sm text-gray-500"> {t.month}</span>
                </p>
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#B28228]">
                    {t.cardCta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
            </Link>
        </div>
    );
}
