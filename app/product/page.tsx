import type { Metadata } from "next"; import Link from "next/link"; import Crumb from "@/components/Crumb"; import { LogoMark } from "@/components/Logo";
import { PRODUCT } from "@/content/product"; import { toman, num } from "@/lib/format"; import { FAQS } from "@/content/faq"; import JsonLd from "@/components/JsonLd"; import { SITE } from "@/lib/site";
export const metadata: Metadata = { title: "NAPAYDA AI MEGA KIT", description: "معرفی کامل محتویات، مجوز و قیمت NAPAYDA AI MEGA KIT؛ بسته فارسی پرامپت، ابزار و قالب‌های هوش مصنوعی.", alternates: { canonical: "/product" } };
export default function Page() {
  const c = PRODUCT.counts;
  return <div className="wrap page"><JsonLd data={{ "@context": "https://schema.org", "@type": "Product", name: PRODUCT.name, description: "بسته فارسی پرامپت، دایرکتوری ابزار و قالب‌های هوش مصنوعی", brand: { "@type": "Brand", name: "NAPEYDA" }, offers: { "@type": "Offer", url: SITE.url + "/purchase", price: String(PRODUCT.priceLaunchToman * 10), priceCurrency: "IRR", availability: "https://schema.org/InStock" } }} />
    <Crumb here="محصول" />
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}><LogoMark size={64} /><div><h1 dir="ltr" style={{ textAlign: "start" }}>{PRODUCT.name}</h1><span className="tag">نسخه {PRODUCT.version} · حدود ۱ مگابایت · {num(PRODUCT.zipFileCount)} فایل</span></div></div>
    <p className="lead" style={{ marginTop: 16 }}>بسته‌ای دیجیتال شامل منابع فارسی برای یادگیری، تولید محتوا و استفاده عملی از ابزارهای هوش مصنوعی. فایل‌ها در قالب‌های Word، PDF، Excel و TXT هستند.</p>
    <section className="sec"><h2>مخاطبان</h2><p className="lead">علاقه‌مندان به یادگیری هوش مصنوعی و کسانی که برای تولید محتوا، به‌ویژه محتوای اینستاگرام، دنبال منابع آماده فارسی هستند.</p></section>
    <section><h2>محتویات کامل</h2><div className="grid">{PRODUCT.folders.map(([n, d]) => <div className="card" key={n}><span className="tag" dir="ltr">{n}</span><p style={{ marginTop: 8 }}>{d}</p></div>)}</div></section>
    <section className="sec"><h2>کاربردهای عملی</h2><ul className="list"><li>نوشتن پرامپت بهتر با {num(c.prompts)} نمونه و قالب استاندارد</li><li>انتخاب ابزار با دایرکتوری {num(c.aiTools)} ابزار (وضعیت رایگان/پولی ممکن است تغییر کند)</li><li>برنامه‌ریزی محتوا با تقویم ۳۰ روزه و قالب‌های Excel</li><li>تولید ایده و کپشن اینستاگرام</li></ul>
      <p className="note">گالری تصاویر: {num(c.imageReferenceFiles)} پرونده مرجع متنی است، نه فایل تصویر. لینک ابزارها هنوز به‌صورت زنده بررسی نشده‌اند.</p></section>
    <section><h2>مجوز استفاده</h2><p className="lead">استفاده از محتویات مجاز بسته در پروژه‌های شخصی و تجاری مجاز است. فروش مجدد، انتشار مجدد یا اشتراک‌گذاری کل بسته به‌جای محصول اصلی ممنوع است.</p></section>
    <section className="sec"><h2>قیمت</h2><div className="card"><div className="price"><s>{toman(PRODUCT.priceReferenceToman)}</s><b>{toman(PRODUCT.priceLaunchToman)}</b></div><div className="cta" style={{ justifyContent: "flex-start" }}><Link className="btn primary" href="/purchase">خرید محصول</Link></div></div></section>
    <section><h2>پرسش‌های متداول</h2>{FAQS.slice(0, 4).map(f => <details className="acc" key={f.q}><summary>{f.q}</summary><div><p>{f.a}</p></div></details>)}<Link className="btn" href="/faq">همه سؤالات</Link></section></div>;
}
