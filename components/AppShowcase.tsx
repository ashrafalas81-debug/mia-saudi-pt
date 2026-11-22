"use client";
import { useState } from "react";

const FEATURES = [
  { k: "A", title: "My 10-Day Plan", ar: "خطة الأيام العشرة", pts: ["محاضرات يومية", "دروس مكتملة ومتبقية", "قائمة مراجعة", "تقدم شخصي"] },
  { k: "B", title: "My Lectures", ar: "محاضراتي", pts: ["دخول الجلسات المباشرة", "المحاضرات المسجلة", "ملخصات إكلينيكية", "مصادر المحاضرات"] },
  { k: "C", title: "Practice MCQs", ar: "تدريب الأسئلة", pts: ["هدف 350+ سؤالًا", "اختبارات حسب التخصص", "إجابات مشروحة", "حفظ الأسئلة الصعبة"] },
  { k: "D", title: "Clinical Case Bank", ar: "بنك الحالات", pts: ["هدف 20+ حالة موجهة", "فحص إكلينيكي", "تشخيص تفريقي", "خطة علاج مبررة"] },
  { k: "E", title: "Exam-Style Practice", ar: "نماذج تدريبية", pts: ["أسئلة بأسلوب الاختبار", "نماذج منظمة", "Mock tests وفق الـblueprint"] },
  { k: "F", title: "Full Mock Exam", ar: "اختبار محاكي كامل", pts: ["150 سؤالًا مؤقتًا", "180 دقيقة", "تقرير نتيجة وتحليل نقاط الضعف"] },
  { k: "G", title: "Interview Simulator", ar: "محاكي المقابلات", pts: ["سيناريوهات إكلينيكية", "أسئلة مقابلات", "إجابات نموذجية"] },
  { k: "H", title: "My Progress", ar: "تقدمي", pts: ["نتائج الاختبارات", "أضعف الموضوعات", "المراجعة التالية المقترحة"] },
];

export default function AppShowcase() {
  const [tab, setTab] = useState(0);
  return (
    <section id="app" className="bg-silver/60 py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-royal text-sm font-semibold font-en">MIA Saudi PT Exam Companion</span>
          <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-4 leading-snug">
            محاضراتك، أسئلتك، حالاتك الإكلينيكية... كلها في تطبيق واحد.
          </h2>
          <p className="text-navy/70 leading-8 mb-8">
            مع البرنامج تحصل على تطبيق مرافق مصمم لتنظيم مذاكرتك، ومراجعة المحاضرات، والتدرب على
            الأسئلة والحالات، ومتابعة تقدمك خطوة بخطوة.
          </p>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {FEATURES.map((f, i) => (
              <button
                key={f.k}
                onClick={() => setTab(i)}
                className={`text-right rounded-xl px-3 py-2.5 border transition text-sm ${
                  tab === i ? "bg-royal text-white border-royal" : "bg-white border-silver hover:border-royal/50"
                }`}
              >
                <span className="font-en font-bold ml-1">{f.k}.</span> {f.ar}
              </button>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-silver p-5 card-shadow">
            <p className="font-en font-semibold text-royal ltr text-left">{FEATURES[tab].title}</p>
            <ul className="mt-3 space-y-2">
              {FEATURES[tab].pts.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-navy/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <PhoneMockup />
      </div>
      <p className="max-w-6xl mx-auto px-4 mt-8 text-[11px] text-navy/50 leading-6">
        واجهة عرض توضيحية لشاشات التطبيق المرافق قيد التطوير — رابط التطبيق الفعلي يُضاف عند إطلاقه.
      </p>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[290px] sm:w-[320px]">
      <div className="absolute -inset-8 bg-gradient-to-br from-royal/25 to-cyan/20 rounded-[56px] blur-2xl" />
      <div className="relative bg-navy rounded-[44px] p-2.5 shadow-2xl shadow-navy/40 border border-white/10">
        <div className="bg-navy2 rounded-[36px] overflow-hidden">
          <div className="h-7 grid place-items-center">
            <div className="w-20 h-4 bg-black/60 rounded-full" />
          </div>
          <div className="px-4 pb-5 pt-1 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] text-silver/70">مساء الخير دكتور</p>
                <p className="text-sm font-bold">خطتك لليوم 3</p>
              </div>
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-royal to-cyan grid place-items-center text-[10px] font-bold font-en">MIA</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold">محاضرة اليوم</p>
                <span className="text-[9px] text-cyan">Live 8:00 PM</span>
              </div>
              <p className="text-[11px] text-silver font-en ltr text-left">Knee, Ankle & Sports Rehab</p>
              <div className="mt-2 h-1.5 rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-l from-cyan to-royal" />
              </div>
              <p className="mt-1 text-[9px] text-silver/60">66% من خطة الأسبوع</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                <p className="text-[10px] font-semibold mb-1">أسئلة اليوم</p>
                <p className="font-en text-lg font-bold text-cyan">35</p>
                <p className="text-[9px] text-silver/60">MCQ — MSK</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                <p className="text-[10px] font-semibold mb-1">حالة إكلينيكية</p>
                <p className="text-[10px] text-silver/80 font-en ltr text-left">ACL Tear — Case 07</p>
                <p className="text-[9px] text-gold mt-1">تحليل موجّه</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 mb-3 flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0">
                <svg viewBox="0 0 48 48" className="w-12 h-12 -rotate-90">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#19BDE6" strokeWidth="4" strokeDasharray="125.6" strokeDashoffset="44" strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 grid place-items-center text-[10px] font-bold font-en">65%</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold">تقدمك العام</p>
                <p className="text-[9px] text-silver/60">أضعف موضوع: Neurophysiology — راجعه اليوم</p>
              </div>
            </div>
            <button className="w-full bg-gold text-navy text-[11px] font-bold rounded-xl py-2.5">ابدأ اختبار Mock Exam</button>
          </div>
        </div>
      </div>
    </div>
  );
}
