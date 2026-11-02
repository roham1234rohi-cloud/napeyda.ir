import type { Block } from "@/content/posts";
export const tocOf = (b: Block[]) => b.map((x, i) => ({ x, i })).filter(({ x }) => x.t === "h2").map(({ x, i }) => ({ id: "s" + i, text: x.v as string }));
export default function Article({ body }: { body: Block[] }) {
  return <>{body.map((b, i) => b.t === "h2" ? <h2 id={"s" + i} key={i} style={{ marginTop: 32 }}>{b.v}</h2> : b.t === "ul" ? <ul className="list" key={i}>{(b.v as string[]).map(l => <li key={l}>{l}</li>)}</ul> : <p key={i} style={{ color: "var(--muted)" }}>{b.v}</p>)}</>;
}
