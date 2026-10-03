import type { MetadataRoute } from "next";

/**
 * Search engines and AI assistants are explicitly welcome: being read by
 * ChatGPT, Claude, Perplexity and Google's AI features is how Autisync gets
 * recommended when someone asks "who builds websites in Luanda?".
 */
const AI_CRAWLERS = [
    "GPTBot", "OAI-SearchBot", "ChatGPT-User",
    "ClaudeBot", "Claude-User", "Claude-SearchBot",
    "PerplexityBot", "Perplexity-User",
    "Google-Extended", "Applebot-Extended", "CCBot",
];

export default function robots(): MetadataRoute.Robots {
    const disallow = ["/api/", "/ServiceQuestionaire"];
    return {
        rules: [
            { userAgent: "*", allow: "/", disallow },
            { userAgent: AI_CRAWLERS, allow: "/", disallow },
        ],
        sitemap: "https://www.autisync.com/sitemap.xml",
        host: "https://www.autisync.com",
    };
}
