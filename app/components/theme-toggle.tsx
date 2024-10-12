"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MdOutlineLaptopChromebook } from "react-icons/md";
import { CiDark, CiLight } from "react-icons/ci";
import { cn } from "@/lib/utils";

export default function ToggleTheme() {
  const { setTheme, theme } = useTheme();

  return (
    <Tabs defaultValue={theme ?? "system"}>
      <TabsList className="rounded-xl  border text-foreground m-0 p-0">
        <TabsTrigger
          aria-label="light mode on"
          className={cn("rounded-xl w-9 h-9 p-0")}
          onClick={() => setTheme("light")}
          value="light"
        >
          <CiLight size={16} />
        </TabsTrigger>
        <TabsTrigger
          aria-label="dark mode on"
          value="dark"
          className={cn("rounded-xl w-9 h-9 p-0")}
          onClick={() => setTheme("dark")}
        >
          <CiDark size={16} />
        </TabsTrigger>
        <TabsTrigger
          aria-label="mode on system"
          className={cn("rounded-xl w-9 h-9 p-0")}
          value="system"
          onClick={() => setTheme("system")}
        >
          <MdOutlineLaptopChromebook size={16} />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
