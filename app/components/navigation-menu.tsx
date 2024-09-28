"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HiMiniBars2 } from "react-icons/hi2";
import Logo from "./logo";
import { Dispatch, SetStateAction, useState } from "react";

const NavigationMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger>
        <Button asChild variant={"ghost"} size={"icon"}>
          <HiMiniBars2 size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="w-full  mx-auto">
              <Logo withLink={false} />
            </div>
          </SheetTitle>
          <SheetDescription>
            <nav className="w-full flex justify-center items-center h-[75vh]">
              <ul className="flex items-center flex-col  justify-center gap-5 w-full">
                <li className="w-full">
                  <MobileNavLink open={open} setOpen={setOpen} title="حولنا" />
                </li>
                <li className="w-full">
                  <MobileNavLink
                    open={open}
                    setOpen={setOpen}
                    title="خدماتنا"
                  />
                </li>

                <li className="w-full">
                  <MobileNavLink open={open} setOpen={setOpen} title="مقالات" />
                </li>

                <li className="w-full">
                  <MobileNavLink
                    open={open}
                    setOpen={setOpen}
                    title="آلية العمل"
                  />
                </li>
                <li className="w-full">
                  <MobileNavLink
                    open={open}
                    setOpen={setOpen}
                    title="التعاقد"
                  />
                </li>
              </ul>
            </nav>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export const NavLink = ({
  className,
  href = "/",
  title,
}: {
  className?: string;
  title?: string;
  href?: string;
}) => {
  return (
    <Link
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
}: {
  className?: string;
  title?: string;
  href?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Link
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
