import type { ProgramSettings } from "@/lib/program";

export default function FreeWeek({ settings }: { settings: ProgramSettings }) {
  const wa = `https://wa.me/${settings.whatsappSupport}?text=${encodeURIComponent(settings.whatsappMessage)}`;
  return (
    <section id="free-week" className="bg-gradient-to-b from-royal to-navy text-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <span className="inline-block bg-gold text-navy text-sm font-extrabold rounded-full px-5 py-2">
          المفاجأة
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-6 leading-tight">
          الأسبوع الأول مجاني بالكامل
        </h2>
        <p className="mt-5 text-lg md:text-xl text-silver leading-9 max-w-2xl mx-auto">
          احضر أول محاضرتين مجانًا — مباشرة على Zoom، والتسجيل متاح لو فاتتك —
          مع متابعة شخصية من د. أشرف من أول يوم. جرّب طريقة الشرح بنفسك قبل أي التزام.
        </p>

        <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
          <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
            <p className="font-en text-cyan font-bold text-sm ltr">Zoom Live</p>
            <p className="mt-1 font-semibold">حضور مباشر</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
            <p className="font-en text-cyan font-bold text-sm ltr">Recorded</p>
            <p className="mt-1 font-semibold">والتسجيل متاح بعدها</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
            <p className="font-en text-cyan font-bold text-sm ltr">1:1 Follow-up</p>
            <p className="mt-1 font-semibold">متابعة يومية من الدكتور</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#register"
            className="w-full sm:w-auto bg-gold text-navy text-lg font-bold px-10 py-4 rounded-2xl hover:brightness-110 transition shadow-lg shadow-navy/40"
          >
            سجّل الآن
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] text-navy text-lg font-bold px-10 py-4 rounded-2xl hover:brightness-105 transition"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.2-.3.3-.5v-.5c0-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.1c0 1.3.9 2.5 1 2.6a15 15 0 0 0 5.8 5.1c.8.4 1.4.6 1.9.8.8.2 1.5.2 2.1.1.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.6-.3Z" />
            </svg>
            اسألنا على واتساب
          </a>
        </div>

        <p className="mt-6 text-sm text-silver/85">
          يبدأ البرنامج <span className="text-white font-bold">الخميس ٢٦ نوفمبر ٢٠٢٦</span> · مقاعد محدودة للأسبوع المجاني
        </p>
      </div>
    </section>
  );
}
