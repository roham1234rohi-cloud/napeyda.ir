"use client";
import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";
export default function Intro() {
  const [show, setShow] = useState(false);
  const [out, setOut] = useState(false);
  const close = () => { setOut(true); try { sessionStorage.setItem("intro", "1"); } catch {} setTimeout(() => setShow(false), 600); };
  useEffect(() => {
    let seen = false; try { seen = sessionStorage.getItem("intro") === "1"; } catch {}
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) return;
    setShow(true); const t = setTimeout(close, 3200); return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className={"intro" + (out ? " out" : "")} role="dialog" aria-label="معرفی NAPEYDA">
      <button className="btn skip" onClick={close}>رد کردن</button>
      <div className="stage"><div><LogoMark size={120} /></div></div>
      <p>چیزی فراتر از آنچه می‌بینی</p>
    </div>
  );
}
