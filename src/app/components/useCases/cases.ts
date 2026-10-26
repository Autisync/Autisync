/**
 * Use cases for the CRM, played as short scenes on a phone in
 * <UseCases />. Only what the CRM does today (see the notes at the top of
 * /clinics and /pt/clinicas): the missed-call text-back is UK-only and texts
 * by SMS, and invoicing is not certified in Portugal yet. Social media posts,
 * Google Business Profile and ads are add-ons (extra: ...): switched on per
 * business in the CRM and priced on their own, and the cases say so. Names,
 * times and prices in the scenes are made up, and the section says so.
 */

export type Beat =
    | { k: "sys"; text: string }
    | { k: "in"; text: string }
    | { k: "out"; text: string; tag?: "auto" | "reply" }
    | { k: "card"; title: string; lines: string[]; tone?: "ok" | "warn" | "info"; badge?: string }
    | { k: "pick"; title: string; slots: string[]; chosen: number }
    | { k: "stars"; label: string };

export type Channel = "whatsapp" | "sms" | "web" | "crm";

export type Group = "clinics" | "salons" | "agencies" | "services";
/** Add-ons: not in the core CRM, priced on their own in the proposal. */
export type Extra = "social" | "ads" | "google";

export type UseCase = {
    id: string;
    icon: "missed" | "chat" | "booking" | "bell" | "noshow" | "star" | "repeat" | "inbox" | "invoice" | "quote" | "mail" | "quiz" | "post" | "ads" | "google" | "home" | "pipeline";
    /** Which businesses it is shown for; "all" for every one. */
    for: Group[] | "all";
    extra?: Extra;
    label: string;
    who: string;
    desc: string;
    result: string;
    channel: Channel;
    screen: string;
    beats: Beat[];
};

export type UseCaseCopy = {
    auto: string;
    reply: string;
    play: string;
    pause: string;
    prev: string;
    next: string;
    of: string;
    resultLabel: string;
    typing: string;
    all: string;
    groups: Record<Group, string>;
    extraLabel: string;
    extraNote: string;
    example: string;
    channels: Record<Channel, string>;
};

export const ptCopy: UseCaseCopy = {
    auto: "Automática",
    reply: "A sua resposta",
    play: "Reproduzir",
    pause: "Pausar",
    prev: "Caso anterior",
    next: "Caso seguinte",
    of: "de",
    resultLabel: "Resultado",
    typing: "a escrever…",
    all: "Todos os casos",
    groups: { clinics: "Clínicas", salons: "Salões e barbearias", agencies: "Imobiliárias", services: "Obras e serviços" },
    extraLabel: "Extra",
    extraNote: "Módulo extra, com preço mensal próprio indicado na proposta. Só fica ativo na sua conta se o incluir.",
    example: "Exemplos ilustrativos: os nomes, horários e preços são fictícios.",
    channels: { whatsapp: "WhatsApp", sms: "SMS", web: "Site", crm: "CRM Autisync" },
};

export const enCopy: UseCaseCopy = {
    auto: "Automatic",
    reply: "Your reply",
    play: "Play",
    pause: "Pause",
    prev: "Previous case",
    next: "Next case",
    of: "of",
    resultLabel: "What you get",
    typing: "typing…",
    all: "All use cases",
    groups: { clinics: "Clinics", salons: "Salons and barbers", agencies: "Estate agents", services: "Trades and services" },
    extraLabel: "Add-on",
    extraNote: "An add-on with its own monthly price, written in your proposal. It is only switched on in your account if you include it.",
    example: "Illustrative examples: names, times and prices are made up.",
    channels: { whatsapp: "WhatsApp", sms: "Text message", web: "Website", crm: "Autisync CRM" },
};

