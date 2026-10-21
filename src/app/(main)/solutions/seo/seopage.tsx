import Image from "next/image";
import Link from "next/link";
import Clients from "../clients";
import { waLink } from "@/lib/whatsapp";

type Feature = {
    name: string;
    description: string;
};

type Step = {
    title: string;
    subtitle: string;
    description: string;
};

type FAQ = {
    question: string;
    answer: string;
};

const features: Feature[] = [
    {
        name: "Benchmark Your Current SEO Performance",
        description:
            "We start with a deep audit of your website, content, and search visibility so we can set clear goals, track results, and understand what’s working and what needs improvement.",
    },
    {
        name: "Tools, Data & Automation",
        description:
            "We combine Google Analytics, Search Console, keyword tools, and AI-powered insights to uncover high-value keywords, content gaps, and optimisation opportunities.",
    },
    {
        name: "SEO + Social Media Alignment",
        description:
            "We align SEO with your social channels to boost visibility, engagement, and brand authority — helping your content appear in front of the right people more often.",
    },
];

const processSteps: Step[] = [
    {
        title: "Step 1",
        subtitle: "Discovery & Audit",
        description:
            "We analyse your current website, competitors, keywords, and technical health to identify quick wins and long-term opportunities.",
    },
    {
        title: "Step 2",
        subtitle: "Strategy & Roadmap",
        description:
            "We define a tailored SEO plan covering on-page optimisation, content strategy, local SEO (if relevant), and authority building.",
    },
    {
        title: "Step 3",
        subtitle: "Implementation",
        description:
            "We optimise pages, improve internal linking, fix technical issues, and create or refine content to match what your audience is actually searching for.",
    },
    {
        title: "Step 4",
        subtitle: "Monitoring & Reporting",
        description:
            "We track rankings, traffic, and conversions, then refine the strategy based on real performance – you get clear, easy-to-read reports.",
    },
];

const faqItems: FAQ[] = [
    {
        question: "How long does it take to see SEO results?",
        answer:
            "SEO is a long-term investment. Many businesses start seeing meaningful improvements within 3–6 months, depending on competition, website history, and how quickly changes can be implemented.",
    },
    {
        question: "Do I need SEO if I’m already running ads?",
        answer:
            "Yes. Paid ads stop the moment you turn off the budget. SEO builds long-term visibility and authority so you can keep attracting customers organically, and your ads often perform better when your website is well optimised.",
    },
    {
        question: "Can you help with local SEO for my area?",
        answer:
            "Absolutely. We optimise your Google Business Profile, local citations, on-page content, and reviews strategy so local customers can actually find you when they search.",
    },
    {
        question: "Will I get reports about what you’re doing?",
        answer:
            "Yes. You’ll receive regular reports with rankings, traffic trends, key actions taken, and simple explanations so you always know where your investment is going.",
    },
];

