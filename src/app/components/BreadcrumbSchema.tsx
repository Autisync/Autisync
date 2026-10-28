/**
 * BreadcrumbList structured data: Home › Section › Page. Google shows it in
 * place of the raw URL in results. Paths are site-relative ("/crm").
 */
const BASE = "https://www.autisync.com";

export default function BreadcrumbSchema({ items }: { items: Array<{ name: string; path: string }> }) {
    const json = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: it.name,
            item: `${BASE}${it.path === "/" ? "" : it.path}`,
        })),
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
