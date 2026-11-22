export function AppIcon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" role="img" aria-label="MIA app icon">
      <defs>
        <linearGradient id="appicon-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1457B8" />
          <stop offset="100%" stopColor="#19BDE6" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="88" height="88" rx="24" fill="url(#appicon-bg)" />
      {/* motion arcs */}
      <path d="M24 62 A30 30 0 0 1 72 34" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
      <path d="M30 68 A24 24 0 0 1 66 44" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="4" strokeLinecap="round" />
      {/* joint */}
      <circle cx="50" cy="50" r="9" fill="#ffffff" />
      <circle cx="50" cy="50" r="3.5" fill="#1457B8" />
      {/* pulse */}
      <path d="M28 78 h12 l4 -8 5 14 4 -8 h15" fill="none" stroke="#D6AB62" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const FEATURES = [
  "خطة الأيام العشرة يوم بيوم",
  "محاضراتك وتسجيلاتك في مكان واحد",
  "بنك أسئلة تدريبية بنمط الاختبار",
  "حالات إكلينيكية تفاعلية",
  "متابعة تقدمك أول بأول",
];

export default function AppShowcase() {
  return (
    <section id="app" className="bg-silver/60 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <AppIcon size={72} />
            <div>
              <span className="text-royal text-sm font-bold font-en block">MIA Saudi PT Exam Companion</span>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mt-1">
                تطبيقك المرافق طوال الرحلة
              </h2>
            </div>
          </div>
          <p className="text-navy/70 text-lg leading-8 mb-6">
            مع البرنامج تحصل على تطبيق ينظم مذاكرتك ويرافقك من أول محاضرة حتى يوم الاختبار:
          </p>
          <ul className="space-y-3">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3 text-navy font-semibold">
                <span className="w-6 h-6 rounded-full bg-royal text-white grid place-items-center shrink-0">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M2 6.5 4.8 9 10 3" />
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* phone mockup */}
        <div className="mx-auto w-[280px] rounded-[2.5rem] bg-navy p-3 shadow-2xl shadow-navy/40">
          <div className="rounded-[2rem] bg-navy2 overflow-hidden">
            <div className="h-7 grid place-items-center">
              <span className="w-16 h-1.5 rounded-full bg-white/20" />
            </div>
            <div className="px-5 pt-4 pb-6 text-white">
              <div className="flex items-center gap-3 mb-5">
                <AppIcon size={44} />
                <div>
                  <p className="font-en text-[11px] text-cyan ltr">MIA Saudi PT</p>
                  <p className="text-sm font-bold">مساء الخير يا دكتور</p>
                </div>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 mb-3">
                <p className="text-[11px] text-cyan mb-1">محاضرة اليوم</p>
                <p className="font-en text-sm font-semibold ltr text-left">Knee, Ankle & Sports Rehab</p>
                <div className="h-1.5 rounded-full bg-white/10 mt-3 overflow-hidden">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-l from-cyan to-royal" />
                </div>
                <p className="text-[10px] text-silver/70 mt-1.5">66% من خطة الأسبوع</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
                  <p className="text-[10px] text-silver/70">أسئلة اليوم</p>
                  <p className="font-en text-xl font-bold text-cyan">35</p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
                  <p className="text-[10px] text-silver/70">تقدمك العام</p>
                  <p className="font-en text-xl font-bold text-gold">65%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
