// Source of truth: verified against NAPAYDA_AI_MEGA_KIT_v1.zip (checked 2026-11-02).
export const BRAND = { name: "NAPEYDA", tagline: "چیزی فراتر از آنچه می‌بینی" } as const;

export const PRODUCT = {
  name: "NAPAYDA AI MEGA KIT", // product spelling intentionally differs from the brand
  version: "1.0",
  zipBytes: 1010735, // about 1 MB (verified); never advertise as 250 MB
  zipFileCount: 51,
  priceReferenceToman: 99000,
  priceLaunchToman: 65000,
  counts: {
    prompts: 50, promptCategories: 5, promptsPerCategory: 10,
    aiTools: 50,
    videoToolGuides: 12,
    imageReferenceFiles: 10, // TEXT references, not images
    actualImageFiles: 0,
    instagramIdeas: 30, instagramCaptions: 30, instagramHooks: 20, instagramTemplates: 3,
    practicalTemplates: 9
  },
  folders: [
    ["00_START_HERE", "راهنمای شروع و چک‌لیست شروع سریع"],
    ["01_PROMPT_BANK", "بانک ۵۰ پرامپت فارسی در ۵ دسته ۱۰تایی"],
    ["02_IMAGE_GALLERY", "۱۰ پرونده مرجع متنی برای تولید تصویر (پرامپت و روش)؛ بدون فایل تصویر"],
    ["03_AI_TOOLS_DIRECTORY", "دایرکتوری ۵۰ ابزار (Excel/Word/PDF) و فهرست لینک‌های رسمی"],
    ["04_VIDEO_TOOLS_GUIDE", "راهنمای ۱۲ ابزار تولید ویدیو"],
    ["05_PROMPT_ENGINEERING", "راهنمای مهندسی پرامپت و قالب استاندارد"],
    ["06_INSTAGRAM_CONTENT", "۳۰ ایده، ۳۰ کپشن، ۲۰ هوک و ۳ قالب"],
    ["07_PRACTICAL_TEMPLATES", "۹ قالب و چک‌لیست کاربردی"],
    ["08_LICENSE_AND_SUPPORT", "مجوز استفاده و راهنمای پشتیبانی"]
  ]
} as const;

// Must NOT appear on the site until real assets exist / checks are run.
export const FORBIDDEN_CLAIMS = ["۱۰ تصویر هوش مصنوعی", "۲۵۰ مگابایت", "۱۰ ابزار ویدیو", "همه لینک‌ها فعال"];
