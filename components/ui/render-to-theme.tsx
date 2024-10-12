"use client";

import { useTheme } from "next-themes";
import React, { ReactNode, Suspense } from "react";
import { useEffect, useState } from "react";

// Define the props for the ResabuleImage component
interface RendererProps {
  light?: ReactNode;
  dark?: ReactNode; // URL for the dark theme image
}

const RenderToTheme = React.forwardRef<HTMLDivElement, RendererProps>(
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
      <Suspense fallback={"loading..."}>
        <div ref={ref} {...props}>
          {content}
        </div>
      </Suspense>
    );
  }
);

RenderToTheme.displayName = "RenderToTheme";

export default RenderToTheme;
