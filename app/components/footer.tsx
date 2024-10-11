import React from "react";
import { CustomLink } from "@/components/ui/custom-link";
import { SlSocialFacebook } from "react-icons/sl";
import Logo from "./logo";
import { BiSupport } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import dynamic from "next/dynamic";
const ToggleTheme = dynamic(() => import("./theme-toggle"), { ssr: false });

const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={cn("w-full  mx-auto bg-secondary", className)}>
      <div className="container gap-14 py-20 grid md:grid-cols-2 lg:grid-cols-3 content-center">
        <div>
          <h4 className="w-full sm:w-fit mx-auto text-center text-xl my-2">
            تواصل معنا
          </h4>
          <nav className="my-2">
            <ul className="flex flex-col justify-start w-full items-center">
              <li>
                <CustomLink href="#contacting" variant={"ghost"}>
                  <BiSupport className="mx-2" />
                  تواصل
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  href={
                    "https://www.facebook.com/ALEBTKARALTAQNI?mibextid=ZbWKwL"
                  }
                  variant={"ghost"}
                >
                  <SlSocialFacebook className="mx-2" />
                  فيسبوك
                </CustomLink>
              </li>
              <li>
                <CustomLink variant={"ghost"} href={"tel:928666456"}>
                  <MdOutlinePhoneAndroid className="mx-2" />
                  928666456
                </CustomLink>
              </li>
              <li>
                <CustomLink variant={"ghost"} href={"https://wa.me/928666456"}>
                  <FaWhatsapp className="mx-2" />
                  928666456
                </CustomLink>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <h4 className="w-full sm:w-fit mx-auto text-center text-xl my-2">
            روابط سريعة
          </h4>
          <nav className="my-2">
            <ul>
              <li className="w-full sm:w-fit mx-auto">
                <CustomLink
                  className="hover:bg-card w-full sm:w-fit mx-auto"
                  href="/"
                  variant={"ghost"}
                >
                  الصفحة الرئيسية
                </CustomLink>
              </li>
              <li className="w-full sm:w-fit mx-auto">
                <CustomLink
                  href="#"
                  className="hover:bg-card w-full sm:w-fit mx-auto"
                  variant={"ghost"}
                >
                  المقالات
                </CustomLink>
              </li>
              <li className="w-full sm:w-fit mx-auto">
                <CustomLink
                  href="/projects"
                  className="hover:bg-card w-full sm:w-fit mx-auto"
                  variant={"ghost"}
                >
                  المشاريع
                </CustomLink>
              </li>
              <li className="w-full sm:w-fit mx-auto">
                <CustomLink
                  href="/demos"
                  className="hover:bg-card w-full sm:w-fit mx-auto"
                  variant={"ghost"}
                >
                  عروض توضيحية
                </CustomLink>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <div className="mx-auto w-52 mb-5">
            <Logo />
          </div>
          <p className=" tracking-wider text-sm text-foreground/90">
            شركة الإبتكار التقني متخصصة في تطوير البرمجيات المبتكرة مثل مواقع
            الإنترنت، أنظمة نقاط البيع، وتطبيقات الجوال لتلبية احتياجات العملاء
            في مختلف الصناعات.
          </p>
        </div>
      </div>
      <div className="mx-auto w-fit my-4">
        <ToggleTheme />
      </div>
      <p className="mx-auto w-fit tracking-wider  text-sm text-foreground/80">
        &copy; {new Date().getFullYear()}
        <span className="mx-1 font-semibold text-primary">
          الإبتكار التقني
        </span>{" "}
        كل الحقوق محفوظة.
      </p>
    </footer>
  );
};

export default Footer;
