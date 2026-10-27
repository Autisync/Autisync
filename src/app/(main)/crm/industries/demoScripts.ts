/**
 * What happens in each industry's live demo (LiveDemo.tsx): one customer,
 * from the first message to the review, in six scenes. The screens are drawn
 * in the page (not screenshots) to look like the real Autisync CRM.
 *
 * The scenes answer the problems owners raise most (forums, Trustpilot and
 * Capterra reviews of the tools they use, Oct 2026): replies that come too
 * late, quotes that go quiet, chasing payment, no-shows, and reviews nobody
 * asks for. Every business and person here is invented.
 */
import type { IndustryLocale } from "./types";

export type SceneKey = "enquiry" | "booking" | "quote" | "won" | "invoice" | "review";
export const SCENES: SceneKey[] = ["enquiry", "booking", "quote", "won", "invoice", "review"];

export type DemoScript = {
    brand: { name: string; short: string; initial: string; color: string; owner: string; ownerInitials: string; staff: string };
    currency: "GBP" | "EUR";
    customer: { name: string; first: string; initials: string };
    /** Other conversations in the inbox and cards on the board, for realism. */
    others: Array<{ name: string; preview: string; when: string; channel: "email" | "web" | "whatsapp" | "phone" }>;
    enquiry: { msg: string; time: string; reply: string };
    booking: { service: string; length: string; price: string; day: string; dayShort: string; slots: string[]; pick: number; with: string };
    /** Bookings already in the diary: [day 0-4, start hour, length in hours, label]. */
    diary: Array<[number, number, number, string]>;
    newBooking: [number, number, number];
    quote: { kind: string; ref: string; lines: Array<{ d: string; q: number; p: number }>; vat: number; validity: string };
    board: { stages: [string, string, string, string]; cards: Array<{ name: string; what: string; value: number; stage: 0 | 1 | 2 | 3 }> };
    won: { msg: string };
    invoice: { ref: string; label: string; share: number };
    reviews: Array<{ name: string; text: string; when: string }>;
    review: { ask: string; text: string };
    captions: Record<SceneKey, { t: string; d: string }>;
};

/* ── Trades: Kestrel Heating & Plumbing ──────────────────────────────── */

