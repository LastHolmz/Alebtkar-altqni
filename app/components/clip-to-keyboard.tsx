"use client";

import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const ClipToKeyBoard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  function clip() {
    toast({
      title: "تم النسخ",
      className: cn("bg-green-500 text-white", className),
    });
  }
  return (
    <div className=" cursor-copy" onClick={clip}>
      {children}
    </div>
  );
};

export default ClipToKeyBoard;
