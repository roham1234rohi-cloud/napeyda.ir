# راهنمای انتشار روی Vercel

## ⚠️ هشدار مهم: پلن رایگان و فروش
طبق مستندات رسمی Vercel، پلن **Hobby فقط برای استفاده شخصی و غیرتجاری** است. این سایت محصول می‌فروشد؛ پیش از فروش واقعی، شرایط Vercel را بررسی کنید و در صورت لزوم پلن Pro یا میزبان دیگری انتخاب کنید. برای تست و پیش‌نمایش، Hobby مشکلی ندارد. محدودیت‌ها را از https://vercel.com/docs/limits بخوانید؛ آن‌ها تغییر می‌کنند.

## مراحل
1. پروژه را در یک مخزن **خصوصی** Git بارگذاری کنید (`private/*.zip` و `.env*` به‌طور پیش‌فرض نادیده گرفته می‌شوند).
2. در Vercel: Add New → Project → مخزن را انتخاب کنید. Framework: Next.js (تشخیص خودکار).
3. در Settings → Environment Variables همه متغیرهای `.env.example` را وارد کنید. `NEXT_PUBLIC_SITE_URL` باید آدرس نهایی (مثلاً `https://name.vercel.app`) باشد.
4. برای ذخیره توکن اینستاگرام یک KV با REST API بسازید (مثلاً Upstash Redis از Marketplace) و `KV_REST_API_URL` و `KV_REST_API_TOKEN` را وارد کنید.
5. `CRON_SECRET` را یک رشته تصادفی بلند بگذارید؛ Vercel آن را در cron به‌صورت `Authorization: Bearer` می‌فرستد.
6. Deploy. بعد از آن `https://دامنه/sitemap.xml` و `/robots.txt` را بررسی کنید.
7. Cron در `vercel.json` روزی یک‌بار اجرا می‌شود (حداکثر فرکانس Hobby) و توکن اینستاگرام را تمدید می‌کند.

## اتصال دامنه در آینده
Settings → Domains → Add. رکوردهای DNS را طبق راهنمای Vercel تنظیم کنید. سپس `NEXT_PUBLIC_SITE_URL` و `META_REDIRECT_URI` را با دامنه جدید بروز کنید، Redirect URI را در داشبورد Meta هم عوض کنید و دوباره Deploy کنید.

## تحویل محصول
فایل ZIP را **روی Vercel قرار ندهید**. بعد از تأیید دستی پرداخت، آن را از کامپیوتر خودتان یا یک فضای خصوصی در تلگرام بفرستید.
