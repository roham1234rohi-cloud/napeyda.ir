import { NextResponse } from "next/server"; import { configured, saveToken, verifyState } from "@/lib/instagram"; import { SITE } from "@/lib/site";
const back = (q: string) => { const r = NextResponse.redirect(`${SITE.url}/instagram?${q}`); r.cookies.set("ig_state", "", { path: "/api/instagram", maxAge: 0 }); return r; };
export async function GET(req: Request) {
  if (!configured()) return back("error=config");
  const p = new URL(req.url).searchParams; const cookie = req.headers.get("cookie")?.match(/(?:^|; )ig_state=([^;]+)/)?.[1];
  if (!verifyState(cookie, p.get("state"))) return back("error=state");
  const code = p.get("code")?.replace(/#_$/, ""); if (p.get("error") || !code) return back("error=denied");
  try {
    const f = new FormData(); f.set("client_id", process.env.META_APP_ID!); f.set("client_secret", process.env.META_APP_SECRET!); f.set("grant_type", "authorization_code"); f.set("redirect_uri", process.env.META_REDIRECT_URI!); f.set("code", code);
    const r1 = await fetch("https://api.instagram.com/oauth/access_token", { method: "POST", body: f }); if (!r1.ok) return back("error=oauth");
    const j1 = await r1.json(); const short: string | undefined = j1.access_token ?? j1.data?.[0]?.access_token; if (!short) return back("error=oauth");
    const u = new URL("https://graph.instagram.com/access_token"); u.searchParams.set("grant_type", "ig_exchange_token"); u.searchParams.set("client_secret", process.env.META_APP_SECRET!); u.searchParams.set("access_token", short);
    const r2 = await fetch(u); if (!r2.ok) return back("error=oauth"); const j2 = await r2.json();
    if (!j2.access_token) return back("error=oauth");
    await saveToken({ token: j2.access_token, expiresAt: Date.now() + (Number(j2.expires_in) || 5184000) * 1000 });
    return back("connected=1");
  } catch { return back("error=oauth"); }
}
