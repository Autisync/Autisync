/**
 * What the quiz tells the visitor tracker (the CRM's t.js, loaded in the root
 * layout). t.js takes two kinds of event from the page,
 * autisyncTrack("click" | "convert", label), and the CRM's Visitors report
 * lists clicks by label and builds funnels from labels ("click whose label
 * contains 'Step 3/4'"). So every quiz event is a short, fixed label, with
 * keys rather than the visitor's words, and never anything they typed.
 *
 *   Step 2/4 · What gets in the way most?      a step shown (once per page load)
 *   Answer · business_type: trades            an answer chosen
 *   Privacy notice opened · step 4/4          the short privacy notice opened
 *   Prefer to talk · booking opened · step 1/4  the "book a call instead" path
 *   Back to step 2/4                          the browser's or the card's Back
 *   Quiz resumed at step 3/4                  came back to a quiz half done
 *   Quiz sent                                 (convert) the lead was accepted
 *
 * Safe by design: if t.js is blocked, slow, or not loaded (Do Not Track), the
 * calls do nothing. Events from before t.js has loaded wait up to 15 seconds.
 * Every event is also kept on window.__quizEvents, so it can be checked in a
 * browser (and by the tests) without the tracker.
 */

export type QuizEventName =
    | "step_viewed"
    | "answer"
    | "legal_opened"
    | "full_policy_opened"
    | "talk_opened"
    | "back"
    | "resumed"
    | "submitted";

export interface QuizEvent {
    name: QuizEventName;
    type: "click" | "convert";
    label: string;
    data: Record<string, string | number>;
    at: number;
}

type TrackFn = (type: "click" | "convert", label: string) => void;
type W = Window & {
    autisyncTrack?: TrackFn;
    __autisyncTracker?: boolean;
    __quizEvents?: QuizEvent[];
};

const pending: Array<[QuizEvent["type"], string]> = [];
let timer: number | null = null;
let waitedMs = 0;

function trackerReady(w: W): boolean {
    return !!w.__autisyncTracker && typeof w.autisyncTrack === "function";
}

function drain() {
    const w = window as W;
    if (trackerReady(w)) {
        while (pending.length) {
            const [t, l] = pending.shift()!;
            try { w.autisyncTrack!(t, l); } catch { /* never break the page */ }
        }
    }
    if (!pending.length || waitedMs >= 15_000) {
        pending.length = 0;
        if (timer !== null) window.clearInterval(timer);
        timer = null;
        return;
    }
}

function forward(type: QuizEvent["type"], label: string) {
    pending.push([type, label]);
    drain();
    if (pending.length && timer === null) {
        waitedMs = 0;
        timer = window.setInterval(() => { waitedMs += 500; drain(); }, 500);
    }
}

/**
 * Record a quiz event. `viaClick`: the event came from a click on an element
 * whose data-track attribute carries this same label. t.js counts that click
 * itself, so it is only sent from here when t.js was not listening yet.
 */
export function quizEvent(
    name: QuizEventName,
    label: string,
    data: Record<string, string | number> = {},
    opts: { convert?: boolean; viaClick?: boolean } = {},
): void {
    if (typeof window === "undefined") return;
    const w = window as W;
    const type = opts.convert ? "convert" : "click";
    const ev: QuizEvent = { name, type, label: label.slice(0, 160), data, at: Date.now() };
    try {
        (w.__quizEvents ||= []).push(ev);
        if (w.__quizEvents.length > 200) w.__quizEvents.splice(0, w.__quizEvents.length - 200);
    } catch { /* ignore */ }
    if (opts.viaClick && trackerReady(w)) return;
    forward(type, ev.label);
}
