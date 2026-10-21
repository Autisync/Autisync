/**
 * A short "How we're different" / "Sem surpresas" block: a title and a few
 * plain promises in a grid. No hooks, so server pages and client pages can
 * both use it. Each page passes its own words, so the block is never the
 * same text everywhere.
 *
 * Only put promises here that Autisync keeps today (or the CRM enforces):
 * monthly plans, 30 days' notice, renewal reminders, export, named person.
 */
export type PromiseItem = { t: string; d: string };

export default function Promises({
    id,
    eyebrow,
    title,
    intro,
    items,
    className = "",
}: {
    id: string;
    eyebrow?: string;
    title: string;
    intro?: string;
    items: PromiseItem[];
    className?: string;
}) {
    return (
        <section aria-labelledby={id} className={"max-w-6xl mx-auto " + className}>
            <div className="max-w-3xl mx-auto text-center">
                {eyebrow && <p className="text-sm font-semibold text-[#B28228]">{eyebrow}</p>}
                <h2 id={id} className="mt-2 text-3xl font-bold tracking-tight text-[#3B3B3B] sm:text-4xl [text-wrap:balance]">
                    {title}
                </h2>
                {intro && <p className="mt-4 text-lg text-gray-600">{intro}</p>}
            </div>
            <dl className="grid gap-x-8 gap-y-6 mt-10 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                    <div key={p.t} className="border-l-2 border-[#B28228] pl-4">
                        <dt className="font-semibold text-[#3B3B3B]">{p.t}</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-600">{p.d}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
