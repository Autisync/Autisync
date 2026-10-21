/**
 * Progress through the service questionnaires (/ServiceQuestionaire and
 * /pt/questionario), kept for the visit in sessionStorage, the way the quiz
 * keeps its answers (src/app/quiz/QuizFunnel.tsx).
 *
 * The questionnaires are long (six to eight steps) and used to live only in
 * memory: Escape, a tap outside the card, a reload or Back from another page
 * threw every answer away. Now the step and answers of each questionnaire are
 * kept, and so is which one was open, so coming back reopens it where they
 * were. A questionnaire's entry is removed once it has been sent.
 *
 * One store per language: answers are kept as the option labels, which differ
 * between the English and Portuguese questionnaires.
 */
export type QAnswers = Record<string, string | string[]>;

type Saved = { section: number; answers: QAnswers; at: number };
type Store = { active: string | null; forms: Record<string, Saved> };
type Shape = { id: string; sections: { fields: { id: string; type: string }[] }[] };

export const questionnaireStore = (lang: "en" | "pt") => `autisync.questionnaire.${lang}.v1`;

function read(key: string): Store {
    try {
        const raw = JSON.parse(sessionStorage.getItem(key) || "null");
        if (raw && typeof raw === "object") {
            return {
                active: typeof raw.active === "string" ? raw.active : null,
                forms: raw.forms && typeof raw.forms === "object" ? raw.forms : {},
            };
        }
    } catch { /* storage blocked or garbled: start fresh */ }
    return { active: null, forms: {} };
}

function write(key: string, store: Store) {
    try { sessionStorage.setItem(key, JSON.stringify(store)); } catch { /* private mode: carry on in memory */ }
}

/** The saved step and answers for this questionnaire, keeping only answers to fields it still has. */
export function loadQuestionnaire(key: string, q: Shape): { section: number; answers: QAnswers } | null {
    const saved = read(key).forms[q.id];
    if (!saved || typeof saved !== "object") return null;
    const fields = new Map(q.sections.flatMap((s) => s.fields.map((f) => [f.id, f.type] as const)));
    const answers: QAnswers = {};
    for (const [id, v] of Object.entries(saved.answers || {})) {
        const type = fields.get(id);
        if (!type) continue;
        if (type === "multiselect" ? Array.isArray(v) && v.every((x) => typeof x === "string") : typeof v === "string") answers[id] = v;
    }
    const section = Number.isInteger(saved.section) ? Math.max(0, Math.min(saved.section, q.sections.length - 1)) : 0;
    return { section, answers };
}

export function saveQuestionnaire(key: string, id: string, section: number, answers: QAnswers) {
    const store = read(key);
    const empty = section === 0 && Object.values(answers).every((v) => (Array.isArray(v) ? v.length === 0 : !v));
    if (empty) delete store.forms[id];
    else store.forms[id] = { section, answers, at: Date.now() };
    write(key, store);
}

/** Sent: forget its answers, and don't reopen it. */
export function clearQuestionnaire(key: string, id: string) {
    const store = read(key);
    delete store.forms[id];
    if (store.active === id) store.active = null;
    write(key, store);
}

export function setActiveQuestionnaire(key: string, id: string | null) {
    const store = read(key);
    store.active = id;
    write(key, store);
}

export const activeQuestionnaire = (key: string) => read(key).active;
export const startedQuestionnaires = (key: string) => Object.keys(read(key).forms);
