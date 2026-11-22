const LECTURES = [
  {
    n: "01",
    title: "MSK & Sports Injuries — Shoulder & Cervical Spine",
    titleAr: "الكتف والعمود الرقبي",
  },
  {
    n: "02",
    title: "MSK & Sports Injuries — Lumbar Spine & Hip",
    titleAr: "العمود القطني والورك",
  },
];
const PERKS = ["حضور المحاضرة مباشرة", "التسجيل متاح بعد المحاضرة", "شرح بتقنية 3D Motion", "مناقشة حالات إكلينيكية", "تدريب على أسئلة MCQ"];

export default function FreeWeek() {
  return (
    <section id="free-week" className="bg-silver/60 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-royal text-sm font-semibold">التجربة المجانية</span>
          <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-4">جرّب طريقة الشرح بنفسك — مجانًا بالكامل</h2>
          <p className="text-navy/70 leading-8">
            قبل ما تقرر تكمل البرنامج، تقدر تحضر محاضرتين مجانيتين من قسم الـMSK &amp; Sports Injuries،
            وتتعرف على طريقة المراجعة، وشرح الـ3D Motion، وتحليل الحالات الإكلينيكية، وكيفية التعامل
            مع أسئلة الاختبار.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {LECTURES.map((l) => (
            <div key={l.n} className="bg-white rounded-3xl p-7 card-shadow border border-silver">
              <div className="flex items-start justify-between mb-4">
                <span className="font-en text-5xl font-bold text-silver">{l.n}</span>
                <span className="bg-cyan/10 text-royal text-xs font-semibold rounded-full px-3 py-1">محاضرة مجانية</span>
              </div>
              <h3 className="font-en font-semibold text-lg text-navy mb-1 ltr text-left">{l.title}</h3>
              <p className="text-navy/60 text-sm mb-5">{l.titleAr}</p>
              <ul className="space-y-2.5">
                {PERKS.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-navy/80">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1457B8" strokeWidth="2.5" className="shrink-0">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            href="#register"
            className="inline-block bg-royal text-white font-bold px-10 py-4 rounded-2xl hover:bg-navy transition shadow-lg shadow-royal/25"
          >
            احجز مكانك في المحاضرتين المجانيتين
          </a>
          <p className="mt-4 text-xs text-navy/50">المجاني هو المحاضرتان التجريبيتان المحددتان فقط.</p>
        </div>
      </div>
    </section>
  );
}
