import PageTransitionProvider from "@/app/components/PageTransitionProvider";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SiteMotion from "@/app/components/SiteMotion";
import React from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header>
                <Navbar />
            </header>
            {/* One <main> landmark for every page in this layout (pages use
                <div> for their own wrapper, so there is never a second one). */}
            <main id="main">
                <PageTransitionProvider>
                    {children}
                </PageTransitionProvider>
            </main>
            <Footer />
            <SiteMotion />
        </>
    );
}