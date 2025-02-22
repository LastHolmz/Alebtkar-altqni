import React, { ReactNode } from "react";
import NavigationRail, { DashboardHeader } from "./components/naviagation-rail";

const layout = ({ children }: { children: ReactNode }) => {
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
