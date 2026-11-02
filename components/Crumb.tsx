import Link from "next/link"; import JsonLd from "./JsonLd"; import { SITE } from "@/lib/site";
export default function Crumb({ here }: { here: string }) {
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "خانه", item: SITE.url }, { "@type": "ListItem", position: 2, name: here }] }} />
    <nav className="crumb" aria-label="مسیر"><Link href="/">خانه</Link> / {here}</nav></>;
}
