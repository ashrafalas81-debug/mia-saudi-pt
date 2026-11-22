import type { ProgramSettings } from "@/lib/program";

export function Footer({ settings }: { settings: ProgramSettings }) {
  return (
    <footer className="bg-navy text-silver/70 border-t border-white/10 py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-royal to-cyan grid place-items-center text-white font-bold font-en text-sm">
            MIA
          </span>
          <div>
            <p className="text-white font-semibold text-sm">{settings.instructorAr}</p>
            <p className="text-xs font-en ltr">MIA Saudi PT — 10-Day Intensive Preparation Program</p>
          </div>
        </div>
        <p className="text-xs text-center leading-6">
          Medical Intelligence Academy © 2026 — برنامج تدريبي مستقل، لا يمثل اعتمادًا رسميًا من أي جهة اختبار.
        </p>
      </div>
    </footer>
  );
}
