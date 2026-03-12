"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

type ProjectCategory =
  | "Corporate Website"
  | "Healthcare Website"
  | "Cybersecurity Website"
  | "E-commerce Website"
  | "Web App"
  | "Data & Analytics"
  | "Education Website"
  | "IT Support";

interface PortfolioProject {
  id: number;
  title: string;
  category: ProjectCategory;
  image: string;
  description: string;
  url?: string;
}

const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "Ninth Vision",
    category: "Corporate Website",
    image: "/logos/NinthVision.png",
    description: "Enterprise website with modern UI/UX for a visionary brand.",
    url: "https://www.9thvision.com/"
  },
  {
    id: 2,
    title: "OCCUCARE",
    category: "Healthcare Website",
    image: "/logos/OCCUCARE.png",
    description: "Healthcare management platform presented as a clean web app.",
  },
  {
    id: 3,
    title: "Segucyber",
    category: "Cybersecurity Website",
    image: "/logos/Segucyber.png",
    description: "Security solutions website focused on trust and reliability.",
    url: "https://segu-cyber.vercel.app/",
  },
  {
    id: 4,
    title: "Tchary Glamour",
    category: "E-commerce Website",
    image: "/logos/TcharyGlamour.png",
    description:
      "Beauty and fashion e-commerce experience with modern shopping flow.",
  },
  {
    id: 5,
    title: "Your Pharmacy",
    category: "Web App",
    image: "/logos/YourP.png",
    description: "Personal productivity platform with a web-first experience.",
    url: "https://your-pharm.vercel.app/",
  },
  {
    id: 6,
    title: "AJF Solutions",
    category: "Corporate Website",
    image: "/logos/ajf.png",
    description:
      "Enterprise business management suite presented as a clear corporate site.",
  },
  {
    id: 7,
    title: "DSSI",
    category: "Data & Analytics",
    image: "/logos/dssi.png",
    description: "Data science and integration platform with a minimal design.",
  },
  {
    id: 8,
    title: "OKU Platform",
    category: "Education Website",
    image: "/logos/oku.png",
    description: "Educational technology website for a modern learning platform.",
  },
  {
    id: 9,
    title: "Passa Studio",
    category: "IT Support",
    image: "/logos/passa.png",
    description: "We supported Passa Studio with end-to-end IT services, including business device setup, technical support, helpdesk operations, and secure systems configuration to ensure smooth daily operations.",
  },
];

/* ========= Inline SVG “3D” Icons ========= */

const TrophyIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21h6" />
    <path d="M10.5 17h3" />
    <path d="M8 4h8v4a4 4 0 0 1-8 0V4z" />
    <path d="M6 5H4a2 2 0 0 0 0 4h2" />
    <path d="M18 5h2a2 2 0 0 1 0 4h-2" />
  </svg>
);

const ProjectsIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
  </svg>
);

const ClientsIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 13a4 4 0 1 1 4-4" />
    <path d="M4 21v-1.5A4.5 4.5 0 0 1 8.5 15h0" />
    <circle cx="16" cy="9" r="3" />
    <path d="M12 21v-1.5A4.5 4.5 0 0 1 16.5 15H17" />
  </svg>
);

const YearsIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3.5" y="4.5" width="17" height="16" rx="2" />
    <path d="M8 3v3" />
    <path d="M16 3v3" />
    <path d="M3.5 9.5h17" />
    <path d="M9 14.5h3l-2 3h3" />
  </svg>
);

const SatisfactionIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="8" />
    <path d="M9 10h.01" />
    <path d="M15 10h.01" />
    <path d="M9 15c.7 1 1.8 1.6 3 1.6s2.3-.6 3-1.6" />
  </svg>
);

/* ========= Achievements logic ========= */

interface StatProps {
  icon: ReactNode;
  label: string;
  value: number;
  suffix?: string;
  delay?: number;
}

function progressSuffix(target: number, suffix: string, display: number) {
  if (!suffix) return "";
  return display >= target ? suffix : "";
}

