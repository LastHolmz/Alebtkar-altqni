"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { BreadcrumbSeparator } from "./ui/breadcrumb";
import { useParams } from "next/navigation";

const LangBreadcrumbSeparator = () => {
  const { lang } = useParams();
  return (
    <BreadcrumbSeparator>
      {lang === "en" ? <ChevronRight /> : <ChevronLeft />}
    </BreadcrumbSeparator>
  );
};

export default LangBreadcrumbSeparator;