const TRADES_EN: DemoScript = {
    brand: { name: "Kestrel Heating & Plumbing", short: "Kestrel", initial: "K", color: "#c2410c", owner: "Dan Kestrel", ownerInitials: "DK", staff: "Liam" },
    currency: "GBP",
    customer: { name: "Tom Ashworth", first: "Tom", initials: "TA" },
    others: [
        { name: "Lewis Brennan", preview: "Thursday works. Could you look at the upstairs radiators too?", when: "5h", channel: "email" },
        { name: "Mike Corrigan", preview: "How much is a new combi boiler, roughly?", when: "Sat", channel: "web" },
        { name: "Patel Lettings", preview: "Gas certificates for the three flats, same as last year.", when: "Oct 19", channel: "phone" },
    ],
    enquiry: { time: "19:42", msg: "Hi, boiler is showing F28 and there's no hot water. Can someone come out tomorrow?", reply: "Hi Tom, sorry about that. F28 is usually the gas supply to the boiler. Liam can come tomorrow morning: pick a time here and you'll get a reminder the night before." },
    booking: { service: "Boiler breakdown visit", length: "1 hour", price: "£85", day: "Tomorrow, Wed 28 Oct", dayShort: "Wed", slots: ["08:00", "09:30", "11:00", "13:30"], pick: 1, with: "Liam" },
    diary: [[0, 9, 2, "Boiler service · Kerr"], [0, 13, 1, "Gas cert · Patel Lettings"], [1, 11, 1.5, "Radiator · Brennan"], [2, 14, 2, "Quote visit · Corrigan"], [3, 8, 1, "Service · Hughes"], [4, 10, 3, "Bathroom · Shah"]],
    newBooking: [1, 9.5, 1],
    quote: { kind: "Quote", ref: "Q-0142", lines: [{ d: "Replace gas valve, Worcester Greenstar 30i", q: 1, p: 165 }, { d: "Labour (2 hours)", q: 2, p: 55 }, { d: "Breakdown visit (already booked)", q: 1, p: 85 }], vat: 20, validity: "Valid for 30 days" },
    board: { stages: ["Enquiry", "Visit booked", "Quote sent", "Won"], cards: [
        { name: "Mike Corrigan", what: "New combi boiler", value: 2450, stage: 0 },
        { name: "Lewis Brennan", what: "Radiators", value: 320, stage: 1 },
        { name: "Shah family", what: "Bathroom refit", value: 6800, stage: 3 },
        { name: "Hughes", what: "Annual service", value: 90, stage: 2 },
    ] },
    won: { msg: "Thanks Tom, the part is ordered. Liam will fit it on Thursday at 10:00." },
    invoice: { ref: "INV-0318", label: "Invoice", share: 1 },
    reviews: [
        { name: "Sarah Kerr", text: "Turned up on time and explained everything. Fixed in an hour.", when: "2 days ago" },
        { name: "Patel Lettings", text: "Certificates sorted for all three flats without chasing.", when: "1 week ago" },
    ],
    review: { ask: "Thanks for choosing Kestrel, Tom. Would you leave us a quick review?", text: "Booked at 8pm, fixed the next day, paid on my phone. Easy." },
    captions: {
        enquiry: { t: "A message at 7:42pm gets an answer", d: "WhatsApp, email and website enquiries land in one inbox. The assistant drafts the reply from your prices and diary, and you send it from the van in one tap." },
        booking: { t: "They book the visit themselves", d: "The reply carries your booking link. Tom picks a slot that fits Liam's diary, and both get a reminder, so nobody has a wasted trip." },
        quote: { t: "A quote they accept from the sofa", d: "Price the job in a minute and send it as a link. You see when it is opened, and a follow-up goes out by itself if it goes quiet." },
        won: { t: "Every job on one board", d: "The accepted quote moves the job to Won, books the fitting and tells the customer. You can see at a glance what still needs chasing." },
        invoice: { t: "Paid before you leave the drive", d: "The quote becomes the invoice in one click, with a card payment link. Overdue invoices get a polite reminder without you writing one." },
        review: { t: "Reviews without asking twice", d: "A review request goes out when the job is paid. New reviews show up in the CRM, where you can reply to them." },
    },
};

