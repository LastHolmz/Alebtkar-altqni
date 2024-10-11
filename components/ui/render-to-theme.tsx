"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { ReactNode } from "react";
import { useEffect, useState } from "react";

// Define the props for the ResabuleImage component
interface ReusableImageProps {
  light?: ReactNode;
  dark?: ReactNode; // URL for the dark theme image
}

const RenderToTheme = React.forwardRef<HTMLDivElement, ReusableImageProps>(
  ({ light, dark, ...props }, ref) => {
    const { resolvedTheme } = useTheme();
    const [content, setContent] = useState(light);

    useEffect(() => {
      switch (resolvedTheme) {
        case "light":
          setContent(light);
          break;
        case "dark":
          setContent(dark);
          break;
        default:
          setContent(dark);
          break;
      }
    }, [resolvedTheme, dark, light]);
    return (
      <div ref={ref} {...props}>
        {content}
      </div>
    );
  }
);

RenderToTheme.displayName = "RenderToTheme";

export default RenderToTheme;
