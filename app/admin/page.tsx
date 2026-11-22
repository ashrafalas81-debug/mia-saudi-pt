"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface Reg {
  id: string;
  full_name: string;
  university: string;
  academic_status: string;
  country_iso: string;
  phone_e164: string;
  whatsapp_verified: boolean;
  attendance_preference: string;
  program_interest: string;
  enrollment_status: string;
  admin_notes: string | null;
  created_at: string;
}
interface Stats {
  total: number; verified: number; pendingVerification: number;
  live: number; recorded: number; both: number;
  byCountry: Record<string, number>; byUniversity: Record<string, number>;
}
const AR_STATUS: Record<string, string> = {
  graduate: "خريج", internship: "امتياز", final_year: "سنة نهائية", other: "أخرى",
};
const AR_PREF: Record<string, string> = { live: "مباشر", recorded: "مسجل", both: "كلاهما" };
const AR_INTEREST: Record<string, string> = {
  scfhs: "SCFHS", recruitment: "توظيف", interviews: "مقابلات", all: "الكل",
};
const AR_ENROLL: Record<string, string> = {
  registered: "مسجل", contacted: "تم التواصل", confirmed: "مؤكد", enrolled: "ملتحق",
};
const ENROLL_COLORS: Record<string, string> = {
  registered: "bg-silver text-navy",
  contacted: "bg-cyan/15 text-royal",
  confirmed: "bg-gold/20 text-navy",
  enrolled: "bg-green-100 text-green-800",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [regs, setRegs] = useState<Reg[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [fInterest, setFInterest] = useState("");
  const [fEnroll, setFEnroll] = useState("");
  const [tab, setTab] = useState<"students" | "settings">("students");
  const [settings, setSettings] = useState<Record<string, unknown> | null>(null);
  const [integNote, setIntegNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const sp = new URLSearchParams();
    if (search) sp.set("search", search);
    if (fStatus) sp.set("academicStatus", fStatus);
    if (fInterest) sp.set("interest", fInterest);
    if (fEnroll) sp.set("enrollment", fEnroll);
    const res = await fetch("/api/admin/registrations?" + sp.toString());
    if (res.status === 401) return router.replace("/admin/login");
    const data = await res.json();
    setRegs(data.registrations || []);
    setStats(data.stats || null);
    setLoading(false);
  }, [search, fStatus, fInterest, fEnroll, router]);

  const loadSettings = useCallback(async () => {
    const res = await fetch("/api/admin/settings");
    if (res.status === 401) return router.replace("/admin/login");
    const data = await res.json();
    setSettings(data.settings);
    setIntegNote(data.integrations?.whatsappOtp?.note || "");
  }, [router]);

  useEffect(() => { load(); loadSettings(); }, [load, loadSettings]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  async function patchReg(id: string, patch: Record<string, unknown>) {
    await fetch("/api/admin/registrations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    load();
  }

  async function saveSettings() {
    if (!settings) return;
    setSaving(true); setSavedMsg("");
    const editable: Record<string, unknown> = {};
    for (const k of ["startDate","sessionTimes","freeLectureDates","registrationOpen","descriptionExtra","price","whatsappSupport","confirmationMessage","seatsNote","demoVideo1","demoVideo2"]) {
      editable[k] = settings[k];
    }
    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editable),
    });
    const data = await res.json();
    if (data.ok) { setSettings(data.settings); setSavedMsg("تم الحفظ — التعديلات محفوظة في قاعدة البيانات."); }
    else setSavedMsg("فشل الحفظ: " + (data.error || ""));
    setSaving(false);
  }

  const topCountries = useMemo(() => stats ? Object.entries(stats.byCountry).sort((a, b) => b[1] - a[1]).slice(0, 8) : [], [stats]);
  const topUnis = useMemo(() => stats ? Object.entries(stats.byUniversity).sort((a, b) => b[1] - a[1]).slice(0, 8) : [], [stats]);

  return (
    <main className="min-h-screen bg-silver/50">
      <header className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-royal to-cyan grid place-items-center font-bold font-en text-xs">MIA</span>
            <div>
              <p className="font-bold text-sm">لوحة إدارة MIA Saudi PT</p>
              <p className="text-[11px] text-silver/60">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" className="text-xs text-silver/80 hover:text-cyan transition px-3 py-2">عرض الصفحة</a>
            <button onClick={logout} className="text-xs bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 transition">خروج</button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 flex gap-2 pb-3">
          {(["students", "settings"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-sm rounded-xl px-4 py-2 transition ${tab === t ? "bg-gold text-navy font-bold" : "text-silver hover:bg-white/10"}`}
            >
              {t === "students" ? "المسجلون" : "إعدادات البرنامج"}
            </button>
          ))}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {tab === "students" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
              <Stat label="إجمالي التسجيلات" v={stats?.total} />
              <Stat label="موثق واتساب" v={stats?.verified} />
              <Stat label="بانتظار تأكيد الرقم" v={stats?.pendingVerification} amber />
              <Stat label="يفضل مباشر" v={stats?.live} />
              <Stat label="يفضل مسجل" v={stats?.recorded} />
              <Stat label="كلاهما" v={stats?.both} />
            </div>

            <div className="grid md:grid-cols-2 gap-3 mb-6">
              <div className="bg-white rounded-2xl border border-silver p-4">
                <p className="font-semibold text-sm mb-3">التوزيع حسب الدولة</p>
                {topCountries.length === 0 && <p className="text-xs text-navy/45">لا توجد تسجيلات بعد.</p>}
                {topCountries.map(([k, n]) => (
                  <div key={k} className="flex items-center gap-2 mb-1.5 text-sm">
                    <span className="font-en w-10 text-navy/60">{k}</span>
                    <div className="flex-1 h-2 bg-silver rounded-full overflow-hidden">
                      <div className="h-full bg-royal rounded-full" style={{ width: `${stats ? (n / stats.total) * 100 : 0}%` }} />
                    </div>
                    <span className="w-6 text-left font-en text-xs">{n}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl border border-silver p-4">
                <p className="font-semibold text-sm mb-3">أكثر الجامعات</p>
                {topUnis.length === 0 && <p className="text-xs text-navy/45">لا توجد تسجيلات بعد.</p>}
                {topUnis.map(([k, n]) => (
                  <div key={k} className="flex items-center gap-2 mb-1.5 text-sm">
                    <span className="flex-1 truncate text-navy/70">{k}</span>
                    <span className="font-en text-xs bg-silver rounded px-1.5 py-0.5">{n}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-silver p-4 mb-4">
              <div className="flex flex-wrap gap-2 items-center">
                <input
                  type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="ابحث بالاسم أو الرقم أو الجامعة"
                  className="flex-1 min-w-[220px] rounded-xl border border-silver px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-royal/40"
                />
                <select value={fStatus} onChange={(e) => setFStatus(e.target.value)} className="rounded-xl border border-silver px-3 py-2.5 text-sm">
                  <option value="">كل الحالات الأكاديمية</option>
                  {Object.entries(AR_STATUS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
                <select value={fInterest} onChange={(e) => setFInterest(e.target.value)} className="rounded-xl border border-silver px-3 py-2.5 text-sm">
                  <option value="">كل الاهتمامات</option>
                  {Object.entries(AR_INTEREST).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
                <select value={fEnroll} onChange={(e) => setFEnroll(e.target.value)} className="rounded-xl border border-silver px-3 py-2.5 text-sm">
                  <option value="">كل حالات القبول</option>
                  {Object.entries(AR_ENROLL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
                <button onClick={load} className="bg-royal text-white text-sm font-bold rounded-xl px-5 py-2.5 hover:bg-navy transition">تصفية</button>
                <a href="/api/admin/export" className="border border-royal text-royal text-sm font-bold rounded-xl px-5 py-2.5 hover:bg-royal/5 transition">
                  تصدير CSV
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-silver overflow-hidden">
              {loading ? (
                <p className="p-8 text-center text-navy/50 text-sm">جارٍ التحميل...</p>
              ) : regs.length === 0 ? (
                <p className="p-8 text-center text-navy/50 text-sm">لا توجد تسجيلات مطابقة بعد. شارك رابط الصفحة لبدء استقبال الطلاب.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[900px]">
                    <thead className="bg-silver/70 text-navy/70 text-xs">
                      <tr>
                        <th className="text-right px-4 py-3">الطالب</th>
                        <th className="text-right px-4 py-3">الجامعة</th>
                        <th className="text-right px-4 py-3">الحالة</th>
                        <th className="text-right px-4 py-3">واتساب</th>
                        <th className="text-right px-4 py-3">المتابعة</th>
                        <th className="text-right px-4 py-3">الاهتمام</th>
                        <th className="text-right px-4 py-3">القبول</th>
                        <th className="text-right px-4 py-3">ملاحظات</th>
                        <th className="text-right px-4 py-3">التاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {regs.map((r) => (
                        <tr key={r.id} className="border-t border-silver align-top">
                          <td className="px-4 py-3">
                            <p className="font-semibold text-navy">{r.full_name}</p>
                            <p className="font-en text-xs text-navy/50 ltr" dir="ltr">{r.phone_e164}</p>
                          </td>
                          <td className="px-4 py-3 text-navy/70 max-w-[180px] truncate">{r.university}</td>
                          <td className="px-4 py-3 text-navy/70">{AR_STATUS[r.academic_status] || r.academic_status}</td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col gap-1.5">
                              <span className={`text-[11px] rounded-full px-2 py-0.5 w-fit ${r.whatsapp_verified ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                                {r.whatsapp_verified ? "موثق" : "بانتظار التأكيد"}
                              </span>
                              <a
                                href={`https://wa.me/${r.phone_e164.replace("+", "")}`}
                                target="_blank" rel="noopener noreferrer"
                                className="text-[11px] text-royal hover:underline"
                              >
                                فتح محادثة واتساب
                              </a>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-navy/70">{AR_PREF[r.attendance_preference] || r.attendance_preference}</td>
                          <td className="px-4 py-3 text-navy/70">{AR_INTEREST[r.program_interest] || r.program_interest}</td>
                          <td className="px-4 py-3">
                            <select
                              value={r.enrollment_status}
                              onChange={(e) => patchReg(r.id, { enrollmentStatus: e.target.value })}
                              className={`text-[11px] rounded-lg px-2 py-1.5 border-0 cursor-pointer ${ENROLL_COLORS[r.enrollment_status] || "bg-silver"}`}
                            >
                              {Object.entries(AR_ENROLL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              defaultValue={r.admin_notes || ""}
                              placeholder="ملاحظة خاصة"
                              onBlur={(e) => {
                                if (e.target.value !== (r.admin_notes || "")) patchReg(r.id, { adminNotes: e.target.value });
                              }}
                              className="w-40 rounded-lg border border-silver px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-royal/40"
                            />
                          </td>
                          <td className="px-4 py-3 text-navy/50 text-xs font-en ltr whitespace-nowrap" dir="ltr">
                            {new Date(r.created_at).toLocaleDateString("en-GB")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {tab === "settings" && settings && (
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-silver p-5 space-y-4">
              <h3 className="font-bold">إعدادات البرنامج</h3>
              <SField label="تاريخ بداية البرنامج">
                <input type="date" value={String(settings.startDate || "")} onChange={(e) => setSettings({ ...settings, startDate: e.target.value })}
                  className="w-full rounded-xl border border-silver px-4 py-2.5 text-sm font-en ltr" />
              </SField>
              <SField label="مواعيد الجلسات (نص حر يظهر للإدارة ويُعلن للطلاب)">
                <input type="text" value={String(settings.sessionTimes || "")} onChange={(e) => setSettings({ ...settings, sessionTimes: e.target.value })}
                  placeholder="مثال: الأحد والثلاثاء والخميس 8:00 مساءً بتوقيت الرياض"
                  className="w-full rounded-xl border border-silver px-4 py-2.5 text-sm" />
              </SField>
              <SField label="موعدا المحاضرتين المجانيتين">
                <input type="text" value={String(settings.freeLectureDates || "")} onChange={(e) => setSettings({ ...settings, freeLectureDates: e.target.value })}
                  placeholder="مثال: 26 و29 نوفمبر"
                  className="w-full rounded-xl border border-silver px-4 py-2.5 text-sm" />
              </SField>
              <SField label="سعر الاشتراك (يُترك فارغًا حتى يُعلن رسميًا)">
                <input type="text" value={String(settings.price || "")} onChange={(e) => setSettings({ ...settings, price: e.target.value || null })}
                  placeholder="لم يُعلن بعد"
                  className="w-full rounded-xl border border-silver px-4 py-2.5 text-sm" />
              </SField>
              <SField label="نص المقاعد">
                <input type="text" value={String(settings.seatsNote || "")} onChange={(e) => setSettings({ ...settings, seatsNote: e.target.value })}
                  className="w-full rounded-xl border border-silver px-4 py-2.5 text-sm" />
              </SField>
              <SField label="رقم دعم واتساب (بالصيغة الدولية بدون +)">
                <input type="text" dir="ltr" value={String(settings.whatsappSupport || "")} onChange={(e) => setSettings({ ...settings, whatsappSupport: e.target.value })}
                  className="w-full rounded-xl border border-silver px-4 py-2.5 text-sm font-en" />
              </SField>
              <SField label="رسالة تأكيد التسجيل">
                <textarea rows={3} value={String(settings.confirmationMessage || "")} onChange={(e) => setSettings({ ...settings, confirmationMessage: e.target.value })}
                  className="w-full rounded-xl border border-silver px-4 py-2.5 text-sm" />
              </SField>
              <SField label="رابط فيديو الشرح 1 (قصير — ACL)">
                <input type="text" dir="ltr" value={String(settings.demoVideo1 || "")} onChange={(e) => setSettings({ ...settings, demoVideo1: e.target.value })}
                  placeholder="/videos/demo-acl-short.mp4"
                  className="w-full rounded-xl border border-silver px-4 py-2.5 text-sm font-en" />
              </SField>
              <SField label="رابط فيديو الشرح 2 (كامل — شرح ACL بتقنية 3D)">
                <input type="text" dir="ltr" value={String(settings.demoVideo2 || "")} onChange={(e) => setSettings({ ...settings, demoVideo2: e.target.value })}
                  placeholder="/videos/demo-acl-full.mp4"
                  className="w-full rounded-xl border border-silver px-4 py-2.5 text-sm font-en" />
              </SField>
              <label className="flex items-center gap-3 text-sm font-semibold">
                <input type="checkbox" checked={Boolean(settings.registrationOpen)} onChange={(e) => setSettings({ ...settings, registrationOpen: e.target.checked })}
                  className="w-4 h-4 accent-[#1457B8]" />
                التسجيل مفتوح
              </label>
              <div className="flex items-center gap-3 pt-2">
                <button onClick={saveSettings} disabled={saving}
                  className="bg-royal text-white font-bold text-sm rounded-xl px-6 py-2.5 hover:bg-navy transition disabled:opacity-60">
                  {saving ? "جارٍ الحفظ..." : "حفظ الإعدادات"}
                </button>
                {savedMsg && <p className="text-xs text-green-700">{savedMsg}</p>}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-silver p-5">
                <h3 className="font-bold mb-3">حالة التكاملات</h3>
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm font-semibold text-amber-900 mb-1">التحقق من واتساب (OTP) — غير مهيأ</p>
                  <p className="text-xs text-amber-800 leading-6">{integNote}</p>
                  <p className="text-xs text-amber-800 leading-6 mt-2 font-en ltr" dir="ltr">
                    Required: WhatsApp Business Platform credentials (phone number ID + access token) or a verified OTP provider.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-silver p-5">
                <h3 className="font-bold mb-2">المواد المطلوب إضافتها</h3>
                <ul className="text-sm text-navy/70 space-y-2 leading-7">
                  <li>• لقطات/فيديوهات الشرح الأصلية بتقنية 3D (فلاير دورة Anatomy &amp; Biomechanics ولقطات المحاضرات).</li>
                  <li>• الصورة الرسمية لد. أشرف لقسم المحاضر.</li>
                  <li>• رابط التطبيق المرافق عند إطلاقه.</li>
                  <li>• روابط قنوات المحاضرات (Zoom/Meet) لتوزيعها على المسجلين.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function Stat({ label, v, amber }: { label: string; v?: number; amber?: boolean }) {
  return (
    <div className="bg-white rounded-2xl border border-silver p-4">
      <p className="text-[11px] text-navy/55 mb-1">{label}</p>
      <p className={`font-en text-2xl font-bold ${amber ? "text-amber-600" : "text-navy"}`}>{v ?? "—"}</p>
    </div>
  );
}

function SField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-navy/70 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