const TRADES_PT: DemoScript = {
    ...TRADES_EN,
    currency: "EUR",
    customer: { name: "Tiago Martins", first: "Tiago", initials: "TM" },
    others: [
        { name: "Luís Brandão", preview: "Quinta dá-me jeito. Pode ver também os radiadores de cima?", when: "5 h", channel: "email" },
        { name: "Miguel Correia", preview: "Quanto custa, mais ou menos, uma caldeira nova?", when: "sáb", channel: "web" },
        { name: "Pires Imobiliária", preview: "Certificados de gás dos três apartamentos, como no ano passado.", when: "19 out", channel: "phone" },
    ],
    enquiry: { time: "19:42", msg: "Boa noite, a caldeira mostra F28 e não há água quente. Alguém pode vir amanhã?", reply: "Boa noite Tiago, lamentamos. O F28 costuma ser a entrada de gás da caldeira. O Liam pode passar amanhã de manhã: escolha a hora aqui e recebe um lembrete na véspera." },
    booking: { service: "Visita de avaria de caldeira", length: "1 hora", price: "85 €", day: "Amanhã, qua 28 out", dayShort: "qua", slots: ["08:00", "09:30", "11:00", "13:30"], pick: 1, with: "Liam" },
    diary: [[0, 9, 2, "Revisão · Carvalho"], [0, 13, 1, "Certificado · Pires"], [1, 11, 1.5, "Radiador · Brandão"], [2, 14, 2, "Orçamento · Correia"], [3, 8, 1, "Revisão · Henriques"], [4, 10, 3, "Casa de banho · Sá"]],
    quote: { kind: "Orçamento", ref: "Q-0142", lines: [{ d: "Substituir válvula de gás, Vaillant ecoTEC", q: 1, p: 165 }, { d: "Mão de obra (2 horas)", q: 2, p: 55 }, { d: "Visita de avaria (já marcada)", q: 1, p: 85 }], vat: 23, validity: "Válido por 30 dias" },
    board: { stages: ["Pedido", "Visita marcada", "Orçamento enviado", "Ganho"], cards: [
        { name: "Miguel Correia", what: "Caldeira nova", value: 2450, stage: 0 },
        { name: "Luís Brandão", what: "Radiadores", value: 320, stage: 1 },
        { name: "Família Sá", what: "Remodelar casa de banho", value: 6800, stage: 3 },
        { name: "Henriques", what: "Revisão anual", value: 90, stage: 2 },
    ] },
    won: { msg: "Obrigado Tiago, a peça está encomendada. O Liam monta-a na quinta às 10:00." },
    invoice: { ref: "FT-0318", label: "Fatura", share: 1 },
    reviews: [
        { name: "Sara Carvalho", text: "Chegou à hora e explicou tudo. Resolvido numa hora.", when: "há 2 dias" },
        { name: "Pires Imobiliária", text: "Certificados dos três apartamentos tratados sem termos de insistir.", when: "há 1 semana" },
    ],
    review: { ask: "Obrigado por escolher a Kestrel, Tiago. Deixa-nos uma avaliação rápida?", text: "Marquei às 20h, resolveram no dia seguinte e paguei no telemóvel. Fácil." },
    captions: {
        enquiry: { t: "Uma mensagem às 19:42 tem resposta", d: "WhatsApp, email e pedidos do site chegam a uma só caixa de entrada. O assistente prepara a resposta com os seus preços e a sua agenda, e envia-a da carrinha num toque." },
        booking: { t: "O cliente marca a visita sozinho", d: "A resposta leva o seu link de marcação. O Tiago escolhe uma hora livre na agenda do Liam e ambos recebem lembrete, para ninguém fazer uma viagem em vão." },
        quote: { t: "Um orçamento aceite no sofá", d: "Orçamente o trabalho num minuto e envie-o como link. Vê quando é aberto, e segue um lembrete sozinho se ficar sem resposta." },
        won: { t: "Todos os trabalhos num quadro", d: "O orçamento aceite passa o trabalho a Ganho, marca a instalação e avisa o cliente. Vê num relance o que falta acompanhar." },
        invoice: { t: "Pago antes de sair da porta", d: "O orçamento passa a fatura num clique, com link de pagamento por cartão. As faturas em atraso recebem um lembrete educado sem ter de o escrever." },
        review: { t: "Avaliações sem pedir duas vezes", d: "O pedido de avaliação segue quando o trabalho é pago. As novas avaliações aparecem no CRM, onde pode responder." },
    },
};

/* ── Consultants: Harbourline Consulting ─────────────────────────────── */

