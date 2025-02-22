"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import React from "react";
import { CiShare2 } from "react-icons/ci";

const Share = ({ value }: { value: string }) => {
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() => {
        navigator.clipboard.writeText(value);
        toast({ title: "تم النسخ الى الحافظة" });
      }}
    >
      <CiShare2 size={24} />
    </Button>
  );
};

export default Share;
