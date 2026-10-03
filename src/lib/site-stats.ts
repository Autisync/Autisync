/**
 * The headline numbers shown on the About and Portfolio pages.
 *
 * Keep them here, in one place, so the two pages can never disagree again
 * (About used to say 150+ projects and 15+ countries while Portfolio said 50+
 * projects, and the rest of the site says we operate in 4 countries).
 * Update these when they change; only publish figures we can back up.
 */
export const siteStats = {
    projects: 50,          // projects launched (shown as "50+")
    clients: 30,           // clients served (shown as "30+")
    countries: 4,          // UK, Portugal, Namibia, Angola
    years: 5,              // years building digital (shown as "5+")
    satisfaction: 98,      // % client satisfaction
    uptime: 99,            // % uptime guarantee
} as const;