const CONSULTANTS_EN: DemoScript = {
    brand: { name: "Harbourline Consulting", short: "Harbourline", initial: "H", color: "#0f766e", owner: "Ruth Carver", ownerInitials: "RC", staff: "Ruth" },
    currency: "GBP",
    customer: { name: "Priya Nair", first: "Priya", initials: "PN" },
    others: [
        { name: "Ben Okafor", preview: "Thanks for the notes. Can we move Friday's session to 2pm?", when: "3h", channel: "email" },
        { name: "Lena Fischer", preview: "Saw your talk last week. Do you work with charities?", when: "Mon", channel: "web" },
        { name: "Brightwater Ltd", preview: "October retainer invoice received, thank you.", when: "Oct 20", channel: "email" },
    ],
    enquiry: { time: "21:10", msg: "Hi Ruth, a colleague recommended you. We're a 20-person firm and our sales process is a mess. Could we talk this week?", reply: "Hi Priya, thanks for getting in touch, and to your colleague. A 30-minute call is the best start: choose a time here and I'll send a short agenda beforehand." },
    booking: { service: "Discovery call (video)", length: "30 min", price: "Free", day: "Thursday 29 Oct", dayShort: "Thu", slots: ["09:00", "11:30", "14:00", "16:30"], pick: 2, with: "Ruth" },
    diary: [[0, 10, 2, "Workshop · Brightwater"], [1, 9, 1, "Call · Okafor"], [1, 14, 3, "Strategy day · Lumen"], [2, 11, 1, "Review · Fischer"], [3, 9, 1.5, "Coaching · Okafor"], [4, 13, 2, "Board prep · Brightwater"]],
    newBooking: [3, 14, 0.5],
    quote: { kind: "Proposal", ref: "P-0057", lines: [{ d: "Sales process review and workshop (2 days)", q: 2, p: 950 }, { d: "Monthly advisory retainer, first month", q: 1, p: 1200 }], vat: 20, validity: "Valid for 21 days" },
    board: { stages: ["New lead", "Call booked", "Proposal sent", "Won"], cards: [
        { name: "Lena Fischer", what: "Charity strategy", value: 3500, stage: 0 },
        { name: "Ben Okafor", what: "Coaching, 6 months", value: 4800, stage: 3 },
        { name: "Lumen Foods", what: "Pricing review", value: 2200, stage: 2 },
        { name: "Corvid & Co", what: "Board workshop", value: 1800, stage: 1 },
    ] },
    won: { msg: "Wonderful, Priya. I've sent the workshop dates to your calendar and the deposit invoice is on its way." },
    invoice: { ref: "INV-0204", label: "Invoice", share: 1 },
    reviews: [
        { name: "Ben Okafor", text: "Clear thinking and practical next steps after every session.", when: "4 days ago" },
        { name: "Brightwater Ltd", text: "Ruth helped us double our close rate in a quarter.", when: "3 weeks ago" },
    ],
    review: { ask: "Thank you for the workshop, Priya. Would you share a few words about working together?", text: "Two days with Ruth gave us a sales process the whole team follows." },
    captions: {
        enquiry: { t: "The enquiry that came in after hours", d: "Website, email and WhatsApp enquiries arrive in one inbox, even while you're with a client. The assistant drafts a reply in your words, ready for you to send." },
        booking: { t: "No back-and-forth to find a time", d: "Your booking link shows only the times you're free. Priya picks one and the video link and a reminder go out by themselves." },
        quote: { t: "A proposal accepted online", d: "Turn the call into a priced proposal, send it as a link, and see when it's read. A follow-up goes out if it sits unanswered." },
        won: { t: "A pipeline that stays full", d: "Every lead, call and proposal on one board with its value, so you keep selling while you deliver and know what's coming in." },
        invoice: { t: "Retainers invoiced every month", d: "The proposal becomes the invoice, with a card payment link. Monthly retainers invoice themselves and late payers get a reminder." },
        review: { t: "Testimonials you actually collect", d: "After the work, a request for a review goes out. New reviews show in the CRM, ready for your website and proposals." },
    },
};

