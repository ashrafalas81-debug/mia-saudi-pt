"use client";
import { useState } from "react";
import { CURRICULUM } from "@/lib/program";

const FILTERS = [
  { id: "all", label: "الكل (10)" },
  { id: "free", label: "الأسبوع المجاني (2)" },
  { id: "msk", label: "MSK & Sports" },
  { id: "neuro", label: "Neuro & Peds" },
  { id: "special", label: "Electro · Ex · ICU" },
];

function getCategory(day: number): string {
  if (day <= 3) return "msk";
  if (day <= 7) return "neuro";
  return "special";
}

export default function Lectures() {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const items = CURRICULUM.filter((d) => {
    if (filter === "all") return true;
    if (filter === "free") return Boolean(d.free);
    return getCategory(d.day) === filter;
  });

  return (
    <section id="curriculum" className="bg-[#090F1C] text-white py-16 md:py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-cyan text-xs font-bold font-en tracking-widest uppercase">10 DAYS · 10 INTENSIVE LECTURES</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-4 leading-tight">
            خطة الـ ١٠ أيام: منهجك كامل بالترتيب
          </h2>
          <p className="text-slate-400 text-base leading-8">
            كل محاضرة ساعتان مباشر على <span className="font-en text-white font-semibold">Zoom</span> (ومسجلة بالكامل).
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                filter === f.id ? "bg-cyan text-[#03060C]" : "bg-[#10192D] text-slate-300 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {items.map((d) => {
            const isOpen = Boolean(expanded[d.day]);
            const shownTopics = isOpen ? d.topics : d.topics.slice(0, 4);
            const hasMore = d.topics.length > 4;
            return (
              <div
                key={d.day}
                className={`glass-dark rounded-2xl p-5 md:p-6 flex flex-col justify-between ${d.free ? "border-gold/45" : ""}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`shrink-0 w-10 h-10 rounded-xl grid place-items-center font-en font-extrabold text-sm ${
                          d.free ? "bg-gold text-[#03060C]" : "bg-[#10192D] text-cyan border border-white/10"
                        }`}
                      >
                        Day {String(d.day).padStart(2, "0")}
                      </span>
                      {d.free && (
                        <span className="text-[11px] font-bold text-[#03060C] bg-gold rounded-full px-2.5 py-0.5">
                          مجاني — الأسبوع الأول
                        </span>
                      )}
                    </div>
                    <span className="font-en text-[11px] text-slate-400 ltr">Zoom Live + Recorded</span>
                  </div>

                  <h3 className="font-en font-bold text-base md:text-lg text-white ltr text-left mt-3.5 leading-snug">
                    {d.titleEn}
                  </h3>

                  <ol className="mt-3.5 space-y-1.5 text-xs text-slate-300 font-en ltr text-left list-decimal list-inside">
                    {shownTopics.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ol>
                </div>

                {hasMore && (
                  <button
                    type="button"
                    onClick={() => setExpanded((prev) => ({ ...prev, [d.day]: !prev[d.day] }))}
                    className="mt-4 pt-3 border-t border-white/10 w-full text-right text-xs font-bold text-cyan hover:text-gold transition flex items-center justify-between"
                  >
                    <span>{isOpen ? "إخفاء التفاصيل الإضافية" : "شاهد تفاصيل المحاضرة كاملة"}</span>
                    <span>{isOpen ? "▲" : "▼"}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
