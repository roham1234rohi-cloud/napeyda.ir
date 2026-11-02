import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Intro from "@/components/Intro";
import { SITE, instagramUrl } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "NAPEYDA | چیزی فراتر از آنچه می‌بینی", template: "%s | NAPEYDA" },
  description: "مجموعه‌ای کاربردی و فارسی برای یادگیری، تولید محتوا و استفاده حرفه‌ای‌تر از ابزارهای هوش مصنوعی.",
  openGraph: { type: "website", locale: "fa_IR", siteName: "NAPEYDA" },
  twitter: { card: "summary" }
};
export const viewport: Viewport = { themeColor: "#0a0a0b", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl"><body>
      <a href="#main" className="btn skip-link">پرش به محتوا</a>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [{ "@type": "Organization", name: "NAPEYDA", url: SITE.url, sameAs: [instagramUrl] }, { "@type": "WebSite", name: "NAPEYDA", url: SITE.url, inLanguage: "fa" }] }} />
      <Intro /><Header /><main id="main">{children}</main><Footer />
    </body></html>
  );
}
