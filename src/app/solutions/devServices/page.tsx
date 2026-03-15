import Image from "next/image";
import Clients from "../clients";
import Link from "next/link";
import { NextSeo } from "next-seo";

const features = [
    {   id: 1,
        name: "Consult your idea",
        description:
            "Establishing the path forward with the guidance of our development team.",
        num: "1",
    },
    {id: 2,
        name: "Choose a technology",
        description:
            "Make decisions regarding the technology stack and overall approach.",
        num: "2",
    },
    {id: 3,
        name: "Design",
        description: "Create a visually stunning and user-friendly solution.",
        num: "3",
    },
    {id: 4,
        name: "Development",
        description:
            "Development of the system/platform by our experienced engineers.",
        num: "4",
    },
    {id: 5,
        name: "Ship To Market",
        description:
            "Ensuring a successful product launch and providing ongoing support and maintenance",
        num: "5",
    },
];

const services = [
    {
        name: "Software Development",
        description:
            "We specialize in developing custom software solutions that precisely cater to our clients specific needs, offering enhanced automation and usability.",
    },
    {
        name: "Web Development",
        description:
            "By seamlessly integrating frontend and backend solutions, along with other essential technologies, we ensure the success of your product.",
    },
    {
        name: "Mobile Application Development",
        description:
            "Featuring a user-friendly interface, flawless functionality, and personalized experiences, our mobile apps empower your customers while driving your business towards its goals.",
    },
    {
        name: "Technology Integration",
        description:
            "To enhance data organization, accessibility, and sharing capabilities, we leverage diverse technologies, including cloud technology, ensuring your data is efficiently managed and readily available.",
    },
    {
        name: "Custom Enterprise Solution",
        description:
            "Secure the ideal enterprise technology solution that will elevate your organization both now and in the future, delivering precise and sustainable results.",
    },
    {
        name: "CMS Customization and Implementation",
        description:
            "Our custom CMS development services optimize content-related operations, expediting processes and improving overall efficiency for organizations.",
    },
];

export default function DevService() {
    return (
        <>

            {/* Landing */}
            <div className="relative overflow-hidden bg-gray-100 isolate pt-12">
                <svg
                    className="absolute inset-0 -z-10 h-full w-full stroke-[var(--autisync-gold,#B98B2F)]/20 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
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
                        <h1 className="mt-10 text-base font-base text-[var(--autisync-gold,#B98B2F)]">
                Platforms that assist
              </h1>
                        <h2 className="text-4xl font-bold tracking-tight text-gray-700 sm:text-6xl">
                            Development Services
                        </h2>
                        <p className="mt-6 text-base leading-8 text-gray-600">
                            We are proud to provide exceptional development services to a
                            diverse range of clients, including small businesses and major
                            global brands. With a proven track record and a team of skilled
                            professionals, we expertly meet the unique requirements of each
                            project.
                        </p>
                        <br/>
                        <Link
                            className="px-4 py-3 mb-1 text-xs text-white uppercase transition-all duration-150 ease-linear bg-[var(--autisync-gold,#B98B2F)] rounded shadow outline-none hover:bg-[#1C1C1C] hover:shadow-md focus:outline-none sm:mr-2 transition-all hover:shadow-[0_16px_30px_rgba(0,0,0,0.18)]/10"
                            type="button"
                             href="/servicepackage/"
                        >
                                Checkout Our Packages
                        </Link>
                    </div>
                    <div className="flex max-w-2xl mx-auto mt-16 sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                        <div className="flex-none max-w-3xl sm:max-w-5xl lg:max-w-none">
                            <div className="p-2 -m-2 bg-[#1C1C1C] rounded-xl ring-1 ring-inset ring-gray-800 lg:-m-4 lg:rounded-2xl lg:p-4">
                                <Image
                                    src="https://images.pexels.com/photos/7988210/pexels-photo-7988210.jpeg"
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
                    <div className="max-w-5xl mx-auto lg:text-center">
                        <h2 className="text-base leading-7 text-[var(--autisync-gold,#B98B2F)] font-base">
                            Processing Progression
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl">
                            Proven developmental process
                        </p>
                        <p className="mt-6 text-base leading-8 text-gray-600">
                            At Autisync, we understand that tackling the most complex
                            projects requires our web development team to meticulously attend
                            to every detail during the creation of web-based solutions. With a
                            track record of successfully delivering over 50 projects, we
                            possess the firsthand knowledge and expertise needed to execute a
                            seamless and optimized web-based software development process.{" "}
                        </p>
                        <br />
                    </div>

                    {/* Timeline */}
                    <ol className="items-center sm:flex">
                        {features.map((feature) => (
                            <li className="relative mb-6 sm:mb-0" key={feature.id}>
                                <div className="flex items-center">
                                    <div className="z-10 flex items-center justify-center w-6 h-6 bg-[var(--autisync-gold,#B98B2F)]/20 rounded-full ring-0 ring-white dark:bg-[var(--autisync-gold,#B98B2F)] sm:ring-8 dark:ring-gray-900 shrink-0 hover:scale-150 transition-all duration-300 ease-out">
                                        <h4 className="font-semibold text-gray-700">
                                            {feature.num}
                                        </h4>
                                    </div>
                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                </div>

                                    <div className="mt-3 sm:pr-4" key={feature.name}>
                                        <h3 className="text-lg font-semibold text-gray-700 ">
                                            {feature.name}
                                        </h3>
                                        <p className="text-base font-normal text-gray-500 ">
                                            {feature.description}
                                        </p>
                                    </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

            {/* Services */}
            <div className="py-24 bg-[#1C1C1C] sm:py-32">
                <div className="px-6 mx-auto max-w-7xl lg:px-8">
                    <div className="max-w-2xl mx-auto lg:mx-0">
                        <h2 className="text-base leading-7 text-[var(--autisync-gold,#B98B2F)] font-base">
                            Everything you need
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Development Services
                        </p>
                        {/* <p className="mt-6 text-lg leading-8 text-gray-300">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste
            dolor cupiditate blanditiis.
          </p> */}
                    </div>
                    <dl className="grid max-w-2xl grid-cols-1 gap-8 mx-auto mt-16 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
                        {services.map((service) => (
                            <div key={service.name} className="relative">
                                <dt className="inline font-semibold text-gray-50">
                                    {service.name}
                                </dt>{" "}
                                <dd className="text-justify text-gray-400 ">
                                    {service.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            <Clients />

            {/* Call to Action */}
            <div className="relative overflow-hidden bg-gray-100 isolate">
                <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-600 sm:text-4xl">
                            <span className="text-[var(--autisync-gold,#B98B2F)]">Boost your productivity.</span>
                            <br />
                            Start using our Development Services today.
                        </h2>

                        <div className="flex items-center justify-center mt-10 gap-x-6">
                            <Link
                                href="tel:+244927114400"
                                target="_blank"
                                className="rounded-md bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-md hover:bg-[#1C1C1C] hover:text-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:shadow-lg transition-all hover:shadow-[0_16px_30px_rgba(0,0,0,0.18)]/10"
                            >
                                Give Us a Call
                            </Link>
                            <Link
                                href="mailto:info@autisync.com"
                                className="text-sm font-semibold leading-6 text-gray-600 hover:text-[var(--autisync-gold,#B98B2F)]"
                            >
                                Book a Consultation <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}