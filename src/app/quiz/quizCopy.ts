/**
 * The words of the quiz funnel (/quiz and /pt/diagnostico).
 *
 * The answers are sent to the CRM's quiz funnels (autisync-quiz-en and
 * autisync-questionario) with the same keys and the same option wording the
 * CRM uses, so the lead is tagged by business type there (trades, property,
 * beauty) exactly as if it came from the CRM's own page. Change an option
 * here and change it in the CRM funnel too, or the tag stops matching.
 */

export type QuizLang = "en" | "pt";
export type BusinessKind = "trades" | "property" | "beauty" | "other";
export type ProblemKind = "calls" | "enquiries" | "admin" | "website";

export interface QuizQuestion {
    key: "business_type" | "main_problem" | "team_size";
    title: string;
    options: Array<{ value: string; hint?: string }>;
}

export interface Plan {
    title: string;
    lead: string;
    points: Array<{ t: string; d: string }>;
}

const EN = {
    crmFunnel: "autisync-quiz-en",
    home: "/",
    homeLabel: "Autisync home",
    switchHref: "/pt/diagnostico",
    switchLabel: "PT",
    switchAria: "Ver em português",
    kicker: "Free 1-minute check",
    title: "Find out what would save your business the most time.",
    lead: "Three quick questions. Then you'll see what we would set up for a business like yours, and you can book a free 15-minute call straight away.",
    promises: ["Takes under a minute", "No sign-up, no card", "Real people, in the UK and Portugal"],
    stepOf: (n: number, total: number) => `Question ${n} of ${total}`,
    contactStepOf: (total: number) => `Last step of ${total}`,
    back: "Back",
    questions: [
        {
            key: "business_type",
            title: "What kind of business do you run?",
            options: [
                { value: "Trades and home services", hint: "Builders, plumbers, electricians, cleaners" },
                { value: "Estate or letting agency", hint: "Sales, lettings, property management" },
                { value: "Beauty, health or wellness", hint: "Salons, clinics, studios" },
                { value: "Something else", hint: "Any other local business" },
            ],
        },
        {
            key: "main_problem",
            title: "What gets in the way most?",
            options: [
                { value: "Missed calls and messages" },
                { value: "Not enough new enquiries" },
                { value: "Too much admin" },
                { value: "No proper website" },
            ],
        },
        {
            key: "team_size",
            title: "How many people work in the business?",
            options: [{ value: "Just me" }, { value: "2 to 5" }, { value: "6 to 20" }, { value: "More than 20" }],
        },
    ] as QuizQuestion[],
    contactTitle: "Where should we send your results?",
    contactHint: "We'll show them on the next screen too. No spam, ever.",
    name: "Your name",
    phone: "Phone or WhatsApp",
    email: "Email",
    consent: "Autisync may contact me about my results.",
    privacyPre: "How we use your details: ",
    privacyLabel: "privacy policy",
    privacyHref: "/legal/privacy",
    submit: "See my results",
    sending: "Sending…",
    errName: "Your name, please.",
    errPhone: "A phone number we can reach you on.",
    errEmail: "That email address doesn't look right.",
    errConsent: "Tick this so we may contact you.",
    errSend: "That didn't send. Please try again.",
    errBusy: "Too many tries. Please wait a few minutes and try again.",
    resultKicker: "Your results",
    bookTitle: "Book your free 15-minute call",
    bookLead: "Pick a time that suits you. We'll go through your plan and show it working, with no obligation.",
    bookPre: "Rather we called you? We have your number and will be in touch soon.",
    restart: "Start again",
    footer: "Autisync",
    footPrivacy: "Privacy",
    terms: "Terms",
    termsHref: "/legal/terms",
};

