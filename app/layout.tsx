import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import "./globals.css";

const ibmAr = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-ar",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const OG_TITLE = "MIA Saudi PT | برنامج العشرة أيام المكثف للعلاج الطبيعي";
const OG_DESC =
  "استعد لاختبار الهيئة السعودية للتخصصات الصحية مع د. أشرف علاء مصطفى — شرح 3D Motion وتطبيق مرافق. سجّل الآن واحصل على أسبوع مجاني.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mia-saudi-pt.vercel.app"),
  openGraph: {
    type: "website",
    url: "https://mia-saudi-pt.vercel.app",
    siteName: "Medical Intelligence Academy",
    title: OG_TITLE,
    description: OG_DESC,
    locale: "ar_AR",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "MIA Saudi PT" }],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESC,
    images: ["/og-image.jpg"],
  },
  title:"MIA Saudi PT | برنامج العشرة أيام المكثف للعلاج الطبيعي",
  description:
    "برنامج مكثف لمراجعة أساسيات العلاج الطبيعي والاستعداد لاختبار الهيئة السعودية للتخصصات الصحية، مع شرح بتقنيات 3D Motion وتطبيق مرافق. من Medical Intelligence Academy - د. أشرف علاء مصطفى.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07182D",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${ibmAr.variable} ${inter.variable} font-ar`}>{children}</body>
    </html>
  );
}
