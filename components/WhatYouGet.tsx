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
    body: "نحل معك حالات وأسئلة تدريبية مبنية على نمط أسئلة السنوات السابقة المستمدة من أهم الاختبارات (اختبارات وزارة الصحة، تقييمات التوظيف، واختبارات القبول والمقابلات) — محلولة ومراجعة ومنظمة في مكان واحد، بدل ما تتوه بين عشرات المصادر المتفرقة.",
    tag: "Past-Years Style Questions, One Place",
  },
  {
    n: "05",
    title: "شرح بتقنية 3D لأول مرة",
    body: "المحاضرات مشروحة بالكامل لأول مرة بتقنية 3D: تشوف التركيب والحركة والإصابة أمامك بدل الحفظ النظري. جرّب بنفسك من المقطعين هنا.",
    tag: "3D Motion Teaching",
  },
];

export default function WhatYouGet({ settings }: { settings: ProgramSettings }) {
  return (
    <section id="benefits" className="bg-navy text-white py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[420px] h-[420px] rounded-full bg-royal/20 blur-3xl" />
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-cyan text-sm font-bold font-en">WHAT YOU GET</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 leading-tight">
            ماذا تحصل عليه؟
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {ITEMS.map((it) => (
            <div
              key={it.n}
              className={`rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7 ${
                it.n === "05" ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-en text-gold font-extrabold text-xl">{it.n}</span>
                <span className="font-en text-[11px] text-cyan/80 ltr">{it.tag}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{it.title}</h3>
              <p className="text-silver/85 leading-8 text-[15px]">{it.body}</p>
            </div>
          ))}
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
