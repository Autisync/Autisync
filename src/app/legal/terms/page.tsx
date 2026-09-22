import type { Metadata } from "next";
import LegalDocument, { type LegalSection } from "../LegalDocument";

export const metadata: Metadata = {
    title: "Autisync CRM Terms of Service",
    description:
        "The terms governing use of Autisync CRM: accounts, acceptable use, data ownership, third-party channels, payment and termination.",
    alternates: { canonical: "https://www.autisync.com/legal/terms" },
    robots: { index: true, follow: true },
};

const LAST_UPDATED = "22 September 2026";

const sections: LegalSection[] = [
    {
        id: "what-it-is",
        title: "What the service is",
        content: [
            {
                body: "Autisync CRM gives a business one inbox for the conversations it has with its customers across WhatsApp, Facebook Messenger, Instagram, email and its own website, along with the contact records, tasks and automations built around them.",
            },
        ],
    },
    {
        id: "your-account",
        title: "Your account",
        content: [
            {
                list: [
                    "You are responsible for what happens under your account, including what the people you invite to it do.",
                    "Keep credentials secret. Tell us promptly if you think they have been exposed.",
                    "You must be old enough to enter a contract in your country, and authorised to bind the business you are signing up.",
                ],
            },
        ],
    },
    {
        id: "acceptable-use",
        title: "What you may not do with it",
        content: [
            {
                list: [
                    "Send unsolicited bulk messages, or anything the receiving platform's rules forbid. Messaging through WhatsApp, Messenger and Instagram is additionally governed by Meta's policies, and those apply to you directly.",
                    "Message people who have asked you to stop.",
                    "Upload or transmit anything unlawful, or anything you have no right to send.",
                    "Attempt to reach another business's data, or to circumvent the separation between accounts.",
                    "Resell access to the service without a written agreement with us.",
                ],
            },
            { body: "We may suspend an account that breaks these rules, and we will say why." },
        ],
    },
    {
        id: "your-data",
        title: "Your data stays yours",
        content: [
            {
                body: "Your contacts, conversations and files belong to you. We store and transmit them on your instruction, as described in the privacy policy. We do not sell them, mine them for advertising, or train models on them. You can export or delete them, and we delete everything within 30 days of your account closing.",
            },
        ],
    },
    {
        id: "channels",
        title: "Third-party channels",
        content: [
            {
                body: "WhatsApp, Messenger, Instagram and email are run by other companies. Autisync connects to them, but it does not control them. If a platform changes its rules, restricts an account, or has an outage, that affects what the service can do and is outside our control. Some channels also impose their own limits — for example, the window during which you may reply to a customer without a paid template.",
            },
        ],
    },
    {
        id: "availability",
        title: "Availability",
        content: [
            {
                body: "We aim to keep the service running and to give notice before planned maintenance. We do not promise uninterrupted availability unless a separate written agreement says we do.",
            },
        ],
    },
    {
        id: "payment",
        title: "Payment",
        content: [
            {
                body: "Fees, billing period and notice are set out in your plan or order form. Fees are payable in advance unless agreed otherwise. We will give at least 30 days' notice before a price change takes effect.",
            },
        ],
    },
    {
        id: "ending",
        title: "Ending it",
        content: [
            {
                body: "You may close your account at any time. We may end this agreement with 30 days' notice, or immediately if the account is used in a way that breaks these terms or exposes us or others to legal risk. On termination you keep the right to export your data for 30 days.",
            },
        ],
    },
    {
        id: "liability",
        title: "Liability",
        content: [
            {
                body: "The service is provided as it is. To the extent the law allows, we are not liable for indirect or consequential loss, lost profits, or lost business. Nothing here limits liability for death, personal injury, fraud, or anything else that cannot be limited by law.",
            },
        ],
    },
    {
        id: "changes",
        title: "Changes to these terms",
        content: [
            {
                body: "We will give at least 30 days' notice of a material change. Continuing to use the service after that means accepting the new terms.",
            },
        ],
    },
    {
        id: "governing-law",
        title: "Governing law",
        content: [
            {
                body: "These terms are governed by the laws of England and Wales, and its courts have exclusive jurisdiction.",
            },
        ],
    },
];

export default function AutisyncCrmTermsPage() {
    return (
        <LegalDocument
            title="Terms of Service"
            lastUpdated={LAST_UPDATED}
            standfirst="These terms govern the use of Autisync CRM, a customer relationship manager operated by Maheldom Consulting, Lda. Using the service means agreeing to them."
            intro="These terms cover the Autisync CRM product. Use of the autisync.com website itself is covered by the separate Terms of Use linked from the site footer."
            sections={sections}
        />
    );
}
