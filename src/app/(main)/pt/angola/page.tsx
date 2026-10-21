import type { Metadata } from "next";
import CountryLanding, { type CountryCopy } from "@/app/components/CountryLanding";
import { formatPrice, websiteTiers } from "@/lib/website-packages";

const URL = "https://www.autisync.com/pt/angola";
const from = formatPrice(websiteTiers[0].price.AOA, "AOA");

export const metadata: Metadata = {
    title: "Criação de Sites em Angola (Luanda)",
    description: `Criação de sites profissionais em Luanda e em todo o país, com domínio .ao ou .com, alojamento e e-mails incluídos no 1.º ano. Preços em Kwanzas, desde ${from}.`,
    alternates: { canonical: URL },
    openGraph: {
        title: "Criação de Sites em Angola — Autisync",
        description: `Sites rápidos, adaptados a telemóvel e ligados a um CRM, com preços em Kwanzas desde ${from}.`,
        url: URL,
        locale: "pt_AO",
        type: "website",
    },
};

const copy: CountryCopy = {
    lang: "pt",
    currency: "AOA",
    market: "ao",
    url: URL,
    city: "Luanda",
    country: "Angola",
    phone: { display: "(+244) 927 114 400", href: "tel:+244927114400" },
    h1: "Criação de sites em Angola, com preços em Kwanzas",
    intro:
        "Fazemos sites para empresas de Luanda e de todo o país: rápidos no telemóvel, fáceis de encontrar no Google e ligados a um CRM, para que cada pedido de orçamento chegue a quem tem de responder. Domínio, alojamento e e-mails profissionais estão incluídos no primeiro ano.",
    primaryCta: { label: "Fazer o diagnóstico grátis", href: "/pt/diagnostico" },
    secondaryCta: { label: "Ver preços", href: "/pt/precos?market=ao" },
    whyTitle: "O que muda com um site feito por nós",
    why: [
        {
            title: "Preço fechado em Kwanzas",
            text: "Sabe quanto paga antes de começarmos. Sem conversões de última hora nem custos escondidos no domínio ou no alojamento.",
        },
        {
            title: "Pensado para o telemóvel",
            text: "A maioria dos seus clientes vai abrir o site no telemóvel, muitas vezes com dados móveis. Páginas leves, que abrem depressa.",
        },
        {
            title: "Contactos que não se perdem",
            text: "Cada formulário entra no CRM e avisa a sua equipa, e o cliente pode falar consigo por WhatsApp a partir de qualquer página.",
        },
        {
            title: "E-mail com o nome da empresa",
            text: "geral@asuaempresa.co.ao em vez de um Gmail: de 5 a 100 contas, conforme o pacote, configuradas por nós.",
        },
        {
            title: "SEO local",
            text: "Estrutura, títulos e dados do negócio preparados para aparecer quando alguém pesquisa o seu serviço em Luanda ou na sua província.",
        },
        {
            title: "Uma pessoa da nossa equipa",
            text: "Tratamos da configuração. Depois, fala com uma pessoa da nossa equipa, com nome, por WhatsApp, telefone ou e-mail, nos dias úteis, das 9h00 às 18h00 (hora de Lisboa).",
        },
    ],
    clientsTitle: "Empresas que já trabalham connosco",
    pricesTitle: "Quanto custa um site em Angola",
    pricesIntro:
        "Três pacotes, todos com domínio, alojamento, certificado SSL e e-mails profissionais no primeiro ano. Os preços são o ponto de partida; o orçamento final depende do número de páginas e das funcionalidades.",
    from: "Desde",
    mostPopular: "Mais escolhido",
    careNote: (care) =>
        `A partir do 2.º ano, o plano de manutenção (alojamento, e-mail, cópias de segurança, atualizações e 2 horas de alterações por mês) custa ${care} por mês.`,
    pricesTerms:
        "Paga em Kwanzas. Sem fidelização de 12 meses: o plano de manutenção é mensal e cancela-se com 30 dias de aviso, por e-mail ou na sua conta. Avisamos 30 dias antes de o domínio renovar.",
    allPrices: { label: "Ver todos os pacotes e detalhes", href: "/pt/precos?market=ao" },
    servicesTitle: "Além do site",
    services: [
        {
            title: "Desenvolvimento web",
            text: "Sites institucionais, lojas online e páginas de captação de clientes.",
            href: "/pt/servicos/desenvolvimento",
        },
        {
            title: "SEO e marketing digital",
            text: "Gestão de redes sociais, anúncios e conteúdos para atrair mais pedidos.",
            href: "/pt/servicos/seo-marketing",
        },
        {
            title: "Design gráfico e marca",
            text: "Logótipo, identidade visual e materiais para redes sociais.",
            href: "/pt/servicos/design-grafico",
        },
        {
            title: "CRM Autisync",
            text: "Contactos, orçamentos e WhatsApp num só lugar, para não perder clientes. Faturação certificada AGT: em certificação.",
            href: "/pt/crm",
        },
    ],
    stepsTitle: "Como trabalhamos",
    steps: [
        { title: "Conversa inicial", text: "Percebemos o seu negócio, os seus clientes e o que o site tem de conseguir." },
        { title: "Proposta e design", text: "Recebe o orçamento fechado e o primeiro desenho das páginas para aprovar." },
        { title: "Construção", text: "Escrevemos, construímos e ligamos o site ao domínio, ao e-mail e ao CRM." },
        { title: "Lançamento", text: "Publicamos, registamos no Google e ensinamos a sua equipa a usar tudo." },
    ],
    faqTitle: "Perguntas frequentes",
    faq: [
        {
            q: "Quanto custa criar um site em Angola?",
            a: `Os nossos pacotes começam em ${from} (Startup, até 6 páginas). O pacote Pequena Empresa custa ${formatPrice(websiteTiers[1].price.AOA, "AOA")} e o Enterprise ${formatPrice(websiteTiers[2].price.AOA, "AOA")}. Todos incluem domínio, alojamento e e-mails no primeiro ano.`,
        },
        {
            q: "Quanto tempo demora a fazer o site?",
            a: "O pacote Startup é entregue em 19 dias, o Pequena Empresa em 28 dias e o Enterprise em cerca de 62 dias, contados a partir do momento em que temos os textos e as imagens.",
        },
        {
            q: "Posso ter um domínio .ao ou .co.ao?",
            a: "Sim. Tratamos do registo do domínio .ao, .co.ao ou .com em nome da sua empresa, e do primeiro ano de renovação.",
        },
        {
            q: "O site aparece no Google?",
            a: "Todos os pacotes incluem SEO (básico no Startup, avançado nos outros): títulos, descrições, velocidade, dados da empresa e envio do site para o Google. Para aparecer à frente da concorrência em pesquisas disputadas, recomendamos também o serviço de SEO e marketing.",
        },
        {
            q: "Como se paga?",
            a: "Em Kwanzas. As condições de pagamento ficam escritas na proposta, antes de começarmos. Site, domínio, e-mail e CRM vêm numa só conta, de um só parceiro.",
        },
        {
            q: "Fico preso a um contrato?",
            a: "Não há fidelização de 12 meses. O site paga-se uma vez; a partir do 2.º ano, o plano de manutenção é mensal e cancela-se com 30 dias de aviso, por e-mail ou na sua conta. Avisamos 30 dias antes de qualquer renovação anual, como a do domínio.",
        },
        {
            q: "O site, o domínio e os dados são meus?",
            a: "Sim. O domínio fica em nome da sua empresa, e o site e os dados são seus. Pode exportar os contactos e registos para Excel ou CSV quando quiser; se sair, entregamos-lhe tudo em 30 dias.",
        },
        {
            q: "O CRM emite faturas certificadas pela AGT?",
            a: "Ainda não. A faturação certificada AGT está em certificação e não a vendemos antes de a certificação estar concluída. Até lá, o site, o WhatsApp e o CRM (contactos, orçamentos e seguimento) funcionam já.",
        },
        {
            q: "Atendem fora de Luanda?",
            a: "Sim. Trabalhamos com empresas de todo o país; as reuniões podem ser por videochamada, telefone ou WhatsApp.",
        },
    ],
    ctaTitle: "Pronto para ter um site que traz clientes?",
    ctaText: "Faça o diagnóstico grátis de 1 minuto e receba uma recomendação para o seu negócio, ou fale connosco por WhatsApp.",
    whatsappText: "Olá Autisync, vi a página de criação de sites em Angola e tenho interesse no pacote {tier} {price}.",
};

export default function AngolaPage() {
    return <CountryLanding c={copy} />;
}
