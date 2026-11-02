import type { Metadata } from "next"; import Link from "next/link"; import { notFound } from "next/navigation";
import { TUTORIALS } from "@/content/tutorials"; import { POSTS } from "@/content/posts";
type P = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => TUTORIALS.map(t => ({ slug: t.slug }));
export async function generateMetadata({ params }: P): Promise<Metadata> { const { slug } = await params; const t = TUTORIALS.find(x => x.slug === slug); return t ? { title: t.title, description: t.intro, alternates: { canonical: `/tutorials/${t.slug}` } } : {}; }
export default async function Page({ params }: P) {
  const { slug } = await params; const t = TUTORIALS.find(x => x.slug === slug); if (!t) return notFound();
  return <div className="wrap page" style={{ maxWidth: 760 }}><nav className="crumb" aria-label="مسیر"><Link href="/">خانه</Link> / <Link href="/tutorials">آموزش‌ها</Link> / {t.title}</nav>
    <h1>{t.title}</h1><p className="lead">{t.intro}</p><p><span className="tag">{t.level}</span> <span className="tag">{t.min} دقیقه</span></p>
    <ol style={{ padding: "0 20px" }}>{t.steps.map(s => <li key={s.h} style={{ margin: "16px 0" }}><strong>{s.h}</strong><p style={{ color: "var(--muted)", margin: "4px 0" }}>{s.d}</p></li>)}</ol>
    <h2>ابزارهای مرتبط</h2><p className="lead">{t.tools.join("، ")} — <Link href="/tools" style={{ textDecoration: "underline" }}>دایرکتوری ابزارها</Link></p>
    <h2>مقالات مرتبط</h2><ul className="list">{t.posts.map(s => { const p = POSTS.find(x => x.slug === s); return p ? <li key={s}><Link href={`/blog/${s}`}>{p.title}</Link></li> : null; })}</ul></div>;
}
