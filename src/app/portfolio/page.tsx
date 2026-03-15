// "use client";
//
// import React, { useState, useRef, useEffect, ReactNode } from "react";
// import Image from "next/image";
// import { motion, useInView } from "framer-motion";
// import Link from "next/link";
//
// type ProjectCategory =
//   | "Corporate Website"
//   | "Healthcare Website"
//   | "Cybersecurity Website"
//   | "E-commerce Website"
//   | "Web App"
//   | "Data & Analytics"
//   | "Education Website"
//   | "IT Support";
//
// interface PortfolioProject {
//   id: number;
//   title: string;
//   category: ProjectCategory;
//   image: string;
//   description: string;
//   url?: string;
// }
//
// const portfolioProjects: PortfolioProject[] = [
//   {
//     id: 1,
//     title: "Ninth Vision",
//     category: "Corporate Website",
//     image: "/logos/NinthVision.png",
//     description: "Enterprise website with modern UI/UX for a visionary brand.",
//     url: "https://www.9thvision.com/"
//   },
//   {
//     id: 2,
//     title: "OCCUCARE",
//     category: "Healthcare Website",
//     image: "/logos/OCCUCARE.png",
//     description: "Healthcare management platform presented as a clean web app.",
//   },
//   {
//     id: 3,
//     title: "Segucyber",
//     category: "Cybersecurity Website",
//     image: "/logos/Segucyber.png",
//     description: "Security solutions website focused on trust and reliability.",
//     url: "https://segu-cyber.vercel.app/",
//   },
//   {
//     id: 4,
//     title: "Tchary Glamour",
//     category: "E-commerce Website",
//     image: "/logos/TcharyGlamour.png",
//     description:
//       "Beauty and fashion e-commerce experience with modern shopping flow.",
//   },
//   {
//     id: 5,
//     title: "Your Pharmacy",
//     category: "Web App",
//     image: "/logos/YourP.png",
//     description: "Personal productivity platform with a web-first experience.",
//     url: "https://your-pharm.vercel.app/",
//   },
//   {
//     id: 6,
//     title: "AJF Solutions",
//     category: "Corporate Website",
//     image: "/logos/ajf.png",
//     description:
//       "Enterprise business management suite presented as a clear corporate site.",
//   },
//   {
//     id: 7,
//     title: "DSSI",
//     category: "Data & Analytics",
//     image: "/logos/dssi.png",
//     description: "Data science and integration platform with a minimal design.",
//   },
//   {
//     id: 8,
//     title: "OKU Platform",
//     category: "Education Website",
//     image: "/logos/oku.png",
//     description: "Educational technology website for a modern learning platform.",
//   },
//   {
//     id: 9,
//     title: "Passa Studio",
//     category: "IT Support",
//     image: "/logos/passa.png",
//     description: "We supported Passa Studio with end-to-end IT services, including business device setup, technical support, helpdesk operations, and secure systems configuration to ensure smooth daily operations.",
//   },
// ];
//
// /* ========= Inline SVG “3D” Icons ========= */
//
// const TrophyIcon = ({ className }: { className?: string }) => (
//   <svg
//     viewBox="0 0 24 24"
//     className={className}
//     fill="none"
//     stroke="currentColor"
//     strokeWidth={1.7}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M9 21h6" />
//     <path d="M10.5 17h3" />
//     <path d="M8 4h8v4a4 4 0 0 1-8 0V4z" />
//     <path d="M6 5H4a2 2 0 0 0 0 4h2" />
//     <path d="M18 5h2a2 2 0 0 1 0 4h-2" />
//   </svg>
// );
//
// const ProjectsIcon = ({ className }: { className?: string }) => (
//   <svg
//     viewBox="0 0 24 24"
//     className={className}
//     fill="none"
//     stroke="currentColor"
//     strokeWidth={1.7}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
//     <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
//     <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
//     <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
//   </svg>
// );
//
// const ClientsIcon = ({ className }: { className?: string }) => (
//   <svg
//     viewBox="0 0 24 24"
//     className={className}
//     fill="none"
//     stroke="currentColor"
//     strokeWidth={1.7}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M8 13a4 4 0 1 1 4-4" />
//     <path d="M4 21v-1.5A4.5 4.5 0 0 1 8.5 15h0" />
//     <circle cx="16" cy="9" r="3" />
//     <path d="M12 21v-1.5A4.5 4.5 0 0 1 16.5 15H17" />
//   </svg>
// );
//
// const YearsIcon = ({ className }: { className?: string }) => (
//   <svg
//     viewBox="0 0 24 24"
//     className={className}
//     fill="none"
//     stroke="currentColor"
//     strokeWidth={1.7}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="3.5" y="4.5" width="17" height="16" rx="2" />
//     <path d="M8 3v3" />
//     <path d="M16 3v3" />
//     <path d="M3.5 9.5h17" />
//     <path d="M9 14.5h3l-2 3h3" />
//   </svg>
// );
//
// const SatisfactionIcon = ({ className }: { className?: string }) => (
//   <svg
//     viewBox="0 0 24 24"
//     className={className}
//     fill="none"
//     stroke="currentColor"
//     strokeWidth={1.7}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="8" />
//     <path d="M9 10h.01" />
//     <path d="M15 10h.01" />
//     <path d="M9 15c.7 1 1.8 1.6 3 1.6s2.3-.6 3-1.6" />
//   </svg>
// );
//
// /* ========= Achievements logic ========= */
//
// interface StatProps {
//   icon: ReactNode;
//   label: string;
//   value: number;
//   suffix?: string;
//   delay?: number;
// }
//
// function progressSuffix(target: number, suffix: string, display: number) {
//   if (!suffix) return "";
//   return display >= target ? suffix : "";
// }
//
// // Auto-count + 3D icon badge (with hover effects)
// function AchievementStat({
//   icon,
//   label,
//   value,
//   suffix = "",
//   delay = 0,
// }: StatProps) {
//   const ref = useRef<HTMLDivElement | null>(null);
//   const isInView = useInView(ref, { once: true, margin: "-80px" });
//   const [displayValue, setDisplayValue] = useState(0);
//
//   useEffect(() => {
//     if (!isInView) return;
//
//     let frameId: number;
//     const duration = 1200;
//     const start = performance.now();
//
//     const animateCount = (now: number) => {
//       const elapsed = now - (start + delay * 1000);
//       if (elapsed < 0) {
//         frameId = requestAnimationFrame(animateCount);
//         return;
//       }
//
//       const progress = Math.min(elapsed / duration, 1);
//       const current = Math.floor(progress * value);
//       setDisplayValue(current);
//
//       if (progress < 1) frameId = requestAnimationFrame(animateCount);
//     };
//
//     frameId = requestAnimationFrame(animateCount);
//     return () => cancelAnimationFrame(frameId);
//   }, [isInView, value, delay]);
//
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, scale: 0.9, y: 20 }}
//       whileInView={{ opacity: 1, scale: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.55, delay }}
//       className="
//         group relative flex flex-col items-center w-full min-w-0 break-words
//         bg-white rounded-3xl shadow-lg pt-10 pb-6 px-5
//         transition-all duration-300 ease-out
//         hover:-translate-y-2 hover:shadow-[0_22px_55px_rgba(15,23,42,0.35)]/10
//       "
//     >
//       {/* 3D ICON BADGE */}
//       <div className="absolute -top-8 left-1/2 -translate-x-1/2">
//         <div
//           className="
//             flex items-center justify-center
//             w-16 h-16 rounded-full
//             bg-gradient-to-br from-[#b98b2f] via-[#d1a94c] to-[#7a5a1d]
//             shadow-[0_12px_24px_rgba(0,0,0,0.25)]
//             transition-transform duration-300 ease-out
//              group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]/10
//           "
//         >
//           <div
//             className="
//               flex items-center justify-center
//               w-11 h-11 rounded-full
//               bg-white/95
//               shadow-[inset_0_3px_6px_rgba(0,0,0,0.18)]
//               text-[var(--autisync-gold,#b98b2f)]
//               transition-transform duration-300 ease-out
//               group-hover:scale-105
//             "
//           >
//             {icon}
//           </div>
//         </div>
//       </div>
//
//       {/* NUMBER + LABEL */}
//       <div className="mt-4 text-4xl font-extrabold text-slate-800">
//         {displayValue}
//         {progressSuffix(value, suffix, displayValue)}
//       </div>
//       <div className="mt-2 text-sm text-slate-500">{label}</div>
//
//       {/* Bottom accent bar */}
//       {/*<div*/}
//       {/*  className="*/}
//       {/*    mt-6 h-1 w-full origin-center scale-x-75*/}
//       {/*    rounded-full bg-[var(--autisync-gold,#f2a51f)]*/}
//       {/*    transition-transform duration-300 ease-out*/}
//       {/*    group-hover:scale-x-100*/}
//       {/*  "*/}
//       {/*/>*/}
//     </motion.div>
//   );
// }
//
// /* ========= Page ========= */
//
// export default function Portfolio() {
//   const [hoveredCard, setHoveredCard] = useState<number | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//
//   return (
//     <div className="min-h-screen">
//       {/* HERO IMAGE ONLY (TEXT ON TOP) */}
//       <div className="relative flex items-center content-center justify-center pt-20 pb-32">
//         <div
//           className="absolute top-0 w-full h-full bg-center bg-cover "
//           style={{
//             backgroundImage:
//               "url('https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
//           }}
//         >
//           <span
//             id="blackOverlay"
//             className="absolute w-full h-full bg-black opacity-95"
//           ></span>
//         </div>
//         <div className=" relative mx-auto">
//           <div className="flex flex-wrap items-center">
//             <div className="w-full px-4 ml-auto mr-auto text-center lg:w-9/12">
//               <div className="p-4">
//                 <h1 className="mt-24 text-5xl font-semibold text-white ">
//                   Our Portfolio
//                 </h1>
//                 <p className="mt-4 text-lg text-gray-200 pb-10">
//                   A curated look at digital products we've designed and built
//                   for clients across industries — from corporate websites to
//                   data-driven platforms.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div
//           className="absolute bottom-0 left-0 right-0 top-auto w-full h-16 overflow-hidden pointer-events-none"
//           style={{ transform: "translateZ(0)" }}
//         >
//           <svg
//             className="absolute bottom-0 overflow-hidden"
//             xmlns="http://www.w3.org/2000/svg"
//             preserveAspectRatio="none"
//             version="1.1"
//             viewBox="0 0 2560 100"
//             x="0"
//             y="0"
//           >
//             <polygon
//               className="text-white fill-current"
//               points="2560 0 2560 100 0 100"
//             ></polygon>
//           </svg>
//         </div>
//       </div>
//
//       {/* TEXT BLOCK ON WHITE BACKGROUND */}
//       <section className="bg-white pt-16 pb-10">
//         <div className="container mx-auto text-center px-4 max-w-3xl">
//           <p className="text-xs tracking-widest mt-6 text-[var(--autisync-gold,#B98B2F)] font-semibold uppercase">
//             Recent Work
//           </p>
//
//           <h2 className="text-2xl font-semibold text-gray-800 mt-1">
//             Websites We&apos;ve Crafted
//           </h2>
//
//           <p className="mt-3 text-lg text-gray-500">
//             Every project combines strategy, design, and execution. Hover over a
//             card to feel the Autisync touch — and open a live preview to explore
//             the full experience.
//           </p>
//         </div>
//       </section>
//
//       {/* Portfolio Grid */}
//       <section className="pb-20 bg-white">
//         <div className="container px-4 mx-auto relative pt-4">
//           {/* Soft glow behind cards */}
//           <div className="pointer-events-none absolute inset-0 -z-10">
//             <div className="mx-auto mt-12 h-64 max-w-5xl rounded-full bg-gradient-to-r from-amber-200/40 via-yellow-100/20 to-amber-200/40 blur-3xl" />
//           </div>
//
//           <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//             {portfolioProjects.map((project, index) => (
//               <motion.article
//                 key={project.id}
//                 initial={{ opacity: 0, y: 40, scale: 0.96 }}
//                 whileInView={{ opacity: 1, y: 0, scale: 1 }}
//                 viewport={{ once: true, margin: "-80px" }}
//                 transition={{
//                   duration: 0.5,
//                   delay: index * 0.06,
//                   ease: "easeOut",
//                 }}
//                 whileHover={{ y: -10, scale: 1.02 }}
//                 onHoverStart={() => setHoveredCard(project.id)}
//                 onHoverEnd={() => setHoveredCard(null)}
//                 className="relative flex flex-col overflow-hidden rounded-2xl bg-white/95 shadow-lg shadow-black/10 backdrop-blur-md"
//               >
//                 {/* Animated glow border */}
//                 <motion.div
//                   className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent"
//                   animate={
//                     hoveredCard === project.id
//                       ? {
//                           boxShadow:
//                             "0 0 0 1px rgba(185,139,47,0.55), 0 24px 60px rgba(15,23,42,0.35)",
//                         }
//                       : {
//                           boxShadow: "0 16px 40px rgba(15,23,42,0.14)",
//                         }
//                   }
//                   transition={{ duration: 0.28 }}
//                 />
//
//                 {/* Logo / visual */}
//                 <div className="relative flex h-56 items-center justify-center bg-gradient-to-br from-gray-50 via-white to-amber-50/40">
//                   <motion.div
//                     animate={
//                       hoveredCard === project.id
//                         ? { scale: 1.07, rotateZ: [0, -1.5, 1.5, 0] }
//                         : { scale: 1, rotateZ: 0 }
//                     }
//                     transition={{ duration: 0.4 }}
//                     className="relative z-10"
//                   >
//                     <Image
//                       src={project.image}
//                       alt={project.title}
//                       width={210}
//                       height={210}
//                       className="object-contain p-8 drop-shadow-xl"
//                     />
//                   </motion.div>
//
//                   {/* Light sweep overlay */}
//                   <motion.div
//                     className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/35 via-transparent to-transparent"
//                     initial={{ opacity: 0 }}
//                     animate={{
//                       opacity: hoveredCard === project.id ? 1 : 0,
//                     }}
//                     transition={{ duration: 0.3 }}
//                   />
//                 </div>
//
//                 {/* Content */}
//                 <div className="relative flex flex-1 flex-col px-6 py-6">
//                   <div className="mb-3 flex items-center justify-between gap-2">
//                     <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-800 border border-amber-200">
//                       <span className="mr-1 h-1.5 w-1.5 rounded-full bg-[var(--autisync-gold,#B98B2F)]" />
//                       {project.category}
//                     </span>
//                     <motion.span
//                       className="text-[11px] uppercase tracking-[0.18em] text-gray-400"
//                       animate={
//                         hoveredCard === project.id
//                           ? { letterSpacing: "0.26em" }
//                           : { letterSpacing: "0.18em" }
//                       }
//                       transition={{ duration: 0.3 }}
//                     >
//                       Website
//                     </motion.span>
//                   </div>
//
//                   <motion.h3
//                     className="mb-2 text-xl font-semibold text-gray-900"
//                     animate={
//                       hoveredCard === project.id
//                         ? { color: "#b98b2f" }
//                         : { color: "#111827" }
//                     }
//                     transition={{ duration: 0.25 }}
//                   >
//                     {project.title}
//                   </motion.h3>
//
//                   <p className="mb-4 text-base text-gray-600">
//                     {project.description}
//                   </p>
//
//                   <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
//                     <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
//                       Previous work
//                     </span>
//
//                     <div className="flex items-center gap-3">
//                       {project.url && (
//                         <button
//                           type="button"
//                           onClick={() => setPreviewUrl(project.url!)}
//                           className="text-xs font-medium text-[var(--autisync-gold,#B98B2F)] underline-offset-4 hover:underline"
//                         >
//                           Live preview
//                         </button>
//                       )}
//                       <motion.div
//                         className="flex items-center text-xs font-medium text-[var(--autisync-gold,#B98B2F)]"
//                         animate={hoveredCard === project.id ? { x: 4 } : { x: 0 }}
//                       >
//                         View case study
//                         <span className="ml-1">↗</span>
//                       </motion.div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.article>
//             ))}
//           </div>
//
//           {/* Our Achievements Section */}
//           <div className="flex flex-wrap items-center mt-32">
//             <div className="w-full px-4 mx-auto text-center">
//               {/* White 3D circle with trophy above title */}
//               <div className="flex justify-center mb-4">
//                 <div
//                   className="
//                     flex items-center justify-center
//                     w-16 h-16 rounded-full bg-white
//                     shadow-[0_12px_25px_rgba(0,0,0,0.12)]
//                   "
//                 >
//                   <TrophyIcon className="w-7 h-7 text-[var(--autisync-gold,#b98b2f)]" />
//                 </div>
//               </div>
//
//               <h3 className="mb-3 text-3xl font-semibold leading-normal text-gray-800">
//                 Our Achievements
//               </h3>
//               <p className="mb-10 text-base text-gray-500 max-w-2xl mx-auto">
//                 Numbers that reflect the trust our partners place in us and the
//                 work we deliver across every project.
//               </p>
//
//               <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
//                 <AchievementStat
//                   icon={<ProjectsIcon className="w-5 h-5" />}
//                   label="Projects Launched"
//                   value={50}
//                   suffix="+"
//                   delay={0}
//                 />
//                 <AchievementStat
//                   icon={<ClientsIcon className="w-5 h-5" />}
//                   label="Happy Clients"
//                   value={30}
//                   suffix="+"
//                   delay={0.1}
//                 />
//                 <AchievementStat
//                   icon={<YearsIcon className="w-5 h-5" />}
//                   label="Years Building Digital"
//                   value={5}
//                   suffix="+"
//                   delay={0.2}
//                 />
//                 <AchievementStat
//                   icon={<SatisfactionIcon className="w-5 h-5" />}
//                   label="Client Satisfaction"
//                   value={98}
//                   suffix="%"
//                   delay={0.3}
//                 />
//               </div>
//             </div>
//           </div>
//
//           {/* CTA Section */}
//           <div className="flex flex-wrap items-center mt-32">
//             <div className="w-full px-4 mx-auto text-center">
//               <motion.h2
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 className="mb-2 text-3xl font-semibold text-gray-800"
//               >
//                 Ready to Start Your Project?
//               </motion.h2>
//               <motion.p
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.1 }}
//                 className="mb-8 text-base text-gray-600"
//               >
//                 Let&apos;s collaborate and turn your next idea into a flagship
//                 website for your brand.
//               </motion.p>
//
//               <Link
//                 href="https://wa.me/+447883317646"
//                 target="_blank"
//                 className="inline-flex items-center justify-center rounded-md border border-transparent bg-[var(--autisync-gold,#b98b2f)] px-8 py-2 text-sm font-medium text-white shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all hover:shadow-[0_16px_30px_rgba(0,0,0,0.18)]/10"
//               >
//                 Get In Touch
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//
//       {/* === LIVE PREVIEW MODAL === */}
//       {previewUrl && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70"
//           onClick={() => setPreviewUrl(null)} // ← CLOSE WHEN CLICKING BACKDROP
//         >
//           <div
//             className="relative w-[95vw] max-w-5xl h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
//             onClick={(e) => e.stopPropagation()} // ← PREVENT CLOSING WHEN CLICKING MODAL CONTENT
//           >
//             {/* CLOSE BUTTON */}
//             <button
//               onClick={() => setPreviewUrl(null)}
//               className="absolute right-4 top-3 z-10 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white hover:bg-black"
//             >
//               Close ✕
//             </button>
//
//             {/* WEBSITE IFRAME */}
//             <iframe
//               src={previewUrl}
//               title="Project preview"
//               className="w-full h-full border-0"
//               loading="lazy"
//             />
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// }

