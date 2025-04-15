"use client";
import { Sidebar, Menu, sidebarClasses } from "react-pro-sidebar";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaBars, FaRegNewspaper } from "react-icons/fa";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FaUsers } from "react-icons/fa";
import { RiPresentationFill } from "react-icons/ri";
import {
  MdAttachEmail,
  MdLocalOffer,
  MdOutlineManageAccounts,
} from "react-icons/md";

import { SiStatista } from "react-icons/si";

import { IconType } from "react-icons/lib";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HiMiniBars2 } from "react-icons/hi2";
import ToggleTheme from "@/app/[lang]/components/theme-toggle";
import Link from "next/link";

const NavigationRailItem = ({
  href,
  collapsed = false,
  Icon,
  name,
  onClick,
}: {
  href: string;
  collapsed?: boolean;
  Icon: IconType;
  name: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}) => {
  const pathname = usePathname();
  const { lang } = useParams();

  return (
    <Link
      aria-label={name}
      onClick={onClick}
      className={cn(
        "flex justify-between hover:bg-primary/10 px-4 py-2 w-[80%] mx-auto items-center  gap-1 sm:gap-2 ",
        "whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        collapsed && "justify-center w-full rounded-none",
        pathname === href && "text-primary bg-primary/20",
        pathname.startsWith(`/${lang}${href}`) && "text-primary bg-primary/20"
      )}
      href={href}
    >
      {!collapsed && (
        <div>
          <span>{name}</span>
        </div>
      )}
      <div>
        <Icon size={20} />
      </div>
    </Link>
  );
};
const NavigationRailHomeItem = ({
  href,
  collapsed,
  Icon,
  name,
  onClick,
}: {
  href: string;
  collapsed: boolean;
  Icon: IconType;
  name: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}) => {
  const pathname = usePathname();
  const { lang } = useParams();
  return (
    <Link
      onClick={onClick}
      aria-label={name}
      className={cn(
        "flex justify-between hover:bg-primary/10 px-4 py-2 w-[80%] mx-auto items-center  gap-1 sm:gap-2 ",
        "whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        collapsed && "justify-center w-full rounded-none",
        `/${lang}${href}` === pathname && "text-primary bg-primary/20"
      )}
      href={href}
    >
      {!collapsed && (
        <div>
          {" "}
          <span>{name}</span>
        </div>
      )}
      <div>
        <Icon size={20} />
      </div>
    </Link>
  );
};
const NavigationRail = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  return (
    <Sidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "hsl(var(--secondary))",
        },
      }}
      rtl
      className="fixed top-0 right-0 bg-secondary h-screen"
      collapsed={collapsed}
    >
      <div
        className={cn(
          "w-full flex items-center justify-between px-2 py-2",
          collapsed && "justify-center px-0 py-2"
        )}
      >
        {" "}
        <Button
          dir="rtl"
          size={"icon"}
          variant={"ghost"}
          onClick={() => setCollapsed(!collapsed)}
        >
          <FaBars />
        </Button>
      </div>
      <Menu>
        <li className="my-2">
          <NavigationRailHomeItem
            collapsed={collapsed}
            href="/dashboard"
            Icon={SiStatista}
            name="لوحة التحكم"
          />
        </li>
        <li className="my-2">
          <NavigationRailItem
            collapsed={collapsed}
            href="/dashboard/offers"
            Icon={RiPresentationFill}
            name="العروض"
          />
        </li>
        <li className="my-2">
          <NavigationRailItem
            collapsed={collapsed}
            Icon={MdAttachEmail}
            href="/dashboard/contact"
            name="الرسائل"
          />
        </li>
        <li className="my-2">
          <NavigationRailItem
            collapsed={collapsed}
            href="/dashboard/users"
            Icon={FaUsers}
            name="المستخدمين"
          />
        </li>
        <li className="my-2">
          <NavigationRailItem
            collapsed={collapsed}
            href="/dashboard/articles"
            Icon={FaRegNewspaper}
            name="المقالات"
          />
        </li>
        <li className="my-2">
          <NavigationRailItem
            collapsed={collapsed}
            href="/dashboard/orders"
            Icon={MdLocalOffer}
            name="الفواتير"
          />
        </li>
      </Menu>
    </Sidebar>
  );
};

export const DashboardNavigation = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger className="block md:hidden">
        <Button asChild variant={"ghost"} size={"icon"}>
          <HiMiniBars2 size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <nav className="w-full mt-10">
          <ul className="flex items-center flex-col h-full text-center justify-center gap-5 w-full">
            <li className="w-full">
              <NavigationRailHomeItem
                onClick={toggleOpen}
                collapsed={false}
                href="/dashboard"
                Icon={SiStatista}
                name="لوحة التحكم"
              />
            </li>
            <li className="w-full">
              <NavigationRailItem
                onClick={toggleOpen}
                collapsed={false}
                href="/dashboard/offers"
                Icon={RiPresentationFill}
                name="العروض"
              />
            </li>
            <li className="w-full">
              <NavigationRailItem
                onClick={toggleOpen}
                collapsed={false}
                Icon={MdAttachEmail}
                href="/dashboard/contact"
                name="الرسائل"
              />
            </li>
            <li className="w-full">
              <NavigationRailItem
                href="/dashboard/articles"
                Icon={MdOutlineManageAccounts}
                name="المقالات"
                onClick={toggleOpen}
              />
            </li>
          </ul>
        </nav>
        <div className="flex justify-center items-center flex-col gap-1">
          {/* <ToggleTheme />
          <div className="text-foreground/70 text-sm">
            الإصدار
            <span className="mx-2">1.0.0</span>
          </div> */}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const DashboardHeader = () => {
  return (
    <header className="w-full phone-only:flex justify-between items-center hidden   bg-secondary px-4 py-2">
      <DashboardNavigation />
      <ToggleTheme />
    </header>
  );
};

export default NavigationRail;
