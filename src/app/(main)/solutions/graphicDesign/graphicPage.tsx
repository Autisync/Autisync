import Image from "next/image";
import Link from "next/link";


const features = [
    {
        name: "Professional Logo Design",
        description:
            "A well-designed logo builds trust by validating your professionalism and get's people to stick around. It tells potential clients who you are, what you do, and how that benefits them.",
        href: "https://images.unsplash.com/3/doctype-hi-res.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1730&q=80",
    },
    {
        name: "Print Media & Stationery Design",
        description:
            "Excellent way to reach new markets, build brand recognition and create brand awareness and it produces the templates used for important internal and external communication in a business",
        href: "https://images.unsplash.com/photo-1416339134316-0e91dc9ded92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
    {
        name: "Web (UX/UI) Design & Internet Advertising",
        description:
            "A well-designed website can help you form a good impression on your prospective customers. It can also help you nurture your leads and get more conversions. ",
        href: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    },
];

const services = [
    {
        name: "Professional Logo Design",
        description: "Logo | Brand Book | Mockups",
    },
    {
        name: "Stationery Design",
        description:
            "Company Stationery Mockups | look and feel of your company's communication material.",
    },
    {
        name: "Print Media Design",
        description:
            "Company Profiles | Flyers | Posters | Business Cards | Advertisement Print Material and More",
    },
    {
        name: "Multimedia Design",
        description:
            "Animated Movie | Digital Videos | Graphics & Visual Effects | UX/UI Design",
    },
];
export default function CreativeDesign() {
    return (
        <>
            {/* Landing */}
            <div className="relative overflow-hidden bg-gray-100 isolate pt-12">
                <svg
                    className="absolute inset-0 -z-10 h-full w-full stroke-red-800/20 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
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
                        fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
                    />
                </svg>
                <div className="px-6 pt-10 pb-24 mx-auto max-w-7xl sm:pb-32 lg:flex lg:px-8 lg:py-20">
                    <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                        <h1 className="mt-10 text-lg text-[var(--autisync-gold,#B98B2F)]">
                            First Impressions Count
                        </h1>
                        <h2 className="text-4xl font-bold tracking-tight text-gray-700 sm:text-6xl">

                            Creative Design & Multimedia
                        </h2>
                        <p className="mt-6 text-base leading-8 text-gray-600">
                            Unique and Memorable Designs that stand out so that your customers
                            easily identify your Brand, Service, and Product.
                        </p>
                        <br />
                        <Link
                            className="px-4 py-3 mb-1 text-xs text-white uppercase transition-all duration-150 ease-linear bg-[#1C1C1C] rounded shadow outline-none hover:bg-[var(--autisync-gold,#B98B2F)] hover:shadow-md focus:outline-none sm:mr-2 transition-all hover:shadow-[0_16px_30px_rgba(0,0,0,0.18)]/10"
                            href="/servicepackage/"
                        >
                            Check out Our Packages
                        </Link>
                    </div>
                    <div className="flex max-w-2xl mx-auto mt-16 sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                        <div className="flex-none max-w-3xl sm:max-w-5xl lg:max-w-none">
                            <div className="p-2 -m-2 bg-[#1C1C1C] rounded-xl ring-1 ring-inset ring-gray-800 lg:-m-4 lg:rounded-2xl lg:p-4">
                                <Image
                                    src="https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                                    alt="App screenshot"
                                    width={1200}
                                    height={1200}
                                    className="w-[40rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main body */}
            <div className="py-16 bg-gray-100 sm:py-32">
                <div className="px-6 mx-auto max-w-7xl lg:px-8">
                    <div className="max-w-2xl mx-auto lg:text-center">
                        <h2 className="text-base leading-7 text-[var(--autisync-gold,#B98B2F)] font-base">
                            Growth through Digitalization
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl">
                            Bespoke & Identifying Designs
                        </p>
                        <p className="mt-3 text-base text-gray-600">
                            Developing the overall layout and production design for
                            applications such as advertisements, information platforms,
                            brochures, magazines, and reports.
                        </p>
                    </div>
                    <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            {features.map((feature) => (
                                <div key={feature.name} className="flex flex-col shadow-lg">
                                    <figure className="relative max-w-sm overflow-hidden hover:blur-none transition-all duration-300 cursor-pointer">
                                        <Image
                                            className="rounded-lg rounded-b-none hover:scale-110 cursor-pointer object-cover transition-all duration-500 bg-black opacity-95"
                                            src={feature.href}
                                            width={1000}
                                            height={1000}
                                            alt="image description"
                                        />
                                        <figcaption className="absolute px-4 text-lg text-white bottom-6">
                                            <p>{feature.name}</p>
                                        </figcaption>
                                    </figure>

                                    <dd className="flex flex-col flex-auto p-4 text-base leading-7 text-gray-600 bg-white rounded-b-lg">
                                        <p className="flex-auto">{feature.description}</p>
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        {/* Service tab */}
                        <dl className="grid max-w-2xl grid-cols-1 gap-4 mx-auto mt-16 text-base leading-7 text-gray-300 bg-gray-100 hover:delay-300 sm:grid-cols-4 lg:mx-0 lg:max-w-none lg:gap-x-4">
                            {services.map((service) => (
                                <div
                                    key={service.name}
                                    className="group block max-w-sm p-6 bg-white rounded-md shadow-md hover:bg-[#1C1C1C]"
                                >
                                    {" "}
                                    <h5 className="group-hover:animate-bounce group-hover:text-white mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                        {service.name}
                                    </h5>
                                    <p className="text-gray-500 group-hover:text-white text-sm">
                                        {service.description}
                                    </p>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-[#1C1C1C]">
                <div className="py-24 mx-auto max-w-7xl sm:px-6 sm:py-32 lg:px-8">
                    <div className="relative px-6 pt-16 overflow-hidden bg-gray-100 shadow-2xl isolate sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                        <svg
                            viewBox="0 0 1024 1024"
                            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                            aria-hidden="true"
                        >
                            <circle
                                cx={512}
                                cy={512}
                                r={512}
                                fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                                fillOpacity="0.7"
                            />
                            <defs>
                                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                    <stop stopColor="#B98B2F" />
                                    <stop offset={1} stopColor="#B98B2F" />
                                </radialGradient>
                            </defs>
                        </svg>
                        <div className="max-w-md mx-auto text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-[#1C1C1C] sm:text-4xl">
                                Visionary Organizations Use{" "}
                                <span className="text-[var(--autisync-gold,#B98B2F)]">Creative Design</span> to Improve
                                Customer Experience
                            </h2>
                            <div className="flex items-center justify-center mt-10 gap-x-6 lg:justify-start">
                                <Link
                                    href="https://wa.me/+447883317646"
                                    target="_blank"
                                    className="group rounded-md bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm hover:bg-[#1C1C1C] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    Call Us{" "}
                                    <span className="group-hover:text-[var(--autisync-gold,#B98B2F)] ">
                    (WhatsApp)
                  </span>
                                </Link>
                                <Link
                                    href="mailto:info@enovtechnologies.com"
                                    className="text-sm font-semibold leading-6 text-[#1C1C1C] hover:text-[var(--autisync-gold,#B98B2F)]"
                                >
                                    Book a Consultation <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                        <div className="relative mt-16 h-80 lg:mt-8">
                            <Image
                                className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                                src="https://images.unsplash.com/photo-1484807352052-23338990c6c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                                alt="App screenshot"
                                width={1824}
                                height={1080}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}