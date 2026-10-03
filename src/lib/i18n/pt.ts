/**
 * Portuguese (Angola / Portugal) copy for /pt and /pt/precos.
 *
 * Only WORDS live here. Prices always come from website-packages.ts and
 * service-packages.ts, so a price change updates both languages at once.
 * Written in European/Angolan Portuguese (contacto, equipa, a sua empresa),
 * not Brazilian.
 */
import { carePlanMonthly, formatPrice, websiteTiers, type Currency } from "../website-packages";
import { brandingTiers, launchBundle, socialTiers } from "../service-packages";

type Copy = { name: string; description: string; features: string[]; detail?: string };

export const ptWebsite: Record<string, Copy> = {
    "tier-startup": {
        name: "Startup",
        description: "Um kit de lançamento rápido para colocar um novo negócio online como deve ser.",
        features: [
            "Até 6 páginas",
            "Domínio – 1.º ano grátis",
            "Alojamento – 1.º ano grátis",
            "Certificado SSL grátis",
            "Adaptado a telemóvel",
            "Entrega em 19 dias",
            "Criação de página no Facebook",
            "Ligação às redes sociais",
            "SEO básico",
            "5 contas de e-mail – 1000 MB",
            "Resposta de suporte em 48 horas",
            "Formulários com IA",
            "Sincronização com CRM e notificações",
        ],
    },
    "tier-small-business": {
        name: "Pequena Empresa",
        description: "Tudo o que uma empresa estabelecida precisa para ter boa imagem e ganhar clientes online.",
        features: [
            "10 páginas",
            "Domínio – 1.º ano grátis",
            "Alojamento – 1.º ano grátis",
            "Certificado SSL grátis",
            "Adaptado a telemóvel",
            "Entrega em 28 dias",
            "Criação e otimização das redes sociais",
            "Formulários de contacto e newsletter",
            "Ligação às redes sociais",
            "SEO avançado",
            "37 contas de e-mail – 1000 MB",
            "Resposta de suporte em 24 horas",
            "30 horas de suporte grátis",
            "Kit de marca incluído",
            "Automação de boas-vindas a clientes",
        ],
    },
    "tier-enterprise": {
        name: "Empresarial",
        description: "Infraestrutura, automação e suporte dedicados para empresas de maior dimensão.",
        features: [
            "15+ páginas",
            "Domínio – 1.º ano grátis",
            "Alojamento – 1.º ano grátis",
            "Certificado SSL grátis",
            "Adaptado a telemóvel",
            "Entrega em 62 dias",
            "Criação e otimização das redes sociais",
            "Formulários de contacto e newsletter",
            "Integração com redes sociais",
            "SEO avançado",
            "100 contas de e-mail – 1000 MB",
            "Resposta de suporte em 24 horas",
            "87 horas de suporte grátis",
            "Sequências de automação",
            "Chatbot com IA e chat ao vivo",
            "CRM completo + gestão de pipeline",
            "Painel de análise e relatórios",
        ],
    },
};

export const ptBranding: Record<string, Copy> = {
    "branding-essentials": {
        name: "Essencial",
        description: "Um logótipo profissional e o básico para começar a trabalhar com confiança.",
        detail: "pagamento único · entrega em ~10 dias",
        features: [
            "Logótipo — 2 propostas, 3 rondas de revisão",
            "Paleta de cores e tipografia",
            "Cartão de visita + 100 impressos",
            "Carimbo da empresa",
            "Kit para redes sociais (foto de perfil + capa)",
            "Todos os formatos (SVG, PNG, PDF)",
        ],
    },
    "branding-identity": {
        name: "Identidade",
        description: "Uma marca completa e coerente, pronta a usar em todo o lado.",
        detail: "pagamento único · entrega em ~21 dias",
        features: [
            "Tudo do pacote Essencial",
            "Manual de normas (12 páginas)",
            "Papel timbrado, envelopes e assinatura de e-mail",
            "Modelos de documentos Word",
            "Design de cartão de colaborador",
            "300 cartões de visita impressos",
            "6 modelos de publicações para redes sociais",
        ],
    },
    "branding-corporate": {
        name: "Corporativo",
        description: "Identidade corporativa completa para empresas, obras e frotas.",
        detail: "pagamento único · entrega em ~35 dias",
        features: [
            "Tudo do pacote Identidade",
            "Manual de marca completo",
            "Perfil da empresa (9 páginas)",
            "Modelo de apresentação e pasta",
            "Roll-up / stand de exposição",
            "Fardas, EPI e grafismo de viaturas",
            "6 assinaturas digitais",
            "6 cartões de colaborador impressos",
            "600 cartões de visita impressos",
        ],
    },
};

export const ptSocial: Record<string, Copy> = {
    "social-essential": {
        name: "Essencial",
        description: "Uma presença consistente e profissional nas plataformas que contam.",
        detail: "por mês · mínimo 3 meses",
        features: [
            "12 publicações / mês, incluindo 4 reels",
            "2 plataformas",
            "Legendas, hashtags e agendamento",
            "Relatório mensal de desempenho",
        ],
    },
    "social-growth": {
        name: "Crescimento",
        description: "Mais vídeo, alcance pago e uma equipa a responder ao seu público.",
        detail: "por mês · mínimo 3 meses",
        features: [
            "16 publicações / mês, incluindo 8 reels",
            "3 plataformas (incluindo LinkedIn)",
            "Gestão de anúncios pagos*",
            "Respostas a comentários e mensagens nos dias úteis",
            "Relatório mensal + reunião de análise",
        ],
    },
    "social-premium": {
        name: "Premium",
        description: "Conteúdo e campanhas completos, pensados para gerar contactos.",
        detail: "por mês · mínimo 3 meses",
        features: [
            "20 publicações / mês, incluindo 12 reels",
            "1 dia de filmagem no local por mês",
            "Até 4 plataformas",
            "Anúncios pagos + estratégia de campanhas*",
            "Contactos enviados diretamente para o seu CRM",
            "Sessão de estratégia trimestral",
        ],
    },
};

