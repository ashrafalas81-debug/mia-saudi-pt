import type { ProgramSettings } from "@/lib/program";

const TARGET_EXAMS = [
  {
    n: "01",
    badge: "Saudi Commission",
    title: "01 — SCFHS Physiotherapy Specialist Exam",
    desc: "اختبار التصنيف المهني لأخصائي العلاج الطبيعي التابع للهيئة السعودية للتخصصات الصحية. امتحان رسمي للتصنيف المهني.",
    cyan: true,
  },
  {
    n: "02",
    badge: "بوابة التوظيف",
    title: "02 — MOH Recruitment Assessments",
    desc: "الاستعداد للتقييمات والمفاضلات الوظيفية التي قد تطلبها وزارة الصحة السعودية حسب الإعلان. (ليس امتحانًا موحدًا وثابتًا لجميع الوظائف).",
    cyan: false,
  },
  {
    n: "03",
    badge: "Clinical Cases",
    title: "03 — Hospital Clinical & Technical Assessments",
    desc: "التدريب على الأسئلة التخصصية، و Clinical Cases، والتقييمات الفنية التي قد تستخدمها المستشفيات للتوظيف.",
    cyan: true,
  },
  {
    n: "04",
    badge: "English Interviews",
    title: "04 — Clinical & Job Interviews",
    desc: "التحضير للمقابلات الشخصية والإكلينيكية باللغة الإنجليزية، ومناقشة التشخيص والخطة العلاجية وسلامة المريض.",
    cyan: false,
  },
];

export function TargetExams() {
  return (
    <section id="exams" className="bg-[#090F1C] text-white py-16 md:py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <span className="text-cyan text-xs font-bold font-en tracking-widest uppercase">TARGET EXAMS &amp; ASSESSMENTS</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 leading-tight">
            الامتحانات والتقييمات التي يؤهلك لها البرنامج
          </h2>
          <p className="text-slate-400 mt-3 text-base leading-7">
            فرصتك تراجع كل موادك وتستعد بثقة للمسارات الأربعة الرئيسية في السعودية — بدون تشتّت وبأقل وقت ممكن:
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {TARGET_EXAMS.map((ex) => (
            <div key={ex.n} className="glass-dark rounded-2xl p-6 md:p-7">
              <div className="flex items-center justify-between gap-3 mb-4">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    ex.cyan ? "font-en ltr text-cyan bg-cyan/10 border-cyan/25" : "text-gold bg-gold/10 border-gold/25"
                  }`}
                >
                  {ex.badge}
                </span>
                <span className="font-en text-gold font-extrabold text-xl">{ex.n}</span>
              </div>
              <h3 className="font-en text-lg md:text-xl font-bold text-white ltr text-left">{ex.title}</h3>
              <p className="text-slate-300 text-sm md:text-base leading-7 mt-3">{ex.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InstructorBio({ settings }: { settings: ProgramSettings }) {
  return (
    <section id="instructor" className="bg-[#090F1C] text-white py-16 md:py-24 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4">
        <div className="glass-dark rounded-3xl p-7 md:p-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {settings.doctorPhoto ? (
              <img
                src={settings.doctorPhoto}
                alt={settings.instructorAr}
                className="w-32 h-32 md:w-36 md:h-36 rounded-3xl object-cover border-2 border-gold shrink-0"
              />
            ) : (
              <div className="shrink-0 w-32 h-32 md:w-36 md:h-36 rounded-3xl bg-gradient-to-br from-royal/30 to-cyan/20 border-2 border-gold/50 grid place-items-center text-center">
                <div>
                  <span className="font-en font-extrabold text-3xl text-gold block">MIA</span>
                  <span className="text-[11px] text-slate-300">د. أشرف علاء</span>
                </div>
              </div>
            )}
            <div className="flex-1 text-center md:text-right">
              <span className="text-cyan text-xs font-bold font-en tracking-widest uppercase">ABOUT THE INSTRUCTOR</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">{settings.instructorAr}</h2>
              <p className="font-en text-xs text-gold mt-1 ltr md:text-right">
                {settings.instructor} · Founder of {settings.institution}
              </p>
              <p className="mt-4 text-slate-300 leading-8 text-sm md:text-base">
                محاضر ومؤسس <span className="font-en text-white font-semibold">Medical Intelligence Academy (MIA)</span>، بخبرة تتجاوز{" "}
                <strong className="text-white">٥ سنوات</strong> في التدريس والتأهيل للاختبارات المهنية والتأهيلية للعلاج الطبيعي في{" "}
                <strong className="text-white">مصر والأردن والسعودية</strong> وغيرها. درّب أكثر من{" "}
                <strong className="text-gold">7,000 طالب وخريج</strong> على مستوى الوطن العربي.
              </p>
              <p className="mt-3 text-slate-300 leading-8 text-sm md:text-base">
                أول من يدمج تقنيات الـ <span className="font-en text-cyan font-semibold">3D Motion</span> والذكاء الاصطناعي (
                <span className="font-en text-cyan font-semibold">AI</span>) وتطوير تطبيقات الويب التفاعلية (
                <span className="font-en text-cyan font-semibold">Web Apps</span>) المخصصة لكل طالب، مع الاعتماد على مدارس وتكنيكات تدريس خاصة لطلاب وخريجي العلاج الطبيعي لتحويل المنهج الضخم إلى فهم إكلينيكي واضح وحل سريع للـ{" "}
                <span className="font-en text-white">Clinical Cases</span>.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-[#03060C]/70 border border-white/10 p-3.5">
                  <p className="font-en text-xl sm:text-2xl font-extrabold text-gold ltr">+5</p>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">سنوات خبرة تدريس وتأهيل</p>
                </div>
                <div className="rounded-2xl bg-[#03060C]/70 border border-white/10 p-3.5">
                  <p className="font-en text-xl sm:text-2xl font-extrabold text-cyan ltr">+7,000</p>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">طالب وخريج بالوطن العربي</p>
                </div>
                <div className="rounded-2xl bg-[#03060C]/70 border border-white/10 p-3.5">
                  <p className="font-en text-xl sm:text-2xl font-extrabold text-gold ltr">3D + AI</p>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">منهجية تدريس وتطبيقات خاصة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ settings }: { settings: ProgramSettings }) {
  return (
    <footer className="bg-[#03060C] text-slate-400 border-t border-white/10 py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-royal to-cyan grid place-items-center text-white font-bold font-en text-sm">
            MIA
          </span>
          <div>
            <p className="text-white font-semibold text-sm">{settings.instructorAr}</p>
            <p className="text-xs font-en ltr">MIA Saudi PT — 10-Day Intensive Preparation Program</p>
          </div>
        </div>
        <p className="text-xs text-center leading-6">
          Medical Intelligence Academy © 2026 — برنامج تدريبي مستقل، لا يمثل اعتمادًا رسميًا من أي جهة اختبار.
        </p>
      </div>
    </footer>
  );
}
