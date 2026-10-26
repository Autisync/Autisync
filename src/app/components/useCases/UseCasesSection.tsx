import Link from "next/link";
import UseCases from "./UseCases";
import { enCases, enCopy, ptCases, ptCopy } from "./cases";

/**
 * The home page's use cases: every kind of business we set the CRM up for,
 * with a filter, so a visitor can find the cases that look like theirs.
 */
export default function UseCasesSection({ lang = "en" }: { lang?: "en" | "pt" }) {
    const pt = lang === "pt";
    return (
        <section aria-labelledby="home-casos" className="py-20 bg-[#F7F5F1]">
            <div className="px-6 mx-auto max-w-6xl lg:px-8">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold text-[#B28228]">{pt ? "Casos de uso" : "Use cases"}</p>
                    <h2 id="home-casos" className="mt-2 text-3xl font-bold tracking-tight text-[#3B3B3B] sm:text-4xl [text-wrap:balance]">
                        {pt ? "O que o CRM da Autisync pode fazer pelo seu negócio" : "What the Autisync CRM can do for your business"}
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        {pt
                            ? "Escolha o tipo de negócio e veja, caso a caso, o que o seu cliente recebe e o que a sua equipa vê. Configuramos tudo por si; os casos marcados como Extra são módulos à parte."
                            : "Pick your kind of business and see, case by case, what your client gets and what your team sees. We set it all up for you; cases marked Add-on are separate modules."}
                    </p>
                </div>
                <div className="mt-10">
                    <UseCases
                        cases={pt ? ptCases : enCases}
                        copy={pt ? ptCopy : enCopy}
                        groups={["clinics", "salons", "agencies", "services"]}
                        idPrefix="home-uc"
                    />
                </div>
                <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                    <Link href={pt ? "/pt/clinicas" : "/clinics"} className="text-[#B28228] hover:underline">
                        {pt ? "Clínicas e salões" : "Clinics and salons"}
                    </Link>
                    <Link href={pt ? "/crm/imobiliarias" : "/crm/estate-agents"} className="text-[#B28228] hover:underline">
                        {pt ? "CRM para imobiliárias" : "CRM for estate agents"}
                    </Link>
                    <Link href={pt ? "/pt/crm" : "/crm"} className="text-[#B28228] hover:underline">
                        {pt ? "Tudo sobre o CRM" : "All about the CRM"}
                    </Link>
                </p>
            </div>
        </section>
    );
}
