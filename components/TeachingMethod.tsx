const STEPS = [
  { n: 1, en: "Anatomy", ar: "افهم التركيب" },
  { n: 2, en: "Biomechanics", ar: "افهم الحركة" },
  { n: 3, en: "Pathomechanics", ar: "افهم الإصابة" },
  { n: 4, en: "Clinical Assessment", ar: "حدد المشكلة" },
  { n: 5, en: "Diagnosis", ar: "الاستدلال الإكلينيكي" },
  { n: 6, en: "Treatment", ar: "خطط للتأهيل" },
];

const DEMOS = [
  {
    n: "01",
    title: "Shoulder Abduction",
    tags: ["Scapulohumeral Rhythm", "Rotator Cuff", "Scapular Upward Rotation"],
  },
  {
    n: "02",
    title: "ACL Injury",
    tags: ["Knee Biomechanics", "Ligament Mechanism", "Rehabilitation"],
  },
  {
    n: "03",
    title: "Lumbar Disc Herniation",
    tags: ["Lumbar Anatomy", "Nerve Roots", "Clinical Presentation"],
  },
  {
    n: "04",
    title: "Gait Analysis",
    tags: ["Hip Stabilizers", "Knee Control", "Ankle Motion"],
  },
];

export default function TeachingMethod() {
  return (
    <section id="method" className="bg-navy text-white py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[420px] h-[420px] rounded-full bg-royal/20 blur-3xl" />
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <span className="text-cyan text-sm font-semibold font-en">3D Motion Learning</span>
          <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-4 leading-snug">
            مش مجرد مراجعة معلومات... شوف الحركة، افهم الإصابة، وحدد العلاج.
          </h2>
          <p className="text-silver/85 leading-8">
            كل محاضرة تربط المعلومات الأساسية بالتطبيق الإكلينيكي، باستخدام نماذج Anatomical 3D
            وMotion Analysis لتوضيح حركة المفاصل والعضلات والتغيرات الميكانيكية أثناء الإصابة.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-14">
          {STEPS.map((s) => (
            <div key={s.n} className="glass rounded-2xl p-4 text-center">
              <span className="font-en text-gold text-sm font-bold">{String(s.n).padStart(2, "0")}</span>
              <p className="font-en text-xs text-cyan mt-1 ltr">{s.en}</p>
              <p className="text-sm mt-1 text-silver">{s.ar}</p>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-2">معرض تجارب الشرح ثلاثية الأبعاد</h3>
        <p className="text-silver/70 text-sm mb-6 max-w-2xl leading-7">
          أماكن مخصصة للقطات الأصلية من أسلوب د. أشرف في شرح Anatomy &amp; Biomechanics بتقنية 3D Motion.
          ستُستبدل هذه اللوحات بالفيديوهات واللقطات الحقيقية فور توفيرها — لا نعرض أي محتوى مزيف.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEMOS.map((d) => (
            <div key={d.n} className="glass rounded-2xl overflow-hidden group">
              <div className="aspect-video bg-gradient-to-br from-navy2 to-royal/40 grid place-items-center relative">
                <svg viewBox="0 0 120 120" className="w-16 h-16 opacity-60 group-hover:opacity-90 transition">
                  <circle cx="60" cy="60" r="34" fill="none" stroke="#19BDE6" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="60" cy="60" r="10" fill="#D6AB62" opacity="0.8" />
                  <path d="M60 26v-12M60 106v-12M26 60H14M106 60H94" stroke="#19BDE6" strokeWidth="1.5" />
                </svg>
                <span className="absolute bottom-2 right-2 text-[10px] bg-black/40 rounded px-2 py-0.5 text-silver">
                  Demo {d.n} — بانتظار المادة الأصلية
                </span>
              </div>
              <div className="p-4">
                <p className="font-en font-semibold text-sm ltr text-left">{d.title}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {d.tags.map((t) => (
                    <span key={t} className="text-[10px] font-en text-cyan/90 border border-cyan/25 rounded-full px-2 py-0.5 ltr">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
