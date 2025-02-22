import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
const page = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const lang = (await params).lang;
  return (
    <main className="py-5 container">
      <Breadcrumb dir="rtl">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/`}>الرئيسية</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>بعض المشاريع</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="min-h-[75vh] py-2 sm:py-10 ">
        <div
          dir={lang === "ar" ? "rtl" : "ltr"}
          className=" h-full mx-auto  my-20 p-6 bg-accent
     shadow-md rounded-lg "
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              {lang === "en" ? "Cookie Policy" : "سياسة ملفات تعريف الارتباط"}
            </h2>
          </div>
          {lang === "en" ? (
            <div className="space-y-4">
              <p>
                This website uses cookies to enhance user experience. By using
                our site, you consent to our use of cookies in accordance with
                this policy.
              </p>
              <h3 className="text-xl font-semibold">What Are Cookies?</h3>
              <p>
                Cookies are small text files stored on your device to improve
                website functionality and user experience.
              </p>
              <h3 className="text-xl font-semibold">How We Use Cookies</h3>
              <p>
                We use cookies for analytics, personalization, and improving our
                services.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-right">
              <p>
                يستخدم هذا الموقع ملفات تعريف الارتباط لتحسين تجربة المستخدم.
                باستخدام موقعنا، فإنك توافق على استخدامنا لملفات تعريف الارتباط
                وفقًا لهذه السياسة.
              </p>
              <h3 className="text-xl font-semibold">
                ما هي ملفات تعريف الارتباط؟
              </h3>
              <p>
                ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم تخزينها على جهازك
                لتحسين وظائف الموقع وتجربة المستخدم.
              </p>
              <h3 className="text-xl font-semibold">
                كيف نستخدم ملفات تعريف الارتباط
              </h3>
              <p>
                نحن نستخدم ملفات تعريف الارتباط للتحليلات والتخصيص وتحسين
                خدماتنا.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default page;
