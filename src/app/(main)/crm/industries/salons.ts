import type { IndustryPair } from "./types";

/**
 * Hair and beauty salons, barbers, nail and tattoo studios. Demo: Maré Hair &
 * Beauty. The problems are the ones owners raise most (stylists' forums,
 * Trustpilot reviews of booking marketplaces, Oct 2026): bookings arriving as
 * DMs at all hours, no-shows, and paying a marketplace for clients who
 * already knew the salon.
 */
export const SALONS: IndustryPair = {
    en: {
        id: "salons", slug: "salons", otherSlug: "saloes", crumb: "Salons & studios",
        metaTitle: "Salon Booking Software and CRM, No Commission | Autisync",
        metaDesc: "From £39 a month per salon, no commission: your own booking page, deposits, reminders, Instagram and WhatsApp in one inbox, and review requests.",
        keywords: ["salon booking software UK", "salon software no commission", "Fresha alternative", "Booksy alternative", "barber booking app", "nail salon booking system", "tattoo studio booking", "salon CRM", "hair salon software"],
        pill: "For hair and beauty salons, barbers, nail and tattoo studios",
        h1a: "A full column.", h1b: "Fewer empty chairs.",
        lead: "Clients book themselves on your own page, pay a deposit for long appointments and get a reminder the day before. Instagram, WhatsApp and Facebook messages land in one inbox, and the assistant answers the late-night ones with your booking link.",
        trust: "No commission on your clients. One price for the salon, however many chairs.",
        hero: { n: 2, shot: "bookings", alt: "Autisync bookings diary for a hair and beauty salon, with each stylist's appointments" },
        demoName: "Maré Hair & Beauty",
        painsTitle: "Where a salon loses its day.",
        pains: [
            { t: "Bookings in your DMs at 11pm", d: "Clients ask on Instagram or WhatsApp while you are with someone else, and the message is still waiting at midnight." },
            { t: "No-shows and last-minute gaps", d: "A two-hour colour cancels the morning of, and the chair stays empty." },
            { t: "Paying for clients who already knew you", d: "Booking marketplaces take a fee on new clients, even ones who found you on Google or your own Instagram." },
            { t: "Fees that keep stacking up", d: "Per stylist, per text message, per card payment and per boost, until the bill is more than the rent of a chair." },
        ],
        tourTitle: "From the first message to the next booking.",
        tourSub: "Five screens from a demo salon.",
        tour: [
            { n: 1, shot: "public", t: "Your own booking page", d: "Services, stylists and times in your branding. No marketplace and no commission.", alt: "Salon booking page with cuts, colour and treatments" },
            { n: 2, shot: "bookings", t: "Every stylist's diary", d: "Appointments by person, with deposits and reminders.", alt: "Bookings diary by stylist" },
            { n: 3, shot: "inbox", t: "DMs in one inbox", d: "Instagram, WhatsApp and Facebook together, with the client's history alongside.", alt: "Inbox with a client's Instagram message" },
            { n: 4, shot: "billing", t: "Deposits and payments", d: "Deposits taken at booking, the rest paid by card.", alt: "Billing with deposits and paid appointments" },
            { n: 5, shot: "reputation", t: "Reviews after every visit", d: "A review request after the appointment, and replies from the CRM.", alt: "Reputation screen with Google reviews" },
        ],
        featTitle: "What a salon needs, without the marketplace.",
        feats: [
            { t: "Online booking", d: "Each service with its length, price and the stylists who do it, booked on your own page and website." },
            { t: "One inbox for DMs", d: "Instagram, WhatsApp, Facebook, email and website chat together, answered by the assistant out of hours." },
            { t: "Deposits and payments", d: "A deposit for long or first appointments, and a card payment link for the rest." },
            { t: "Reminders and rebooking", d: "A reminder before each visit, and a nudge to rebook when the next cut or infill is due." },
            { t: "Client records", d: "Colour formulas, patch tests, allergies and notes on each client, shared with the team." },
            { t: "Google reviews", d: "Ask for a review after the visit and reply to every review from the CRM." },
        ],
        faq: [
            { q: "Do you take a commission on new clients?", a: "No. Clients book on your own page and website. There is no marketplace fee, whoever the client is or wherever they found you." },
            { q: "Can clients pay a deposit when they book?", a: "Yes. Set a deposit on the services you choose, such as colour or first appointments, and it is taken when the client books." },
            { q: "Can it answer Instagram and WhatsApp for me?", a: "Messages from Instagram, WhatsApp and Facebook arrive in one inbox. The AI assistant can reply out of hours with prices and your booking link, from Team upwards." },
            { q: "How much does it cost?", a: "From £39 a month (€45 in Portugal) for one person. Team covers five people for £89 and Pro covers twelve for £159. The price is per salon, not per stylist. Setup is a one-off from £295, halved if you pay yearly." },
            { q: "Can you move my clients over from Fresha or Booksy?", a: "Yes. We import your client list, services and future appointments from an export, as part of setting you up." },
        ],
    },
    pt: {
        id: "salons", slug: "saloes", otherSlug: "salons", crumb: "Salões e estúdios",
        metaTitle: "Software de Marcações para Salões, Sem Comissões | Autisync",
        metaDesc: "Desde 45 € por mês por salão, sem comissões: página de marcações própria, sinal, lembretes, Instagram e WhatsApp numa caixa e avaliações.",
        keywords: ["software para cabeleireiros", "marcações online salão", "alternativa ao Fresha", "alternativa ao Booksy", "software para barbearias", "marcações para estúdio de unhas", "software para estúdio de tatuagem", "CRM para salões"],
        pill: "Para cabeleireiros, barbearias, estúdios de unhas e de tatuagem",
        h1a: "A agenda cheia.", h1b: "Menos cadeiras vazias.",
        lead: "As clientes marcam sozinhas na sua página, pagam sinal nas marcações longas e recebem um lembrete na véspera. Mensagens do Instagram, WhatsApp e Facebook chegam a uma só caixa de entrada, e o assistente responde às da noite com o seu link de marcação.",
        trust: "Sem comissões sobre as suas clientes. Um preço por salão, tenha as cadeiras que tiver.",
        hero: { n: 2, shot: "bookings", alt: "Agenda de marcações do Autisync de um salão de cabeleireiro e estética, por profissional" },
        demoName: "Maré Hair & Beauty",
        painsTitle: "Onde um salão perde o dia.",
        pains: [
            { t: "Marcações por mensagem às 23h", d: "A cliente pergunta no Instagram ou no WhatsApp enquanto está com outra, e a mensagem continua à espera à meia-noite." },
            { t: "Faltas e desmarcações à última hora", d: "Uma coloração de duas horas desmarca de manhã e a cadeira fica vazia." },
            { t: "Pagar por clientes que já eram suas", d: "As plataformas de marcações cobram pelas clientes novas, mesmo as que o encontraram no Google ou no seu Instagram." },
            { t: "Custos que se vão somando", d: "Por profissional, por SMS, por pagamento com cartão e por destaque, até a conta passar a renda de uma cadeira." },
        ],
        tourTitle: "Da primeira mensagem à próxima marcação.",
        tourSub: "Cinco ecrãs de um salão de demonstração.",
        tour: [
            { n: 1, shot: "public", t: "A sua página de marcações", d: "Serviços, profissionais e horas com a sua marca. Sem plataforma nem comissões.", alt: "Página de marcações de um salão com cortes, coloração e tratamentos" },
            { n: 2, shot: "bookings", t: "A agenda de cada profissional", d: "Marcações por pessoa, com sinal e lembretes.", alt: "Agenda de marcações por profissional" },
            { n: 3, shot: "inbox", t: "Mensagens numa caixa", d: "Instagram, WhatsApp e Facebook juntos, com o histórico da cliente ao lado.", alt: "Caixa de entrada com uma mensagem de Instagram" },
            { n: 4, shot: "billing", t: "Sinal e pagamentos", d: "Sinal na marcação e o resto pago por cartão.", alt: "Faturação com sinais e marcações pagas" },
            { n: 5, shot: "reputation", t: "Avaliações depois de cada visita", d: "Pedido de avaliação depois da marcação e respostas a partir do CRM.", alt: "Ecrã de reputação com avaliações do Google" },
        ],
        featTitle: "O que um salão precisa, sem plataformas.",
        feats: [
            { t: "Marcações online", d: "Cada serviço com a sua duração, preço e as profissionais que o fazem, marcado na sua página e no seu site." },
            { t: "Uma caixa para as mensagens", d: "Instagram, WhatsApp, Facebook, email e chat do site juntos, com o assistente a responder fora de horas." },
            { t: "Sinal e pagamentos", d: "Sinal nas marcações longas ou primeiras visitas, e link de pagamento por cartão para o resto." },
            { t: "Lembretes e nova marcação", d: "Lembrete antes de cada visita e aviso para marcar de novo quando o próximo corte ou manutenção está na altura." },
            { t: "Ficha da cliente", d: "Fórmulas de coloração, testes de alergia e notas em cada cliente, partilhadas com a equipa." },
            { t: "Avaliações no Google", d: "Peça uma avaliação depois da visita e responda a todas a partir do CRM." },
        ],
        faq: [
            { q: "Cobram comissão sobre clientes novas?", a: "Não. As clientes marcam na sua página e no seu site. Não há taxas de plataforma, seja qual for a cliente ou a forma como o encontrou." },
            { q: "As clientes podem pagar sinal ao marcar?", a: "Sim. Defina um sinal nos serviços que quiser, como coloração ou primeiras visitas, e é cobrado no momento da marcação." },
            { q: "Responde ao Instagram e ao WhatsApp por mim?", a: "As mensagens do Instagram, WhatsApp e Facebook chegam a uma caixa de entrada. O assistente de IA pode responder fora de horas com preços e o seu link de marcação, a partir do plano Equipa." },
            { q: "Quanto custa?", a: "Desde 45 € por mês (39 £ no Reino Unido) para uma pessoa. O Equipa cobre cinco pessoas por 99 € e o Pro doze por 185 €. O preço é por salão, não por profissional. A instalação é um pagamento único de desde 345 €, a metade com pagamento anual." },
            { q: "Passam as minhas clientes do Fresha ou do Booksy?", a: "Sim. Importamos a lista de clientes, os serviços e as marcações futuras a partir de uma exportação, como parte da configuração." },
        ],
    },
};
