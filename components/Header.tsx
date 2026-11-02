"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Wordmark } from "./Logo";
import { NAV } from "@/lib/site";
export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="hdr"><div className="wrap in">
      <Link href="/" aria-label="NAPEYDA، صفحه اصلی"><Wordmark /></Link>
      <nav className={"nav" + (open ? " open" : "")} aria-label="منوی اصلی">
        {NAV.map(([h, l]) => <Link key={h} href={h} onClick={() => setOpen(false)} aria-current={path.startsWith(h) ? "page" : undefined}>{l}</Link>)}
      </nav>
      <button className="btn burger" aria-expanded={open} aria-label="منو" onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>
    </div></header>
  );
}
