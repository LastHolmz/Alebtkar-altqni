import type { Metadata } from "next";
import "./globals.css";
import { Cairo } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import dynamic from "next/dynamic";

// Import with next's dynamic import

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

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
  openGraph: {
    type: "website",
    url: "https://alebtkar-altqni.vercel.app",
    title: "شركة الإبتكار التقني",
    description:
      "شركة الإبتكار التقني توفر حلول برمجية مبتكرة لتطوير مواقع الإنترنت، تطبيقات الجوال، وأنظمة نقاط البيع.",
    images: [
      {
        url: "https://alebtkar-altqni.vercel.app/cover.jpg",
        width: 1200,
        height: 630,
        alt: "شركة الإبتكار التقني logo",
      },
    ],
    siteName: "شركة الإبتكار التقني",
  },
};

const cairo = Cairo({
  weight: ["200", "1000", "500", "400", "700", "300", "600"],
  subsets: ["arabic"],
  display: "swap",
});

export const viewport = {
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ar" dir="rtl" suppressHydrationWarning>
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
          <div className="md:block hidden">
            <AnimatedCursor
              innerSize={12}
              outerSize={40}
              outerAlpha={0.2}
              innerScale={0.9}
              outerScale={3}
              trailingSpeed={12}
              showSystemCursor={true}
            />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
