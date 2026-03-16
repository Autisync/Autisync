"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const logoPaths = [
    {
        d: "M406.53,63.79l3.17,1.06,14.74,26.34,10.54,17.91,15.81,27.38,14.74,25.28,15.81,27.38,29.48,50.56,31.61,54.79,7.37,12.64-2.1,2.1-45.29,7.37-34.75,7.37h-2.1l-10.54-17.91-31.61-54.79-15.81-26.34-8.44,13.7-15.81,27.38-14.74,25.28-15.81,27.38-14.74,25.28-9.47,15.81-4.2,3.17-45.29,15.81-34.75,13.7-27.38,11.57-8.44,3.17,2.1-5.27,13.7-24.24,14.74-25.28,15.81-27.38,14.74-25.28,31.61-54.79,14.74-25.28,31.61-54.79,14.74-25.28,15.81-27.38,14.74-25.28,13.7-23.18-.06.03Z",
        fill: "#1d1e1e",
        delay: 0,
    },
    {
        d: "M547.69,252.38l6.33,2.1,94.81,42.15,42.15,18.97,43.19,18.97,42.15,18.97,37.92,16.84,16.84,7.37v1.07l-12.64-1.07-42.15-4.2-31.61-2.1-24.24-1.07h-88.48l-44.25,2.1-51.62,4.2-58.99,7.37-47.39,7.37-68.47,13.7-58.99,14.74-54.79,15.81-45.29,14.74-48.46,17.91-29.48,11.57-34.75,14.74-30.55,13.7-24.24,11.57-23.18,11.57-2.1-1.07,15.81-10.54,18.97-11.57,26.34-15.81,26.34-14.74,23.18-12.64,58.99-29.48,30.55-13.7,29.48-12.64,37.92-14.74,31.61-11.57,43.19-14.74,38.98-11.57,63.2-15.81,50.56-10.54,45.29-7.37,43.19-5.27v-2.1l-12.64-17.91-29.48-40.02-3.17-5.27-.03-.03Z",
        fill: "#b98f3e",
        delay: 0.12,
    },
    {
        d: "M591.95,386.14l4.2,1.07,14.74,25.28,63.2,109.55,4.2,8.44h-92.71l-8.44-13.7-15.81-27.38-14.74-25.28-31.61-54.79-7.37-12.64v-2.1l25.28-3.17,58.99-5.27h.06Z",
        fill: "#1d1e1e",
        delay: 0.22,
    },
    {
        d: "M275.9,442h4.2l-2.1,5.27-11.57,21.08-9.47,15.81-15.81,27.38-10.54,17.91-1.06,1.07h-92.71l7.37-14.74,14.74-25.28,6.33-11.57,40.02-14.74,48.46-15.81,22.11-6.33.03-.03Z",
        fill: "#1d1e1e",
        delay: 0.3,
    },
];

function AnimatedPath({ d, fill, delay }: { d: string; fill: string; delay: number }) {
    return (
        <motion.path
            d={d}
            fill={fill}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "center" }}
        />
    );
}

function PageLoader() {
    return (
        <motion.div
            key="page-loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f4f0",
                pointerEvents: "all",
            }}
        >
            {/* Gold top bar */}
            <motion.div
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "linear-gradient(to right, #7a5a1d, #d1a94c, #7a5a1d)",
                }}
            />

            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ position: "relative", width: 96, height: 68 }}
            >
                <svg viewBox="0 0 841.89 595.28" width="96" height="68">
                    {logoPaths.map((p, i) => (
                        <AnimatedPath key={i} d={p.d} fill={p.fill} delay={p.delay} />
                    ))}
                </svg>

                {/* Glow pulse */}
                <motion.div
                    animate={{ opacity: [0.15, 0.4, 0.15], scale: [0.9, 1.2, 0.9] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: -1,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, #b98f3e44 0%, transparent 70%)",
                    }}
                />
            </motion.div>

            {/* Wordmark */}
            <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.35, ease: "easeOut" }}
                style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: "0.35em",
                    color: "#1d1e1e",
                    marginTop: 10,
                }}
            >
                AUTISYNC
            </motion.p>

            {/* Bottom progress bar — animates from 0 to 85% then waits */}
            <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "85%" }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: 2,
                    background: "linear-gradient(to right, #7a5a1d, #d1a94c)",
                }}
            />
        </motion.div>
    );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export default function PageTransitionProvider({
                                                   children,
                                               }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const prevPathRef = useRef(pathname);
    // Minimum display time so the animation doesn't flash for <200ms
    const MIN_DISPLAY_MS = 600;
    const startTimeRef = useRef<number>(0);

    // Step 1 — show loader when pathname changes
    useEffect(() => {
        if (pathname !== prevPathRef.current) {
            prevPathRef.current = pathname;
            startTimeRef.current = Date.now();
            setLoading(true);
        }
    }, [pathname]);

    // Step 2 — hide loader once children have painted (next frame after mount)
    // We use a layout effect on the children wrapper via a sentinel component.
    // The sentinel calls onReady after the first paint of the new route.
    const handlePageReady = () => {
        if (!loading) return;
        const elapsed = Date.now() - startTimeRef.current;
        const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
        setTimeout(() => setLoading(false), remaining);
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {loading && <PageLoader key={`loader-${pathname}`} />}
            </AnimatePresence>

            <PageContent onReady={handlePageReady} loading={loading}>
                {children}
            </PageContent>
        </>
    );
}

// ─── PageContent — fires onReady after the new route paints ──────────────────

function PageContent({
                         children,
                         onReady,
                         loading,
                     }: {
    children: React.ReactNode;
    onReady: () => void;
    loading: boolean;
}) {
    const pathname = usePathname();

    useEffect(() => {
        // requestAnimationFrame ensures the DOM has painted before we dismiss
        const raf = requestAnimationFrame(() => {
            onReady();
        });
        return () => cancelAnimationFrame(raf);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: loading ? 0 : 1, y: loading ? 6 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}