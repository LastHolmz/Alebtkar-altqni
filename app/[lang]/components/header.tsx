import NavigationMenu, { NavLink } from "./navigation-menu";
import { BiSupport } from "react-icons/bi";
import Logo from "./logo";
import { CustomLink } from "@/components/ui/custom-link";
import ToggleTheme from "./theme-toggle";
import LocaleSwitcher from "@/components/locale-switcher";
import { cn } from "@/lib/utils";

const translations = {
  ar: {
    contact: "تواصل",
    aboutUs: "حولنا",
    services: "خدماتنا",
    articles: "مقالات",
    howItWorks: "آلية العمل",
    contactUs: "تواصل معنا:",
  },
  en: {
    contact: "Contact",
    aboutUs: "About Us",
    services: "Our Services",
    articles: "Articles",
    howItWorks: "How It Works",
    contactUs: "Contact us:",
  },
};

const Header = ({ locale = "ar" }: { locale?: "ar" | "en" }) => {
  const t = translations[locale];

  return (
    <header className="z-50 shadow-md mb-5 pb-4 fixed top-0 left-0 items-center w-full bg-background/90 dark:shadow-white/10">
      <div className="bg-primary text-white w-full ">
        <div className="flex justify-between items-center container">
          <span className="font-semibold">{t.contactUs} +218 92 8666 458</span>
          <LocaleSwitcher
            arTitle="عربي"
            enTitle="English"
            varians="link"
            className={cn(
              "text-white/80 font-normal hover:text-white",
              locale === "ar" ? "pl-14" : "pl-0"
            )}
          />
        </div>
      </div>

      <div className="flex justify-between items-center container">
        {/* Left links & toggle (desktop) */}
        <div className="md:flex hidden gap-2">
          <CustomLink scroll href="/#contacting" size="lg">
            {t.contact}
          </CustomLink>
          <ToggleTheme />
        </div>

        {/* Mobile nav & contact icon */}
        <div className="md:hidden flex gap-2 justify-center items-center">
          <NavigationMenu />
          <CustomLink scroll href="/#contacting" variant="ghost" size="sm">
            <BiSupport size={24} />
          </CustomLink>
        </div>

        {/* Center navigation (desktop only) */}
        <nav className="hidden md:flex">
          <ul className="flex items-center justify-around gap-2">
            <li>
              <NavLink title={t.aboutUs} href="#about-us" scroll />
            </li>
            <li>
              <NavLink title={t.services} href="#our-services" scroll />
            </li>
            <li>
              <NavLink title={t.articles} href="/articles" scroll />
            </li>
            <li>
              <NavLink title={t.howItWorks} href="#how-it-works" scroll />
            </li>
          </ul>
        </nav>

        {/* Logo */}
        <Logo className="w-24 sm:h-16" />
      </div>
    </header>
  );
};

export default Header;
