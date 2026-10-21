/**
 * The website's privacy policy, in English (/PrivacyPolicy) and in European
 * Portuguese (/pt/privacidade). One file, so the two versions keep the same
 * sections in the same order and say the same things: change one, change the
 * other in the same commit. Both versions have the same value (see the
 * "languages" section).
 *
 * What it describes is what the code does. Before changing a claim here,
 * check the code it describes:
 * - the forms: src/app/api/{contact,questionnaire,quiz,booking}/route.ts and
 *   src/lib/crmLeads.ts (email via Microsoft 365, lead into the CRM);
 * - the visitor tracker: the CRM's app/public/t.js and
 *   backend/src/services/visitorAnalytics.ts (no cookies, daily salted hash,
 *   events purged after 400 days);
 * - Vercel Web Analytics: src/app/components/SiteAnalytics.tsx;
 * - browser storage: the keys listed under "device" (grep localStorage and
 *   sessionStorage in src/).
 *
 * Text conventions: "[label](href)" becomes a link, and email addresses are
 * linked automatically (see renderText in privacy.tsx).
 */

export type PolicyLang = "en" | "pt";

export type PolicyBlock = {
    heading?: string;
    body?: string;
    list?: string[];
    definitions?: { term: string; def: string }[];
    /** An interactive control rendered in place (the measurement switch). */
    widget?: "measurement";
};

export type PolicySection = { id: string; title: string; content: PolicyBlock[] };

export type PolicyDoc = {
    lang: PolicyLang;
    kicker: string;
    title: string;
    lastUpdatedLabel: string;
    lastUpdated: string;
    standfirst: string;
    otherLanguage: { label: string; href: string; hrefLang: string };
    contents: string;
    intro: string;
    sections: PolicySection[];
    footerQuestions: string;
    rights: string;
};

export const POLICY_URL = { en: "/PrivacyPolicy", pt: "/pt/privacidade" } as const;

const EMAIL = "info@autisync.com";
const WHATSAPP = "+44 7795 866571";
const REP_PLACEHOLDER = "[Representative to be appointed: name and address]";
const REP_PLACEHOLDER_PT = "[Representante a nomear: nome e morada]";

