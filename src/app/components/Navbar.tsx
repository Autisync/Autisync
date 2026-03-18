"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AnchorButton } from "@/app/components/AnchorButton";

import {
  ChartBarIcon,
  CursorArrowRaysIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const solutions = [
  {
    name: "Creative, Design & Multimedia",
    description: "Logo Design · Stationery · Web Design · Print Media · Multimedia",
    href: "/solutions/graphicDesign",
    icon: ChartBarIcon,
  },
  {
    name: "SEO & Audience Engagement",
    description: "Search optimisation, keyword tracking, analytics & brand growth",
    href: "/solutions/seo",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "IT Consultation",
    description: "Technical Support · IT Consultation · Social Media · System Security",
    href: "/solutions/itConsultation",
    icon: ShieldCheckIcon,
  },
  {
    name: "Development Services",
    description: "Web Apps · Mobile · Enterprise Systems · CMS · Integrations",
    href: "/solutions/devServices/",
    icon: Squares2X2Icon,
  },
];

const callsToAction = [
  { name: "Questionnaire", href: "/ServiceQuestionaire/" },
  { name: "Service Packages", href: "/servicepackage/" },
];

const navLinks = [
  { label: "About",     href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact",   href: "/contact" },
];

// ─────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────

const overlayVariants = {
  hidden:  { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2,  ease: "easeIn" } },
};

const menuItemVariants = {
  hidden:  { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.055, duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  }),
};

