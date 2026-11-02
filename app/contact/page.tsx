import type { Metadata } from "next"; import Crumb from "@/components/Crumb"; import { instagramUrl, telegramUrl } from "@/lib/site";
export const metadata: Metadata = { title: "تماس با ما", description: "راه‌های ارتباط با NAPEYDA از طریق تلگرام و اینستاگرام.", alternates: { canonical: "/contact" } };
export default function Page() {
  return <div className="wrap page"><Crumb here="تماس" /><h1>تماس با ما</h1><p className="lead">پشتیبانی شامل مشکلات دانلود، دسترسی به فایل و تحویل است.</p>
    <div className="grid" style={{ marginTop: 20 }}>
      <div className="card"><h3>تلگرام</h3>{telegramUrl ? <a className="btn primary" href={telegramUrl} target="_blank" rel="noopener noreferrer">ارسال پیام</a> : <p>آیدی تلگرام هنوز توسط مالک تنظیم نشده است.</p>}</div>
      <div className="card"><h3>اینستاگرام</h3><a className="btn" href={instagramUrl} target="_blank" rel="noopener noreferrer">@napeyda.ai</a></div></div></div>;
}
