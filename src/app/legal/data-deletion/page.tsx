import type { Metadata } from "next";
import LegalDocument, { type LegalSection } from "../LegalDocument";

export const metadata: Metadata = {
    title: "Deleting your data | Autisync",
    description:
        "How to have data removed that reached Autisync CRM through Facebook, Instagram or WhatsApp, and what happens when a business closes its account.",
    alternates: { canonical: "https://www.autisync.com/legal/data-deletion" },
    robots: { index: true, follow: true },
};

const LAST_UPDATED = "22 September 2026";

const sections: LegalSection[] = [
    {
        id: "messaged-a-business",
        title: "If you messaged a business and want your record removed",
        content: [
            {
                body: "The business you wrote to holds that conversation, and it can delete it from Autisync itself at any time. Asking them directly is usually fastest.",
            },
            {
                body: "If you would rather come to us, email info@autisync.com from the address you used, or tell us the phone number or account you messaged from. We do not need anything else. We will find every record tied to that identifier and erase it — the contact record, the messages, and any photographs, documents or voice notes attached to them — within 30 days, and we will write back to confirm when it is done.",
            },
            {
                body: "One thing survives that erasure. Where the business is required by law to keep an accounting record — an invoice it issued you, a payment you made — the record stays, but your name, email address, phone number and address are removed from it, so it no longer identifies you. Nothing you wrote and nothing you sent is kept with it.",
            },
            {
                body: "We may keep a minimal record that a deletion request was made and honoured, because we have to be able to show that we acted on it. That record is a count and a one-way hash of the identifier. It contains no message content and cannot be read back to learn who asked.",
            },
        ],
    },
    {
        id: "removed-the-app",
        title: "If you removed Autisync from your Facebook or Instagram account",
        content: [
            {
                body: "Removing the app in your Facebook or Instagram settings stops any further data reaching us, and Meta notifies us that you have done so. It does not by itself erase what a business already received, because those messages belong to the conversation that business had with you. To have those erased as well, send the request described above.",
            },
        ],
    },
    {
        id: "closing-an-account",
        title: "If you are a business closing your Autisync account",
        content: [
            {
                body: "Ask us to close it, or use the account settings in the product. Everything belonging to the account — users, contacts, conversations, files and connected channel credentials — is deleted within 30 days. Tell us if you need an export first; once the deletion runs it cannot be undone.",
            },
        ],
    },
    {
        id: "backups",
        title: "What happens to backups",
        content: [
            {
                body: "Deleted data can persist in encrypted backups for a short period after erasure. Those backups are on a rolling schedule and expire within 30 days, after which no copy remains.",
            },
        ],
    },
    {
        id: "how-long",
        title: "How long it takes",
        content: [
            {
                body: "We aim to complete deletion requests within 7 days and we are bound to complete them within 30. If a request needs longer for a reason we can explain, we will tell you why rather than let the clock run out in silence.",
            },
        ],
    },
];

export default function AutisyncCrmDataDeletionPage() {
    return (
        <LegalDocument
            title="Deleting your data"
            lastUpdated={LAST_UPDATED}
            standfirst="Meta requires every app to say plainly how a person gets their data removed. This is that page. It applies to data that reached Autisync CRM through Facebook, Instagram or WhatsApp, and to everything else we hold."
            intro="To start a request, email info@autisync.com from the address you used, or tell us the phone number or account you messaged from. Everything below explains what happens next."
            sections={sections}
        />
    );
}
