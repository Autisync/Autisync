/* This example requires Tailwind CSS v3.0+ */
// import { useState } from "react";
// import { Dialog } from "@headlessui/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteStats } from "@/lib/site-stats";


// import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

// const features = [
//     {
//         name: "Push to deploy.",
//         description:
//             "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
//         // icon: CloudArrowUpIcon,
//     },
//     {
//         name: "SSL certificates.",
//         description:
//             "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
//         // icon: LockClosedIcon,
//     },
//     {
//         name: "Database backups.",
//         description:
//             "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
//         // icon: ServerIcon,
//     },
// ];
const services = [
    {
        name: "Suporte a aplicações e websites",
        description:
            "Garantir que as aplicações e os websites da sua empresa funcionam na perfeição e respondem às necessidades atuais.",
    },
    {
        name: "Gestão de infraestruturas de TI",
        description:
            "Garantir estabilidade e flexibilidade na sua infraestrutura de TI.",
    },
    {
        name: "Consultoria tecnológica",
        description:
            "Tirar partido de tecnologias digitais transformadoras e impulsionar uma verdadeira mudança no seu negócio.",
    },
    {
        name: "Consultoria de operações de TI",
        description:
            "Criar capacidades de TI resilientes que suportem os planos da sua empresa de forma eficaz e sustentável.",
    },
    {
        name: "Avaliação de TI",
        description:
            "Identificar de forma proativa oportunidades para melhorar a eficiência, a segurança e a conformidade, e reduzir custos na sua infraestrutura de TI.",
    },
    {
        name: "Outsourcing de TI",
        description:
            "Executar projetos de TI e assegurar funções essenciais que exijam mais recursos do que a sua equipa tem disponíveis.",
    },
    {
        name: "Consultoria de estratégia de TI",
        description:
            "Alinhar os seus recursos de TI com os objetivos de negócio atuais e futuros.",
    },
    {
        name: "Consultoria de transformação digital",
        description:
            "Aumentar a eficiência da sua empresa com planeamento estratégico, definição de prioridades e acompanhamento das suas iniciativas de transformação digital.",
    },
];
export default function ConsultoriaTiClient() {
    return (
        <>
            {/* Landing */}
            <div className="relative px-6 py-24 overflow-hidden bg-gray-100 isolate sm:py-32 lg:overflow-visible lg:px-0">
                <div className="absolute inset-0 overflow-hidden -z-10">
                    <svg
                        className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                        aria-hidden="true"
                    >
                        <defs>
                            <pattern
                                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                                width={200}
                                height={200}
                                x="50%"
                                y={-1}
                                patternUnits="userSpaceOnUse"
                            >
                                <path d="M100 200V.5M.5 .5H200" fill="none" />
                            </pattern>
                        </defs>
                        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                            <path
                                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                                strokeWidth={0}
                            />
                        </svg>
                        <rect
                            width="100%"
                            height="100%"
                            strokeWidth={0}
                            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
                        />
                    </svg>
                </div>

                <div className="grid max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:pr-4">
                            <div className="lg:max-w-lg">
                                <h1 className="mt-10 text-base font-base text-[var(--autisync-gold,#B98B2F)]">
                                    Serviços de consultoria de TI
                                </h1>
                                <h2 className=" text-4xl font-bold tracking-tight text-gray-700 sm:text-6xl">
                                    Fortaleça a sua empresa com consultoria estratégica de TI
                                </h2>{" "}
                                <p className="mt-6 text-base leading-8 text-gray-600">
                                    Com mais de 5 anos de experiência, somos especialistas em
                                    consultoria estratégica de TI para empresas de vários setores.
                                    A nossa missão é dar força às empresas com soluções
                                    tecnológicas inovadoras e acompanhamento especializado.
                                </p>
                                <br />
                                <Link
                                    className="px-4 py-3 mb-1 text-xs  text-white uppercase transition-all duration-150 ease-linear bg-[var(--autisync-gold,#B98B2F)] rounded shadow outline-none hover:bg-[#1C1C1C] hover:shadow-md focus:outline-none sm:mr-2"
                                    href="/pt/precos"
                                >
                                    Ver os nossos pacotes
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="p-12 -mt-12 -ml-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        <img
                            className="w-[48rem] max-w-none rounded-xl bg-[#1C1C1C] shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                            src="https://images.unsplash.com/photo-1507099985932-87a4520ed1d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                            alt=""
                        />
                    </div>

                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:pr-4">
                            <div className="max-w-xl text-base leading-7 text-gray-600 lg:max-w-lg">
                                <p>
                                    A nossa experiência abrange várias áreas de TI, incluindo
                                    otimização de infraestruturas, desenvolvimento de software,
                                    cibersegurança, integração na cloud e transformação digital.
                                    Criamos soluções completas, alinhadas com os objetivos do seu
                                    negócio, que promovem a excelência operacional. Com tecnologias
                                    de ponta, ajudamos a sua empresa a manter-se à frente da
                                    concorrência e a adaptar-se às exigências do mercado.
                                </p>
                                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                                    <li className="flex gap-x-3">
                                        {/* <CloudArrowUpIcon className="flex-none w-5 h-5 mt-1 text-indigo-600" aria-hidden="true" /> */}
                                        <span>
                      <strong className="font-semibold text-[var(--autisync-gold,#B98B2F)]">
                        Acompanhamento especializado:
                      </strong>{" "}
                                            Os nossos consultores conhecem bem o setor e acompanham
                      as últimas tendências, regulamentos e tecnologias emergentes.
                      Damos orientação estratégica e recomendações práticas
                      para que tome decisões de TI informadas.
                    </span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        {/* <LockClosedIcon className="flex-none w-5 h-5 mt-1 text-indigo-600" aria-hidden="true" /> */}
                                        <span>
                      <strong className="font-semibold text-[var(--autisync-gold,#B98B2F)]">
                        Abordagem colaborativa:
                      </strong>{" "}
                                            Acreditamos na colaboração e no trabalho em equipa. Ao longo
                      de todo o processo, trabalhamos lado a lado com a sua equipa,
                      com comunicação aberta e responsabilidade partilhada.
                    </span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        {/* <ServerIcon className="flex-none w-5 h-5 mt-1 text-indigo-600" aria-hidden="true" /> */}
                                        <span>
                      <strong className="font-semibold text-[var(--autisync-gold,#B98B2F)]">
                        Suporte completo:
                      </strong>{" "}
                                            O nosso apoio vai além da consultoria. Oferecemos suporte
                      técnico contínuo, gestão de projetos, formação e serviços de
                      manutenção.
                    </span>
                                    </li>
                                </ul>
                                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-700">
                                    Pronto para levar a sua empresa mais longe?
                                </h2>
                                <p className="mt-6">
                                    Contacte-nos hoje para uma consulta gratuita e descubra como os
                                    nossos serviços de consultoria de TI podem transformar a sua
                                    organização.{" "}
                                    <span className="font-bold">
                    Ligue para o{" "}
                                        <Link
                                            href="tel:+244927114400"
                                            className="text-gray-500 hover:text-[var(--autisync-gold,#B98B2F)]"
                                        >
                      [+244 927-114-400]{" "}
                    </Link>
                    para começar.
                  </span>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="max-w-2xl px-2 mx-auto mt-16 sm:px-20 sm:mt-20 lg:mt-24 lg:max-w-none">
                    {/* Service tab */}
                    <dl className="grid max-w-2xl grid-cols-1 gap-4 mx-auto mt-16 text-base leading-7 text-gray-300 bg-gray-100 hover:delay-300 sm:grid-cols-4 lg:mx-0 lg:max-w-none lg:gap-x-4">
                        {services.map((service) => (
                            <div
                                key={service.name}
                                className="group block max-w-sm p-6 bg-white rounded-md shadow-md hover:bg-[#1C1C1C]"
                            >
                                {" "}
                                <h5 className="group-hover:animate-bounce group-hover:text-white mb-2 text-2xl font-bold tracking-tight text-gray-800">
                                    {service.name}
                                </h5>
                                <p className="text-gray-500 group-hover:text-white text-sm">
                                    <span className="font-bold text-[var(--autisync-gold,#B98B2F)]">Objetivo: </span>
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </dl>{" "}
                    <br />
                    <div className="">
                        <Link
                            href="/pt/questionario"
                            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-[#1C1C1C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:text-gray-100"
                        >
                            Como podemos responder às suas necessidades de TI?
                        </Link>
                    </div>
                </div>
            </div>

            {/* Map */}
            <div className="px-6 py-20 bg-[#1C1C1C]">
                <h2 className="mb-12 text-2xl font-semibold leading-tight text-center text-gray-50 xl:text-5xl md:text-4xl sm:mb-0">
                    Mais de 5 anos a prestar <br className="hidden md:block" />
                    consultoria de TI
                </h2>
                <div className="relative items-center justify-center mt-4 md:mt-14 sm:flex">
                    <Image
                        src="/map.png"
                        alt="Mapa-mundo"
                        className="hidden object-cover w-full xl:h-full h-96 sm:block"
                        width={1200}
                        height={1200}
                    />
                    <Image
                        src="/map-mob.png"
                        alt="Mapa-mundo"
                        className="absolute z-0 block object-cover w-full -mt-10 sm:hidden h-96"
                        width={1200}
                        height={1200}
                    />
                    <div className="relative left-0 z-20 w-full p-4 mt-4 bg-white shadow-lg xl:p-6 sm:w-auto sm:absolute xl:ml-56 sm:ml-12 xl:-mt-40 sm:-mt-12">
                        <p className="text-3xl font-semibold text-gray-800">{siteStats.projects}+</p>
                        <p className="mt-2 text-base leading-4 text-gray-600 xl:mt-4">
                            Projetos concluídos e <br />
                            mais em desenvolvimento
                        </p>
                    </div>
                    <div className="relative z-20 w-full p-4 mt-4 bg-white shadow-lg xl:p-6 sm:w-auto sm:absolute xl:mt-80 sm:mt-56 xl:-ml-0 sm:-ml-12">
                        <p className="text-3xl font-semibold text-gray-800">11+</p>
                        <p className="mt-2 text-base leading-4 text-gray-600 xl:mt-4">
                            Colaboradores, e a crescer
                        </p>
                    </div>
                    <div className="relative right-0 z-20 w-full p-4 mt-4 bg-white shadow-lg xl:p-6 sm:w-auto sm:absolute md:mt-0 sm:-mt-5 xl:mr-56 sm:mr-24">
                        <p className="text-3xl font-semibold text-gray-800">4+</p>
                        <p className="mt-2 text-base leading-4 text-gray-600 xl:mt-4">
                            Parceiros em crescimento. <br /> Junte-se a nós!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}