const serviceItemVariants = {
  hidden:  { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.18 + i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─────────────────────────────────────────────
// DESKTOP FLYOUT
// ─────────────────────────────────────────────

function DesktopFlyout() {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const leave = () => {
    timer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
      <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
        <button
            className={`flex items-center gap-1 text-sm font-medium transition-colors duration-150
          ${open ? "text-[var(--autisync-gold,#B98B2F)]" : "text-gray-700 hover:text-[var(--autisync-gold,#B98B2F)]"}`}
        >
          Services
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
              <motion.div
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute left-1/2 -translate-x-1/2 mt-4 w-[380px] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden z-50"
              >

                <div className="p-3">
                  {solutions.map((item) => {
                    const Icon = item.icon;
                    return (
                        <a
                            key={item.name}
                            href={item.href}
                            className="group flex items-start gap-4 rounded-xl p-3.5 hover:bg-gray-50 transition-colors duration-150"
                        >
                          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-[var(--autisync-gold,#B98B2F)]/10 transition-colors duration-150">
                            <Icon className="w-5 h-5 text-[var(--autisync-gold,#B98B2F)]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-[var(--autisync-gold,#B98B2F)] transition-colors duration-150">
                              {item.name}
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">{item.description}</p>
                          </div>
                        </a>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 border-t border-gray-100 bg-gray-50/60">
                  {callsToAction.map((item) => (
                      <a
                          key={item.name}
                          href={item.href}
                          className="flex items-center justify-center gap-2 py-3 text-xs font-semibold text-gray-700
                    hover:text-[var(--autisync-gold,#B98B2F)] hover:bg-gray-100 transition-colors duration-150 first:border-r border-gray-200"
                      >
                        {item.name}
                        <ArrowRight className="w-3 h-3" />
                      </a>
                  ))}
                </div>
                {/* Gold accent bar */}
                <div className="h-0.5 w-full" style={{ background: "linear-gradient(to right,#7a5a1d,#d1a94c,#7a5a1d)" }} />

              </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}

// ─────────────────────────────────────────────
// MOBILE MENU
// ─────────────────────────────────────────────

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [servicesOpen, setServicesOpen] = useState(true); // expanded by default

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-40 flex flex-col bg-white"
          style={{ top: "56px" }} // sits just below the navbar bar
      >
        {/* Gold top accent */}
        <div className="h-0.5 flex-shrink-0" style={{ background: "linear-gradient(to right,#7a5a1d,#d1a94c,#7a5a1d)" }} />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 space-y-1">

          {/* ── Services accordion ── */}
          <div>
            <motion.button
                custom={0}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                onClick={() => setServicesOpen(v => !v)}
                className="flex w-full items-center justify-between py-3 text-base font-semibold text-gray-900"
            >
              <span>Services</span>
              <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </motion.span>
            </motion.button>

            <AnimatePresence initial={false}>
              {servicesOpen && (
                  <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                  >
                    <div className="pb-2 space-y-1">
                      {solutions.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                custom={i}
                                variants={serviceItemVariants}
                                initial="hidden"
                                animate="visible"
                                onClick={onClose}
                                className="group flex items-start gap-4 rounded-2xl p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150"
                            >
                              <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-gray-100 group-hover:bg-[var(--autisync-gold,#B98B2F)]/10 transition-colors duration-150">
                                <Icon className="w-5 h-5 text-[var(--autisync-gold,#B98B2F)]" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-gray-900 group-hover:text-[var(--autisync-gold,#B98B2F)] transition-colors duration-150 leading-snug">
                                  {item.name}
                                </p>
                                <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">{item.description}</p>
                              </div>
                              <ArrowRight className="flex-shrink-0 mt-1 w-4 h-4 text-gray-300 group-hover:text-[var(--autisync-gold,#B98B2F)] transition-colors duration-150" />
                            </motion.a>
                        );
                      })}
                    </div>

                    {/* CTA strip inside accordion */}
                    <motion.div
                        custom={solutions.length}
                        variants={serviceItemVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-2 gap-2 pb-3"
                    >
                      {callsToAction.map((item) => (
                          <a
                              key={item.name}
                              href={item.href}
                              onClick={onClose}
                              className="flex items-center justify-center gap-1.5 rounded-xl border border-[var(--autisync-gold,#B98B2F)]/30
                        bg-[var(--autisync-gold,#B98B2F)]/5 py-3 text-xs font-semibold text-[var(--autisync-gold,#B98B2F)]
                        hover:bg-[var(--autisync-gold,#B98B2F)]/15 active:scale-95 transition-all duration-150"
                          >
                            {item.name}
                            <ArrowRight className="w-3 h-3" />
                          </a>
                      ))}
                    </motion.div>
                  </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 mx-1" />

          {/* ── Top-level nav links ── */}
          {navLinks.map(({ label, href }, i) => (
              <motion.a
                  key={label}
                  href={href}
                  custom={i + 1}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={onClose}
                  className="flex items-center justify-between py-3.5 px-1 text-base font-semibold text-gray-800
              hover:text-[var(--autisync-gold,#B98B2F)] active:text-[var(--autisync-gold,#B98B2F)] transition-colors duration-150 group"
              >
                {label}
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[var(--autisync-gold,#B98B2F)] transition-colors duration-150" />
              </motion.a>
          ))}
        </div>

        {/* ── Sticky footer CTA ── */}
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 px-5 py-5 border-t border-gray-100 bg-white space-y-3"
        >
          <a
              href="tel:+244927114400"
              className="flex items-center justify-center gap-2.5 w-full rounded-xl
            bg-[var(--autisync-gold,#B98B2F)] px-4 py-3.5 text-sm font-semibold text-white
            shadow-[0_4px_16px_rgba(185,139,47,0.35)]
            hover:bg-[#7a5a1d] active:scale-[0.97] transition-all duration-150"
              onClick={onClose}
          >
            <Phone className="w-4 h-4" />
            Call Us Now
          </a>
          <p className="text-center text-[10px] text-gray-400 tracking-wide uppercase">
            UK · Portugal · Angola · Namibia
          </p>
        </motion.div>
      </motion.div>
  );
}

// ─────────────────────────────────────────────
// MAIN NAVBAR
// ─────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
      <>
        <div className="fixed top-0 left-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100/80">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">

              {/* ── Logo ── */}
              <Link href="/" className="flex-shrink-0" onClick={() => setMobileOpen(false)}>
                <span className="sr-only">Autisync</span>
                <Image
                    className="w-auto h-8 sm:h-10"
                    width={200}
                    height={200}
                    src="/Autisync.svg"
                    alt="Autisync logo"
                    priority
                />
              </Link>

              {/* ── Desktop nav ── */}
              <nav className="hidden md:flex items-center gap-7">
                <DesktopFlyout />
                {navLinks.map(({ label, href }) => (
                    <a
                        key={label}
                        href={href}
                        className="text-sm font-medium text-gray-700 hover:text-[var(--autisync-gold,#B98B2F)] transition-colors duration-150"
                    >
                      {label}
                    </a>
                ))}
              </nav>

              {/* ── Desktop CTA ── */}
              <div className="hidden md:flex items-center">
                <AnchorButton href="tel:+244927114400" variant="alt" size="sm">
                  Call Us
                </AnchorButton>
              </div>

              {/* ── Mobile hamburger ── */}
              <button
                  onClick={() => setMobileOpen(v => !v)}
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileOpen}
                  className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg
                hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                      <motion.span key="close"
                                   initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                                   exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                        <X className="w-5 h-5 text-gray-800" />
                      </motion.span>
                  ) : (
                      <motion.span key="open"
                                   initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                                   exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                        <Menu className="w-5 h-5 text-gray-800" />
                      </motion.span>
                  )}
                </AnimatePresence>
              </button>

            </div>
          </div>
        </div>

        {/* ── Mobile Menu overlay ── */}
        <AnimatePresence>
          {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
        </AnimatePresence>
      </>
  );
}