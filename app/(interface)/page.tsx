import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PiPlayCircle } from "react-icons/pi";
import ScrollAnimation from "../components/scroll-animation";
import { demos, projects, services } from "@/data";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { AnimatedCard } from "../components/animations";
import { CustomLink } from "@/components/ui/custom-link";
import { ProjectCard } from "../components/project-cards";
import OrbitAnimation from "../components/orbit-animation";
import { DemoCard } from "../components/demo";
import ContactForm from "../components/contact-form";
import CookieConsent from "../components/cookies-consent";
import dynamic from "next/dynamic";
import Link from "next/link";
const Sparkles = dynamic(() => import("@/components/ui/sparkles"), {
  ssr: false,
});
const RenderToTheme = dynamic(() => import("@/components/ui/render-to-theme"), {
  ssr: false,
});

export default function Home() {
  const homePageProjects =
    projects.length > 5 ? projects.slice(0, 5) : projects;
  const homePageDemos = demos.length > 5 ? demos.slice(0, 5) : demos;

  return (
    <main>
      <CookieConsent />
      <section className="h-screen w-full overflow-hidden ">
        <div className="mx-auto container mt-32 relative z-[49] w-screen">
          <div className="text-center text-3xl text-white relative">
            <h1 className="text-2xl md:text-4xl flex justify-center font-bold md:px-20 pb-10 text-gradient bg-gradient-to-r from-primary to-gradaint bg-clip-text text-transparent px-2">
              تُبنى البرمجيات الناجحة بواسطة فرق ذات كفاءة عالية
            </h1>

            <br />
            <p className="text-sm md:text-xl text-foreground/90">
              نساعد في تكوين وإدارة فريق من المطورين المتميزين لجعل رؤيتك حقيقة.
            </p>
          </div>
          <div className="flex justify-center items-center gap-2 mt-14 flex-col sm:flex-row">
            {/* <CustomLink href="/" className="md:w-fit w-full px-10 rounded-lg">
              لنبدء
            </CustomLink> */}
            <span className="relative group">
              <Link
                href="/"
                className="py-1.5 transition-all ease-in relative z-10 bg-secondary text-foreground dark:hover:bg-secondary/90  h-12 rounded-lg px-10 text-md"
              >
                لنبدء
              </Link>
              <div className="absolute z-0 pointer-events-none -inset-1 bg-gradient-to-r from-orange-400 to-primary rounded-lg mx-2 blur opacity-50 dark:opacity-70 dark:-inset-0.5 group-hover:opacity-80 dark:group-hover:opacity-70 transition-all duration-1000 group-hover:duration-3000 group-hover:-inset-2 animate-tilt"></div>
            </span>
            <Button
              className="md:w-fit w-full px-10 rounded-lg"
              variant={"secondary"}
            >
              فيديو توضيحي
              <PiPlayCircle size={24} className="mx-1" />
            </Button>
          </div>
        </div>

        <RenderToTheme
          dark={
            <div className="relative -mt-32 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,hsl(var(--primary)),transparent_80%)] before:opacity-100 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t dark:after:border-[#7876c566] after:bg-muted">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px] "></div>
              <Sparkles
                density={800}
                speed={1}
                hover={true}
                mousemove={true}
                size={1.1}
                color="#fff"
                className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,black,transparent_85%)] dark:[mask-image:radial-gradient(50%_50%,black,transparent_85%)]"
              />
            </div>
          }
        />
      </section>
      <ScrollAnimation />

      <section id="about-us" className="py-20 bg-secondary">
        <div className="container flex justify-between items-center flex-col sm:flex-row">
          <div>
            <h2 className="font-semibold text-xl my-10 tracking-wider md:text-3xl w-fit flex items-center gap-1">
              ما هي{" "}
              <div className="tracking-wider text-3xl bg-primary/30 text-primary/90 rounded-md px-4 py-2">
                الإبتكار التقني
              </div>
              ؟
            </h2>
            <p className="my-2 leading-6 text-foreground/80 text-sm">
              الابتكار التقني هي شركة برمجية تقدم حلولاً مبتكرة في مجال
              التكنولوجيا. تشمل خدماتها تطوير البرمجيات المخصصة، تصميم واجهة
              المستخدم وتجربة المستخدم، تطوير تطبيقات الهواتف المحمولة، حلول
              الحوسبة السحابية، واستشارات تقنية المعلومات، مما يسهم في تحسين
              أداء الشركات وتلبية احتياجات السوق.
            </p>
          </div>
          <AnimatedCard XorY="x" initialX={-20}>
            <Image
              src={"/JavaScript frameworks-amico.png"}
              alt="JavaScript frameworks-amico "
              width={400}
              height={400}
            />
          </AnimatedCard>
        </div>
      </section>

      <section id="our-services" className="py-20">
        <div className="container">
          <h3 className="font-semibold text-2xl md:text-3xl w-fit">
            خدماتنا المتميزة
          </h3>
          <p className="my-2 leading-6 text-foreground/80 text-sm">
            نقدم مجموعة شاملة من الخدمات التقنية المخصصة، بما في ذلك تطوير
            المواقع، تطبيقات الموبايل، واختبار الأنظمة لضمان أفضل النتائج
            لعملائنا
          </p>
          <div className="grid grid-cols-1 mt-10 gap-4 md:grid-cols-3 sm:grid-cols-2 md:gap-10">
            {services.map((service, index) => {
              return (
                <AnimatedCard
                  key={index}
                  XorY="y"
                  className={`w-full overflow-hidden max-w-[422px] mx-auto [background:linear-gradient(45deg,#172033,theme(colors.gray.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.gray.600/.48)_80%,_theme(colors.rose.500)_86%,_theme(colors.rose.300)_90%,_theme(colors.rose.500)_94%,_theme(colors.gray.600/.48))_border-box] rounded-2xl border border-transparent bg-accent animate-border`}
                  initialY={20}
                >
                  <Card className="cursor-pointer h-full animate-border px-4 py-8 grid  min-h-52 transition-all duration-500 text-center  shadow hover:scale-105 hover:shadow-primary">
                    <CardTitle className="text-lg font-semibold ">
                      <div className="flex justify-center flex-col items-center gap-2">
                        <div className="text-primary/70 p-3 rounded-md bg-primary/20 my-2">
                          <service.icon size={36} />
                        </div>
                        <div>{service.title}</div>
                      </div>
                    </CardTitle>
                    <CardDescription className="text-sm my-2">
                      {service.description}
                    </CardDescription>
                  </Card>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="bg-secondary h-full py-20 sm:py-8 lg:py-12"
      >
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-4 flex items-center sm:items-start flex-col sm:flex-row justify-between gap-8 sm:mb-8 md:mb-12">
            <div>
              <h3 className="font-semibold text-2xl md:text-3xl w-fit">
                المشاريع
              </h3>
              <p className="mb-2 mt-4 leading-6 text-foreground/80 text-sm">
                نقدم مجموعة شاملة من الخدمات التقنية المخصصة، بما في ذلك تطوير
                المواقع، تطبيقات الموبايل، واختبار الأنظمة لضمان أفضل النتائج
                لعملائنا
              </p>
            </div>
            <CustomLink variant={"link"} href="/projects">
              أكثر
            </CustomLink>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
            {homePageProjects?.map((project, index) => {
              return (
                <AnimatedCard XorY="x" key={index}>
                  <ProjectCard
                    href={project.href}
                    src={`${project.images[0]}`}
                    title={project.title}
                  />
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      <section id="techs" className="py-20 mb-20 md:mb-0 ">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2">
            {" "}
            <h3 className="font-semibold text-2xl md:text-3xl w-fit">
              تقنيات و ادوات
            </h3>
            <p className="mb-2 mt-4 leading-6 text-foreground/80 text-sm">
              نستخدم أحدث التقنيات والأدوات البرمجية لضمان تقديم حلول مبتكرة
              وفعّالة، مما يعزز أداء المشاريع ويحقق أهداف العملاء بفاعلية.
            </p>
          </div>
          <div className="flex-2 md:ml-40">
            {" "}
            <OrbitAnimation />
          </div>
        </div>
      </section>

      <section id="demos" className="bg-secondary h-full py-20">
        <div className="container">
          <h3 className="font-semibold text-2xl md:text-3xl w-fit">
            عروض توضيحية
          </h3>
          <p className="mb-2 mt-4 leading-6 text-foreground/80 text-sm">
            نقدم من خلال العروض التوضيحية شروحات شاملة ومبسطة لمنتجاتنا
            وخدماتنا. تهدف العروض التوضيحية إلى تسهيل الفهم وتوضيح الأفكار
            المعقدة باستخدام الوسائل المرئية والصوتية لضمان وصول الرسالة بشكل
            فعال وسريع.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 xl:gap-8 mt-10">
            {homePageDemos?.map((demo, index) => {
              return <DemoCard key={index} {...demo} />;
            })}
            {homePageDemos?.map((demo, index) => {
              return <DemoCard key={index} {...demo} />;
            })}
            {homePageDemos?.map((demo, index) => {
              return <DemoCard key={index} {...demo} />;
            })}
            {homePageDemos?.map((demo, index) => {
              return <DemoCard key={index} {...demo} />;
            })}
            {homePageDemos?.map((demo, index) => {
              return <DemoCard key={index} {...demo} />;
            })}
          </div>
        </div>
      </section>

      <section id="contacting" className="h-full py-20">
        <div className="container">
          <h3 className="font-semibold text-2xl md:text-3xl w-fit">
            تواصل معنا
          </h3>
          <p className="mb-2 mt-4 leading-6 text-foreground/80 text-sm">
            يمكنك التواصل معنا للحصول على استشارات تقنية وحلول مخصصة تلبي
            احتياجات عملك بشكل فعال وسريع.
          </p>
          <div className="flex justify-between items-center">
            <div className="w-full md:w-1/2">
              <ContactForm />
            </div>
            <AnimatedCard
              XorY="x"
              initialX={-20}
              className="max-w-sm hidden md:block"
            >
              <Image
                src={"/contact-us.png"}
                alt="contact-us"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </AnimatedCard>
          </div>
        </div>
      </section>
    </main>
  );
}
