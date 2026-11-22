"use client";
import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/program";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-silver/60 py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">الأسئلة الشائعة</h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="bg-white rounded-2xl border border-silver overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-right"
                >
                  <span className="font-semibold text-navy text-sm md:text-base">{f.q}</span>
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className={`shrink-0 text-royal transition-transform ${isOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {isOpen && <p className="px-5 pb-5 text-sm text-navy/70 leading-7">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
