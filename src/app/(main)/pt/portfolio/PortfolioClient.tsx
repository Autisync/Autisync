"use client";
import type { ReactNode } from "react";
import React, { useState, useRef, useEffect } from "react";
import { siteStats } from "@/lib/site-stats";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

// ============================================
// TYPES & DATA
// ============================================

// Internal category keys stay in English (used for filtering/lookup only).
// The Portuguese label shown to users lives in CategoryTheme.label.
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
    label: string;
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
        label: "Websites e Aplicações",
        gradient: "from-indigo-600 via-violet-600 to-purple-700",
        accent: "#6366F1",
        glow: "rgba(99, 102, 241, 0.5)",
        textColor: "text-indigo-400",
        bgColor: "bg-slate-950",
        particleColor: "#6366F1",
        eyebrow: "Websites e Aplicações Web",
        heading: "Interfaces pensadas para o desempenho",
        subheading: "De websites institucionais a aplicações web completas — cada detalhe pensado para velocidade, clareza e conversão.",
    },
    "Graphic Design": {
        name: "Graphic Design",
        label: "Design Gráfico",
        gradient: "from-pink-500 via-rose-500 to-fuchsia-600",
        accent: "#EC4899",
        glow: "rgba(236, 72, 153, 0.5)",
        textColor: "text-pink-400",
        bgColor: "bg-neutral-950",
        particleColor: "#EC4899",
        eyebrow: "Identidade Visual e Design",
        heading: "Marcas que não passam despercebidas",
        subheading: "Logótipos, identidades visuais e materiais impressos criados para causar uma primeira impressão duradoura.",
    },
    "Technical Support": {
        name: "Technical Support",
        label: "Suporte Técnico",
        gradient: "from-cyan-500 via-teal-500 to-emerald-600",
        accent: "#06B6D4",
        glow: "rgba(6, 182, 212, 0.5)",
        textColor: "text-cyan-400",
        bgColor: "bg-zinc-950",
        particleColor: "#06B6D4",
        eyebrow: "Infraestrutura e Suporte de TI",
        heading: "Tecnologia que simplesmente funciona",
        subheading: "Implementação completa de TI, helpdesk e sistemas seguros para que a sua equipa se concentre no que realmente importa.",
    },
    "Marketing": {
        name: "Marketing",
        label: "Marketing",
        gradient: "from-amber-500 via-orange-500 to-red-500",
        accent: "#F59E0B",
        glow: "rgba(245, 158, 11, 0.5)",
        textColor: "text-amber-400",
        bgColor: "bg-stone-950",
        particleColor: "#F59E0B",
        eyebrow: "Marketing Digital",
        heading: "Campanhas que convertem",
        subheading: "Posicionamento estratégico e campanhas digitais que colocam a sua marca diante do público certo.",
    },
};