const CONSULTANTS_PT: DemoScript = {
    ...CONSULTANTS_EN,
    currency: "EUR",
    customer: { name: "Inês Lopes", first: "Inês", initials: "IL" },
    others: [
        { name: "Bruno Oliveira", preview: "Obrigado pelas notas. Podemos passar a sessão de sexta para as 14h?", when: "3 h", channel: "email" },
        { name: "Leonor Faria", preview: "Vi a sua palestra na semana passada. Trabalha com associações?", when: "seg", channel: "web" },
        { name: "Águas Claras, Lda", preview: "Recebemos a fatura da avença de outubro, obrigado.", when: "20 out", channel: "email" },
    ],
    enquiry: { time: "21:10", msg: "Olá Ruth, uma colega recomendou-a. Somos uma empresa de 20 pessoas e o nosso processo comercial está uma confusão. Podemos falar esta semana?", reply: "Olá Inês, obrigada pelo contacto, e à sua colega. O melhor começo é uma chamada de 30 minutos: escolha uma hora aqui e envio-lhe antes uma pequena agenda." },
    booking: { service: "Chamada inicial (vídeo)", length: "30 min", price: "Grátis", day: "Quinta, 29 out", dayShort: "qui", slots: ["09:00", "11:30", "14:00", "16:30"], pick: 2, with: "Ruth" },
    diary: [[0, 10, 2, "Workshop · Águas Claras"], [1, 9, 1, "Chamada · Oliveira"], [1, 14, 3, "Dia de estratégia · Lúmen"], [2, 11, 1, "Revisão · Faria"], [3, 9, 1.5, "Mentoria · Oliveira"], [4, 13, 2, "Preparar direção · Águas Claras"]],
    quote: { kind: "Proposta", ref: "P-0057", lines: [{ d: "Revisão do processo comercial e workshop (2 dias)", q: 2, p: 950 }, { d: "Avença mensal de acompanhamento, 1.º mês", q: 1, p: 1200 }], vat: 23, validity: "Válida por 21 dias" },
    board: { stages: ["Novo contacto", "Chamada marcada", "Proposta enviada", "Ganho"], cards: [
        { name: "Leonor Faria", what: "Estratégia para associação", value: 3500, stage: 0 },
        { name: "Bruno Oliveira", what: "Mentoria, 6 meses", value: 4800, stage: 3 },
        { name: "Lúmen Alimentar", what: "Revisão de preços", value: 2200, stage: 2 },
        { name: "Corvo & Filhos", what: "Workshop de direção", value: 1800, stage: 1 },
    ] },
    won: { msg: "Ótimo, Inês. Enviei as datas do workshop para o seu calendário e a fatura do sinal segue já." },
    invoice: { ref: "FT-0204", label: "Fatura", share: 1 },
    reviews: [
        { name: "Bruno Oliveira", text: "Ideias claras e próximos passos práticos depois de cada sessão.", when: "há 4 dias" },
        { name: "Águas Claras, Lda", text: "A Ruth ajudou-nos a duplicar a taxa de fecho num trimestre.", when: "há 3 semanas" },
    ],
    review: { ask: "Obrigada pelo workshop, Inês. Pode deixar umas palavras sobre o nosso trabalho?", text: "Dois dias com a Ruth deram-nos um processo comercial que toda a equipa segue." },
    captions: {
        enquiry: { t: "O pedido que chegou fora de horas", d: "Pedidos do site, email e WhatsApp chegam a uma caixa de entrada, mesmo quando está com um cliente. O assistente prepara a resposta com as suas palavras, pronta a enviar." },
        booking: { t: "Sem trocas de emails para marcar", d: "O seu link de marcação só mostra as horas livres. A Inês escolhe uma e o link da videochamada e o lembrete seguem sozinhos." },
        quote: { t: "Uma proposta aceite online", d: "Passe a chamada a uma proposta com preço, envie-a como link e veja quando é lida. Se ficar sem resposta, segue um lembrete." },
        won: { t: "Uma carteira sempre com negócios", d: "Cada contacto, chamada e proposta num quadro com o seu valor, para continuar a vender enquanto entrega e saber o que vai entrar." },
        invoice: { t: "Avenças faturadas todos os meses", d: "A proposta passa a fatura com link de pagamento por cartão. As avenças faturam-se sozinhas e quem se atrasa recebe um lembrete." },
        review: { t: "Testemunhos que recolhe mesmo", d: "No fim do trabalho segue um pedido de avaliação. As novas avaliações aparecem no CRM, prontas para o site e as propostas." },
    },
};

/* ── Agencies: Northlight Studio ─────────────────────────────────────── */

