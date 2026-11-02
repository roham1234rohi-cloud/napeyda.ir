import type { Metadata } from "next"; import Crumb from "@/components/Crumb"; import SocialGrid from "@/components/SocialGrid";
import { getFeed } from "@/lib/instagram"; import { instagramUrl, SITE } from "@/lib/site"; import { num } from "@/lib/format";
export const metadata: Metadata = { title: "NAPEYDA SOCIAL", description: "پست‌های رسمی پیج اینستاگرام NAPEYDA در یک رابط اختصاصی.", alternates: { canonical: "/instagram" } };
export const revalidate = 900;
const MSG: Record<string, string> = { not_configured: "اتصال رسمی اینستاگرام هنوز تنظیم نشده است.", disconnected: "حساب اینستاگرام فعلاً متصل نیست.", expired: "اتصال اینستاگرام منقضی شده است.", rate_limited: "محدودیت درخواست API فعال است؛ بعداً دوباره تلاش کنید.", error: "دریافت اطلاعات از اینستاگرام ممکن نشد." };
export default async function Page({ searchParams }: { searchParams: Promise<{ connected?: string; error?: string }> }) {
  const sp = await searchParams; const s = await getFeed(12); const p = s.profile;
  const notice = s.kind === "live" ? null : s.kind === "cached" ? `${MSG[s.reason ?? "error"]} آخرین نسخه ذخیره‌شده نمایش داده می‌شود.` : MSG[s.kind];
  return <div className="wrap page"><Crumb here="NAPEYDA SOCIAL" />
    {sp.connected && <p className="note" role="status">اتصال انجام شد. نمایش پست‌ها ممکن است تا ۱۵ دقیقه طول بکشد.</p>}
    {sp.error && <p className="err" role="alert">اتصال ناموفق بود. مراحل راهنمای Meta را بررسی کنید.</p>}
    <header style={{ display: "flex", gap: 20, alignItems: "center", margin: "16px 0 24px", flexWrap: "wrap" }}>
      {p?.profile_picture_url && <img src={p.profile_picture_url} alt="" width={88} height={88} style={{ borderRadius: "50%" }} />}
      <div><h1 dir="ltr" style={{ margin: 0, textAlign: "start" }}>@{p?.username ?? SITE.instagram}</h1>
        {p?.biography && <p className="lead">{p.biography}</p>}
        <p className="lead">{[p?.media_count != null && `${num(p.media_count)} پست`, p?.followers_count != null && `${num(p.followers_count)} دنبال‌کننده`, p?.follows_count != null && `${num(p.follows_count)} دنبال‌شونده`].filter(Boolean).join(" · ")}</p>
        <a className="btn primary" href={instagramUrl} target="_blank" rel="noopener noreferrer">Follow on Instagram</a></div></header>
    {notice && <p className="note" role="status" style={{ marginBottom: 16 }}>{notice} <a href={instagramUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>مشاهده مستقیم پیج</a></p>}
    {s.syncedAt && <p className="lead" style={{ fontSize: ".85rem" }}>آخرین همگام‌سازی موفق: {new Date(s.syncedAt).toLocaleString("fa-IR")}</p>}
    {s.media.length > 0 && <SocialGrid initial={s.media} next={s.next ?? null} />}</div>;
}
