# آپلود در GitHub و اتصال به Vercel
1. در GitHub یک مخزن **Private** بسازید.
2. محتوای این پوشه (نه خود پوشه) را در ریشه مخزن آپلود کنید: `package.json` باید در ریشه باشد. فایل‌های مخفی (`.gitignore`، `.env.example`، `.eslintrc.json`، `.nvmrc`) را هم آپلود کنید.
3. هشدار: آپلود از طریق وب‌سایت GitHub به `.gitignore` توجه نمی‌کند. **فایل ZIP محصول و فایل `.env.local` را هرگز آپلود نکنید.** (ZIP محصول عمداً داخل این آرشیو نیست.)
4. در Vercel: Add New → Project → مخزن را Import کنید → متغیرهای `.env.example` را وارد کنید → Deploy. جزئیات و هشدار پلن Hobby: `docs/DEPLOY-VERCEL.md`.
5. بعد از Deploy: ابتدا `npm run typecheck && npm run build` را روی سیستم خودتان اجرا کنید تا خطاهای احتمالی (اجرا نشده در محیط ساخت) پیش از انتشار پیدا شوند.
