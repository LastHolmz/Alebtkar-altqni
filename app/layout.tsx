import type { Metadata } from "next";
import "./globals.css";
import { Cairo } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

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
const cairo = Cairo({
  weight: ["200", "1000", "500", "400", "700", "300", "600"],
  subsets: ["arabic"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ar" dir="rtl" suppressHydrationWarning>
        <head />
        {/* <body className={cn(cairo.className)}> */}
        <body className={cn(cairo.className)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
