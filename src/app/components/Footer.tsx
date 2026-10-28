"use client";

import * as React from "react";
import Link from "next/link";
import CallToAction from "@/app/components/CallToAction";
import { usePathname } from "next/navigation";
import { isPtPath } from "@/lib/i18n/routes";
import { pageRef, pageWaLink } from "@/lib/whatsapp";

const FOOTER = {
  en: {
    h: ["Scale ", "your digital", "presence and ", "operations."],
    p: "We provide an integrated approach, leveraging AI and automation across marketing, custom software, and design to reduce costs, ensure brand consistency, and drive measurable growth.",
    useful: "Useful Links",
    resources: "Resources",
    links: [
      ["About Us", "/about"], ["Portfolio", "/portfolio"], ["Solutions", "/solutions/devServices"], ["Service Packages", "/servicepackage"],
      ["Autisync CRM", "/crm"], ["CRM for Estate Agents", "/crm/estate-agents"], ["Step-Inside Websites", "/websites/step-inside"], ["Clinics & Salons", "/clinics"], ["CallCatch for Trades", "https://calls.autisync.com"], ["Free Tools", "/tools"],
    ],
    res: [["Service Questionnaire", "/ServiceQuestionaire"], ["Contact Us", "/contact"], ["Websites in the UK", "/web-design-uk"], ["Website Design in Angola", "/angola"], ["Website Design in Namibia", "/namibia"], ["Websites in Portugal (PT)", "/pt/portugal"]],
    privacy: "Privacy Policy", terms: "Terms of Use",
    rights: "All rights reserved.",
    trading: "Autisync is a trading name of Maheldom Consulting, Lda",
    bookTitle: "Book a free 15-minute call",
    bookText: "Tell us what you need and we will show you how we would do it. No obligation.",
    bookCta: "Pick a time",
    waCta: "Chat on WhatsApp",
  },
  pt: {
    h: ["Faça crescer ", "a sua presença", "digital e as suas ", "operações."],
    p: "Uma abordagem integrada, com IA e automação no marketing, no software à medida e no design, para reduzir custos, manter a marca coerente e gerar crescimento mensurável.",
    useful: "Links Úteis",
    resources: "Recursos",
    links: [
      ["Sobre Nós", "/pt/sobre"], ["Portfólio", "/pt/portfolio"], ["Serviços", "/pt/servicos/desenvolvimento"], ["Preços e Pacotes", "/pt/precos"],
      ["CRM para Imobiliárias", "/crm/imobiliarias"], ["Clínicas e Salões", "/pt/clinicas"],
    ],
    res: [["Questionário de Serviços", "/pt/questionario"], ["Contacto", "/pt/contacto"], ["Criação de Sites em Angola", "/pt/angola"], ["Criação de Sites em Portugal", "/pt/portugal"], ["Website Design in Namibia (EN)", "/namibia"], ["Websites in the UK (EN)", "/web-design-uk"]],
    privacy: "Política de Privacidade", terms: "Termos de Utilização",
    rights: "Todos os direitos reservados.",
    trading: "Autisync é uma marca comercial da Maheldom Consulting, Lda",
    bookTitle: "Marque uma chamada gratuita de 15 minutos",
    bookText: "Diga-nos o que precisa e mostramos como o faríamos. Sem compromisso.",
    bookCta: "Escolher horário",
    waCta: "Falar no WhatsApp",
  },
};