const AGENCIES_EN: DemoScript = {
    brand: { name: "Northlight Studio", short: "Northlight", initial: "N", color: "#4f46e5", owner: "Sam Ellery", ownerInitials: "SE", staff: "Sam" },
    currency: "GBP",
    customer: { name: "Grace Whitfield", first: "Grace", initials: "GW" },
    others: [
        { name: "Oakmoor Bakery", preview: "Love the new menu designs! One small change on page 2…", when: "1h", channel: "whatsapp" },
        { name: "Hollis & Rowe", preview: "Can you send over the September analytics report?", when: "Tue", channel: "email" },
        { name: "Juniper Yoga", preview: "Is the deposit invoice ready? Happy to pay today.", when: "Oct 21", channel: "web" },
    ],
    enquiry: { time: "18:55", msg: "Hi! We're a garden centre and our website is ancient. Could you quote for a new site with online ordering?", reply: "Hi Grace, we'd love to help. Let's start with a 30-minute discovery call so we can understand what you sell and how: choose a time here." },
    booking: { service: "Discovery call (video)", length: "30 min", price: "Free", day: "Friday 30 Oct", dayShort: "Fri", slots: ["10:00", "11:30", "14:00", "15:30"], pick: 0, with: "Sam" },
    diary: [[0, 10, 1, "Stand-up · team"], [0, 14, 2, "Shoot · Oakmoor"], [1, 11, 1, "Review · Hollis & Rowe"], [2, 9, 3, "Workshop · Juniper"], [3, 15, 1, "Call · Hollis & Rowe"], [4, 13, 2, "Sprint review"]],
    newBooking: [4, 10, 0.5],
    quote: { kind: "Proposal", ref: "P-0118", lines: [{ d: "Website design and build, up to 12 pages", q: 1, p: 4800 }, { d: "Online ordering and click-and-collect", q: 1, p: 1600 }, { d: "Care plan, first 3 months", q: 3, p: 120 }], vat: 20, validity: "Valid for 30 days" },
    board: { stages: ["Enquiry", "Discovery call", "Proposal sent", "Won"], cards: [
        { name: "Juniper Yoga", what: "Brand refresh", value: 2600, stage: 3 },
        { name: "Hollis & Rowe", what: "SEO retainer", value: 900, stage: 2 },
        { name: "Oakmoor Bakery", what: "Menus and print", value: 750, stage: 1 },
        { name: "Copperleaf Cafe", what: "Social media", value: 1200, stage: 0 },
    ] },
    won: { msg: "Brilliant, thank you Grace! Kick-off is booked for Monday at 10:00. The 50% deposit invoice follows now." },
    invoice: { ref: "INV-0412", label: "Deposit invoice (50%)", share: 0.5 },
    reviews: [
        { name: "Juniper Yoga", text: "Our bookings doubled after the new site. Lovely people to work with.", when: "5 days ago" },
        { name: "Oakmoor Bakery", text: "Quick, creative and always on WhatsApp when we need them.", when: "2 weeks ago" },
    ],
    review: { ask: "We loved building your site, Grace. Would you leave us a review?", text: "Proposal on Friday, deposit paid in a minute, site live in five weeks." },
    captions: {
        enquiry: { t: "No enquiry left in the wrong inbox", d: "Email, WhatsApp, Instagram and website messages come to one shared inbox, so nothing waits in someone's personal account. The assistant drafts the first reply." },
        booking: { t: "Discovery calls booked straight away", d: "Your booking link shows the team's free times. Grace picks one and gets the video link and a reminder." },
        quote: { t: "A clear proposal, accepted online", d: "Price the scope line by line, send it as a link and see when the client reads it. Scope is in writing before work starts." },
        won: { t: "Know what's coming in", d: "Enquiries, calls, proposals and won work on one board with values, so the pipeline doesn't run dry between projects." },
        invoice: { t: "Deposits paid before you start", d: "The accepted proposal becomes a 50% deposit invoice with a card payment link. Stage invoices and retainers go out on time, and late payers are reminded for you." },
        review: { t: "Reviews that win the next client", d: "When the project goes live, a review request goes out. New reviews appear in the CRM so you can reply and reuse them." },
    },
};