const portfolioProjects: PortfolioProject[] = [
    {
        id: 1,
        title: "Ninth Vision",
        category: "Website/App Development",
        subcategory: "Website Institucional",
        image: "/logos/NinthVision.svg",
        description: "Website corporativo empresarial com uma estética moderna e visionária. Arquitetura limpa e tipografia marcante que posicionam a marca como uma líder inovadora.",
        url: "https://www.9thvision.com/",
        color: "#6366F1",
        industry: "Corporativo / Negócios",
        tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
        location: "Internacional",
        year: "2024",
        services: ["Web Design", "Desenvolvimento Web", "Alinhamento de Marca"],
    },
    {
        id: 2,
        title: "Florentek Engineering",
        category: "Website/App Development",
        subcategory: "Website Institucional",
        image: "/logos/florentekw.png",
        description: "Website para uma empresa de engenharia industrial que abrange instrumentação, sistemas elétricos, serviços de manutenção e mão de obra especializada — concebido para transmitir confiança a clientes B2B.",
        url: "https://www.florentek.co.ao/",
        color: "#6366F1",
        industry: "Engenharia e Indústria",
        tech: ["Next.js", "Tailwind CSS"],
        location: "Angola",
        year: "2024",
        services: ["Web Design", "Desenvolvimento Web", "Estratégia de Conteúdo"],
    },
    {
        id: 3,
        title: "Mavunzuka & Filhos",
        category: "Website/App Development",
        subcategory: "Website Institucional",
        image: "/logos/mavunzukawhite.svg",
        description: "Website da empresa líder em identificação de viaturas e segurança rodoviária em Angola — matrículas, películas de segurança e parcerias com o setor público apresentadas com autoridade.",
        url: "https://www.mavunzuka.co.ao/",
        color: "#6366F1",
        industry: "Segurança Rodoviária / Setor Público",
        tech: ["Next.js", "Tailwind CSS"],
        location: "Angola",
        year: "2024",
        services: ["Web Design", "Desenvolvimento Web", "Suporte Multilingue"],
    },
    {
        id: 4,
        title: "Salustra Group",
        category: "Website/App Development",
        subcategory: "Website Institucional",
        image: "/logos/Globus.svg",
        description: "Portal corporativo multiempresa para o grupo Salustra, que encaminha os visitantes para três áreas de negócio independentes — gestão de ativos, gestão de instalações e petróleo e gás.",
        url: "https://www.globus.co.ao/",
        color: "#6366F1",
        industry: "Petróleo e Gás / Gestão de Ativos",
        tech: ["Next.js", "Tailwind CSS"],
        location: "Angola",
        year: "2024",
        services: ["Web Design", "Desenvolvimento Web", "Arquitetura de Informação"],
    },
    {
        id: 5,
        title: "Grupo Girassol",
        category: "Website/App Development",
        subcategory: "Website Institucional",
        image: "/logos/Girassolw.svg",
        description: "Website de um grupo de construção e serviços, criado para apresentar o portfólio de projetos, as competências e a equipa da empresa — transmitindo qualidade e dimensão no mercado da construção em Angola.",
        url: "https://www.grupogirassol.co.ao/",
        color: "#6366F1",
        industry: "Construção e Serviços",
        tech: ["Next.js", "Tailwind CSS"],
        location: "Angola",
        year: "2024",
        services: ["Web Design", "Desenvolvimento Web"],
    },
    {
        id: 6,
        title: "Segucyber",
        category: "Website/App Development",
        subcategory: "Website de Cibersegurança",
        image: "/logos/Segucyber.svg",
        description: "Website de soluções de cibersegurança pensado para transmitir confiança, autoridade técnica e fiabilidade. Estética escura e mensagens claras sobre os serviços, direcionadas a clientes empresariais.",
        url: "https://www.segucyber.ao/",
        color: "#6366F1",
        industry: "Cibersegurança",
        tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
        location: "Angola",
        year: "2024",
        services: ["Web Design", "Desenvolvimento Web", "Estratégia de UX"],
    },
    // {
    //     id: 7,
    //     title: "ParVaga",
    //     category: "Website/App Development",
    //     subcategory: "Aplicação Web",
    //     image: "/logos/parvaga.svg",
    //     description: "Plataforma angolana de recrutamento que liga candidatos e empresas. Inclui submissão de CV, ofertas de emprego e um portal dedicado a empregadores com autenticação de utilizadores.",
    //     url: "https://parvagas.vercel.app/",
    //     color: "#6366F1",
    //     industry: "Recrutamento / Tecnologia de RH",
    //     tech: ["Next.js", "Tailwind CSS", "Autenticação"],
    //     location: "Angola",
    //     year: "2024",
    //     services: ["Desenvolvimento de Aplicações Web", "Design UI/UX", "Desenvolvimento de Portais"],
    // },
    {
        id: 8,
        title: "Your Pharmacy",
        category: "Website/App Development",
        subcategory: "Aplicação Web",
        image: "/logos/YourP.png",
        description: "Aplicação web de gestão de farmácia que oferece aos clientes uma experiência digital fluida para consultar, encomendar e gerir as suas necessidades farmacêuticas online.",
        url: "https://your-pharm.vercel.app/",
        color: "#6366F1",
        industry: "Saúde / Farmácia",
        tech: ["Next.js", "Tailwind CSS", "React"],
        location: "Internacional",
        year: "2023",
        services: ["Desenvolvimento de Aplicações Web", "Design UI/UX"],
    },
    {
        id: 9,
        title: "Blue Horizon",
        category: "Website/App Development",
        subcategory: "Website Institucional",
        image: "/logos/bluewhite.png",
        description: "Website corporativo bilingue (português e inglês) com uma estética refinada e internacional — criado para uma empresa que opera entre Angola e o Reino Unido.",
        url: "https://blueh.vercel.app/",
        color: "#6366F1",
        industry: "Corporativo / Investimento",
        tech: ["Next.js", "Tailwind CSS", "i18n"],
        location: "Angola / Reino Unido",
        year: "2024",
        services: ["Web Design", "Desenvolvimento Web", "Suporte Multilingue"],
    },
    {
        id: 10,
        title: "Evolution Technologies",
        category: "Website/App Development",
        subcategory: "Website Institucional",
        image: "https://www.evolutiontec.co.ao/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.fb975d65.png&w=256&q=75",
        description: "Website de uma empresa de soluções de rede e telecomunicações que apresenta serviços de infraestrutura, sistemas de antenas e consultoria tecnológica no mercado angolano.",
        url: "https://www.evolutiontec.co.ao/",
        color: "#6366F1",
        industry: "Telecomunicações / TI",
        tech: ["Next.js", "Tailwind CSS"],
        location: "Angola",
        year: "2024",
        services: ["Web Design", "Desenvolvimento Web"],
    },
    {
        id: 11,
        title: "Shivali Investments",
        category: "Website/App Development",
        subcategory: "Website Institucional",
        image: "https://www.shivaliinvestments.com/_next/image?url=%2Fassets%2Fimages%2Flogo.png&w=256&q=75",
        description: "Website de uma empresa de investimento e consultoria com um design profissional centrado na confiança — serviços, carteira de clientes, parcerias e canais de contacto.",
        url: "https://www.shivaliinvestments.com/",
        color: "#6366F1",
        industry: "Investimento e Consultoria",
        tech: ["Next.js", "Tailwind CSS"],
        location: "Internacional",
        year: "2024",
        services: ["Web Design", "Desenvolvimento Web", "Alinhamento de Marca"],
    },
    {
        id: 12,
        title: "Tchary Glamour",
        category: "Website/App Development",
        subcategory: "Website de Comércio Eletrónico",
        image: "https://tcharyglamour.netlify.app/Imagem%20png%20-%20Tchary%20Glamour%20.png",
        description: "Website de um salão de beleza de luxo, um dos estúdios de glamour de referência em Luanda — maquilhagem, aplicação e confeção de perucas, tranças e muito mais. Landing page bilingue com secções de portfólio e contacto.",
        url: "https://tcharyglamour.netlify.app/",
        color: "#6366F1",
        industry: "Beleza e Bem-estar",
        tech: ["HTML", "CSS", "JavaScript"],
        location: "Angola",
        year: "2023",
        services: ["Web Design", "Desenvolvimento Web", "Identidade de Marca"],
    },
    {
        id: 13,
        title: "BoG Pro Max",
        category: "Website/App Development",
        subcategory: "Aplicação Web",
        image: "/logos/bogpromax.svg",
        description: "Plataforma de competição de Fantasy Premier League para a Namíbia — códigos semanais por jornada, inscrição de equipas, instruções de pagamento e um sistema de pedidos integrado com WhatsApp para uma comunidade FPL em crescimento.",
        url: "https://bogpromax.netlify.app/",
        color: "#6366F1",
        industry: "Desporto e Jogos",
        tech: ["HTML", "CSS", "JavaScript"],
        location: "Namíbia",
        year: "2024",
        services: ["Web Design", "Desenvolvimento Web"],
    },
    // ── Graphic Design ──────────────────────────────────────────────────
    {
        id: 14,
        title: "Florentek Engineering",
        category: "Graphic Design",
        subcategory: "Identidade de Marca",
        image: "/logos/florentekw.png",
        description: "Sistema completo de identidade visual para uma empresa de engenharia industrial — logótipo com 7 variações, paleta de cores, tipografia e papelaria completa, incluindo cartões de visita, papel timbrado, envelopes, pastas e flyers personalizados.",
        url: "",
        color: "#EC4899",
        industry: "Engenharia e Indústria",
        tech: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign"],
        location: "Angola",
        year: "2024",
        services: ["Design de Logótipo", "Manual de Normas", "Design de Papelaria", "Material Impresso"],
        designGallery: {
            images: [
                "/logos/Florentek/1.png",
                "/logos/Florentek/2.png",
                "/logos/Florentek/3.png",
            ],
            highlights: [
                "Símbolo 'F' distintivo formado por três barras sobrepostas — representa a precisão da engenharia e o avanço contínuo",
                "Paleta principal: verde-azulado Observatory (#008A6D), Charcoal Gray (#303034) e branco puro — inspirada na eco-inovação",
                "Três tipos de letra: Retroica Bold (títulos), Codec Cold (texto corrido) e Comfortaa (interface) — modernos mas acessíveis",
                "6 variantes de logótipo: fundo claro, fundo escuro, preto e branco, ícone de aplicação, banner e vertical — total flexibilidade de produção",
                "Papelaria: papel timbrado A4, flyer DL, envelope C4, pasta e cartões de visita",
            ],
            deliverables: ["Logótipos principal e secundário (SVG/PNG/PDF)", "Manual de normas em PDF", "Cartão de visita", "Papel timbrado A4", "Flyer DL", "Envelope e pasta", "Kit para redes sociais"],
            nda: false,
        },
    },
    {
        id: 15,
        title: "Grupo Girassol",
        category: "Graphic Design",
        subcategory: "Identidade de Marca e Merchandising",
        image: "/logos/Girassolw.svg",
        description: "Identidade visual completa e programa de impressos e merchandising para um grupo angolano de serviços automóveis — sistema de logótipo, manual de normas e artigos personalizados como canecas, calendários, capacetes, fitas porta-crachá, pastas de arquivo e roll-ups.",
        url: "",
        color: "#EC4899",
        industry: "Serviços Automóveis",
        tech: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign"],
        location: "Angola",
        year: "2025",
        services: ["Design de Logótipo", "Manual de Normas", "Design de Merchandising", "Impressão e Sinalética"],
        designGallery: {
            images: [
                "/logos/Girassol/1.png",
                "/logos/Girassol/2.png",
                "/logos/Girassol/3.png",
            ],
            highlights: [
                "Motivo de girassol — anéis em dourado quente e verde-lima que refletem o nome da marca e irradiam energia e confiança",
                "Paleta de 4 cores: Dourado Primário (#E8A341), Dourado Secundário (#F0C43E), Verde-Amarelo (#B2C74B), Cinza-Azulado (#2D3238)",
                "Source Sans Variable (Semibold / Regular / Light) — limpa e muito legível em qualquer tamanho",
                "Guia de utilização do logótipo com regras de contraste, permissões de rotação e proibição de efeitos 3D",
                "Merchandising abrangente: canecas, copos de viagem, capacetes, calendários de secretária e de parede 2025, fitas porta-crachá, pens USB, pastas de arquivo e roll-ups para eventos",
            ],
            deliverables: ["Sistema de identidade visual e manual de normas", "Conjunto completo de mockups de merchandising", "Calendários de secretária e de parede 2025", "Roll-up e pasta para eventos", "Autocolantes para capacetes e coletes de segurança", "Personalização de pens USB e fitas porta-crachá"],
            nda: false,
        },
    },
    {
        id: 16,
        title: "Mavunzuka & Filhos",
        category: "Graphic Design",
        subcategory: "Identidade de Marca",
        image: "/logos/mavunzukawhite.svg",
        description: "Identidade corporativa para uma empresa de segurança rodoviária e identificação de viaturas — símbolo hexagonal marcante, sistema de cores em azul-marinho escuro, papelaria completa, decoração de viaturas e merchandising personalizado.",
        url: "",
        color: "#EC4899",
        industry: "Segurança Rodoviária / Setor Público",
        tech: ["Adobe Illustrator", "Adobe Photoshop"],
        location: "Angola",
        year: "2025",
        services: ["Design de Logótipo", "Manual de Normas", "Decoração de Viaturas", "Papelaria e Merchandising"],
        designGallery: {
            images: [
                "/logos/Mavunzuka/1.png",
                "/logos/Mavunzuka/2.png",
                "/logos/Mavunzuka/3.png",
            ],
            highlights: [
                "Ícone hexagonal com um 'M' estilizado em forma de pico — autoridade, infraestrutura rodoviária e solidez estrutural",
                "Azul-marinho Ebony Clay (#1e263e) como cor principal e Deep Gray (#222526) como secundária — uma identidade corporativa intemporal e de alto contraste",
                "Montserrat em todos os pesos — negrito para impacto, regular para texto corrido",
                "Decoração de viaturas para toda a frota, com a lista de serviços no painel lateral traseiro",
                "Papelaria completa: carta institucional, pasta de documentos, envelope, cartões de visita frente e verso, ecrã expositor e conjunto de canecas",
            ],
            deliverables: ["Sistema de logótipo e guia de estilo v1.0", "Cartão de visita e papel timbrado", "Design de decoração de viaturas", "Tapete de rato e conjunto de canecas", "Materiais para exposições", "Manual de normas em PDF (2025)"],
            nda: false,
        },
    },
    {
        id: 17,
        title: "Blue Horizon",
        category: "Graphic Design",
        subcategory: "Identidade de Marca",
        image: "/logos/bluewhite.png",
        description: "Identidade visual para uma empresa angolana de serviços de petróleo e gás — logótipo de eclipses concêntricos, paleta em azul-marinho profundo, papelaria bilingue e material corporativo completo, incluindo capacetes, coletes de segurança e um stand de exposição 10×10.",
        url: "",
        color: "#EC4899",
        industry: "Petróleo e Gás",
        tech: ["Adobe Illustrator", "Adobe InDesign", "Adobe Photoshop"],
        location: "Angola / Reino Unido",
        year: "2023",
        services: ["Design de Logótipo", "Manual de Normas", "Material Corporativo", "Design de Stands"],
        designGallery: {
            images: [
                "/logos/Blue/1.jpg",
                "/logos/Blue/2.jpg",
                "/logos/Blue/3.png",
                "/logos/Blue/4.png",
            ],
            highlights: [
                "Quatro eclipses concêntricos em tons graduais de azul-marinho — cada arco representa um nível mais profundo de conhecimento e compromisso",
                "Paleta de 5 tons de azul (#00296b → #5fa8d3) que transmite profundidade e autoridade técnica no setor do petróleo e gás",
                "MADE Tommy Soft (Medium / Regular / Light) com Poppins como alternativa — refinada e legível em PT e EN",
                "Pacote completo de impressos de segurança: coletes refletores, capacetes, canetas personalizadas, placas de identificação e stand de exposição",
                "Aplicação bilingue — todo o material em português (principal) e inglês",
            ],
            deliverables: ["Manual de normas completo", "Cartões de visita (bilingues)", "Papel timbrado e pasta", "Grafismo para coletes refletores e capacetes", "Stand de exposição (10×10)", "Calendário (secretária e parede)", "Cavalete e banner"],
            nda: false,
        },
    },
    {
        id: 18,
        title: "Dreamboat Trading",
        category: "Graphic Design",
        subcategory: "Papelaria Corporativa",
        image: "/logos/logo_white.png",
        description: "Papelaria corporativa para a Dreamboat Trading Services, Lda — papel timbrado com marca de água, envelope C4 com verso integralmente em azul-marinho e cartão de identificação de colaborador frente e verso com fita porta-crachá.",
        url: "",
        color: "#EC4899",
        industry: "Comércio e Trading",
        tech: ["Adobe InDesign", "Adobe Illustrator"],
        location: "Angola",
        year: "2024",
        services: ["Design de Papel Timbrado", "Design de Envelopes", "Cartão de Colaborador"],
        designGallery: {
            images: [
                "/logos/Dreamboat/1.png",
                "/logos/Dreamboat/2.png",
            ],
            highlights: [
                "Envelope C4: frente branca com o logótipo Dreamboat e o papel timbrado visível, verso em azul-marinho profundo — marcante e memorável no correio",
                "Cartão de colaborador (frente): nome 'Augusto Ventura', faixa de função 'AMINISTRACAO – BACK OFFICE', recorte circular para fotografia, grafismos circulares da marca e furo para fita porta-crachá no topo",
                "Cartão de colaborador (verso): texto completo da política da empresa em português, código QR grande para verificação e rodapé em azul-marinho com as moradas da Sede e dos Escritórios e +244 923-065-276",
                "Papel timbrado A4: logótipo da Dreamboat Trading Services, Lda no canto superior esquerdo, marca de água centrada na página e bloco de contactos completo no canto inferior esquerdo (Tel, E-mail, Sede, Escritórios)",
            ],
            deliverables: ["Papel timbrado A4 (PDF pronto para impressão)", "Envelope C4 (frente e verso)", "Cartão de colaborador (frente e verso)", "Todos os ficheiros em CMYK prontos para impressão"],
            nda: false,
        },
    },
    {
        id: 19,
        title: "Cave Properties Group",
        category: "Graphic Design",
        subcategory: "Design de Logótipo",
        image: "/logos/cave_white.png",
        description: "Design de logótipo para um grupo namibiano de investimento imobiliário — ícone marcante com telhados de casas, chaminés em vermelho e um arco de base envolvente, entregue em variantes escura e clara para máxima versatilidade.",
        url: "",
        color: "#EC4899",
        industry: "Imobiliário",
        tech: ["Adobe Illustrator"],
        location: "Namíbia",
        year: "2024",
        services: ["Design de Logótipo", "Variantes de Marca"],
        designGallery: {
            images: [
                "/logos/CaveProperties/1.png",
                "/logos/CaveProperties/2.png",
            ],
            highlights: [
                "Três telhados interligados formam um único símbolo — uma carteira de imóveis, não um ativo isolado",
                "Chaminés vermelhas nas casas exteriores acrescentam calor e criam um elemento memorável que se repete em todo o material",
                "Um arco de base envolvente ancora o ícone — estabilidade e alicerces sólidos no investimento imobiliário",
                "Variante escura (ícone quase preto, texto branco) e variante clara (ícone carvão, texto cinzento) — prontas para qualquer superfície ou suporte",
                "CAVE em maiúsculas espaçadas + 'Properties Group' em itálico — hierarquia tipográfica clara",
            ],
            deliverables: ["Logótipo principal — variante escura", "Logótipo secundário — variante clara", "SVG + PNG + PDF em todos os tamanhos"],
            nda: false,
        },
    },
    // ── Technical Support ────────────────────────────────────────────────
    {
        id: 20,
        title: "Occucare Medical",
        category: "Technical Support",
        subcategory: "Suporte e Consultoria de TI",
        image: "/logos/OCCUCARE.png",
        description: "Parceria contínua de suporte de TI para uma plataforma de gestão de saúde — suporte técnico diário, manutenção proativa de sistemas, helpdesk e consultoria estratégica na melhoria da segurança de rede, garantindo conformidade e integridade dos dados em todas as operações clínicas.",
        url: "",
        color: "#06B6D4",
        industry: "Saúde / Medicina",
        tech: ["Segurança de Rede", "Windows Server", "Sistemas de Helpdesk", "Configuração de Firewall"],
        location: "Angola",
        year: "2024",
        services: ["Suporte Técnico de TI", "Manutenção de Sistemas", "Consultoria em Segurança de Rede", "Operações de Helpdesk"],
        designGallery: {
            images: [
                "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80",
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
                "https://images.unsplash.com/photo-1584982751601-97dea52b6b50?w=800&q=80",
            ],
            highlights: [
                "Contrato de suporte de TI completo, abrangendo hardware, software e infraestrutura de rede em toda a clínica",
                "Programa de manutenção planeada e reativa — minimizando o tempo de inatividade num ambiente de saúde crítico",
                "Auditoria de segurança e consultoria sobre a arquitetura de rede: regras de firewall, controlo de acessos e segmentação dos dados clínicos",
                "Helpdesk que permitiu aos colaboradores resolver problemas técnicos do dia a dia sem perturbar o atendimento aos pacientes",
                "Recomendações de segmentação por VLAN para isolar os sistemas clínicos do tráfego geral do escritório — reduzindo a superfície de ataque",
            ],
            deliverables: ["Contrato de suporte de TI", "Plano de manutenção de sistemas", "Auditoria de segurança de rede", "Plano de configuração de firewall", "Implementação de helpdesk para colaboradores"],
            nda: true,
        },
    },
    {
        id: 21,
        title: "Passa Studio",
        category: "Technical Support",
        subcategory: "Configuração e Manutenção de Equipamentos",
        image: "/logos/passa.png",
        description: "Implementação completa de TI e manutenção contínua para um estúdio criativo — instalação e calibração de impressoras, montagem de estações de trabalho e configuração de sistemas operativos, com um plano de manutenção estruturado para manter todos os equipamentos no máximo desempenho no trabalho criativo para clientes.",
        url: "",
        color: "#06B6D4",
        industry: "Estúdio Criativo / Media",
        tech: ["Windows 10/11", "macOS", "Configuração de Impressoras", "Hardware de PC"],
        location: "Angola",
        year: "2024",
        services: ["Instalação e Manutenção de Impressoras", "Montagem e Configuração de Computadores", "Manutenção de Equipamentos", "Suporte de TI Presencial"],
        designGallery: {
            images: [
                "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
                "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
                "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&q=80",
            ],
            highlights: [
                "Instalação de impressoras, configuração de drivers e de impressão em rede, e calibração de cor para resultados criativos de nível profissional",
                "Estações de trabalho montadas à medida de fluxos de trabalho criativos — armazenamento, RAM e configuração de ecrãs otimizados para aplicações de design exigentes",
                "Instalação de sistemas operativos, licenciamento de software e reforço inicial da segurança em todos os computadores do estúdio",
                "Visitas de manutenção periódicas: limpeza física, verificações de desempenho, atualizações de sistema e drivers, e diagnóstico de avarias",
                "Suporte presencial de resposta rápida para minimizar perturbações nas operações do estúdio e nos prazos dos projetos dos clientes",
            ],
            deliverables: ["Instalação e calibração de impressoras", "Montagem de computadores e configuração do sistema operativo", "Instalação e licenciamento de software", "Plano de manutenção", "Contrato de suporte presencial"],
            nda: false,
        },
    },
    {
        id: 22,
        title: "Omatapalo",
        category: "Technical Support",
        subcategory: "Sistemas de Videovigilância e Segurança",
        image: "https://omatapalo.com/wp-content/uploads/Design-sem-nome-6.png",
        description: "Fornecimento e implementação completa de infraestrutura de videovigilância para a Omatapalo — sistemas de câmaras IP, gravadores de vídeo em rede, cablagem estruturada e configuração de ponta a ponta, garantindo monitorização fiável do local 24/7 e cobertura de segurança física.",
        url: "",
        color: "#06B6D4",
        industry: "Construção / Infraestruturas",
        tech: ["IP CCTV", "Sistemas NVR", "Cablagem Estruturada", "Configuração de Rede"],
        location: "Angola",
        year: "2024",
        services: ["Fornecimento de Equipamento de Videovigilância", "Instalação de CCTV", "Configuração de NVR", "Cablagem de Infraestrutura"],
        designGallery: {
            images: [
                "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80",
                "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80",
                "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
            ],
            highlights: [
                "Levantamento do local e planeamento da cobertura — identificação das posições ideais das câmaras para máxima visibilidade, sem ângulos mortos",
                "Fornecimento de câmaras IP de nível profissional, adequadas a ambientes interiores e exteriores num local com operações ativas",
                "Configuração de NVR (gravador de vídeo em rede) com visualização remota — a direção pode monitorizar o local em tempo real a partir de qualquer dispositivo",
                "Instalação de cablagem estruturada: percursos limpos e duradouros, adequados ao ambiente do local e a futuras expansões",
                "Comissionamento completo do sistema e entrega — configuração do NVR, criação de contas de utilizador e formação prática dos colaboradores",
            ],
            deliverables: ["Levantamento do local e plano de cobertura", "Fornecimento e instalação de câmaras IP", "Configuração de NVR e monitorização remota", "Cablagem estruturada", "Comissionamento do sistema e formação dos colaboradores"],
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
    // Start at the real figure so server-rendered HTML never shows "0".
    const [displayValue, setDisplayValue] = useState(value);

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
                                Marca e Design
                            </span>
                        )}
                        {isIT && (
                            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-cyan-50 text-cyan-600 border border-cyan-200">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>
                                Suporte de TI
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                        {!isDesign && project.url && (
                            <a href={project.url} target="_blank" rel="noopener noreferrer"
                               className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#b98b2f] text-white text-xs font-medium hover:bg-[#7a5a1d] transition-colors"
                               onClick={(e) => e.stopPropagation()}>
                                Abrir website
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}
                        <button onClick={onClose} aria-label="Fechar"
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
                                                alt={`Trabalho de design para ${project.title}`}
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
                                                <button onClick={() => setActiveImg(i => (i - 1 + gallery.images.length) % gallery.images.length)} aria-label="Imagem anterior"
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                                                </button>
                                                <button onClick={() => setActiveImg(i => (i + 1) % gallery.images.length)} aria-label="Imagem seguinte"
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
                                                <button key={i} onClick={() => setActiveImg(i)} aria-label={`Ver imagem ${i + 1}`}
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
                                            {isIT ? "O Que Fizemos" : "Destaques do Design"}
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
                                        <h4 className="text-xs font-semibold uppercase tracking-widest text-[#b98b2f] mb-2">Serviços Prestados</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.services.map((s) => (
                                                <span key={s} className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${isIT ? "bg-cyan-50 text-cyan-700 border-cyan-200" : "bg-[#b98b2f]/10 text-[#7a5a1d] border-[#b98b2f]/20"}`}>{s}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Deliverables */}
                                    <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-widest text-[#b98b2f] mb-2">
                                            {isIT ? "Resultados e Entregáveis" : "Entregáveis"}
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
                                            {isIT ? "Tecnologias e Sistemas" : "Ferramentas Utilizadas"}
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
                                                ? "As configurações técnicas detalhadas são confidenciais. O âmbito do projeto apresentado foi aprovado para divulgação."
                                                : "A arte final está protegida por um acordo de confidencialidade (NDA). Os mockups apresentados são referências representativas."
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
                                        <p className="text-xs text-gray-400">A carregar pré-visualização…</p>
                                    </div>
                                )}
                                <iframe src={project.url} title={`Pré-visualização de ${project.title}`}
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
                            Ver Projeto
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
                            Explorar ↗
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

export default function PortfolioClient() {
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
                        name: "Portfólio Autisync",
                        inLanguage: "pt",
                        url: "https://www.autisync.com/pt/portfolio",
                        description: "Uma seleção de websites, aplicações web, identidades visuais e soluções digitais desenvolvidas pela Autisync.",
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
                                    key={cat.theme.label}
                                    onClick={() => document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: "smooth" })}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                                        activeSection === index
                                            ? `bg-gradient-to-r ${cat.theme.gradient} text-white shadow-md`
                                            : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white/80 backdrop-blur-sm border border-white/10"
                                    }`}
                                    whileHover={{ scale: 1.05, x: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {cat.theme.label}
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
                                        key={cat.theme.label}
                                        onClick={() => document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: "smooth" })}
                                        className={`flex-shrink-0 px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all duration-300 ${
                                            activeSection === index
                                                ? `bg-gradient-to-r ${cat.theme.gradient} text-white`
                                                : "text-white/50 hover:text-white/80"
                                        }`}
                                        whileTap={{ scale: 0.92 }}
                                    >
                                        {cat.theme.label}
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
                                Agência Digital Criativa
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
                            Onde a criatividade encontra a tecnologia. Criamos experiências digitais que deixam uma impressão duradoura.
                        </motion.p>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex gap-4 justify-center">
                            <motion.a href="#section-0" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                      className="px-6 py-2 text-white bg-[var(--autisync-gold,#b98b2f)] rounded-md shadow-lg hover:bg-[#1C1C1C] transition-all"
                            >
                                Conheça o Nosso Trabalho
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
                        <h3 className="mb-3 text-3xl font-semibold text-gray-800">As Nossas Conquistas</h3>
                        <p className="mb-10 text-base text-gray-500 max-w-2xl mx-auto">
                            Números que refletem a confiança que os nossos parceiros depositam em nós e a qualidade do trabalho que entregamos em cada projeto.
                        </p>
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                            <AchievementStat icon={<ProjectsIcon className="w-5 h-5" />} label="Projetos Lançados" value={siteStats.projects} suffix="+" delay={0} />
                            <AchievementStat icon={<ClientsIcon className="w-5 h-5" />} label="Clientes Satisfeitos" value={siteStats.clients} suffix="+" delay={0.1} />
                            <AchievementStat icon={<YearsIcon className="w-5 h-5" />} label="Anos a Criar no Digital" value={siteStats.years} suffix="+" delay={0.2} />
                            <AchievementStat icon={<SatisfactionIcon className="w-5 h-5" />} label="Satisfação dos Clientes" value={siteStats.satisfaction} suffix="%" delay={0.3} />
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <section className="relative py-28 overflow-hidden">
                    <div className="container mx-auto px-4 relative text-center">
                        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                   className="text-4xl md:text-5xl font-bold text-gray-700 mb-2"
                        >
                            Pronto para Começar o Seu Projeto?
                        </motion.h2>
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                                  className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
                        >
                            Vamos colaborar e transformar a sua próxima ideia numa experiência digital de referência
                        </motion.p>
                        <motion.a
                            href="https://wa.me/447883317646?text=Ol%C3%A1%20Autisync%2C%20vi%20o%20vosso%20portf%C3%B3lio%20e%20gostaria%20de%20falar%20sobre%20um%20projeto."
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
                            Fale Connosco
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