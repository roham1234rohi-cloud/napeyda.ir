export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_USERNAME?.replace(/^@/, "") ?? "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME ?? "napeyda.ai"
};
export const instagramUrl = `https://www.instagram.com/${SITE.instagram}/`;
export const telegramUrl = SITE.telegram ? `https://t.me/${SITE.telegram}` : null;
export const NAV = [
  ["/product", "محصول"], ["/features", "ویژگی‌ها"], ["/tools", "ابزارها"], ["/tutorials", "آموزش‌ها"],
  ["/blog", "وبلاگ"], ["/instagram", "NAPEYDA SOCIAL"], ["/faq", "سؤالات متداول"], ["/contact", "تماس"]
] as const;
