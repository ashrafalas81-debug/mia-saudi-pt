import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | MIA Saudi PT",
  description: "سياسة الخصوصية لبرنامج MIA Saudi PT — ما البيانات التي نجمعها ولماذا وكيف نستخدمها.",
};

const WA = "https://wa.me/201141999069";

export default function PrivacyPage() {
  return (
    <main className="bg-silver/50 min-h-screen py-14">
      <div className="max-w-3xl mx-auto px-4">
        <Link href="/" className="text-royal font-semibold text-sm hover:underline">
          → العودة إلى الصفحة الرئيسية
        </Link>

        <h1 className="text-3xl md:text-4xl font-extrabold text-navy mt-6 mb-2">سياسة الخصوصية</h1>
        <p className="text-navy/60 text-sm mb-10">آخر تحديث: نوفمبر 2026 — برنامج MIA Saudi PT من Medical Intelligence Academy</p>

        <div className="space-y-8 text-navy/85 leading-8">
          <section>
            <h2 className="text-xl font-bold text-navy mb-2">ما البيانات التي نجمعها؟</h2>
            <p>عند التسجيل في البرنامج عبر هذا الموقع نطلب منك فقط:</p>
            <ul className="list-disc pr-6 mt-2 space-y-1">
              <li>الاسم الكامل</li>
              <li>الجامعة</li>
              <li>الحالة الأكاديمية (طالب / خريج)</li>
              <li>رقم الواتساب</li>
              <li>تفضيلك في متابعة المحاضرات (مباشر أو مسجل)</li>
              <li>ما الذي تستعد له (هدفك من البرنامج)</li>
            </ul>
            <p className="mt-2">لا نجمع أي بيانات دفع عبر هذا الموقع، ولا نستخدم ملفات تعريف ارتباط للتتبع الإعلاني.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-2">لماذا نجمع هذه البيانات؟</h2>
            <ul className="list-disc pr-6 space-y-1">
              <li>تسجيلك في البرنامج وتنظيم المقاعد والأسبوع التجريبي المجاني.</li>
              <li>التواصل معك بخصوص البرنامج عبر واتساب ووسائل التواصل المعتمدة: مواعيد المحاضرات، الروابط، والتحديثات.</li>
              <li>متابعة حالة تسجيلك والرد على استفساراتك.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-2">أين تُحفظ بياناتك ومن يصل إليها؟</h2>
            <p>
              تُحفظ بيانات التسجيل في قاعدة بيانات آمنة (Supabase). الوصول إليها مقصور على إدارة البرنامج
              (د. أشرف علاء مصطفى) عبر لوحة تحكم محمية بحساب وكلمة مرور.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-2">هل نشارك بياناتك مع أحد؟</h2>
            <p>
              لا نبيع بياناتك ولا نشاركها مع أي طرف ثالث لأغراض تسويقية. تتم معالجة البيانات فقط عبر مزوّدي
              الخدمة الذين يشغّلون الموقع وقاعدة البيانات (Vercel للاستضافة، وSupabase لقاعدة البيانات)،
              وبالقدر اللازم لتشغيل الخدمة.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-2">كم نحتفظ ببياناتك؟</h2>
            <p>
              نحتفظ ببيانات التسجيل طالما كان ذلك لازمًا لإدارة البرنامج والتواصل معك بشأنه. يمكنك طلب حذف
              بياناتك في أي وقت كما هو موضح أدناه.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-2">حقوقك</h2>
            <p>
              يمكنك في أي وقت طلب تصحيح بياناتك أو حذفها نهائيًا من سجلاتنا. راسلنا عبر واتساب على{" "}
              <a href={WA} target="_blank" rel="noreferrer" className="text-royal font-semibold hover:underline ltr inline-block">
                +20 114 199 9069
              </a>{" "}
              وسننفذ طلبك.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-2">التغييرات على هذه السياسة</h2>
            <p>إذا حدّثنا هذه الصفحة سنغيّر تاريخ "آخر تحديث" أعلاه.</p>
          </section>
        </div>

        <hr className="my-12 border-navy/10" />

        <div dir="ltr" className="space-y-6 text-navy/80 leading-7 font-en text-sm">
          <h2 className="text-2xl font-extrabold text-navy">Privacy Policy (English summary)</h2>
          <p>Last updated: November 2026 — MIA Saudi PT, Medical Intelligence Academy.</p>
          <p>
            <strong>What we collect:</strong> full name, university, academic status, WhatsApp number,
            lecture-attendance preference, and your program goal. We do not collect payment data on this
            site and do not use advertising trackers.
          </p>
          <p>
            <strong>Why:</strong> to register you, organize seats and the free trial week, and contact you
            about the program (schedules, links, updates) via WhatsApp and approved channels.
          </p>
          <p>
            <strong>Storage and access:</strong> registrations are stored in a secure Supabase database,
            accessible only to program administration (Dr. Ashraf Alaa Mostafa) through a password-protected
            dashboard.
          </p>
          <p>
            <strong>Sharing:</strong> we never sell or share your data for third-party marketing. Data is
            processed only by the providers that run this service (Vercel hosting, Supabase database) as
            needed to operate it.
          </p>
          <p>
            <strong>Retention and your rights:</strong> we keep your registration as long as needed to run
            the program and contact you about it. You may request correction or permanent deletion at any
            time via WhatsApp at{" "}
            <a href={WA} target="_blank" rel="noreferrer" className="text-royal font-semibold hover:underline">
              +20 114 199 9069
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