const navigation = {
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/autisync",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          {/* outer soft circle */}
          <circle cx="12" cy="12" r="9" />
          {/* stylised “f” */}
          <path
            fill="currentColor"
            stroke="none"
            d="M12.9 7.2h-1.1c-1.4 0-2.3.9-2.3 2.3v1.4H8.4v1.9h1.1v4h2.1v-4h1.5l.5-1.9h-2v-1.2c0-.5.3-.8.8-.8h1.1V7.2z"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/autisync__/",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          {/* outer circle */}
          <circle cx="12" cy="12" r="9" />
          {/* camera body */}
          <rect x="8" y="8" width="8" height="8" rx="2.5" />
          {/* lens */}
          <circle cx="12" cy="12" r="2.2" />
          {/* flash dot */}
          <circle cx="15.3" cy="8.8" r="0.8" />
        </svg>
      ),
    },
    // LinkedIn goes back here once the company page is live (the old
    // /company/autisync address returns 404).
    {
      name: "Behance",
      href: "https://www.behance.net/ENOV-Technologies",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          {/* outer circle */}
          <circle cx="12" cy="12" r="9" />
          {/* “Be” style mark */}
          <path d="M8 9h2.1c1.1 0 1.9.6 1.9 1.7 0 1.1-.8 1.7-1.9 1.7H8" />
          <path d="M8 12.4h2.3c1.2 0 2 .7 2 1.9 0 1.1-.8 1.9-2 1.9H8" />
          <line x1="8" y1="8.5" x2="8" y2="16" />
          <path d="M14 11.1h3" />
          <path d="M14 14.9c.3.7.9 1.1 1.8 1.1 1.2 0 2-.9 2-2.4 0-1.6-.8-2.4-2-2.4-.9 0-1.5.4-1.8 1.1" />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  const pathname = usePathname() || "/";
  const pt = isPtPath(pathname);
  const c = pt ? FOOTER.pt : FOOTER.en;
  const onBookingPage = pathname === "/book" || pathname === "/pt/marcar";
  return (
    // Room at the bottom on a phone, so the WhatsApp button never sits on the last lines.
    <footer className="relative pt-8 pb-24 md:pb-20 bg-[#1C1C1C] text-gray-200">
      <CallToAction pt={pt} />

      {/* On every page: the free 15-minute call (bookings land in the Autisync CRM), or WhatsApp. */}
      {!onBookingPage ? (
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-between gap-4 p-6 mb-10 text-center border rounded-2xl border-white/10 bg-white/[0.04] md:flex-row md:text-left">
            <div>
              <p className="text-xl font-semibold text-white">{c.bookTitle}</p>
              <p className="mt-1 text-sm text-gray-400">{c.bookText}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 shrink-0">
              <Link href={pt ? "/pt/marcar" : "/book"} className="rounded-full bg-[#B28228] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#9c7222]"
                data-track={`Book a call (footer) · ${pageRef(pathname)}`}>{c.bookCta}</Link>
              <a href={pageWaLink(pathname)} target="_blank" rel="noopener noreferrer"
                className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#25D366] hover:text-[#25D366]"
                data-track={`WhatsApp (footer) · ${pageRef(pathname)}`}>{c.waCta}</a>
            </div>
          </div>
        </div>
      ) : null}

      {/* top wedge */}
      <div
        className="absolute top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20 overflow-hidden pointer-events-none"
        style={{ transform: "translateZ(0)" }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden text-[#1C1C1C] fill-current"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 2560 100"
        >
          <polygon points="2560 0 2560 100 0 100" />
        </svg>
      </div>

      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap text-center lg:text-left">
          {/* Left column */}
          <div className="w-full px-4 lg:w-6/12">
            <h4 className={`text-3xl font-semibold text-white ${pt ? "" : "capitalize"}`}>
              <span className="text-[#B28228]">{c.h[0]}</span>
              {c.h[1]} <br />
              {c.h[2]}<span className="text-[#B28228]">{c.h[3]}</span>
            </h4>
            <p className="mt-0 mb-2 text-base text-gray-400">
              {c.p}
            </p>
            <div className="flex justify-center mt-6 space-x-6 lg:justify-start" />
          </div>

          {/* Right column */}
          <div className="w-full px-4 mt-10 lg:mt-0 lg:w-6/12">
            <div className="flex flex-wrap mb-6 items-top">
              {/* Useful links */}
              <div className="w-full px-4 ml-auto lg:w-4/12">
                <span className="block mb-2 text-sm font-semibold uppercase">
                  {c.useful}
                </span>
                <ul className="list-none">
                  {c.links.map(([label, href]) => (
                    <li key={href}>
                      <Link href={href} className="block pb-2 text-sm hover:text-[#B28228]">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div className="w-full px-4 lg:w-4/12">
                <span className="block mb-2 text-sm font-semibold uppercase">
                  {c.resources}
                </span>
                <ul className="list-none">
                  <li>
                    <Link href={c.res[0][1]} className="block pb-2 text-sm hover:text-[#B28228]">
                      {c.res[0][0]}
                    </Link>
                  </li>
                  <li>
                    <Link href={pt ? "/pt/privacidade" : "/PrivacyPolicy"} target="_blank" className="block pb-2 text-sm hover:text-[#B28228]">
                      {c.privacy}
                    </Link>
                  </li>
                  <li>
                    <Link href={pt ? "/pt/termos" : "/TermsofUse"} target="_blank" className="block pb-2 text-sm hover:text-[#B28228]">
                      {c.terms}
                    </Link>
                  </li>
                  <li>
                    <Link href={c.res[1][1]} className="block pb-2 text-sm hover:text-[#B28228]">
                      {c.res[1][0]}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-600" />
        
        {/* Bottom row: social + copyright */}
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="w-full px-4 mx-auto text-center md:w-4/12">
            <div className="flex justify-center space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-[#B28228] transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="w-6 h-6" aria-hidden="true" />
                </a>
              ))}
            </div>
            {/*
              The registered operator, on every page.

              Meta refused business verification with "a razão social da sua
              empresa deve estar presente no site": it checks the website
              against the company record and could not find the legal name
              anywhere on autisync.com. The name on the certidão is Maheldom
              Consulting, Lda; Autisync is the trading name. Saying so here is
              what ties the two together, for Meta and for anyone else who
              needs to know who they are dealing with.
            */}
            <p className="py-1 text-sm text-gray-400">
              © {new Date().getFullYear()} Autisync. {c.rights}
              <br />
              <span className="font-light">
                {c.trading}
              </span>
              <br />
              <span className="font-light">
                NIF 5003472418 · Matrícula 41063-26/260824 · Talatona, Luanda, Angola
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
