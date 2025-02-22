"use client";

// import { Locale } from "@/i18n-config";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  ar?: string | ReactNode;
  en?: string | ReactNode;
}
const LangRenderer = ({ ar, en }: Props) => {
  const { lang }: { lang?: "ar" | "en" } = useParams();
  if (lang === "ar") {
    return <>{ar}</>;
  }
  if (lang === "en") {
    return <>{en}</>;
  }
  return <>{ar}</>;
};

export default LangRenderer;
