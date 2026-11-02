import Crumb from "./Crumb"; import { LEGAL, LEGAL_UPDATED } from "@/content/legal";
export default function LegalPage({ slug }: { slug: string }) {
  const l = LEGAL[slug];
  return <div className="wrap page" style={{ maxWidth: 780 }}><Crumb here={l.title} /><h1>{l.title}</h1>
    <p className="lead">آخرین بروزرسانی: {new Date(LEGAL_UPDATED).toLocaleDateString("fa-IR")}</p>
    {l.sections.map(s => <section key={s.h} style={{ marginTop: 24 }}><h2 style={{ fontSize: "1.2rem" }}>{s.h}</h2>{s.p.map(t => <p key={t} style={{ color: "var(--muted)" }}>{t}</p>)}</section>)}</div>;
}
