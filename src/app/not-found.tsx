"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// ─────────────────────────────────────────────
// EASING
// ─────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─────────────────────────────────────────────
// QUICK LINKS
// ─────────────────────────────────────────────
const links = [
    { label: "Home",      href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Services",  href: "/solutions/graphicDesign" },
    { label: "Contact",   href: "/contact" },
];

// ─────────────────────────────────────────────
// ANIMATED NOISE CANVAS
// Renders a subtle film-grain overlay that shifts
// every frame for a live static / signal-loss effect.
// ─────────────────────────────────────────────
function NoiseCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useAnimationFrame(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        const imageData = ctx.createImageData(w, h);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const v = Math.random() * 255;
            data[i]     = v;
            data[i + 1] = v;
            data[i + 2] = v;
            data[i + 3] = Math.random() * 18; // very subtle alpha
        }
        ctx.putImageData(imageData, 0, 0);
    });

    return (
        <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="pointer-events-none absolute inset-0 w-full h-full opacity-40"
            aria-hidden
        />
    );
}

// ─────────────────────────────────────────────
// GLITCH TEXT — flickers a character off-register
// ─────────────────────────────────────────────
function GlitchChar({ char, delay = 0 }: { char: string; delay?: number }) {
    const [glitching, setGlitching] = useState(false);

    useEffect(() => {
        const schedule = () => {
            const wait = delay + Math.random() * 4000 + 1500;
            const t = setTimeout(() => {
                setGlitching(true);
                setTimeout(() => { setGlitching(false); schedule(); }, 160);
            }, wait);
            return t;
        };
        const t = schedule();
        return () => clearTimeout(t);
    }, [delay]);

    return (
        <span className="relative inline-block select-none">
      {/* Original character */}
            <span
                className="relative z-10"
                style={{
                    transform: glitching ? `translate(${(Math.random() - 0.5) * 6}px, ${(Math.random() - 0.5) * 4}px)` : "none",
                    transition: glitching ? "none" : "transform 0.08s",
                }}
            >
        {char}
      </span>

            {/* Chromatic aberration ghost — cyan */}
            {glitching && (
                <span
                    aria-hidden
                    className="absolute inset-0 text-cyan-400/40 z-0"
                    style={{ transform: "translate(-3px, 1px)", mixBlendMode: "screen" }}
                >
          {char}
        </span>
            )}

            {/* Chromatic aberration ghost — red */}
            {glitching && (
                <span
                    aria-hidden
                    className="absolute inset-0 text-red-400/40 z-0"
                    style={{ transform: "translate(3px, -1px)", mixBlendMode: "screen" }}
                >
          {char}
        </span>
            )}
    </span>
    );
}

// ─────────────────────────────────────────────
// SCANLINE OVERLAY
// ─────────────────────────────────────────────
function Scanlines() {
    return (
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10"
            style={{
                backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
                backgroundSize: "100% 4px",
            }}
        />
    );
}

// ─────────────────────────────────────────────
// ANIMATED GOLD LINE
// ─────────────────────────────────────────────
function GoldLine() {
    return (
        <div className="relative h-px w-full overflow-hidden">
            <motion.div
                className="absolute inset-y-0 left-0 h-full"
                style={{ background: "linear-gradient(to right, transparent, #b98b2f, #d1a94c, #b98b2f, transparent)" }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
            />
            {/* Static dim base line */}
            <div className="absolute inset-0 bg-white/10" />
        </div>
    );
}

// ─────────────────────────────────────────────
// 404 PAGE
// ─────────────────────────────────────────────
export default function NotFound() {
    return (
        <div
            className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
            style={{ backgroundColor: "#111111" }}
        >
            {/* ── Background layers ── */}

            {/* Radial gold glow — very subtle */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(185,139,47,0.07) 0%, transparent 70%)",
                }}
            />

            {/* Grid lines */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            {/* Film grain */}
            <NoiseCanvas />

            {/* Scanlines */}
            <Scanlines />

            {/* ── Content ── */}
            <div className="relative z-20 flex flex-col items-center px-6 text-center">

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="mb-16"
                >
                    <Link href="/">
                        <Image
                            src="/AutisyncW.svg"
                            alt="Autisync"
                            width={140}
                            height={40}
                            className="w-auto h-7 mt-4 opacity-80 hover:opacity-100 transition-opacity duration-300"
                            priority
                        />
                    </Link>
                </motion.div>

                {/* ── 404 numeral ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                    className="relative"
                >
                    {/* Blurred glow behind the number */}
                    <div
                        aria-hidden
                        className="absolute inset-0 blur-3xl opacity-20 scale-110"
                        style={{ color: "#b98b2f" }}
                    >
            <span
                className="block text-[clamp(140px,26vw,280px)] font-black leading-none tracking-tighter"
                style={{ color: "#b98b2f", fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              404
            </span>
                    </div>

                    {/* Actual glitch number */}
                    <div
                        className="relative flex items-baseline leading-none tracking-tighter"
                        style={{
                            fontSize: "clamp(140px, 26vw, 280px)",
                            fontFamily: "Georgia, 'Times New Roman', serif",
                            fontWeight: 900,
                            color: "#f5f4f0",
                            letterSpacing: "-0.04em",
                        }}
                        aria-label="404"
                    >
                        <GlitchChar char="4" delay={0} />
                        <GlitchChar char="0" delay={600} />
                        <GlitchChar char="4" delay={1200} />
                    </div>
                </motion.div>

                {/* Gold line */}
                <motion.div
                    className="w-full max-w-xs mt-6 mb-8"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
                    style={{ transformOrigin: "center" }}
                >
                    <GoldLine />
                </motion.div>

                {/* Eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
                    className="text-[11px] uppercase tracking-[0.35em] text-[#b98b2f] mb-4 font-medium"
                >
                    Signal Lost
                </motion.p>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.52, ease: EASE }}
                    className="text-2xl sm:text-3xl font-semibold text-white/90 mb-3 leading-snug"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                    This page doesn't exist
                </motion.h1>

                {/* Sub-copy */}
                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.6, ease: EASE }}
                    className="text-sm text-white/40 max-w-xs leading-relaxed mb-12"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                    The URL may have changed, moved, or never existed.
                    Let us point you somewhere that does.
                </motion.p>

                {/* Navigation chips */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.68, ease: EASE }}
                    className="flex flex-wrap justify-center gap-2.5 mb-10"
                >
                    {links.map(({ label, href }) => (
                        <Link
                            key={label}
                            href={href}
                            className="group px-5 py-2.5 rounded-full border border-white/10 text-sm font-medium text-white/60
                hover:border-[#b98b2f]/60 hover:text-[#d1a94c] hover:bg-[#b98b2f]/08
                transition-all duration-200 backdrop-blur-sm"
                        >
                            {label}
                        </Link>
                    ))}
                </motion.div>

                {/* Primary CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.76, ease: EASE }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-semibold text-[#111111]
              transition-all duration-200 active:scale-95"
                        style={{
                            background: "linear-gradient(135deg, #d1a94c, #b98b2f)",
                            boxShadow: "0 4px 24px rgba(185,139,47,0.30)",
                        }}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Autisync
                    </Link>
                </motion.div>

                {/* Footer note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
                    className="mt-16 text-[10px] uppercase tracking-[0.3em] text-white/15"
                >
                    Autisync · Creative Digital Agency
                </motion.p>
            </div>
        </div>
    );
}