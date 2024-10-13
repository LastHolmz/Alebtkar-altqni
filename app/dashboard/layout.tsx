import React, { ReactNode } from "react";
import { checkRole } from "@/lib/roles";
import { SignIn } from "@clerk/nextjs";
import NavigationRail, { DashboardHeader } from "./components/naviagation-rail";

const layout = ({ children }: { children: ReactNode }) => {
  if (!checkRole("admin")) {
    return (
      <main className="flex justify-center items-center h-screen">
        <SignIn routing="hash" />
      </main>
    );
  }

  return (
    <main
      className="flex relative flex-start gap-1 min-h-screen bg-background"
      dir="rtl"
    >
      <section className="md:bg-background hidden md:block">
        <NavigationRail />
      </section>

      <section className="flex-1 max-w-full">
        <DashboardHeader />
        {children}
      </section>
    </main>
  );
};

export default layout;
