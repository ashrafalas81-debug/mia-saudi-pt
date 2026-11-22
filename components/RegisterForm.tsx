"use client";
import { useMemo, useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { COUNTRIES } from "@/lib/countries";
import { UNIVERSITIES } from "@/lib/universities";
import type { ProgramSettings } from "@/lib/program";

const ACADEMIC = [
  { v: "graduate", label: "خريج" },
  { v: "internship", label: "امتياز" },
  { v: "final_year", label: "طالب سنة نهائية" },
  { v: "other", label: "أخرى" },
];
const ATTENDANCE = [
  { v: "live", label: "حضور مباشر Live" },
  { v: "recorded", label: "متابعة التسجيلات Recorded" },
  { v: "both", label: "الاثنان مناسبان لي" },
];
const INTEREST = [
  { v: "scfhs", label: "اختبار التصنيف السعودي SCFHS" },
  { v: "recruitment", label: "تقييم التوظيف بالمستشفيات" },
  { v: "interviews", label: "المقابلات الإكلينيكية" },
  { v: "all", label: "كل ما سبق" },
];

const ERRORS: Record<string, string> = {
  invalid_name: "فضلًا أدخل الاسم الكامل.",
  invalid_university: "فضلًا اختر أو اكتب اسم الجامعة.",
  invalid_status: "فضلًا اختر الحالة الأكاديمية.",
  invalid_attendance: "فضلًا اختر طريقة متابعة المحاضرات.",
  invalid_interest: "فضلًا اختر مجال الاهتمام.",
  consent_required: "الموافقة على التواصل مطلوبة لإتمام التسجيل.",
  invalid_phone: "رقم الواتساب غير صحيح للدولة المختارة. راجع الرقم وحاول مجددًا.",
  too_many_requests: "محاولات كثيرة خلال وقت قصير. انتظر قليلًا وحاول مجددًا.",
  service_unavailable: "خدمة التسجيل غير متاحة مؤقتًا. جرّب لاحقًا أو تواصل معنا عبر واتساب.",
  server_error: "حدث خطأ غير متوقع. حاول مجددًا أو تواصل معنا عبر واتساب.",
};

export default function RegisterForm({ settings }: { settings: ProgramSettings }) {
  const [fullName, setFullName] = useState("");
  const [university, setUniversity] = useState("");
  const [uniQuery, setUniQuery] = useState("");
  const [uniOpen, setUniOpen] = useState(false);
  const [academic, setAcademic] = useState("");
  const [country, setCountry] = useState(COUNTRIES[0]); // Saudi default
  const [cQuery, setCQuery] = useState("");
  const [cOpen, setCOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [attendance, setAttendance] = useState("");
  const [interest, setInterest] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<null | { duplicate: boolean; message: string; startDate: string }>(null);

  const filteredCountries = useMemo(() => {
    const q = cQuery.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) => c.nameAr.includes(q) || c.nameEn.toLowerCase().includes(q) || c.dial.includes(q)
    );
  }, [cQuery]);

  const filteredUnis = useMemo(() => {
    const q = uniQuery.trim();
    if (!q) return UNIVERSITIES.slice(0, 30);
    return UNIVERSITIES.filter((u) => u.includes(q)).slice(0, 30);
  }, [uniQuery]);

  const phoneHint = useMemo(() => {
    if (!phone) return "";
    const p = parsePhoneNumberFromString(`+${country.dial}${phone.replace(/[^\d]/g, "")}`);
    if (p && p.isValid() && p.country === country.code) return p.number;
    return "";
  }, [phone, country]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (fullName.trim().length < 3) return setError(ERRORS.invalid_name);
    const uniFinal = university || uniQuery.trim();
    if (!uniFinal) return setError(ERRORS.invalid_university);
    if (!academic) return setError(ERRORS.invalid_status);
    if (!attendance) return setError(ERRORS.invalid_attendance);
    if (!interest) return setError(ERRORS.invalid_interest);
    if (!consent) return setError(ERRORS.consent_required);
    if (!phoneHint) return setError(ERRORS.invalid_phone);

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          university: uniFinal,
          academicStatus: academic,
          countryIso: country.code,
          countryDial: country.dial,
          phoneNational: phone,
          attendancePreference: attendance,
          programInterest: interest,
          consent,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(ERRORS[data.error] || ERRORS.server_error);
      } else {
        setDone({
          duplicate: Boolean(data.duplicate),
          message: data.confirmationMessage || settings.confirmationMessage,
          startDate: data.startDate || settings.startDate,
        });
      }
    } catch {
      setError(ERRORS.server_error);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <section id="register" className="bg-navy py-16 md:py-24">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 md:p-10 text-center card-shadow">
            <div className="w-16 h-16 mx-auto rounded-full bg-royal/10 grid place-items-center mb-5">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1457B8" strokeWidth="2.5">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-navy mb-3">تم استلام تسجيلك بنجاح!</h2>
            <p className="text-navy/70 leading-8 mb-6">{done.message}</p>
            <div className="bg-silver/60 rounded-2xl p-5 text-right space-y-2.5 text-sm mb-6">
              <Row k="البرنامج" v="MIA Saudi PT — 10-Day Program" en />
              <Row k="تاريخ البداية" v={formatDate(done.startDate)} />
              <Row k="حالة الرقم" v="بانتظار تأكيد الرقم" warn />
              <Row k="حالة التسجيل" v={done.duplicate ? "مسجل مسبقًا — تم تحديث بياناتك" : "تسجيل جديد مؤكد"} />
            </div>
            <a
              href={`https://wa.me/${settings.whatsappSupport}?text=${encodeURIComponent(settings.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-3.5 rounded-2xl hover:brightness-105 transition"
            >
              <WaIcon /> تواصل معنا عبر واتساب
            </a>
            <p className="mt-4 text-[11px] text-navy/50 leading-5">
              تأكيد رقم الواتساب عبر رسالة تحقق يُفعَّل عند اكتمال ربط مزود الرسائل الرسمي. لم تُرسل أي رسالة تلقائية بعد.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="bg-navy py-16 md:py-24 hero-grid">
      <div className="max-w-xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
            ابدأ الآن — سجّل مقعدك في التجربة المجانية
          </h2>
          <p className="text-silver/80 leading-7">
            أدخل بياناتك بشكل صحيح حتى تصلك تفاصيل المحاضرات وطريقة الانضمام إلى البرنامج.
          </p>
        </div>
        {!settings.registrationOpen ? (
          <div className="bg-white rounded-3xl p-8 text-center card-shadow">
            <p className="text-navy font-semibold text-lg mb-2">التسجيل مغلق حاليًا</p>
            <p className="text-navy/60 text-sm leading-7 mb-5">تُغلق إدارة البرنامج التسجيل عند اكتمال المقاعد. تواصل معنا لأي استفسار.</p>
            <a
              href={`https://wa.me/${settings.whatsappSupport}?text=${encodeURIComponent(settings.whatsappMessage)}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-2xl"
            >
              <WaIcon /> عندك استفسار؟ تواصل معنا
            </a>
          </div>
        ) : (
          <form onSubmit={submit} className="bg-white rounded-3xl p-6 md:p-8 card-shadow space-y-5">
            <Field label="الاسم الكامل" required>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="مثال: محمد عبدالله العتيبي"
                className="w-full rounded-xl border border-silver px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal/40"
              />
            </Field>

            <Field label="الجامعة" required>
              <div className="relative">
                <input
                  type="text"
                  value={university || uniQuery}
                  onChange={(e) => {
                    setUniversity("");
                    setUniQuery(e.target.value);
                    setUniOpen(true);
                  }}
                  onFocus={() => setUniOpen(true)}
                  onBlur={() => setTimeout(() => setUniOpen(false), 150)}
                  placeholder="ابحث عن جامعتك أو اكتب اسمها"
                  className="w-full rounded-xl border border-silver px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal/40"
                />
                {uniOpen && filteredUnis.length > 0 && (
                  <div className="absolute z-20 inset-x-0 top-full mt-1 bg-white border border-silver rounded-xl shadow-xl max-h-52 overflow-auto">
                    {filteredUnis.map((u) => (
                      <button
                        type="button"
                        key={u}
                        onMouseDown={() => {
                          setUniversity(u);
                          setUniOpen(false);
                        }}
                        className="w-full text-right px-4 py-2.5 text-sm hover:bg-silver/70"
                      >
                        {u}
                      </button>
                    ))}
                    {uniQuery.trim() && !UNIVERSITIES.includes(uniQuery.trim()) && (
                      <div className="px-4 py-2.5 text-xs text-navy/50 border-t border-silver">
                        جامعتك غير مدرجة؟ سيُحفظ ما كتبته كما هو.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Field>

            <Field label="الحالة الأكاديمية" required>
              <div className="grid grid-cols-2 gap-2">
                {ACADEMIC.map((o) => (
                  <Radio key={o.v} name="academic" checked={academic === o.v} onChange={() => setAcademic(o.v)} label={o.label} />
                ))}
              </div>
            </Field>

            <Field label="رقم الواتساب" required>
              <div className="flex gap-2" dir="ltr">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCOpen(!cOpen)}
                    className="h-full flex items-center gap-1.5 rounded-xl border border-silver px-3 py-3 text-sm bg-white min-w-[104px] justify-center"
                  >
                    <span>{country.flag}</span>
                    <span className="font-en">+{country.dial}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {cOpen && (
                    <div className="absolute z-20 left-0 top-full mt-1 w-64 bg-white border border-silver rounded-xl shadow-xl" dir="rtl">
                      <input
                        autoFocus
                        type="text"
                        value={cQuery}
                        onChange={(e) => setCQuery(e.target.value)}
                        placeholder="ابحث عن الدولة"
                        className="w-full px-4 py-2.5 text-sm border-b border-silver focus:outline-none rounded-t-xl"
                      />
                      <div className="max-h-52 overflow-auto">
                        {filteredCountries.map((c) => (
                          <button
                            type="button"
                            key={c.code + c.dial}
                            onClick={() => {
                              setCountry(c);
                              setCOpen(false);
                              setCQuery("");
                            }}
                            className="w-full text-right px-4 py-2.5 text-sm hover:bg-silver/70 flex items-center gap-2"
                          >
                            <span>{c.flag}</span>
                            <span className="flex-1">{c.nameAr}</span>
                            <span className="font-en text-navy/50 text-xs ltr">+{c.dial}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <input
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ""))}
                  placeholder="5XXXXXXXX"
                  className="flex-1 rounded-xl border border-silver px-4 py-3 text-sm font-en focus:outline-none focus:ring-2 focus:ring-royal/40"
                />
              </div>
              {phone && (
                <p className={`mt-1.5 text-xs ltr text-left font-en ${phoneHint ? "text-green-600" : "text-amber-600"}`}>
                  {phoneHint ? phoneHint : "أكمل الرقم للتحقق من صيغته"}
                </p>
              )}
            </Field>

            <Field label="كيف تفضّل تتابع المحاضرات؟" required>
              <div className="grid grid-cols-1 gap-2">
                {ATTENDANCE.map((o) => (
                  <Radio key={o.v} name="attendance" checked={attendance === o.v} onChange={() => setAttendance(o.v)} label={o.label} />
                ))}
              </div>
            </Field>

            <Field label="ما الذي تستعد له؟" required>
              <div className="grid grid-cols-1 gap-2">
                {INTEREST.map((o) => (
                  <Radio key={o.v} name="interest" checked={interest === o.v} onChange={() => setInterest(o.v)} label={o.label} />
                ))}
              </div>
            </Field>

            <label className="flex items-start gap-3 text-sm text-navy/75 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#1457B8]"
              />
              <span>
                أوافق على استخدام بيانات التسجيل للتواصل معي بخصوص البرنامج عبر واتساب ووسائل التواصل
                المعتمدة، وفق <a href="/privacy" target="_blank" className="text-royal font-semibold underline underline-offset-2">سياسة الخصوصية</a>.
              </span>
            </label>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-navy font-bold py-4 rounded-2xl hover:brightness-110 transition disabled:opacity-60 shadow-lg shadow-gold/20"
            >
              {loading ? "جارٍ التسجيل..." : "سجّل الآن في التجربة المجانية"}
            </button>
            <p className="text-[11px] text-navy/50 leading-5 text-center">
              يُحفظ رقمك بالصيغة الدولية بعد التحقق من صحتها. تفعيل التحقق برسالة واتساب يتم عند ربط
              مزود الرسائل الرسمي — لن ندّعي تأكيد رقمك قبل ذلك.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-navy mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function Radio({ name, checked, onChange, label }: { name: string; checked: boolean; onChange: () => void; label: string }) {
  return (
    <label
      className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm cursor-pointer transition ${
        checked ? "border-royal bg-royal/5 text-navy font-semibold" : "border-silver hover:border-royal/40 text-navy/75"
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="w-4 h-4 accent-[#1457B8]" />
      {label}
    </label>
  );
}

function Row({ k, v, en, warn }: { k: string; v: string; en?: boolean; warn?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-navy/55">{k}</span>
      <span className={`font-semibold ${en ? "font-en ltr" : ""} ${warn ? "text-amber-600" : "text-navy"}`}>{v}</span>
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("ar-SA", { day: "numeric", month: "long", year: "numeric" }).format(
      new Date(iso + "T12:00:00")
    );
  } catch {
    return iso;
  }
}

export function WaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.13 15.07l-.3-.18-3.06.88.9-2.98-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.2 4.02c-.18 0-.47.07-.72.34-.24.27-.94.92-.94 2.24s.96 2.6 1.1 2.78c.13.18 1.88 3.02 4.65 4.11 2.3.9 2.77.72 3.27.68.5-.05 1.6-.66 1.83-1.29.22-.63.22-1.17.15-1.29-.06-.11-.24-.18-.5-.31-.27-.14-1.6-.8-1.85-.88-.25-.1-.43-.14-.61.13-.18.27-.7.88-.85 1.06-.16.18-.31.2-.58.07a7.4 7.4 0 0 1-2.2-1.36 8.2 8.2 0 0 1-1.51-1.88c-.16-.27 0-.42.12-.55.12-.12.27-.31.4-.47.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.14-.6-1.5-.85-2.02-.22-.47-.45-.5-.63-.5h-.52Z" />
    </svg>
  );
}
