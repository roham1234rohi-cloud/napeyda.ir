import type { Metadata } from "next"; import Link from "next/link"; import { notFound } from "next/navigation";
import Crumb from "@/components/Crumb"; import Article, { tocOf } from "@/components/Article"; import { POSTS, readMin } from "@/content/posts"; import JsonLd from "@/components/JsonLd"; import { SITE } from "@/lib/site";
type P = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => POSTS.map(p => ({ slug: p.slug }));
export async function generateMetadata({ params }: P): Promise<Metadata> { const { slug } = await params; const p = POSTS.find(x => x.slug === slug); return p ? { title: p.title, description: p.desc, alternates: { canonical: `/blog/${p.slug}` }, openGraph: { type: "article", publishedTime: p.date } } : {}; }
export default async function Page({ params }: P) {
  const { slug } = await params; const p = POSTS.find(x => x.slug === slug); if (!p) return notFound();
  const toc = tocOf(p.body); const rel = POSTS.filter(x => x.slug !== p.slug && (x.cat === p.cat || x.tags.some(t => p.tags.includes(t)))).slice(0, 2);
  return <article className="wrap page" style={{ maxWidth: 760 }}>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [{ "@type": "Article", headline: p.title, description: p.desc, datePublished: p.date, inLanguage: "fa", author: { "@type": "Organization", name: "NAPEYDA" }, mainEntityOfPage: `${SITE.url}/blog/${p.slug}` }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "خانه", item: SITE.url }, { "@type": "ListItem", position: 2, name: "وبلاگ", item: SITE.url + "/blog" }, { "@type": "ListItem", position: 3, name: p.title }] }] }} />
    <nav className="crumb" aria-label="مسیر"><Link href="/">خانه</Link> / <Link href="/blog">وبلاگ</Link> / {p.title}</nav>
    <span className="tag">{p.cat}</span><h1 style={{ marginTop: 8 }}>{p.title}</h1><p className="lead">{readMin(p)} دقیقه مطالعه · {new Date(p.date).toLocaleDateString("fa-IR")}</p>
    {toc.length > 1 && <nav className="card" aria-label="فهرست مطالب" style={{ margin: "20px 0" }}><h3>فهرست مطالب</h3><ul className="list">{toc.map(t => <li key={t.id}><a href={"#" + t.id}>{t.text}</a></li>)}</ul></nav>}
    <Article body={p.body} />
    {rel.length > 0 && <section className="sec"><h2>مقالات مرتبط</h2><div className="grid">{rel.map(r => <Link key={r.slug} className="card" href={`/blog/${r.slug}`}><h3>{r.title}</h3><p>{r.desc}</p></Link>)}</div></section>}</article>;
}
