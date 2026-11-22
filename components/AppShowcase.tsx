export function AppIcon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" role="img" aria-label="MIA app icon">
      <defs>
        <linearGradient id="appicon-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1557B8" />
          <stop offset="100%" stopColor="#19BDE6" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="88" height="88" rx="24" fill="url(#appicon-bg)" />
      <path d="M24 62 A30 30 0 0 1 72 34" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
      <path d="M30 68 A24 24 0 0 1 66 44" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="50" r="9" fill="#ffffff" />
      <circle cx="50" cy="50" r="3.5" fill="#1557B8" />
      <path d="M28 78 h12 l4 -8 5 14 4 -8 h15" fill="none" stroke="#D8AE64" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AppShowcase() {
  return (
    <section id="app" className="bg-[#03060C] text-white py-16 md:py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center">
        <div className="relative rounded-3xl overflow-hidden border border-cyan/30 shadow-2xl shadow-cyan/10 bg-[#090F1C]">
          <img
            src="/images/app-poster.jpg"
            alt="بوستر تطبيق MIA Saudi PT Exam Companion"
            className="w-full h-[320px] sm:h-[380px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#03060C] via-[#03060C]/20 to-transparent" />
          <div className="absolute top-4 right-4 glass-dark rounded-full px-3.5 py-1.5 text-xs font-bold text-gold">
            مشمول مجانًا مع البرنامج
          </div>
          <div className="absolute bottom-4 inset-x-4 flex items-end justify-between gap-3">
            <div>
              <p className="font-en text-xs text-cyan font-bold ltr text-right">MIA EXAM COMPANION APP</p>
              <p className="text-white font-extrabold text-lg sm:text-xl mt-0.5">تطبيقك الذكي للمراجعة والتدريب</p>
            </div>
            <span className="shrink-0 font-en text-xs font-extrabold bg-cyan text-[#03060C] px-3 py-1.5 rounded-xl ltr">
              Web + Mobile
            </span>
          </div>
        </div>

        <div>
          <span className="text-gold text-xs font-bold font-en tracking-widest uppercase">NOT JUST LECTURES · FULL ECOSYSTEM</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-white leading-tight">
            مش بس برنامج محاضرات.. ده كمان تطبيق خاص بتستلمه مع البرنامج
          </h2>
          <p className="text-slate-300 mt-4 text-base leading-8">
            مع اشتراكك بتستلم حسابك على تطبيق <span className="font-en text-cyan font-semibold">MIA Exam Companion</span> المصمم خصيصًا ليجمع لك كل مذاكرتك في مكان واحد:
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-3.5">
            <div className="glass-dark rounded-2xl p-4">
              <p className="font-bold text-white text-sm">أسئلة السنين اللي فاتت مترتبة</p>
              <p className="text-xs text-slate-400 mt-1.5 leading-6">بنك 350+ سؤال و Clinical Cases مقسّمة حسب كل موضوع ومحاضرة.</p>
            </div>
            <div className="glass-dark rounded-2xl p-4">
              <p className="font-bold text-white text-sm">ملفات المحاضرات والملخصات</p>
              <p className="text-xs text-slate-400 mt-1.5 leading-6">كل ملفات الـ PDF وخرائط المراجعة منظمة يوم بيوم على مدار الـ 10 أيام.</p>
            </div>
            <div className="glass-dark rounded-2xl p-4">
              <p className="font-bold text-white text-sm">مكتبة الفيديوهات والتسجيلات</p>
              <p className="text-xs text-slate-400 mt-1.5 leading-6">تسجيلات محاضرات Zoom ومقاطع الـ 3D متاحة لك في أي وقت.</p>
            </div>
            <div className="glass-dark rounded-2xl p-4">
              <p className="font-bold text-white text-sm">متابعة تقدمك ومستواك</p>
              <p className="text-xs text-slate-400 mt-1.5 leading-6">تقارير فورية لنقاط قوتك والمواضيع اللي محتاجة تركيز مع د. أشرف.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
