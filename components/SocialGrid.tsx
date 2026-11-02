"use client";
import { useEffect, useRef, useState } from "react";
import type { IgMedia } from "@/lib/instagram";
const TYPE: Record<string, string> = { IMAGE: "تصویر", VIDEO: "ویدیو / ریلز", CAROUSEL_ALBUM: "آلبوم" };
const thumb = (m: IgMedia) => (m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url) ?? m.thumbnail_url;
export default function SocialGrid({ initial, next: n0 }: { initial: IgMedia[]; next: string | null }) {
  const [items, setItems] = useState(initial); const [next, setNext] = useState(n0); const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(""); const [open, setOpen] = useState<IgMedia | null>(null); const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (!open) return; closeRef.current?.focus(); const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null); addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, [open]);
  async function more() {
    setBusy(true); setErr("");
    try { const r = await fetch(`/api/instagram/media?after=${encodeURIComponent(next!)}`); const j = await r.json(); if (!r.ok || j.kind !== "live") throw 0; setItems(i => [...i, ...j.media]); setNext(j.next); }
    catch { setErr("بارگذاری ادامه پست‌ها ممکن نشد. بعداً دوباره تلاش کنید."); } finally { setBusy(false); }
  }
  async function share(m: IgMedia) { try { if (navigator.share) await navigator.share({ url: m.permalink }); else { await navigator.clipboard.writeText(m.permalink); setCopied(true); } } catch {} }
  return (<>
    {items.length === 0 ? <p className="note" role="status">پستی برای نمایش وجود ندارد.</p> :
      <div style={{ display: "grid", gap: 4, gridTemplateColumns: "repeat(3,1fr)" }}>{items.map(m => { const t = thumb(m); return (
        <button key={m.id} onClick={() => { setCopied(false); setOpen(m); }} aria-label={`باز کردن ${TYPE[m.media_type] ?? "پست"}`} style={{ aspectRatio: "1", padding: 0, border: 0, background: "var(--panel)", cursor: "pointer", overflow: "hidden" }}>
          {t ? <img src={t} alt={m.caption?.slice(0, 80) ?? "پست اینستاگرام"} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span className="tag">{TYPE[m.media_type] ?? "پست"}</span>}</button>); })}</div>}
    {next && <div className="cta"><button className="btn" onClick={more} disabled={busy}>{busy ? "در حال بارگذاری…" : "بارگذاری بیشتر"}</button></div>}
    {err && <p className="err" role="alert" style={{ textAlign: "center" }}>{err}</p>}
    {open && <div role="dialog" aria-modal="true" aria-label="نمایش پست" onClick={() => setOpen(null)} style={{ position: "fixed", inset: 0, zIndex: 90, background: "rgba(0,0,0,.85)", display: "grid", placeItems: "center", padding: 16, overflowY: "auto" }}>
      <div className="card" onClick={e => e.stopPropagation()} style={{ maxWidth: 520, width: "100%" }}>
        <button ref={closeRef} className="btn" onClick={() => setOpen(null)}>بستن</button>
        {thumb(open) && <img src={thumb(open)} alt={open.caption?.slice(0, 80) ?? "پست اینستاگرام"} style={{ width: "100%", borderRadius: 12, margin: "12px 0" }} />}
        <span className="tag">{TYPE[open.media_type] ?? "پست"}</span>
        {open.caption && <p style={{ whiteSpace: "pre-wrap", color: "var(--text)" }}>{open.caption}</p>}
        {open.timestamp && <p className="lead">{new Date(open.timestamp).toLocaleDateString("fa-IR")}</p>}
        <div className="cta" style={{ justifyContent: "flex-start" }}><a className="btn primary" href={open.permalink} target="_blank" rel="noopener noreferrer">مشاهده در اینستاگرام</a><button className="btn" onClick={() => share(open)}>{copied ? "لینک کپی شد" : "اشتراک‌گذاری"}</button></div>
      </div></div>}
  </>);
}
