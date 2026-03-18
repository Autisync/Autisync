"use client";
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
    url: string;
    color: string;
    industry: string;
    tech: string[];
    location: string;
    year: string;
    services: string[];
    // Graphic design projects use a gallery instead of iframe
    designGallery?: {
        images: string[];       // mockup/snapshot URLs (Unsplash/Pexels placeholders)
        highlights: string[];   // key design decisions shown as bullets
        deliverables: string[]; // what was delivered
        nda?: boolean;          // flag to suppress client name in UI
    };
}

interface CategoryTheme {
    name: CategoryType;
    gradient: string;
    accent: string;
    glow: string;
    textColor: string;
    bgColor: string;
    particleColor: string;
    eyebrow: string;
    heading: string;
    subheading: string;
}

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
        description: "Enterprise corporate website with a modern, visionary aesthetic. Clean architecture and bold typography that positions the brand as a forward-thinking leader.",
        url: "https://www.9thvision.com/",
        color: "#6366F1",
        industry: "Corporate / Business",
        tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
        location: "International",
        year: "2024",
        services: ["Web Design", "Web Development", "Brand Alignment"],
    },
    {
        id: 2,
        title: "Florentek Engineering",
        category: "Website/App Development",
        subcategory: "Corporate Website",
        image: "/logos/florentekw.png",
        description: "Industrial engineering firm website covering instrumentation, electrical systems, maintenance services, and specialised manpower — built to instil trust with B2B clients.",
        url: "https://www.florentek.co.ao/",
        color: "#6366F1",
        industry: "Engineering & Industrial",
        tech: ["Next.js", "Tailwind CSS"],
        location: "Angola",
        year: "2024",
        services: ["Web Design", "Web Development", "Content Strategy"],
    },
    {
        id: 3,
        title: "Mavunzuka & Filhos",
        category: "Website/App Development",
        subcategory: "Corporate Website",
        image: "/logos/mavunzukawhite.svg",
        description: "Road safety specialist website for Angola's leading vehicle identification company — licence plates, safety films, and public sector partnerships presented with authority.",
        url: "https://www.mavunzuka.co.ao/",
        color: "#6366F1",
        industry: "Road Safety / Government",
        tech: ["Next.js", "Tailwind CSS"],
        location: "Angola",
        year: "2024",
        services: ["Web Design", "Web Development", "Multilingual Support"],
    },
    {
        id: 4,
        title: "Salustra Group",
        category: "Website/App Development",
        subcategory: "Corporate Website",
        image: "/logos/Globus.svg",
        description: "Multi-entity corporate portal for the Salustra group, directing visitors across three independent business lines — asset management, facilities management, and oil & gas.",
        url: "https://www.globus.co.ao/",
        color: "#6366F1",
        industry: "Oil & Gas / Asset Management",
        tech: ["Next.js", "Tailwind CSS"],
        location: "Angola",
        year: "2024",
        services: ["Web Design", "Web Development", "Information Architecture"],
    },
    {
        id: 5,
        title: "Grupo Girassol",
        category: "Website/App Development",
        subcategory: "Corporate Website",
        image: "/logos/Girassolw.svg",
        description: "Construction and services group website built to showcase the company's project portfolio, capabilities, and team — conveying quality and scale in Angola's construction market.",
        url: "https://www.grupogirassol.co.ao/",
        color: "#6366F1",
        industry: "Construction & Services",
        tech: ["Next.js", "Tailwind CSS"],
        location: "Angola",
        year: "2024",
        services: ["Web Design", "Web Development"],
    },
    {
        id: 6,
        title: "Segucyber",
        category: "Website/App Development",
        subcategory: "Cybersecurity Website",
        image: "/logos/Segucyber.svg",
        description: "Cybersecurity solutions website built to communicate trust, technical authority, and reliability. Dark aesthetic with clear service messaging tailored to enterprise clients.",
        url: "https://www.segucyber.ao/",
        color: "#6366F1",
        industry: "Cybersecurity",
        tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
        location: "Angola",
        year: "2024",
        services: ["Web Design", "Web Development", "UX Strategy"],
    },
    // {
    //     id: 7,
    //     title: "ParVaga",
    //     category: "Website/App Development",
    //     subcategory: "Web App",
    //     image: "/logos/parvaga.svg",
    //     description: "Angolan job recruitment platform connecting candidates and companies. Features CV submission, job listings, and a dedicated employer portal with user authentication.",
    //     url: "https://parvagas.vercel.app/",
    //     color: "#6366F1",
    //     industry: "Recruitment / HR Tech",
    //     tech: ["Next.js", "Tailwind CSS", "Authentication"],
    //     location: "Angola",
    //     year: "2024",
    //     services: ["Web App Development", "UI/UX Design", "Portal Development"],
    // },
    {
        id: 8,
        title: "Your Pharmacy",
        category: "Website/App Development",
        subcategory: "Web App",
        image: "/logos/YourP.png",
        description: "Pharmacy management web app providing customers with a seamless digital experience for browsing, ordering, and managing pharmaceutical needs online.",
        url: "https://your-pharm.vercel.app/",
        color: "#6366F1",
        industry: "Healthcare / Pharmacy",
        tech: ["Next.js", "Tailwind CSS", "React"],
        location: "International",
        year: "2023",
        services: ["Web App Development", "UI/UX Design"],
    },
    {
        id: 9,
        title: "Blue Horizon",
        category: "Website/App Development",
        subcategory: "Corporate Website",
        image: "/logos/bluewhite.png",
        description: "Bilingual corporate website (Portuguese & English) with a refined, international aesthetic — built for a company operating across Angola and the UK.",
        url: "https://blueh.vercel.app/",
        color: "#6366F1",
        industry: "Corporate / Investment",
        tech: ["Next.js", "Tailwind CSS", "i18n"],
        location: "Angola / UK",
        year: "2024",
        services: ["Web Design", "Web Development", "Multilingual Support"],
    },
    {
        id: 10,
        title: "Evolution Technologies",
        category: "Website/App Development",
        subcategory: "Corporate Website",
        image: "https://www.evolutiontec.co.ao/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.fb975d65.png&w=256&q=75",
        description: "Network solutions and telecommunications company website showcasing infrastructure services, antenna systems, and technology consulting in the Angolan market.",
        url: "https://www.evolutiontec.co.ao/",
        color: "#6366F1",
        industry: "Telecommunications / IT",
        tech: ["Next.js", "Tailwind CSS"],
        location: "Angola",
        year: "2024",
        services: ["Web Design", "Web Development"],
    },
    {
        id: 11,
        title: "Shivali Investments",
        category: "Website/App Development",
        subcategory: "Corporate Website",
        image: "https://www.shivaliinvestments.com/_next/image?url=%2Fassets%2Fimages%2Flogo.png&w=256&q=75",
        description: "Investment and consulting firm website with a professional, trust-first design — covering services, client portfolio, partner relationships, and contact channels.",
        url: "https://www.shivaliinvestments.com/",
        color: "#6366F1",
        industry: "Investment & Consulting",
        tech: ["Next.js", "Tailwind CSS"],
        location: "International",
        year: "2024",
        services: ["Web Design", "Web Development", "Brand Alignment"],
    },
    {
        id: 12,
        title: "Tchary Glamour",
        category: "Website/App Development",
        subcategory: "E-commerce Website",
        image: "https://tcharyglamour.netlify.app/Imagem%20png%20-%20Tchary%20Glamour%20.png",
        description: "Luxury beauty salon website for one of Luanda's top glamour studios — covering makeup, wig application and confection, braids, and more. Bilingual landing page with portfolio and contact sections.",
        url: "https://tcharyglamour.netlify.app/",
        color: "#6366F1",
        industry: "Beauty & Wellness",
        tech: ["HTML", "CSS", "JavaScript"],
        location: "Angola",
        year: "2023",
        services: ["Web Design", "Web Development", "Brand Identity"],
    },
    {
        id: 13,
        title: "BoG Pro Max",
        category: "Website/App Development",
        subcategory: "Web App",
        image: "/logos/bogpromax.svg",
        description: "Fantasy Premier League competition platform for Namibia — weekly gameweek codes, team registration, payment instructions, and a WhatsApp-integrated request system for a growing FPL community.",
        url: "https://bogpromax.netlify.app/",
        color: "#6366F1",
        industry: "Sports & Gaming",
        tech: ["HTML", "CSS", "JavaScript"],
        location: "Namibia",
        year: "2024",
        services: ["Web Design", "Web Development"],
    },
    // ── Graphic Design ──────────────────────────────────────────────────
    {
        id: 14,
        title: "Florentek Engineering",
        category: "Graphic Design",
        subcategory: "Brand Identity",
        image: "/logos/florentekw.png",
        description: "Full brand identity system for an industrial engineering firm — logo system with 7 variations, colour palette, typography, and complete stationery suite including business cards, letterhead, envelopes, folders, and branded flyers.",
        url: "",
        color: "#EC4899",
        industry: "Engineering & Industrial",
        tech: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign"],
        location: "Angola",
        year: "2024",
        services: ["Logo Design", "Brand Guidelines", "Stationery Design", "Print Collateral"],
        designGallery: {
            images: [
                "/logos/Florentek/1.png",
                "/logos/Florentek/2.png",
                "/logos/Florentek/3.png",
            ],
            highlights: [
                "Distinctive 'F' mark of three stacked bars — symbolises engineering precision and forward momentum",
                "Primary palette: Observatory teal (#008A6D), Charcoal Gray (#303034), Pure White — eco-innovation driven",
                "Three typefaces: Retroica Bold (headlines), Codec Cold (body), Comfortaa (UI) — modern yet approachable",
                "6 logo variants: light bg, dark bg, B&W, app icon, banner, and vertical — full production flexibility",
                "Stationery suite: A4 letterhead, DL flyer, C4 envelope, stationery folder, and business cards",
            ],
            deliverables: ["Primary & secondary logos (SVG/PNG/PDF)", "Brand guidelines PDF", "Business card", "A4 letterhead", "DL flyer", "Stationery envelope & folder", "Social media kit"],
            nda: false,
        },
    },
    {
        id: 15,
        title: "Grupo Girassol",
        category: "Graphic Design",
        subcategory: "Brand Identity & Merchandise",
        image: "/logos/Girassolw.svg",
        description: "Complete brand identity and print/merchandise programme for an Angolan automotive services group — logo system, brand guidelines, and branded items spanning mugs, calendars, hard hats, lanyards, file binders, and roll-up banners.",
        url: "",
        color: "#EC4899",
        industry: "Automotive Services",
        tech: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign"],
        location: "Angola",
        year: "2025",
        services: ["Logo Design", "Brand Guidelines", "Merchandise Design", "Print & Signage"],
        designGallery: {
            images: [
                "/logos/Girassol/1.png",
                "/logos/Girassol/2.png",
                "/logos/Girassol/3.png",
            ],
            highlights: [
                "Sunflower motif — warm gold and lime-green rings reflect the brand name and radiate energy and trust",
                "4-colour palette: Dourado Primário (#E8A341), Dourado Secundário (#F0C43E), Verde-Amarelo (#B2C74B), Cinza-Azulado (#2D3238)",
                "Source Sans Variable (Semibold / Regular / Light) — clean and highly legible at all sizes",
                "Logo usage guide covering contrast rules, rotation permissions, and 3D prohibition",
                "Extensive merchandise: mugs, travel cups, hard hats, desk & wall calendar 2025, lanyards, USB drives, file binders, and event roll-ups",
            ],
            deliverables: ["Brand identity system & guidelines", "Full merchandise mockup set", "Desk & wall calendar 2025", "Roll-up banner & event folder", "Hard hat & safety vest decals", "USB drive & lanyard branding"],
            nda: false,
        },
    },
    {
        id: 16,
        title: "Mavunzuka & Filhos",
        category: "Graphic Design",
        subcategory: "Brand Identity",
        image: "/logos/mavunzukawhite.svg",
        description: "Corporate brand identity for a road-safety and vehicle identification company — bold hexagonal logo mark, dark navy colour system, full stationery suite, vehicle wrap design, and branded merchandise.",
        url: "",
        color: "#EC4899",
        industry: "Road Safety / Government",
        tech: ["Adobe Illustrator", "Adobe Photoshop"],
        location: "Angola",
        year: "2025",
        services: ["Logo Design", "Brand Guidelines", "Vehicle Wrap", "Stationery & Merchandise"],
        designGallery: {
            images: [
                "/logos/Mavunzuka/1.png",
                "/logos/Mavunzuka/2.png",
                "/logos/Mavunzuka/3.png",
            ],
            highlights: [
                "Hexagonal icon with stylised 'M' peak — authority, road infrastructure, and structural strength",
                "Ebony Clay navy (#1e263e) primary, Deep Gray (#222526) secondary — timeless, high-contrast corporate identity",
                "Montserrat across all weights — bold for impact, regular for body copy",
                "Vehicle wrap for full fleet branding with service list on rear quarter panel",
                "Full stationery: company letter, file holder, envelope, double-sided business cards, display screen, and mug set",
            ],
            deliverables: ["Logo system & brand style guide v1.0", "Business card & letterhead", "Vehicle wrap design", "Mousepad & mug set", "Exhibition display assets", "Brand guidelines PDF (2025)"],
            nda: false,
        },
    },
    {
        id: 17,
        title: "Blue Horizon",
        category: "Graphic Design",
        subcategory: "Brand Identity",
        image: "/logos/bluewhite.png",
        description: "Brand identity for an Angolan Oil & Gas services company — concentric eclipse logo, deep navy palette, bilingual stationery, and full corporate collateral including hard hats, safety vests, and a 10×10 exhibition stand.",
        url: "",
        color: "#EC4899",
        industry: "Oil & Gas",
        tech: ["Adobe Illustrator", "Adobe InDesign", "Adobe Photoshop"],
        location: "Angola / UK",
        year: "2023",
        services: ["Logo Design", "Brand Guidelines", "Corporate Collateral", "Exhibition Design"],
        designGallery: {
            images: [
                "/logos/Blue/1.jpg",
                "/logos/Blue/2.jpg",
                "/logos/Blue/3.png",
                "/logos/Blue/4.png",
            ],
            highlights: [
                "Four concentric eclipses in graduating navy — each arc represents a deeper level of expertise and commitment",
                "5-stop blue palette (#00296b → #5fa8d3) creates depth and technical authority in the O&G sector",
                "MADE Tommy Soft (Medium / Regular / Light) with Poppins fallback — refined and legible in both PT and EN",
                "Complete safety print package: hi-vis vests, hard hats, branded pens, glazed name plaques, and exhibition stand",
                "Bilingual application — all collateral in Portuguese (primary) and English",
            ],
            deliverables: ["Full brand guidelines", "Business cards (bilingual)", "Letterhead & stationery folder", "Hi-vis vest & hard hat graphics", "Exhibition stand (10×10)", "Calendar (desk & wall)", "A-stand & banner"],
            nda: false,
        },
    },
    {
        id: 18,
        title: "Dreamboat Trading",
        category: "Graphic Design",
        subcategory: "Corporate Stationery",
        image: "/logos/logo_white.png",
        description: "Corporate stationery suite for Dreamboat Trading Services, Lda — branded letterhead with ghost watermark, C4 envelope with full-colour navy back panel, and a double-sided staff ID card on lanyard.",
        url: "",
        color: "#EC4899",
        industry: "Trading & Commerce",
        tech: ["Adobe InDesign", "Adobe Illustrator"],
        location: "Angola",
        year: "2024",
        services: ["Letterhead Design", "Envelope Design", "Staff ID Card"],
        designGallery: {
            images: [
                "/logos/Dreamboat/1.png",
                "/logos/Dreamboat/2.png",
            ],
            highlights: [
                "C4 envelope: white face with Dreamboat logo & letterhead insert visible, deep navy body on the back — bold and memorable in the mail",
                "Staff ID card (front): employee name 'Augusto Ventura', role banner 'AMINISTRACAO – BACK OFFICE', circular photo cutout, circular brand graphic motifs, and lanyard hole at top",
                "Staff ID card (back): full company policy text in Portuguese, large QR code for verification, dark navy footer with Sede + Escritórios addresses and +244 923-065-276",
                "A4 letterhead: Dreamboat Trading Services, Lda logo top-left, ghost watermark logo centred on page, complete contact block bottom-left (Tel, E-mail, Sede, Escritórios)",
            ],
            deliverables: ["A4 letterhead (print-ready PDF)", "C4 envelope (front & back)", "Staff ID card (front & back)", "All files in CMYK print-ready format"],
            nda: false,
        },
    },
    {
        id: 19,
        title: "Cave Properties Group",
        category: "Graphic Design",
        subcategory: "Logo Design",
        image: "/logos/cave_white.png",
        description: "Logo design for a Namibian property investment group — bold house-roofline icon with red chimney accents and a sweeping baseline arc, delivered in both dark and light variants for maximum versatility.",
        url: "",
        color: "#EC4899",
        industry: "Real Estate & Property",
        tech: ["Adobe Illustrator"],
        location: "Namibia",
        year: "2024",
        services: ["Logo Design", "Brand Variants"],
        designGallery: {
            images: [
                "/logos/CaveProperties/1.png",
                "/logos/CaveProperties/2.png",
            ],
            highlights: [
                "Three interconnected house rooflines form one unified mark — a portfolio of properties, not a single asset",
                "Red chimney accents on outer houses add warmth and create a memorable sub-element that recurs across collateral",
                "Sweeping baseline arc anchors the icon — stability, a solid foundation in property investment",
                "Dark variant (near-black icon, white type) and light variant (charcoal icon, grey type) — ready for any surface or medium",
                "Letter-spaced uppercase CAVE + italic 'Properties Group' — clear typographic hierarchy",
            ],
            deliverables: ["Primary logo — dark variant", "Secondary logo — light variant", "SVG + PNG + PDF all sizes"],
            nda: false,
        },
    },
    // ── Technical Support ────────────────────────────────────────────────
    {
        id: 20,
        title: "Occucare Medical",
        category: "Technical Support",
        subcategory: "IT Support & Consulting",
        image: "/logos/OCCUCARE.png",
        description: "Ongoing IT support partnership for a healthcare management platform — day-to-day technical support, proactive system maintenance, helpdesk operations, and strategic consultation on network security upgrades to ensure compliance and data integrity across clinical operations.",
        url: "",
        color: "#06B6D4",
        industry: "Healthcare / Medical",
        tech: ["Network Security", "Windows Server", "Helpdesk Systems", "Firewall Configuration"],
        location: "Angola",
        year: "2024",
        services: ["IT Technical Support", "System Maintenance", "Network Security Consulting", "Helpdesk Operations"],
        designGallery: {
            images: [
                "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80",
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
                "https://images.unsplash.com/photo-1584982751601-97dea52b6b50?w=800&q=80",
            ],
            highlights: [
                "End-to-end IT support contract covering hardware, software, and network infrastructure across the clinic",
                "Scheduled and reactive maintenance programme — minimising downtime in a critical healthcare environment",
                "Security audit and consultation on network architecture: firewall rules, access control, and clinical data segmentation",
                "Helpdesk operations ensuring staff could resolve day-to-day tech issues without disrupting patient services",
                "VLAN segmentation advice to isolate clinical systems from general office traffic — reducing the attack surface",
            ],
            deliverables: ["IT support retainer", "System maintenance schedule", "Network security audit", "Firewall configuration plan", "Staff helpdesk setup"],
            nda: true,
        },
    },
    {
        id: 21,
        title: "Passa Studio",
        category: "Technical Support",
        subcategory: "Device Setup & Maintenance",
        image: "/logos/passa.png",
        description: "Full IT setup and ongoing maintenance for a creative studio — printer installation and calibration, workstation builds and OS configuration, and a structured maintenance schedule to keep all devices running at peak performance for client-facing creative work.",
        url: "",
        color: "#06B6D4",
        industry: "Creative Studio / Media",
        tech: ["Windows 10/11", "macOS", "Printer Configuration", "PC Hardware"],
        location: "Angola",
        year: "2024",
        services: ["Printer Setup & Maintenance", "PC Build & Configuration", "Device Maintenance", "On-site IT Support"],
        designGallery: {
            images: [
                "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
                "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
                "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&q=80",
            ],
            highlights: [
                "Printer installation, driver setup, network printing configuration, and colour calibration for professional-grade creative output",
                "Workstation builds tailored to creative workflows — optimised storage, RAM, and display config for design-heavy applications",
                "OS installation, software licensing, and initial security hardening across all studio PCs",
                "Routine maintenance visits: physical cleaning, performance checks, OS/driver updates, and fault diagnosis",
                "Quick-response on-site support to minimise disruption to studio operations and client project deadlines",
            ],
            deliverables: ["Printer setup & calibration", "PC builds & OS configuration", "Software installation & licensing", "Maintenance schedule", "On-site support agreement"],
            nda: false,
        },
    },
    {
        id: 22,
        title: "Omatapalo",
        category: "Technical Support",
        subcategory: "Surveillance & Security Systems",
        image: "https://omatapalo.com/wp-content/uploads/Design-sem-nome-6.png",
        description: "Supply and full deployment of IT surveillance infrastructure for Omatapalo — IP camera systems, network video recorders, structured cabling, and end-to-end configuration delivering reliable 24/7 site monitoring and physical security coverage.",
        url: "",
        color: "#06B6D4",
        industry: "Construction / Infrastructure",
        tech: ["IP CCTV", "NVR Systems", "Structured Cabling", "Network Configuration"],
        location: "Angola",
        year: "2024",
        services: ["Surveillance Equipment Supply", "CCTV Installation", "NVR Configuration", "Infrastructure Cabling"],
        designGallery: {
            images: [
                "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80",
                "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80",
                "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
            ],
            highlights: [
                "Site survey and coverage planning — identifying optimal camera positions for maximum visibility with zero blind spots",
                "Supply of commercial-grade IP cameras rated for both outdoor and indoor environments on an active operations site",
                "NVR (Network Video Recorder) setup with remote viewing — management can monitor the site in real time from any device",
                "Structured cabling installation: clean, durable runs rated for the site environment and future expansion",
                "Full system commissioning and handover — NVR configuration, user account setup, and staff walkthrough training",
            ],
            deliverables: ["Site survey & coverage plan", "IP camera supply & installation", "NVR setup & remote monitoring", "Structured cabling", "System commissioning & staff handover"],
            nda: true,
        },
    },
];

