"use client";

/**
 * Portuguese package cards, launch bundle and price switch for /pt and
 * /pt/precos. Words come from src/lib/i18n/pt.ts; prices from the shared
 * package data files.
 */
import { CheckIcon } from "@heroicons/react/24/solid";
import { CarePlanNote, CurrencyToggle, TierPrice, usePackageCurrency } from "@/app/components/PackagePricing";
import { formatPrice, websiteTiers, type Currency } from "@/lib/website-packages";
import { brandingTiers, launchBundle, socialTiers } from "@/lib/service-packages";
import { ptBranding, ptBundle, ptSocial, ptSocialTerms, ptUi, ptWebsite } from "@/lib/i18n/pt";

const WHATSAPP = "https://wa.me/447883317646";
const wa = (msg: string) => `${WHATSAPP}?text=${encodeURIComponent(msg)}`;

type Tier = { id: string; price: Record<Currency, number>; mostPopular?: boolean };
type Copy = { name: string; description: string; features: string[]; detail?: string };

function Card({ tier, copy, kind, currency }: { tier: Tier; copy: Copy; kind: string; currency: Currency }) {
    const price = formatPrice(tier.price[currency], currency);
    return (
        <div
            className={
                "relative flex flex-col justify-between rounded-3xl p-6 bg-white shadow-md " +
                (tier.mostPopular ? "ring-2 ring-[#B28228]" : "ring-1 ring-gray-200")
            }
        >
            <div>
                <div className="flex items-center justify-between gap-x-4">
                    <h3 className="text-xl font-bold text-[#3B3B3B]">
                        <span className="text-[#B28228]">{kind}</span> {copy.name}
                    </h3>
                    {tier.mostPopular && (
                        <p className="rounded-full bg-[#B28228]/10 px-2.5 py-1 text-xs font-semibold leading-5 text-[#B28228]">
                            {ptUi.mostPopular}
                        </p>
                    )}
                </div>
                <p className="mt-2 text-sm text-gray-600">{copy.description}</p>
                <div className="mt-5">
                    <TierPrice amount={tier.price[currency]} currency={currency} note={copy.detail} locale="pt" />
                </div>
                <ul className="mt-6 space-y-2 text-sm text-gray-700">
                    {copy.features.map((f) => (
                        <li key={f} className="flex gap-2">
                            <CheckIcon className="flex-none w-4 h-5 text-[#B28228]" aria-hidden="true" />
                            {f}
                        </li>
                    ))}
                </ul>
            </div>
            <a
                href={wa(ptUi.whatsapp(`${kind} ${copy.name}`, price))}
                target="_blank"
                rel="noopener noreferrer"
                className={
                    "mt-6 inline-block w-full text-center py-2 px-4 rounded-md font-semibold border border-[#B28228] transition " +
                    (tier.mostPopular
                        ? "bg-[#B28228] text-white hover:bg-[#1C1C1C] hover:border-[#1C1C1C]"
                        : "text-[#B28228] hover:bg-[#B28228] hover:text-white")
                }
            >
                {ptUi.choose(copy.name)}
            </a>
        </div>
    );
}

