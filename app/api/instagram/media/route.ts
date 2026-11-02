import { getFeed } from "@/lib/instagram";
const hits = new Map<string, { n: number; t: number }>(); // best-effort per-instance limiter (see limitations)
export async function GET(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "x"; const now = Date.now(); const h = hits.get(ip);
  if (!h || now - h.t > 60000) hits.set(ip, { n: 1, t: now }); else if (++h.n > 30) return Response.json({ kind: "rate_limited", media: [] }, { status: 429 });
  if (hits.size > 5000) hits.clear();
  const after = new URL(req.url).searchParams.get("after") ?? undefined;
  if (after && !/^[A-Za-z0-9_=\-]{1,300}$/.test(after)) return Response.json({ kind: "error", media: [] }, { status: 400 });
  const s = await getFeed(12, after);
  return Response.json({ kind: s.kind, media: s.media, next: s.next ?? null }, { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300" } });
}
