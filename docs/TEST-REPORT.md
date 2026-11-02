# گزارش تست (تاریخ: 2026-11-02)
محیط ساخت: بدون اینترنت و بدون `node_modules`.

## اجرا شد و گذشت
| بررسی | نتیجه |
|---|---|
| تأیید ZIP محصول (`verify-product.mjs`) | ۵۱ فایل، ۱٬۰۱۰٬۷۳۵ بایت، ۰ فایل تصویری (مطابق ادعاهای سایت) |
| شمارش محتوای اینستاگرام | ۳۰ ایده، ۳۰ کپشن، ۲۰ هوک، ۳ قالب |
| `node --check` روی `next.config.mjs` و اسکریپت‌ها | OK |
| اعتبار JSON (package، tsconfig، vercel، tools، links-status) | OK |
| هر متغیر `process.env` در کد در `.env.example` هست | OK (۱۲ متغیر) |
| جستجوی secret در سورس | چیزی پیدا نشد |
| کامپوننت‌های `use client` از `process.env` استفاده نمی‌کنند | OK |
| ZIP محصول در `public/` نیست، `private/*` در gitignore است | OK |
| بررسی مسیرها: همه hrefهای داخلی به ۱۷ مسیر واقعی می‌رسند | OK (بررسی استاتیک) |
| عبارت‌های ممنوعه و rating در محتوا | یافت نشد |
| تعادل پرانتز و آکولاد در همه فایل‌های TS | OK |

## باگ پیداشده و رفع‌شده
`await` داخل callback غیر async در صفحات مقاله و آموزش (TS1308) پیدا و اصلاح شد.

## `tsc` بدون وابستگی‌ها
نسخه 6.0.3 اجرا شد. خطاهای باقی‌مانده همه از نبود `react`، `next` و `@types/node` ناشی‌اند (TS7026، TS2307، TS2591، TS7006 و مانند آن). این **تأیید type-check نیست**؛ فقط نشان می‌دهد خطای سینتکسی باقی نمانده.

## اجرا نشد (نیازمند اینترنت یا مرورگر)
`npm install`، `npm run typecheck`، `npm run lint`، `npm run build`، `npm run check:links`، تست OAuth/API اینستاگرام، تست مرورگر (RTL، فونت، موبایل، Horizontal Overflow، Console)، اعتبارسنجی Structured Data، Lighthouse/Core Web Vitals، تست تحویل ZIP.

## دستورهای تست محلی
```bash
npm install && npm run typecheck && npm run lint && npm run build && npm run start
npm run check:links
```
سپس مسیرهای ۱۷‌گانه را در Chrome (دسکتاپ و موبایل) باز کنید، Console را بررسی کنید و `/sitemap.xml`، `/robots.txt` را ببینید. Structured Data را با https://validator.schema.org و Rich Results Test بسنجید. هیچ تستی بدون اجرای واقعی «موفق» اعلام نشده است.