"use client"
import type { ReactNode } from "react";
import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

// ============================================
// TYPES & DATA
// ============================================

type CategoryType =
    | "Website/App Development"
    | "Graphic Design"
    | "Technical Support"
    | "Marketing";

interface PortfolioProject {
    id: number;
    title: string;
    category: CategoryType;
    subcategory: string;
    image: string;
    description: string;
    url?: string;
    color: string;
}

interface CategoryTheme {
    name: CategoryType;
    gradient: string;
    accent: string;
    glow: string;
    textColor: string;
    bgColor: string;
    particleColor: string;
    // Per-category header copy
    eyebrow: string;
    heading: string;
    subheading: string;
}

// Theme colors for each category
const categoryThemes: Record<CategoryType, CategoryTheme> = {
    "Website/App Development": {
        name: "Website/App Development",
        gradient: "from-indigo-600 via-violet-600 to-purple-700",
        accent: "#6366F1",
        glow: "rgba(99, 102, 241, 0.5)",
        textColor: "text-indigo-400",
        bgColor: "bg-slate-950",
        particleColor: "#6366F1",
        eyebrow: "Websites & Web Apps",
        heading: "Interfaces built to perform",
        subheading: "From corporate sites to full-stack web apps — every pixel engineered for speed, clarity, and conversion.",
    },
    "Graphic Design": {
        name: "Graphic Design",
        gradient: "from-pink-500 via-rose-500 to-fuchsia-600",
        accent: "#EC4899",
        glow: "rgba(236, 72, 153, 0.5)",
        textColor: "text-pink-400",
        bgColor: "bg-neutral-950",
        particleColor: "#EC4899",
        eyebrow: "Visual Identity & Design",
        heading: "Brands that turn heads",
        subheading: "Logos, identities, and print collateral crafted to make a lasting first impression.",
    },
    "Technical Support": {
        name: "Technical Support",
        gradient: "from-cyan-500 via-teal-500 to-emerald-600",
        accent: "#06B6D4",
        glow: "rgba(6, 182, 212, 0.5)",
        textColor: "text-cyan-400",
        bgColor: "bg-zinc-950",
        particleColor: "#06B6D4",
        eyebrow: "IT Infrastructure & Support",
        heading: "Technology that just works",
        subheading: "End-to-end IT setup, helpdesk operations, and secure systems so teams can focus on what matters.",
    },
    "Marketing": {
        name: "Marketing",
        gradient: "from-amber-500 via-orange-500 to-red-500",
        accent: "#F59E0B",
        glow: "rgba(245, 158, 11, 0.5)",
        textColor: "text-amber-400",
        bgColor: "bg-stone-950",
        particleColor: "#F59E0B",
        eyebrow: "Digital Marketing",
        heading: "Campaigns that convert",
        subheading: "Strategic positioning and digital campaigns that put your brand in front of the right audience.",
    },
};

