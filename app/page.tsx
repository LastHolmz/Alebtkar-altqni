import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PiPlayCircle } from "react-icons/pi";
import ScrollAnimation from "./components/scroll-animation";
import { services } from "./components/static-data";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { AnimatedCard } from "./components/animations";
import Link from "next/link";
import { CustomLink } from "@/components/ui/custom-link";
import { FaArrowCircleLeft, FaArrowLeft } from "react-icons/fa";
import { cn } from "@/lib/utils";

export default function Home() {
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
          <AnimatedCard XorY="y" initialY={40}>
            <Image
              src={"/web-development.png"}
              alt="web-development"
              width={500}
              height={500}
              priority
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

      <section className="bg-secondary h-full py-20 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-4 flex items-center sm:items-start flex-col sm:flex-row justify-between gap-8 sm:mb-8 md:mb-12">
            <div>
              <h3 className="font-semibold text-2xl md:text-3xl w-fit">
                المشاريع
              </h3>
              <p className="my-2 leading-6 text-foreground/80 text-sm">
                نقدم مجموعة شاملة من الخدمات التقنية المخصصة، بما في ذلك تطوير
                المواقع، تطبيقات الموبايل، واختبار الأنظمة لضمان أفضل النتائج
                لعملائنا
              </p>

              <p className="hidden max-w-screen-sm text-gray-500 dark:text-gray-300 md:block">
                This is a section of some simple filler text, also known as
                placeholder text. It shares some characteristics of a real
                written text.
              </p>
            </div>
            <CustomLink variant={"link"} href="/projects">
              أكثر
            </CustomLink>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
            <ProjectCard
              href="/projects/our-gym"
              src="/projects/our-gym/1.png"
              title="OUR GYM"
            />

            <ProjectCard
              big
              href="/projects/our-gym"
              src="/projects/our-gym/2.png"
              title="OUR GYM"
            />

            <a
              href="#"
              className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
            >
              <img
                src="https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000"
                loading="lazy"
                alt="Photo by Martin Sanchez"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                Dev
              </span>
            </a>

            <a
              href="#"
              className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
            >
              <img
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600"
                loading="lazy"
                alt="Photo by Lorenzo Herrera"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                Retro
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

const ProjectCard = ({
  big = false,
  href,
  src,
  alt,
  title,
}: {
  big?: boolean;
  href: string;
  src: string;
  title: string;
  alt?: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-80 items-end overflow-hidden  bg-gray-100 shadow-lg md:h-80",
        big && "col-span-2"
      )}
    >
      <div className=" transition-all duration-500 w-full h-0 bg-foreground/40 group-hover:w-full group-hover:h-full absolute top-0 left-0 z-40"></div>
      <Image
        src={src}
        loading="lazy"
        alt={alt ? alt : `${title} main photo`}
        width={1000}
        height={1000}
        className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
      <div className="transition-all duration-500 bottom-0 group-hover:bottom-0 absolute lg:bottom-[-100%] left-0 bg-background/90 w-full h-16 flex justify-center items-center z-50">
        {title}
      </div>
    </Link>
  );
};
