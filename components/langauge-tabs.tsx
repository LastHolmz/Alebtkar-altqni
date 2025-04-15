"use client";

import { Locale } from "@/i18n-config";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

interface LanguageTabsProps {
  arabicContent: ReactNode;
  englishContent: ReactNode;
  className?: string;
}

const LanguageTabs = ({
  arabicContent,
  englishContent,
  className,
}: LanguageTabsProps) => {
  const [selectedLang, setSelectedLang] = useState<Locale>("ar");

  const handleLangChange = (lang: Locale) => {
    setSelectedLang(lang);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="w-fit mx-auto bg-secondary px-2 py-1 rounded-lg flex justify-start items-center gap-2">
        <button
          type="button"
          onClick={() => handleLangChange("ar")}
          className={cn(
            "rounded-md px-2 py-1 transition-all",
            selectedLang === "ar" && "bg-foreground text-background"
          )}
        >
          العربية
        </button>
        <button
          type="button"
          onClick={() => handleLangChange("en")}
          className={cn(
            "rounded-md px-2 py-1 transition-all",
            selectedLang === "en" && "bg-foreground text-background"
          )}
        >
          English
        </button>
      </div>
      <div className="py-2">
        <div
          dir="rtl"
          className={cn(
            "hidden transition-all",
            selectedLang === "ar" && "block"
          )}
        >
          {arabicContent}
        </div>
        <div
          dir="ltr"
          className={cn(
            "hidden transition-all",
            selectedLang === "en" && "block"
          )}
        >
          {englishContent}
        </div>
      </div>
    </div>
  );
};

export default LanguageTabs;
