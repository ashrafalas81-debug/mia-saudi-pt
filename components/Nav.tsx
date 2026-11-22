"use client";
import { useState } from "react";

const LINKS = [
  { href: "#program", label: "البرنامج" },
  { href: "#curriculum", label: "المحاضرات" },
  { href: "#app", label: "التطبيق" },
  { href: "#free-week", label: "التجربة المجانية" },
  { href: "#register", label: "التسجيل" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-navy/90 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-royal to-cyan grid place-items-center text-white font-bold font-en text-sm">
            MIA
          </span>
          <span className="text-white font-semibold hidden sm:inline">Medical Intelligence Academy</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-silver">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-cyan transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#register"
            className="hidden md:inline-block bg-gold text-navy font-semibold text-sm px-4 py-2 rounded-xl hover:brightness-110 transition"
          >
            احجز مقعدك مجانًا
          </a>
          <button
            aria-label="القائمة"
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden bg-navy border-t border-white/10 px-4 py-3 flex flex-col gap-3 text-silver">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-1">
              {l.label}
            </a>
          ))}
          <a href="#register" onClick={() => setOpen(false)} className="bg-gold text-navy font-semibold px-4 py-2 rounded-xl text-center">
            احجز مقعدك مجانًا
          </a>
        </nav>
      )}
    </header>
  );
}
