import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_Arabic } from "next/font/google";

// import localFont from "next/font/local";

import Header from "./components/header";
import { ThemeProvider } from "./components/theme-provider";
import Footer from "./components/footer";
import { cn } from "@/lib/utils";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: {
    template: "%s | شركة الإبتكار التقني",
    default: "شركة الإبتكار التقني",
  },
  description:
    "شركة الإبتكار التقني متخصصة في تطوير البرمجيات المبتكرة مثل مواقع الإنترنت، أنظمة نقاط البيع، وتطبيقات الجوال لتلبية احتياجات العملاء في مختلف الصناعات.",
  keywords: [
    "تطوير البرمجيات",
    "مواقع الإنترنت",
    "أنظمة نقاط البيع",
    "تطبيقات الجوال",
    "حلول تقنية",
    "تطوير مواقع",
    "برمجة تطبيقات",
    "برمجة مواقع",
    "شركة تقنية",
    "أنظمة إدارة",
  ],
};

const notoNaskhArabic = Noto_Sans_Arabic({
  weight: "500",
  subsets: ["arabic"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="ar" dir="rtl" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            notoNaskhArabic.className
            // "grid grid-rows-[72px_1fr_72px] min-h-screen items-center"
          )}
        >
          <Header />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="mt-[72px]">{children}</div>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
