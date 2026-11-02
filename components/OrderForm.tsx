"use client";
import { useState } from "react";
import { PRODUCT } from "@/content/product";
import { toman } from "@/lib/format";
type Errs = Partial<Record<"name" | "tg", string>>;
export default function OrderForm({ telegram }: { telegram: string }) {
  const [v, setV] = useState({ name: "", tg: "", contact: "" });
  const [errs, setErrs] = useState<Errs>({}); const [msg, setMsg] = useState(""); const [copied, setCopied] = useState(false);
  const clean = (s: string) => s.replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, 100);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const name = clean(v.name), tg = clean(v.tg).replace(/^@/, ""), contact = clean(v.contact); const er: Errs = {};
    if (name.length < 2) er.name = "نام را وارد کنید (حداقل ۲ حرف).";
    if (!/^[A-Za-z0-9_]{5,32}$/.test(tg)) er.tg = "آیدی تلگرام باید ۵ تا ۳۲ حرف انگلیسی، عدد یا _ باشد.";
    setErrs(er); if (Object.keys(er).length) return;
    setMsg(`سفارش ${PRODUCT.name}\nنام: ${name}\nآیدی تلگرام: @${tg}${contact ? `\nتماس: ${contact}` : ""}\nمبلغ: ${toman(PRODUCT.priceLaunchToman)}\nرسید پرداخت را در ادامه همین گفتگو ارسال می‌کنم.`);
  }
  const link = telegram && msg ? `https://t.me/${telegram}?text=${encodeURIComponent(msg)}` : "";
  async function copy() { try { await navigator.clipboard.writeText(msg); setCopied(true); } catch { setCopied(false); } }
  return (<div>
    <form onSubmit={submit} noValidate>
      <div className="field"><label htmlFor="n">نام خریدار *</label><input id="n" autoComplete="name" value={v.name} onChange={e => setV({ ...v, name: e.target.value })} aria-invalid={!!errs.name} aria-describedby="n-e" /><span id="n-e" className="err" role="alert">{errs.name}</span></div>
      <div className="field"><label htmlFor="t">آیدی تلگرام *</label><input id="t" dir="ltr" placeholder="username" value={v.tg} onChange={e => setV({ ...v, tg: e.target.value })} aria-invalid={!!errs.tg} aria-describedby="t-e" /><span id="t-e" className="err" role="alert">{errs.tg}</span></div>
      <div className="field"><label htmlFor="c">اطلاعات تماس (اختیاری)</label><input id="c" value={v.contact} onChange={e => setV({ ...v, contact: e.target.value })} /></div>
      <button className="btn primary" type="submit">آماده‌سازی پیام سفارش</button>
    </form>
    {msg && <div style={{ marginTop: 24 }} className="card" role="status">
      <h3>پیام سفارش آماده است</h3><pre style={{ whiteSpace: "pre-wrap", font: "inherit", color: "var(--muted)" }}>{msg}</pre>
      {link ? <a className="btn primary" href={link} target="_blank" rel="noopener noreferrer">ارسال در تلگرام</a>
        : <p className="err">آیدی تلگرام فروشگاه هنوز تنظیم نشده است، بنابراین امکان باز کردن تلگرام نیست. پیام را کپی کنید و از راه دیگری ارسال کنید.</p>}
      <button className="btn" style={{ marginInlineStart: 8 }} onClick={copy}>{copied ? "کپی شد" : "کپی پیام"}</button>
      <p className="lead">توجه: سفارش تا زمانی که پیام را در تلگرام ارسال نکنید و مالک پرداخت را تأیید نکند، ثبت‌شده یا پرداخت‌شده محسوب نمی‌شود.</p></div>}
  </div>);
}
