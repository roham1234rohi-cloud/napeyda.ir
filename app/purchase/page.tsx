import type { Metadata } from "next"; import Crumb from "@/components/Crumb"; import OrderForm from "@/components/OrderForm";
import { PRODUCT } from "@/content/product"; import { toman } from "@/lib/format"; import { SITE } from "@/lib/site";
export const metadata: Metadata = { title: "خرید محصول", description: "ثبت سفارش NAPAYDA AI MEGA KIT با پرداخت کارت‌به‌کارت و تأیید دستی از طریق تلگرام.", alternates: { canonical: "/purchase" } };
export default function Page() {
  return <div className="wrap page"><Crumb here="خرید" /><h1>خرید {PRODUCT.name}</h1>
    <div className="card" style={{ margin: "16px 0 24px" }}><div className="price"><s>{toman(PRODUCT.priceReferenceToman)}</s><b>{toman(PRODUCT.priceLaunchToman)}</b></div>
      <ol className="list"><li>فرم را پر کنید و پیام سفارش را در تلگرام ارسال کنید.</li><li>مالک سایت اطلاعات پرداخت کارت‌به‌کارت را در تلگرام می‌دهد و رسید را دستی بررسی می‌کند.</li><li>پس از تأیید واقعی پرداخت، محصول دستی ارسال می‌شود.</li></ol></div>
    <div className="note" style={{ marginBottom: 24 }}>این سایت پرداخت را خودکار تأیید نمی‌کند و اطلاعات فرم را ذخیره نمی‌کند؛ فقط پیام آماده می‌سازد.</div>
    <OrderForm telegram={SITE.telegram} /></div>;
}
