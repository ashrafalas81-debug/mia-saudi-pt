// FollowUp, Instructor, ExamPrep, Trust, FinalCTA, Footer
import type { ProgramSettings } from "@/lib/program";

export function FollowUp() {
  const items = [
    "متابعة حضور الطلاب",
    "تفضيل الحضور المباشر أو المسجل",
    "متابعة المراجعة اليومية",
    "تجميع الأسئلة",
    "تحديد الموضوعات الضعيفة",
    "ملاحظات المحاضر",
    "تقرير الجاهزية النهائي",
  ];
  return (
    <section id="program" className="bg-silver/60 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="text-royal text-sm font-semibold">المتابعة اليومية</span>
          <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-4 leading-snug">
            مو بس محاضرات... متابعة تساعدك تعرف وش تراجع بعد كل يوم.
          </h2>
          <p className="text-navy/70 leading-8">
            سواء حضرت المحاضرة مباشرة أو تابعتها مسجلة، تقدر تراجع المحتوى، وتحل التدريب اليومي،
            وتعرف نقاط ضعفك، وتستفيد من المتابعة المخصصة للطلاب طوال البرنامج.
          </p>
          <p className="mt-4 text-xs text-navy/50 leading-6">
            المتابعة تتم وفق آلية ومواعيد البرنامج المعلنة للطلاب المسجلين.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {items.map((t, i) => (
            <div key={t} className={`bg-white rounded-2xl border border-silver p-4 card-shadow ${i === items.length - 1 ? "col-span-2" : ""}`}>
              <span className="font-en text-gold text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-sm text-navy mt-1 font-medium">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Instructor() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-navy rounded-3xl p-8 md:p-12 text-white grid md:grid-cols-[220px_1fr] gap-8 items-center card-shadow">
          <div className="mx-auto">
            <div className="w-44 h-44 rounded-3xl bg-gradient-to-br from-royal/40 to-cyan/20 border border-white/10 grid place-items-center">
              <div className="text-center px-3">
                <svg viewBox="0 0 24 24" className="w-10 h-10 mx-auto mb-2 text-cyan" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                </svg>
                <p className="text-[10px] text-silver/70 leading-4">تُضاف الصورة الرسمية لد. أشرف هنا فور توفيرها</p>
              </div>
            </div>
          </div>
          <div>
            <span className="text-cyan text-sm font-semibold">تعرف على محاضر البرنامج</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">د. أشرف علاء مصطفى</h2>
            <p className="font-en text-silver/80 text-sm mt-1 ltr text-left md:text-right">
              Founder — Medical Intelligence Academy (MIA) | Physical Therapist &amp; Clinical Educator
            </p>
            <p className="text-silver/85 leading-8 mt-4">
              يقدم د. أشرف علاء مصطفى محاضرات ومراجعات متخصصة في العلاج الطبيعي، مع التركيز على ربط
              Anatomy وBiomechanics بالتطبيق الإكلينيكي باستخدام تقنيات 3D Motion والتعليم التفاعلي.
              أسلوب الشرح يعتمد على تبسيط المعلومات وربطها بالحالات الواقعية وأسئلة التقييم الإكلينيكي.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ExamPrep() {
  const cards = [
    {
      t: "SCFHS Licensure Preparation",
      ar: "الاستعداد لاختبار التصنيف السعودي",
      pts: ["مراجعة عالية الأهمية High-Yield", "أسئلة MCQ وفق الـblueprint", "اختبارات محاكية مؤقتة"],
    },
    {
      t: "Hospital Recruitment Assessments",
      ar: "تقييمات التوظيف بالمستشفيات",
      pts: ["معرفة إكلينيكية تطبيقية", "أسئلة عملية", "تدريب قائم على الحالات"],
    },
    {
      t: "Clinical Interview Preparation",
      ar: "التحضير للمقابلات الإكلينيكية",
      pts: ["استدلال إكلينيكي", "تقييم وخطة علاج", "سلامة المرضى"],
    },
  ];
  return (
    <section className="bg-silver/60 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">استعد لأكثر من مرحلة في رحلتك المهنية بالسعودية</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div key={c.t} className="bg-white rounded-3xl p-7 border border-silver card-shadow">
              <div className="w-11 h-11 rounded-2xl bg-royal/10 grid place-items-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1457B8" strokeWidth="2">
                  <path d="M9 12l2 2 4-4M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
                </svg>
              </div>
              <h3 className="font-en font-semibold text-navy ltr text-left">{c.t}</h3>
              <p className="text-sm text-navy/60 mt-1 mb-4">{c.ar}</p>
              <ul className="space-y-2">
                {c.pts.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-navy/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-navy/50 leading-6 text-center max-w-3xl mx-auto">
          الاختبار الرسمي تابع للجهة المنظمة (SCFHS)، وتقييمات التوظيف والمقابلات تختلف حسب جهة العمل.
          برنامج MIA Saudi PT برنامج تدريبي مستقل من Medical Intelligence Academy ولا يمثل اعتمادًا رسميًا من SCFHS.
        </p>
      </div>
    </section>
  );
}

export function Trust() {
  const items = [
    { t: "هوية MIA البصرية", d: "برنامج مقدم من Medical Intelligence Academy بهوية واضحة." },
    { t: "مؤهلات المحاضر", d: "د. أشرف علاء مصطفى — أخصائي علاج طبيعي ومعلم إكلينيكي." },
    { t: "نماذج شرح حقيقية", d: "لقطات من محاضرات 3D الفعلية تُعرض عند توفيرها — لا محتوى مختلق." },
    { t: "شفافية التفاصيل", d: "المواعيد والمحتوى والتجربة المجانية معلنة بوضوح قبل التسجيل." },
  ];
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">لماذا تثق في البرنامج؟</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((i) => (
            <div key={i.t} className="rounded-2xl border border-silver p-5 bg-silver/40">
              <p className="font-semibold text-navy mb-2">{i.t}</p>
              <p className="text-sm text-navy/65 leading-7">{i.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[11px] text-navy/45 text-center">
          آراء الطلاب ومقاطع التقييم تُنشر هنا عند توفرها بموافقة أصحابها — لا نعرض تقييمات غير موثقة.
        </p>
      </div>
    </section>
  );
}

export function FinalCTA({ settings }: { settings: ProgramSettings }) {
  return (
    <section className="bg-navy text-white py-16 md:py-24 relative overflow-hidden hero-grid">
      <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-royal/25 blur-3xl" />
      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold leading-snug mb-4">
          10 أيام من المراجعة المنظمة قد تغيّر طريقة استعدادك للاختبار.
        </h2>
        <p className="text-silver/85 leading-8 mb-8">
          ابدأ بمحاضرتين مجانيتين، وتعرّف على أسلوب الشرح بتقنيات 3D Motion، وتدرب على الحالات
          والأسئلة، وحدد خطتك للاستعداد للاختبار السعودي والمقابلات الإكلينيكية.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#register" className="bg-gold text-navy font-bold px-10 py-4 rounded-2xl hover:brightness-110 transition shadow-lg shadow-gold/20">
            سجّل الآن في التجربة المجانية
          </a>
          <a
            href={`https://wa.me/${settings.whatsappSupport}?text=${encodeURIComponent(settings.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass text-white font-semibold px-10 py-4 rounded-2xl hover:bg-white/10 transition"
          >
            اسألنا عبر واتساب
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer({ settings }: { settings: ProgramSettings }) {
  return (
    <footer className="bg-navy text-silver/70 border-t border-white/10 py-10">
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