export const ptCases: UseCase[] = [
    {
        id: "fora-de-horas",
        for: "all",
        icon: "chat",
        label: "Mensagens fora de horas",
        who: "Clínica de estética · terça-feira, 21h00, com a clínica fechada",
        desc: "Quem lhe escreve no WhatsApp recebe logo a resposta que a clínica escreveu uma única vez, com o link para marcar. A conversa fica na caixa de entrada do CRM, com uma tarefa para a equipa.",
        result: "Ninguém fica à espera até de manhã.",
        channel: "whatsapp",
        screen: "Clínica Aurora",
        beats: [
            { k: "sys", text: "Terça-feira, 21h00" },
            { k: "in", text: "Boa noite! Ainda têm vaga para uma limpeza de pele na sexta?" },
            { k: "out", text: "Olá, Marta! Obrigada pela mensagem. Pode ver as vagas e marcar já aqui: aurora.pt/marcar. Amanhã de manhã respondemos às suas dúvidas.", tag: "auto" },
            { k: "card", title: "Nova tarefa no CRM", lines: ["Responder à Marta (WhatsApp)", "Amanhã, 9h00"], tone: "info" },
        ],
    },
    {
        id: "marcacao-online",
        for: ["clinics", "salons"],
        icon: "booking",
        label: "Marcações online",
        who: "Cabeleireiro · domingo à noite",
        desc: "A cliente escolhe o serviço e a hora no seu site, sem telefonar. A marcação entra na agenda do salão e ela recebe logo a confirmação, por WhatsApp ou e-mail.",
        result: "A agenda enche-se mesmo com o salão fechado.",
        channel: "web",
        screen: "studiobela.pt/marcar",
        beats: [
            { k: "card", title: "Corte e brushing", lines: ["45 minutos · com a Joana"], tone: "info" },
            { k: "pick", title: "Sexta-feira", slots: ["10h00", "11h30", "14h00", "16h30"], chosen: 2 },
            { k: "card", title: "Marcação confirmada", lines: ["Corte e brushing", "Sexta-feira, 14h00 · Studio Bela"], tone: "ok" },
            { k: "sys", text: "Confirmação enviada por WhatsApp" },
        ],
    },
    {
        id: "lembretes",
        for: ["clinics", "salons"],
        icon: "bell",
        label: "Lembretes antes da consulta",
        who: "Clínica dentária · na véspera da consulta",
        desc: "Na véspera, o paciente recebe um lembrete da marcação. Se precisar de mudar, responde à mensagem e a resposta chega à caixa de entrada da clínica.",
        result: "Menos esquecimentos e menos horários vazios.",
        channel: "whatsapp",
        screen: "Clínica Sorriso",
        beats: [
            { k: "sys", text: "Quinta-feira, 10h00" },
            { k: "out", text: "Olá, João. Lembramos a sua consulta amanhã, sexta-feira, às 9h30, na Clínica Sorriso. Se precisar de mudar, responda a esta mensagem.", tag: "auto" },
            { k: "in", text: "Obrigado, lá estarei!" },
        ],
    },
    {
        id: "faltas",
        for: ["clinics", "salons"],
        icon: "noshow",
        label: "Quem falta volta a marcar",
        who: "Clínica de fisioterapia · depois de uma falta",
        desc: "Quando alguém falta a uma marcação, recebe uma mensagem com uma proposta de nova data, sem ninguém da equipa ter de ligar.",
        result: "A vaga perdida dá lugar a uma nova marcação.",
        channel: "whatsapp",
        screen: "Fisio Movimento",
        beats: [
            { k: "card", title: "Marcação das 15h00", lines: ["Inês Costa · não compareceu"], tone: "warn" },
            { k: "out", text: "Olá, Inês. Sentimos a sua falta hoje! Quer escolher outra data? Pode marcar aqui: fisiomovimento.pt/marcar", tag: "auto" },
            { k: "in", text: "Peço desculpa, tive um imprevisto. Já marquei para terça." },
            { k: "card", title: "Nova marcação", lines: ["Terça-feira, 11h00"], tone: "ok" },
        ],
    },
    {
        id: "avaliacoes",
        for: "all",
        icon: "star",
        label: "Avaliações no Google",
        who: "Salão de beleza · algumas horas depois do serviço",
        desc: "Algumas horas depois do serviço, a cliente recebe um convite para deixar uma avaliação no Google, enquanto ainda tem a visita bem presente.",
        result: "Mais avaliações, sem ter de as pedir uma a uma.",
        channel: "whatsapp",
        screen: "Studio Bela",
        beats: [
            { k: "sys", text: "Hoje, 18h00" },
            { k: "out", text: "Obrigada pela visita, Sofia! Se gostou, deixe-nos uma avaliação no Google. Ajuda-nos muito.", tag: "auto" },
            { k: "stars", label: "Avaliação no Google" },
        ],
    },
    {
        id: "voltar",
        for: ["clinics", "salons"],
        icon: "repeat",
        label: "Convites para voltar",
        who: "Barbearia · quatro semanas depois do último corte",
        desc: "Quando chega a altura do próximo corte, da manutenção ou da consulta de rotina, o cliente recebe um convite para marcar, ao ritmo de cada serviço.",
        result: "Os clientes regressam sem se esquecerem de si.",
        channel: "whatsapp",
        screen: "Barbearia Central",
        beats: [
            { k: "sys", text: "4 semanas depois do último corte" },
            { k: "out", text: "Olá, Pedro! Já passaram quatro semanas desde o seu último corte. Quer marcar o próximo? barbeariacentral.pt/marcar", tag: "auto" },
            { k: "card", title: "O Pedro marcou online", lines: ["Sábado, 10h00 · corte e barba"], tone: "ok" },
        ],
    },
    {
        id: "caixa-de-entrada",
        for: "all",
        icon: "inbox",
        label: "Uma só caixa de entrada",
        who: "Para toda a equipa · ao longo do dia",
        desc: "As mensagens do WhatsApp e do formulário do site chegam a uma só caixa de entrada no CRM, com a ficha do cliente ao lado e uma tarefa para quem vai responder.",
        result: "Ninguém responde duas vezes e ninguém fica sem resposta.",
        channel: "crm",
        screen: "Caixa de entrada",
        beats: [
            { k: "card", title: "Marta · WhatsApp", lines: ["Ainda têm vaga na sexta?"], badge: "Nova", tone: "info" },
            { k: "card", title: "Ana · formulário do site", lines: ["Gostava de saber o preço do branqueamento."], badge: "Nova", tone: "info" },
            { k: "card", title: "Tarefa atribuída à Carla", lines: ["Ligar à Ana · hoje, até às 12h00"], tone: "ok" },
        ],
    },
    {
        id: "faturas",
        for: "all",
        icon: "invoice",
        label: "Faturas e pagamentos",
        who: "Depois do tratamento · a partir da ficha do cliente",
        desc: "Emita a fatura e o pedido de pagamento a partir da ficha do cliente. A certificação da faturação está em curso: até lá, pode continuar a usar o seu programa certificado para as faturas.",
        result: "Tudo sobre cada cliente, num só sítio.",
        channel: "crm",
        screen: "Ficha da cliente",
        beats: [
            { k: "card", title: "Marta Silva", lines: ["Limpeza de pele · 60,00 €", "Sexta-feira, 14h00"], tone: "info" },
            { k: "card", title: "Pedido de pagamento enviado", lines: ["60,00 € · por e-mail"], tone: "ok" },
        ],
    },
    {
        id: "visitas",
        icon: "home",
        for: ["agencies"],
        label: "Visitas marcadas online",
        who: "Imobiliária · um interessado num T2, ao fim do dia",
        desc: "Quem vê o imóvel no seu site escolhe a hora da visita, sem trocar mensagens. A visita entra na agenda do consultor, com a ficha do interessado.",
        result: "Mais visitas marcadas, menos telefonemas para combinar horas.",
        channel: "web",
        screen: "horizonte.pt/imoveis",
        beats: [
            { k: "card", title: "T2 em Alcântara", lines: ["Ref. 2214 · com varanda"], tone: "info" },
            { k: "pick", title: "Sábado", slots: ["10h00", "11h00", "15h00", "16h00"], chosen: 1 },
            { k: "card", title: "Visita marcada", lines: ["Sábado, 11h00 · com o Nuno"], tone: "ok" },
        ],
    },
    {
        id: "funil-de-vendas",
        icon: "pipeline",
        for: ["agencies", "services"],
        label: "Funil de vendas",
        who: "Empresa de remodelações · de pedido a obra ganha",
        desc: "Cada pedido entra como um negócio no funil. Vê em que fase está, quanto vale e quem tem de agir a seguir, e o CRM lembra a equipa dos seguimentos.",
        result: "Nenhum orçamento fica esquecido numa gaveta.",
        channel: "crm",
        screen: "Funil de vendas",
        beats: [
            { k: "card", title: "Novo contacto", lines: ["Rui Martins · remodelação de casa de banho"], tone: "info", badge: "Novo" },
            { k: "card", title: "Proposta enviada", lines: ["3.450,00 € · seguimento na quinta-feira"], tone: "info" },
            { k: "card", title: "Ganho", lines: ["Rui Martins · 3.450,00 €"], tone: "ok" },
        ],
    },
    {
        id: "orcamentos",
        icon: "quote",
        for: ["services", "clinics"],
        label: "Orçamentos aceites online",
        who: "Obras e serviços · depois da visita ao cliente",
        desc: "Envie o orçamento por link. O cliente lê-o no telemóvel e aceita-o com o nome, e o negócio avança sozinho no funil.",
        result: "Uma resposta mais rápida, sem papéis para assinar e digitalizar.",
        channel: "web",
        screen: "Orçamento n.º 0142",
        beats: [
            { k: "card", title: "Remodelação de casa de banho", lines: ["3.450,00 € · válido 30 dias"], tone: "info" },
            { k: "sys", text: "O cliente abriu o orçamento" },
            { k: "card", title: "Aceite por Rui Martins", lines: ["Hoje, 18h12"], tone: "ok" },
        ],
    },
    {
        id: "sequencia-email",
        icon: "mail",
        for: "all",
        label: "Seguimento por e-mail",
        who: "Qualquer negócio · depois de um pedido de informação",
        desc: "Quem pede informação recebe uma sequência de e-mails que escreveu uma vez, nos dias certos. Se responder, a resposta chega à sua caixa de entrada.",
        result: "Os contactos não arrefecem enquanto a equipa está ocupada.",
        channel: "crm",
        screen: "Sequência de e-mails",
        beats: [
            { k: "card", title: "Dia 0 · Obrigado pelo seu pedido", lines: ["Enviado"], tone: "ok" },
            { k: "card", title: "Dia 2 · Ficou com alguma dúvida?", lines: ["Enviado"], tone: "ok" },
            { k: "in", text: "Olá! Podem ligar-me amanhã de manhã?" },
        ],
    },
    {
        id: "questionario",
        icon: "quiz",
        for: "all",
        label: "Questionário que gera contactos",
        who: "Qualquer negócio · no site ou num anúncio",
        desc: "Um questionário de um minuto qualifica quem visita o site. O contacto entra no CRM com as respostas, pronto para a equipa ligar.",
        result: "Sabe o que cada contacto precisa antes de lhe ligar.",
        channel: "web",
        screen: "Diagnóstico de 1 minuto",
        beats: [
            { k: "card", title: "Pergunta 1 de 3", lines: ["O que procura?"], tone: "info" },
            { k: "pick", title: "Escolha uma opção", slots: ["Tratamento", "Consulta", "Orçamento", "Outro"], chosen: 1 },
            { k: "card", title: "Novo contacto no CRM", lines: ["Consulta · respostas guardadas"], tone: "ok", badge: "Novo" },
        ],
    },
    {
        id: "redes-sociais",
        icon: "post",
        for: "all",
        extra: "social",
        label: "Publicações nas redes sociais",
        who: "Qualquer negócio · uma vez por semana",
        desc: "Ligue as páginas do Facebook, do Instagram e do LinkedIn ao CRM. Prepare e agende as publicações num só sítio e o CRM publica-as à hora marcada.",
        result: "Presença constante nas redes, sem andar de aplicação em aplicação.",
        channel: "crm",
        screen: "Publicações",
        beats: [
            { k: "card", title: "Publicação agendada", lines: ["Sexta-feira, 12h00", "Instagram · Facebook"], tone: "info" },
            { k: "sys", text: "Sexta-feira, 12h00" },
            { k: "card", title: "Publicada", lines: ["Instagram ✓ · Facebook ✓"], tone: "ok" },
        ],
    },
    {
        id: "google",
        icon: "google",
        for: "all",
        extra: "google",
        label: "Perfil da Empresa no Google",
        who: "Qualquer negócio · quando chega uma avaliação",
        desc: "Ligue o seu Perfil da Empresa no Google ao CRM. As avaliações aparecem no CRM e pode responder-lhes sem sair dele.",
        result: "Cada avaliação tem resposta, e quem procura no Google vê-o.",
        channel: "crm",
        screen: "Avaliações no Google",
        beats: [
            { k: "stars", label: "Nova avaliação · Sofia R." },
            { k: "out", text: "Obrigada, Sofia! Foi um prazer recebê-la. Até à próxima!", tag: "reply" },
            { k: "sys", text: "Resposta publicada no Google" },
        ],
    },
    {
        id: "anuncios",
        icon: "ads",
        for: "all",
        extra: "ads",
        label: "Anúncios com resultados à vista",
        who: "Qualquer negócio · numa campanha",
        desc: "Prepare anúncios para o Facebook e o Instagram a partir do CRM e veja, para cada anúncio, quanto custou e quantos contactos trouxe.",
        result: "Sabe onde o dinheiro dos anúncios rende, e onde não.",
        channel: "crm",
        screen: "Anúncios",
        beats: [
            { k: "card", title: "Anúncio: limpeza de pele", lines: ["Facebook e Instagram · 5 € por dia"], tone: "info" },
            { k: "card", title: "Últimos 7 dias", lines: ["35,00 € · 9 contactos", "3,89 € por contacto"], tone: "ok" },
        ],
    },
];

