export type SpamDecision = "accepted" | "review" | "rejected";

export interface SpamAssessment {
  score: number;
  decision: SpamDecision;
  reasons: string[];
}

interface SpamScoreInput {
  email?: string;
  textFields: string[];
  ipRecentCount?: number;
}

const DISPOSABLE_DOMAINS = new Set([
  "10minutemail.com",
  "guerrillamail.com",
  "mailinator.com",
  "tempmail.com",
  "yopmail.com",
  "sharklasers.com",
  "trashmail.com",
]);

const SUSPICIOUS_KEYWORDS = [
  "seo agency",
  "crypto",
  "investment",
  "backlink",
  "casino",
  "telegram",
  "whatsapp me",
  "guaranteed traffic",
  "guest post",
  "ranking service",
];

const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const LINK_PATTERN = /(https?:\/\/\S+|www\.\S+)/gi;

export function countLinks(text: string): number {
  return text.match(LINK_PATTERN)?.length ?? 0;
}

export function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? DISPOSABLE_DOMAINS.has(domain) : false;
}

export function extractEmailFromQuestionnaireAnswers(
  answers: Record<string, unknown>
): string | undefined {
  const preferredKeys = ["contact_email", "email", "business_email", "work_email"];

  for (const key of preferredKeys) {
    const value = answers[key];
    if (typeof value === "string") {
      const candidate = value.trim().toLowerCase();
      if (EMAIL_PATTERN.test(candidate)) return candidate;
    }
  }

  for (const value of Object.values(answers)) {
    if (typeof value !== "string") continue;
    const match = value.match(EMAIL_PATTERN);
    if (match) return match[0].toLowerCase();
  }

  return undefined;
}

function looksGibberish(text: string): boolean {
  const compact = text.replace(/\s+/g, "").toLowerCase();
  if (compact.length < 8) return false;

  const uniqueRatio = new Set(compact).size / compact.length;
  const hasLongRepeat = /(.)\1{5,}/.test(compact);
  const hasFewVowels = (compact.match(/[aeiou]/g)?.length ?? 0) / compact.length < 0.18;

  return hasLongRepeat || (uniqueRatio < 0.25 && hasFewVowels);
}

function hasObviousFakeValue(text: string): boolean {
  const normalized = text.trim().toLowerCase();
  return ["test", "asdf", "qwerty", "n/a", "none", "unknown", "---"].includes(normalized);
}

export function assessSpam(input: SpamScoreInput): SpamAssessment {
  let score = 0;
  const reasons: string[] = [];
  const flattenedText = input.textFields.join(" \n ").trim();

  if (input.email && isDisposableEmail(input.email)) {
    score += 25;
    reasons.push("disposable-email-domain");
  }

  const links = countLinks(flattenedText);
  if (links > 2) {
    score += 20;
    reasons.push("too-many-links");
  }

  const normalized = flattenedText.toLowerCase();
  if (SUSPICIOUS_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    score += 20;
    reasons.push("suspicious-keywords");
  }

  if ((input.ipRecentCount ?? 0) >= 2) {
    score += 25;
    reasons.push("repeated-ip-submissions");
  }

  if (!flattenedText || hasObviousFakeValue(flattenedText)) {
    score += 15;
    reasons.push("empty-or-fake-content");
  }

  if (looksGibberish(flattenedText)) {
    score += 10;
    reasons.push("nonsense-pattern");
  }

  let decision: SpamDecision = "accepted";
  if (score > 60) {
    decision = "rejected";
  } else if (score >= 30) {
    decision = "review";
  }

  return { score, decision, reasons };
}
