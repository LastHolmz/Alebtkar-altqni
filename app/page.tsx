import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PiPlayCircle } from "react-icons/pi";
import ScrollAnimation from "./components/scroll-animation";
import { projects, services } from "@/data";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { AnimatedCard } from "./components/animations";
import { CustomLink } from "@/components/ui/custom-link";
import { ProjectCard } from "./components/project-cards";
import { cn, parseUri } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import OrbitAnimation from "./components/orbit-animation";

export default function Home() {
  const homePageProjects =
    projects.length > 5 ? projects.slice(0, 5) : projects;

  return (
    <main>
      <section className="h-section  relative overflow-hidden">
        <div className="flex h-full container justify-around items-center flex-col md:flex-row">
          <div className="grid gap-5">
            <h1 className="text-xl md:text-3xl ">
              تُبنى البرمجيات <span className="text-primary">الناجحة</span>{" "}
              بواسطة فرق {""}ذات
              <span className="text-primary font-bold"> كفاءة عالية</span>
            </h1>
            <p className="text-foreground/70 ">
              {
                "نساعد في تكوين وإدارة فريق من المطورين المتميزين لجعل رؤيتك حقيقة."
              }
            </p>
            <div className="flex gap-2 my-2">
              <Button className="md:w-fit w-full px-10 rounded-lg">
                لنبدء
              </Button>
              <Button
                className="md:w-fit w-full px-10 rounded-lg"
                variant={"secondary"}
              >
                فيديو توضيحي
                <PiPlayCircle size={24} className="mx-1" />
              </Button>
            </div>
          </div>
          <AnimatedCard XorY="y" initialY={40} duration={0.5}>
            <Image
              src={"/web-development.png"}
              alt="web-development"
              width={500}
              height={500}
              // priority
            />
          </AnimatedCard>
        </div>
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
                <AnimatedCard key={index} XorY="y" initialY={20}>
                  <Card className="cursor-pointer px-4 py-8 grid  min-h-52 transition-all duration-500 text-center  shadow hover:scale-105 hover:shadow-primary">
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
                <AnimatedCard
                  XorY="x"
                  key={index}
                  initialX={
                    index === 1 || index === 3 || index === 5 ? -20 : 20
                  }
                  className={cn(
                    index === 1 && "col-span-2",
                    index === 3 && "col-span-2",
                    index === 5 && "col-span-2"
                  )}
                >
                  <ProjectCard
                    href={`/projects/${parseUri(project.title)}`}
                    src={`${project.images[0]}`}
                    title={project.title}
                    big={index === 1 || index === 3 || index === 5}
                  />
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>
      <section id="techs" className="py-20">
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
    </main>
  );
}
