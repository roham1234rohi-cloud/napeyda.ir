import type { Metadata } from "next"; import Crumb from "@/components/Crumb"; import FaqList from "@/components/FaqList";
export const metadata: Metadata = { title: "سؤالات متداول", description: "پاسخ پرسش‌های رایج درباره محتویات، خرید، پرداخت، تحویل و مجوز NAPAYDA AI MEGA KIT.", alternates: { canonical: "/faq" } };
export default function Page() { return <div className="wrap page"><Crumb here="سؤالات متداول" /><h1>سؤالات متداول</h1><FaqList /></div>; }
