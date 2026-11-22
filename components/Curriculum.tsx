"use client";
import { useState } from "react";
import { CURRICULUM } from "@/lib/program";

export default function Curriculum() {
  const [openDay, setOpenDay] = useState<number | null>(1);
  return (
    <section id="curriculum" className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-royal text-sm font-semibold">المنهج الكامل</span>
          <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-4">10 أيام تدريبية — منهج مراجعة متكامل</h2>
          <p className="text-navy/70 leading-8">
            اضغط على أي يوم لعرض الموضوعات. كل يوم يتضمن حالات إكلينيكية وتدريب MCQ، مع إمكانية الحضور
            المباشر أو مشاهدة التسجيل. الجدول الفعلي للجلسات يُدار من لوحة البرنامج ويُعلن للمسجلين.
          </p>
        </div>
        <div className="space-y-3">
          {CURRICULUM.map((d) => {
            const open = openDay === d.day;
            return (
              <div
                key={d.day}
                className={`rounded-2xl border transition-colors ${
                  open ? "border-royal bg-silver/50" : "border-silver bg-white hover:border-cyan/60"
                }`}
              >
                <button
                  onClick={() => setOpenDay(open ? null : d.day)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-right"
                  aria-expanded={open}
                >
                  <span
                    className={`w-11 h-11 rounded-xl grid place-items-center font-en font-bold text-sm shrink-0 ${
                      open ? "bg-royal text-white" : "bg-silver text-royal"
                    }`}
                  >
                    {String(d.day).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold text-navy text-sm md:text-base">{d.titleAr}</span>
                    <span className="block font-en text-xs text-navy/50 ltr text-left md:text-right">{d.titleEn}</span>
                  </span>
                  {d.free && (
                    <span className="hidden sm:inline-block bg-gold/15 text-gold border border-gold/40 text-[11px] font-semibold rounded-full px-2.5 py-1">
                      مجاني ضمن التجربة
                    </span>
                  )}
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className={`text-navy/50 transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {open && (
                  <div className="px-5 pb-5 pt-1">
                    <div className="grid sm:grid-cols-2 gap-2 mb-4">
                      {d.topics.map((t) => (
                        <div key={t} className="flex items-center gap-2 text-sm text-navy/80 bg-white rounded-lg px-3 py-2 border border-silver">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan shrink-0" />
                          <span className="font-en ltr text-left flex-1">{t}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 text-[11px]">
                      <span className="bg-royal/10 text-royal rounded-full px-3 py-1">ساعتان مباشرة + تسجيل</span>
                      <span className="bg-royal/10 text-royal rounded-full px-3 py-1">حالات إكلينيكية</span>
                      <span className="bg-royal/10 text-royal rounded-full px-3 py-1">تدريب MCQ</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-xs text-navy/50 text-center leading-6">
          البرنامج مراجعة مكثفة منظمة للأساسيات عالية الأهمية، ولا يُقدَّم كبديل عن الدراسة التفصيلية الكاملة لكل تخصص.
        </p>
      </div>
    </section>
  );
}
