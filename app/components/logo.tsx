"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Logo = () => {
  const { resolvedTheme } = useTheme();
  const [src, setSrc] = useState("/logo.png");

  useEffect(() => {
    switch (resolvedTheme) {
      case "light":
        setSrc("/logo.png");
        break;
      case "dark":
        setSrc("/dark-logo.png");
        break;
      default:
        setSrc("/logo.png");
        break;
    }
  }, [resolvedTheme]);

  return (
    <Link href={"/"} className=" w-20 h-10 overflow-hidden">
      <Image
        src={src}
        alt="Alebtkar-logo"
        width={100}
        height={100}
        priority
        className="object-cover w-full h-full"
      />
    </Link>
  );
};

export default Logo;
