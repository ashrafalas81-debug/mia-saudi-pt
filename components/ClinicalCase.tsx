"use client";
import { useState } from "react";

// Original educational demo content (shoulder impingement), clearly labeled.
const STEPS = [
  {
    key: "presentation",
    label: "العرض الإكلينيكي",
    en: "Patient Presentation",
    body: "مريض يبلغ 42 عامًا، ألم أمامي-جانبي بالكتف الأيمن منذ 3 أشهر، يزداد مع الرفع فوق مستوى الرأس والنوم على الجانب المصاب. يعمل مدرسًا ويمارس السباحة أسبوعيًا.",
  },
  {
    key: "assessment",
    label: "التقييم",
    en: "Assessment",
    body: "ألم عند الـpainful arc بين 60-120 درجة. اختبار Neer وHawkins-Kennedy إيجابيان. قوة الـsupraspinatus ضعيفة مع ألم (اختبار empty can). لا توجد علامات عصبية رقبية.",
  },
  {
    key: "diagnosis",
    label: "التشخيص",
    en: "Diagnosis",
    body: "الصورة تتوافق مع Subacromial Pain Syndrome (متلازمة احتكاك تحت الأخرم) مع اعتلال وتر الـsupraspinatus. التشخيص التفريقي يشمل الـcervical radiculopathy والـfrozen shoulder، وقد استُبعدا بالفحص.",
  },
  {
    key: "treatment",
    label: "خطة العلاج",
    en: "Treatment Plan",
    body: "تعديل النشاط مؤقتًا، تمارين تقوية تدريجية للـrotator cuff والـscapular stabilizers، تمارين إطالة للكبسولة الخلفية، وتثقيف المريض حول وضعيات العمل والنوم، مع إعادة تقييم بعد 4 أسابيع.",
  },
  {
    key: "exam",
    label: "زاوية الاختبار",
    en: "Exam Explanation",
    body: "في أسئلة SCFHS يُختبر التمييز بين الـimpingement والـrotator cuff tear: الألم مع القوة المحفوظة نسبيًا يرجّح الـimpingement، بينما الضعف الواضح مع positive drop arm يرجّح الـtear الكامل.",
  },
];

export default function ClinicalCase() {
  const [i, setI] = useState(0);
  const s = STEPS[i];
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-royal text-sm font-semibold">نموذج تعليمي</span>
          <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-4">جرّب طريقة تحليل الحالات الإكلينيكية</h2>
          <p className="text-navy/70 leading-8">
            مثال تعليمي مصغر بمحتوى أصلي يوضح أسلوب البرنامج: من العرض الإكلينيكي حتى زاوية سؤال الاختبار.
          </p>
        </div>
        <div className="bg-navy rounded-3xl p-6 md:p-10 text-white card-shadow">
          <div className="flex flex-wrap gap-2 mb-6">
            {STEPS.map((st, idx) => (
              <button
                key={st.key}
                onClick={() => setI(idx)}
                className={`text-xs md:text-sm rounded-full px-4 py-2 border transition ${
                  idx === i ? "bg-cyan text-navy border-cyan font-bold" : "border-white/20 text-silver hover:border-cyan/60"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
          <div className="min-h-[160px]">
            <p className="font-en text-cyan text-sm ltr text-left mb-2">{s.en}</p>
            <p className="leading-8 text-silver">{s.body}</p>
          </div>
          <div className="flex items-center justify-between mt-6">
            <span className="text-[11px] text-silver/50">محتوى تعليمي توضيحي — ليس نصيحة طبية</span>
            <div className="flex gap-2">
              <button
                onClick={() => setI(Math.max(0, i - 1))}
                disabled={i === 0}
                className="px-4 py-2 rounded-lg border border-white/20 text-sm disabled:opacity-30 hover:border-cyan transition"
              >
                السابق
              </button>
              <button
                onClick={() => setI(Math.min(STEPS.length - 1, i + 1))}
                disabled={i === STEPS.length - 1}
                className="px-4 py-2 rounded-lg bg-royal text-sm disabled:opacity-30 hover:bg-cyan hover:text-navy transition"
              >
                التالي
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
