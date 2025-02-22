import { ReactNode } from "react";
import Image from "next/image";
import { CustomLink } from "@/components/custom-link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { cn } from "@/lib/utils";
import LangRenderer from "@/components/lang";

const layout = async (props: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) => {
  const params = await props.params;

  const { lang } = params;

  const { children } = props;

  return (
    <main className="md:flex h-screen">
      <section className="bg-accent hidden md:block md:flex-[3] text-lg text-center content-center">
        <div>
          <div className=" h-full w-full md:w-1/2 md:h-1/2 mx-auto">
            <Image
              src="/logo.png"
              width={1000}
              height={1000}
              alt="logo"
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <h2
            className="text-2xl text-foreground text-center font-bold"
            id="quote"
          >
            <LangRenderer
              ar={`"لا تنتظر الفرصة، بل كن أنت الفرصة."`}
              en={`"Don't wait for the opportunity—be the opportunity."`}
            />
          </h2>
        </div>
      </section>
      <section className="md:flex-[2] flex-col flex justify-center gap-5 h-full relative">
        <CustomLink
          size={"icon"}
          variant={"secondary"}
          className={cn("absolute top-2", lang === "ar" ? "right-2" : "left-2")}
          href={`/${lang}`}
        >
          <LangRenderer en={<FaArrowLeft />} ar={<FaArrowRight />} />
        </CustomLink>
        {/* <Logo className="w-28 block h-28 mx-auto overflow-hidden md:hidden" /> */}
        {children}
      </section>
    </main>
  );
};

export default layout;
