import React from "react";
import { CustomLink } from "@/components/ui/custom-link";
import { SlSocialFacebook } from "react-icons/sl";
import Logo from "./logo";
import { BiSupport } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import ToggleTheme from "./theme-toggle";

const translations = {
  ar: {
    contactUs: "تواصل معنا",
    contact: "تواصل",
    facebook: "فيسبوك",
    phone: "928666458",
    quickLinks: "روابط سريعة",
    home: "الصفحة الرئيسية",
    articles: "المقالات",
    projects: "المشاريع",
    demos: "عروض توضيحية",
    companyDescription:
      "شركة الإبتكار التقني متخصصة في تطوير البرمجيات المبتكرة مثل مواقع الإنترنت، أنظمة نقاط البيع، وتطبيقات الجوال لتلبية احتياجات العملاء في مختلف الصناعات.",
    rights: "كل الحقوق محفوظة.",
    company: "الإبتكار التقني",
  },
  en: {
    contactUs: "Contact Us",
    contact: "Contact",
    facebook: "Facebook",
    phone: "928666458",
    quickLinks: "Quick Links",
    home: "Home",
    articles: "Articles",
    projects: "Projects",
    demos: "Demos",
    companyDescription:
      "Ebtkar Altqni is specialized in developing innovative software such as websites, POS systems, and mobile applications tailored to meet client needs across various industries.",
    rights: "All rights reserved.",
    company: "Ebtkar Altqni",
  },
};

const Footer = ({
  className,
  locale = "ar",
}: {
  className?: string;
  locale?: "ar" | "en";
}) => {
  const t = translations[locale];

  return (
    <footer
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={cn("w-full mx-auto bg-secondary", className)}
    >
      <div className="container gap-14 py-20 grid md:grid-cols-2 lg:grid-cols-3 content-center">
        {/* Contact Us */}
        <div>
          <h4 className="w-full sm:w-fit mx-auto text-center text-xl my-2">
            {t.contactUs}
          </h4>
          <nav className="my-2">
            <ul className="flex flex-col justify-start w-full items-center">
              <li>
                <CustomLink href="#contacting" variant="ghost">
                  <BiSupport className="mx-2" />
                  {t.contact}
                </CustomLink>
              </li>
              <li>
                <CustomLink
                  href="https://www.facebook.com/ALEBTKARALTAQNI?mibextid=ZbWKwL"
                  variant="ghost"
                >
                  <SlSocialFacebook className="mx-2" />
                  {t.facebook}
                </CustomLink>
              </li>
              <li>
                <CustomLink variant="ghost" href="tel:928666458">
                  <MdOutlinePhoneAndroid className="mx-2" />
                  {t.phone}
                </CustomLink>
              </li>
              <li>
                <CustomLink variant="ghost" href="https://wa.me/928666458">
                  <FaWhatsapp className="mx-2" />
                  {t.phone}
                </CustomLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="w-full sm:w-fit mx-auto text-center text-xl my-2">
            {t.quickLinks}
          </h4>
          <nav className="my-2">
            <ul>
              <li className="w-full sm:w-fit mx-auto">
                <CustomLink
                  className="hover:bg-card w-full sm:w-fit mx-auto"
                  href="/"
                  variant="ghost"
                >
                  {t.home}
                </CustomLink>
              </li>
              <li className="w-full sm:w-fit mx-auto">
                <CustomLink
                  href="/articles"
                  className="hover:bg-card w-full sm:w-fit mx-auto"
                  variant="ghost"
                >
                  {t.articles}
                </CustomLink>
              </li>
              <li className="w-full sm:w-fit mx-auto">
                <CustomLink
                  href="/projects"
                  className="hover:bg-card w-full sm:w-fit mx-auto"
                  variant="ghost"
                >
                  {t.projects}
                </CustomLink>
              </li>
              <li className="w-full sm:w-fit mx-auto">
                <CustomLink
                  href="/demos"
                  className="hover:bg-card w-full sm:w-fit mx-auto"
                  variant="ghost"
                >
                  {t.demos}
                </CustomLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Company Description */}
        <div>
          <div className="mx-auto w-52 mb-5">
            <Logo />
          </div>
          <p className="tracking-wider text-sm text-foreground/90">
            {t.companyDescription}
          </p>
        </div>
      </div>

      {/* Theme toggle */}
      <div className="mx-auto w-fit my-4">
        <ToggleTheme />
      </div>

      {/* Footer bottom text */}
      <p className="mx-auto w-fit tracking-wider text-sm text-foreground/80">
        &copy; {new Date().getFullYear()}{" "}
        <span className="mx-1 font-semibold text-primary">{t.company}</span>{" "}
        {t.rights}
      </p>
    </footer>
  );
};

export default Footer;
