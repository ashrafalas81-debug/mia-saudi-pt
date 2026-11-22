import type { ProgramSettings } from "@/lib/program";
import { AppIcon } from "@/components/AppShowcase";

const PAINS = [
  "مطلوب تراجع كل ما درسته من أول يوم",
  "معظم المنهج لم يعد في ذاكرتك",
  "ولا تعرف كيف تجمعه كله قبل الاختبار",
];

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

      <div className="relative max-w-6xl mx-auto px-4 pt-24 pb-12 md:pt-28 md:pb-16">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
          {/* copy */}
          <div className="text-center lg:text-right">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 text-sm text-cyan font-semibold">
              اختبار الترخيص السعودي للعلاج الطبيعي
              <span className="font-en ltr">SCFHS</span>
            </p>

            <h1 className="mt-6 text-3xl md:text-4xl xl:text-5xl font-extrabold leading-[1.35] tracking-tight">
              اختبارك السعودي كله حالات إكلينيكية…
              <span className="block mt-2 bg-gradient-to-l from-gold via-cyan to-gold bg-clip-text text-transparent">
                تخيّل تستعد له كاملًا في 10 أيام فقط.
              </span>
            </h1>

            <ul className="mt-5 space-y-2 text-silver/90 text-base max-w-xl mx-auto lg:mx-0">
              {PAINS.map((p) => (
                <li key={p} className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                  {p}
                </li>
              ))}
            </ul>

            <p className="mt-5 text-base md:text-lg text-silver leading-8 max-w-xl mx-auto lg:mx-0">
              <span className="font-en font-semibold text-white">Medical Intelligence Academy</span>{" "}
              تقدّم لك برنامج{" "}
              <span className="font-en font-semibold text-white">MIA Saudi PT</span>:
              عشر محاضرات مركزة تغطي منهجك كاملًا، حالات محلولة بعد كل محاضرة،
              تطبيق ينظم مذاكرتك، ومتابعة يومية شخصية من د. أشرف حتى يوم الاختبار.
            </p>

            <p className="mt-4 text-gold font-semibold">
              مهما كان مستواك الحالي، الرحلة مصممة ترفع جاهزيتك لأعلى درجة ممكنة.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
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
                شاهد المحاضرات
              </a>
            </div>

            <p className="mt-5 text-sm text-silver/80">
              يبدأ البرنامج <span className="text-white font-bold">الخميس ٢٦ نوفمبر ٢٠٢٦</span> · {settings.seatsNote}
            </p>
          </div>

          {/* visual */}
          <div className="relative max-w-sm mx-auto w-full lg:max-w-none">
            <div className="relative rounded-[2rem] border border-white/15 bg-white/5 p-3 shadow-2xl shadow-navy/60">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/videos/poster-acl-short.jpg"
                src={settings.demoVideo1}
                className="rounded-[1.5rem] w-full h-[380px] md:h-[420px] object-cover"
              />
              <span className="absolute top-6 right-6 rounded-full bg-black/55 backdrop-blur px-3 py-1.5 text-[11px] font-bold text-cyan">
                معاينة من الشرح بتقنية 3D
              </span>
            </div>

            {/* app badge */}
            <div className="absolute -bottom-5 -right-3 sm:-right-6 flex items-center gap-3 rounded-2xl border border-white/15 bg-navy2/95 px-4 py-3 shadow-xl">
              <AppIcon size={40} />
              <div>
                <p className="text-xs font-bold">التطبيق المرافق</p>
                <p className="font-en text-[10px] text-cyan ltr">MIA Exam Companion</p>
              </div>
            </div>

            {/* doctor photo slot — shows his photo once provided via admin settings */}
            <div className="absolute -top-5 -left-3 sm:-left-6 flex items-center gap-3 rounded-2xl border border-white/15 bg-navy2/95 px-4 py-3 shadow-xl">
              {settings.doctorPhoto ? (
                <img
                  src={settings.doctorPhoto}
                  alt={settings.instructorAr}
                  className="w-11 h-11 rounded-full object-cover border-2 border-gold"
                />
              ) : (
                <span className="w-11 h-11 rounded-full bg-gradient-to-br from-royal to-cyan grid place-items-center text-white font-bold font-en text-xs border-2 border-gold/70">
                  MIA
                </span>
              )}
              <div>
                <p className="text-xs font-bold">{settings.instructorAr}</p>
                <p className="text-[10px] text-silver/70">محاضر البرنامج</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {CHIPS.map((c) => (
            <div key={c.l} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center">
              <p className="font-en text-2xl font-bold text-cyan ltr">{c.v}</p>
              <p className="text-sm text-silver mt-1">{c.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