// Auto-count + 3D icon badge (with hover effects)
function AchievementStat({
  icon,
  label,
  value,
  suffix = "",
  delay = 0,
}: StatProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let frameId: number;
    const duration = 1200;
    const start = performance.now();

    const animateCount = (now: number) => {
      const elapsed = now - (start + delay * 1000);
      if (elapsed < 0) {
        frameId = requestAnimationFrame(animateCount);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * value);
      setDisplayValue(current);

      if (progress < 1) frameId = requestAnimationFrame(animateCount);
    };

    frameId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className="
        group relative flex flex-col items-center w-full min-w-0 break-words
        bg-white rounded-3xl shadow-lg pt-10 pb-6 px-5
        transition-all duration-300 ease-out
        hover:-translate-y-2 hover:shadow-[0_22px_55px_rgba(15,23,42,0.35)]/10
      "
    >
      {/* 3D ICON BADGE */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2">
        <div
          className="
            flex items-center justify-center
            w-16 h-16 rounded-full
            bg-gradient-to-br from-[#b98b2f] via-[#d1a94c] to-[#7a5a1d]
            shadow-[0_12px_24px_rgba(0,0,0,0.25)]
            transition-transform duration-300 ease-out
             group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]/10
          "
        >
          <div
            className="
              flex items-center justify-center
              w-11 h-11 rounded-full
              bg-white/95
              shadow-[inset_0_3px_6px_rgba(0,0,0,0.18)]
              text-[var(--autisync-gold,#b98b2f)]
              transition-transform duration-300 ease-out
              group-hover:scale-105
            "
          >
            {icon}
          </div>
        </div>
      </div>

      {/* NUMBER + LABEL */}
      <div className="mt-4 text-4xl font-extrabold text-slate-800">
        {displayValue}
        {progressSuffix(value, suffix, displayValue)}
      </div>
      <div className="mt-2 text-sm text-slate-500">{label}</div>

      {/* Bottom accent bar */}
      {/*<div*/}
      {/*  className="*/}
      {/*    mt-6 h-1 w-full origin-center scale-x-75*/}
      {/*    rounded-full bg-[var(--autisync-gold,#f2a51f)]*/}
      {/*    transition-transform duration-300 ease-out*/}
      {/*    group-hover:scale-x-100*/}
      {/*  "*/}
      {/*/>*/}
    </motion.div>
  );
}

/* ========= Page ========= */

export default function Portfolio() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      {/* HERO IMAGE ONLY (TEXT ON TOP) */}
      <div className="relative flex items-center content-center justify-center pt-20 pb-32">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover "
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          }}
        >
          <span
            id="blackOverlay"
            className="absolute w-full h-full bg-black opacity-95"
          ></span>
        </div>
        <div className=" relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-full px-4 ml-auto mr-auto text-center lg:w-9/12">
              <div className="p-4">
                <h1 className="mt-24 text-5xl font-semibold text-white ">
                  Our Portfolio
                </h1>
                <p className="mt-4 text-lg text-gray-200 pb-10">
                  A curated look at digital products we've designed and built
                  for clients across industries — from corporate websites to
                  data-driven platforms.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 top-auto w-full h-16 overflow-hidden pointer-events-none"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-white fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>

      {/* TEXT BLOCK ON WHITE BACKGROUND */}
      <section className="bg-white pt-16 pb-10">
        <div className="container mx-auto text-center px-4 max-w-3xl">
          <p className="text-xs tracking-widest mt-6 text-[var(--autisync-gold,#B98B2F)] font-semibold uppercase">
            Recent Work
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-1">
            Websites We&apos;ve Crafted
          </h2>

          <p className="mt-3 text-lg text-gray-500">
            Every project combines strategy, design, and execution. Hover over a
            card to feel the Autisync touch — and open a live preview to explore
            the full experience.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-20 bg-white">
        <div className="container px-4 mx-auto relative pt-4">
          {/* Soft glow behind cards */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="mx-auto mt-12 h-64 max-w-5xl rounded-full bg-gradient-to-r from-amber-200/40 via-yellow-100/20 to-amber-200/40 blur-3xl" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {portfolioProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                onHoverStart={() => setHoveredCard(project.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative flex flex-col overflow-hidden rounded-2xl bg-white/95 shadow-lg shadow-black/10 backdrop-blur-md"
              >
                {/* Animated glow border */}
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent"
                  animate={
                    hoveredCard === project.id
                      ? {
                          boxShadow:
                            "0 0 0 1px rgba(185,139,47,0.55), 0 24px 60px rgba(15,23,42,0.35)",
                        }
                      : {
                          boxShadow: "0 16px 40px rgba(15,23,42,0.14)",
                        }
                  }
                  transition={{ duration: 0.28 }}
                />

                {/* Logo / visual */}
                <div className="relative flex h-56 items-center justify-center bg-gradient-to-br from-gray-50 via-white to-amber-50/40">
                  <motion.div
                    animate={
                      hoveredCard === project.id
                        ? { scale: 1.07, rotateZ: [0, -1.5, 1.5, 0] }
                        : { scale: 1, rotateZ: 0 }
                    }
                    transition={{ duration: 0.4 }}
                    className="relative z-10"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={210}
                      height={210}
                      className="object-contain p-8 drop-shadow-xl"
                    />
                  </motion.div>

                  {/* Light sweep overlay */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/35 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredCard === project.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Content */}
                <div className="relative flex flex-1 flex-col px-6 py-6">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-800 border border-amber-200">
                      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-[var(--autisync-gold,#B98B2F)]" />
                      {project.category}
                    </span>
                    <motion.span
                      className="text-[11px] uppercase tracking-[0.18em] text-gray-400"
                      animate={
                        hoveredCard === project.id
                          ? { letterSpacing: "0.26em" }
                          : { letterSpacing: "0.18em" }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      Website
                    </motion.span>
                  </div>

                  <motion.h3
                    className="mb-2 text-xl font-semibold text-gray-900"
                    animate={
                      hoveredCard === project.id
                        ? { color: "#b98b2f" }
                        : { color: "#111827" }
                    }
                    transition={{ duration: 0.25 }}
                  >
                    {project.title}
                  </motion.h3>

                  <p className="mb-4 text-base text-gray-600">
                    {project.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                      Previous work
                    </span>

                    <div className="flex items-center gap-3">
                      {project.url && (
                        <button
                          type="button"
                          onClick={() => setPreviewUrl(project.url!)}
                          className="text-xs font-medium text-[var(--autisync-gold,#B98B2F)] underline-offset-4 hover:underline"
                        >
                          Live preview
                        </button>
                      )}
                      <motion.div
                        className="flex items-center text-xs font-medium text-[var(--autisync-gold,#B98B2F)]"
                        animate={hoveredCard === project.id ? { x: 4 } : { x: 0 }}
                      >
                        View case study
                        <span className="ml-1">↗</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Our Achievements Section */}
          <div className="flex flex-wrap items-center mt-32">
            <div className="w-full px-4 mx-auto text-center">
              {/* White 3D circle with trophy above title */}
              <div className="flex justify-center mb-4">
                <div
                  className="
                    flex items-center justify-center
                    w-16 h-16 rounded-full bg-white
                    shadow-[0_12px_25px_rgba(0,0,0,0.12)]
                  "
                >
                  <TrophyIcon className="w-7 h-7 text-[var(--autisync-gold,#b98b2f)]" />
                </div>
              </div>

              <h3 className="mb-3 text-3xl font-semibold leading-normal text-gray-800">
                Our Achievements
              </h3>
              <p className="mb-10 text-base text-gray-500 max-w-2xl mx-auto">
                Numbers that reflect the trust our partners place in us and the
                work we deliver across every project.
              </p>

              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <AchievementStat
                  icon={<ProjectsIcon className="w-5 h-5" />}
                  label="Projects Launched"
                  value={50}
                  suffix="+"
                  delay={0}
                />
                <AchievementStat
                  icon={<ClientsIcon className="w-5 h-5" />}
                  label="Happy Clients"
                  value={30}
                  suffix="+"
                  delay={0.1}
                />
                <AchievementStat
                  icon={<YearsIcon className="w-5 h-5" />}
                  label="Years Building Digital"
                  value={5}
                  suffix="+"
                  delay={0.2}
                />
                <AchievementStat
                  icon={<SatisfactionIcon className="w-5 h-5" />}
                  label="Client Satisfaction"
                  value={98}
                  suffix="%"
                  delay={0.3}
                />
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-wrap items-center mt-32">
            <div className="w-full px-4 mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-2 text-3xl font-semibold text-gray-800"
              >
                Ready to Start Your Project?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-8 text-base text-gray-600"
              >
                Let&apos;s collaborate and turn your next idea into a flagship
                website for your brand.
              </motion.p>

              <Link
                href="https://wa.me/+447883317646"
                target="_blank"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-[var(--autisync-gold,#b98b2f)] px-8 py-2 text-sm font-medium text-white shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all hover:shadow-[0_16px_30px_rgba(0,0,0,0.18)]/10"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === LIVE PREVIEW MODAL === */}
      {previewUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70"
          onClick={() => setPreviewUrl(null)} // ← CLOSE WHEN CLICKING BACKDROP
        >
          <div
            className="relative w-[95vw] max-w-5xl h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()} // ← PREVENT CLOSING WHEN CLICKING MODAL CONTENT
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute right-4 top-3 z-10 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white hover:bg-black"
            >
              Close ✕
            </button>

            {/* WEBSITE IFRAME */}
            <iframe
              src={previewUrl}
              title="Project preview"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
