// Run locally with internet: npm run check:links
import fs from "node:fs";
const txt = fs.readFileSync(process.argv[2] ?? "content/tool-links.txt", "utf8");
const items = txt.split("\n").map(l => l.match(/^(.+?) — (https?:\/\/\S+)/)).filter(Boolean).map(m => ({ name: m[1], url: m[2] }));
const results = {};
for (const { name, url } of items) {
  try {
    const r = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15000), headers: { "user-agent": "napeyda-link-check" } });
    results[name] = { url, status: r.ok ? "ok" : "http_" + r.status };
  } catch { results[name] = { url, status: "unreachable" }; }
  console.log(name, results[name].status);
}
fs.writeFileSync("content/links-status.json", JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2));
