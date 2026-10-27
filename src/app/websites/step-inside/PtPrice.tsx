"use client";

import { usePackageCurrency } from "@/app/components/PackagePricing";
import { carePlanMonthly, formatPrice, type WebsiteTier } from "@/lib/website-packages";
import s from "@/app/(main)/crm/crm.module.css";
import f from "@/app/components/funnel.module.css";

/**
 * The "From …" price box on the Portuguese step-inside page. Portuguese
 * readers are mostly in Angola or Portugal, so instead of the English page's
 * fixed pounds it shows the visitor's market (Kz, €, N$ or £), the same way
 * /pt/precos does. Server render and first paint use kwanza (the default
 * market); the browser then switches to the saved or guessed market.
 */
export default function PtPrice({ tier, tierName }: { tier: WebsiteTier; tierName: string }) {
    const [currency] = usePackageCurrency();
    return (
        <div className={f.price} style={{ marginTop: 32 }}>
            <span className={s.muted}>Desde</span>
            <span className={f.priceBig}>{formatPrice(tier.price[currency], currency)}</span>
            <span className={s.muted}>no primeiro ano, com domínio e alojamento incluídos</span>
            <p>
                Com base no nosso pacote {tierName}. A partir do 2.º ano: {formatPrice(carePlanMonthly[currency], currency)}/mês
                para alojamento, e-mail, cópias de segurança e alterações.
            </p>
        </div>
    );
}
