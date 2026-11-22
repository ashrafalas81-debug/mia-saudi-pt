import { CURRICULUM } from "@/lib/program";

export default function Lectures() {
  return (
    <section id="curriculum" className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-royal text-sm font-bold font-en">10 LECTURES</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-4 leading-tight">
            عشر محاضرات. منهجك كامل.
          </h2>
          <p className="text-navy/70 text-lg leading-8">
            كل محاضرة ساعتان: شرح مركز، حالات إكلينيكية، وتدريب على أسئلة بنمط الاختبار.
            أول محاضرتين ضمن الأسبوع المجاني.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {CURRICULUM.map((d) => (
            <div
              key={d.day}
              className={`relative rounded-2xl border p-5 md:p-6 flex items-start gap-4 transition hover:shadow-lg ${
                d.free
                  ? "border-gold/60 bg-gradient-to-l from-gold/10 to-transparent"
                  : "border-navy/10 bg-silver/40"
              }`}
            >
              <span
                className={`shrink-0 w-12 h-12 rounded-2xl grid place-items-center font-en font-extrabold text-lg ${
                  d.free ? "bg-gold text-navy" : "bg-navy text-white"
                }`}
              >
                {String(d.day).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="font-bold text-base md:text-lg leading-7">{d.titleAr}</h3>
                <p className="font-en text-xs text-royal ltr text-left mt-1">{d.titleEn}</p>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="text-[11px] font-semibold text-navy/60 bg-navy/5 rounded-full px-2.5 py-1">
                    {d.topics.length} موضوعات
                  </span>
                  {d.free && (
                    <span className="text-[11px] font-bold text-navy bg-gold rounded-full px-2.5 py-1">
                      مجاني ضمن الأسبوع الأول
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
