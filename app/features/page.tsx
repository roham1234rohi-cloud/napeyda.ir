import type { Metadata } from "next"; import Link from "next/link"; import Crumb from "@/components/Crumb"; import { PRODUCT } from "@/content/product";
export const metadata: Metadata = { title: "ویژگی‌ها", description: "ویژگی‌ها و پوشه‌های NAPAYDA AI MEGA KIT مطابق فایل واقعی محصول.", alternates: { canonical: "/features" } };
export default function Page() {
  return <div className="wrap page"><Crumb here="ویژگی‌ها" /><h1>ویژگی‌ها</h1><p className="lead">هر پوشه مطابق ساختار واقعی فایل ZIP معرفی شده است.</p>
    <div className="grid" style={{ marginTop: 20 }}>{PRODUCT.folders.map(([n, d]) => <div className="card" key={n}><span className="tag" dir="ltr">{n}</span><p style={{ marginTop: 8 }}>{d}</p></div>)}</div>
    <div className="cta" style={{ justifyContent: "flex-start" }}><Link className="btn primary" href="/purchase">خرید محصول</Link></div></div>;
}
