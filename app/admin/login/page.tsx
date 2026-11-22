"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(
          data.error === "service_unavailable"
            ? "قاعدة البيانات غير مهيأة بعد. راجع إعدادات النشر."
            : "بيانات الدخول غير صحيحة أو غير مصرّح بها."
        );
      } else {
        router.replace("/admin");
      }
    } catch {
      setError("حدث خطأ. حاول مجددًا.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-navy grid place-items-center px-4 hero-grid">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-3xl p-8 card-shadow">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-royal to-cyan grid place-items-center text-white font-bold font-en text-sm">MIA</span>
          <div>
            <h1 className="font-bold text-navy">لوحة إدارة البرنامج</h1>
            <p className="text-xs text-navy/50">MIA Saudi PT — Admin</p>
          </div>
        </div>
        <label className="block text-sm font-semibold text-navy mb-1.5">البريد الإلكتروني</label>
        <input
          type="email"
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-silver px-4 py-3 text-sm mb-4 font-en focus:outline-none focus:ring-2 focus:ring-royal/40"
          placeholder="admin@example.com"
        />
        <label className="block text-sm font-semibold text-navy mb-1.5">كلمة المرور</label>
        <input
          type="password"
          dir="ltr"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-silver px-4 py-3 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-royal/40"
        />
        {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-royal text-white font-bold py-3.5 rounded-2xl hover:bg-navy transition disabled:opacity-60"
        >
          {loading ? "جارٍ الدخول..." : "دخول"}
        </button>
        <p className="mt-4 text-[11px] text-navy/45 text-center leading-5">
          الدخول مصرّح به لحساب إدارة البرنامج المعتمد فقط عبر مزود المصادقة الآمن.
        </p>
      </form>
    </main>
  );
}
