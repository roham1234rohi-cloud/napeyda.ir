import { NextResponse } from "next/server"; import crypto from "node:crypto";
import { configured, safeEq, signState } from "@/lib/instagram";
export async function GET(req: Request) {
  const key = new URL(req.url).searchParams.get("key") ?? "";
  if (!configured() || !process.env.OAUTH_STATE_SECRET || !safeEq(key, process.env.INSTAGRAM_ADMIN_SECRET ?? "")) return new Response("Forbidden", { status: 403 });
  const state = crypto.randomBytes(16).toString("hex");
  const u = new URL("https://www.instagram.com/oauth/authorize");
  u.searchParams.set("client_id", process.env.META_APP_ID!); u.searchParams.set("redirect_uri", process.env.META_REDIRECT_URI!);
  u.searchParams.set("response_type", "code"); u.searchParams.set("scope", "instagram_business_basic"); u.searchParams.set("state", state);
  const res = NextResponse.redirect(u);
  res.cookies.set("ig_state", signState(state), { httpOnly: true, secure: true, sameSite: "lax", path: "/api/instagram", maxAge: 600 });
  return res;
}
