"use client";
import { useState } from "react";
import type { ProgramSettings } from "@/lib/program";
import { WaIcon } from "./RegisterForm";

export default function WhatsAppFloat({ settings }: { settings: ProgramSettings }) {
  const [open, setOpen] = useState(false);
  const base = `https://wa.me/${settings.whatsappSupport}`;
  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col items-start gap-3">
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border border-silver p-4 w-72">
          <p className="font-semibold text-navy text-sm mb-3">عندك استفسار؟ تواصل معنا</p>
          <a
            href={`${base}?text=${encodeURIComponent(settings.whatsappMessage)}`}
            target="_blank" rel="noopener noreferrer"
            className="block w-full text-center bg-[#25D366] text-white text-sm font-bold rounded-xl py-2.5 mb-2 hover:brightness-105 transition"
          >
            استفسار عن البرنامج
          </a>
          <a
            href={`${base}?text=${encodeURIComponent(settings.whatsappSampleMessage)}`}
            target="_blank" rel="noopener noreferrer"
            className="block w-full text-center border border-[#25D366] text-[#128C4B] text-sm font-bold rounded-xl py-2.5 hover:bg-[#25D366]/10 transition"
          >
            اطلب مشاهدة نموذج من الشرح
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-label="تواصل عبر واتساب"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-xl shadow-[#25D366]/30 hover:scale-105 transition"
      >
        <WaIcon />
      </button>
    </div>
  );
}
