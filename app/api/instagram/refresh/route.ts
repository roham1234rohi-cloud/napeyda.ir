import { safeEq, kvGet, saveToken } from "@/lib/instagram";
export async function GET(req: Request) {
  const auth = req.headers.get("authorization")?.replace(/^Bearer /, "") ?? "";
  if (!safeEq(auth, process.env.CRON_SECRET ?? "")) return new Response("Forbidden", { status: 403 });
  try {
    const t = await kvGet<{ token: string; expiresAt: number }>("ig:token"); if (!t) return Response.json({ ok: false, reason: "disconnected" });
    const u = new URL("https://graph.instagram.com/refresh_access_token"); u.searchParams.set("grant_type", "ig_refresh_token"); u.searchParams.set("access_token", t.token);
    const r = await fetch(u); if (!r.ok) return Response.json({ ok: false, reason: "refresh_failed" }, { status: 502 });
    const j = await r.json(); await saveToken({ token: j.access_token ?? t.token, expiresAt: Date.now() + (Number(j.expires_in) || 5184000) * 1000 });
    return Response.json({ ok: true });
  } catch { return Response.json({ ok: false, reason: "error" }, { status: 502 }); }
}
