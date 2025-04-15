"use client";

import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n-config";
import { CustomLink } from "./custom-link";
export default function LocaleSwitcher({
  varians = "default",
  className,
  arTitle = "ع",
  enTitle = "A",
}: {
  varians?: variants;
  className?: string;
  arTitle?: string;
  enTitle?: string;
}) {
  const pathname = usePathname();
  const { lang }: { lang: Locale } = useParams();
  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <CustomLink
      href={redirectedPathname(lang === "ar" ? "en" : "ar")}
      variant={varians}
      size={"icon"}
      className={cn(
        "block text-center font-bold text-lg",
        lang === "ar" && "content-center",
        className
      )}
    >
      {lang === "en" ? arTitle : enTitle}
    </CustomLink>
  );
}