const en: PolicyDoc = {
    lang: "en",
    kicker: "Legal",
    title: "Privacy Policy",
    lastUpdatedLabel: "Last updated",
    lastUpdated: "21 October 2026",
    standfirst:
        "How Autisync collects, uses and protects personal data through this website and when you contact us or become a client, in the United Kingdom, Portugal, Angola, Namibia and elsewhere.",
    otherLanguage: { label: "Ler em português", href: POLICY_URL.pt, hrefLang: "pt-PT" },
    contents: "Contents",
    intro:
        "This policy explains what personal data we collect, why, on what legal basis, who receives it, where it is kept and for how long, and what your rights are. It is written to meet the UK GDPR, the EU General Data Protection Regulation as it applies in Portugal, and Angolan law, and it applies to everyone who uses this website, wherever they are.",
    sections: [
        {
            id: "who",
            title: "Who we are",
            content: [
                {
                    body: "Autisync is a trading name of MAHELDOM CONSULTING, LDA., a company registered in Angola. It is the controller of the personal data described in this policy: it decides why and how the data is used. In this policy, “we”, “us” and “our” mean that company.",
                    definitions: [
                        { term: "Controller", def: "MAHELDOM CONSULTING, LDA., trading as Autisync" },
                        { term: "Registered office", def: "Edifício do Shopping Jardim do Patriota, Rua Lar do Patriota, Bairro Patriota, Talatona, Luanda, Angola" },
                        { term: "Registration", def: "Conservatória do Registo Comercial do Guiché Único da Empresa, n.º 41063-26/260824 · NIF 5003472418" },
                        { term: "Privacy contact", def: `${EMAIL} (please write “Privacy” in the subject) · WhatsApp ${WHATSAPP}` },
                        { term: "Representative in the European Union (GDPR, Article 27)", def: REP_PLACEHOLDER },
                        { term: "Representative in the United Kingdom (UK GDPR, Article 27)", def: REP_PLACEHOLDER },
                    ],
                },
                {
                    body: "You can write to our representatives instead of us about anything in this policy, and regulators can contact them too.",
                },
                {
                    heading: "What this policy covers",
                    body: "This website, www.autisync.com, in English and Portuguese: its pages, the free tools, the quiz (/quiz and /pt/diagnostico), the contact forms, the service questionnaires and the call booking calendar; the messages you send us by email, phone or WhatsApp; and the data of people who become our clients, alongside the terms of their contract.",
                },
                {
                    body: "It does not cover the data that a business handles through our products. When a business uses Autisync CRM or CallCatch to deal with its own customers, that business is the controller and we act only on its instructions, as its processor. That is explained in the [Autisync CRM Privacy Policy](/legal/privacy).",
                },
            ],
        },
        {
            id: "summary",
            title: "In short",
            content: [
                {
                    list: [
                        "We collect what you type into our forms or send us, and a little about your visit.",
                        "We use it to answer you, to prepare and deliver our work, and to see which pages help. We never sell it and never use it to build advertising profiles.",
                        "This website sets no cookies. Our visit measurement stores nothing on your device, and you can switch it off on this page.",
                        "We do not use Google Analytics, the Meta (Facebook) Pixel, advertising networks or Google Fonts on this website.",
                        "Our CRM, its database, our websites and our email servers are in Germany, in the European Union. Our team may access data from Angola and the United Kingdom, under the safeguards described below.",
                        `You can ask for a copy of your data, ask us to correct or delete it, or object, by writing to ${EMAIL}.`,
                    ],
                },
            ],
        },
        {
            id: "collect",
            title: "What we collect, why, and on what legal basis",
            content: [
                {
                    body: "The legal bases named below are those in Article 6(1) of the UK GDPR and of the EU General Data Protection Regulation (GDPR). For people in Angola, the same uses rest on the conditions in article 12 of Lei n.º 22/11 de 17 de Junho: your consent, or the steps you asked us to take before a contract.",
                },
                {
                    heading: "Contact form (/contact and /pt/contacto)",
                    list: [
                        "What: your name, company, email address, phone number, where your business is, the service you are interested in, your budget range, how you prefer to be contacted, your message and the tick box. With it we record the page you sent it from, any campaign tags in the link you arrived by (utm_source, utm_medium, utm_campaign), any advert click reference in that link (gclid from Google, fbclid from Meta), and, for spam checks, the IP address and browser it came from and a spam score.",
                        "Why: to answer your enquiry and, if you want one, prepare a proposal. The campaign tags and click references tell us which advert or post brought you; we do not send them back to Google or Meta. We email you a copy to confirm that we received your message.",
                        "Legal basis: steps you ask us to take before a possible contract (Article 6(1)(b)); where you write for a company, our legitimate interest in answering business enquiries (Article 6(1)(f)). Spam checks: our legitimate interest in keeping our forms free of abuse (Article 6(1)(f)).",
                    ],
                },
                {
                    heading: "Service questionnaires (/ServiceQuestionaire and /pt/questionario)",
                    list: [
                        "What: your contact details and your answers about your business, brand, project, audience, budget, timing and technology, with the IP address and browser the answers came from and a spam score. Please do not include health information or other sensitive data: the questionnaires do not need it.",
                        "Why: to understand your project and prepare a proposal and a plan of work.",
                        "Legal basis: as for the contact form.",
                    ],
                },
                {
                    heading: "Quiz (/quiz and /pt/diagnostico)",
                    list: [
                        "What: your three answers (type of business, what gets in the way most, team size), your name and phone number, your email address if you give it, the tick box, the page address, any campaign tags in the link, and the IP address and browser it came from, which our CRM uses to stop abuse.",
                        "Why: to show you a plan for your kind of business and to contact you about it, as the tick box says.",
                        "Legal basis: steps you ask us to take before a possible contract (Article 6(1)(b)).",
                    ],
                },
                {
                    heading: "Booking a call",
                    list: [
                        "What: your name, email address, phone number, business name or website, what you would like to talk about, the time you choose, your time zone and language, any campaign tags in the link, and the IP address it came from, which our CRM uses to stop abuse.",
                        "Why: to book the call, send you a confirmation and hold the call.",
                        "Legal basis: steps you ask us to take before a possible contract (Article 6(1)(b)).",
                    ],
                },
                {
                    heading: "Email, phone and WhatsApp",
                    list: [
                        "What: what you send us and your contact details. Messages you send us on WhatsApp travel through WhatsApp, a Meta service, under its own terms and privacy policy.",
                        "Why: to reply, and to keep a record of what was asked and agreed.",
                        "Legal basis: steps you ask us to take before a possible contract (Article 6(1)(b)), or our legitimate interest in replying to the messages we receive (Article 6(1)(f)).",
                    ],
                },
                {
                    heading: "Clients",
                    list: [
                        "What: contact and billing details, contracts, invoices and payments, and what we need to deliver the work.",
                        "Why: to deliver our services, invoice them and keep our accounts.",
                        "Legal basis: performing our contract with you (Article 6(1)(b)) and complying with tax and accounting law (Article 6(1)(c)).",
                    ],
                },
                {
                    heading: "News and offers",
                    body: `We send marketing emails or messages only if you have agreed to them or, where the law allows it, to clients and to people who asked us about similar services, with a free way to say no in every message. Legal basis: your consent (Article 6(1)(a)) or our legitimate interest in telling clients and enquirers about our services (Article 6(1)(f)), within the rules on electronic marketing: regulation 22 of the UK Privacy and Electronic Communications Regulations 2003 (PECR), article 13.º-A of Portuguese Lei n.º 41/2004, de 18 de agosto, and article 19 of Angolan Lei n.º 22/11. You can stop them at any time by replying or by writing to ${EMAIL}.`,
                },
                {
                    heading: "Legal obligations and claims",
                    body: "We may use any of the data above to comply with the law, to answer authorities and courts, and to establish or defend legal claims. Legal basis: legal obligation (Article 6(1)(c)) or our legitimate interest in protecting our rights (Article 6(1)(f)).",
                },
                {
                    heading: "Legitimate interests",
                    body: `Where we rely on legitimate interests, we have weighed them against your interests and rights, and you can object at any time (see “Your rights”). Ask us at ${EMAIL} if you would like to know more about that assessment.`,
                },
                {
                    heading: "What we do not do",
                    list: [
                        "We do not sell personal data, and we do not share it for other companies' advertising.",
                        "We make no decisions about you by automated means alone that have legal or similarly significant effects on you.",
                        "We do not ask for health data or other special categories of data.",
                    ],
                },
            ],
        },
        {
            id: "measurement",
            title: "Measuring visits, without cookies",
            content: [
                {
                    body: "We measure how this website is used, so that we can see which pages help and where people give up. We use two tools. Neither sets cookies, and neither stores anything on your device.",
                },
                {
                    heading: "Autisync visitor tracker",
                    body: "Our own script (t.js), loaded from app.autisync.com and run by our CRM on our servers in Germany. On each page it sends:",
                    list: [
                        "the page address (without the query part, except campaign tags), its title, and the website you came from, of which only the domain is kept;",
                        "your screen width, used to tell phones, tablets and computers apart;",
                        "which sections of the page came into view, how far you scrolled and how long the page was on screen;",
                        "the label of the links and buttons you click, and the fact that a form was sent, but never what you type into it;",
                        "the campaign tags in the link (utm_source, utm_medium, utm_campaign).",
                    ],
                },
                {
                    body: "On our server, your IP address and browser details are combined with a random value that changes every day and turned into a one-way code, so that visits on the same day can be counted together. The IP address itself is not stored. The daily values are deleted within two days, after which the code cannot be recreated. The events are deleted after 400 days (about 13 months). The tracker does not run at all if your browser sends a Global Privacy Control or Do Not Track signal.",
                },
                {
                    heading: "Vercel Web Analytics",
                    body: "Our host, Vercel, counts page views for us: the page, the referring website, filtered query parameters, the country and region (worked out from the IP address), and the browser, operating system and type of device. Vercel tells visitors apart with a code made from the request, which it discards after 24 hours, and shows us only totals. It does not run if your browser sends a Global Privacy Control or Do Not Track signal.",
                },
                {
                    heading: "Legal basis and your choice",
                    body: "Our legitimate interest in understanding and improving our website (Article 6(1)(f)). We chose tools that set no cookies, keep no IP addresses and build no profile of you across websites. You can switch both off in this browser here, at any time and free of charge:",
                },
                { widget: "measurement" },
            ],
        },
        {
            id: "device",
            title: "Cookies and storage on your device",
            content: [
                {
                    body: "This website sets no cookies. It keeps a few small notes in your browser's own storage, only to make things you ask for work. None of them identifies you, and none is sent to us.",
                },
                {
                    heading: "Kept until you close the tab (session storage)",
                    definitions: [
                        { term: "autisync.quiz.progress.v1 · autisync.quiz.utm", def: "Your place and answers in the quiz, and the campaign tags of the link you came by, so that a reload or the language switch does not lose them. The answers are removed when you send the quiz." },
                        { term: "autisync.questionnaire.en.v1 · autisync.questionnaire.pt.v1", def: "Your place and answers in the service questionnaires. Each one is removed when you send it." },
                        { term: "autisync.booking.v1", def: "The call booking you are part-way through." },
                        { term: "autisync-market-asked", def: "That you closed the question about which country's prices to show." },
                        { term: "autisync.legal.from", def: "Where the Back button on a legal page should take you." },
                    ],
                },
                {
                    heading: "Kept until you clear it (local storage)",
                    definitions: [
                        { term: "autisync-market · autisync-market-confirmed", def: "The country and currency you chose for our prices. Saved only when you choose one." },
                        { term: "autisync.legal.openedFrom", def: "Which page a legal link was opened from, so that Back returns you there. Read once and deleted; ignored after 5 minutes." },
                        { term: "autisync_track_ignore", def: "Saved only if you switch off visit measurement above." },
                    ],
                },
                {
                    heading: "Why we do not ask for consent",
                    body: "Storing or reading information on your device needs your consent unless it is strictly necessary for a service you asked for: regulation 6 of PECR in the United Kingdom (as amended by section 112 of the Data (Use and Access) Act 2025), and article 5.º of Lei n.º 41/2004, de 18 de agosto, which applies Article 5(3) of the EU ePrivacy Directive (2002/58/EC) in Portugal. The notes above are of that kind: they keep your answers, your chosen prices and your way back. Our measurement tools store nothing on your device and read nothing from it except your choice to switch them off; in the United Kingdom, PECR also expressly allows measurement for statistical purposes when you are told about it and can object, as above. So we do not show a consent banner. If we ever add something that needs consent, such as advertising pixels, we will ask you first.",
                },
                {
                    heading: "Cloudflare Turnstile (on the forms only)",
                    body: "Before a contact form or questionnaire is sent, Cloudflare's Turnstile checks that it comes from a person and not a bot, using signals such as your IP address and browser details. It runs only on those forms, to protect them. Cloudflare describes what it collects in its [Turnstile Privacy Addendum](https://www.cloudflare.com/turnstile-privacy-policy/).",
                },
                {
                    heading: "Content from other websites",
                    body: "Some pages show pictures from photo libraries (Unsplash, Pexels) and flags from flagcdn.com; to show them, your browser contacts those websites, which see your IP address. Our portfolio shows previews of clients' websites, which load from those websites. Links to WhatsApp, Facebook, Instagram, LinkedIn and Behance take you to services with their own privacy policies.",
                },
            ],
        },
        {
            id: "recipients",
            title: "Who receives your data",
            content: [
                {
                    body: "Our own team, who need it to answer you and do the work. We also use these service providers, under contracts that let them use the data only on our instructions and keep it secure:",
                    definitions: [
                        { term: "Hetzner Online GmbH (Germany)", def: "The servers in Nuremberg that run our CRM and its database, our websites and our email." },
                        { term: "Vercel Inc. (United States)", def: "Hosts this website, runs the code behind its forms, and provides Vercel Web Analytics." },
                        { term: "Microsoft (Microsoft 365)", def: "Sends the emails that pass form submissions to our team and the confirmation you receive." },
                        { term: "Cloudflare, Inc. (United States)", def: "Turnstile, the check against spam on our forms." },
                    ],
                },
                {
                    body: "WhatsApp (Meta) carries the messages you send us there, under its own terms. We may also share data with our professional advisers (such as accountants and lawyers), with authorities or courts when the law requires it, and with a buyer or successor if our business is sold or reorganised, who would have to protect it in the same way. We do not sell personal data.",
                },
            ],
        },
        {
            id: "transfers",
            title: "Where your data is kept, and transfers abroad",
            content: [
                {
                    body: "Our CRM, its database, our websites and our email servers are in Germany, in the European Union (Hetzner, Nuremberg). This website runs on Vercel's network, which can serve and process requests outside Europe, including in the United States.",
                },
                {
                    body: "Our company is in Angola, and our team may access data from Angola and from the United Kingdom. Where data leaves the EU or the UK in this way, it is protected as follows:",
                    list: [
                        "United Kingdom: the European Commission recognises the UK as giving adequate protection (decisions renewed in December 2025, valid until 27 December 2031), and UK law recognises the countries of the European Economic Area in the same way.",
                        "Angola: neither the EU nor the UK has recognised Angola as giving adequate protection. We therefore use the European Commission's Standard Contractual Clauses (Implementing Decision (EU) 2021/914) and, for data protected by UK law, the UK International Data Transfer Addendum to those clauses, issued under section 119A of the Data Protection Act 2018.",
                        "United States (Vercel, Cloudflare, Microsoft): the EU–US Data Privacy Framework (Commission Implementing Decision (EU) 2023/1795) and its UK Extension, where the provider is certified, or otherwise the Standard Contractual Clauses in the provider's data processing terms.",
                        "People in Angola: transfers of their data out of Angola follow articles 33 and 34 of Lei n.º 22/11 (notification to, or authorisation by, the Agência de Protecção de Dados).",
                    ],
                },
                {
                    body: `You can ask us for a copy of these safeguards (with commercial details removed) at ${EMAIL}.`,
                },
            ],
        },
        {
            id: "retention",
            title: "How long we keep it",
            content: [
                {
                    definitions: [
                        { term: "Enquiries that do not lead to work (forms, quiz, bookings, messages)", def: "Up to 24 months after our last contact with you, then deleted." },
                        { term: "Clients", def: "For as long as we work together and 24 months after that; invoices and accounting records for as long as tax and accounting law requires in the country concerned." },
                        { term: "Marketing", def: "Until you say no. After that we keep only your email address or number on a do-not-contact list, so that we respect your choice." },
                        { term: "Autisync visitor tracker", def: "Events: 400 days. The daily values used to make visitor codes: deleted within two days." },
                        { term: "Vercel Web Analytics", def: "Visitor code: discarded after 24 hours. Totals: for as long as Vercel keeps them for our account." },
                        { term: "Storage on your device", def: "As listed under “Cookies and storage on your device”." },
                    ],
                },
                {
                    body: "We keep data for longer only where the law requires it or to deal with a legal claim.",
                },
            ],
        },
        {
            id: "rights",
            title: "Your rights",
            content: [
                {
                    body: "Wherever you are, you can ask us to:",
                    list: [
                        "tell you whether we hold personal data about you, and give you a copy;",
                        "correct it if it is wrong or incomplete;",
                        "delete it;",
                        "restrict how we use it while a question about it is resolved;",
                        "give it to you, or to another organisation, in a common machine-readable format, where we use it on the basis of your consent or a contract;",
                        "stop using it where we rely on legitimate interests, and stop marketing to you at any time (for marketing, you do not need to give a reason);",
                        "withdraw any consent you gave, without affecting what was done before.",
                    ],
                },
                {
                    body: `Write to ${EMAIL}. It is free. We reply within one month; if a request is complex, we may take up to two more months, and we will tell you why within the first month. We may ask you to confirm who you are first.`,
                },
                {
                    heading: "The laws that give you these rights",
                    list: [
                        "United Kingdom: the UK GDPR and the Data Protection Act 2018.",
                        "Portugal and the rest of the European Union: the General Data Protection Regulation (Regulation (EU) 2016/679) and, in Portugal, Lei n.º 58/2019, de 8 de agosto.",
                        "Angola: Lei n.º 22/11 de 17 de Junho (Lei da Protecção de Dados Pessoais), articles 25 to 29 (information, access, objection, rectification and erasure, and automated decisions).",
                        "Namibia: no general data protection act is in force yet; a Data Protection Bill has been prepared but not enacted. Article 13 of the Namibian Constitution protects privacy. We give people in Namibia the same rights as everyone else in this policy.",
                    ],
                },
            ],
        },
        {
            id: "complaints",
            title: "Complaints",
            content: [
                {
                    body: `Please tell us first, at ${EMAIL} or through our [contact form](/contact). We will acknowledge your complaint within 30 days and tell you what we are doing about it. You can also complain to a data protection authority at any time, or go to court:`,
                    definitions: [
                        { term: "United Kingdom: Information Commissioner's Office (ICO)", def: "Formally the Information Commission since 30 September 2026. Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF · 0303 123 1113 · [ico.org.uk/make-a-complaint](https://ico.org.uk/make-a-complaint/)" },
                        { term: "Portugal: Comissão Nacional de Proteção de Dados (CNPD)", def: "Av. D. Carlos I, 134, 1.º, 1200-651 Lisboa · +351 213 928 400 · geral@cnpd.pt · [www.cnpd.pt](https://www.cnpd.pt/)" },
                        { term: "Other countries of the European Union", def: "The data protection authority where you live or work: [list of authorities](https://www.edpb.europa.eu/contact/contact-dpas_en)" },
                        { term: "Angola: Agência de Protecção de Dados (APD)", def: "Rua do MAT, Complexo Administrativo Clássicos de Talatona, 3.º edifício, 7.º andar, Luanda · +244 937 930 788 · geral@apd.ao · [apd.ao](https://apd.ao/)" },
                        { term: "Namibia", def: "No data protection authority has been set up yet. Write to us and we will deal with your complaint." },
                    ],
                },
            ],
        },
        {
            id: "security",
            title: "Security",
            content: [
                {
                    body: "Connections to this website and to our CRM are encrypted (HTTPS). Access to personal data is limited to the people who need it. Passwords are stored only in hashed form, and keys to other services are encrypted. Our forms are protected against spam and abuse. No system is perfectly secure; if a breach puts your data at risk, we will tell the data protection authority and, where the law requires it, you.",
                },
            ],
        },
        {
            id: "children",
            title: "Children",
            content: [
                {
                    body: `This website and our services are for businesses and are not aimed at children. We do not knowingly collect data from anyone under 18. If you think a child has sent us their details, write to ${EMAIL} and we will delete them.`,
                },
            ],
        },
        {
            id: "languages",
            title: "English and Portuguese versions",
            content: [
                {
                    body: "This policy is published in English at [autisync.com/PrivacyPolicy](/PrivacyPolicy) and in Portuguese at [autisync.com/pt/privacidade](/pt/privacidade). Both say the same thing and have the same value; neither prevails over the other. If you find a difference between them, please tell us so that we can correct it; until we do, the reading more favourable to you applies.",
                },
            ],
        },
        {
            id: "changes",
            title: "Changes to this policy",
            content: [
                {
                    body: "When we change this policy, we change the date at the top. If a change affects how we use data you have already given us, we will tell you before it takes effect, with a notice on this website and, where we have your email address, by email.",
                },
            ],
        },
        {
            id: "contact",
            title: "Contact",
            content: [
                {
                    list: [
                        `Email: ${EMAIL}`,
                        `WhatsApp: ${WHATSAPP}`,
                        "Post: MAHELDOM CONSULTING, LDA., Edifício do Shopping Jardim do Patriota, Rua Lar do Patriota, Bairro Patriota, Talatona, Luanda, Angola",
                    ],
                },
            ],
        },
    ],
    footerQuestions: "Questions? Email us at",
    rights: "All rights reserved.",
};

