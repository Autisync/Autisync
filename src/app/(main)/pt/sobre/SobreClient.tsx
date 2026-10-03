"use client";
import React, { useEffect, useState, useRef } from "react";
import { siteStats } from "@/lib/site-stats";
import Link from "next/link";
import SobreLanding from "./SobreLanding";



/* ========= 3D Icon Wrapper (same as home) ========= */

function ServiceIcon3D({
                           children,
                           gradient,
                       }: {
    children: React.ReactNode;
    gradient: string;
}) {
    return (
        <div className="inline-flex items-center justify-center mb-5">
            <div
                className={`
          flex items-center justify-center w-14 h-14 rounded-full
          bg-gradient-to-br ${gradient}
          shadow-[0_14px_30px_rgba(0,0,0,0.35)]/30
          border border-white/10
          transition-transform duration-300 ease-out
          group-hover:scale-105 group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)]/40
        `}
            >
                <div
                    className={`
            flex items-center justify-center w-9 h-9 rounded-full
            bg-white/95
            shadow-[inset_0_2px_4px_rgba(0,0,0,0.25)]
            transition-transform duration-300 ease-out
            group-hover:scale-110
          `}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

/* ========= Inline SVG Icons ========= */

const BookIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Spine + cover */}
        <path d="M4 19.5V5a2 2 0 0 1 2-2h13a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5H6a2 2 0 0 0-2 2" />
        {/* Bottom of spine rounding into base */}
        <path d="M4 19.5A2 2 0 0 0 6 21.5h13.5" />
        {/* Spine divider line */}
        <path d="M8 2v20" />
        {/* Text lines */}
        <path d="M11.5 7h5" />
        <path d="M11.5 10.5h3.5" />
    </svg>
);

const ProjectsIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Top-left */}
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        {/* Top-right */}
        <rect x="13" y="3" width="8" height="8" rx="1.5" />
        {/* Bottom-left */}
        <rect x="3" y="13" width="8" height="8" rx="1.5" />
        {/* Bottom-right — slightly offset to imply depth/stack */}
        <rect x="13" y="13" width="8" height="8" rx="1.5" />
    </svg>
);

const SatisfactionIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="9" />
        {/* Eyes — filled dots via short strokes with round cap */}
        <path d="M9 10.5v.01" strokeWidth={2.2} />
        <path d="M15 10.5v.01" strokeWidth={2.2} />
        {/* Smile — proper arc */}
        <path d="M8.5 14.5a5 5 0 0 0 7 0" />
    </svg>
);

const GlobeIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="9" />
        {/* Vertical meridian ellipse */}
        <path d="M12 3c-2.4 4-2.4 14 0 18" />
        <path d="M12 3c2.4 4 2.4 14 0 18" />
        {/* Latitude lines */}
        <path d="M3.5 9h17" />
        <path d="M3.5 15h17" />
    </svg>
);

const UptimeIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="13" r="8" />
        {/* Clock hands */}
        <path d="M12 9v4l2.5 2.5" />
        {/* Top decorative tick marks indicating uptime/live */}
        <path d="M4.93 4.93l1.06 1.06" />
        <path d="M19.07 4.93l-1.06 1.06" />
        <path d="M12 2v2" />
    </svg>
);

const InnovationIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Bulb head — proper arc */}
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        {/* Bulb body — smooth teardrop from base */}
        <path d="M12 3a6 6 0 0 1 4.24 10.24C15.4 14.1 15 14.9 15 16H9c0-1.1-.4-1.9-1.24-2.76A6 6 0 0 1 12 3Z" />
        {/* Inner filament hint */}
        <path d="M12 7v3" strokeWidth={1.2} />
    </svg>
);

const ExcellenceIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* 5-point star — precise geometry */}
        <path d="M12 2l2.63 5.33 5.87.85-4.25 4.14 1 5.84L12 15.4l-5.25 2.76 1-5.84L3.5 8.18l5.87-.85z" />
        {/* Ribbon tails */}
        <path d="M9 19.5 7.5 22" />
        <path d="M15 19.5 16.5 22" />
    </svg>
);

const IntegrityIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Document/clipboard base */}
        <rect x="4" y="4" width="16" height="17" rx="2" />
        {/* Checkmark — optically centered in document */}
        <path d="M8.5 12.5l2.5 2.5 4.5-5" />
        {/* Top rule line for document feel */}
        <path d="M8 8h8" strokeWidth={1.2} />
    </svg>
);

const CustomerIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Primary user — centered, larger */}
        <circle cx="12" cy="8" r="3" />
        <path d="M6.5 19a5.5 5.5 0 0 1 11 0" />
        {/* Secondary ghost user left */}
        <circle cx="5" cy="10" r="2.2" />
        <path d="M1.5 19a3.5 3.5 0 0 1 5.5-2.85" />
        {/* Secondary ghost user right */}
        <circle cx="19" cy="10" r="2.2" />
        <path d="M22.5 19a3.5 3.5 0 0 0-5.5-2.85" />
    </svg>
);

const CollaborationIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Two equal people side by side */}
        <circle cx="8" cy="8" r="2.8" />
        <path d="M2.5 19a5.5 5.5 0 0 1 11 0" />
        <circle cx="16" cy="8" r="2.8" />
        <path d="M10.5 19a5.5 5.5 0 0 1 11 0" />
        {/* Connection bridge — link between them */}
        <path d="M11 9.5h2" strokeWidth={1.3} />
    </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Shield — symmetrical, properly tapered */}
        <path d="M12 2.5 4 6v5.5c0 4.52 3.4 8.75 8 9.5 4.6-.75 8-4.98 8-9.5V6z" />
        {/* Check inside — optically centered */}
        <path d="M9 12l2 2 4-4" />
    </svg>
);

/* ========== Count-up that starts on scroll into view ========== */
function CountUp({
                     end,
                     duration = 1500,
                 }: {
    end: number;
    duration?: number;
}) {
    // Start at the real figure so the server-rendered HTML (search engines,
    // link previews, slow phones, no-JS) never shows "0". The count-up only
    // replays from zero once the number scrolls into view.
    const [value, setValue] = useState(end);
    const [hasStarted, setHasStarted] = useState(false);
    const spanRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const el = spanRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.35 }
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
        };
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime: number | null = null;
        let animationFrame: number;

        const step = (timestamp: number) => {
            if (startTime === null) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = Math.floor(progress * end);
            setValue(current);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(step);
            }
        };

        animationFrame = requestAnimationFrame(step);

        return () => cancelAnimationFrame(animationFrame);
    }, [hasStarted, end, duration]);

    return <span ref={spanRef}>{value.toLocaleString()}</span>;
}

/* ========== Stats config: number + suffix + SVG icon ========== */

const stats = [
    {
        value: siteStats.projects,
        suffix: "+",
        label: "Projetos Concluídos",
        icon: <ProjectsIcon className="w-5 h-5 text-gray-900" />,
    },
    {
        value: siteStats.satisfaction,
        suffix: "%",
        label: "Satisfação dos Clientes",
        icon: <SatisfactionIcon className="w-5 h-5 text-gray-900" />,
    },
    {
        value: siteStats.countries,
        suffix: "",
        label: "Países Servidos",
        icon: <GlobeIcon className="w-5 h-5 text-gray-900" />,
    },
    {
        value: siteStats.uptime,
        suffix: "%",
        label: "Garantia de Disponibilidade",
        icon: <UptimeIcon className="w-5 h-5 text-gray-900" />,
    },
];

const coreValues = [
    {
        title: "Inovação",
        text: "Estamos sempre um passo à frente, a explorar novas tecnologias e metodologias para entregar soluções de vanguarda.",
        top: true,
        icon: (
            <InnovationIcon className="w-7 h-7 text-[var(--autisync-gold,#b98b2f)]" />
        ),
    },
    {
        title: "Excelência",
        text: "A qualidade não é negociável. Cada projeto recebe toda a nossa atenção ao detalhe e o compromisso com resultados excecionais.",
        top: true,
        icon: (
            <ExcellenceIcon className="w-7 h-7 text-[var(--autisync-gold,#b98b2f)]" />
        ),
    },
    {
        title: "Integridade",
        text: "Transparência, honestidade e práticas éticas são a base de cada relação que construímos com os nossos clientes.",
        top: true,
        icon: (
            <IntegrityIcon className="w-7 h-7 text-[var(--autisync-gold,#b98b2f)]" />
        ),
    },
    {
        title: "Cliente em Primeiro Lugar",
        text: "O seu sucesso é o nosso sucesso. Ouvimos, adaptamo-nos e entregamos soluções à medida das necessidades da sua empresa.",
        top: false,
        icon: <CustomerIcon className="w-7 h-7 text-gray-900" />,
    },
    {
        title: "Colaboração",
        text: "Trabalhamos como uma extensão da sua equipa, com comunicação aberta e parceria em todas as fases.",
        top: false,
        icon: <CollaborationIcon className="w-7 h-7 text-gray-900" />,
    },
    {
        title: "Fiabilidade",
        text: "Conte connosco para entregas consistentes, 99% de disponibilidade e suporte contínuo que mantém a sua empresa a funcionar sem falhas.",
        top: false,
        icon: <ShieldIcon className="w-7 h-7 text-gray-900" />,
    },
];

