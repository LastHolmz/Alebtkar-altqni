"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MdOutlineLaptopChromebook } from "react-icons/md";
import { CiDark, CiLight } from "react-icons/ci";

export default function ToggleTheme() {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <Tabs defaultValue={theme}>
        <TabsList className=" rounded-full border-foreground border text-foreground m-0 p-0">
          <TabsTrigger
            value="dark"
            className="rounded-full w-10 h-9"
            onClick={() => setTheme("light")}
          >
            <CiLight size={18} />
          </TabsTrigger>
          <TabsTrigger
            className="rounded-full w-10 h-9"
            value="light"
            onClick={() => setTheme("dark")}
          >
            <CiDark size={18} />
          </TabsTrigger>
          <TabsTrigger
            className="rounded-full w-10 h-9"
            value="system"
            onClick={() => setTheme("system")}
          >
            <MdOutlineLaptopChromebook size={18} />
          </TabsTrigger>
        </TabsList>
        {/* <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs> */}
      </Tabs>
      {/* <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">تغيير المظهر</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            فاتح
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            داكن
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            الوضع التلقائي
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </>
  );
}
