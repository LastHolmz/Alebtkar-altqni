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
          className={cn("rounded-xl w-9 h-9 p-0")}
          onClick={() => setTheme("light")}
          value="light"
        >
          <CiLight size={16} />
        </TabsTrigger>
        <TabsTrigger
          value="dark"
          className={cn("rounded-xl w-9 h-9 p-0")}
          onClick={() => setTheme("dark")}
        >
          <CiDark size={16} />
        </TabsTrigger>
        <TabsTrigger
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