export const enCases: UseCase[] = [
    {
        id: "missed-call",
        for: "all",
        icon: "missed",
        label: "Missed-call text-back",
        who: "Aesthetic clinic · 11:20, with a client in the chair",
        desc: "When you can't pick up, a caller on a UK mobile gets a text from your business within seconds. Their reply lands in your CRM inbox with a reminder to ring back. You keep your own number.",
        result: "No caller is left wondering, and you know exactly who to ring back.",
        channel: "sms",
        screen: "Aurora Clinic",
        beats: [
            { k: "sys", text: "Missed call · 11:20" },
            { k: "out", text: "Sorry we missed your call! This is Aurora Clinic. How can we help? Reply here and we'll get back to you.", tag: "auto" },
            { k: "in", text: "Hi, I'd like to book a skin consultation please." },
            { k: "card", title: "New task in your CRM", lines: ["Ring Emma back", "Today, 12:00"], tone: "info" },
        ],
    },
    {
        id: "out-of-hours",
        for: "all",
        icon: "chat",
        label: "Out-of-hours messages",
        who: "Aesthetic clinic · Tuesday, 21:00, clinic closed",
        desc: "Anyone who messages you on WhatsApp gets the reply you wrote once, with the link to book. The conversation lands in your CRM inbox with a task for the team.",
        result: "Nobody waits until morning for an answer.",
        channel: "whatsapp",
        screen: "Aurora Clinic",
        beats: [
            { k: "sys", text: "Tuesday, 21:00" },
            { k: "in", text: "Hi! Do you have anything free for a facial on Friday?" },
            { k: "out", text: "Hi Sophie, thanks for your message! You can see what's free and book here: auroraclinic.co.uk/book. We'll answer any questions in the morning.", tag: "auto" },
            { k: "card", title: "New task in your CRM", lines: ["Reply to Sophie (WhatsApp)", "Tomorrow, 9:00"], tone: "info" },
        ],
    },
    {
        id: "online-booking",
        for: ["clinics", "salons"],
        icon: "booking",
        label: "Online booking",
        who: "Hair salon · Sunday evening",
        desc: "Clients choose the treatment and the time on your website, without ringing. It goes straight into the diary and they get a confirmation by WhatsApp or email.",
        result: "The diary fills up even when the salon is closed.",
        channel: "web",
        screen: "studiobela.co.uk/book",
        beats: [
            { k: "card", title: "Cut and blow-dry", lines: ["45 minutes · with Jess"], tone: "info" },
            { k: "pick", title: "Friday", slots: ["10:00", "11:30", "14:00", "16:30"], chosen: 2 },
            { k: "card", title: "Booking confirmed", lines: ["Cut and blow-dry", "Friday, 14:00 · Studio Bela"], tone: "ok" },
            { k: "sys", text: "Confirmation sent by WhatsApp" },
        ],
    },
    {
        id: "reminders",
        for: ["clinics", "salons"],
        icon: "bell",
        label: "Appointment reminders",
        who: "Dental practice · the day before",
        desc: "The day before, the patient gets a reminder of the appointment. If they need to change it, they reply and the message comes to your inbox.",
        result: "Fewer forgotten appointments and fewer empty slots.",
        channel: "whatsapp",
        screen: "Bright Smile Dental",
        beats: [
            { k: "sys", text: "Thursday, 10:00" },
            { k: "out", text: "Hi James, a reminder of your appointment tomorrow, Friday, at 9:30 at Bright Smile Dental. Need to change it? Just reply to this message.", tag: "auto" },
            { k: "in", text: "Thanks, see you then!" },
        ],
    },
    {
        id: "no-shows",
        for: ["clinics", "salons"],
        icon: "noshow",
        label: "No-shows rebooked",
        who: "Physio clinic · after a missed appointment",
        desc: "When someone misses an appointment, they get a message offering a new date, without anyone on the team having to chase them.",
        result: "A lost slot turns into a new booking.",
        channel: "whatsapp",
        screen: "Move Physio",
        beats: [
            { k: "card", title: "15:00 appointment", lines: ["Olivia Hart · did not attend"], tone: "warn" },
            { k: "out", text: "Hi Olivia, we missed you today! Would you like to pick another date? You can book here: movephysio.co.uk/book", tag: "auto" },
            { k: "in", text: "So sorry, something came up. I've booked Tuesday." },
            { k: "card", title: "New booking", lines: ["Tuesday, 11:00"], tone: "ok" },
        ],
    },
    {
        id: "reviews",
        for: "all",
        icon: "star",
        label: "Google reviews",
        who: "Beauty salon · a few hours after the visit",
        desc: "A few hours after the appointment, the client is invited to leave a Google review while the visit is still fresh.",
        result: "More reviews, without asking each client yourself.",
        channel: "whatsapp",
        screen: "Studio Bela",
        beats: [
            { k: "sys", text: "Today, 18:00" },
            { k: "out", text: "Thanks for coming in today, Grace! If you enjoyed it, we'd love a Google review. It really helps.", tag: "auto" },
            { k: "stars", label: "Google review" },
        ],
    },
    {
        id: "rebooking",
        for: ["clinics", "salons"],
        icon: "repeat",
        label: "Rebooking and recalls",
        who: "Barber · four weeks after the last cut",
        desc: "When the next trim, top-up or check-up is due, the client is invited to book, at the rhythm of each treatment.",
        result: "Clients come back without having to remember.",
        channel: "whatsapp",
        screen: "Central Barbers",
        beats: [
            { k: "sys", text: "4 weeks after the last cut" },
            { k: "out", text: "Hi Tom! It's been four weeks since your last cut. Fancy booking the next one? centralbarbers.co.uk/book", tag: "auto" },
            { k: "card", title: "Tom booked online", lines: ["Saturday, 10:00 · cut and beard"], tone: "ok" },
        ],
    },
    {
        id: "inbox",
        for: "all",
        icon: "inbox",
        label: "One shared inbox",
        who: "The whole team · all day",
        desc: "Texts, WhatsApp messages and website enquiries arrive in one CRM inbox, with the client's record alongside and a task for whoever answers.",
        result: "Nobody answers twice and nobody is left without a reply.",
        channel: "crm",
        screen: "Inbox",
        beats: [
            { k: "card", title: "Sophie · WhatsApp", lines: ["Anything free on Friday?"], badge: "New", tone: "info" },
            { k: "card", title: "Emma · text message", lines: ["I'd like a skin consultation."], badge: "New", tone: "info" },
            { k: "card", title: "Task for Chloe", lines: ["Ring Emma back · today by 12:00"], tone: "ok" },
        ],
    },
    {
        id: "invoices",
        for: "all",
        icon: "invoice",
        label: "Invoices and payments",
        who: "After the treatment · from the client's record",
        desc: "Send the invoice and the payment request straight from the client's record.",
        result: "Everything about each client, in one place.",
        channel: "crm",
        screen: "Client record",
        beats: [
            { k: "card", title: "Sophie Reed", lines: ["Facial · £60.00", "Friday, 14:00"], tone: "info" },
            { k: "card", title: "Payment request sent", lines: ["£60.00 · by email"], tone: "ok" },
        ],
    },
    {
        id: "viewings",
        icon: "home",
        for: ["agencies"],
        label: "Viewings booked online",
        who: "Estate agent · a buyer looking at a two-bed, after work",
        desc: "Anyone looking at a property on your website picks a time for the viewing without any back and forth. It goes into the negotiator's diary with the buyer's record.",
        result: "More viewings booked, fewer calls to agree a time.",
        channel: "web",
        screen: "horizonhomes.co.uk/property",
        beats: [
            { k: "card", title: "Two-bed flat, Clapham", lines: ["Ref. 2214 · with balcony"], tone: "info" },
            { k: "pick", title: "Saturday", slots: ["10:00", "11:00", "15:00", "16:00"], chosen: 1 },
            { k: "card", title: "Viewing booked", lines: ["Saturday, 11:00 · with Nick"], tone: "ok" },
        ],
    },
    {
        id: "pipeline",
        icon: "pipeline",
        for: ["agencies", "services"],
        label: "Sales pipeline",
        who: "Renovation company · from enquiry to job won",
        desc: "Every enquiry becomes a deal in your pipeline. See what stage it's at, what it's worth and who acts next, and the CRM reminds the team to follow up.",
        result: "No quote is left forgotten in a drawer.",
        channel: "crm",
        screen: "Pipeline",
        beats: [
            { k: "card", title: "New lead", lines: ["Ryan Moore · bathroom refit"], tone: "info", badge: "New" },
            { k: "card", title: "Proposal sent", lines: ["£3,450.00 · follow up on Thursday"], tone: "info" },
            { k: "card", title: "Won", lines: ["Ryan Moore · £3,450.00"], tone: "ok" },
        ],
    },
    {
        id: "quotes",
        icon: "quote",
        for: ["services", "clinics"],
        label: "Quotes accepted online",
        who: "Trades and services · after the site visit",
        desc: "Send the quote as a link. The client reads it on their phone and accepts it with their name, and the deal moves on in your pipeline by itself.",
        result: "Faster answers, with nothing to print, sign and scan.",
        channel: "web",
        screen: "Quote no. 0142",
        beats: [
            { k: "card", title: "Bathroom refit", lines: ["£3,450.00 · valid 30 days"], tone: "info" },
            { k: "sys", text: "The client opened the quote" },
            { k: "card", title: "Accepted by Ryan Moore", lines: ["Today, 18:12"], tone: "ok" },
        ],
    },
    {
        id: "email-follow-up",
        icon: "mail",
        for: "all",
        label: "Email follow-up",
        who: "Any business · after an enquiry",
        desc: "Anyone who asks for information gets a short series of emails you wrote once, on the right days. If they reply, it lands in your inbox.",
        result: "Leads don't go cold while the team is busy.",
        channel: "crm",
        screen: "Email sequence",
        beats: [
            { k: "card", title: "Day 0 · Thanks for your enquiry", lines: ["Sent"], tone: "ok" },
            { k: "card", title: "Day 2 · Any questions?", lines: ["Sent"], tone: "ok" },
            { k: "in", text: "Hi! Could you call me tomorrow morning?" },
        ],
    },
    {
        id: "quiz",
        icon: "quiz",
        for: "all",
        label: "A quiz that brings in leads",
        who: "Any business · on your website or in an ad",
        desc: "A one-minute quiz qualifies your website visitors. The lead arrives in your CRM with their answers, ready for the team to call.",
        result: "You know what each lead needs before you ring them.",
        channel: "web",
        screen: "1-minute quiz",
        beats: [
            { k: "card", title: "Question 1 of 3", lines: ["What are you looking for?"], tone: "info" },
            { k: "pick", title: "Pick one", slots: ["Treatment", "Consultation", "Quote", "Other"], chosen: 1 },
            { k: "card", title: "New lead in your CRM", lines: ["Consultation · answers saved"], tone: "ok", badge: "New" },
        ],
    },
    {
        id: "social-posts",
        icon: "post",
        for: "all",
        extra: "social",
        label: "Social media posts",
        who: "Any business · once a week",
        desc: "Connect your Facebook, Instagram and LinkedIn pages to the CRM. Plan and schedule posts in one place and the CRM publishes them on time.",
        result: "A steady presence on social media, without hopping between apps.",
        channel: "crm",
        screen: "Posts",
        beats: [
            { k: "card", title: "Post scheduled", lines: ["Friday, 12:00", "Instagram · Facebook"], tone: "info" },
            { k: "sys", text: "Friday, 12:00" },
            { k: "card", title: "Published", lines: ["Instagram ✓ · Facebook ✓"], tone: "ok" },
        ],
    },
    {
        id: "google-profile",
        icon: "google",
        for: "all",
        extra: "google",
        label: "Google Business Profile",
        who: "Any business · when a review comes in",
        desc: "Connect your Google Business Profile to the CRM. Reviews show up in the CRM and you can reply without leaving it.",
        result: "Every review gets an answer, and people searching on Google can see it.",
        channel: "crm",
        screen: "Google reviews",
        beats: [
            { k: "stars", label: "New review · Grace L." },
            { k: "out", text: "Thank you, Grace! It was lovely to see you. See you next time!", tag: "reply" },
            { k: "sys", text: "Reply published on Google" },
        ],
    },
    {
        id: "ads",
        icon: "ads",
        for: "all",
        extra: "ads",
        label: "Ads with results in view",
        who: "Any business · during a campaign",
        desc: "Prepare Facebook and Instagram ads from the CRM and see, for each ad, what it cost and how many leads it brought.",
        result: "You know where your ad money works, and where it doesn't.",
        channel: "crm",
        screen: "Ads",
        beats: [
            { k: "card", title: "Ad: facial offer", lines: ["Facebook and Instagram · £5 a day"], tone: "info" },
            { k: "card", title: "Last 7 days", lines: ["£35.00 · 9 leads", "£3.89 per lead"], tone: "ok" },
        ],
    },
];
