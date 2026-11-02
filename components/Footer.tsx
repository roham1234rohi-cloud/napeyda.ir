import Link from "next/link";
import { Wordmark } from "./Logo";
import { BRAND } from "@/content/product";
import { instagramUrl, telegramUrl } from "@/lib/site";
const legal = [["/terms","قوانین استفاده"],["/privacy","حریم خصوصی"],["/purchase-policy","قوانین خرید"],["/delivery-policy","قوانین تحویل"],["/refund-policy","قوانین بازگشت وجه"]];
export default function Footer() {
  return (
    <footer className="ftr"><div className="wrap">
      <div className="cols">
        <div><Wordmark /><p>{BRAND.tagline}</p></div>
        <div><h4>صفحات</h4><ul><li><Link href="/product">محصول</Link></li><li><Link href="/purchase">خرید</Link></li><li><Link href="/blog">وبلاگ</Link></li><li><Link href="/tools">ابزارها</Link></li></ul></div>
        <div><h4>ارتباط</h4><ul><li><a href={instagramUrl} target="_blank" rel="noopener noreferrer">اینستاگرام</a></li>{telegramUrl ? <li><a href={telegramUrl} target="_blank" rel="noopener noreferrer">تلگرام</a></li> : <li><Link href="/contact">تماس با ما</Link></li>}</ul></div>
        <div><h4>قوانین</h4><ul>{legal.map(([h,l]) => <li key={h}><Link href={h}>{l}</Link></li>)}</ul></div>
      </div>
      <p>© {new Date().getFullYear()} NAPEYDA. همه حقوق محفوظ است.</p>
    </div></footer>
  );
}
