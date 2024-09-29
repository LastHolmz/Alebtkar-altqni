"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image, { ImageProps } from "next/image";
import React from "react";
import { useEffect, useState } from "react";

// Define the props for the ResabuleImage component
interface ReusableImageProps extends Omit<ImageProps, "src"> {
  light: string; // URL for the light theme image
  dark: string; // URL for the dark theme image
}

const ReusableImage = React.forwardRef<HTMLImageElement, ReusableImageProps>(
  ({ light, dark, alt, className, ...props }, ref) => {
    const { resolvedTheme } = useTheme();
    const [src, setSrc] = useState(light);

    useEffect(() => {
      switch (resolvedTheme) {
        case "light":
          setSrc(light);
          break;
        case "dark":
          setSrc(dark);
          break;
        default:
          setSrc(dark);
          break;
      }
    }, [resolvedTheme, dark, light]);

    return (
      <Image
        ref={ref} // Forward the ref to the Image component
        src={src}
        alt={alt ?? ""}
        width={500}
        height={500}
        {...props} // Pass any additional props (e.g., width, height, etc.)
        className={cn(className)}
      />
    );
  }
);

ReusableImage.displayName = "ReusableImage";

export default ReusableImage;
