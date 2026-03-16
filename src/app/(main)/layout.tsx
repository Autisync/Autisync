import PageTransitionProvider from "@/app/components/PageTransitionProvider";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import React from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <PageTransitionProvider>
                {children}
            </PageTransitionProvider>
            <Footer />
        </>
    );
}