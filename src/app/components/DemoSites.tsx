/**
 * "See a website like yours": the demo websites we built for made-up
 * businesses, each booking into its own demo account in the CRM. Used on
 * /clinics and /pt/clinicas. Screenshots live in public/crm/industries/.
 */
import Image from "next/image";
import { DEMO_SITES } from "@/app/(main)/crm/industries";

type Lang = "en" | "pt";

const SITES = (lang: Lang) => [
    {
        name: "Alvura Dental Clinic",
        url: DEMO_SITES.clinics,
        shot: "/crm/industries/clinics/site.webp",
        text: lang === "pt"
            ? "Clínica dentária em Lisboa e Londres, em português e inglês: a próxima vaga lida em direto da agenda, marcação na própria página e pedidos que chegam ao CRM."
            : "A dental practice in London and Lisbon, in English and Portuguese: the next free appointment read live from the diary, booking on the page and enquiries into the CRM.",
    },
    {
        name: "Aurelle Skin Clinic",
        url: "https://aurelle-demo-site.vercel.app",
        shot: null,
        text: lang === "pt"
            ? "Clínica de pele em Chester: tratamentos com preços, escolha da profissional e marcação confirmada por e-mail, tudo dentro do CRM."
            : "A skin clinic in Chester: treatments with prices, choice of practitioner and bookings confirmed by email, all inside the CRM.",
    },
    {
        name: "Maré Hair & Beauty",
        url: DEMO_SITES.salons,
        shot: "/crm/industries/salons/site.webp",
        text: lang === "pt"
            ? "Salão de cabeleireiro e estética: serviços por profissional, sinal nas marcações longas e lembretes antes de cada visita."
            : "A hair and beauty salon: services by stylist, deposits on long appointments and reminders before every visit.",
    },
];

export default function DemoSites({ lang = "en" }: { lang?: Lang }) {
    const pt = lang === "pt";
    return (
        <section aria-labelledby="demo-sites" className="px-6 py-20 mx-auto max-w-6xl lg:px-8">
            <p className="text-sm font-semibold text-[#B28228]">{pt ? "Sites de demonstração" : "Demo websites"}</p>
            <h2 id="demo-sites" className="mt-2 text-3xl font-semibold text-gray-800 [text-wrap:balance]">
                {pt ? "Veja como seria o site do seu negócio" : "See what your website would look like"}
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-600">
                {pt
                    ? "Negócios inventados, sites a funcionar: abra um, marque uma consulta e veja-a chegar à agenda de demonstração no CRM."
                    : "Made-up businesses, working websites: open one, book an appointment and it lands in that business's demo diary in the CRM."}
            </p>
            <ul className="grid gap-6 mt-10 md:grid-cols-3">
                {SITES(lang).map((s) => (
                    <li key={s.name}>
                        <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col h-full overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:ring-[#B28228] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B28228] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                        >
                            <div className="relative aspect-[16/10] bg-gradient-to-br from-[#1C1C1C] to-[#4a3a1c]">
                                {s.shot ? (
                                    <Image src={s.shot} alt={pt ? `Site de demonstração da ${s.name}` : `${s.name} demo website`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-top" />
                                ) : (
                                    <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-2xl font-semibold text-white">{s.name}</span>
                                )}
                                <span className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-[#1C1C1C] px-3 py-1.5 text-xs font-semibold text-white">
                                    <i className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true" />
                                    {pt ? "Ao vivo" : "Live demo"}
                                </span>
                            </div>
                            <div className="flex flex-col flex-1 p-6">
                                <h3 className="text-lg font-semibold text-gray-900">{s.name}</h3>
                                <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">{s.text}</p>
                                <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-[#B28228]">
                                    {pt ? "Abrir o site" : "Open the website"} <span aria-hidden="true">↗</span>
                                </span>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}