const AGENCIES_PT: DemoScript = {
    ...AGENCIES_EN,
    currency: "EUR",
    customer: { name: "Marta Silveira", first: "Marta", initials: "MS" },
    others: [
        { name: "Padaria Carvalhal", preview: "Adorámos os menus novos! Só uma alteração na página 2…", when: "1 h", channel: "whatsapp" },
        { name: "Holanda & Reis", preview: "Pode enviar-nos o relatório de setembro?", when: "ter", channel: "email" },
        { name: "Zimbro Yoga", preview: "A fatura do sinal já está pronta? Pagamos hoje.", when: "21 out", channel: "web" },
    ],
    enquiry: { time: "18:55", msg: "Olá! Somos um centro de jardinagem e o nosso site é muito antigo. Podem orçamentar um site novo com encomendas online?", reply: "Olá Marta, adorávamos ajudar. Vamos começar com uma chamada de 30 minutos para percebermos o que vendem e como: escolha uma hora aqui." },
    booking: { service: "Chamada inicial (vídeo)", length: "30 min", price: "Grátis", day: "Sexta, 30 out", dayShort: "sex", slots: ["10:00", "11:30", "14:00", "15:30"], pick: 0, with: "Sam" },
    diary: [[0, 10, 1, "Reunião · equipa"], [0, 14, 2, "Sessão fotográfica · Carvalhal"], [1, 11, 1, "Revisão · Holanda & Reis"], [2, 9, 3, "Workshop · Zimbro"], [3, 15, 1, "Chamada · Holanda & Reis"], [4, 13, 2, "Revisão do sprint"]],
    quote: { kind: "Proposta", ref: "P-0118", lines: [{ d: "Design e desenvolvimento do site, até 12 páginas", q: 1, p: 4800 }, { d: "Encomendas online e levantamento na loja", q: 1, p: 1600 }, { d: "Plano de manutenção, 3 primeiros meses", q: 3, p: 120 }], vat: 23, validity: "Válida por 30 dias" },
    board: { stages: ["Pedido", "Chamada inicial", "Proposta enviada", "Ganho"], cards: [
        { name: "Zimbro Yoga", what: "Renovação de marca", value: 2600, stage: 3 },
        { name: "Holanda & Reis", what: "Avença de SEO", value: 900, stage: 2 },
        { name: "Padaria Carvalhal", what: "Menus e impressão", value: 750, stage: 1 },
        { name: "Café Cobre", what: "Redes sociais", value: 1200, stage: 0 },
    ] },
    won: { msg: "Excelente, obrigado Marta! O arranque fica marcado para segunda às 10:00. A fatura do sinal de 50% segue agora." },
    invoice: { ref: "FT-0412", label: "Fatura de sinal (50%)", share: 0.5 },
    reviews: [
        { name: "Zimbro Yoga", text: "As marcações duplicaram com o site novo. Uma equipa ótima.", when: "há 5 dias" },
        { name: "Padaria Carvalhal", text: "Rápidos, criativos e sempre no WhatsApp quando precisamos.", when: "há 2 semanas" },
    ],
    review: { ask: "Adorámos fazer o vosso site, Marta. Deixam-nos uma avaliação?", text: "Proposta na sexta, sinal pago num minuto, site no ar em cinco semanas." },
    captions: {
        enquiry: { t: "Nenhum pedido na caixa errada", d: "Email, WhatsApp, Instagram e mensagens do site chegam a uma caixa de entrada partilhada, sem nada parado na conta pessoal de alguém. O assistente prepara a primeira resposta." },
        booking: { t: "Chamadas iniciais marcadas logo", d: "O seu link de marcação mostra as horas livres da equipa. A Marta escolhe uma e recebe o link da videochamada e um lembrete." },
        quote: { t: "Uma proposta clara, aceite online", d: "Defina o âmbito linha a linha, envie como link e veja quando o cliente a lê. O âmbito fica por escrito antes de começar." },
        won: { t: "Saiba o que vai entrar", d: "Pedidos, chamadas, propostas e projetos ganhos num quadro com valores, para não ficar sem trabalho entre projetos." },
        invoice: { t: "Sinal pago antes de começar", d: "A proposta aceite passa a fatura de sinal de 50% com link de pagamento por cartão. Faturas por fase e avenças seguem a tempo, e quem se atrasa recebe lembrete." },
        review: { t: "Avaliações que trazem o próximo cliente", d: "Quando o projeto vai para o ar, segue um pedido de avaliação. As novas avaliações aparecem no CRM para responder e reutilizar." },
    },
};

export const DEMO_SCRIPTS: Partial<Record<string, Record<IndustryLocale, DemoScript>>> = {
    trades: { en: TRADES_EN, pt: TRADES_PT },
    consultants: { en: CONSULTANTS_EN, pt: CONSULTANTS_PT },
    agencies: { en: AGENCIES_EN, pt: AGENCIES_PT },
};