const portfolioProjects: PortfolioProject[] = [
    {
        id: 1,
        title: "Ninth Vision",
        category: "Website/App Development",
        subcategory: "Corporate Website",
        image: "/logos/NinthVision.svg",
        description: "Enterprise website with modern UI/UX for a visionary brand.",
        url: "https://www.9thvision.com/",
        color: "#6366F1",
    },
    {
        id: 2,
        title: "Segucyber",
        category: "Website/App Development",
        subcategory: "Cybersecurity Website",
        image: "/logos/Segucyber.svg",
        description: "Security solutions website focused on trust and reliability.",
        url: "https://segu-cyber.vercel.app/",
        color: "#6366F1",
    },
    {
        id: 3,
        title: "Tchary Glamour",
        category: "Website/App Development",
        subcategory: "E-commerce Website",
        image: "/logos/TcharyGlamour.svg",
        description: "Beauty and fashion e-commerce experience with modern shopping flow.",
        color: "#6366F1",
    },
    {
        id: 4,
        title: "Your Pharmacy",
        category: "Website/App Development",
        subcategory: "Web App",
        image: "/logos/YourP.svg",
        description: "Personal productivity platform with a web-first experience.",
        url: "https://your-pharm.vercel.app/",
        color: "#6366F1",
    },
    {
        id: 5,
        title: "AJF Solutions",
        category: "Website/App Development",
        subcategory: "Corporate Website",
        image: "/logos/ajf.svg",
        description: "Enterprise business management suite presented as a clear corporate site.",
        color: "#6366F1",
    },
    {
        id: 6,
        title: "OKU Platform",
        category: "Website/App Development",
        subcategory: "Education Website",
        image: "/logos/oku.svg",
        description: "Educational technology website for a modern learning platform.",
        color: "#6366F1",
    },
    {
        id: 7,
        title: "Brand Identity - Luxe",
        category: "Graphic Design",
        subcategory: "Brand Identity",
        image: "/logos/dssi.svg",
        description: "Complete brand identity design including logo, color palette, and visual guidelines.",
        color: "#EC4899",
    },
    {
        id: 8,
        title: "Marketing Collateral",
        category: "Graphic Design",
        subcategory: "Print Design",
        image: "/logos/passa.svg",
        description: "Brochures, business cards, and promotional materials with cohesive design language.",
        color: "#EC4899",
    },
    {
        id: 9,
        title: "Passa Studio IT",
        category: "Technical Support",
        subcategory: "IT Infrastructure",
        image: "/logos/passa.svg",
        description: "End-to-end IT services including business device setup, technical support, and secure systems configuration.",
        color: "#06B6D4",
    },
    {
        id: 10,
        title: "DSSI Systems",
        category: "Technical Support",
        subcategory: "Data Integration",
        image: "/logos/dssi.svg",
        description: "Data science and integration platform with comprehensive technical support.",
        color: "#06B6D4",
    },
    {
        id: 11,
        title: "OCCUCARE Campaign",
        category: "Marketing",
        subcategory: "Digital Marketing",
        image: "/logos/OCCUCARE.svg",
        description: "Healthcare management platform marketing campaign with strategic positioning.",
        color: "#F59E0B",
    },
];

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

