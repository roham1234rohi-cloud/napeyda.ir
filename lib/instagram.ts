import crypto from "node:crypto";
import { unstable_cache } from "next/cache";
// Endpoints per Meta "Instagram API with Instagram Login" docs (checked 2026-11-02). Re-verify before launch.
export const IG_VERSION = process.env.META_API_VERSION || "v26.0";
const GRAPH = `https://graph.instagram.com/${IG_VERSION}`;
export type IgProfile = { username: string; name?: string; biography?: string; profile_picture_url?: string; media_count?: number; followers_count?: number; follows_count?: number };
export type IgMedia = { id: string; caption?: string; media_type: string; media_url?: string; thumbnail_url?: string; permalink: string; timestamp: string };
export type Kind = "live" | "cached" | "not_configured" | "disconnected" | "expired" | "rate_limited" | "error";
export type IgState = { kind: Kind; reason?: Kind; profile?: IgProfile; media: IgMedia[]; next?: string | null; syncedAt?: string | null };
type Tok = { token: string; expiresAt: number };
type Snap = { profile?: IgProfile; media: IgMedia[]; next?: string | null; syncedAt: string };
export class IgError extends Error { constructor(public kind: Kind) { super(kind); } }

export const configured = () => !!(process.env.META_APP_ID && process.env.META_APP_SECRET && process.env.META_REDIRECT_URI && process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
export const safeEq = (a: string, b: string) => { if (!a || !b) return false; const x = Buffer.from(a), y = Buffer.from(b); return x.length === y.length && crypto.timingSafeEqual(x, y); };
export const signState = (s: string) => `${s}.${crypto.createHmac("sha256", process.env.OAUTH_STATE_SECRET ?? "").update(s).digest("hex")}`;
export const verifyState = (cookie: string | undefined, state: string | null) => !!cookie && !!state && !!process.env.OAUTH_STATE_SECRET && safeEq(cookie, signState(state));

async function kv(cmd: (string | number)[]) {
  const r = await fetch(process.env.KV_REST_API_URL!, { method: "POST", headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` }, body: JSON.stringify(cmd) });
  if (!r.ok) throw new Error("kv_" + r.status);
  return (await r.json()).result as string | null;
}
export const kvGet = async <T,>(k: string): Promise<T | null> => { const v = await kv(["GET", k]); return v ? (JSON.parse(v) as T) : null; };
export const kvSet = (k: string, v: unknown) => kv(["SET", k, JSON.stringify(v)]);
export const kvDel = (k: string) => kv(["DEL", k]);
export const saveToken = (t: Tok) => kvSet("ig:token", t);

async function graph(path: string, params: Record<string, string>, token: string) {
  const u = new URL(`${GRAPH}/${path}`); for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v); u.searchParams.set("access_token", token);
  const r = await fetch(u); // token stays server-side; never logged
  if (r.ok) return r.json();
  let code = 0; try { code = (await r.json())?.error?.code ?? 0; } catch {}
  if (r.status === 429 || [4, 17, 32, 613].includes(code)) throw new IgError("rate_limited");
  if (code === 190 || r.status === 401) throw new IgError("expired");
  throw new IgError("error");
}
const okLink = (s: unknown) => typeof s === "string" && s.startsWith("https://www.instagram.com/");
const str = (v: unknown) => (typeof v === "string" ? v : undefined);
const cleanMedia = (m: unknown): IgMedia | null => {
  const r = (m ?? {}) as Record<string, unknown>; const permalink = str(r.permalink);
  return permalink && okLink(permalink) && r.id ? { id: String(r.id), caption: typeof r.caption === "string" ? r.caption.slice(0, 2200) : undefined, media_type: String(r.media_type ?? "IMAGE"), media_url: str(r.media_url), thumbnail_url: str(r.thumbnail_url), permalink, timestamp: String(r.timestamp ?? "") } : null;
};

async function load(limit: number, after?: string): Promise<IgState> {
  if (!configured()) return { kind: "not_configured", media: [] };
  let snap: Snap | null = null; try { snap = await kvGet<Snap>("ig:snapshot"); } catch {}
  const fb = (reason: Kind): IgState => snap && !after ? { kind: "cached", reason, profile: snap.profile, media: snap.media.slice(0, limit), next: snap.next, syncedAt: snap.syncedAt } : { kind: reason, media: [] };
  try {
    const tok = await kvGet<Tok>("ig:token");
    if (!tok) return fb("disconnected");
    if (tok.expiresAt < Date.now()) return fb("expired");
    const mp: Record<string, string> = { fields: "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp", limit: String(limit) }; if (after) mp.after = after;
    const [pr, md] = await Promise.all([after ? Promise.resolve(null) : graph("me", { fields: "username,name,biography,profile_picture_url,media_count,followers_count,follows_count" }, tok.token), graph("me/media", mp, tok.token)]);
    const media = ((md.data ?? []) as unknown[]).map(cleanMedia).filter(Boolean) as IgMedia[];
    const next: string | null = md.paging?.next ? md.paging?.cursors?.after ?? null : null;
    const syncedAt = new Date().toISOString();
    if (!after && pr) { const profile = pr as IgProfile; try { await kvSet("ig:snapshot", { profile, media, next, syncedAt } satisfies Snap); } catch {} return { kind: "live", profile, media, next, syncedAt }; }
    return { kind: "live", media, next, syncedAt };
  } catch (e) { return fb(e instanceof IgError ? e.kind : "error"); }
}
// Server-side cache: one API round-trip per 15 minutes, not per visit.
export const getFeed = (limit = 12, after?: string) => unstable_cache(() => load(limit, after), ["igfeed", String(limit), after ?? ""], { revalidate: 900 })();
