import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Lectures from "@/components/Lectures";
import WhatYouGet from "@/components/WhatYouGet";
import AppShowcase from "@/components/AppShowcase";
import FreeWeek from "@/components/FreeWeek";
import RegisterForm from "@/components/RegisterForm";
import { TargetExams, InstructorBio, Footer } from "@/components/Sections";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { getProgramSettings } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function Home() {
  const settings = await getProgramSettings();
  return (
    <main className="bg-[#04070D]">
      <Nav />
      <Hero settings={settings} />
      <TargetExams />
      <Lectures />
      <WhatYouGet settings={settings} />
      <AppShowcase />
      <InstructorBio settings={settings} />
      <FreeWeek settings={settings} />
      <RegisterForm settings={settings} />
      <Footer settings={settings} />
      <WhatsAppFloat settings={settings} />
    </main>
  );
}
