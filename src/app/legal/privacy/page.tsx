import type { Metadata } from "next";
import LegalDocument, { type LegalSection } from "../LegalDocument";

export const metadata: Metadata = {
    title: "Autisync CRM Privacy Policy",
    description:
        "How Autisync CRM handles the messages, contacts and files that pass through it from WhatsApp, Facebook Messenger, Instagram, email and website forms.",
    alternates: { canonical: "https://www.autisync.com/legal/privacy" },
    robots: { index: true, follow: true },
};

const LAST_UPDATED = "22 September 2026";

const sections: LegalSection[] = [
    {
        id: "responsibility",
        title: "Who is responsible for what",
        content: [
            {
                body: "Two different businesses are involved in any conversation held in Autisync, and the law treats them differently.",
                definitions: [
                    {
                        term: "The business using Autisync",
                        def: "Decides who to talk to and what to say. It is the data controller for its own customers' information, and its own privacy policy governs that relationship.",
                    },
                    {
                        term: "Maheldom Consulting, Lda (Autisync)",
                        def: "Stores and delivers those conversations on that business's instruction and on nobody else's. We are the data processor. We do not decide what is sent, and we do not use the contents for our own purposes.",
                    },
                ],
            },
        ],
    },
    {
        id: "what-we-hold",
        title: "What we hold",
        content: [
            {
                heading: "About the people who use Autisync",
                list: [
                    "Name, email address and role.",
                    "A password stored only as a cryptographic hash — we cannot read it, and neither can anyone who obtains the database.",
                    "Sign-in times and the IP address a request came from, kept in access logs.",
                ],
            },
            {
                heading: "About the contacts they talk to",
                list: [
                    "Name, email address, phone number and company, where the business has them.",
                    "The messages themselves: the text, the time, the direction, and whether each one was sent, delivered and read.",
                    "Files a contact sends — photographs, documents, voice notes, stickers — downloaded and stored so the conversation is still complete when somebody opens it later.",
                    "The identifier the channel uses for that person. On Messenger and Instagram this is a scoped identifier that is meaningful only between that account and this app; on WhatsApp it is the phone number they wrote from.",
                    "Public profile name and picture, retrieved from the channel so a conversation shows a person rather than a number.",
                ],
            },
            {
                heading: "About connected accounts",
                list: [
                    "Access tokens for the channels a business connects. These are encrypted before they are written to the database and are never displayed back in full.",
                    "Page, Instagram account and WhatsApp business account identifiers, used to route an incoming message to the right business.",
                ],
            },
        ],
    },
    {
        id: "why",
        title: "Why we hold it",
        content: [
            {
                body: "To run the inbox, and for nothing else: to show a conversation in order, attribute it to the right contact, deliver a reply, report whether it arrived and was read, and keep the file a client sent so it can be opened again. Delivery state and failure reasons are also kept so a business can tell the difference between a message that was ignored and one that never arrived.",
            },
        ],
    },
    {
        id: "what-we-do-not-do",
        title: "What we do not do",
        content: [
            {
                list: [
                    "We do not sell personal data, and we never have.",
                    "We do not use message contents for advertising or profiling.",
                    "We do not use message contents to train machine learning models.",
                    "We do not let one business see another's conversations. Every record is scoped to its business and that scoping is enforced in the database itself, not only in the interface.",
                ],
            },
        ],
    },
    {
        id: "who-else",
        title: "Who else sees it",
        content: [
            {
                body: "Only the parties that have to, to make a message move:",
                list: [
                    "Meta Platforms — messages to and from WhatsApp, Messenger and Instagram travel through Meta's APIs, under Meta's own terms.",
                    "Our hosting provider, which runs the servers the data sits on.",
                    "An email delivery provider, for messages sent by email.",
                ],
            },
            {
                body: "We disclose data to no one else, except where a law compels us and we are permitted to say so.",
            },
        ],
    },
    {
        id: "retention",
        title: "Where it is kept, and for how long",
        content: [
            {
                body: "Data is held on servers in the European Union. Conversations and files are kept while the business's account is open, because that is the record the business is paying us to keep. When an account is closed, everything belonging to it is deleted within 30 days.",
            },
            {
                body: "A business can delete an individual contact, conversation or file at any time, and can ask us to delete anything sooner. Erasure reaches the stored files as well as the database rows, and is recorded so that it can be shown to have happened — as a count and a one-way hash of the identifier, never the identifier itself.",
            },
            {
                body: "The one exception is an accounting record the business must keep by law: the invoice or the payment stays, stripped of the name and contact details that made it personal.",
            },
        ],
    },
    {
        id: "protection",
        title: "How it is protected",
        content: [
            {
                list: [
                    "Traffic is encrypted in transit.",
                    "Channel access tokens are encrypted before storage.",
                    "Passwords are hashed, never stored or transmitted in a readable form.",
                    "Every incoming webhook is checked against a cryptographic signature before it is processed, so a forged request cannot inject a message.",
                    "Access is limited to the people who need it to operate the service.",
                ],
            },
        ],
    },
    {
        id: "rights",
        title: "Your rights",
        content: [
            {
                body: "If you are a contact of a business that uses Autisync, that business holds your record and is your first point of contact. If you would rather come to us, or if the business no longer exists, write to info@autisync.com and we will act on it directly. You can ask for a copy of what we hold about you, ask for it to be corrected, or ask for it to be erased. Where the GDPR applies you also have the right to complain to your national supervisory authority.",
            },
        ],
    },
    {
        id: "deleting",
        title: "Deleting your data",
        content: [
            {
                body: "Instructions, including how to remove data that reached us through Facebook or Instagram, are on the data deletion page at autisync.com/legal/data-deletion.",
            },
        ],
    },
    {
        id: "children",
        title: "Children",
        content: [
            {
                body: "Autisync is a tool for businesses and is not directed at children. We do not knowingly collect data from anyone under 16. If you believe we have, tell us and we will remove it.",
            },
        ],
    },
    {
        id: "changes",
        title: "Changes",
        content: [
            {
                body: "If this policy changes in a way that affects what we do with personal data, we will tell the businesses using Autisync before the change takes effect, and the date at the top of this page will change.",
            },
        ],
    },
];

export default function AutisyncCrmPrivacyPage() {
    return (
        <LegalDocument
            title="Privacy Policy"
            lastUpdated={LAST_UPDATED}
            standfirst="Autisync CRM is a customer relationship manager. Businesses use it to talk to their own customers across WhatsApp, Facebook Messenger, Instagram, email and website forms, in one inbox. This page explains what happens to the data that passes through it."
            intro="Autisync is a product of Maheldom Consulting, Lda, a company registered in Angola under NIF 5003472418 and matrícula 41063-26/260824, whose registered office is given at the foot of this page. Where this policy says “we”, it means that company."
            sections={sections}
        />
    );
}