const PT: typeof EN = {
    crmFunnel: "autisync-questionario",
    home: "/pt",
    homeLabel: "Página inicial da Autisync",
    switchHref: "/quiz",
    switchLabel: "EN",
    switchAria: "View in English",
    kicker: "Diagnóstico gratuito de 1 minuto",
    title: "Descubra o que pouparia mais tempo ao seu negócio.",
    lead: "Três perguntas rápidas. Depois vê o que faríamos para um negócio como o seu e pode marcar logo uma chamada gratuita de 15 minutos.",
    promises: ["Demora menos de um minuto", "Sem registo, sem cartão", "Pessoas reais, em Portugal e no Reino Unido"],
    stepOf: (n: number, total: number) => `Pergunta ${n} de ${total}`,
    contactStepOf: (total: number) => `Último passo de ${total}`,
    back: "Voltar",
    questions: [
        {
            key: "business_type",
            title: "Que tipo de negócio tem?",
            options: [
                { value: "Obras e serviços ao domicílio", hint: "Construção, canalização, eletricidade, limpezas" },
                { value: "Imobiliária ou arrendamento", hint: "Venda, arrendamento, gestão de imóveis" },
                { value: "Beleza, saúde ou bem-estar", hint: "Cabeleireiros, clínicas, estúdios" },
                { value: "Outro", hint: "Qualquer outro negócio local" },
            ],
        },
        {
            key: "main_problem",
            title: "O que mais atrapalha?",
            options: [
                { value: "Chamadas e mensagens perdidas" },
                { value: "Poucos pedidos novos" },
                { value: "Demasiada papelada" },
                { value: "Sem um site a sério" },
            ],
        },
        {
            key: "team_size",
            title: "Quantas pessoas trabalham no negócio?",
            options: [{ value: "Só eu" }, { value: "2 a 5" }, { value: "6 a 20" }, { value: "Mais de 20" }],
        },
    ],
    contactTitle: "Para onde enviamos os seus resultados?",
    contactHint: "Também os mostramos no ecrã seguinte. Nada de spam.",
    name: "O seu nome",
    phone: "Telemóvel ou WhatsApp",
    email: "Email",
    consent: "A Autisync pode contactar-me sobre os meus resultados.",
    privacyPre: "Como usamos os seus dados: ",
    privacyLabel: "política de privacidade",
    privacyHref: "/pt/legal/privacidade",
    submit: "Ver os meus resultados",
    sending: "A enviar…",
    errName: "O seu nome, por favor.",
    errPhone: "Um número para o podermos contactar.",
    errEmail: "Esse email parece incompleto.",
    errConsent: "Assinale para o podermos contactar.",
    errSend: "Não foi enviado. Tente novamente.",
    errBusy: "Demasiadas tentativas. Aguarde alguns minutos e tente de novo.",
    resultKicker: "Os seus resultados",
    bookTitle: "Marque a sua chamada gratuita de 15 minutos",
    bookLead: "Escolha a hora que lhe dá jeito. Vemos o seu plano e mostramos tudo a funcionar, sem compromisso.",
    bookPre: "Prefere que liguemos nós? Já temos o seu número e entramos em contacto em breve.",
    restart: "Recomeçar",
    footer: "Autisync",
    footPrivacy: "Privacidade",
    terms: "Termos",
    termsHref: "/pt/legal/termos",
};

export const QUIZ_COPY: Record<QuizLang, typeof EN> = { en: EN, pt: PT };

/** Which plan an answer to the first question leads to. */
export function businessKind(answer: string): BusinessKind {
    if (/trades|obras/i.test(answer)) return "trades";
    if (/estate|letting|imobili/i.test(answer)) return "property";
    if (/beauty|beleza/i.test(answer)) return "beauty";
    return "other";
}

export function problemKind(answer: string): ProblemKind {
    if (/call|chamada/i.test(answer)) return "calls";
    if (/enquir|pedidos/i.test(answer)) return "enquiries";
    if (/admin|papelada/i.test(answer)) return "admin";
    return "website";
}