function AchievementStat({ icon, label, value, suffix = "", delay = 0 }: StatProps) {
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
            if (elapsed < 0) { frameId = requestAnimationFrame(animateCount); return; }
            const progress = Math.min(elapsed / duration, 1);
            setDisplayValue(Math.floor(progress * value));
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
            className="group relative flex flex-col items-center w-full min-w-0 break-words bg-white rounded-3xl shadow-lg pt-10 pb-6 px-5 transition-all duration-300 ease-out hover:-translate-y-2"
        >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#b98b2f] via-[#d1a94c] to-[#7a5a1d] shadow-[0_12px_24px_rgba(0,0,0,0.25)]">
                    <div className="flex items-center justify-center w-11 h-11 rounded-full bg-white/95 shadow-[inset_0_3px_6px_rgba(0,0,0,0.18)] text-[var(--autisync-gold,#b98b2f)] transition-transform duration-300 ease-out group-hover:scale-105">
                        {icon}
                    </div>
                </div>
            </div>
            <div className="mt-4 text-4xl font-extrabold text-slate-800">
                {displayValue}{progressSuffix(value, suffix, displayValue)}
            </div>
            <div className="mt-2 text-sm text-slate-500">{label}</div>
        </motion.div>
    );
}

// ============================================
// ICONS
// ============================================

const CodeIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
);
const DesignIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" />
        <path d="M12 2v4" /><path d="M12 18v4" /><path d="M2 12h4" /><path d="M18 12h4" />
    </svg>
);
const SupportIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
        <path d="M8.5 8.5v.01" /><path d="M16 15.5v.01" /><path d="M12 12v.01" /><path d="M11 17v.01" /><path d="M7 14v.01" />
    </svg>
);
const MarketingIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="M7 16l4-4 4 4 6-6" />
    </svg>
);
const TrophyIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21h6" /><path d="M10.5 17h3" /><path d="M8 4h8v4a4 4 0 0 1-8 0V4z" />
        <path d="M6 5H4a2 2 0 0 0 0 4h2" /><path d="M18 5h2a2 2 0 0 1 0 4h-2" />
    </svg>
);
const ProjectsIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
);
const ClientsIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 13a4 4 0 1 1 4-4" /><path d="M4 21v-1.5A4.5 4.5 0 0 1 8.5 15h0" />
        <circle cx="16" cy="9" r="3" /><path d="M12 21v-1.5A4.5 4.5 0 0 1 16.5 15H17" />
    </svg>
);
const YearsIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="4.5" width="17" height="16" rx="2" />
        <path d="M8 3v3" /><path d="M16 3v3" /><path d="M3.5 9.5h17" /><path d="M9 14.5h3l-2 3h3" />
    </svg>
);
const SatisfactionIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" /><path d="M9 10h.01" /><path d="M15 10h.01" />
        <path d="M9 15c.7 1 1.8 1.6 3 1.6s2.3-.6 3-1.6" />
    </svg>
);