/** Words on the demo's own buttons and screens. */
export const DEMO_UI = {
    en: {
        crm: "Your CRM", phone: "Your customer's phone",
        nav: { dashboard: "Dashboard", inbox: "Inbox", bookings: "Bookings", quotes: "Quotes", board: "Opportunities", billing: "Billing", reviews: "Reputation", clients: "Clients" },
        inbox: "Inbox", unread: "1 unread", search: "Search anything…", replyOn: "Reply on WhatsApp…", suggest: "Suggest", send: "Send", sent: "Sent", today: "Today",
        aiNote: "Drafted by the assistant from your prices and diary",
        week: ["Mon", "Tue", "Wed", "Thu", "Fri"], bookings: "Bookings this week", newBooking: "New booking",
        draft: "Draft", sentS: "Sent", opened: "Opened", accepted: "Accepted", paid: "Paid", subtotal: "Subtotal", vat: "VAT", total: "Total", sendQuote: "Send", sendInvoice: "Send with payment link",
        toInvoice: "Made from the accepted quote", paidBy: "Paid by card", moneyIn: "Money in this month",
        rating: "Average rating", newReview: "New",
        wa: "online", typing: "typing…", message: "Message",
        bookTitle: "Book online", pickTime: "Pick a time", confirm: "Confirm", booked: "You're booked", reminder: "We'll remind you the day before.",
        accept: "Accept", acceptedMsg: "Accepted. Thank you!", pay: "Pay", paidMsg: "Payment received", card: "Card ending 4242", secure: "Secure payment",
        leaveReview: "Leave a review", thanks: "Thank you!",
        play: "Play", pause: "Pause", next: "Next", restart: "Watch again", tap: "Click to continue", scene: (i: number, n: number) => `${i} of ${n}`,
        note: "A demo with an invented business. Click the highlighted button to move it on, or let it play.",
    },
    pt: {
        crm: "O seu CRM", phone: "O telemóvel do cliente",
        nav: { dashboard: "Painel", inbox: "Caixa de entrada", bookings: "Marcações", quotes: "Orçamentos", board: "Oportunidades", billing: "Faturação", reviews: "Reputação", clients: "Clientes" },
        inbox: "Caixa de entrada", unread: "1 por ler", search: "Pesquisar…", replyOn: "Responder no WhatsApp…", suggest: "Sugerir", send: "Enviar", sent: "Enviada", today: "Hoje",
        aiNote: "Preparada pelo assistente com os seus preços e agenda",
        week: ["seg", "ter", "qua", "qui", "sex"], bookings: "Marcações desta semana", newBooking: "Nova marcação",
        draft: "Rascunho", sentS: "Enviado", opened: "Aberto", accepted: "Aceite", paid: "Paga", subtotal: "Subtotal", vat: "IVA", total: "Total", sendQuote: "Enviar", sendInvoice: "Enviar com link de pagamento",
        toInvoice: "Feita a partir do orçamento aceite", paidBy: "Paga por cartão", moneyIn: "Recebido este mês",
        rating: "Classificação média", newReview: "Nova",
        wa: "online", typing: "a escrever…", message: "Mensagem",
        bookTitle: "Marcar online", pickTime: "Escolha a hora", confirm: "Confirmar", booked: "Está marcado", reminder: "Enviamos um lembrete na véspera.",
        accept: "Aceitar", acceptedMsg: "Aceite. Obrigado!", pay: "Pagar", paidMsg: "Pagamento recebido", card: "Cartão terminado em 4242", secure: "Pagamento seguro",
        leaveReview: "Deixar avaliação", thanks: "Obrigado!",
        play: "Reproduzir", pause: "Pausar", next: "Seguinte", restart: "Ver de novo", tap: "Clique para continuar", scene: (i: number, n: number) => `${i} de ${n}`,
        note: "Uma demonstração com um negócio inventado. Clique no botão destacado para avançar, ou deixe correr.",
    },
};
