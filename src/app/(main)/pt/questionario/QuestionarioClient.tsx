"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TurnstileWidget from "@/app/components/TurnstileWidget";

// ─── Constants ────────────────────────────────────────────────────────────────

const GOLD = "#b98b2f";
const GOLD_DARK = "#7a5a1d";
const GOLD_LIGHT = "#d1a94c";

// ─── Types ────────────────────────────────────────────────────────────────────

type FieldType = "text" | "textarea" | "select" | "multiselect" | "radio" | "email" | "tel" | "url";

interface Field {
    id: string;
    label: string;
    type: FieldType;
    placeholder?: string;
    options?: string[];
    required?: boolean;
    hint?: string;
}

interface Section {
    title: string;
    fields: Field[];
}

interface Questionnaire {
    id: string;
    title: string;
    tagline: string;
    subtitle: string;
    description: string;
    sections: Section[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
// Portuguese copy of the English questionnaires. Field `id`s and questionnaire
// `id`s are identical to the English version (the API and spam check read them);
// only labels, options and placeholders are translated.

const questionnaires: Questionnaire[] = [
    {
        id: "graphic-design",
        title: "Questionário de Design Gráfico",
        tagline: "Queremos estar 100% alinhados consigo desde o início.",
        subtitle: "Marca e Identidade Visual",
        description: "Fale-nos da sua marca, das suas preferências de estilo e do que considera um bom resultado para os seus materiais visuais.",
        sections: [
            {
                title: "Sobre a Sua Marca",
                fields: [
                    { id: "brand_name", label: "Nome da marca / empresa", type: "text", placeholder: "ex.: Autisync Studio", required: true },
                    { id: "industry", label: "Setor de atividade", type: "text", placeholder: "ex.: Tecnologia, Moda, Saúde", required: true },
                    { id: "brand_description", label: "Descreva a sua marca em poucas frases", type: "textarea", placeholder: "O que faz, a quem se dirige e o que a distingue?", required: true },
                    { id: "target_audience", label: "Qual é o seu público-alvo?", type: "textarea", placeholder: "Faixa etária, interesses, localização, mentalidade..." },
                    { id: "competitors", label: "Indique 2–3 concorrentes ou marcas que admira", type: "textarea", placeholder: "Inclua links, se possível" },
                ],
            },
            {
                title: "Requisitos de Design",
                fields: [
                    { id: "deliverables", label: "De que materiais precisa?", type: "multiselect", options: ["Logótipo", "Manual de normas", "Cartões de visita", "Papel timbrado", "Kit para redes sociais", "Brochura / flyer", "Apresentação", "Embalagem", "Sinalética / banners", "Outro"] },
                    { id: "style", label: "Que estilo visual combina com a sua marca?", type: "multiselect", options: ["Minimalista e limpo", "Arrojado e moderno", "Luxuoso e requintado", "Divertido e enérgico", "Corporativo e profissional", "Retro / vintage", "Orgânico e natural", "Futurista / tecnológico"] },
                    { id: "colors_existing", label: "Já tem cores de marca definidas?", type: "radio", options: ["Sim — vou partilhá-las", "Não — preciso de ajuda a escolher", "Em parte — aberto a ajustes"] },
                    { id: "colors_notes", label: "Preferências de cor ou códigos hex", type: "text", placeholder: "#B98B2F, dourado + tons escuros..." },
                    { id: "fonts_existing", label: "Já tem tipos de letra / tipografia definidos?", type: "radio", options: ["Sim", "Não", "Não tenho a certeza"] },
                    { id: "avoid", label: "Há algo que queira mesmo evitar?", type: "textarea", placeholder: "Estilos, cores ou referências que não combinam com a sua marca..." },
                ],
            },
            {
                title: "Contexto do Projeto",
                fields: [
                    { id: "usage", label: "Onde vão ser usados os designs?", type: "multiselect", options: ["Digital / web", "Impressão", "Redes sociais", "Publicidade exterior / sinalética", "Embalagem de produto", "Vídeo / motion"] },
                    { id: "timeline", label: "Qual é o prazo de entrega ideal?", type: "select", options: ["O mais rápido possível (urgente)", "Dentro de 1 semana", "2–3 semanas", "1 mês ou mais", "Flexível"] },
                    { id: "budget", label: "Orçamento aproximado (moeda local)", type: "select", options: ["Menos de 500", "500 - 1.500", "1.500 - 5.000", "5.000+", "A combinar"] },
                    { id: "inspiration", label: "Partilhe links de inspiração, moodboards ou referências", type: "textarea", placeholder: "URLs, painéis do Pinterest, trabalhos no Dribbble..." },
                    { id: "extra", label: "Há mais alguma coisa que devamos saber?", type: "textarea", placeholder: "Contexto, restrições, pessoas envolvidas na decisão..." },
                ],
            },
            {
                title: "Contacto",
                fields: [
                    { id: "contact_name", label: "Nome completo", type: "text", placeholder: "Ana Silva", required: true },
                    { id: "contact_email", label: "Endereço de email", type: "email", placeholder: "ana@empresa.com", required: true },
                    { id: "contact_phone", label: "Telemóvel / WhatsApp", type: "tel", placeholder: "+244 900 000 000" },
                    { id: "contact_company", label: "Nome da empresa / projeto", type: "text", placeholder: "Se for diferente do indicado acima" },
                ],
            },
        ],
    },
    {
        id: "web-app",
        title: "Questionário de Aplicação/Website",
        tagline: "Para garantir que percebemos bem as suas necessidades.",
        subtitle: "Desenvolvimento de Produtos Digitais",
        description: "Partilhe os seus objetivos, o seu público-alvo e as funcionalidades de que precisa, para planearmos a experiência digital ideal.",
        sections: [
            {
                title: "Visão Geral do Projeto",
                fields: [
                    { id: "project_name", label: "Nome do projeto / produto", type: "text", placeholder: "ex.: A Minha Plataforma SaaS", required: true },
                    { id: "project_type", label: "O que pretende construir?", type: "radio", options: ["Website institucional / de marketing", "Loja online", "Aplicação web (SaaS/portal)", "Aplicação móvel", "Landing page", "Redesign de um website existente", "Outro"] },
                    { id: "project_description", label: "Descreva o seu projeto em detalhe", type: "textarea", placeholder: "Que problema resolve? Qual é o percurso principal do utilizador?", required: true },
                    { id: "existing_url", label: "URL do website atual (em caso de redesign)", type: "url", placeholder: "https://oseusite.com" },
                ],
            },
            {
                title: "Público e Objetivos",
                fields: [
                    { id: "target_users", label: "Quem são os seus principais utilizadores?", type: "textarea", placeholder: "Idade, profissão, à-vontade com tecnologia, localização, objetivos..." },
                    { id: "primary_goal", label: "Qual é o principal objetivo deste projeto?", type: "select", options: ["Gerar contactos/leads", "Vender produtos / serviços", "Dar a conhecer a marca", "Servir clientes atuais", "Automatizar um processo", "Lançar um MVP", "Outro"] },
                    { id: "success_metrics", label: "Como vai medir o sucesso?", type: "multiselect", options: ["Tráfego / visitantes", "Taxa de conversão", "Registos / contactos", "Receita", "Envolvimento / tempo no site", "Downloads da aplicação", "Satisfação dos clientes (NPS)", "Outro"] },
                    { id: "competitors_url", label: "Websites de concorrentes ou de referência de que gosta", type: "textarea", placeholder: "Indique os URLs e o que gosta em cada um" },
                ],
            },
            {
                title: "Funcionalidades",
                fields: [
                    { id: "features", label: "De que funcionalidades precisa?", type: "multiselect", options: ["Formulário de contacto", "Blog / CMS", "Login / contas de utilizador", "Painel de administração", "Marcações / calendário", "Pagamentos online", "Catálogo de produtos", "Pesquisa e filtros", "Integrações via API", "Multilingue", "Estatísticas (analytics)", "Chat ao vivo", "Subscrição de newsletter", "Outro"] },
                    { id: "cms", label: "Quer editar os conteúdos por conta própria?", type: "radio", options: ["Sim — quero um CMS", "Não — a equipa trata disso", "Não tenho a certeza"] },
                    { id: "integrations", label: "Há ferramentas / plataformas a integrar?", type: "textarea", placeholder: "ex.: Stripe, HubSpot, Zapier, Google Analytics, Mailchimp..." },
                    { id: "tech_preference", label: "Preferências tecnológicas (se tiver)", type: "textarea", placeholder: "ex.: Next.js, WordPress, Webflow, React Native..." },
                ],
            },
            {
                title: "Design e Entrega",
                fields: [
                    { id: "design_style", label: "Estilo de design preferido", type: "multiselect", options: ["Minimalista / limpo", "Arrojado / moderno", "Corporativo / de confiança", "Criativo / editorial", "Escuro / premium", "Vivo / enérgico"] },
                    { id: "brand_assets", label: "Já tem os elementos da marca prontos?", type: "radio", options: ["Sim — logótipo, cores e tipos de letra prontos", "Em parte — já existem alguns elementos", "Não — vamos começar do zero"] },
                    { id: "pages_count", label: "Número estimado de páginas / ecrãs", type: "select", options: ["1–5", "6–15", "16–30", "30+", "Ainda não sei"] },
                    { id: "timeline", label: "Data de lançamento / prazo pretendido", type: "select", options: ["O mais rápido possível", "1 mês", "2–3 meses", "3–6 meses", "Flexível"] },
                    { id: "budget", label: "Orçamento (moeda local)", type: "select", options: ["Menos de 1.000", "1.000 - 5.000", "5.000 - 15.000", "15.000+", "A combinar"] },
                ],
            },
            {
                title: "Contacto",
                fields: [
                    { id: "contact_name", label: "Nome completo", type: "text", placeholder: "Ana Silva", required: true },
                    { id: "contact_email", label: "Endereço de email", type: "email", placeholder: "ana@empresa.com", required: true },
                    { id: "contact_phone", label: "Telemóvel / WhatsApp", type: "tel", placeholder: "+244 900 000 000" },
                    { id: "extra", label: "Há mais alguma coisa que devamos saber?", type: "textarea", placeholder: "Restrições, pessoas envolvidas, inspiração..." },
                ],
            },
        ],
    },
    {
        id: "social-media",
        title: "Gestão de Redes Sociais",
        tagline: "Fale-nos dos seus canais e das suas preferências de conteúdo.",
        subtitle: "Gestão de Conteúdos e Canais",
        description: "Ajude-nos a perceber o seu tom de comunicação, a frequência de publicação e o tipo de conteúdo de que o seu público mais gosta.",
        sections: [
            {
                title: "A Voz da Sua Marca",
                fields: [
                    { id: "brand_name", label: "Nome da marca / empresa", type: "text", placeholder: "ex.: Autisync", required: true },
                    { id: "brand_description", label: "O que faz a sua marca?", type: "textarea", placeholder: "Breve descrição do seu produto/serviço e do que o torna único", required: true },
                    { id: "tone", label: "Como descreveria o tom de comunicação da sua marca?", type: "multiselect", options: ["Profissional", "Simpático e acessível", "Espirituoso e divertido", "Inspirador", "Educativo", "Luxuoso / exclusivo", "Ousado e irreverente", "Empático e atencioso"] },
                    { id: "tone_avoid", label: "Tons ou temas a evitar", type: "textarea", placeholder: "ex.: evitar conteúdo político, sem calão, nunca agressivo..." },
                ],
            },
            {
                title: "Canais e Público",
                fields: [
                    { id: "channels", label: "Que plataformas quer que geremos?", type: "multiselect", options: ["Instagram", "Facebook", "LinkedIn", "TikTok", "X (Twitter)", "YouTube", "Pinterest", "Threads", "Outra"] },
                    { id: "current_following", label: "Número atual de seguidores (aproximado)", type: "textarea", placeholder: "ex.: Instagram: 1.200 | LinkedIn: 400 | TikTok: 0" },
                    { id: "target_audience", label: "Quem é o seu seguidor ideal nas redes sociais?", type: "textarea", placeholder: "Idade, interesses, profissão, localização, dificuldades..." },
                    { id: "audience_goal", label: "Principal objetivo junto do público", type: "radio", options: ["Ganhar seguidores / notoriedade", "Levar tráfego para o website", "Gerar contactos/vendas diretas", "Criar comunidade e envolvimento", "Afirmar-se como referência no setor"] },
                ],
            },
            {
                title: "Estratégia de Conteúdo",
                fields: [
                    { id: "content_types", label: "Que tipos de conteúdo funcionam para a sua marca?", type: "multiselect", options: ["Dicas educativas", "Bastidores", "Apresentação de produtos / serviços", "Testemunhos de clientes", "Equipa / cultura", "Notícias do setor", "Promoções e ofertas", "Conteúdo criado pelos utilizadores", "Reels / vídeos curtos", "Vídeos longos", "Carrosséis / infografias"] },
                    { id: "posting_frequency", label: "Com que frequência quer publicar?", type: "select", options: ["Diariamente", "5x por semana", "3–4x por semana", "1–2x por semana", "A definir"] },
                    { id: "content_provided", label: "Vai fornecer conteúdo em bruto (fotos, vídeos)?", type: "radio", options: ["Sim — eu forneço os materiais", "Não — vocês tratam de tudo", "Misto — alguns nossos, outros criados por vocês"] },
                    { id: "competitors_social", label: "Contas de concorrentes ou marcas que admira nas redes sociais", type: "textarea", placeholder: "@contas ou URLs" },
                    { id: "campaigns", label: "Tem campanhas, lançamentos ou eventos previstos?", type: "textarea", placeholder: "Datas, lançamentos de produtos, promoções sazonais..." },
                ],
            },
            {
                title: "Objetivos e Orçamento",
                fields: [
                    { id: "kpis", label: "Que indicadores (KPIs) são mais importantes para si?", type: "multiselect", options: ["Crescimento de seguidores", "Alcance e impressões", "Taxa de envolvimento", "Cliques / tráfego", "Mensagens / pedidos de informação", "Conversões em vendas", "Perceção da marca"] },
                    { id: "paid_ads", label: "Quer incluir anúncios pagos nas redes sociais?", type: "radio", options: ["Sim", "Não", "Talvez — vamos conversar"] },
                    { id: "reporting", label: "Com que frequência quer receber relatórios de desempenho?", type: "select", options: ["Semanalmente", "Quinzenalmente", "Mensalmente", "Trimestralmente"] },
                    { id: "budget", label: "Orçamento mensal (moeda local)", type: "select", options: ["Menos de 500", "500 - 1.500", "1.500 - 3.000", "3.000+", "A combinar"] },
                ],
            },
            {
                title: "Contacto",
                fields: [
                    { id: "contact_name", label: "Nome completo", type: "text", placeholder: "Ana Silva", required: true },
                    { id: "contact_email", label: "Endereço de email", type: "email", placeholder: "ana@empresa.com", required: true },
                    { id: "contact_phone", label: "Telemóvel / WhatsApp", type: "tel", placeholder: "+244 900 000 000" },
                    { id: "extra", label: "Há mais alguma coisa que devamos saber?", type: "textarea", placeholder: "Acessos às contas, onde está o manual de normas, exemplos de conteúdos anteriores..." },
                ],
            },
        ],
    },
    {
        id: "tech-support",
        title: "Suporte Técnico e Manutenção",
        tagline: "Que tipo de suporte contínuo espera?",
        subtitle: "Infraestrutura e Suporte de TI",
        description: "De atualizações a monitorização, diga-nos que nível de cobertura técnica pretende que lhe ofereçamos.",
        sections: [
            {
                title: "A Sua Configuração Atual",
                fields: [
                    { id: "business_name", label: "Nome da empresa / organização", type: "text", placeholder: "ex.: Acme, Lda.", required: true },
                    { id: "website_url", label: "URL do(s) website(s)", type: "url", placeholder: "https://oseusite.com" },
                    { id: "tech_stack", label: "Que tecnologias utiliza?", type: "multiselect", options: ["WordPress", "Next.js / React", "Webflow", "Shopify", "Código à medida", "PHP / Laravel", "Node.js", "Python / Django", "Não tenho a certeza"] },
                    { id: "hosting", label: "Fornecedor de alojamento atual", type: "text", placeholder: "ex.: Vercel, AWS, Hetzner, Hostinger..." },
                    { id: "team_size", label: "Quantas pessoas da sua equipa usam sistemas informáticos?", type: "select", options: ["1–5", "6–20", "21–50", "50+"] },
                    { id: "current_issues", label: "Que problemas está a ter neste momento?", type: "textarea", placeholder: "Site lento, preocupações de segurança, falhas frequentes, sem cópias de segurança..." },
                ],
            },
            {
                title: "Âmbito do Suporte",
                fields: [
                    { id: "services_needed", label: "De que serviços de suporte precisa?", type: "multiselect", options: ["Atualizações e alterações ao website", "Correção de erros", "Otimização de desempenho", "Monitorização de segurança", "Cópias de segurança diárias/semanais", "Gestão de domínio e alojamento", "Certificados SSL", "Instalação e configuração de equipamentos", "Helpdesk / apoio aos utilizadores", "Instalação de software", "Configuração de email (Google Workspace / M365)", "Gestão de bases de dados", "Integrações via API", "Outro"] },
                    { id: "response_time", label: "Tempo de resposta esperado para problemas", type: "radio", options: ["Até 1 hora (crítico)", "No mesmo dia útil", "Até 48 horas", "Semanalmente, em lote — sem urgência"] },
                    { id: "support_hours", label: "Horário de suporte necessário", type: "radio", options: ["Horário de expediente (seg–sex, 9h–18h)", "Alargado (seg–sex, 8h–20h)", "Inclui fins de semana", "24/7"] },
                    { id: "monitoring", label: "Quer monitorização proativa da disponibilidade?", type: "radio", options: ["Sim — avisem-me se algo for abaixo", "Não — só quando houver problemas", "Não tenho a certeza"] },
                ],
            },
            {
                title: "Segurança e Conformidade",
                fields: [
                    { id: "gdpr", label: "Trata dados pessoais/de clientes?", type: "radio", options: ["Sim — preciso de conformidade com o RGPD / proteção de dados", "Apenas dados mínimos", "Não tenho a certeza"] },
                    { id: "backups_current", label: "Tem atualmente uma estratégia de cópias de segurança?", type: "radio", options: ["Sim", "Não", "Em parte / não tenho a certeza"] },
                    { id: "security_incidents", label: "Já teve problemas de segurança?", type: "radio", options: ["Sim — ataques, malware, fugas de dados", "Não", "Suspeitas, mas nada confirmado"] },
                    { id: "access_control", label: "Tem requisitos especiais de controlo de acessos?", type: "textarea", placeholder: "ex.: autenticação de dois fatores, acessos por perfil, VPN..." },
                ],
            },
            {
                title: "Contrato e Orçamento",
                fields: [
                    { id: "contract_type", label: "Modalidade preferida", type: "radio", options: ["Avença mensal", "Pagamento por ocorrência", "Contrato anual", "Por projeto", "Ainda não sei"] },
                    { id: "budget", label: "Orçamento mensal (moeda local)", type: "select", options: ["Menos de 200", "200 - 500", "500 - 1.500", "1.500+", "A combinar"] },
                    { id: "start_date", label: "Quando precisa que o suporte comece?", type: "select", options: ["Imediatamente", "Dentro de 2 semanas", "No próximo mês", "Flexível"] },
                    { id: "extra", label: "Mais algum contexto ou requisito?", type: "textarea", placeholder: "Contratos existentes, documentação, diagramas dos sistemas..." },
                ],
            },
            {
                title: "Contacto",
                fields: [
                    { id: "contact_name", label: "Nome completo", type: "text", placeholder: "Ana Silva", required: true },
                    { id: "contact_email", label: "Endereço de email", type: "email", placeholder: "ana@empresa.com", required: true },
                    { id: "contact_phone", label: "Telemóvel / WhatsApp", type: "tel", placeholder: "+244 900 000 000" },
                    { id: "contact_role", label: "O seu cargo / função", type: "text", placeholder: "ex.: Diretor de TI, Gestor de Operações, Proprietário" },
                ],
            },
        ],
    },
    {
        id: "ecommerce",
        title: "Criação de Loja Online",
        tagline: "Diga-nos o que pretende para a sua loja online.",
        subtitle: "Desenvolvimento de Lojas Online",
        description: "Produtos, envios, pagamentos e percurso do cliente — partilhe o essencial para estruturarmos a sua loja.",
        sections: [
            {
                title: "A Sua Loja",
                fields: [
                    { id: "store_name", label: "Nome da loja / marca", type: "text", placeholder: "ex.: Tchary Glamour", required: true },
                    { id: "store_description", label: "O que vai vender?", type: "textarea", placeholder: "Descreva os seus produtos ou serviços — físicos, digitais ou ambos", required: true },
                    { id: "product_count", label: "Número aproximado de produtos no lançamento", type: "select", options: ["1–10", "11–50", "51–200", "200+", "Ainda não sei"] },
                    { id: "existing_store", label: "Já tem uma loja online?", type: "radio", options: ["Sim — migração / redesign", "Não — vamos começar do zero"] },
                    { id: "existing_url", label: "URL da loja atual (se aplicável)", type: "url", placeholder: "https://asualoja.com" },
                ],
            },
            {
                title: "Produtos e Inventário",
                fields: [
                    { id: "product_types", label: "Tipos de produto", type: "multiselect", options: ["Produtos físicos", "Downloads digitais", "Serviços / marcações", "Subscrições", "Packs / conjuntos", "Personalizados / por encomenda"] },
                    { id: "variants", label: "Os produtos têm variantes?", type: "radio", options: ["Sim (tamanho, cor, etc.)", "Não", "Alguns têm"] },
                    { id: "inventory_management", label: "Precisa de controlo de stock?", type: "radio", options: ["Sim — níveis de stock e alertas de stock baixo", "Não", "Não tenho a certeza"] },
                    { id: "product_images", label: "Já tem fotografias dos produtos?", type: "radio", options: ["Sim", "Não — preciso de orientação", "Em parte"] },
                ],
            },
            {
                title: "Pagamentos e Envios",
                fields: [
                    { id: "payment_methods", label: "Métodos de pagamento a aceitar", type: "multiselect", options: ["Cartão de crédito / débito", "PayPal", "MB Way", "Multibanco", "Apple Pay / Google Pay", "Transferência bancária", "Compre agora, pague depois (Klarna, etc.)", "Criptomoedas"] },
                    { id: "currencies", label: "Moedas a suportar", type: "text", placeholder: "ex.: AOA, EUR, USD" },
                    { id: "shipping_regions", label: "Para onde vai enviar?", type: "multiselect", options: ["Apenas Portugal", "Europa", "Todo o mundo", "Sem envios (digital/local)"] },
                    { id: "shipping_methods", label: "Métodos de envio / transportadoras", type: "textarea", placeholder: "ex.: CTT, DHL, portes grátis acima de 50 €, levantamento em loja..." },
                    { id: "tax", label: "Precisa de gestão de impostos / IVA?", type: "radio", options: ["Sim — IVA português", "Sim — IVA da UE (OSS)", "Sim — impostos internacionais", "Não / não tenho a certeza"] },
                ],
            },
            {
                title: "Experiência do Cliente",
                fields: [
                    { id: "features", label: "Funcionalidades necessárias na loja", type: "multiselect", options: ["Lista de desejos", "Avaliações de produtos", "Chat ao vivo", "Notificações de encomenda por email", "Recuperação de carrinhos abandonados", "Códigos de desconto / vales", "Programa de fidelização / pontos", "Recomendações de produtos", "Multilingue", "Contas de cliente"] },
                    { id: "design_style", label: "Estética preferida para a loja", type: "multiselect", options: ["Minimalista e limpa", "Luxo / topo de gama", "Arrojada e colorida", "Acolhedora e orgânica", "Corporativa / B2B", "Divertida / lifestyle"] },
                    { id: "brand_assets", label: "Elementos da marca prontos?", type: "radio", options: ["Sim — logótipo, cores e tipos de letra", "Em parte", "Não — vamos começar do zero"] },
                    { id: "platform", label: "Plataforma preferida (se tiver)", type: "select", options: ["Shopify", "WooCommerce (WordPress)", "À medida (Next.js)", "Webflow Commerce", "Sem preferência", "Outra"] },
                ],
            },
            {
                title: "Objetivos e Orçamento",
                fields: [
                    { id: "monthly_orders", label: "Encomendas mensais esperadas no lançamento", type: "select", options: ["Menos de 50", "50–200", "200–500", "500+", "Não tenho a certeza"] },
                    { id: "timeline", label: "Data de lançamento pretendida", type: "select", options: ["O mais rápido possível", "Dentro de 1 mês", "1–2 meses", "3 meses ou mais", "Flexível"] },
                    { id: "budget", label: "Orçamento (criação da loja, moeda local)", type: "select", options: ["Menos de 1.000", "1.000 - 3.000", "3.000 - 8.000", "8.000+", "A combinar"] },
                    { id: "extra", label: "Mais alguma coisa a partilhar?", type: "textarea", placeholder: "Dados de fornecedores, requisitos de importação, necessidades de suporte após o lançamento..." },
                ],
            },
            {
                title: "Contacto",
                fields: [
                    { id: "contact_name", label: "Nome completo", type: "text", placeholder: "Ana Silva", required: true },
                    { id: "contact_email", label: "Endereço de email", type: "email", placeholder: "ana@empresa.com", required: true },
                    { id: "contact_phone", label: "Telemóvel / WhatsApp", type: "tel", placeholder: "+244 900 000 000" },
                ],
            },
        ],
    },
    {
        id: "email-marketing",
        title: "Serviços de Email Marketing",
        tagline: "Que tipo de newsletters ou promoções tem em mente?",
        subtitle: "Campanhas e Automação",
        description: "Fale-nos do seu público, da frequência de envio e das suas ofertas, para criarmos fluxos de email com bons resultados.",
        sections: [
            {
                title: "A Sua Marca e Lista",
                fields: [
                    { id: "brand_name", label: "Nome da marca / empresa", type: "text", placeholder: "ex.: Autisync", required: true },
                    { id: "brand_description", label: "O que faz a sua empresa?", type: "textarea", placeholder: "Produtos/serviços, que problema resolve, a sua proposta de valor", required: true },
                    { id: "list_size", label: "Tamanho atual da lista de emails", type: "select", options: ["Ainda não tenho lista", "Menos de 500", "500–2.000", "2.000–10.000", "10.000+"] },
                    { id: "current_platform", label: "Plataforma de email atual (se tiver)", type: "text", placeholder: "ex.: Mailchimp, Klaviyo, Brevo, ainda nenhuma" },
                    { id: "existing_campaigns", label: "Já envia emails atualmente?", type: "radio", options: ["Sim — regularmente", "Sim — de vez em quando / pontualmente", "Não — vamos começar do zero"] },
                ],
            },
            {
                title: "Público e Segmentação",
                fields: [
                    { id: "target_audience", label: "A quem vai enviar os emails?", type: "textarea", placeholder: "Tipos de cliente, interesses, comportamento de compra, dados demográficos..." },
                    { id: "segments", label: "Tem ou precisa de segmentos de público?", type: "radio", options: ["Sim — já tenho segmentos definidos", "Gostaria de ajuda para criar segmentos", "Não preciso de segmentação"] },
                    { id: "list_growth", label: "Como é que os subscritores entram atualmente na sua lista?", type: "multiselect", options: ["Formulário de registo no website", "Oferta gratuita / lead magnet", "Compra / checkout", "Eventos / na loja", "Redes sociais", "Anúncios pagos", "Ainda não tenho um sistema"] },
                ],
            },
            {
                title: "Estratégia de Campanhas",
                fields: [
                    { id: "email_types", label: "Que tipos de email pretende?", type: "multiselect", options: ["Newsletter (novidades regulares)", "Promocionais / vendas", "Série de boas-vindas", "Recuperação de carrinhos abandonados", "Acompanhamento pós-compra", "Reativação de clientes inativos", "Transacionais (encomenda, envio)", "Convites para eventos / webinars", "Campanhas sazonais", "Sequências de nutrição (drip)"] },
                    { id: "frequency", label: "Frequência de envio pretendida", type: "select", options: ["Diariamente", "2–3x por semana", "Semanalmente", "Quinzenalmente", "Mensalmente", "Apenas por campanha"] },
                    { id: "content_focus", label: "Em que se vão focar principalmente os seus emails?", type: "multiselect", options: ["Educativo / dicas", "Anúncios de produtos / serviços", "Descontos e promoções", "Histórias da marca", "Casos de estudo / testemunhos", "Convites para eventos", "Notícias / resumos do setor"] },
                    { id: "tone", label: "Tom de comunicação dos emails", type: "multiselect", options: ["Formal / corporativo", "Próximo e simpático", "Espirituoso e cativante", "Inspirador", "Direto e objetivo", "Luxuoso / requintado"] },
                ],
            },
            {
                title: "Design e Automação",
                fields: [
                    { id: "design_style", label: "Estilo de design de email preferido", type: "multiselect", options: ["Totalmente desenhado (modelos com a marca)", "Mais texto / estilo newsletter", "Minimalista / limpo", "Centrado em imagens / visual", "Texto simples (tom pessoal)"] },
                    { id: "brand_assets", label: "Elementos da marca disponíveis?", type: "radio", options: ["Sim — kit de marca completo", "Em parte — logótipo + cores", "Não — é preciso criar de raiz"] },
                    { id: "automation", label: "Quer fluxos de email automatizados?", type: "radio", options: ["Sim — automação completa", "Algumas automações", "Apenas envios manuais", "Não tenho a certeza"] },
                    { id: "crm_integration", label: "CRM ou ferramentas a integrar?", type: "textarea", placeholder: "ex.: Shopify, HubSpot, Salesforce, Webflow, nenhuma..." },
                ],
            },
            {
                title: "Objetivos e Orçamento",
                fields: [
                    { id: "primary_goal", label: "Principal objetivo do email marketing", type: "radio", options: ["Aumentar vendas / receita", "Transformar contactos em clientes", "Fidelizar e encantar clientes atuais", "Dar a conhecer a marca", "Levar tráfego para o website/blog"] },
                    { id: "kpis", label: "Indicadores (KPIs) que lhe interessam", type: "multiselect", options: ["Taxa de abertura", "Taxa de cliques", "Receita por email", "Taxa de cancelamento de subscrição", "Taxa de conversão", "Crescimento da lista"] },
                    { id: "reporting", label: "Frequência dos relatórios", type: "select", options: ["Após cada envio", "Semanalmente", "Mensalmente", "Trimestralmente"] },
                    { id: "budget", label: "Orçamento mensal (moeda local)", type: "select", options: ["Menos de 300", "300 - 800", "800 - 2.000", "2.000+", "A combinar"] },
                    { id: "extra", label: "Há mais alguma coisa que devamos saber?", type: "textarea", placeholder: "Campanhas anteriores, o que funcionou/não funcionou, requisitos legais (RGPD / proteção de dados)..." },
                ],
            },
            {
                title: "Contacto",
                fields: [
                    { id: "contact_name", label: "Nome completo", type: "text", placeholder: "Ana Silva", required: true },
                    { id: "contact_email", label: "Endereço de email", type: "email", placeholder: "ana@empresa.com", required: true },
                    { id: "contact_phone", label: "Telemóvel / WhatsApp", type: "tel", placeholder: "+244 900 000 000" },
                ],
            },
        ],
    },
];

function FormField({ field, value, onChange, error }: {
    field: Field;
    value: string | string[];
    onChange: (id: string, val: string | string[]) => void;
    error?: string;
}) {
    const base = `w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:ring-2 ${
        error
            ? "border-red-400 focus:border-red-400 focus:ring-red-200"
            : "border-gray-200 focus:border-[#b98b2f] focus:ring-[#b98b2f]/20"
    }`;

    const toggleMulti = (opt: string) => {
        const arr = Array.isArray(value) ? value : [];
        onChange(field.id, arr.includes(opt) ? arr.filter((v) => v !== opt) : [...arr, opt]);
    };

    if (field.type === "multiselect") {
        const arr = Array.isArray(value) ? value : [];
        return (
            <div className={`flex flex-wrap gap-2 rounded-lg p-1 transition-all ${error ? "ring-1 ring-red-300" : ""}`}>
                {field.options!.map((opt) => {
                    const active = arr.includes(opt);
                    return (
                        <button key={opt} type="button" onClick={() => toggleMulti(opt)}
                                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                                    active
                                        ? "border-[#b98b2f] bg-[#b98b2f] text-white shadow-sm"
                                        : "border-gray-200 bg-white text-gray-600 hover:border-[#b98b2f]/50 hover:text-[#b98b2f]"
                                }`}
                        >
                            {opt}
                        </button>
                    );
                })}
            </div>
        );
    }

    if (field.type === "radio") {
        return (
            <div className={`flex flex-col gap-2 rounded-lg p-1 transition-all ${error ? "ring-1 ring-red-300" : ""}`}>
                {field.options!.map((opt) => {
                    const active = value === opt;
                    return (
                        <label key={opt}
                               className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-all duration-200 ${
                                   active
                                       ? "border-[#b98b2f] bg-[#b98b2f]/5 text-gray-900"
                                       : "border-gray-200 bg-white text-gray-700 hover:border-[#b98b2f]/40"
                               }`}
                        >
                            <input type="radio" name={field.id} value={opt} checked={active} onChange={() => onChange(field.id, opt)} className="sr-only" />
                            <span className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${active ? "border-[#b98b2f]" : "border-gray-300"}`}>
                {active && <span className="h-1.5 w-1.5 rounded-full bg-[#b98b2f]" />}
              </span>
                            {opt}
                        </label>
                    );
                })}
            </div>
        );
    }

    if (field.type === "select") {
        return (
            <select value={value as string} onChange={(e) => onChange(field.id, e.target.value)} className={`${base} appearance-none`}>
                <option value="">Selecione uma opção...</option>
                {field.options!.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        );
    }

    if (field.type === "textarea") {
        return (
            <textarea value={value as string} onChange={(e) => onChange(field.id, e.target.value)}
                      placeholder={field.placeholder} rows={3} className={`${base} resize-none`} />
        );
    }

    return (
        <input type={field.type} value={value as string} onChange={(e) => onChange(field.id, e.target.value)}
               placeholder={field.placeholder} className={base} />
    );
}


// ─── Questionnaire Modal ──────────────────────────────────────────────────────

function QuestionnaireModal({ q, onClose }: { q: Questionnaire; onClose: () => void }) {
    const [currentSection, setCurrentSection] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const [website, setWebsite] = useState("");
    const [formStartedAt, setFormStartedAt] = useState<number>(() => Date.now());
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

    const section = q.sections[currentSection];
    const isLast = currentSection === q.sections.length - 1;

    // Lock body scroll while modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    const handleChange = (id: string, val: string | string[]) => {
        setAnswers((prev) => ({ ...prev, [id]: val }));
        if (errors[id]) setErrors((prev) => { const n = { ...prev }; delete n[id]; return n; });
    };

    // ── Validate current section ────────────────────────────────────────────────
    const validateSection = (): boolean => {
        const newErrors: Record<string, string> = {};

        section.fields.forEach((field) => {
            const val = answers[field.id];
            const isEmpty =
                val === undefined ||
                val === "" ||
                (Array.isArray(val) && val.length === 0);

            if (field.required && isEmpty) {
                newErrors[field.id] = "Este campo é obrigatório.";
                return;
            }

            if (!isEmpty && typeof val === "string" && val.trim() !== "") {
                if (field.type === "email") {
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
                        newErrors[field.id] = "Introduza um endereço de email válido.";
                }
                if (field.type === "tel") {
                    if (!/^\+?[\d\s\-().]{7,20}$/.test(val))
                        newErrors[field.id] = "Introduza um número de telemóvel válido.";
                }
                if (field.type === "url") {
                    try { new URL(val); } catch { newErrors[field.id] = "Introduza um URL válido (ex.: https://exemplo.com)."; }
                }
            }
        });

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
            return false;
        }
        return true;
    };

    // ── Submit to API ───────────────────────────────────────────────────────────
    const submitForm = async () => {
        setSending(true);
        setSendError(null);

        if (!turnstileSiteKey || !turnstileToken) {
            setSendError("Conclua a verificação de segurança antes de enviar.");
            setSending(false);
            return;
        }

        try {
            const res = await fetch("/api/questionnaire", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: q.title,
                    sections: q.sections,
                    answers,
                    website,
                    form_started_at: formStartedAt,
                    turnstileToken,
                }),
            });
            if (!res.ok) {
                // The API returns English error text, so show a Portuguese message instead.
                throw new Error("Não foi possível enviar. Tente novamente.");
            }
            setSubmitted(true);
            setWebsite("");
            setTurnstileToken(null);
            setFormStartedAt(Date.now());
            scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        } catch (err) {
            setSendError(err instanceof Error ? err.message : "Ocorreu um erro. Tente novamente.");
        } finally {
            setSending(false);
        }
    };

    const handleNext = () => {
        if (!validateSection()) return;
        if (isLast) {
            submitForm();
        } else {
            setCurrentSection((s) => s + 1);
            scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handlePrev = () => {
        if (currentSection > 0) {
            setErrors({});
            setCurrentSection((s) => s - 1);
            scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 24 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full max-w-2xl bg-gray-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                style={{ maxHeight: "90vh" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Gold accent bar at top */}
                <div className="h-1 w-full flex-shrink-0"
                     style={{ background: `linear-gradient(to right, ${GOLD_DARK}, ${GOLD_LIGHT})` }} />

                {/* ── Header ── */}
                <div className="flex-shrink-0 border-b border-gray-100 bg-white px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handlePrev}
                            disabled={currentSection === 0}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Passo anterior"
                        >
                            ←
                        </button>

                        <div className="flex-1 min-w-0">
                            <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 truncate">
                  {submitted ? q.title : `${q.title} — ${section.title}`}
                </span>
                                {!submitted && (
                                    <span className="ml-2 flex-shrink-0 text-xs font-semibold text-[#b98b2f]">
                    {Math.round(((currentSection + 1) / q.sections.length) * 100)}%
                  </span>
                                )}
                            </div>
                            {!submitted && (
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${((currentSection + 1) / q.sections.length) * 100}%`,
                                            background: `linear-gradient(to right, ${GOLD_DARK}, ${GOLD_LIGHT})`,
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <button
                            onClick={onClose}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all hover:bg-red-50 hover:border-red-200 hover:text-red-500"
                            aria-label="Fechar questionário"
                        >
                            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {!submitted && (
                        <div className="mt-3 flex gap-1.5">
                            {q.sections.map((s, i) => (
                                <button
                                    key={s.title}
                                    onClick={() => i < currentSection && setCurrentSection(i)}
                                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${i > currentSection ? "bg-gray-200" : i < currentSection ? "cursor-pointer" : ""}`}
                                    style={i <= currentSection ? { backgroundColor: GOLD } : {}}
                                    title={s.title}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* ── Scrollable body ── */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto">
                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center justify-center px-8 py-16 text-center"
                        >
                            <div
                                className="mb-6 flex h-20 w-20 items-center justify-center rounded-full text-3xl text-white shadow-lg"
                                style={{ background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})` }}
                            >
                                ✓
                            </div>
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">Está concluído!</h2>
                            <p className="mb-2 text-gray-500">
                                Obrigado por preencher o questionário <strong>{q.title}</strong>.
                            </p>
                            <p className="mb-8 text-sm text-gray-400">
                                Vamos analisar as suas respostas e entraremos em contacto no prazo de 1 dia útil.
                            </p>
                            <p className="mb-8 text-sm text-gray-500">
                                Enviámos um email de confirmação para o endereço que indicou.
                            </p>
                            <button
                                onClick={onClose}
                                className="rounded-lg px-6 py-3 text-sm font-semibold text-white shadow transition-opacity hover:opacity-90"
                                style={{ background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})` }}
                            >
                                Fechar ✕
                            </button>
                        </motion.div>
                    ) : (
                        <div className="px-6 py-8">
                            <div hidden aria-hidden="true">
                                <label htmlFor="questionnaire_website">Website</label>
                                <input
                                    id="questionnaire_website"
                                    name="website"
                                    type="text"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                />
                                <input type="hidden" name="form_started_at" value={formStartedAt} readOnly />
                            </div>

                            <div className="mb-8">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#b98b2f]">
                  Passo {currentSection + 1} de {q.sections.length}
                </span>
                                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                            </div>

                            {/* Send error banner */}
                            {sendError && (
                                <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                    </svg>
                                    <span>{sendError}</span>
                                </div>
                            )}

                            <div className="space-y-6">
                                {section.fields.map((field) => (
                                    <div key={field.id}>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            {field.label}
                                            {field.required && <span className="ml-1 text-[#b98b2f]">*</span>}
                                        </label>
                                        {field.id === "budget" && (
                                            <p className="mb-2 text-xs text-gray-400">Indique o valor na sua moeda local.</p>
                                        )}
                                        {field.hint && <p className="mb-2 text-xs text-gray-400">{field.hint}</p>}
                                        <FormField
                                            field={field}
                                            value={answers[field.id] ?? (field.type === "multiselect" ? [] : "")}
                                            onChange={handleChange}
                                            error={errors[field.id]}
                                        />
                                        {errors[field.id] && (
                                            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                                                <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8v4m0 4h.01"/>
                                                </svg>
                                                {errors[field.id]}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {isLast && (
                                <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4">
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Verificação de segurança
                                    </p>
                                    {turnstileSiteKey ? (
                                        <TurnstileWidget
                                            siteKey={turnstileSiteKey}
                                            onTokenChange={setTurnstileToken}
                                            theme="light"
                                        />
                                    ) : (
                                        <p className="text-xs text-red-600">
                                            A verificação não está disponível de momento. Tente novamente mais tarde.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* ── Sticky footer nav ── */}
                {!submitted && (
                    <div className="flex-shrink-0 border-t border-gray-100 bg-white px-6 py-4 flex items-center justify-between">
                        <button
                            onClick={handlePrev}
                            disabled={currentSection === 0 || sending}
                            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            ← Anterior
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={sending || (isLast && (!turnstileToken || !turnstileSiteKey))}
                            className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                            style={{ background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})` }}
                        >
                            {sending && (
                                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                </svg>
                            )}
                            {sending ? "A enviar..." : isLast ? "Enviar ↗" : "Continuar →"}
                        </button>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function QuestionarioClient() {
    const [active, setActive] = useState<string | null>(null);
    const activeQ = questionnaires.find((q) => q.id === active);

    return (
        <>
            <main className="min-h-screen bg-gray-100">
                {/* HERO — kept exactly from original */}
                <section className="relative overflow-hidden bg-gradient-to-b from-black via-black/80 to-black/70">
                    <div
                        className="absolute inset-0 bg-center bg-cover opacity-40"
                        style={{ backgroundImage: "url('https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/90" />
                    <div className="relative px-4 pt-28 pb-20 mx-auto max-w-5xl text-center sm:px-6 lg:px-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
                        >
                            Questionário de Serviços
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                            className="max-w-3xl mx-auto mt-6 text-base text-gray-200 sm:text-lg"
                        >
                            Este não é um questionário qualquer: é o ingrediente secreto por trás do sucesso dos nossos projetos.
                            Ajude-nos a perceber a sua visão, os seus objetivos e as suas necessidades. Menos mal-entendidos, mais resultados.
                        </motion.p>
                    </div>
                </section>

                {/* CARDS GRID */}
                <section className="py-16 bg-gray-100">
                    <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
                        <div className="grid gap-8 md:grid-cols-2">
                            {questionnaires.map((item, index) => (
                                <motion.article
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.45, delay: index * 0.05 }}
                                    className="flex flex-col justify-between h-full p-8 bg-white rounded-lg shadow-lg shadow-black/5 border border-gray-100"
                                >
                                    <div>
                                        <h2 className="text-2xl font-semibold text-gray-900">{item.title}</h2>
                                        <p className="mt-1 text-sm font-medium text-[var(--autisync-gold,#b98b2f)]">{item.tagline}</p>
                                        <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                                    </div>
                                    <div className="mt-3">
                                        <button
                                            onClick={() => setActive(item.id)}
                                            className="inline-flex items-center text-sm font-semibold text-[var(--autisync-gold,#b98b2f)] hover:text-gray-900 transition-colors"
                                        >
                                            Começar este questionário
                                            <span className="ml-2 text-xs">↗</span>
                                        </button>
                                    </div>
                                </motion.article>
                            ))}
                        </div>

                        <p className="mt-12 text-center text-xs text-gray-400">
                            Todas as respostas são confidenciais e usadas apenas para preparar a proposta do seu projeto.
                        </p>
                    </div>
                </section>
            </main>

            {/* Modal — layered on top, page stays in background */}
            <AnimatePresence>
                {activeQ && (
                    <QuestionnaireModal
                        q={activeQ}
                        onClose={() => setActive(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}