const pt: PolicyDoc = {
    lang: "pt",
    kicker: "Informação legal",
    title: "Política de Privacidade",
    lastUpdatedLabel: "Última atualização",
    lastUpdated: "21 de outubro de 2026",
    standfirst:
        "Como a Autisync recolhe, utiliza e protege dados pessoais através deste website e quando nos contacta ou se torna nosso cliente, no Reino Unido, em Portugal, em Angola, na Namíbia e noutros países.",
    otherLanguage: { label: "Read in English", href: POLICY_URL.en, hrefLang: "en" },
    contents: "Índice",
    intro:
        "Esta política explica que dados pessoais recolhemos, para quê, com que fundamento jurídico, quem os recebe, onde e durante quanto tempo os guardamos e que direitos tem. Foi escrita para cumprir o UK GDPR, o Regulamento Geral sobre a Proteção de Dados tal como se aplica em Portugal e a lei angolana, e aplica-se a todas as pessoas que utilizam este website, onde quer que estejam.",
    sections: [
        {
            id: "who",
            title: "Quem somos",
            content: [
                {
                    body: "Autisync é o nome comercial da MAHELDOM CONSULTING, LDA., sociedade registada em Angola. É a responsável pelo tratamento dos dados pessoais descritos nesta política: decide para que fins e de que forma os dados são utilizados. Nesta política, «nós» e «nosso» referem-se a essa sociedade.",
                    definitions: [
                        { term: "Responsável pelo tratamento", def: "MAHELDOM CONSULTING, LDA., com o nome comercial Autisync" },
                        { term: "Sede", def: "Edifício do Shopping Jardim do Patriota, Rua Lar do Patriota, Bairro Patriota, Talatona, Luanda, Angola" },
                        { term: "Registo", def: "Conservatória do Registo Comercial do Guiché Único da Empresa, n.º 41063-26/260824 · NIF 5003472418" },
                        { term: "Contacto para privacidade", def: `${EMAIL} (indique «Privacidade» no assunto) · WhatsApp ${WHATSAPP}` },
                        { term: "Representante na União Europeia (RGPD, artigo 27.º)", def: REP_PLACEHOLDER_PT },
                        { term: "Representante no Reino Unido (UK GDPR, artigo 27.º)", def: REP_PLACEHOLDER_PT },
                    ],
                },
                {
                    body: "Pode dirigir-se aos nossos representantes, em vez de a nós, sobre qualquer assunto desta política, e as autoridades de controlo também os podem contactar.",
                },
                {
                    heading: "O que esta política abrange",
                    body: "Este website, www.autisync.com, em inglês e em português: as suas páginas, as ferramentas gratuitas, o diagnóstico (/quiz e /pt/diagnostico), os formulários de contacto, os questionários de serviços e o calendário de marcação de chamadas; as mensagens que nos envia por e-mail, telefone ou WhatsApp; e os dados das pessoas que se tornam nossos clientes, a par das condições do respetivo contrato.",
                },
                {
                    body: "Não abrange os dados que uma empresa trata através dos nossos produtos. Quando uma empresa utiliza o Autisync CRM ou o CallCatch com os seus próprios clientes, é essa empresa a responsável pelo tratamento e nós agimos apenas segundo as suas instruções, como seu subcontratante. Isso está explicado na [Política de Privacidade do Autisync CRM](/pt/legal/privacidade).",
                },
            ],
        },
        {
            id: "summary",
            title: "Em resumo",
            content: [
                {
                    list: [
                        "Recolhemos o que escreve nos nossos formulários ou nos envia, e alguma informação sobre a sua visita.",
                        "Utilizamos esses dados para lhe responder, para preparar e realizar o nosso trabalho e para perceber que páginas ajudam. Nunca os vendemos nem os usamos para criar perfis publicitários.",
                        "Este website não utiliza cookies. A nossa medição de visitas não guarda nada no seu dispositivo, e pode desligá-la nesta página.",
                        "Não utilizamos neste website o Google Analytics, o Píxel da Meta (Facebook), redes de publicidade nem o Google Fonts.",
                        "O nosso CRM, a respetiva base de dados, os nossos websites e os nossos servidores de e-mail estão na Alemanha, na União Europeia. A nossa equipa pode aceder aos dados a partir de Angola e do Reino Unido, com as garantias descritas abaixo.",
                        `Pode pedir uma cópia dos seus dados, pedir que os corrijamos ou apaguemos, ou opor-se ao seu tratamento, escrevendo para ${EMAIL}.`,
                    ],
                },
            ],
        },
        {
            id: "collect",
            title: "Que dados recolhemos, para quê e com que fundamento",
            content: [
                {
                    body: "Os fundamentos jurídicos indicados abaixo são os do artigo 6.º, n.º 1, do UK GDPR e do Regulamento Geral sobre a Proteção de Dados (RGPD). Para as pessoas em Angola, as mesmas utilizações assentam nas condições do artigo 12.º da Lei n.º 22/11, de 17 de junho: o seu consentimento, ou as diligências que nos pediu antes de um contrato.",
                },
                {
                    heading: "Formulário de contacto (/contact e /pt/contacto)",
                    list: [
                        "O quê: o seu nome, empresa, endereço de e-mail, número de telefone, onde fica o seu negócio, o serviço que lhe interessa, o seu orçamento, a forma de contacto que prefere, a sua mensagem e a caixa de aceitação. Registamos também a página a partir da qual o enviou, as etiquetas de campanha do link por onde chegou (utm_source, utm_medium, utm_campaign), a referência de clique de anúncio nesse link (gclid da Google, fbclid da Meta) e, para controlo de spam, o endereço IP e o navegador de onde veio e uma pontuação de spam.",
                        "Para quê: para responder ao seu pedido e, se o desejar, preparar uma proposta. As etiquetas de campanha e as referências de clique indicam-nos que anúncio ou publicação o trouxe; não as reenviamos para a Google nem para a Meta. Enviamos-lhe um e-mail a confirmar que recebemos a sua mensagem.",
                        "Fundamento: diligências pré-contratuais a seu pedido (artigo 6.º, n.º 1, alínea b)); quando escreve em nome de uma empresa, o nosso interesse legítimo em responder a pedidos de empresas (artigo 6.º, n.º 1, alínea f)). Controlo de spam: o nosso interesse legítimo em proteger os formulários contra abusos (artigo 6.º, n.º 1, alínea f)).",
                    ],
                },
                {
                    heading: "Questionários de serviços (/ServiceQuestionaire e /pt/questionario)",
                    list: [
                        "O quê: os seus contactos e as suas respostas sobre o seu negócio, a marca, o projeto, o público, o orçamento, os prazos e a tecnologia, com o endereço IP e o navegador de onde vieram as respostas e uma pontuação de spam. Não inclua dados de saúde nem outros dados sensíveis: os questionários não precisam deles.",
                        "Para quê: para compreender o seu projeto e preparar uma proposta e um plano de trabalho.",
                        "Fundamento: o mesmo do formulário de contacto.",
                    ],
                },
                {
                    heading: "Diagnóstico (/quiz e /pt/diagnostico)",
                    list: [
                        "O quê: as suas três respostas (tipo de negócio, o que mais atrapalha, dimensão da equipa), o seu nome e telemóvel, o seu e-mail se o indicar, a caixa de aceitação, o endereço da página, as etiquetas de campanha do link e o endereço IP e o navegador de onde veio, que o nosso CRM utiliza para impedir abusos.",
                        "Para quê: para lhe mostrar um plano para o seu tipo de negócio e o contactarmos sobre ele, como indica a caixa de aceitação.",
                        "Fundamento: diligências pré-contratuais a seu pedido (artigo 6.º, n.º 1, alínea b)).",
                    ],
                },
                {
                    heading: "Marcação de uma chamada",
                    list: [
                        "O quê: o seu nome, endereço de e-mail, número de telefone, nome da empresa ou website, o assunto de que quer falar, a hora que escolher, o seu fuso horário e idioma, as etiquetas de campanha do link e o endereço IP de onde veio, que o nosso CRM utiliza para impedir abusos.",
                        "Para quê: para marcar a chamada, enviar-lhe a confirmação e realizar a chamada.",
                        "Fundamento: diligências pré-contratuais a seu pedido (artigo 6.º, n.º 1, alínea b)).",
                    ],
                },
                {
                    heading: "E-mail, telefone e WhatsApp",
                    list: [
                        "O quê: o que nos envia e os seus contactos. As mensagens que nos envia pelo WhatsApp passam pelo WhatsApp, um serviço da Meta, ao abrigo das condições e da política de privacidade desse serviço.",
                        "Para quê: para responder e guardar registo do que foi pedido e combinado.",
                        "Fundamento: diligências pré-contratuais a seu pedido (artigo 6.º, n.º 1, alínea b)), ou o nosso interesse legítimo em responder às mensagens que recebemos (artigo 6.º, n.º 1, alínea f)).",
                    ],
                },
                {
                    heading: "Clientes",
                    list: [
                        "O quê: contactos e dados de faturação, contratos, faturas e pagamentos, e o que for necessário para realizar o trabalho.",
                        "Para quê: para prestar os nossos serviços, faturá-los e manter a nossa contabilidade.",
                        "Fundamento: execução do contrato consigo (artigo 6.º, n.º 1, alínea b)) e cumprimento das obrigações fiscais e contabilísticas (artigo 6.º, n.º 1, alínea c)).",
                    ],
                },
                {
                    heading: "Novidades e ofertas",
                    body: `Só enviamos e-mails ou mensagens de marketing se nos tiver dado o seu consentimento ou, quando a lei o permite, a clientes e a pessoas que nos pediram informações sobre serviços semelhantes, com uma forma gratuita de recusar em cada mensagem. Fundamento: o seu consentimento (artigo 6.º, n.º 1, alínea a)) ou o nosso interesse legítimo em dar a conhecer os nossos serviços a clientes e a quem nos contactou (artigo 6.º, n.º 1, alínea f)), dentro das regras sobre comunicações eletrónicas de marketing: o regulamento 22 das Privacy and Electronic Communications Regulations 2003 (PECR) do Reino Unido, o artigo 13.º-A da Lei n.º 41/2004, de 18 de agosto, e o artigo 19.º da Lei n.º 22/11 angolana. Pode deixar de as receber a qualquer momento, respondendo ou escrevendo para ${EMAIL}.`,
                },
                {
                    heading: "Obrigações legais e litígios",
                    body: "Podemos utilizar qualquer dos dados acima para cumprir a lei, responder a autoridades e tribunais, e declarar, exercer ou defender um direito num processo judicial. Fundamento: obrigação jurídica (artigo 6.º, n.º 1, alínea c)) ou o nosso interesse legítimo em defender os nossos direitos (artigo 6.º, n.º 1, alínea f)).",
                },
                {
                    heading: "Interesses legítimos",
                    body: `Sempre que nos baseamos em interesses legítimos, ponderámo-los face aos seus interesses e direitos, e pode opor-se a qualquer momento (ver «Os seus direitos»). Escreva para ${EMAIL} se quiser saber mais sobre essa ponderação.`,
                },
                {
                    heading: "O que não fazemos",
                    list: [
                        "Não vendemos dados pessoais nem os partilhamos para publicidade de outras empresas.",
                        "Não tomamos decisões sobre si exclusivamente por meios automatizados que produzam efeitos jurídicos ou que o afetem de forma igualmente significativa.",
                        "Não pedimos dados de saúde nem outras categorias especiais de dados.",
                    ],
                },
            ],
        },
        {
            id: "measurement",
            title: "Medição de visitas, sem cookies",
            content: [
                {
                    body: "Medimos a forma como este website é utilizado, para perceber que páginas ajudam e onde as pessoas desistem. Utilizamos duas ferramentas. Nenhuma delas utiliza cookies nem guarda o que quer que seja no seu dispositivo.",
                },
                {
                    heading: "Contador de visitas da Autisync",
                    body: "O nosso próprio script (t.js), carregado a partir de app.autisync.com e gerido pelo nosso CRM nos nossos servidores na Alemanha. Em cada página, envia:",
                    list: [
                        "o endereço da página (sem a parte da consulta, exceto as etiquetas de campanha), o seu título e o website de onde veio, do qual só guardamos o domínio;",
                        "a largura do ecrã, para distinguir telemóveis, tablets e computadores;",
                        "que secções da página ficaram visíveis, até onde fez scroll e durante quanto tempo a página esteve no ecrã;",
                        "o texto dos links e botões em que carrega e o facto de um formulário ter sido enviado, mas nunca o que escreve nele;",
                        "as etiquetas de campanha do link (utm_source, utm_medium, utm_campaign).",
                    ],
                },
                {
                    body: "No nosso servidor, o seu endereço IP e os dados do navegador são combinados com um valor aleatório que muda todos os dias e transformados num código irreversível, para que as visitas do mesmo dia possam ser contadas em conjunto. O endereço IP não é guardado. Os valores diários são apagados no prazo de dois dias, depois do que o código não pode ser recriado. Os eventos são apagados ao fim de 400 dias (cerca de 13 meses). O contador não funciona de todo se o seu navegador enviar um sinal Global Privacy Control ou Do Not Track.",
                },
                {
                    heading: "Vercel Web Analytics",
                    body: "O nosso fornecedor de alojamento, a Vercel, conta as visitas às páginas por nós: a página, o website de origem, parâmetros de consulta filtrados, o país e a região (deduzidos do endereço IP) e o navegador, o sistema operativo e o tipo de dispositivo. A Vercel distingue os visitantes com um código criado a partir do pedido, que apaga ao fim de 24 horas, e só nos mostra totais. Não funciona se o seu navegador enviar um sinal Global Privacy Control ou Do Not Track.",
                },
                {
                    heading: "Fundamento e a sua escolha",
                    body: "O nosso interesse legítimo em compreender e melhorar o nosso website (artigo 6.º, n.º 1, alínea f)). Escolhemos ferramentas que não utilizam cookies, não guardam endereços IP e não criam qualquer perfil seu entre websites. Pode desligar as duas neste navegador aqui, a qualquer momento e gratuitamente:",
                },
                { widget: "measurement" },
            ],
        },
        {
            id: "device",
            title: "Cookies e armazenamento no seu dispositivo",
            content: [
                {
                    body: "Este website não utiliza cookies. Guarda algumas pequenas notas no armazenamento do próprio navegador, apenas para que funcione o que nos pede. Nenhuma delas o identifica, e nenhuma nos é enviada.",
                },
                {
                    heading: "Guardadas até fechar o separador (session storage)",
                    definitions: [
                        { term: "autisync.quiz.progress.v1 · autisync.quiz.utm", def: "O ponto em que está no diagnóstico e as suas respostas, e as etiquetas de campanha do link por onde chegou, para que não se percam ao recarregar a página ou ao mudar de idioma. As respostas são apagadas quando envia o diagnóstico." },
                        { term: "autisync.questionnaire.en.v1 · autisync.questionnaire.pt.v1", def: "O ponto em que está nos questionários de serviços e as suas respostas. Cada um é apagado quando o envia." },
                        { term: "autisync.booking.v1", def: "A marcação de chamada que está a meio." },
                        { term: "autisync-market-asked", def: "Que fechou a pergunta sobre os preços de que país mostrar." },
                        { term: "autisync.legal.from", def: "Para onde deve levá-lo o botão «Voltar» de uma página legal." },
                    ],
                },
                {
                    heading: "Guardadas até as apagar (local storage)",
                    definitions: [
                        { term: "autisync-market · autisync-market-confirmed", def: "O país e a moeda que escolheu para os nossos preços. Só são guardados quando escolhe." },
                        { term: "autisync.legal.openedFrom", def: "A página a partir da qual abriu um link legal, para que «Voltar» o leve até lá. É lida uma vez e apagada; é ignorada passados 5 minutos." },
                        { term: "autisync_track_ignore", def: "Só é guardada se desligar a medição de visitas acima." },
                    ],
                },
                {
                    heading: "Porque não pedimos consentimento",
                    body: "Guardar ou ler informação no seu dispositivo exige o seu consentimento, exceto quando é estritamente necessário para um serviço que pediu: regulamento 6 das PECR no Reino Unido (na redação dada pela secção 112 do Data (Use and Access) Act 2025) e artigo 5.º da Lei n.º 41/2004, de 18 de agosto, que aplica em Portugal o artigo 5.º, n.º 3, da Diretiva 2002/58/CE (Diretiva relativa à privacidade e às comunicações eletrónicas). As notas acima são desse tipo: guardam as suas respostas, os preços que escolheu e o caminho de volta. As nossas ferramentas de medição não guardam nada no seu dispositivo e não leem nada dele, exceto a sua escolha de as desligar; no Reino Unido, as PECR também permitem expressamente a medição para fins estatísticos quando é informado dela e se pode opor, como acima. Por isso, não mostramos um aviso de consentimento. Se algum dia acrescentarmos algo que exija consentimento, como píxeis de publicidade, pedir-lho-emos antes.",
                },
                {
                    heading: "Cloudflare Turnstile (só nos formulários)",
                    body: "Antes de um formulário de contacto ou questionário ser enviado, o Turnstile da Cloudflare verifica que é enviado por uma pessoa e não por um robô, com base em sinais como o seu endereço IP e os dados do navegador. Só funciona nesses formulários, para os proteger. A Cloudflare descreve o que recolhe no seu [Turnstile Privacy Addendum](https://www.cloudflare.com/turnstile-privacy-policy/).",
                },
                {
                    heading: "Conteúdos de outros websites",
                    body: "Algumas páginas mostram imagens de bancos de fotografias (Unsplash, Pexels) e bandeiras de flagcdn.com; para as mostrar, o seu navegador contacta esses websites, que veem o seu endereço IP. O nosso portefólio mostra pré-visualizações de websites de clientes, carregadas a partir desses websites. Os links para o WhatsApp, o Facebook, o Instagram, o LinkedIn e o Behance levam-no a serviços com as suas próprias políticas de privacidade.",
                },
            ],
        },
        {
            id: "recipients",
            title: "Quem recebe os seus dados",
            content: [
                {
                    body: "A nossa própria equipa, que precisa deles para lhe responder e fazer o trabalho. Recorremos também a estes prestadores de serviços, com contratos que só lhes permitem utilizar os dados segundo as nossas instruções e os obrigam a mantê-los seguros:",
                    definitions: [
                        { term: "Hetzner Online GmbH (Alemanha)", def: "Os servidores em Nuremberga onde funcionam o nosso CRM e a respetiva base de dados, os nossos websites e o nosso e-mail." },
                        { term: "Vercel Inc. (Estados Unidos)", def: "Aloja este website, executa o código dos seus formulários e fornece o Vercel Web Analytics." },
                        { term: "Microsoft (Microsoft 365)", def: "Envia os e-mails que fazem chegar os formulários à nossa equipa e a confirmação que recebe." },
                        { term: "Cloudflare, Inc. (Estados Unidos)", def: "O Turnstile, a verificação contra spam nos nossos formulários." },
                    ],
                },
                {
                    body: "O WhatsApp (Meta) transporta as mensagens que nos envia por esse meio, ao abrigo das suas próprias condições. Podemos ainda partilhar dados com os nossos consultores profissionais (como contabilistas e advogados), com autoridades ou tribunais quando a lei o exija, e com um comprador ou sucessor se a nossa empresa for vendida ou reorganizada, que terá de os proteger da mesma forma. Não vendemos dados pessoais.",
                },
            ],
        },
        {
            id: "transfers",
            title: "Onde guardamos os seus dados e transferências para o estrangeiro",
            content: [
                {
                    body: "O nosso CRM, a respetiva base de dados, os nossos websites e os nossos servidores de e-mail estão na Alemanha, na União Europeia (Hetzner, Nuremberga). Este website funciona na rede da Vercel, que pode servir e processar pedidos fora da Europa, incluindo nos Estados Unidos.",
                },
                {
                    body: "A nossa empresa está em Angola, e a nossa equipa pode aceder aos dados a partir de Angola e do Reino Unido. Quando os dados saem assim da UE ou do Reino Unido, são protegidos da seguinte forma:",
                    list: [
                        "Reino Unido: a Comissão Europeia reconhece que o Reino Unido assegura um nível de proteção adequado (decisões renovadas em dezembro de 2025, válidas até 27 de dezembro de 2031), e a lei do Reino Unido reconhece da mesma forma os países do Espaço Económico Europeu.",
                        "Angola: nem a UE nem o Reino Unido reconheceram que Angola assegura um nível de proteção adequado. Por isso, utilizamos as cláusulas contratuais-tipo da Comissão Europeia (Decisão de Execução (UE) 2021/914) e, para os dados protegidos pela lei do Reino Unido, a adenda do Reino Unido a essas cláusulas (International Data Transfer Addendum), emitida ao abrigo da secção 119A do Data Protection Act 2018.",
                        "Estados Unidos (Vercel, Cloudflare, Microsoft): o Quadro de Privacidade de Dados UE-EUA (Decisão de Execução (UE) 2023/1795 da Comissão) e a respetiva extensão ao Reino Unido, quando o prestador está certificado, ou, caso contrário, as cláusulas contratuais-tipo previstas nas condições de tratamento de dados do prestador.",
                        "Pessoas em Angola: as transferências dos seus dados para fora de Angola seguem os artigos 33.º e 34.º da Lei n.º 22/11 (notificação à Agência de Protecção de Dados ou autorização desta).",
                    ],
                },
                {
                    body: `Pode pedir-nos uma cópia destas garantias (sem os elementos comerciais) através de ${EMAIL}.`,
                },
            ],
        },
        {
            id: "retention",
            title: "Durante quanto tempo os guardamos",
            content: [
                {
                    definitions: [
                        { term: "Pedidos que não dão origem a trabalho (formulários, diagnóstico, marcações, mensagens)", def: "Até 24 meses após o nosso último contacto consigo; depois, são apagados." },
                        { term: "Clientes", def: "Enquanto trabalharmos juntos e durante 24 meses depois disso; as faturas e os registos contabilísticos, durante o prazo exigido pela lei fiscal e contabilística do país em causa." },
                        { term: "Marketing", def: "Até nos dizer que não quer. A partir daí, guardamos apenas o seu e-mail ou número numa lista de exclusão, para respeitarmos a sua escolha." },
                        { term: "Contador de visitas da Autisync", def: "Eventos: 400 dias. Os valores diários usados para criar os códigos de visitante: apagados no prazo de dois dias." },
                        { term: "Vercel Web Analytics", def: "Código de visitante: apagado ao fim de 24 horas. Totais: enquanto a Vercel os guardar para a nossa conta." },
                        { term: "Armazenamento no seu dispositivo", def: "Como indicado em «Cookies e armazenamento no seu dispositivo»." },
                    ],
                },
                {
                    body: "Só guardamos dados durante mais tempo quando a lei o exige ou para tratar de um litígio.",
                },
            ],
        },
        {
            id: "rights",
            title: "Os seus direitos",
            content: [
                {
                    body: "Onde quer que esteja, pode pedir-nos que:",
                    list: [
                        "lhe digamos se temos dados pessoais seus e lhe demos uma cópia;",
                        "os corrijamos, se estiverem errados ou incompletos;",
                        "os apaguemos;",
                        "limitemos a sua utilização enquanto se esclarece uma questão sobre eles;",
                        "lhos entreguemos, a si ou a outra organização, num formato de uso corrente e de leitura automática, quando os utilizamos com base no seu consentimento ou num contrato;",
                        "deixemos de os utilizar quando nos baseamos em interesses legítimos, e deixemos de lhe enviar marketing a qualquer momento (no caso do marketing, não precisa de dar qualquer motivo);",
                        "consideremos retirado qualquer consentimento que tenha dado, sem afetar o que foi feito antes.",
                    ],
                },
                {
                    body: `Escreva para ${EMAIL}. É gratuito. Respondemos no prazo de um mês; se o pedido for complexo, podemos precisar de mais dois meses, e explicamos-lhe porquê dentro do primeiro mês. Podemos pedir-lhe primeiro que confirme a sua identidade.`,
                },
                {
                    heading: "As leis que lhe dão estes direitos",
                    list: [
                        "Reino Unido: o UK GDPR e o Data Protection Act 2018.",
                        "Portugal e o resto da União Europeia: o Regulamento Geral sobre a Proteção de Dados (Regulamento (UE) 2016/679) e, em Portugal, a Lei n.º 58/2019, de 8 de agosto.",
                        "Angola: a Lei n.º 22/11, de 17 de junho (Lei da Protecção de Dados Pessoais), artigos 25.º a 29.º (informação, acesso, oposição, retificação e eliminação, e decisões automatizadas).",
                        "Namíbia: ainda não está em vigor uma lei geral de proteção de dados; foi preparada uma proposta de lei (Data Protection Bill), que ainda não foi aprovada. O artigo 13.º da Constituição da Namíbia protege a privacidade. Às pessoas na Namíbia damos os mesmos direitos que a todas as outras nesta política.",
                    ],
                },
            ],
        },
        {
            id: "complaints",
            title: "Reclamações",
            content: [
                {
                    body: `Diga-nos primeiro, através de ${EMAIL} ou do nosso [formulário de contacto](/pt/contacto). Confirmamos a receção da sua reclamação no prazo de 30 dias e dizemos-lhe o que estamos a fazer. Pode também, a qualquer momento, apresentar reclamação a uma autoridade de proteção de dados ou recorrer aos tribunais:`,
                    definitions: [
                        { term: "Reino Unido: Information Commissioner's Office (ICO)", def: "Formalmente Information Commission desde 30 de setembro de 2026. Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF · +44 303 123 1113 · [ico.org.uk/make-a-complaint](https://ico.org.uk/make-a-complaint/)" },
                        { term: "Portugal: Comissão Nacional de Proteção de Dados (CNPD)", def: "Av. D. Carlos I, 134, 1.º, 1200-651 Lisboa · +351 213 928 400 · geral@cnpd.pt · [www.cnpd.pt](https://www.cnpd.pt/)" },
                        { term: "Outros países da União Europeia", def: "A autoridade de proteção de dados do país onde vive ou trabalha: [lista das autoridades](https://www.edpb.europa.eu/contact/contact-dpas_pt)" },
                        { term: "Angola: Agência de Protecção de Dados (APD)", def: "Rua do MAT, Complexo Administrativo Clássicos de Talatona, 3.º edifício, 7.º andar, Luanda · +244 937 930 788 · geral@apd.ao · [apd.ao](https://apd.ao/)" },
                        { term: "Namíbia", def: "Ainda não foi criada uma autoridade de proteção de dados. Escreva-nos e trataremos da sua reclamação." },
                    ],
                },
            ],
        },
        {
            id: "security",
            title: "Segurança",
            content: [
                {
                    body: "As ligações a este website e ao nosso CRM são cifradas (HTTPS). O acesso aos dados pessoais está limitado às pessoas que precisam dele. As palavras-passe só são guardadas em forma de hash, e as chaves de acesso a outros serviços são cifradas. Os nossos formulários estão protegidos contra spam e abusos. Nenhum sistema é perfeitamente seguro; se uma violação puser os seus dados em risco, informamos a autoridade de proteção de dados e, quando a lei o exija, a si.",
                },
            ],
        },
        {
            id: "children",
            title: "Crianças",
            content: [
                {
                    body: `Este website e os nossos serviços destinam-se a empresas e não são dirigidos a crianças. Não recolhemos, de forma consciente, dados de menores de 18 anos. Se achar que uma criança nos enviou os seus dados, escreva para ${EMAIL} e apagamo-los.`,
                },
            ],
        },
        {
            id: "languages",
            title: "Versões em português e em inglês",
            content: [
                {
                    body: "Esta política está publicada em português em [autisync.com/pt/privacidade](/pt/privacidade) e em inglês em [autisync.com/PrivacyPolicy](/PrivacyPolicy). As duas dizem o mesmo e têm o mesmo valor; nenhuma prevalece sobre a outra. Se encontrar alguma diferença entre elas, diga-nos para a podermos corrigir; até lá, aplica-se a leitura que lhe for mais favorável.",
                },
            ],
        },
        {
            id: "changes",
            title: "Alterações a esta política",
            content: [
                {
                    body: "Quando alteramos esta política, mudamos a data no topo. Se uma alteração afetar a forma como utilizamos dados que já nos deu, informamo-lo antes de produzir efeitos, com um aviso neste website e, se tivermos o seu e-mail, por e-mail.",
                },
            ],
        },
        {
            id: "contact",
            title: "Contactos",
            content: [
                {
                    list: [
                        `E-mail: ${EMAIL}`,
                        `WhatsApp: ${WHATSAPP}`,
                        "Correio: MAHELDOM CONSULTING, LDA., Edifício do Shopping Jardim do Patriota, Rua Lar do Patriota, Bairro Patriota, Talatona, Luanda, Angola",
                    ],
                },
            ],
        },
    ],
    footerQuestions: "Dúvidas? Escreva-nos para",
    rights: "Todos os direitos reservados.",
};

export const POLICY: Record<PolicyLang, PolicyDoc> = { en, pt };