export const ptSocialTerms =
    "*O investimento em anúncios é pago por si diretamente à plataforma e não está incluído na mensalidade. Todos os planos de redes sociais têm um período mínimo de 3 meses.";

export const ptBundle = {
    name: "Lançamento Marca & Website",
    tagline: "Tenha a imagem da empresa que está a construir — em 30 dias.",
    description:
        "A sua identidade de marca completa e um website profissional de 10 páginas, criados em conjunto para que tudo combine desde o primeiro dia. Pronto para concursos, bilingue (PT/EN) a pedido.",
    features: [
        "Pacote de Branding Identidade (logótipo, manual, papelaria, 300 cartões)",
        "Website Pequena Empresa (10 páginas, SEO, domínio e alojamento no 1.º ano)",
        "Contas de e-mail empresarial configuradas",
        "Redes sociais configuradas com a nova marca",
        "50% para começar, 50% só quando estiver satisfeito com o site online",
    ],
};

export const ptUi = {
    from: "A partir de",
    oneOff: "pagamento único · 50% no início, 50% no lançamento",
    perMonth: "/mês",
    mostPopular: "Mais Popular",
    choose: (name: string) => `Escolher ${name}`,
    showPricesIn: "Mostrar preços em",
    regions: { AOA: "Angola · Namíbia", GBP: "Reino Unido", EUR: "Portugal · UE" } as Record<Currency, string>,
    carePlan: (price: string) =>
        `O domínio e o alojamento são grátis no primeiro ano. Depois, o nosso Plano de Manutenção mantém o seu site alojado, com cópias de segurança, atualizado e seguro, com 2 horas de alterações por mês, por ${price}/mês.`,
    whatsapp: (pkg: string, price: string) => `Olá Autisync, tenho interesse no pacote ${pkg} (${price}).`,
};

const kz = (n: number) => formatPrice(n, "AOA");
const eur = (n: number) => formatPrice(n, "EUR");
const [startup, smallBiz, enterprise] = websiteTiers;

export const ptFaq: { q: string; a: string }[] = [
    {
        q: "Quanto custa um website para empresas na Autisync?",
        a: `Os websites da Autisync começam em ${kz(startup.price.AOA)} em Angola (${eur(startup.price.EUR)} em Portugal) para um site Startup de até 6 páginas. O website Pequena Empresa, com 10 páginas, custa ${kz(smallBiz.price.AOA)} e os sites Empresariais começam em ${kz(enterprise.price.AOA)}. Todos os pacotes incluem domínio e alojamento no primeiro ano, SSL, contas de e-mail empresarial e configuração de SEO.`,
    },
    {
        q: "Quanto tempo demora a criar um website?",
        a: "Um website Startup é entregue em cerca de 19 dias, um website Pequena Empresa em cerca de 28 dias e um website Empresarial em cerca de 62 dias, dependendo da rapidez com que recebemos conteúdos e aprovações.",
    },
    {
        q: "Como funcionam os pagamentos?",
        a: "Os projetos de website e branding são pagos 50% no início e 50% no lançamento, por isso a segunda metade só é paga quando estiver satisfeito com o resultado online. A gestão de redes sociais é paga mensalmente, com um período mínimo de 3 meses.",
    },
    {
        q: "O que acontece depois do primeiro ano de alojamento?",
        a: `O alojamento e o domínio são grátis no primeiro ano. Depois, o Plano de Manutenção da Autisync custa ${kz(carePlanMonthly.AOA)} por mês (${eur(carePlanMonthly.EUR)} em Portugal) e inclui alojamento, e-mail, cópias de segurança, atualizações, segurança e 2 horas de alterações por mês.`,
    },
    {
        q: "Quanto custa criar um logótipo e uma identidade de marca?",
        a: `O branding começa em ${kz(brandingTiers[0].price.AOA)} com o pacote Essencial: logótipo, cores e tipografia, 100 cartões de visita impressos, carimbo e kit para redes sociais. O pacote Identidade, com manual de normas de 12 páginas e papelaria completa, custa ${kz(brandingTiers[1].price.AOA)}. Identidades corporativas para empresas maiores começam em ${kz(brandingTiers[2].price.AOA)}.`,
    },
    {
        q: "Quanto custa a gestão de redes sociais?",
        a: `A gestão de redes sociais começa em ${kz(socialTiers[0].price.AOA)} por mês, com 12 publicações incluindo 4 reels em 2 plataformas. O plano Crescimento custa ${kz(socialTiers[1].price.AOA)} por mês e acrescenta gestão de anúncios pagos, LinkedIn e resposta à comunidade. O investimento em anúncios é pago à parte, diretamente à plataforma.`,
    },
    {
        q: "Existe um pacote com branding e website juntos?",
        a: `Sim. O pacote ${ptBundle.name} junta o Branding Identidade e um website Pequena Empresa de 10 páginas por ${kz(launchBundle.price.AOA)}, em vez de ${kz(launchBundle.separately.AOA)} em separado. Foi pensado para dar a uma empresa uma imagem profissional, pronta para concursos, em cerca de 30 dias.`,
    },
    {
        q: "Em que países e línguas trabalha a Autisync?",
        a: "A Autisync trabalha com clientes em Angola, na Namíbia, no Reino Unido e em Portugal, em português e inglês. Os websites podem ser bilingues (português e inglês) a pedido.",
    },
];

export const ptFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "pt",
    mainEntity: ptFaq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
    })),
};
