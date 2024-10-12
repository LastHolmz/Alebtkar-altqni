import Footer from "../components/footer";
import Header from "../components/header";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="mt-24">{children}</div>
      <Footer />
      <Toaster />
    </>
  );
}
