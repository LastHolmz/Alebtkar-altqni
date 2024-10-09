"use client";

import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import React, { ReactNode, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";

const CopyToClipBoard = ({
  children,
  className,
  value,
}: {
  children: ReactNode;
  className?: string;
  value?: string;
}) => {
  const [clicked, setClicked] = useState(false);

  function clip() {
    navigator.clipboard.writeText(value ?? "");

    // Show the toast notification
    toast({
      title: "تم النسخ",
      className: cn("bg-green-500 text-white", className),
    });

    // Set the clicked state to true after 5 seconds
    setClicked(true);

    setTimeout(() => {
      setClicked(false); // Reset the clicked state after 5 seconds
    }, 5000);
  }

  return (
    <div className="cursor-pointer" onClick={clip}>
      {clicked ? <MdOutlineDone className="text-green-500" /> : <>{children}</>}
    </div>
  );
};

export const Copy = ({ value }: { value: string }) => {
  return (
    <CopyToClipBoard value={value}>
      <IoCopyOutline />
    </CopyToClipBoard>
  );
};

export default CopyToClipBoard;
