import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PiPlayCircle } from "react-icons/pi";
import { motion } from "framer-motion";
import ScrollAnimation from "./components/scroll-animation";

export default function Home() {
  return (
    <main>
      <section className="h-section flex justify-around items-center flex-col md:flex-row container">
        <div className="grid gap-5">
          <h1 className=" text-xl md:text-3xl ">
            تُبنى البرمجيات <span className="text-primary">الناجحة</span> بواسطة{" "}
            فرق {""}ذات
            <span className="text-primary font-bold"> كفاءة عالية</span>
          </h1>
          <p className="text-foreground/70 font-light">
            {
              "نساعد في تكوين وإدارة فريق من المطورين المتميزين لجعل رؤيتك حقيقة."
            }
          </p>
          <div className="flex gap-2">
            <Button className="md:w-fit w-full px-10 rounded-lg">لنبدء</Button>
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
      </section>
      <ScrollAnimation />
      <section></section>
    </main>
  );
}
