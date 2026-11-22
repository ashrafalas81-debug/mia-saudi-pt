"use client";
import { useEffect, useRef } from "react";
import type { ProgramSettings } from "@/lib/program";

export default function Hero({ settings }: { settings: ProgramSettings }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    const motes = Array.from({ length: 34 }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.8,
      vy: -(Math.random() * 0.3 + 0.12),
      vx: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.55 + 0.15,
      color: i % 3 === 0 ? "216,174,100" : "25,189,230",
    }));

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < -10) {
          m.y = h + 10;
          m.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${m.color}, ${m.alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section id="program" className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-[#03060C] text-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/images/hero-anatomy-3d.jpg"
          alt="نموذج تشريحي حركي ثلاثي الأبعاد للعمود الفقري ومفصل الكتف والعضلات"
          className="w-full h-full object-cover object-left opacity-85"
        />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#03060C] via-[#03060C]/85 to-[#03060C]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03060C] via-transparent to-[#03060C]/65" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
        <div className="max-w-2xl text-right">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/35 bg-[#090F1C]/80 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm text-cyan font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
            </span>
            <span>لطلاب وخريجي العلاج الطبيعي في السعودية</span>
            <span className="font-en ltr text-white/80 text-xs">SCFHS · MOH</span>
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.35rem] font-extrabold leading-[1.22] tracking-tight text-white">
            اختبارك قريب.. وكلّه Cases؟
            <span className="block mt-2 bg-gradient-to-l from-gold via-cyan to-gold bg-clip-text text-transparent animate-shimmer">
              راجع كل موادك في ١٠ أيام فقط.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-8 max-w-xl">
            أول برنامج تأهيلي متكامل من <span className="font-en font-semibold text-white">MIA</span>: شرح{" "}
            <strong className="text-white">3D على Zoom</strong> (مباشر أو مسجل)،{" "}
            <strong className="text-cyan">تطبيق مرافق</strong> بكل أسئلة السنين، ومتابعة فردية من الدكتور مهما كان مستواك —{" "}
            <strong className="text-gold">والأسبوع الأول مجانًا بالكامل.</strong>
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2.5 max-w-lg">
            {[
              { t: "١٠ أيام فقط · مراجعة شاملة", g: true },
              { t: "شرح على Zoom مباشر أو مسجل", g: false },
              { t: "تطبيق خاص بأسئلة السنين", g: false },
              { t: "متابعة فردية 1:1 مع الدكتور", g: true },
            ].map((p) => (
              <div key={p.t} className="glass-dark rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-full shrink-0 ${p.g ? "bg-gold" : "bg-cyan"}`} />
                <span className="text-xs sm:text-sm font-semibold text-white">{p.t}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <a href="#register" className="inline-flex items-center justify-center gap-2.5 bg-gold text-[#03060C] text-base sm:text-lg font-extrabold px-8 py-4 rounded-2xl hover:brightness-110 transition shadow-xl shadow-gold/20">
              <span>سجّل الآن — الأسبوع الأول مجانًا</span>
            </a>
            <a href="#app" className="inline-flex items-center justify-center gap-2 border border-white/20 bg-[#090F1C]/70 backdrop-blur-md text-white font-semibold px-7 py-4 rounded-2xl hover:border-cyan/50 transition">
              <span>شاهد التطبيق المرافق</span>
            </a>
          </div>

          <p className="mt-5 text-xs sm:text-sm text-slate-400">
            البداية: <strong className="text-white">الخميس ٢٦ نوفمبر ٢٠٢٦</strong> · <span className="text-gold font-semibold">{settings.seatsNote}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
