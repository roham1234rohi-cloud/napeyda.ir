"use client";
import { useState } from "react";
import { FAQS, FAQ_CATS } from "@/content/faq";
export default function FaqList() {
  const [cat, setCat] = useState<string>("همه"); const [q, setQ] = useState("");
  const items = FAQS.filter(f => (cat === "همه" || f.cat === cat) && (f.q + f.a).includes(q.trim()));
  return (<div>
    <div className="field"><label htmlFor="faq-q">جستجو</label><input id="faq-q" type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="مثلاً: پرداخت" /></div>
    <div className="chips" role="group" aria-label="دسته‌بندی">{["همه", ...FAQ_CATS].map(c => <button key={c} className="btn" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}</div>
    {items.length === 0 ? <p className="note" role="status">نتیجه‌ای پیدا نشد. عبارت دیگری را امتحان کنید.</p> :
      items.map(f => <details className="acc" key={f.q}><summary>{f.q}</summary><div><span className="tag">{f.cat}</span><p>{f.a}</p></div></details>)}
  </div>);
}