export function PtBundle({ currency }: { currency: Currency }) {
    const price = formatPrice(launchBundle.price[currency], currency);
    const separately = formatPrice(launchBundle.separately[currency], currency);
    const saving = formatPrice(launchBundle.separately[currency] - launchBundle.price[currency], currency);
    return (
        <section
            aria-labelledby="pt-bundle"
            className="relative overflow-hidden rounded-3xl bg-[#1C1C1C] text-white shadow-xl ring-1 ring-[#B28228]/40"
        >
            <div className="grid gap-8 p-8 lg:grid-cols-5 lg:p-10">
                <div className="lg:col-span-3">
                    <p className="inline-block rounded-full bg-[#B28228] px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                        Melhor valor · Poupe {saving}
                    </p>
                    <h2 id="pt-bundle" className="mt-4 text-3xl font-bold sm:text-4xl">{ptBundle.name}</h2>
                    <p className="mt-2 text-lg text-[#d1a94c]">{ptBundle.tagline}</p>
                    <p className="mt-4 text-gray-300">{ptBundle.description}</p>
                    <ul className="mt-6 space-y-2 text-sm text-gray-200">
                        {ptBundle.features.map((f) => (
                            <li key={f} className="flex gap-2">
                                <CheckIcon className="flex-none w-4 h-5 text-[#d1a94c]" aria-hidden="true" />
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col justify-center rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 lg:col-span-2">
                    <p className="text-sm text-gray-400 line-through">{separately} em separado</p>
                    <p className="mt-1 text-4xl font-extrabold">{price}</p>
                    <p className="mt-1 text-xs text-gray-400">{ptUi.oneOff}</p>
                    <a
                        href={wa(ptUi.whatsapp(ptBundle.name, price))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex justify-center rounded-md bg-[#B28228] px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-[#d1a94c]"
                    >
                        Quero lançar a minha marca
                    </a>
                    <p className="mt-3 text-xs text-gray-400">Respondemos no WhatsApp em 1 dia útil.</p>
                </div>
            </div>
        </section>
    );
}

/** Home page offer: price switch + bundle + link to all prices. */
export function PtHomeOffer() {
    const [currency, setCurrency] = usePackageCurrency();
    return (
        <div>
            <CurrencyToggle value={currency} onChange={setCurrency} locale="pt" />
            <div className="mt-8">
                <PtBundle currency={currency} />
            </div>
            <p className="mt-6 text-center">
                <a href="/pt/precos" className="font-semibold text-[#B28228] hover:underline">
                    Ver todos os pacotes e preços →
                </a>
            </p>
        </div>
    );
}

function Group({ id, title, intro, children }: { id: string; title: string; intro: string; children: React.ReactNode }) {
    return (
        <section aria-labelledby={id} className="mt-20">
            <div className="max-w-3xl mx-auto text-center">
                <h2 id={id} className="text-3xl font-bold tracking-tight text-[#3B3B3B] sm:text-4xl">{title}</h2>
                <p className="mt-4 text-lg text-gray-600">{intro}</p>
            </div>
            {children}
        </section>
    );
}

/** Full /pt/precos price list (everything expanded — best for search). */
export function PtPricing() {
    const [currency, setCurrency] = usePackageCurrency();
    return (
        <div>
            <CurrencyToggle value={currency} onChange={setCurrency} locale="pt" />
            <div className="mt-10">
                <PtBundle currency={currency} />
            </div>

            <Group id="pt-websites" title="Pacotes de Website" intro="Websites profissionais com domínio, alojamento e e-mail incluídos no primeiro ano.">
                <div className="grid grid-cols-1 gap-8 mt-12 lg:grid-cols-3">
                    {websiteTiers.map((t) => (
                        <Card key={t.id} tier={t} copy={ptWebsite[t.id]} kind="Website" currency={currency} />
                    ))}
                </div>
                <CarePlanNote currency={currency} locale="pt" />
            </Group>

            <Group id="pt-branding" title="Pacotes de Branding" intro="Logótipo, papelaria e identidade completa para a sua empresa.">
                <div className="grid grid-cols-1 gap-8 mt-12 lg:grid-cols-3">
                    {brandingTiers.map((t) => (
                        <Card key={t.id} tier={t} copy={ptBranding[t.id]} kind="Branding" currency={currency} />
                    ))}
                </div>
            </Group>

            <Group id="pt-social" title="Gestão de Redes Sociais" intro="Conteúdo consistente, vídeo curto e alcance pago que transformam seguidores em contactos.">
                <div className="grid grid-cols-1 gap-8 mt-12 lg:grid-cols-3">
                    {socialTiers.map((t) => (
                        <Card key={t.id} tier={t} copy={ptSocial[t.id]} kind="Redes Sociais" currency={currency} />
                    ))}
                </div>
                <p className="max-w-3xl mx-auto mt-8 text-xs leading-5 text-center text-gray-500">{ptSocialTerms}</p>
            </Group>
        </div>
    );
}
