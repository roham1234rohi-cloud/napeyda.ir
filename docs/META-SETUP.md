# راهنمای تنظیم Meta Developer (Instagram API with Instagram Login)

مستندات رسمی: https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login
نام‌ها و منوهای داشبورد ممکن است تغییر کنند؛ همیشه با مستندات روز Meta تطبیق دهید.

## پیش‌نیاز
حساب `@napeyda.ai` باید حساب حرفه‌ای (Creator) باشد.

## مراحل
1. در developers.facebook.com یک App بسازید و محصول **Instagram** را اضافه کنید: *API setup with Instagram login*.
2. در بخش **Business login settings** آدرس بازگشت را ثبت کنید: `https://دامنه-شما/api/instagram/callback` (دقیقاً برابر `META_REDIRECT_URI`).
3. مقدار **Instagram App ID** و **Instagram App Secret** را از همین بخش بردارید (با App ID اصلی Meta فرق دارد) و در `META_APP_ID` و `META_APP_SECRET` بگذارید.
4. مجوز لازم: `instagram_business_basic`. فقط همین درخواست می‌شود.
5. تا زمانی که اپ در حالت Development است، حساب `@napeyda.ai` باید نقش (مثلاً Instagram Tester) داشته و دعوت را پذیرفته باشد. نیاز به App Review یا Live بودن اپ را در داشبورد خودتان بررسی کنید؛ من آن را تست نکرده‌ام.
6. `OAUTH_STATE_SECRET` و `INSTAGRAM_ADMIN_SECRET` را رشته‌های تصادفی ۳۲+ کاراکتری بگذارید.
7. سایت را Deploy کنید، سپس در یک پنجره خصوصی مرورگر باز کنید:
   `https://دامنه-شما/api/instagram/connect?key=INSTAGRAM_ADMIN_SECRET`
   (کلید در تاریخچه مرورگر می‌ماند؛ بعد از اتصال می‌توانید آن را عوض کنید.)
8. با حساب Creator وارد شوید و اجازه بدهید. پس از بازگشت، `/instagram` نمایش پست‌ها را شروع می‌کند (تا ۱۵ دقیقه کش).

## قطع اتصال
```bash
curl -X POST https://دامنه-شما/api/instagram/disconnect -H "Authorization: Bearer $INSTAGRAM_ADMIN_SECRET"
```
## تمدید توکن
توکن بلندمدت حدود ۶۰ روز اعتبار دارد و cron روزانه آن را تمدید می‌کند. اگر منقضی شود، سایت آخرین داده ذخیره‌شده را با زمان همگام‌سازی نشان می‌دهد؛ مرحله ۷ را تکرار کنید.
## نسخه API
پیش‌فرض `v26.0` است و با `META_API_VERSION` تغییر می‌کند.