export default function SEO() {
    return (
        <>
            {/* HERO / LANDING */}
            <div className="relative overflow-hidden bg-gray-100 isolate mt-12">
                <svg
                    className="absolute inset-0 -z-10 h-full w-full stroke-[var(--autisync-gold,#B98B2F)] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="seo-grid-pattern"
                            width={200}
                            height={200}
                            x="50%"
                            y={-1}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M.5 200V.5H200" fill="none" />
                        </pattern>
                    </defs>
                    <rect
                        width="100%"
                        height="100%"
                        strokeWidth={0}
                        fill="url(#seo-grid-pattern)"
                    />
                </svg>

                <div className="px-6 pt-10 pb-24 mx-auto max-w-7xl sm:pb-32 lg:flex lg:px-8 lg:py-20">
                    {/* LEFT HERO TEXT */}
                    <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                        <p className="mt-4 text-base font-base text-[var(--autisync-gold,#B98B2F)]">
                            Reach Your Audience
                        </p>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-800 sm:text-6xl">
                            SEO & Audience Engagement
                        </h1>
                        <p className="mt-6 text-base leading-8 text-gray-600">
                            Turn search traffic into real enquiries and customers. Our
                            Strategic Audience Engagement service combines SEO, content, and
                            analytics to help your business rank higher, get discovered, and
                            stay top-of-mind.
                        </p>

                        <div className="flex flex-wrap items-center mt-8 gap-4">
                            <Link
                                href="/servicepackage"
                                className="px-5 py-2 text-sm text-white bg-[#1C1C1C] rounded-md shadow hover:bg-[var(--autisync-gold,#B98B2F)] hover:shadow-lg transition"
                            >
                                Explore Service Packages
                            </Link>
                            <Link
                                href={waLink("Hi Autisync! I'd like to talk about a project.", "WEB-seo")}
                                target="_blank"
                                className="text-sm font-medium text-gray-700 hover:text-[var(--autisync-gold,#B98B2F)] underline underline-offset-4"
                            >
                                Request a Free SEO Snapshot
                            </Link>
                        </div>

                        <ul className="mt-6 space-y-2 text-sm text-gray-600">
                            <li>• Local & national SEO strategies</li>
                            <li>• Ideal for service businesses & growing brands</li>
                            <li>• Transparent reporting & no confusing jargon</li>
                        </ul>
                    </div>

                    {/* RIGHT HERO IMAGE */}
                    <div className="flex max-w-2xl mx-auto mt-16 sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                        <div className="flex-none max-w-3xl sm:max-w-5xl lg:max-w-none">
                            <div className="p-2 -m-2 bg-[#1C1C1C] rounded-xl ring-1 ring-inset ring-gray-800 lg:-m-4 lg:rounded-2xl lg:p-4">
                                <Image
                                    src="https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80"
                                    alt="SEO dashboards and analytics"
                                    width={1200}
                                    height={1200}
                                    className="w-[40rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* EVERYTHING YOU NEED / SCREENSHOT SECTION */}
            <div className="py-12 bg-gray-100 sm:py-16">
                <div className="px-6 mx-auto max-w-7xl lg:px-8">
                    <div className="max-w-2xl mx-auto sm:text-center">
                        <h2 className="text-base font-base leading-7 text-[var(--autisync-gold,#B98B2F)]">
                            Everything you need
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl">
                            A One-Stop SEO Partner
                        </p>
                        <p className="mt-2 text-base text-gray-600">
                            From audits to implementation and reporting, we handle the entire
                            SEO workflow so you don’t have to juggle multiple freelancers or
                            tools.
                        </p>
                    </div>
                </div>

                <div className="relative pt-16 overflow-hidden">
                    <div className="px-6 mx-auto max-w-7xl lg:px-8">
                        <Image
                            src="/seos.png"
                            alt="SEO overview dashboard"
                            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-white/10"
                            width={2432}
                            height={1442}
                        />
                        <div className="relative" aria-hidden="true">
                            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-gray-100 pt-[7%]" />
                        </div>
                    </div>
                </div>

                {/* FEATURE GRID */}
                <div className="px-6 mx-auto mt-16 max-w-7xl sm:mt-20 md:mt-24 lg:px-8">
                    <dl className="grid max-w-2xl grid-cols-1 mx-auto text-base leading-7 text-gray-300 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-9">
                                <dt className="inline font-semibold text-[#1C1C1C]">
                                    <span className="absolute left-0 top-1 h-5 w-5 rounded-full bg-[var(--autisync-gold,#B98B2F)]/10 border border-[var(--autisync-gold,#B98B2F)]" />
                                    {feature.name}
                                </dt>{" "}
                                <dd className="inline text-gray-600">
                                    {feature.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            {/* PROCESS SECTION */}
            <section className="bg-white py-16 sm:py-20 border-t border-gray-200">
                <div className="max-w-7xl px-6 mx-auto lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-base font-base uppercase text-[var(--autisync-gold,#B98B2F)]">
                            Our Approach
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
                            How Our SEO Process Works
                        </p>
                        <p className="mt-2 text-base text-gray-600">
                            Clear, transparent steps so you always know what’s happening and
                            what comes next.
                        </p>
                    </div>

                    <div className="grid gap-8 mt-10 md:grid-cols-2 lg:grid-cols-4">
                        {processSteps.map((step) => (
                            <div
                                key={step.title}
                                className="flex flex-col h-full rounded-2xl border border-gray-200 bg-gray-50/80 p-5 shadow-sm"
                            >
                                <p className="text-xs font-semibold tracking-[0.2em] text-[var(--autisync-gold,#B98B2F)] uppercase">
                                    {step.title}
                                </p>
                                <h3 className="mt-2 text-lg font-semibold text-gray-800">
                                    {step.subtitle}
                                </h3>
                                <p className="mt-3 text-sm text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SIMPLE CASE STUDY / RESULT HIGHLIGHT */}
            <section className="bg-[#1C1C1C] py-16 sm:py-20">
                <div className="max-w-6xl px-6 mx-auto lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div>
                            <p className="text-base font-base text-[var(--autisync-gold,#B98B2F)]">
                                Example Outcome
                            </p>
                            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                                From invisible to visible in local search.
                            </h2>
                            <p className="mt-4 text-sm text-gray-300">
                                A local service business went from barely appearing on Google to
                                consistently ranking on the first page for high-intent local
                                keywords. That translated into more calls, more bookings, and a
                                stronger brand presence — all driven by organic search.
                            </p>
                            <ul className="mt-5 space-y-2 text-sm text-gray-300">
                                <li>• Technical clean-up and on-page optimisation</li>
                                <li>• Local SEO focus with Google Business Profile optimisation</li>
                                <li>• Content tuned to real customer questions and intent</li>
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-gray-700 bg-[#1C1C1C]/60 p-6 shadow-lg">
                            <h3 className="text-lg font-semibold text-white">
                                What you can expect from working with us
                            </h3>
                            <ul className="mt-4 space-y-2 text-sm text-gray-200">
                                <li>• Clear roadmap and priorities each month</li>
                                <li>• Actionable reports instead of confusing spreadsheets</li>
                                <li>• A partner that understands both tech and marketing</li>
                                <li>• Strategies aligned with your business goals, not vanity metrics</li>
                            </ul>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link
                                    href={waLink("Hi Autisync! I'd like to talk about a project.", "WEB-seo")}
                                    target="_blank"
                                    className="inline-flex items-center rounded-md bg-white px-4 py-2 text-xs font-semibold text-gray-900 shadow-sm hover:bg-gray-200"
                                >
                                    Talk About Your SEO
                                </Link>
                                <Link
                                    href="/ServiceQuestionaire"
                                    className="inline-flex items-center rounded-md border border-gray-500 px-4 py-2 text-xs font-semibold text-gray-100 hover:border-[var(--autisync-gold,#B98B2F)] hover:text-[var(--autisync-gold,#B98B2F)]"
                                >
                                    Fill the Service Questionnaire
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="bg-gray-100 py-16 sm:py-20 border-t border-gray-200">
                <div className="max-w-3xl px-6 mx-auto lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base font-base text-[var(--autisync-gold,#B98B2F)]">
                            Questions
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
                            SEO FAQs
                        </p>
                        <p className="mt-2 text-base text-gray-600">
                            If something isn’t covered here, you can always reach out and ask
                            directly — we’re happy to clarify anything.
                        </p>
                    </div>

                    <div className="mt-10 space-y-4">
                        {faqItems.map((item) => (
                            <details
                                key={item.question}
                                className="group rounded-lg border border-gray-200 bg-white px-5 py-4"
                            >
                                <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-gray-800 list-none">
                                    <span>{item.question}</span>
                                    <span className="ml-4 text-xs text-gray-500 group-open:hidden">
                    +
                  </span>
                                    <span className="ml-4 text-xs text-gray-500 hidden group-open:inline">
                    –
                  </span>
                                </summary>
                                <p className="mt-2 text-sm text-gray-600">{item.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <div className="relative overflow-hidden bg-[#1C1C1C] isolate">
                <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
              <span className="text-[var(--autisync-gold,#B98B2F)]">
                Expand Your Reach
              </span>
                            <br />
                            Start using Strategic Audience Engagement Services.
                        </h2>

                        <p className="mt-4 text-sm text-gray-300">
                            Share your goals, and we’ll review your current visibility and
                            suggest a roadmap to grow your organic traffic — no pressure, no
                            hard sell.
                        </p>

                        <div className="flex items-center justify-center mt-10 gap-x-6">
                            <Link
                                href={waLink("Hi Autisync! I'd like to talk about a project.", "WEB-seo")}
                                target="_blank"
                                className="rounded-md group bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm hover:bg-gray-200 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Call Us <span className="group-hover:text-[var(--autisync-gold,#B98B2F)]">(WhatsApp)</span>
                            </Link>
                            <Link
                                href="/contact"
                                className="text-sm leading-6 font-semibold text-gray-50 hover:text-[var(--autisync-gold,#B98B2F)]"
                            >
                                Book a Consultation <span aria-hidden="true">→</span>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>

            {/* CLIENT LOGOS / SOCIAL PROOF */}
            <Clients />
        </>
    );
}
