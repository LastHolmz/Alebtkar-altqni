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

const NavigationMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button asChild size={"icon"} variant={"ghost"}>
          <HiMiniBars2 size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
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
        " transition-all text-foreground/80 px-2 py-1 rounded-lg hover:bg-primary/20 hover:text-foreground",
        className
      )}
      href={href}
    >
      {title}
    </Link>
  );
};

export default NavigationMenu;