/* ========= Achievements ========= */

interface StatProps { icon: ReactNode; label: string; value: number; suffix?: string; delay?: number; }

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
// PROJECT PREVIEW MODAL
// ============================================

function ProjectModal({
                          project,
                          onClose,
                      }: {
    project: PortfolioProject;
    onClose: () => void;
}) {
    const isIT      = project.category === "Technical Support" && !!project.designGallery;
    const isDesign  = !!project.designGallery && !isIT;
    const hasGallery = !!project.designGallery;

    const [iframeLoading, setIframeLoading] = useState(true);
    const [activeImg, setActiveImg]         = useState(0);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (isDesign && project.designGallery) {
                if (e.key === "ArrowRight") setActiveImg(i => (i + 1) % project.designGallery!.images.length);
                if (e.key === "ArrowLeft")  setActiveImg(i => (i - 1 + project.designGallery!.images.length) % project.designGallery!.images.length);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose, isDesign, project.designGallery]);

    const gallery = project.designGallery;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full max-w-6xl flex flex-col bg-white rounded-2xl overflow-hidden shadow-2xl"
                style={{ maxHeight: "92vh" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Gold top bar */}
                <div className="h-1 w-full flex-shrink-0" style={{ background: "linear-gradient(to right, #7a5a1d, #d1a94c)" }} />

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0">
                    <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xs font-semibold uppercase tracking-widest text-[#b98b2f]">{project.subcategory}</span>
                        <span className="text-gray-300">·</span>
                        <h2 className="text-sm font-semibold text-gray-800 truncate">{project.title}</h2>
                        {isDesign && (
                            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-pink-50 text-pink-600 border border-pink-200">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"/></svg>
                                Brand & Design
                            </span>
                        )}
                        {isIT && (
                            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-cyan-50 text-cyan-600 border border-cyan-200">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>
                                IT Support
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                        {!isDesign && project.url && (
                            <a href={project.url} target="_blank" rel="noopener noreferrer"
                               className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#b98b2f] text-white text-xs font-medium hover:bg-[#7a5a1d] transition-colors"
                               onClick={(e) => e.stopPropagation()}>
                                Open live site
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}
                        <button onClick={onClose}
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all">
                            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ── Body: scrollable ── */}
                <div className="flex-1 overflow-y-auto min-h-0">
                    {hasGallery && gallery ? (
                        /* ── GALLERY / IT SUPPORT MODE ── */
                        <div className="flex flex-col lg:flex-row h-full">

                            {/* Left panel */}
                            {isIT ? (
                                /* ── IT: client logo on styled background ── */
                                <div className="lg:w-2/5 flex-shrink-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden" style={{ minHeight: "320px" }}>
                                    {/* Subtle circuit-grid pattern */}
                                    <div className="absolute inset-0 opacity-10" style={{
                                        backgroundImage: "radial-gradient(circle, #06B6D4 1px, transparent 1px)",
                                        backgroundSize: "28px 28px",
                                    }} />
                                    {/* Glow ring behind logo */}
                                    <div className="absolute w-52 h-52 rounded-full bg-cyan-500/10 blur-3xl" />
                                    {/* Logo */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className="relative z-10 flex flex-col items-center gap-6 px-10"
                                    >
                                        <div className="w-52 h-36 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="max-w-full max-h-full object-contain drop-shadow-2xl"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-white/90 font-semibold text-base">{project.title}</p>
                                            <p className="text-cyan-400/80 text-xs mt-1 uppercase tracking-widest">{project.subcategory}</p>
                                        </div>
                                        {/* IT stats strip */}
                                        <div className="flex gap-3 flex-wrap justify-center">
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px]">
                                                <svg className="w-3 h-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                                {project.location}
                                            </div>
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px]">
                                                <svg className="w-3 h-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                                                {project.year}
                                            </div>
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px]">
                                                <svg className="w-3 h-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                                                {project.industry}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            ) : (
                                /* ── Design: image gallery ── */
                                <div className="lg:w-3/5 flex-shrink-0 bg-gray-950 flex flex-col" style={{ minHeight: "320px" }}>
                                    <div className="relative flex-1 overflow-hidden" style={{ minHeight: "240px" }}>
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={activeImg}
                                                src={gallery.images[activeImg]}
                                                alt={`${project.title} design work`}
                                                initial={{ opacity: 0, scale: 1.04 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.35 }}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        </AnimatePresence>
                                        {gallery.nda && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="rotate-[-35deg] text-white/10 text-5xl font-black tracking-widest select-none pointer-events-none">NDA</span>
                                            </div>
                                        )}
                                        {gallery.images.length > 1 && (
                                            <>
                                                <button onClick={() => setActiveImg(i => (i - 1 + gallery.images.length) % gallery.images.length)}
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                                                </button>
                                                <button onClick={() => setActiveImg(i => (i + 1) % gallery.images.length)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                                                </button>
                                            </>
                                        )}
                                        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px]">
                                            {activeImg + 1} / {gallery.images.length}
                                        </div>
                                    </div>
                                    {gallery.images.length > 1 && (
                                        <div className="flex gap-2 p-3 bg-gray-900">
                                            {gallery.images.map((img, i) => (
                                                <button key={i} onClick={() => setActiveImg(i)}
                                                        className={`flex-1 h-14 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? "border-[#b98b2f]" : "border-transparent opacity-50 hover:opacity-80"}`}>
                                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Right: project details */}
                            <div className={`${isIT ? "lg:w-3/5" : "lg:w-2/5"} flex flex-col overflow-y-auto bg-white`}>
                                <div className="p-5 space-y-5">
                                    {/* Description */}
                                    <div>
                                        <p className="text-sm text-gray-600 leading-relaxed">{project.description}</p>
                                    </div>

                                    {/* Meta — IT projects show this in left panel, skip here */}
                                    {!isIT && (
                                        <div className="flex flex-wrap gap-2">
                                            <Chip icon="📍" label={project.location} />
                                            <Chip icon="📅" label={project.year} />
                                            <Chip icon="🏭" label={project.industry} />
                                        </div>
                                    )}

                                    {/* Highlights — context-aware label */}
                                    <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-widest text-[#b98b2f] mb-2">
                                            {isIT ? "What We Did" : "Design Highlights"}
                                        </h4>
                                        <ul className="space-y-2">
                                            {gallery.highlights.map((h, i) => (
                                                <li key={i} className="flex gap-2 text-xs text-gray-600 leading-relaxed">
                                                    <span className={`mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full ${isIT ? "bg-cyan-500" : "bg-[#b98b2f]"}`} />
                                                    {h}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Services */}
                                    <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-widest text-[#b98b2f] mb-2">Services Delivered</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.services.map((s) => (
                                                <span key={s} className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${isIT ? "bg-cyan-50 text-cyan-700 border-cyan-200" : "bg-[#b98b2f]/10 text-[#7a5a1d] border-[#b98b2f]/20"}`}>{s}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Deliverables */}
                                    <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-widest text-[#b98b2f] mb-2">
                                            {isIT ? "Outcomes & Deliverables" : "Deliverables"}
                                        </h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {gallery.deliverables.map((d) => (
                                                <span key={d} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-500 border border-gray-200">{d}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tech / Systems */}
                                    <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                                            {isIT ? "Technologies & Systems" : "Tools Used"}
                                        </h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tech.map((t) => (
                                                <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-50 text-gray-400 border border-gray-200">{t}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* NDA notice */}
                                    {gallery.nda && (
                                        <div className="flex gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5 text-xs text-amber-700">
                                            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0-6v2m0-6v2M4.929 19.071A10 10 0 1 1 19.07 4.93 10 10 0 0 1 4.929 19.07z"/>
                                            </svg>
                                            {isIT
                                                ? "Detailed technical configurations are confidential. Project scope shown is approved for disclosure."
                                                : "Final artwork is protected under NDA. Mockups shown are representative references."
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* ── WEBSITE IFRAME MODE ── */
                        <>
                            <div className="relative bg-gray-100" style={{ height: "52vh" }}>
                                {iframeLoading && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-8 h-8 rounded-full border-2 border-[#b98b2f] border-t-transparent mb-3" />
                                        <p className="text-xs text-gray-400">Loading preview…</p>
                                    </div>
                                )}
                                <iframe src={project.url} title={`${project.title} preview`}
                                        className="w-full h-full border-0" onLoad={() => setIframeLoading(false)} style={{ minHeight: "52vh" }} />
                            </div>
                            {/* Info bar */}
                            <div className="flex-shrink-0 border-t border-gray-100 bg-gray-50 px-5 py-4">
                                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{project.description}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 sm:gap-x-4 sm:gap-y-1.5 sm:flex-col sm:min-w-[260px]">
                                        <div className="flex flex-wrap gap-2">
                                            <Chip icon="📍" label={project.location} />
                                            <Chip icon="📅" label={project.year} />
                                            <Chip icon="🏭" label={project.industry} />
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.services.map((s) => (
                                                <span key={s} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#b98b2f]/10 text-[#7a5a1d] border border-[#b98b2f]/20">{s}</span>
                                            ))}
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tech.map((t) => (
                                                <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-500 border border-gray-200">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

function Chip({ icon, label }: { icon: string; label: string }) {
    return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] text-gray-500 bg-white border border-gray-200">
            <span>{icon}</span>{label}
        </span>
    );
}

// ============================================
// PROJECT CARD
// ============================================

function ProjectCard({
                         project,
                         theme,
                         index,
                         onViewProject,
                     }: {
    project: PortfolioProject;
    theme: CategoryTheme;
    index: number;
    onViewProject: (project: PortfolioProject) => void;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 80, rotateX: -15 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.1, type: "spring", stiffness: 100 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group"
        >
            <motion.div
                animate={{ scale: isHovered ? 1.02 : 1 }}
                transition={{ duration: 0.35, type: "spring" }}
                className="relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg cursor-pointer"
                style={{ boxShadow: isHovered ? `0 20px 40px -8px ${theme.glow}` : undefined }}
                onClick={() => onViewProject(project)}
            >
                {/* Image area */}
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <motion.div animate={{ scale: isHovered ? 1.08 : 1 }} transition={{ duration: 0.5 }} className="relative w-36 h-36">
                        <img src={project.image} alt={project.title} className="w-full h-full object-contain drop-shadow-xl" />
                    </motion.div>
                    <motion.div animate={{ opacity: isHovered ? 1 : 0 }} className={`absolute inset-0 bg-gradient-to-t ${theme.gradient} opacity-20`} />
                    <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold bg-black/50 backdrop-blur-md ${theme.textColor} border border-white/10`}>
                            {project.subcategory}
                        </span>
                    </div>
                    {/* Hover overlay CTA */}
                    <motion.div
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/40"
                    >
                        <span className="px-4 py-2 rounded-full bg-white text-gray-900 text-xs font-semibold shadow-lg flex items-center gap-2">
                            View Project
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </span>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <motion.h3
                        animate={{ color: isHovered ? theme.accent : "#1f2937" }}
                        className="text-base font-bold mb-1.5"
                    >
                        {project.title}
                    </motion.h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">{project.description}</p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                            <span>📍</span><span>{project.location}</span>
                            <span className="mx-1">·</span>
                            <span>📅</span><span>{project.year}</span>
                        </div>
                        <motion.span
                            animate={{ x: isHovered ? 3 : 0 }}
                            className={`text-xs font-semibold flex items-center gap-1 ${theme.textColor}`}
                        >
                            Explore ↗
                        </motion.span>
                    </div>
                </div>

                {/* Animated bottom border */}
                <motion.div
                    animate={{ background: isHovered ? `linear-gradient(90deg, ${theme.accent}, transparent, ${theme.accent})` : "transparent" }}
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                />
            </motion.div>
        </motion.div>
    );
}

// ============================================
// PROJECTS GRID
// ============================================

function ProjectsGrid({
                          theme,
                          projects,
                          onViewProject,
                      }: {
    theme: CategoryTheme;
    projects: PortfolioProject[];
    onViewProject: (project: PortfolioProject) => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <div ref={containerRef} className="relative py-28 overflow-hidden">
            <motion.div style={{ y: backgroundY }} className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100" />
                <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 50% 50%, ${theme.accent}20, transparent 70%)` }} />
            </motion.div>

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className={`text-sm uppercase tracking-[0.3em] ${theme.textColor} mb-3 block`}>{theme.eyebrow}</span>
                    <h3 className="text-4xl md:text-5xl font-bold text-gray-700 mb-3">{theme.heading}</h3>
                    <p className="text-gray-500 max-w-xl mx-auto text-sm">{theme.subheading}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            theme={theme}
                            index={index}
                            onViewProject={onViewProject}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// ============================================
// MAIN PORTFOLIO PAGE
// ============================================

export default function Portfolio() {
    const [activeSection, setActiveSection] = useState(-1);
    const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    const categories: { theme: CategoryTheme; icon: React.ComponentType<{ className?: string }>; projects: PortfolioProject[] }[] = [
        { theme: categoryThemes["Website/App Development"], icon: CodeIcon, projects: portfolioProjects.filter((p) => p.category === "Website/App Development") },
        { theme: categoryThemes["Graphic Design"], icon: DesignIcon, projects: portfolioProjects.filter((p) => p.category === "Graphic Design") },
        { theme: categoryThemes["Technical Support"], icon: SupportIcon, projects: portfolioProjects.filter((p) => p.category === "Technical Support") },
        { theme: categoryThemes["Marketing"], icon: MarketingIcon, projects: portfolioProjects.filter((p) => p.category === "Marketing") },
    ];

    useEffect(() => {
        const heroObserver = new IntersectionObserver(
            ([entry]) => { setActiveSection(entry.isIntersecting ? -1 : 0); },
            { threshold: 0 }
        );
        const hero = document.getElementById("hero-section");
        if (hero) heroObserver.observe(hero);

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(Number(entry.target.getAttribute("data-section-index")));
                    }
                });
            },
            { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
        );
        categories.forEach((_, i) => {
            const el = document.getElementById(`section-${i}`);
            if (el) sectionObserver.observe(el);
        });

        return () => { heroObserver.disconnect(); sectionObserver.disconnect(); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        name: "Autisync Portfolio",
                        url: "https://www.autisync.com/portfolio",
                        description: "A showcase of websites, web apps, brand identities, and digital solutions delivered by Autisync.",
                    }),
                }}
            />

            <div ref={mainRef} className="relative bg-white min-h-screen">

                {/* Desktop nav pills */}
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

                {/* Mobile nav strip */}
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

                {/* Hero */}
                <section id="hero-section" className="relative h-screen flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100" />
                        <div className="absolute inset-0 opacity-30">
                            <div className="w-full h-full" style={{
                                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99,102,241,0.15) 0%, transparent 50%),
                                  radial-gradient(circle at 75% 75%, rgba(236,72,153,0.15) 0%, transparent 50%)`,
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
                            <motion.a href="#section-0" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
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
                                    className="w-6 h-10 rounded-full border-2 border-gray-300 flex justify-center pt-2"
                        >
                            <motion.div animate={{ opacity: [1, 0, 1], y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }}
                                        className="w-1.5 h-1.5 rounded-full bg-gray-400"
                            />
                        </motion.div>
                    </motion.div>
                </section>

                {/* Category sections */}
                {categories.map((category, index) => (
                    <div key={category.theme.name} id={`section-${index}`} data-section-index={index}>
                        <ProjectsGrid
                            theme={category.theme}
                            projects={category.projects}
                            onViewProject={setSelectedProject}
                        />
                    </div>
                ))}

                {/* Achievements */}
                <div className="flex flex-wrap items-center mt-24 mb-12 px-4">
                    <div className="w-full mx-auto text-center max-w-5xl">
                        <div className="flex justify-center mb-4">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-[0_12px_25px_rgba(0,0,0,0.12)]">
                                <TrophyIcon className="w-7 h-7 text-[var(--autisync-gold,#b98b2f)]" />
                            </div>
                        </div>
                        <h3 className="mb-3 text-3xl font-semibold text-gray-800">Our Achievements</h3>
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

                {/* CTA */}
                <section className="relative py-28 overflow-hidden">
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
            </div>

            {/* Project Preview Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        key={selectedProject.id}
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}