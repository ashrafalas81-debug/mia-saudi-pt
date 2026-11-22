"use client";
import { useEffect, useRef, useState } from "react";
import type { ProgramSettings } from "@/lib/program";

const ITEMS = [
  {
    n: "01",
    title: "تطبيق عملي بعد كل محاضرة",
    body: "حالة إكلينيكية محلولة بعد كل محاضرة، ومراجعة لأسئلة السنوات السابقة بنمط الاختبار، ونماذج تدريبية جاهزة، وخطة مراجعة منظمة تثبّت كل موادك.",
    tag: "Cases + Practice MCQs",
  },
  {
    n: "02",
    title: "شهادة إتمام البرنامج من MIA",
    body: "شهادة إتمام صادرة عن Medical Intelligence Academy عند إنهائك البرنامج. تنبيه مهم: هذه شهادة إتمام تدريبي من الأكاديمية، وليست اعتمادًا مهنيًا رسميًا من الهيئة السعودية للتخصصات الصحية (SCFHS).",
    tag: "Completion Certificate",
  },
  {
    n: "03",
    title: "المحاضرات تبقى معك",
    body: "كل المحاضرات تُسجَّل وتبقى متاحة لك كاملة — ترجع لأي محاضرة في أي وقت قبل الاختبار وبعده.",
    tag: "Lifetime Access to Recordings",
  },
  {
    n: "04",
    title: "أسئلة وحالات السنوات السابقة — كلها في مكان واحد",
    body: "نحل معك حالات وأسئلة تدريبية مبنية على نمط أسئلة السنوات السابقة المستمدة من أهم الاختبارات (اختبارات وزارة الصحة، تقييمات التوظيف، واختبارات القبول والمقابلات) — محلولة ومراجعة ومنظمة في مكان واحد.",
    tag: "Past-Years Style Questions, One Place",
  },
];

export default function WhatYouGet({ settings }: { settings: ProgramSettings }) {
  const [angle, setAngle] = useState(30);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    const jx = 160;
    const jy = 105;
    ctx.save();
    ctx.strokeStyle = "#EAF1F7";
    ctx.lineWidth = 18;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(jx - 25, 25);
    ctx.lineTo(jx, jy);
    ctx.stroke();

    const rad = (angle * Math.PI) / 180;
    const tibLen = 95;
    const tx = jx - Math.sin(rad) * tibLen;
    const ty = jy + Math.cos(rad) * tibLen;

    ctx.strokeStyle = "#94B3D1";
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.moveTo(jx, jy);
    ctx.lineTo(tx, ty);
    ctx.stroke();

    const isLachman = angle >= 15 && angle <= 35;
    ctx.strokeStyle = isLachman ? "#D6AB62" : "#19BDE6";
    ctx.lineWidth = isLachman ? 5 : 3.5;
    ctx.beginPath();
    ctx.moveTo(jx + 6, jy - 8);
    ctx.lineTo(jx - Math.sin(rad) * 18 - 5, jy + Math.cos(rad) * 18);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(jx, jy, 10, 0, Math.PI * 2);
    ctx.fillStyle = isLachman ? "#D6AB62" : "#19BDE6";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(jx, jy, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#07182D";
    ctx.fill();

    ctx.fillStyle = "#19BDE6";
    ctx.font = "bold 12px Inter, sans-serif";
    ctx.fillText(`Flexion: ${angle}°`, 235, 36);
    ctx.fillStyle = "#D6AB62";
    ctx.fillText("ACL Vector", 235, 56);
    ctx.restore();
  }, [angle]);

  const cue =
    angle >= 15 && angle <= 35
      ? "اختبار Lachman المثالي (20°–30°): أقصى عزل لتوتر ACL"
      : angle >= 85 && angle <= 95
        ? "زاوية Anterior Drawer (90°): تأكد من ارتخاء Hamstrings"
        : `زاوية حركة ${angle}° — متابعة انزلاق اللقمتين (Roll & Glide)`;

  return (
    <section id="benefits" className="bg-navy text-white py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[420px] h-[420px] rounded-full bg-royal/20 blur-3xl pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-cyan text-xs font-bold font-en tracking-widest uppercase bg-cyan/10 px-3.5 py-1.5 rounded-full">
            WHAT YOU GET
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-4 leading-tight">
            ماذا تحصل عليه؟
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {ITEMS.map((it) => (
            <div key={it.n} className="glass-dark rounded-2xl p-6 md:p-7 hover:border-cyan/40 transition">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-en text-gold font-extrabold text-xl">{it.n}</span>
                <span className="font-en text-[11px] text-cyan/80 ltr">{it.tag}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{it.title}</h3>
              <p className="text-silver/85 leading-8 text-[15px]">{it.body}</p>
            </div>
          ))}

          <div className="md:col-span-2 glass-dark rounded-3xl p-6 md:p-8 border-cyan/30">
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-en text-gold font-extrabold text-xl">05</span>
                  <span className="font-en text-[11px] text-cyan ltr bg-cyan/15 px-2.5 py-0.5 rounded-full">
                    3D Motion Teaching
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3">شرح بتقنية 3D لأول مرة — جرّب الحركة بنفسك</h3>
                <p className="text-silver/85 leading-8 text-[15px] mb-5">
                  المحاضرات مشروحة بالكامل لأول مرة بتقنية 3D: تشوف التركيب والحركة والإصابة أمامك بدل الحفظ النظري. حرّك مؤشر زاوية الركبة لمحاكاة توتر الرباط الصليبي:
                </p>
                <div className="bg-navy/70 rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-silver/80">زاوية ثني الركبة (Knee Flexion)</span>
                    <span className="font-en font-bold text-cyan text-base ltr">{angle}°</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={120}
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full accent-[#19BDE6] cursor-pointer"
                  />
                  <p className="mt-3 text-xs text-gold font-semibold">{cue}</p>
                </div>
              </div>
              <div className="rounded-2xl bg-navy/90 border border-cyan/25 p-4 flex flex-col items-center">
                <canvas ref={canvasRef} width={360} height={230} className="w-full max-w-[360px] h-auto rounded-xl" />
                <p className="text-[11px] text-silver/60 mt-2 font-en ltr">Interactive Vector Kinematics Preview</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-2 text-center">نماذج حقيقية من الشرح بتقنية 3D</h3>
          <p className="text-silver/70 text-sm mb-8 text-center">
            مقتطفات مسجلة من أسلوب د. أشرف — شغّل أي فيديو وشاهد بنفسك.
          </p>
          <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {[
              { src: settings.demoVideo1, poster: "/videos/poster-acl-short.jpg", t: "ACL Injury — لمحة سريعة", d: "44 ثانية", en: "ACL tear mechanism — quick take" },
              { src: settings.demoVideo2, poster: "/videos/poster-acl-full.jpg", t: "شرح ACL بتقنية 3D — كامل", d: "4:30 دقيقة", en: "Full 3D knee anatomy walkthrough" },
            ].map((v) =>
              v.src ? (
                <figure key={v.src} className="rounded-2xl overflow-hidden border border-white/10 bg-black/30">
                  <div className="grid place-items-center p-3">
                    <video
                      controls
                      preload="none"
                      playsInline
                      poster={v.poster}
                      className="rounded-xl w-auto h-[380px] max-w-full"
                      src={v.src}
                    />
                  </div>
                  <figcaption className="p-4 border-t border-white/10">
                    <p className="font-semibold text-sm">{v.t}</p>
                    <p className="font-en text-[11px] text-cyan/90 ltr text-left mt-0.5">{v.en} · {v.d}</p>
                  </figcaption>
                </figure>
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
