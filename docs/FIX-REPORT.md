# گزارش اصلاحات (۲۰۲۶-۱۱-۰۲)

## خطاهای پیداشده و اصلاح‌شده
| # | فایل | علت | اصلاح |
|---|---|---|---|
| 1 | `app/layout.tsx`، `app/globals.css` | لینک «پرش به محتوا» در Server Component هندلر `onFocus` و `onBlur` داشت. این همان خطای `Event handlers cannot be passed to Client Component props` است و چون layout روی همهٔ صفحات اعمال می‌شود، پیش‌رندر `/_not-found` و بقیهٔ صفحات را می‌شکست. | هندلرها حذف و رفتار آن با کلاس `.skip-link` و `:focus` در CSS جایگزین شد. ظاهر و رفتار برای کاربر یکی است. |
| 2 | `package.json` | `next@15.0.3` دارای آسیب‌پذیری‌های امنیتی بحرانی شناخته‌شده است (از جمله CVE-2025-66478). Vercel ممکن است استقرار نسخه‌های آسیب‌پذیر را رد کند. | `next` و `eslint-config-next` به `15.5.28` ارتقا یافتند (نسخهٔ اصلاح‌شدهٔ خط 15.5 طبق اطلاعیهٔ امنیتی اکتبر ۲۰۲۶). |
| 3 | `package.json` | نسخهٔ `@fontsource-variable/vazirmatn@5.0.9` از طریق جستجو قابل تأیید نبود و می‌تواند علت `ETARGET` باشد. | به `5.2.8` تغییر کرد که وجودش تأیید شد. همان فونت Vazirmatn است. |
| 4 | `package.json` | `engines.node` برابر `>=20` بود و Vercel را به جدیدترین Node می‌برد. | روی `20.x \|\| 22.x` محدود شد. |
| 5 | `lib/instagram.ts` | استفاده از `any` در `cleanMedia`. | با `unknown` و بررسی نوع جایگزین شد. |
| 6 | `next.config.mjs` | CSP در حالت توسعه `unsafe-eval` را مسدود می‌کرد و `next dev` را می‌شکست. | فقط در حالت غیر production اضافه می‌شود. CSP پروداکشن بدون تغییر است. |
| 7 | `.gitignore`، `public/.gitkeep` | پوشهٔ `public` خالی بود و در Git ثبت نمی‌شد. | `.gitkeep` اضافه شد و `.vercel` در `.gitignore` رفت. |

## آنچه اجرا نشد
محیط این بررسی اینترنت نداشت. `npm install` با خطای `ENOTFOUND registry.npmjs.org` متوقف شد، بنابراین **`npx tsc --noEmit`، `npm run lint` و `npm run build` اجرا نشدند** و `package-lock.json` ساخته نشد. فقط بررسی سینتکس بدون وابستگی و `node --check next.config.mjs` انجام شد که خطایی نداشتند.

## اجرای محلی پیش از انتشار
```bash
npm install            # package-lock.json ساخته می‌شود؛ آن را commit کنید
npm run typecheck
npm run lint
npm run build
```