export default function SobreClient() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "AboutPage",
                        name: "Sobre a Autisync",
                        inLanguage: "pt",
                        url: "https://www.autisync.com/pt/sobre",
                        description:
                            "Conheça a Autisync — a nossa história, missão, valores e a equipa por trás da nossa agência digital.",
                        mainEntity: {
                            "@type": "Organization",
                            name: "Autisync",
                            url: "https://www.autisync.com",
                            foundingDate: "2021",
                            numberOfEmployees: { "@type": "QuantitativeValue", value: "5" },
                        },
                    }),
                }}
            />
            <SobreLanding />

            {/* Our Story Section */}
            <section className="pb-20 bg-gray-200">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-wrap items-center">
                        {/* Text + badge */}
                        <div className="w-full px-4 ml-auto mr-auto md:w-5/12 group">
                            <ServiceIcon3D gradient="from-[#1C1C1C] via-[#2a2a2a] to-[#000000]">
                                <BookIcon className="w-6 h-6 text-[var(--autisync-gold,#B98B2F)]" />
                            </ServiceIcon3D>

                            <h3 className="mb-2 text-3xl font-semibold leading-normal text-gray-800 transition-colors duration-200 group-hover:text-gray-900">
                                A Nossa História
                            </h3>
                            <p className="mt-4 mb-4 leading-relaxed text-gray-600">
                                A AutiSync nasceu de uma visão simples: aproximar a tecnologia
                                de ponta das necessidades diárias das empresas. O que começou
                                como uma pequena equipa de programadores e designers apaixonados
                                tornou-se um parceiro completo de transformação digital.
                            </p>
                            <p className="mt-0 mb-4 leading-relaxed text-gray-600">
                                Já ajudámos dezenas de empresas em África e não só a automatizar
                                operações, reforçar a presença da sua marca e escalar a sua
                                infraestrutura digital. De startups a empresas consolidadas,
                                dedicamos o mesmo empenho a cada projeto.
                            </p>
                        </div>

                        {/* Image card */}
                        <div className="w-full px-4 pt-10 ml-auto mr-auto md:w-4/12 group">
                            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded-lg shadow-lg transition-all duration-300 ease-out transform group-hover:-translate-y-1 group-hover:shadow-[0_22px_45px_rgba(0,0,0,0.25)]/10">
                                <img
                                    alt="Colaboração da equipa"
                                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                                    className="w-full align-middle rounded-t-lg"
                                />
                                <blockquote className="relative p-8 mb-4">
                                    <h4 className="text-xl font-bold text-gray-600">
                                        Inovação com Execução
                                    </h4>
                                    <p className="mt-2 font-light text-gray-600 text-md">
                                        Não criamos apenas soluções — criamos experiências que geram
                                        resultados mensuráveis e impacto duradouro.
                                    </p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section – 3D circles like home page */}
            <section className="py-20 bg-gray-100">
                <div className="container px-4 mx-auto">
                    <div className="mb-10 text-center max-w-xl mx-auto">
                        <p className="text-xs tracking-widest text-[var(--autisync-gold,#b98b2f)] font-semibold uppercase">
                            Os Nossos Números
                        </p>
                        <h3 className="mt-1 text-3xl font-semibold text-gray-800">
                            Impacto em Números
                        </h3>
                        <p className="mt-3 text-base text-gray-600">
                            Números que refletem a confiança dos nossos parceiros e o
                            trabalho que entregamos em cada projeto.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="group relative flex flex-col items-center w-full min-w-0 break-words bg-white rounded-3xl shadow-lg pt-10 pb-6 px-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(15,23,42,0.35)]/10"
                            >
                                {/* 3D gold circle using same component as home */}
                                <ServiceIcon3D gradient="from-[#b98b2f] via-[#d1a94c] to-[#7a5a1d]">
                                    {stat.icon}
                                </ServiceIcon3D>

                                {/* Number + label */}
                                <div className="mt-1 text-4xl font-extrabold text-slate-800">
                                    <CountUp end={stat.value} />
                                    {stat.suffix}
                                </div>
                                <div className="mt-2 text-sm text-slate-500">{stat.label}</div>

                                {/* Bottom gold accent bar */}
                                {/*<div className="mt-6 h-1 w-full rounded-full bg-[var(--autisync-gold,#f2a51f)]" />*/}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <div className="bg-gray-100">
                <div className="px-6 mx-auto py-24 max-w-7xl lg:px-8">
                    <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-none">
                        <div className="grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-600 lg:max-w-none lg:grid-cols-2">
                            <div className="transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(0,0,0,0.12)]/10 bg-white rounded-xl p-6">
                                <h4 className="font-bold text-gray-700 text-xl mb-2">Visão</h4>
                                <p>
                  <span className="font-medium text-[var(--autisync-gold,#b98b2f)]">
                    Conceber
                  </span>{" "}
                                    e{" "}
                                    <span className="font-medium text-[var(--autisync-gold,#b98b2f)]">
                    Construir
                  </span>{" "}
                                    hardware e software feitos em África, que se integram com
                                    outros sistemas, e tornar-nos uma empresa de tecnologia em
                                    que os clientes podem confiar para oferecer apenas as
                                    melhores soluções tecnológicas.
                                </p>
                            </div>
                            <div className="transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(0,0,0,0.12)]/10 bg-white rounded-xl p-6">
                                <h4 className="font-bold text-gray-700 text-xl mb-2">
                                    Missão
                                </h4>
                                <p>
                  <span className="font-medium text-[var(--autisync-gold,#b98b2f)]">
                    Entregar excelência
                  </span>{" "}
                                    e nada menos. Construir o melhor produto para os clientes.
                                    Inovar na relação entre a empresa e os seus clientes.
                                    Propor, de forma proativa, soluções que melhorem os processos
                                    de negócio e a comunidade.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Values Section – 3D circles like home (top black, bottom gold) */}
            <section className="py-20 bg-gray-100">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-wrap text-center justify-center mb-12">
                        <div className="w-full px-4 lg:w-8/12">
                            <h2 className="text-4xl font-semibold text-gray-800">
                                Os Nossos Valores
                            </h2>
                            {/*<p className="mt-2 text-lg text-gray-600">*/}
                            {/*  The principles that guide everything we do*/}
                            {/*</p>*/}
                        </div>
                    </div>

                    <div className="flex flex-wrap">
                        {coreValues.map((item) => (
                            <div
                                key={item.title}
                                className="w-full px-4 md:w-4/12 mb-8 group"
                            >
                                <div className="text-center p-4 rounded-xl bg-white shadow-md transition-all duration-300 ease-out transform group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)]/10">
                                    <ServiceIcon3D
                                        gradient={
                                            item.top
                                                ? "from-[#1C1C1C] via-[#2a2a2a] to-[#000000]" // black style
                                                : "from-[#b98b2f] via-[#d1a94c] to-[#7a5a1d]" // gold style
                                        }
                                    >
                                        {item.icon}
                                    </ServiceIcon3D>

                                    <h6 className="text-xl text-gray-700 mb-3">{item.title}</h6>
                                    <p className="text-gray-600 px-4">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Image section */}
            <div className="relative overflow-hidden bg-[#1C1C1C] isolate sm:py-32">
                <img
                    src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                    alt=""
                    className="absolute inset-0 object-cover w-full h-full -z-10"
                />
                <div
                    className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#B28228] to-[#000000] opacity-20"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>
                <div
                    className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#B28228] to-[#000000] opacity-20"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>
                <div className="px-6 mx-auto max-w-7xl lg:px-8">
                    <div className="mx-auto max-w-auto lg:mx-0 text-center ">
                        <h2 className="text-2xl font-bold text-center text-white sm:text-6xl">
                            Só em Equipa
                            <br /> <span className="text-[#B28228]">Lideramos a Mudança</span>
                        </h2>
                        <div className="flex items-center justify-center mt-10 gap-x-6">
                            <Link
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-800 border border-transparent rounded-md shadow-md bg-gray-50 hover:text-white hover:bg-[#B28228] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
                                href={"/pt/contacto"}
                            >
                                Marcar uma Consulta
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            {/*<section className="py-20 bg-white">*/}
            {/*    <div className="container px-4 mx-auto">*/}
            {/*        <div className="flex flex-wrap justify-center mb-12 text-center">*/}
            {/*            <div className="w-full px-4 lg:w-8/12">*/}
            {/*                <h2 className="text-4xl font-semibold text-gray-800">*/}
            {/*                    Meet Our Team*/}
            {/*                </h2>*/}
            {/*                <p className="mt-4 text-lg text-gray-600">*/}
            {/*                    The talented individuals behind AutiSync&apos;s success*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="flex flex-wrap justify-center">*/}
            {/*            {[*/}
            {/*                {*/}
            {/*                    name: "Helio Garcia",*/}
            {/*                    role: "Chief Marketing Strategist",*/}
            {/*                    img: "https://media.tenor.com/b67Xti8TUp8AAAAi/kakyoin-stand-anime.gif",*/}
            {/*                },*/}
            {/*                {*/}
            {/*                    name: "Augusto Vieira",*/}
            {/*                    role: "Project & Business Operations Lead",*/}
            {/*                    img: "https://media.tenor.com/8KYu56w12M4AAAAi/detective-conan-okay.gif",*/}
            {/*                },*/}
            {/*                {*/}
            {/*                    name: "Mauro Sousa",*/}
            {/*                    role: "CTO",*/}
            {/*                    img: "https://media1.tenor.com/m/y3EYCROMmqYAAAAC/dadnaruto-anime.gif",*/}
            {/*                },*/}
            {/*                {*/}
            {/*                    name: "Katiana Poli",*/}
            {/*                    role: "Marketing Director",*/}
            {/*                    img: "https://media1.tenor.com/m/GcHGPM7wmaoAAAAC/aaaaaaaaaaaaaa.gif",*/}
            {/*                },*/}
            {/*            ].map((member) => (*/}
            {/*                <div*/}
            {/*                    key={member.name}*/}
            {/*                    className="w-full px-4 mb-12 md:w-6/12 lg:w-3/12"*/}
            {/*                >*/}
            {/*                    <div className="px-6 text-center transition-all duration-300 ease-out transform hover:-translate-y-2 hover:shadow-[0_18px_35px_rgba(0,0,0,0.18)] rounded-xl bg-white/80">*/}
            {/*                        <img*/}
            {/*                            alt="Team member"*/}
            {/*                            src={member.img}*/}
            {/*                            className="max-w-full mx-auto rounded-full"*/}
            {/*                            style={{ maxWidth: "200px" }}*/}
            {/*                        />*/}
            {/*                        <div className="pt-6 text-center">*/}
            {/*                            <h5 className="text-xl font-semibold text-gray-900">*/}
            {/*                                {member.name}*/}
            {/*                            </h5>*/}
            {/*                            <p className="mt-1 text-sm text-gray-500 uppercase">*/}
            {/*                                {member.role}*/}
            {/*                            </p>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/* CTA Section */}
            <section className="py-20 pb-40 bg-white">
                <div className="container px-4 mx-auto text-center">
                    <h2 className="text-4xl font-semibold text-gray-800 mb-4">
                        Pronto para Transformar a Sua Empresa?
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Vamos conversar sobre como a AutiSync pode ajudar a sua empresa a
                        atingir os seus objetivos digitais
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/pt/contacto" className="px-6 py-2 text-white bg-[var(--autisync-gold,#b98b2f)] rounded-md shadow-lg hover:bg-[#1C1C1C] transition-all hover:shadow-[0_16px_30px_rgba(0,0,0,0.25)]/10">
                            Fale Connosco
                        </Link>
                        <Link href="/pt/precos" className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md shadow-lg hover:bg-[#1C1C1C] hover:text-white transition-all hover:shadow-[0_16px_30px_rgba(0,0,0,0.18)]/10">
                            Ver os Nossos Serviços
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
