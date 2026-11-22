import type { ProgramSettings } from "@/lib/program";

const CHIPS = [
  { v: "10", l: "أيام فقط" },
  { v: "10", l: "محاضرات مركزة" },
  { v: "Zoom", l: "مباشر + مسجل" },
  { v: "App", l: "تطبيق مرافق" },
];

export default function Hero({ settings }: { settings: ProgramSettings }) {
  return (
    <section id="program" className="relative bg-navy text-white overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-60" />
      <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-royal/25 blur-3xl" />
      <div className="absolute -bottom-40 -right-24 w-[420px] h-[420px] rounded-full bg-cyan/10 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-28 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 text-sm text-cyan font-semibold">
          اختبار الترخيص السعودي للعلاج الطبيعي
          <span className="font-en ltr">SCFHS</span>
        </p>

        <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.25] tracking-tight">
          عندك اختبار التصنيف السعودي؟
          <span className="block mt-2 bg-gradient-to-l from-gold via-cyan to-gold bg-clip-text text-transparent">
            جهّز نفسك في 10 أيام.
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-silver leading-9 max-w-2xl mx-auto">
          <span className="font-en font-semibold text-white">Medical Intelligence Academy</span>{" "}
          تقدّم لك برنامج{" "}
          <span className="font-en font-semibold text-white">MIA Saudi PT</span>:
          عشر محاضرات مركزة تغطي منهجك كاملًا، تطبيق مرافق ينظم مذاكرتك،
          ومتابعة يومية شخصية من د. أشرف حتى يوم الاختبار.
        </p>

        <p className="mt-4 text-gold font-semibold">
          مهما كان مستواك الحالي، الرحلة مصممة ترفع جاهزيتك لأعلى درجة ممكنة.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#register"
            className="w-full sm:w-auto bg-gold text-navy text-lg font-bold px-10 py-4 rounded-2xl hover:brightness-110 transition shadow-lg shadow-gold/20"
          >
            سجّل الآن — الأسبوع الأول مجاني
          </a>
          <a
            href="#curriculum"
            className="w-full sm:w-auto border border-white/25 text-white font-semibold px-10 py-4 rounded-2xl hover:bg-white/5 transition"
          >
            شوف المحاضرات
          </a>
        </div>

        <p className="mt-6 text-sm text-silver/80">
          يبدأ البرنامج <span className="text-white font-bold">الخميس ٢٦ نوفمبر ٢٠٢٦</span> · الأسبوع المجاني محدود بـ ٥٠ مقعدًا
        </p>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {CHIPS.map((c) => (
            <div key={c.l} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="font-en text-2xl font-bold text-cyan ltr">{c.v}</p>
              <p className="text-sm text-silver mt-1">{c.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