export const PLANS: Record<QuizLang, Record<BusinessKind, Plan>> = {
    en: {
        trades: {
            title: "Every call answered, even when you're on a job.",
            lead: "Missed calls become booked jobs: each caller gets a text back straight away, and every enquiry lands in one list with its quote.",
            points: [
                { t: "Missed-call text back", d: "The caller hears from you in seconds, not hours, so they don't ring the next name on Google." },
                { t: "Quotes that follow themselves up", d: "A friendly reminder goes out when a quote hasn't been answered." },
                { t: "Reviews after every job", d: "Happy customers are asked for a Google review while the job is fresh." },
            ],
        },
        property: {
            title: "Portal leads answered in minutes, and valuations booked.",
            lead: "Enquiries from Rightmove, your website and social media arrive in one place, get a reply straight away, and sellers book their own valuation.",
            points: [
                { t: "One inbox for every portal", d: "Rightmove, your website and Facebook in one list, each with its property attached." },
                { t: "Valuations on autopilot", d: "Sellers pick a time online; the visit lands in the right diary." },
                { t: "Lettings under control", d: "Rent, repairs and gas safety, EICR and EPC dates tracked before they're due." },
            ],
        },
        beauty: {
            title: "A fuller diary and fewer no-shows.",
            lead: "Clients book themselves at any hour, get reminded before they come, and are invited back when they're due.",
            points: [
                { t: "Online booking, day and night", d: "Clients choose the treatment and time, and can pay a deposit up front." },
                { t: "Reminders that cut no-shows", d: "By WhatsApp and email before every appointment." },
                { t: "Rebooking nudges", d: "Clients are invited back at the right time, without you chasing." },
            ],
        },
        other: {
            title: "Less admin, more time for the work that pays.",
            lead: "Every enquiry in one place, answered quickly, followed up without you having to remember.",
            points: [
                { t: "Every enquiry in one place", d: "Calls, WhatsApp, email and your website in a single list." },
                { t: "Follow-ups that happen by themselves", d: "Nobody waits for an answer, and no lead goes cold." },
                { t: "A website that brings in work", d: "Fast, clear and found on Google, with booking built in." },
            ],
        },
    },
    pt: {
        trades: {
            title: "Todas as chamadas atendidas, mesmo quando está numa obra.",
            lead: "As chamadas perdidas passam a trabalhos marcados: quem liga recebe logo uma mensagem e cada pedido fica numa lista, com o orçamento.",
            points: [
                { t: "Resposta automática a chamadas perdidas", d: "Quem ligou recebe notícias suas em segundos, e não liga ao próximo do Google." },
                { t: "Orçamentos com seguimento", d: "Sai um lembrete simpático quando um orçamento fica sem resposta." },
                { t: "Avaliações depois de cada trabalho", d: "Os clientes satisfeitos são convidados a avaliar no Google enquanto está fresco." },
            ],
        },
        property: {
            title: "Contactos dos portais respondidos em minutos e avaliações marcadas.",
            lead: "Os pedidos do idealista, do Imovirtual, do seu site e das redes sociais chegam a um só sítio, têm resposta imediata e os proprietários marcam a avaliação sozinhos.",
            points: [
                { t: "Uma só caixa para todos os portais", d: "idealista, Imovirtual, o seu site e o Facebook numa lista, cada pedido com o imóvel." },
                { t: "Angariação sem papelada", d: "Os proprietários escolhem a hora online e a visita fica na agenda certa." },
                { t: "Arrendamentos em dia", d: "Rendas, reparações e prazos tratados antes de vencerem." },
            ],
        },
        beauty: {
            title: "Agenda mais cheia e menos faltas.",
            lead: "Os clientes marcam sozinhos a qualquer hora, recebem lembretes antes de virem e são convidados a voltar na altura certa.",
            points: [
                { t: "Marcações online, dia e noite", d: "O cliente escolhe o serviço e a hora, e pode pagar um sinal." },
                { t: "Lembretes que reduzem faltas", d: "Por WhatsApp e email antes de cada marcação." },
                { t: "Convites para voltar", d: "Os clientes são lembrados na altura certa, sem ter de andar atrás deles." },
            ],
        },
        other: {
            title: "Menos papelada, mais tempo para o trabalho que paga.",
            lead: "Todos os pedidos num só sítio, respondidos depressa e com seguimento sem ter de se lembrar.",
            points: [
                { t: "Todos os pedidos num só sítio", d: "Chamadas, WhatsApp, email e o seu site numa única lista." },
                { t: "Seguimentos que acontecem sozinhos", d: "Ninguém fica à espera de resposta e nenhum contacto arrefece." },
                { t: "Um site que traz trabalho", d: "Rápido, claro e encontrado no Google, com marcações incluídas." },
            ],
        },
    },
};

/** One line on the call itself, from what they said gets in the way most. */
export const PROBLEM_LINE: Record<QuizLang, Record<ProblemKind, string>> = {
    en: {
        calls: "You said missed calls hurt most, so on the call we'll show you the text-back working on a real number.",
        enquiries: "You said you need more enquiries, so on the call we'll look at where they could come from: Google, your website and social media.",
        admin: "You said admin takes too much time, so on the call we'll pick the two or three jobs we can take off your plate first.",
        website: "You said you need a proper website, so on the call we'll show you examples and what one would cost for your business.",
    },
    pt: {
        calls: "Disse que as chamadas perdidas são o maior problema, por isso na chamada mostramos a resposta automática a funcionar num número real.",
        enquiries: "Disse que precisa de mais pedidos, por isso na chamada vemos de onde podem vir: Google, o seu site e as redes sociais.",
        admin: "Disse que a papelada lhe tira demasiado tempo, por isso na chamada escolhemos as duas ou três tarefas que lhe podemos tirar primeiro.",
        website: "Disse que precisa de um site a sério, por isso na chamada mostramos exemplos e quanto custaria um para o seu negócio.",
    },
};
