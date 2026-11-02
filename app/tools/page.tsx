import type { Metadata } from "next"; import Crumb from "@/components/Crumb"; import ToolGrid from "@/components/ToolGrid";
import tools from "@/content/tools.json"; import ls from "@/content/links-status.json";
export const metadata: Metadata = { title: "دایرکتوری ابزارهای هوش مصنوعی", description: "فهرست قابل جستجوی ۵۰ ابزار هوش مصنوعی با لینک رسمی، کاربرد و وضعیت رایگان یا پولی.", alternates: { canonical: "/tools" } };
export default function Page() {
  const status = Object.fromEntries(Object.entries((ls as { results: Record<string, { status: string }> }).results).map(([k, v]) => [k, v.status]));
  return <div className="wrap page"><Crumb here="ابزارها" /><h1>دایرکتوری ابزارهای هوش مصنوعی</h1>
    <p className="note" style={{ margin: "12px 0 20px" }}>پلن‌ها و محدودیت‌ها ممکن است تغییر کنند؛ پیش از خرید صفحه رسمی را ببینید. وضعیت لینک‌ها فقط پس از اجرای بررسی زنده «بررسی‌شده» نمایش داده می‌شود.</p>
    <ToolGrid tools={tools} status={status} /></div>;
}
