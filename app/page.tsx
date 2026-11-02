import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { PRODUCT, BRAND } from "@/content/product";
import { toman, num } from "@/lib/format";
import HomeSocial from "@/components/HomeSocial";
import { POSTS } from "@/content/posts";
const c = PRODUCT.counts;
const features = [
  [`${num(c.prompts)} پرامپت حرفه‌ای فارسی`, `در ${num(c.promptCategories)} دسته ${num(c.promptsPerCategory)}تایی`],
  [`دایرکتوری ${num(c.aiTools)} ابزار`, "همراه با لینک رسمی، کاربرد و وضعیت رایگان/پولی"],
  ["آموزش مهندسی پرامپت", "راهنمای جامع و قالب استاندارد پرامپت"],
  [`${num(c.imageReferenceFiles)} مرجع تولید تصویر`, "پرونده‌های متنی با پرامپت و روش ساخت؛ فایل تصویر ندارد"],
  [`راهنمای ${num(c.videoToolGuides)} ابزار ویدیو`, "معرفی و مقایسه ابزارهای تولید ویدیو"],
  ["منابع محتوای اینستاگرام", `${num(c.instagramIdeas)} ایده، ${num(c.instagramCaptions)} کپشن، ${num(c.instagramHooks)} هوک`],
  [`${num(c.practicalTemplates)} قالب کاربردی`, "فایل‌های Excel و Word برای مدیریت پروژه و محتوا"],
  ["مسیر یادگیری و چک‌لیست‌ها", "راهنمای شروع و چک‌لیست‌های انتشار"]
];
export default function Home() {
  return (<>
    <section className="hero wrap">
      <div className="logo3d"><div><LogoMark size={96} /></div></div>
      <p className="eyebrow">{BRAND.tagline}</p>
      <h1>هوش مصنوعی را متفاوت تجربه کن</h1>
      <p className="lead" style={{margin:"0 auto"}}>مجموعه‌ای کاربردی و فارسی برای یادگیری، تولید محتوا و استفاده حرفه‌ای‌تر از ابزارهای هوش مصنوعی.</p>
      <div className="cta"><Link className="btn primary" href="/product">مشاهده محصول</Link><Link className="btn" href="/features">مشاهده نمونه‌ها</Link></div>
    </section>
    <section className="sec wrap"><p className="eyebrow">{PRODUCT.name}</p><h2>داخل بسته چه چیزی هست؟</h2>
      <p className="lead">فهرست زیر مطابق فایل واقعی محصول است.</p>
      <div className="grid" style={{marginTop:24}}>{features.map(([t,d]) => <div className="card" key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
    </section>
    <section className="sec wrap"><h2>قیمت</h2>
      <div className="card"><h3>{PRODUCT.name}</h3>
        <div className="price"><s>{toman(PRODUCT.priceReferenceToman)}</s><b>{toman(PRODUCT.priceLaunchToman)}</b></div>
        <p>پرداخت کارت‌به‌کارت و تأیید دستی؛ تحویل از طریق تلگرام پس از تأیید واقعی پرداخت.</p>
        <div className="cta" style={{justifyContent:"flex-start"}}><Link className="btn primary" href="/purchase">خرید محصول</Link></div></div>
    </section>
    <section className="sec wrap"><h2>آخرین مقالات</h2><div className="grid" style={{marginTop:16}}>{POSTS.slice(0,3).map(p => <Link key={p.slug} href={`/blog/${p.slug}`} className="card"><h3>{p.title}</h3><p>{p.desc}</p></Link>)}</div></section>
    <HomeSocial />
  </>);
}
