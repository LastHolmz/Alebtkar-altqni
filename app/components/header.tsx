import { Button } from "@/components/ui/button";
import NavigationMenu, { NavLink } from "./navigation-menu";
import { MdOutlineSupportAgent } from "react-icons/md";
import Logo from "./logo";

const Header = () => {
  return (
    <header className="z-50 shadow-md mb-5 py-4 fixed top-0 left-0 items-center w-full bg-background/90 dark:shadow-white/10">
      <div className="flex justify-between container">
        <Button className="hidden md:flex" size={"sm"}>
          تواصل
        </Button>
        <div className="md:hidden flex gap-2 justify-center items-center">
          <NavigationMenu />
          <Button variant={"ghost"} size={"sm"}>
            <MdOutlineSupportAgent size={24} />
          </Button>
        </div>
        <nav className="hidden md:flex">
          <ul className="flex items-center justify-around gap-2">
            <li>
              <NavLink title="حولنا" href="#about-us" scroll />
            </li>
            <li>
              <NavLink title="خدماتنا" href="#our-services" scroll />
            </li>

            <li>
              <NavLink title="مقالات" href="#blogs" scroll />
            </li>

            <li>
              <NavLink title="آلية العمل" href="#how-it-works" scroll />
            </li>
            <li>
              <NavLink title="التعاقد" href="#contracting" scroll />
            </li>
          </ul>
        </nav>
        <Logo />
      </div>
    </header>
  );
};

export default Header;
