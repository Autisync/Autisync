import type { IndustryPair } from "./types";

/**
 * Small law firms, accountants and bookkeepers. Demo: Ashcombe & Reid
 * Accountants. The problems are the ones practices and their clients raise
 * most (a 2024 secret-shopper study of law firms, accountants' forums,
 * Capterra reviews, Oct 2026): enquiries nobody returns, clients who feel
 * left without news, records chased for months and slow payment.
 */
export const LEGAL: IndustryPair = {
    en: {
        id: "legal", slug: "legal-finance", otherSlug: "juridico-financas", crumb: "Legal & finance",
        metaTitle: "CRM for Accountants and Small Law Firms | Autisync",
        metaDesc: "CRM for accountants, bookkeepers and small law firms: every enquiry answered, consultations booked online, engagement letters signed online, deadlines as tasks, document reminders and invoices with card payment. From £49 a month per practice, not per user.",
        keywords: ["CRM for accountants UK", "accountancy practice management", "law firm CRM small", "client intake software", "bookkeeper CRM", "Clio alternative", "engagement letter software", "client onboarding accountants"],
        pill: "For accountants, bookkeepers and small law firms",
        h1a: "Every enquiry answered.", h1b: "Every deadline in sight.",
        lead: "New enquiries get a reply the same day and book a consultation online. Engagement letters are signed from a link, deadlines become tasks for the whole team, and an email sequence asks clients for the records you need, so you are not chasing them in January.",
        trust: "Intake, client messages, deadlines and billing in one subscription, priced per practice.",
        hero: { n: 2, shot: "opportunities", alt: "Autisync pipeline of new client enquiries for an accountancy practice" },
        demoName: "Ashcombe & Reid Accountants",
        painsTitle: "Where a practice loses clients and evenings.",
        pains: [
            { t: "Enquiries nobody returns", d: "A prospect emails or leaves a message, nobody gets back that day, and they sign with the next firm that answered." },
            { t: "“I never hear from them”", d: "Clients feel left without news on their matter or their return, and say so in their reviews." },
            { t: "Records chased for months", d: "Receipts and statements asked for in May arrive the week before the deadline, along with everyone else's." },
            { t: "Messages at 9pm, invoices paid late", d: "Clients expect an instant answer on WhatsApp, and then take weeks to pay." },
        ],
        tourTitle: "From the first enquiry to the paid invoice.",
        tourSub: "Five screens from a demo accountancy practice.",
        tour: [
            { n: 1, shot: "public", t: "Consultations booked online", d: "Prospects choose a free first call or a paid consultation and a time.", alt: "Booking page with a free first call and paid consultations" },
            { n: 2, shot: "opportunities", t: "New clients in a pipeline", d: "Every enquiry from first contact to signed, so none is forgotten.", alt: "Pipeline of new client enquiries" },
            { n: 3, shot: "quotes", t: "Engagement letters accepted online", d: "Fees and scope sent as a link and accepted by the client.", alt: "Engagement letters and proposals list" },
            { n: 4, shot: "tasks", t: "Deadlines as tasks", d: "Filing dates and records requests on each client, for the whole team.", alt: "Tasks with filing deadlines" },
            { n: 5, shot: "billing", t: "Fees paid by card", d: "Monthly fees and one-off work invoiced with a payment link and reminders.", alt: "Billing with monthly fees and overdue invoices" },
        ],
        featTitle: "The client side of a practice, in one place.",
        feats: [
            { t: "Enquiries and intake", d: "Website, email, phone notes and WhatsApp enquiries in one pipeline, each with an owner and a next step." },
            { t: "Shared inbox", d: "Every message with a client in one thread, visible to the team, with a reply drafted by the assistant." },
            { t: "Engagement letters and contracts", d: "Scope and fees accepted online, and agreements sent for signature from the client record." },
            { t: "Deadlines and records requests", d: "Tasks for filing dates, and email sequences that remind clients about the documents you need, on the dates you choose." },
            { t: "Fees and invoices", d: "Monthly fees invoiced automatically, one-off work by quote, card payments and overdue reminders." },
            { t: "Online booking", d: "First calls, consultations and review meetings booked against each person's diary." },
        ],
        faq: [
            { q: "Is this practice management software?", a: "It covers the client side: enquiries, messages, bookings, engagement letters, deadlines as tasks and billing. Your accounts or case software stays as it is for the technical work." },
            { q: "Can clients sign engagement letters online?", a: "Yes. They open a link with your branding, see the scope and fees, and accept. Contracts can be sent for signature from the client record." },
            { q: "Can it remind clients to send their records?", a: "Yes. Put the clients in an email sequence that asks for the records on the dates you choose, and take them out when the documents arrive." },
            { q: "How much does it cost?", a: "From £49 a month (€55 in Portugal) for one person. Team covers five people for £119 and Pro covers twelve for £219, per practice rather than per user." },
            { q: "Can we bring our client list over?", a: "Yes. We import your clients from a spreadsheet or your current system as part of setting you up, and you can export everything at any time." },
        ],
    },
    pt: {
        id: "legal", slug: "juridico-financas", otherSlug: "legal-finance", crumb: "Jurídico e finanças",
        metaTitle: "CRM para Contabilistas e Sociedades de Advogados | Autisync",
        metaDesc: "CRM para contabilistas, gabinetes de contabilidade e pequenas sociedades de advogados: todos os pedidos respondidos, consultas marcadas online, propostas de honorários aceites online, prazos como tarefas, pedidos de documentos e faturas com pagamento por cartão. Desde 55 € por mês por gabinete.",
        keywords: ["CRM para contabilistas", "software para gabinete de contabilidade", "CRM para advogados", "gestão de clientes contabilidade", "proposta de honorários online", "alternativa ao Clio"],
        pill: "Para contabilistas, gabinetes de contabilidade e pequenas sociedades de advogados",
        h1a: "Todos os pedidos respondidos.", h1b: "Todos os prazos à vista.",
        lead: "Os novos pedidos têm resposta no mesmo dia e marcam consulta online. As propostas de honorários são aceites por link, os prazos passam a tarefas para toda a equipa e uma sequência de email pede aos clientes os documentos que faltam, para não andar atrás deles em cima do prazo.",
        trust: "Novos clientes, mensagens, prazos e faturação numa só subscrição, com preço por gabinete.",
        hero: { n: 2, shot: "opportunities", alt: "Funil de novos pedidos de clientes de um gabinete de contabilidade no Autisync" },
        demoName: "Ashcombe & Reid Accountants",
        painsTitle: "Onde um gabinete perde clientes e serões.",
        pains: [
            { t: "Pedidos sem resposta", d: "Um potencial cliente envia um email ou deixa recado, ninguém responde nesse dia e fica com o gabinete seguinte que atendeu." },
            { t: "“Nunca sei nada”", d: "Os clientes sentem que ninguém lhes dá notícias do processo ou da declaração, e dizem-no nas avaliações." },
            { t: "Documentos pedidos durante meses", d: "Faturas e extratos pedidos em maio chegam na semana do prazo, junto com os de todos os outros." },
            { t: "Mensagens às 21h, faturas pagas tarde", d: "Os clientes esperam resposta imediata no WhatsApp e depois demoram semanas a pagar." },
        ],
        tourTitle: "Do primeiro pedido à fatura paga.",
        tourSub: "Cinco ecrãs de um gabinete de contabilidade de demonstração.",
        tour: [
            { n: 1, shot: "public", t: "Consultas marcadas online", d: "O cliente escolhe uma primeira chamada gratuita ou uma consulta paga e a hora.", alt: "Página de marcações com primeira chamada e consultas" },
            { n: 2, shot: "opportunities", t: "Novos clientes num funil", d: "Cada pedido do primeiro contacto à adjudicação, sem nenhum esquecido.", alt: "Funil de novos pedidos" },
            { n: 3, shot: "quotes", t: "Propostas de honorários aceites online", d: "Âmbito e honorários enviados por link e aceites pelo cliente.", alt: "Lista de propostas de honorários" },
            { n: 4, shot: "tasks", t: "Prazos como tarefas", d: "Datas de entrega e pedidos de documentos em cada cliente, para toda a equipa.", alt: "Tarefas com prazos de entrega" },
            { n: 5, shot: "billing", t: "Honorários pagos por cartão", d: "Avenças e trabalhos pontuais faturados com link de pagamento e lembretes.", alt: "Faturação com avenças e faturas em atraso" },
        ],
        featTitle: "O lado do cliente de um gabinete, num só lugar.",
        feats: [
            { t: "Pedidos e novos clientes", d: "Pedidos do site, email, telefone e WhatsApp num funil, cada um com responsável e próximo passo." },
            { t: "Caixa de entrada partilhada", d: "Todas as mensagens com um cliente numa conversa, visível à equipa, com resposta preparada pelo assistente." },
            { t: "Propostas e contratos", d: "Âmbito e honorários aceites online, e contratos enviados para assinatura a partir da ficha do cliente." },
            { t: "Prazos e pedidos de documentos", d: "Tarefas para as datas de entrega e sequências de email que lembram os clientes dos documentos que faltam, nas datas que escolher." },
            { t: "Honorários e faturas", d: "Avenças faturadas automaticamente, trabalhos pontuais por proposta, pagamentos por cartão e lembretes de atraso." },
            { t: "Marcações online", d: "Primeiras chamadas, consultas e reuniões de revisão marcadas na agenda de cada pessoa." },
        ],
        faq: [
            { q: "Isto é um software de gestão do gabinete?", a: "Cobre o lado do cliente: pedidos, mensagens, marcações, propostas de honorários, prazos como tarefas e faturação. O software de contabilidade ou de processos continua igual para o trabalho técnico." },
            { q: "Os clientes podem aceitar a proposta online?", a: "Sim. Abrem um link com a sua marca, veem o âmbito e os honorários e aceitam. Os contratos podem ser enviados para assinatura a partir da ficha do cliente." },
            { q: "Lembra os clientes de enviar os documentos?", a: "Sim. Coloque os clientes numa sequência de email que pede os documentos nas datas que escolher, e retire-os quando os documentos chegarem." },
            { q: "Quanto custa?", a: "Desde 55 € por mês (49 £ no Reino Unido) para uma pessoa. O Equipa cobre cinco pessoas por 135 € e o Pro doze por 249 €, por gabinete e não por utilizador." },
            { q: "Passam a nossa lista de clientes?", a: "Sim. Importamos os clientes de uma folha de cálculo ou do sistema que usa hoje, como parte da configuração, e pode exportar tudo quando quiser." },
        ],
    },
};
