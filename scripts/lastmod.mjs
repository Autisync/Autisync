// Writes src/lib/lastmod.json: for every page, the date its files last
// changed in git. The sitemap reads it, so each URL carries a real lastmod
// instead of one shared date. Run before committing page changes:
//   node scripts/lastmod.mjs
// (Vercel builds from a shallow clone, so this can't run at build time.)
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const APP = "src/app";
const pages = [];
(function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) { if (e.name !== "api") walk(p); }
        else if (/^page\.(tsx|ts|jsx|js)$/.test(e.name)) pages.push(dir);
    }
})(APP);

const gitDate = (paths) => {
    try {
        return execFileSync("git", ["log", "-1", "--format=%cs", "--", ...paths], { encoding: "utf8" }).trim() || null;
    } catch { return null; }
};

const out = {};
for (const dir of pages) {
    const route = "/" + path.relative(APP, dir).split(path.sep).filter((s) => !/^\(.*\)$/.test(s)).join("/");
    const r = route === "/" ? "/" : route.replace(/\/$/, "");
    // The home pages share their sections with other folders.
    const extra = r === "/" ? [path.join(APP, "(main)/homescreen")] : r === "/pt" ? [path.join(APP, "(main)/homescreen")] : [];
    // A folder's own page, not the pages nested under it.
    const own = fs.readdirSync(dir, { withFileTypes: true })
        .filter((e) => e.isFile() || !fs.existsSync(path.join(dir, e.name, "page.tsx")))
        .map((e) => path.join(dir, e.name));
    if (r.includes("[")) {
        // /crm/[industry]: one date per industry file.
        const ind = path.join(APP, "(main)/crm/industries");
        for (const f of fs.readdirSync(ind)) {
            const src = fs.readFileSync(path.join(ind, f), "utf8");
            for (const m of src.matchAll(/slug: "([a-z-]+)"/g)) {
                out[r.replace(/\[[^\]]+\]/, m[1])] = gitDate([path.join(ind, f), path.join(ind, "LiveDemo.tsx"), ...own]);
            }
        }
        continue;
    }
    out[r] = gitDate([...own, ...extra]);
}
const sorted = Object.fromEntries(Object.entries(out).filter(([, d]) => d).sort());
fs.writeFileSync("src/lib/lastmod.json", JSON.stringify(sorted, null, 2) + "\n");
console.log(`lastmod.json: ${Object.keys(sorted).length} pages`);
