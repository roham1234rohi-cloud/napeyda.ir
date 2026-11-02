import type { MetadataRoute } from "next"; import { SITE } from "@/lib/site"; import { POSTS } from "@/content/posts"; import { TUTORIALS } from "@/content/tutorials"; import { LEGAL_UPDATED } from "@/content/legal";
const STATIC = ["", "/product", "/features", "/faq", "/purchase", "/contact", "/blog", "/tutorials", "/tools", "/instagram", "/terms", "/privacy", "/purchase-policy", "/delivery-policy", "/refund-policy"];
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string, d: string) => ({ url: SITE.url + p, lastModified: new Date(d) });
  return [...STATIC.map(p => u(p, LEGAL_UPDATED)), ...POSTS.map(p => u(`/blog/${p.slug}`, p.date)), ...TUTORIALS.map(t => u(`/tutorials/${t.slug}`, LEGAL_UPDATED))];
}
