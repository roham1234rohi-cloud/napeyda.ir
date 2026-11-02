# NAPEYDA — وب‌سایت رسمی

«چیزی فراتر از آنچه می‌بینی». فروشگاه محصول دیجیتال **NAPAYDA AI MEGA KIT** (نام برند: NAPEYDA، نام محصول: NAPAYDA؛ این دو املا عمداً متفاوت نگه داشته شده‌اند).

## پیش‌نیاز
Node.js 20 یا بالاتر و npm.

## اجرا
```bash
npm install
cp .env.example .env.local   # مقادیر را پر کنید (راهنما: docs/)
npm run dev                   # http://localhost:3000
```

## دستورهای کنترل کیفیت (باید روی سیستم خودتان اجرا شوند)
```bash
npm run typecheck     # tsc --noEmit
npm run lint          # next lint
npm run build         # production build
npm run start         # اجرای نسخه build شده
npm run check:zip     # تأیید ZIP محصول (نیازمند unzip)
npm run check:links   # بررسی زنده ۵۰ لینک ابزار (نیازمند اینترنت) و بروزرسانی content/links-status.json
```

## ساختار
- `app/` صفحات و مسیرهای API ‏(`/api/instagram/*`)
- `components/` کامپوننت‌ها ‏· `lib/` منطق (اینستاگرام، تنظیمات) ‏· `content/` محتوای ساختاریافته (محصول، مقالات، آموزش‌ها، FAQ، قوانین، ابزارها)
- `private/` محل فایل ZIP محصول (خارج از `public/`، در gitignore)
- `docs/` راهنماها و گزارش‌ها

## نکات مهم
1. **فایل ZIP محصول** را در `private/NAPAYDA_AI_MEGA_KIT_v1.zip` بگذارید. هرگز در `public/` یا Git قرار نگیرد.
2. **تلگرام**: `NEXT_PUBLIC_TELEGRAM_USERNAME` را خودتان تنظیم کنید. تا آن زمان دکمه ارسال سفارش غیرفعال است و سایت صریحاً می‌گوید تنظیم نشده.
3. **ادعاهای محصول** از `content/product.ts` می‌آیند و با ZIP واقعی تطبیق داده شده‌اند (گالری = ۱۰ مرجع متنی، نه تصویر؛ ۱۲ راهنمای ویدیو؛ حجم حدود ۱ مگابایت).
4. **پنل مدیریت وجود ندارد.** محتوا با ویرایش فایل‌های `content/` تغییر می‌کند (راهنما: `docs/UPDATE-CONTENT.md`).
5. پیش از انتشار `docs/LIMITATIONS.md` را بخوانید، به‌ویژه بخش مجوز تجاری Vercel.
