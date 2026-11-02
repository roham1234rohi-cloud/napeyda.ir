"use client";
import Link from "next/link"; import { useState } from "react";
import type { Post } from "@/content/posts";
export default function PostList({ posts, cats, mins }: { posts: Post[]; cats: string[]; mins: Record<string, number> }) {
  const [q, setQ] = useState(""); const [cat, setCat] = useState("همه");
  const items = posts.filter(p => (cat === "همه" || p.cat === cat) && (p.title + p.desc + p.tags.join(" ")).includes(q.trim()));
  return <div>
    <div className="field"><label htmlFor="pq">جستجو در مقالات</label><input id="pq" type="search" value={q} onChange={e => setQ(e.target.value)} /></div>
    <div className="chips" role="group" aria-label="دسته‌بندی">{["همه", ...cats].map(c => <button key={c} className="btn" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}</div>
    {items.length === 0 ? <p className="note" role="status">مقاله‌ای پیدا نشد.</p> : <div className="grid">{items.map(p => <Link key={p.slug} href={`/blog/${p.slug}`} className="card"><span className="tag">{p.cat}</span><h3 style={{ marginTop: 8 }}>{p.title}</h3><p>{p.desc}</p><p style={{ marginTop: 8, fontSize: ".82rem" }}>{mins[p.slug]} دقیقه مطالعه</p></Link>)}</div>}
  </div>;
}
