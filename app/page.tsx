import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PiPlayCircle } from "react-icons/pi";
import ScrollAnimation from "./components/scroll-animation";
import { services } from "./components/static-data";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main>
      <section className="h-section  relative overflow-hidden">
        <div className="flex h-full justify-around items-center flex-col md:flex-row">
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
          <div>
            <Image
              src={"/web-development.png"}
              alt="web-development"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </section>
      <ScrollAnimation />
      <section className="py-20 bg-secondary ">
        <div className="container">
          <h2 className="font-semibold text-2xl md:text-3xl w-fit">
            خدماتنا المتميزة
          </h2>
          <p className="my-2 text-foreground/80 text-sm">
            نقدم مجموعة شاملة من الخدمات التقنية المخصصة، بما في ذلك تطوير
            المواقع، تطبيقات الموبايل، واختبار الأنظمة لضمان أفضل النتائج
            لعملائنا
          </p>
          <div className="grid grid-cols-1 mt-10 gap-4 md:grid-cols-3 sm:grid-cols-2 md:gap-10">
            {services.map((service, index) => {
              return (
                <Card
                  className="cursor-pointer px-4 py-8 grid  min-h-52 transition-all duration-500 text-center  shadow hover:scale-105 hover:shadow-primary"
                  key={index}
                >
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
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
