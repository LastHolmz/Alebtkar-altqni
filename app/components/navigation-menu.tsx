"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HiMiniBars2 } from "react-icons/hi2";
import Logo from "./logo";
import { Dispatch, SetStateAction, useState } from "react";
import ToggleTheme from "./theme-toggle";

const NavigationMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger>
        <Button asChild variant={"ghost"} size={"icon"}>
          <HiMiniBars2 size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex justify-center items-center flex-col">
        <div className=" h-40 mx-auto">
          <Logo withLink={false} />
        </div>
        <nav className="flex-1 w-full">
          <ul className="flex items-center flex-col h-full text-center justify-center gap-5 w-full">
            <li className="w-full">
              <MobileNavLink
                open={open}
                setOpen={setOpen}
                title="حولنا"
                href="#about-us"
                scroll
              />
            </li>
            <li className="w-full">
              <MobileNavLink
                open={open}
                setOpen={setOpen}
                title="خدماتنا"
                href="#our-services"
                scroll
              />
            </li>

            <li className="w-full">
              <MobileNavLink
                open={open}
                setOpen={setOpen}
                title="مقالات"
                href="#blogs"
                scroll
              />
            </li>

            <li className="w-full">
              <MobileNavLink
                open={open}
                setOpen={setOpen}
                title="آلية العمل"
                href="#how-it-works"
                scroll
              />
            </li>
            <li className="w-full">
              <MobileNavLink
                open={open}
                setOpen={setOpen}
                title="التعاقد"
                href="#contracting"
                scroll
              />
            </li>
          </ul>
        </nav>
        <div className="flex justify-center items-center flex-col gap-1">
          <ToggleTheme />
          <div className="text-foreground/70 text-sm">
            الإصدار
            <span className="mx-2">1.0.0</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const NavLink = ({
  className,
  href = "/",
  title,
  scroll = false,
}: {
  className?: string;
  title?: string;
  href?: string;
  scroll?: boolean;
}) => {
  return (
    <Link
      scroll={scroll}
      className={cn(
        " transition-all w-full text-foreground/80 px-2 py-1 rounded-lg hover:bg-primary/20 hover:text-foreground",
        className
      )}
      href={href}
    >
      {title}
    </Link>
  );
};

export const MobileNavLink = ({
  className,
  href = "/",
  title,
  open,
  setOpen,
  scroll,
}: {
  className?: string;
  title?: string;
  href?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  scroll?: boolean;
}) => {
  return (
    <Link
      scroll={scroll}
      onClick={() => {
        setOpen(!open);
      }}
      className={cn(
        " transition-all block w-full  text-foreground/80 px-4 py-2 rounded-lg hover:bg-primary/80  hover:text-foreground",
        className
      )}
      href={href}
    >
      {title}
    </Link>
  );
};

export default NavigationMenu;
