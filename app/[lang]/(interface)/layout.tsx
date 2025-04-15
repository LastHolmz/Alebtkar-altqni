import Footer from "../components/footer";
import Header from "../components/header";
import { Toaster } from "@/components/ui/toaster";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const lang = (await params).lang;
  return (
    <>
      <Header locale={lang} />
      <div className="mt-24">{children}</div>
      <Footer locale={lang} />
      <Toaster />
    </>
  );
}
