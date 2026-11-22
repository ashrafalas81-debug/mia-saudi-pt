import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FreeWeek from "@/components/FreeWeek";
import TeachingMethod from "@/components/TeachingMethod";
import Curriculum from "@/components/Curriculum";
import AppShowcase from "@/components/AppShowcase";
import ClinicalCase from "@/components/ClinicalCase";
import { FollowUp, Instructor, ExamPrep, Trust, FinalCTA, Footer } from "@/components/Sections";
import RegisterForm from "@/components/RegisterForm";
import FAQ from "@/components/FAQ";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { getProgramSettings } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function Home() {
  const settings = await getProgramSettings();
  return (
    <main>
      <Nav />
      <Hero settings={settings} />
      <FreeWeek />
      <TeachingMethod />
      <Curriculum />
      <AppShowcase />
      <ClinicalCase />
      <FollowUp />
      <Instructor />
      <ExamPrep />
      <Trust />
      <RegisterForm settings={settings} />
      <FAQ />
      <FinalCTA settings={settings} />
      <Footer settings={settings} />
      <WhatsAppFloat settings={settings} />
    </main>
  );
}
