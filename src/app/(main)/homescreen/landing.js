import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HeroMarketLine } from "@/app/components/MarketCopy";
import { localHref } from "@/lib/i18n/routes";
import { waLink } from "@/lib/whatsapp";

/* ========= 3D Icon Wrapper (with hover) ========= */

function ServiceIcon3D({ children, gradient }) {
  return (
    <div className="inline-flex items-center justify-center mb-5">
      <div
        className={`
          flex items-center justify-center w-14 h-14 rounded-full
          bg-gradient-to-br ${gradient}
          shadow-[0_14px_30px_rgba(0,0,0,0.35)]/30
          border border-white/10
          transition-transform duration-300 ease-out
          group-hover:scale-105 group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)]/30
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

const MarketingSeoIcon = ({ className = "w-5 h-5" }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
      {/* Bar chart — evenly spaced, bottom-aligned at y=20 */}
      <rect x="3" y="13" width="3.5" height="7" rx="1" />
      <rect x="10.25" y="9" width="3.5" height="11" rx="1" />
      <rect x="17.5" y="5" width="3.5" height="15" rx="1" />
      {/* Trend line arc connecting bar tops — implies SEO growth */}
      <path d="M4.75 12.5c2.5-3 5-4.5 8-5.5" strokeWidth="1.3" strokeDasharray="1.5 1.5" />
      {/* Magnifier overlay — the "search" in SEO */}
      <circle cx="8.5" cy="7" r="2.5" />
      <path d="M10.3 8.8l1.7 1.7" />
    </svg>
);

const WebDevIcon = ({ className = "w-5 h-5" }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
      {/* Browser chrome */}
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
      {/* Traffic lights */}
      <circle cx="6.5" cy="7" r="0.8" strokeWidth="1.2" />
      <circle cx="9.2" cy="7" r="0.8" strokeWidth="1.2" />
      <circle cx="11.9" cy="7" r="0.8" strokeWidth="1.2" />
      {/* Code chevrons — optically centered in content area */}
      <path d="M8.5 13.5L6 15.5l2.5 2" />
      <path d="M15.5 13.5L18 15.5l-2.5 2" />
      <path d="M13 12.5l-2 6" strokeWidth="1.3" />
    </svg>
);

const ITSupportIcon = ({ className = "w-5 h-5" }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
      {/* Headset ear cup */}
      <path d="M5 11a7 7 0 0 1 14 0" />
      {/* Left earpiece */}
      <path d="M5 11v3a1.5 1.5 0 0 0 3 0v-3" />
      {/* Right earpiece */}
      <path d="M16 11v3a1.5 1.5 0 0 0 3 0v-3" />
      {/* Mic boom arm */}
      <path d="M7.5 17.5c0 1.5 1 2.5 4.5 2.5" />
      <path d="M12 20v.5" />
      <circle cx="12" cy="21" r="0.6" strokeWidth="1.2" />
    </svg>
);

const UiUxIcon = ({ className = "w-5 h-5" }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
      {/* Outer frame */}
      <rect x="3" y="4" width="18" height="13" rx="2" />
      {/* Toolbar divider */}
      <path d="M3 8.5h18" />
      {/* Window dots */}
      <circle cx="6.5" cy="6.25" r="0.8" strokeWidth="1.2" />
      <circle cx="9.2" cy="6.25" r="0.8" strokeWidth="1.2" />
      {/* Content layout blocks — sidebar + main */}
      <rect x="5.5" y="11" width="4" height="4" rx="0.8" strokeWidth="1.3" />
      <path d="M12 11.5h6" strokeWidth="1.3" />
      <path d="M12 13.5h4.5" strokeWidth="1.3" />
      {/* Stand */}
      <path d="M10 17l1.5 2.5h1L14 17" />
      <path d="M9 19.5h6" />
    </svg>
);

const GraphicIcon = ({ className = "w-5 h-5" }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
      {/* Pen tool body */}
      <path d="M14 4l6 6-9.5 9.5-2.5.5-1.5-1.5.5-2.5z" />
      {/* Pen nib crease */}
      <path d="M14 4l2 2" strokeWidth="1.2" />
      {/* Anchor point at tip */}
      <path d="M4.5 19.5l2-2" />
      {/* Bezier handle dot */}
      <circle cx="19" cy="5" r="1.3" strokeWidth="1.3" />
    </svg>
);

const AppDevIcon = ({ className = "w-5 h-5" }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
      {/* Phone outline */}
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      {/* Top notch/speaker */}
      <path d="M10.5 6h3" strokeWidth="1.3" />
      {/* Screen content — code lines */}
      <path d="M10 10l-1.5 1.5L10 13" strokeWidth="1.3" />
      <path d="M14 10l1.5 1.5L14 13" strokeWidth="1.3" />
      <path d="M12.5 9.5l-1 5" strokeWidth="1.2" />
      {/* Home indicator */}
      <path d="M10.5 17.5h3" strokeWidth="1.3" />
    </svg>
);

const WhoWeAreIcon = ({ className = "w-6 h-6" }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
      {/* Center/primary person */}
      <circle cx="12" cy="7.5" r="2.8" />
      <path d="M6.5 19a5.5 5.5 0 0 1 11 0" />
      {/* Left secondary person — smaller, slightly behind */}
      <circle cx="5.5" cy="9.5" r="2" strokeWidth="1.4" />
      <path d="M2 18.5a3.5 3.5 0 0 1 5-2.3" strokeWidth="1.3" />
      {/* Right secondary person */}
      <circle cx="18.5" cy="9.5" r="2" strokeWidth="1.4" />
      <path d="M22 18.5a3.5 3.5 0 0 0-5-2.3" strokeWidth="1.3" />
    </svg>
);

export default function Landing({ lang = "en" } = {}) {
  const pt = lang === "pt";
  const t = (en, ptText) => (pt ? ptText : en);
  return (
    <>
      {/* Service info */}
      <div className="relative flex items-center content-center justify-center py-48 pb-32 min-h-screen-75">
        {/* The hero photo is the page's largest paint: a real image (not a CSS
            background) so the browser finds it at once, with priority, served
            by next/image as AVIF/WebP at the visitor's screen width. It sits
            under a 75% black overlay, so a lower quality costs nothing. */}
        <div className="absolute top-0 w-full h-full overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/3782235/pexels-photo-3782235.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={55}
            className="object-cover object-center"
          />
          <span
            id="blackOverlay"
            className="absolute w-full h-full bg-black opacity-75"
          ></span>
        </div>

        {/* landing */}
        <div className="container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-full px-4 ml-auto mr-auto text-center lg:w-8/12">
              <div className="p-2">
                <h1 className="pb-4 text-4xl font-semibold text-white sm:text-5xl text-balance">
                  {t("Websites, branding and automation that bring you clients", "Websites, marca e automação que lhe trazem clientes")}
                </h1>
                <p className="font-thin text-gray-200">
                  {t(
                    "We systemise your success: from branding to backend, fixed prices, built and run for you.",
                    "Sistematizamos o seu sucesso: da marca aos sistemas, com preços fixos, feito e gerido por nós."
                  )}
                </p>
                <HeroMarketLine />
              </div>
              <br />
                <Link href={localHref("/ServiceQuestionaire", pt)}
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-[var(--autisync-gold,#b98b2f)] border border-transparent rounded-md shadow-lg hover:bg-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >{t("Get Started with Us", "Comece connosco")}</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services  and 2nd section*/}
      <section className="pb-20 -mt-24 bg-gray-100" aria-labelledby="what-we-do">
        <div className="container px-4 mx-auto">
          <h2 id="what-we-do" className="sr-only">{t("What we do", "O que fazemos")}</h2>
          {/* Services */}
          <div className="flex flex-wrap">
            {/* Marketing (TOP – black circle, gold icon) */}
            <div className="w-full px-4 pt-6 text-center lg:pt-12 md:w-4/12">
              <div className="group relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                <div className="flex-auto px-4 py-5">
                  <ServiceIcon3D gradient="from-[#1C1C1C] via-[#2a2a2a] to-[#000000]">
                    <MarketingSeoIcon className="w-5 h-5 text-[var(--autisync-gold,#b98b2f)]" />
                  </ServiceIcon3D>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {t("Marketing & SEO", "Marketing e SEO")}
                  </h3>
                  <p className="mt-2 mb-4 text-gray-500">
                    {t(
                      "Social media management, search optimisation and campaigns that put your brand in front of the right people and bring in enquiries.",
                      "A sua imagem digital, incluindo a gestão das redes sociais, pensada para aumentar a satisfação dos clientes e dar a conhecer a sua marca ao público certo."
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Web Development (TOP – black circle, gold icon) */}
            <div className="w-full px-4 text-center md:w-4/12">
              <div className="group relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                <div className="flex-auto px-4 py-5">
                  <ServiceIcon3D gradient="from-[#1C1C1C] via-[#2a2a2a] to-[#000000]">
                    <WebDevIcon className="w-5 h-5 text-[var(--autisync-gold,#b98b2f)]" />
                  </ServiceIcon3D>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {t("Web Development", "Desenvolvimento Web")}
                  </h3>
                  <p className="mt-2 mb-4 text-gray-500">
                    {t(
                      "Your website is often the first place a client meets your business. We design and build fast, mobile-ready sites that make you easy to find and easy to contact.",
                      "Um bom website é peça-chave no marketing e no dia a dia de qualquer empresa. Crie um site à medida e torne a sua empresa mais visível para os seus potenciais clientes."
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* IT Consulting & Systems (TOP – black circle, gold icon) */}
            <div className="w-full px-4 pt-6 text-center lg:pt-12 md:w-4/12">
              <div className="group relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                <div className="flex-auto px-4 py-5">
                  <ServiceIcon3D gradient="from-[#1C1C1C] via-[#2a2a2a] to-[#000000]">
                    <ITSupportIcon className="w-5 h-5 text-[var(--autisync-gold,#b98b2f)]" />
                  </ServiceIcon3D>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {t("IT Consulting & Systems", "Consultoria e Sistemas de TI")}
                  </h3>
                  <p className="mt-2 mb-4 text-gray-500">
                    {t(
                      "We help you assess technology options and line them up with how your business actually works, so every system you pay for supports your goals.",
                      "Ajudamos a avaliar as opções tecnológicas e a alinhá-las com a forma como a sua empresa realmente trabalha, para que cada sistema que paga sirva os seus objetivos."
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* UI/UX Design (BOTTOM – gold circle, dark icon) */}
            <div className="w-full px-4 pt-6 text-center md:w-4/12">
              <div className="group relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                <div className="flex-auto px-4 py-5">
                  <ServiceIcon3D gradient="from-[#b98b2f] via-[#d1a94c] to-[#7a5a1d]">
                    <UiUxIcon className="w-5 h-5 text-gray-900" />
                  </ServiceIcon3D>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {t("UI/UX Design", "Design UI/UX")}
                  </h3>
                  <p className="mt-2 mb-4 text-gray-500">
                    {t(
                      "Interface and user experience design: our designers lay out apps and software so they look right and are easy to use.",
                      "Design de interface e de experiência do utilizador (UI/UX) – os nossos designers criam interfaces para software e dispositivos, com atenção ao aspeto e ao estilo."
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Graphic Design (BOTTOM – gold circle, dark icon) */}
            <div className="w-full px-4 text-center md:w-4/12">
              <div className="group relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                <div className="flex-auto px-4 py-5">
                  <ServiceIcon3D gradient="from-[#b98b2f] via-[#d1a94c] to-[#7a5a1d]">
                    <GraphicIcon className="w-5 h-5 text-gray-900" />
                  </ServiceIcon3D>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {t("Graphic Design", "Design Gráfico")}
                  </h3>
                  <p className="mt-2 mb-4 text-gray-500">
                    {t(
                      "Logos, brand identities, print and social graphics that make a strong first impression.",
                      "Um bom design gráfico garante que a sua marca causa uma primeira impressão positiva em quem a vê."
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Software / App Development (BOTTOM – gold circle, dark icon) */}
            <div className="w-full px-4 pt-6 text-center md:w-4/12">
              <div className="group relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                <div className="flex-auto px-4 py-5">
                  <ServiceIcon3D gradient="from-[#b98b2f] via-[#d1a94c] to-[#7a5a1d]">
                    <AppDevIcon className="w-5 h-5 text-gray-900" />
                  </ServiceIcon3D>
                </div>
                <div className="flex-auto px-4 pb-5">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {t("Software / App Development", "Desenvolvimento de Software / Apps")}
                  </h3>
                  <p className="mt-2 mb-4 text-gray-500">
                    {t(
                      "Mobile apps and custom software, connected to the systems you already use, to make work simpler for your team and your clients.",
                      "Aplicações móveis e software à medida, ligados aos sistemas que já usa, para simplificar o trabalho da sua equipa e dos seus clientes."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Who are we */}
          <div className="flex flex-wrap items-center mt-32">
            {/* who we are section */}
            <div className="w-full px-4 ml-auto mr-auto md:w-5/12 group">
              <ServiceIcon3D gradient="from-[#1C1C1C] via-[#2a2a2a] to-[#000000]">
                <WhoWeAreIcon className="w-6 h-6 text-[var(--autisync-gold,#b98b2f)]" />
              </ServiceIcon3D>
              <h2 className="mb-2 text-3xl font-semibold leading-normal text-gray-800 transition-colors duration-200 group-hover:text-gray-900">
                {t("Who Are We?", "Quem Somos?")}
              </h2>
              <p className="mt-4 mb-4 leading-relaxed text-gray-600">
                {t(
                  "At Autisync, we transform businesses through intelligent automation, premium digital experiences, and seamless technology systems. We turn complex problems into simple, scalable solutions — helping brands save time, increase efficiency, and grow faster.",
                  "Na Autisync, transformamos empresas com automação inteligente, experiências digitais de qualidade e sistemas tecnológicos que funcionam em conjunto. Tornamos problemas complexos em soluções simples e escaláveis — para que as marcas poupem tempo, sejam mais eficientes e cresçam mais depressa."
                )}
              </p>

              <p className="mt-0 mb-4 leading-relaxed text-gray-600">
                {t(
                  "Whether you need AI-powered workflows, custom software, a branded website, CRM setup, or ongoing maintenance — we build systems that work together, operate smoothly, and elevate your entire business. We’re not just a service provider. We’re your long-term technology partner.",
                  "Quer precise de processos automatizados com IA, software à medida, um website com a sua marca, um CRM configurado ou manutenção contínua — criamos sistemas que trabalham em conjunto, funcionam sem falhas e elevam toda a sua empresa. Não somos apenas um fornecedor. Somos o seu parceiro tecnológico de longo prazo."
                )}
              </p>
              <Link
                href={pt ? waLink("Olá Autisync! Gostaria de falar sobre um projeto.", "WEB-pt") : waLink("Hi Autisync! I'd like to talk about a project.", "WEB-home")}
                target="_blank"
                className="mt-8 font-bold text-gray-800 hover:text-[var(--autisync-gold,#b98b2f)]/90"
              >
                {t("Get in touch with Sales", "Fale com a nossa equipa comercial")}
              </Link>
            </div>

            {/* Seamless services section */}
            <div className="w-full px-4 pt-10 ml-auto mr-auto md:w-4/12 group">
              <div className="
                  relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded-lg shadow-md
                  transition-all duration-300 ease-out 
                  group-hover:-translate-y-2 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.25)]/10
                "
              >
                <Image
                  alt={t("A team working together at a laptop", "Uma equipa a trabalhar em conjunto num portátil")}
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1051&q=80"
                  width={1051}
                  height={700}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="w-full h-auto align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 block w-full h-95-px -top-94-px"
                  >
                    <polygon className="text-gray-800 fill-current"></polygon>
                  </svg>
                  <h3 className="text-xl font-bold text-gray-600">
                    {t("Seamless Services", "Serviços Sem Interrupções")}
                  </h3>
                  <p className="mt-2 font-light text-gray-600 text-md">
                    {t(
                      "Ongoing maintenance and care so your daily work and long-term projects keep running smoothly.",
                      "Manutenção e acompanhamento contínuos para que o trabalho do dia a dia e os projetos de longo prazo da sua empresa avancem sem interrupções."
                    )}
                  </p>
                </blockquote>
              </div>
            </div>
            {/* Seamless services section end */}

          </div>
        </div>
      </section>
    </>
  );
}
