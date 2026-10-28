import type { Metadata } from "next";
import CountryLanding, { type CountryCopy } from "@/app/components/CountryLanding";
import { formatPrice, websiteTiers } from "@/lib/website-packages";

// A página de Portugal, com preços em euros, para pesquisas como
// "criação de sites preço fixo" ou "site para pequena empresa".
const URL = "https://www.autisync.com/pt/portugal";
const from = formatPrice(websiteTiers[0].price.EUR, "EUR");

export const metadata: Metadata = {
    title: "Criação de Sites em Portugal, com Preço Fechado",
    description: `Sites para pequenas empresas desde ${from}, com preço fechado, domínio .pt, alojamento e e-mails incluídos no 1.º ano. Feitos para o telemóvel e o Google.`,
    alternates: { canonical: URL },
    openGraph: {
        title: "Criação de Sites em Portugal — Autisync",
        description: `Sites rápidos, adaptados a telemóvel e ligados a um CRM, com preço fechado desde ${from}.`,
        url: URL,
        locale: "pt_PT",
        type: "website",
    },
};

const copy: CountryCopy = {
    lang: "pt",
    currency: "EUR",
    market: "pt",
    url: URL,
    city: "Lisboa, Porto e todo o país",
    country: "Portugal",
    phone: { display: "+44 7795 866571", href: "tel:+447795866571" },
    h1: "Criação de sites para pequenas empresas em Portugal, com preço fechado",
    intro:
        "Fazemos sites para pequenas empresas de todo o país: rápidos no telemóvel, fáceis de encontrar no Google e ligados a um CRM, para que cada pedido de orçamento chegue a quem tem de responder. Recebe um orçamento fechado antes de começarmos, e o domínio, o alojamento e os e-mails profissionais estão incluídos no primeiro ano.",
    primaryCta: { label: "Marcar uma chamada grátis de 15 minutos", href: "/pt/marcar" },
    secondaryCta: { label: "Ver preços", href: "/pt/precos?market=pt" },
    whyTitle: "O que muda com um site feito por nós",
    why: [
        {
            title: "Preço fechado em euros",
            text: "Sabe quanto paga antes de começarmos. Sem horas que se vão somando nem custos escondidos no domínio ou no alojamento.",
        },
        {
            title: "Pensado para o telemóvel",
            text: "A maioria dos seus clientes encontra-o no telemóvel. Páginas leves, que abrem depressa, com o telefone e o WhatsApp à distância de um toque.",
        },
        {
            title: "Contactos que não se perdem",
            text: "Cada formulário entra no CRM e avisa a sua equipa, e o cliente pode falar consigo por WhatsApp a partir de qualquer página.",
        },
        {
            title: "E-mail com o nome da empresa",
            text: "geral@asuaempresa.pt em vez de um Gmail: de 5 a 100 contas, conforme o pacote, configuradas por nós.",
        },
        {
            title: "SEO local",
            text: "Estrutura, títulos e dados do negócio preparados para aparecer quando alguém pesquisa o seu serviço na sua cidade, prontos a ligar ao seu Perfil de Empresa no Google.",
        },
        {
            title: "Uma pessoa da nossa equipa",
            text: "Tratamos da configuração. Depois, fala com uma pessoa da nossa equipa, com nome, por WhatsApp, telefone ou e-mail, nos dias úteis, das 9h00 às 18h00.",
        },
    ],
    clientsTitle: "Empresas que já trabalham connosco",
    pricesTitle: "Quanto custa um site em Portugal",
    pricesIntro:
        "Três pacotes, todos com domínio, alojamento, certificado SSL e e-mails profissionais no primeiro ano. Os preços são o ponto de partida; o orçamento final depende do número de páginas e das funcionalidades, e fica fechado antes de começarmos.",
    from: "Desde",
    mostPopular: "Mais escolhido",
    careNote: (care) =>
        `A partir do 2.º ano, o plano de manutenção (alojamento, e-mail, cópias de segurança, atualizações e 2 horas de alterações por mês) custa ${care} por mês.`,
    pricesTerms:
        "Sem fidelização de 12 meses: o plano de manutenção é mensal e cancela-se com 30 dias de aviso, por e-mail ou na sua conta. Avisamos 30 dias antes de o domínio renovar.",
    allPrices: { label: "Ver todos os pacotes e detalhes", href: "/pt/precos?market=pt" },
    servicesTitle: "Além do site",
    services: [
        {
            title: "Clínicas e salões",
            text: "Marcações online, WhatsApp com resposta imediata e pedidos de avaliação.",
            href: "/pt/clinicas",
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
            text: "Contactos, orçamentos, faturas e WhatsApp num só lugar, com preço por empresa e não por utilizador.",
            href: "/pt/crm",
        },
    ],
    stepsTitle: "Como trabalhamos",
    steps: [
        { title: "Conversa inicial", text: "Percebemos o seu negócio, os seus clientes e o que o site tem de conseguir." },
        { title: "Orçamento fechado e design", text: "Recebe o preço fechado e o primeiro desenho das páginas para aprovar." },
        { title: "Construção", text: "Escrevemos, construímos e ligamos o site ao domínio, ao e-mail e ao CRM." },
        { title: "Lançamento", text: "Publicamos, registamos no Google e ensinamos a sua equipa a usar tudo." },
    ],
    faqTitle: "Perguntas frequentes",
    faq: [
        {
            q: "Quanto custa criar um site para uma pequena empresa em Portugal?",
            a: `Os nossos pacotes começam em ${from} (Startup, até 6 páginas). O pacote Pequena Empresa custa ${formatPrice(websiteTiers[1].price.EUR, "EUR")} e o Enterprise ${formatPrice(websiteTiers[2].price.EUR, "EUR")}. Todos incluem domínio, alojamento e e-mails no primeiro ano. Pode ter uma ideia do valor do seu site com o nosso simulador grátis.`,
        },
        {
            q: "O preço é mesmo fechado?",
            a: "Sim. Acertamos primeiro as páginas e as funcionalidades e o preço fica escrito na proposta. Só muda se pedir algo que não estava lá, e nesse caso orçamentamos antes de fazer.",
        },
        {
            q: "Quanto tempo demora a fazer o site?",
            a: "O pacote Startup é entregue em 19 dias, o Pequena Empresa em 28 dias e o Enterprise em cerca de 62 dias, contados a partir do momento em que temos os textos e as imagens.",
        },
        {
            q: "Posso ter um domínio .pt?",
            a: "Sim. Tratamos do registo do domínio .pt ou .com em nome da sua empresa e do primeiro ano de renovação. Se já tiver um, ligamo-lo ao site.",
        },
        {
            q: "O site aparece no Google?",
            a: "Todos os pacotes incluem SEO (básico no Startup, avançado nos outros): títulos, descrições, velocidade, dados da empresa e envio do site para o Google. Para aparecer à frente da concorrência em pesquisas locais disputadas, recomendamos também o serviço de SEO e marketing.",
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
            q: "Trabalham fora de Lisboa?",
            a: "Sim. Trabalhamos com empresas de todo o país, incluindo os Açores e a Madeira; as reuniões são por videochamada, telefone ou WhatsApp.",
        },
    ],
    ctaTitle: "Pronto para ter um site que traz clientes?",
    ctaText: "Marque uma chamada grátis de 15 minutos e mostramos-lhe o que faríamos para o seu negócio, ou fale connosco por WhatsApp.",
    whatsappText: "Olá Autisync, vi a página de criação de sites em Portugal e tenho interesse no pacote {tier} {price}.",
};

export default function PortugalPage() {
    return <CountryLanding c={copy} />;
}
