"use client";

import { useMarket } from "@/app/components/PackagePricing";
import { formatPrice, websiteTiers } from "@/lib/website-packages";
import { useLang } from "@/lib/i18n/lang";

/**
 * The one hero sentence that names where we work, written for the visitor's
 * market: a reader in Windhoek sees Namibia first and a price in N$, not a
 * list that starts with Angola and a figure in kwanza.
 *
 * Server render says all four; after mount it narrows to the visitor's, so
 * the first paint is stable and search engines read the full list.
 */
export function HeroMarketLine() {
    const { market, ready } = useMarket();
    const lang = useLang();
    const from = formatPrice(websiteTiers[0].price[market.currency], market.currency);
    if (lang === "pt") {
        // Portuguese needs the right preposition per country: em Angola, na Namíbia, no Reino Unido.
        const inMarket: Record<string, string> = { AO: "em", NA: "na", GB: "no", PT: "em" };
        const othersPt: Record<string, string> = {
            AO: "no Reino Unido, em Portugal e na Namíbia",
            NA: "em Angola, no Reino Unido e em Portugal",
            GB: "em Portugal, em Angola e na Namíbia",
            PT: "no Reino Unido, em Angola e na Namíbia",
        };
        if (!ready) {
            return (
                <p className="mt-4 text-lg text-gray-200">
                    A Autisync cria websites, identidades de marca, gestão de redes sociais e
                    automação com IA para empresas que querem crescer em Angola, na Namíbia, no Reino Unido
                    e em Portugal. Tudo feito por nós, do primeiro clique à reunião marcada.
                </p>
            );
        }
        return (
            <p className="mt-4 text-lg text-gray-200">
                A Autisync cria websites, identidades de marca, gestão de redes sociais e automação com IA
                para empresas que querem crescer {inMarket[market.code]}{" "}
                <span className="font-semibold text-white">{market.namePt}</span>
                {" "}e também {othersPt[market.code]}. Websites a partir de{" "}
                <span className="font-semibold text-white">{from}</span>. Tudo feito por nós,
                do primeiro clique à reunião marcada.
            </p>
        );
    }
    const others: Record<string, string> = {
        AO: "the UK, Portugal and Namibia",
        NA: "Angola, the UK and Portugal",
        GB: "Portugal, Angola and Namibia",
        PT: "the UK, Angola and Namibia",
    };
    if (!ready) {
        return (
            <p className="mt-4 text-lg text-gray-200">
                Autisync builds websites, brand identities, social media and
                AI automation for growing businesses in Angola, Namibia, the UK and
                Portugal. Everything done for you, from first click to booked call.
            </p>
        );
    }
    return (
        <p className="mt-4 text-lg text-gray-200">
            Autisync builds websites, brand identities, social media and AI automation
            for growing businesses in <span className="font-semibold text-white">{market.name}</span>
            {" "}and across {others[market.code]}. Websites from{" "}
            <span className="font-semibold text-white">{from}</span>. Everything done for you,
            from first click to booked call.
        </p>
    );
}
