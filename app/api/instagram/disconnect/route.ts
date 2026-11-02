import { safeEq, kvDel } from "@/lib/instagram";
export async function POST(req: Request) {
  const auth = req.headers.get("authorization")?.replace(/^Bearer /, "") ?? "";
  if (!safeEq(auth, process.env.INSTAGRAM_ADMIN_SECRET ?? "")) return new Response("Forbidden", { status: 403 });
  try { await kvDel("ig:token"); await kvDel("ig:snapshot"); return Response.json({ ok: true }); } catch { return Response.json({ ok: false }, { status: 502 }); }
}
