import Link from "next/link"; import { getFeed } from "@/lib/instagram"; import { instagramUrl } from "@/lib/site";
export default async function HomeSocial() {
  const s = await getFeed(6); const items = s.media.filter(m => (m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url));
  return <section className="sec wrap"><h2>NAPEYDA SOCIAL</h2>
    {items.length > 0 ? <div style={{ display: "grid", gap: 4, gridTemplateColumns: "repeat(3,1fr)", marginTop: 16 }}>{items.map(m => <a key={m.id} href={m.permalink} target="_blank" rel="noopener noreferrer" style={{ aspectRatio: "1", overflow: "hidden", display: "block" }}><img src={(m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url)!} alt={m.caption?.slice(0, 80) ?? "پست اینستاگرام"} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></a>)}</div>
      : <p className="lead">پست‌های اینستاگرام پس از اتصال رسمی API در این بخش نمایش داده می‌شود.</p>}
    <div className="cta" style={{ justifyContent: "flex-start" }}><a className="btn" href={instagramUrl} target="_blank" rel="noopener noreferrer">مشاهده پیج در اینستاگرام</a><Link className="btn" href="/instagram">صفحه NAPEYDA SOCIAL</Link></div></section>;
}
