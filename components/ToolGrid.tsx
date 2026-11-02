"use client";
import { useState } from "react";
type Tool = { cat: string; name: string; use: string; url: string; plan: string; limits: string };
export default function ToolGrid({ tools, status }: { tools: Tool[]; status: Record<string, string> }) {
  const cats = Array.from(new Set(tools.map(t => t.cat)));
  const [q, setQ] = useState(""); const [cat, setCat] = useState("همه");
  const items = tools.filter(t => (cat === "همه" || t.cat === cat) && (t.name + t.use + t.cat).toLowerCase().includes(q.trim().toLowerCase()));
  return <div>
    <div className="field"><label htmlFor="tq">جستجوی ابزار</label><input id="tq" type="search" value={q} onChange={e => setQ(e.target.value)} /></div>
    <div className="chips" role="group" aria-label="دسته‌بندی">{["همه", ...cats].map(c => <button key={c} className="btn" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}</div>
    {items.length === 0 ? <p className="note" role="status">ابزاری پیدا نشد.</p> : <div className="grid">{items.map(t => <div className="card" key={t.name}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}><span aria-hidden style={{ width: 36, height: 36, borderRadius: 10, background: "var(--panel2)", display: "grid", placeItems: "center", fontWeight: 800 }}>{t.name[0]}</span><h3 dir="ltr" style={{ margin: 0 }}>{t.name}</h3></div>
      <p style={{ margin: "8px 0" }}>{t.use}</p><span className="tag">{t.cat}</span> <span className="tag">{t.plan}</span>
      <p style={{ fontSize: ".85rem", marginTop: 8 }}>{t.limits}</p>
      <p style={{ fontSize: ".82rem" }}>وضعیت لینک: {status[t.name] === "ok" ? "بررسی‌شده" : "بررسی نشده"}</p>
      <a className="btn" href={t.url} target="_blank" rel="noopener noreferrer">سایت رسمی</a></div>)}</div>}
  </div>;
}
