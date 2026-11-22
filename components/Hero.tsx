import type { ProgramSettings } from "@/lib/program";

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("ar-SA", { day: "numeric", month: "long", year: "numeric" }).format(
      new Date(iso + "T12:00:00")
    );
  } catch {
    return iso;
  }
}

const FACTS = ["10 محاضرات تدريبية", "20 ساعة شرح ومراجعة", "Live + Recorded", "350+ MCQ", "حالات إكلينيكية", "تطبيق مرافق"];

export default function Hero({ settings }: { settings: ProgramSettings }) {
  return (
    <section id="top" className="relative bg-navy text-white overflow-hidden hero-grid">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-royal/30 blur-3xl" />
      <div className="absolute top-20 -right-40 w-[420px] h-[420px] rounded-full bg-cyan/20 blur-3xl" />
      <div className="relative max-w-6xl mx-auto px-4 pt-28 pb-16 md:pt-36 md:pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-silver mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan" />
            برنامج مكثف — يبدأ {formatDate(settings.startDate)}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-[1.25] mb-4">
            اختبارك السعودي أقرب مما تتوقع.
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-l from-cyan to-gold">
              جهّز نفسك خلال 10 أيام من المراجعة والتطبيق.
            </span>
          </h1>
          <p className="text-silver/90 leading-8 mb-8 max-w-xl">
            مراجعة مكثفة ومنظمة لأساسيات العلاج الطبيعي، مع شرح بتقنيات 3D Motion، وتدريب على الحالات
            الإكلينيكية، وأكثر من 350 سؤالًا تدريبيًا، وتطبيق مرافق يساعدك تستعد للاختبار والمقابلات
            الوظيفية بثقة أكبر.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <a
              href="#register"
              className="bg-gold text-navy font-bold px-8 py-4 rounded-2xl text-center hover:brightness-110 transition shadow-lg shadow-gold/20"
            >
              سجّل في التجربة المجانية
            </a>
            <a
              href="#method"
              className="glass text-white font-semibold px-8 py-4 rounded-2xl text-center hover:bg-white/10 transition"
            >
              شاهد تجربة الشرح بتقنية 3D
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {FACTS.map((f) => (
              <div key={f} className="glass rounded-xl px-3 py-2.5 text-sm text-silver flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                {f}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-cyan/90">
            ابدأ بتجربة مجانية: أول محاضرتين من MSK &amp; Sports Injuries.
          </p>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  // Abstract anatomical-motion composition. Real 3D teaching footage from
  // Dr. Ashraf's courses will replace/augment this panel when supplied.
  return (
    <div className="relative">
      <div className="relative glass rounded-3xl p-6 md:p-8 card-shadow">
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs text-silver/80 font-en">3D Motion Teaching</span>
          <span className="text-[10px] text-cyan border border-cyan/40 rounded-full px-2 py-0.5">Shoulder Biomechanics</span>
        </div>
        <div className="relative aspect-square max-w-sm mx-auto">
          <div className="absolute inset-0 animate-rotate-slow">
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-40">
              <circle cx="100" cy="100" r="88" fill="none" stroke="#19BDE6" strokeWidth="0.6" strokeDasharray="3 5" />
              <circle cx="100" cy="100" r="66" fill="none" stroke="#1457B8" strokeWidth="0.8" />
            </svg>
          </div>
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative animate-floaty">
              <svg viewBox="0 0 120 120" className="w-44 h-44 md:w-56 md:h-56">
                <defs>
                  <linearGradient id="bone" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#EAF1F7" />
                    <stop offset="100%" stopColor="#19BDE6" />
                  </linearGradient>
                  <linearGradient id="muscle" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#D6AB62" />
                    <stop offset="100%" stopColor="#1457B8" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="46" r="20" fill="none" stroke="url(#bone)" strokeWidth="3" />
                <path d="M60 66 Q60 92 52 108" fill="none" stroke="url(#bone)" strokeWidth="4" strokeLinecap="round" />
                <path d="M60 66 Q74 78 88 96" fill="none" stroke="url(#bone)" strokeWidth="4" strokeLinecap="round" />
                <path d="M42 40 Q60 22 80 38" fill="none" stroke="url(#muscle)" strokeWidth="5" strokeLinecap="round" opacity="0.9" />
                <path d="M46 52 Q62 44 78 50" fill="none" stroke="#D6AB62" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
                <circle cx="60" cy="46" r="6" fill="#19BDE6" opacity="0.9" />
              </svg>
              <div className="absolute -top-1 -right-3 w-3 h-3 rounded-full bg-cyan pulse-ring" />
            </div>
          </div>
          <div className="absolute top-2 right-2 glass rounded-lg px-2.5 py-1 text-[10px] text-silver font-en">Rotator Cuff</div>
          <div className="absolute bottom-6 left-2 glass rounded-lg px-2.5 py-1 text-[10px] text-silver font-en">Scapulohumeral Rhythm</div>
          <div className="absolute bottom-0 right-6 glass rounded-lg px-2.5 py-1 text-[10px] text-silver font-en">Humeral Head</div>
        </div>
        <p className="mt-5 text-center text-[11px] text-silver/70 leading-5">
          عرض بصري توضيحي — تُضاف لقطات الشرح الأصلية بتقنية 3D من محاضرات د. أشرف عند توفيرها.
        </p>
      </div>
    </div>
  );
}
