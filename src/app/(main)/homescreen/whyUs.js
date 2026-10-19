import React from "react";
import Link from "next/link";
import { localHref } from "@/lib/i18n/routes";

/* ===========================================================
   BRAND 3D GOLD BADGE ICONS (Matches Landing Page Style)
   WITH HOVER EFFECTS
   =========================================================== */

/* 3D Gold Rocket Badge */
function RocketBadge({ className = "" }) {
  return (
    <div
      className={`inline-flex items-center justify-center transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#b98b2f] via-[#d1a94c] to-[#7a5a1d] shadow-[0_14px_30px_rgba(0,0,0,0.25)] border border-white/5 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-white/95 shadow-[inset_0_2px_4px_rgba(0,0,0,0.22)] flex items-center justify-center">
          {/* rocket icon */}
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-gray-900"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2c-2 2-3 5-3 8 0 3 1 6 3 8 2-2 3-5 3-8 0-3-1-6-3-8z" />
            <path d="M9 12h6" />
            <path d="M10 14l-1.5 1.5" />
            <path d="M14 14l1.5 1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* Gold Bullet Icon */
function BulletIcon() {
  return (
    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#fde68a] via-[#facc15] to-[#b98b2f] shadow-md flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
      <div className="w-2 h-2 bg-gray-800 rounded-full" />
    </div>
  );
}

/* ==========================================
   Reasons & Tags
   ========================================== */

const reasons = {
  en: [
    "AI-driven automation & CRM systems",
    "Bespoke branding & design assets",
    "Custom backend & app integrations",
    "Lead generation & review campaigns",
    "Mobile-ready, scalable solutions",
  ],
  pt: [
    "Automação com IA e sistemas de CRM",
    "Branding e design feitos à medida",
    "Integrações de sistemas e aplicações à medida",
    "Campanhas para angariar contactos e avaliações",
    "Soluções escaláveis e adaptadas a telemóvel",
  ],
};

const tags = {
  en: [
    "AUTOMATION",
    "RELIABILITY",
    "PREMIUM DESIGN",
    "99% UPTIME",
    "SPEED",
    "CUSTOMER-FIRST",
  ],
  pt: [
    "AUTOMAÇÃO",
    "FIABILIDADE",
    "DESIGN PREMIUM",
    "99% DE DISPONIBILIDADE",
    "RAPIDEZ",
    "O CLIENTE PRIMEIRO",
  ],
};

/* ==========================================
   MAIN COMPONENT
   ========================================== */

export default function WhyUs({ lang = "en" } = {}) {
  const pt = lang === "pt";
  const t = (en, ptText) => (pt ? ptText : en);
  const l = pt ? "pt" : "en";
  return (
    <section className="relative py-20 bg-gray-100">
      {/* top wedge */}
      <div
        className="absolute top-0 left-0 right-0 w-full h-20 -mt-20 overflow-hidden pointer-events-none"
        style={{ transform: "translateZ(0)" }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 2560 100"
        >
          <polygon className="text-gray-100 fill-current" points="2560 0 2560 100 0 100" />
        </svg>
      </div>

      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap items-center">
          {/* ====================== IMAGE COLLAGE ====================== */}
          <div className="w-full px-4 mt-20 ml-auto mr-auto md:w-6/12">
            <div className="relative flex flex-wrap justify-center gap-4">
              <img
                alt={t("Automate Business", "Automatizar o negócio")}
                className="w-full md:w-5/12 rounded-lg shadow-xl transition-transform duration-300 hover:scale-[1.02]"
                src="https://images.pexels.com/photos/2422278/pexels-photo-2422278.jpeg"
              />
              <img
                alt={t("Team Planning", "Planeamento em equipa")}
                className="w-full md:w-5/12 rounded-lg shadow-xl transition-transform duration-300 hover:scale-[1.02]"
                src="https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg"
              />
              <img
                alt={t("Office Launch", "Lançamento de um projeto")}
                className="w-full md:w-10/12 rounded-lg shadow-xl transition-transform duration-300 hover:scale-[1.02]"
                src="https://images.pexels.com/photos/34521/space-shuttle-lift-off-liftoff-nasa.jpg"
              />
            </div>
          </div>
          
          {/* ====================== TEXT CONTENT ====================== */}
          <div className="w-full px-4 ml-auto mr-auto md:w-5/12">
            <div className="md:pr-12">
              {/* TOP BADGE */}
              <RocketBadge className="mb-6" />

              <h3 className="text-3xl font-semibold text-gray-800">
                {t("Why Businesses Choose", "Porque é que as empresas escolhem a")}{" "}
                <span className="font-bold text-[var(--autisync-gold,#b98b2f)]">
                  AUTISYNC
                </span>
              </h3>

              {/* Bullet List */}
              <ul className="mt-6 space-y-4">
                {reasons[l].map((text, index) => (
                  <li
                    key={index}
                    className="group flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
                  >
                    <BulletIcon />
                    <span className="text-gray-600 text-[15px] leading-relaxed">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {tags[l].map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 text-xs font-semibold tracking-wide text-gray-100 uppercase bg-gray-900 rounded-full shadow transition-all duration-200 hover:text-[var(--autisync-gold,#b98b2f)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

                {/* button */}

              <Link
                  className="inline-flex justify-center mt-4 px-4 py-2 text-sm font-medium text-white bg-[var(--autisync-gold,#b98b2f)] border border-transparent rounded-md shadow-lg hover:bg-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mr-2 transition-all hover:shadow-[0_16px_30px_rgba(0,0,0,0.18)]/10"
                  href={localHref("/servicepackage", pt)}
              >
                {t("Service Packages", "Pacotes de serviços")}
              </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