// ============================================
// PROJECT CARD COMPONENT
// ============================================

function ProjectCard({ project, theme, index }: { project: PortfolioProject; theme: CategoryTheme; index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 80, rotateX: -15 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.15, type: "spring", stiffness: 100 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group perspective-1000"
        >
            <motion.div
                animate={{ rotateY: isHovered ? 5 : 0, rotateX: isHovered ? -5 : 0, scale: isHovered ? 1.02 : 1 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-black/5 shadow-2xl"
                style={{ boxShadow: isHovered ? `0 25px 50px -12px ${theme.glow}` : "none" }}
            >
                <div className="relative h-64 overflow-hidden">
                    <motion.div
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
                    >
                        <div className="relative w-40 h-40">
                            <img src={project.image} alt={project.title} className="w-full h-full object-contain drop-shadow-2xl" />
                        </div>
                    </motion.div>
                    <motion.div animate={{ opacity: isHovered ? 1 : 0 }} className={`absolute inset-0 bg-gradient-to-t ${theme.gradient} opacity-30`} />
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-black/50 backdrop-blur-md ${theme.textColor} border border-white/10`}>
                            {project.subcategory}
                        </span>
                    </div>
                </div>
                <div className="p-6">
                    <motion.h3
                        animate={{ color: isHovered ? theme.accent : "#4a5565" }}
                        className="text-xl font-bold text-gray-600 mb-2"
                    >
                        {project.title}
                    </motion.h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase tracking-wider">View Project</span>
                        <motion.div animate={{ x: isHovered ? 5 : 0 }} className={`flex items-center gap-2 ${theme.textColor}`}>
                            <span className="text-sm font-medium">Explore</span>
                            <motion.svg animate={{ x: isHovered ? 3 : 0 }} className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </motion.svg>
                        </motion.div>
                    </div>
                </div>
                <motion.div
                    animate={{ background: isHovered ? `linear-gradient(90deg, ${theme.accent}, transparent, ${theme.accent})` : "transparent" }}
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                />
            </motion.div>
        </motion.div>
    );
}

// ============================================
// PROJECTS GRID SECTION — per-category header
// ============================================

function ProjectsGrid({ theme, projects }: { theme: CategoryTheme; projects: PortfolioProject[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <div ref={containerRef} className="relative py-32 overflow-hidden">
            <motion.div style={{ y: backgroundY }} className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100" />
                <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 50% 50%, ${theme.accent}20, transparent 70%)` }} />
            </motion.div>

            <div className="container mx-auto px-4">
                {/* Per-category header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className={`text-sm uppercase tracking-[0.3em] ${theme.textColor} mb-4 block`}>
                        {theme.eyebrow}
                    </span>
                    <h3 className="text-4xl md:text-5xl font-bold text-gray-700 mb-4">
                        {theme.heading}
                    </h3>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        {theme.subheading}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} theme={theme} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

// ============================================
// MAIN PORTFOLIO COMPONENT
// ============================================

export default function Portfolio() {
    const [activeSection, setActiveSection] = useState(-1);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    const categories: { theme: CategoryTheme; icon: React.ComponentType<{ className?: string }>; projects: PortfolioProject[] }[] = [
        { theme: categoryThemes["Website/App Development"], icon: CodeIcon, projects: portfolioProjects.filter((p) => p.category === "Website/App Development") },
        { theme: categoryThemes["Graphic Design"], icon: DesignIcon, projects: portfolioProjects.filter((p) => p.category === "Graphic Design") },
        { theme: categoryThemes["Technical Support"], icon: SupportIcon, projects: portfolioProjects.filter((p) => p.category === "Technical Support") },
        { theme: categoryThemes["Marketing"], icon: MarketingIcon, projects: portfolioProjects.filter((p) => p.category === "Marketing") },
    ];

    useEffect(() => {
        // 1. Hide/show nav based on hero visibility
        const heroObserver = new IntersectionObserver(
            ([entry]) => {
                // nav becomes visible the moment hero scrolls out of view
                setActiveSection(entry.isIntersecting ? -1 : 0);
            },
            { threshold: 0 }
        );

        const hero = document.getElementById("hero-section");
        if (hero) heroObserver.observe(hero);

        // 2. Track active category pill via 50vh trigger line
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute("data-section-index"));
                        setActiveSection(index);
                    }
                });
            },
            { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
        );

        categories.forEach((_, i) => {
            const el = document.getElementById(`section-${i}`);
            if (el) sectionObserver.observe(el);
        });

        return () => {
            heroObserver.disconnect();
            sectionObserver.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div ref={mainRef} className="relative bg-white min-h-screen">

            {/* Desktop: right sidebar nav pills */}
            <AnimatePresence>
                {activeSection >= 0 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2"
                    >
                        {categories.map((cat, index) => (
                            <motion.button
                                key={cat.theme.name}
                                onClick={() => document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: "smooth" })}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                                    activeSection === index
                                        ? `bg-gradient-to-r ${cat.theme.gradient} text-white shadow-md`
                                        : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white/80 backdrop-blur-sm border border-white/10"
                                }`}
                                whileHover={{ scale: 1.05, x: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {cat.theme.name}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile: bottom pill strip */}
            <AnimatePresence>
                {activeSection >= 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 lg:hidden"
                    >
                        <div
                            className="flex gap-2 px-3 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-lg max-w-[90vw]"
                            style={{ overflowX: "auto", scrollbarWidth: "none" } as React.CSSProperties}
                        >
                            {categories.map((cat, index) => (
                                <motion.button
                                    key={cat.theme.name}
                                    onClick={() => document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: "smooth" })}
                                    className={`flex-shrink-0 px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all duration-300 ${
                                        activeSection === index
                                            ? `bg-gradient-to-r ${cat.theme.gradient} text-white`
                                            : "text-white/50 hover:text-white/80"
                                    }`}
                                    whileTap={{ scale: 0.92 }}
                                >
                                    {cat.theme.name}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Hero */}
            <section id="hero-section" className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100" />
                    <div className="absolute inset-0 opacity-30">
                        <div className="w-full h-full" style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)`,
                        }} />
                    </div>
                </div>

                <div className="relative z-10 text-center px-4">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <span className="text-[var(--autisync-gold,#b98b2f)] text-sm uppercase tracking-[0.4em] mb-6 block">
                            Creative Digital Agency
                        </span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                               className="text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900 mb-8"
                    >
                        <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-[var(--autisync-gold,#b98b2f)] bg-clip-text text-transparent">
                            AUTISYNC
                        </span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                              className="text-lg text-gray-500 max-w-lg mx-auto mb-6"
                    >
                        Where creativity meets technology. We craft digital experiences that leave lasting impressions.
                    </motion.p>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex gap-4 justify-center">
                        <motion.a
                            href="#section-0"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 text-white bg-[var(--autisync-gold,#b98b2f)] rounded-md shadow-lg hover:bg-[#1C1C1C] transition-all"
                        >
                            Explore Our Work
                        </motion.a>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                            className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
                                className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
                    >
                        <motion.div animate={{ opacity: [1, 0, 1], y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }}
                                    className="w-1.5 h-1.5 rounded-full bg-white/50"
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* Category Sections */}
            {categories.map((category, index) => (
                <div key={category.theme.name} id={`section-${index}`} data-section-index={index}>
                    <ProjectsGrid theme={category.theme} projects={category.projects} />
                </div>
            ))}

            {/* Our Achievements Section */}
            <div className="flex flex-wrap items-center mt-32">
                <div className="w-full px-4 mx-auto text-center">
                    <div className="flex justify-center mb-4">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-[0_12px_25px_rgba(0,0,0,0.12)]">
                            <TrophyIcon className="w-7 h-7 text-[var(--autisync-gold,#b98b2f)]" />
                        </div>
                    </div>
                    <h3 className="mb-3 text-3xl font-semibold leading-normal text-gray-800">Our Achievements</h3>
                    <p className="mb-10 text-base text-gray-500 max-w-2xl mx-auto">
                        Numbers that reflect the trust our partners place in us and the work we deliver across every project.
                    </p>
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        <AchievementStat icon={<ProjectsIcon className="w-5 h-5" />} label="Projects Launched" value={50} suffix="+" delay={0} />
                        <AchievementStat icon={<ClientsIcon className="w-5 h-5" />} label="Happy Clients" value={30} suffix="+" delay={0.1} />
                        <AchievementStat icon={<YearsIcon className="w-5 h-5" />} label="Years Building Digital" value={5} suffix="+" delay={0.2} />
                        <AchievementStat icon={<SatisfactionIcon className="w-5 h-5" />} label="Client Satisfaction" value={98} suffix="%" delay={0.3} />
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <section className="relative py-32 mt-12 overflow-hidden">
                <div className="container mx-auto px-4 relative text-center">
                    <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                               className="text-4xl md:text-5xl font-bold text-gray-700 mb-2"
                    >
                        Ready to Start Your Project?
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                              className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
                    >
                        Let&apos;s collaborate and turn your next idea into a flagship digital experience
                    </motion.p>
                    <motion.a
                        href="https://wa.me/+447883317646"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-6 py-2 text-white bg-[var(--autisync-gold,#b98b2f)] rounded-md shadow-lg hover:bg-[#1C1C1C] transition-all"
                    >
                        Get In Touch
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.a>
                </div>
            </section>

            {/* Preview Modal */}
            <AnimatePresence>
                {previewUrl && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
                        onClick={() => setPreviewUrl(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-6xl h-[80vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setPreviewUrl(null)}
                                    className="absolute right-4 top-4 z-10 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
                            >
                                &times;
                            </button>
                            <iframe src={previewUrl} title="Project preview" className="w-full h-full border-0" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}