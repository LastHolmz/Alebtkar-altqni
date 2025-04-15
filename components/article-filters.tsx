"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { ArticleType } from "@prisma/client";
import { ResponsiveDialogWithCustomOpenFuncionality } from "@/components/responsive-dialog";
import useQueryParam from "@/hooks/use-query-params";
import { parseArticleType } from "@/lib/parse";
import { useParams } from "next/navigation";
import { Locale } from "@/i18n-config";
type Sort = "asc" | "desc";
const ARTICLE_TYPES: ArticleType[] = ["news", "conference", "research"];

const ArticleFilters = ({
  children,
  sort = "desc",
  defaultType,
  showType = true,
}: {
  children?: ReactNode;
  sort?: Sort;
  defaultType?: ArticleType;
  showType?: boolean;
}) => {
  const { lang } = useParams();
  const [sortDate, setSortDate] = useState<Sort>(sort);
  const [selectedType, setSelectedType] = useState<ArticleType | undefined>(
    defaultType
  );
  const [isOpen, setIsOpen] = useState(false);

  const { deleteQueryParam, setQueryParam } = useQueryParam();

  const applyFilters = () => {
    setQueryParam([
      { key: "createdAt", value: sortDate },
      { key: "type", value: selectedType || null },
    ]);
    setIsOpen(false);
  };

  const resetFilters = () => {
    deleteQueryParam(["createdAt", "type"]);
    setIsOpen(false);
  };

  return (
    <ResponsiveDialogWithCustomOpenFuncionality
      dir={lang === "ar" ? "rtl" : "ltr"}
      open={isOpen}
      setOpen={setIsOpen}
      title={lang === "ar" ? "فلاتر البحث" : "Search Filters"}
      trigger={
        children || (
          <Button variant="outline" className="m-1">
            {lang === "ar" ? "تصفية" : "Filter"}
            <FilterIcon className={cn("mr-2 h-4 w-4")} />
          </Button>
        )
      }
    >
      {showType && (
        <FilterTypeSelector
          selectedCategory={selectedType}
          setSelectedCategory={setSelectedType}
          lang={lang as Locale}
        />
      )}
      <SortSelector
        sortDate={sortDate}
        setSortDate={setSortDate}
        lang={lang as Locale}
      />
      <div className="flex items-center justify-end gap-2 sm:flex-row flex-col-reverse w-full">
        <Button
          className="w-full sm:w-fit"
          variant="destructive"
          onClick={resetFilters}
        >
          {lang === "ar" ? "إعادة تعيين الفلاتر" : "Reset Filters"}
        </Button>
        <Button className="w-full sm:w-fit" onClick={applyFilters}>
          {lang === "ar" ? "تطبيق" : "Apply"}
        </Button>
      </div>
    </ResponsiveDialogWithCustomOpenFuncionality>
  );
};

export default ArticleFilters;

// Sort Selector Component
interface SortSelectorProps {
  sortDate: "asc" | "desc";
  setSortDate: Dispatch<SetStateAction<"asc" | "desc">>;
  lang: Locale;
}

function SortSelector({ sortDate, setSortDate, lang }: SortSelectorProps) {
  return (
    <div className="flex justify-between items-center my-2">
      <Label htmlFor="sortDate">
        {lang === "ar" ? "الترتيب حسب التاريخ" : "Sort by Date"}
      </Label>
      <Select
        defaultValue={sortDate}
        onValueChange={(value) => setSortDate(value as "asc" | "desc")}
      >
        <SelectTrigger
          dir={lang === "ar" ? "rtl" : "ltr"}
          className="w-[180px]"
          id="sortDate"
        >
          <SelectValue
            placeholder={lang === "ar" ? "الترتيب حسب التاريخ" : "Sort by Date"}
          />
        </SelectTrigger>
        <SelectContent dir={lang === "ar" ? "rtl" : "ltr"}>
          <SelectGroup>
            <SelectLabel>
              {lang === "ar" ? "الترتيب حسب التاريخ" : "Sort by Date"}
            </SelectLabel>
            <SelectItem value="desc">
              {lang === "ar" ? "الأحدث أولا" : "Newest First"}
            </SelectItem>
            <SelectItem value="asc">
              {lang === "ar" ? "الأقدم أولا" : "Oldest First"}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

// Filter Type Selector Component
interface FilterTypeSelectorProps {
  selectedCategory: ArticleType | undefined;
  setSelectedCategory: Dispatch<SetStateAction<ArticleType | undefined>>;
  lang: Locale;
}

function FilterTypeSelector({
  selectedCategory,
  setSelectedCategory,
  lang,
}: FilterTypeSelectorProps) {
  return (
    <div className="flex justify-between items-center my-2">
      <Label htmlFor="filterCategory">
        {lang === "ar" ? "فئة المقالة" : "Article Category"}
      </Label>
      <Select
        defaultValue={selectedCategory}
        onValueChange={(value) => setSelectedCategory(value as ArticleType)}
      >
        <SelectTrigger
          dir={lang === "ar" ? "rtl" : "ltr"}
          className="w-[180px]"
          id="filterCategory"
        >
          <SelectValue
            placeholder={lang === "ar" ? "فئة المقالة" : "Article Category"}
          />
        </SelectTrigger>
        <SelectContent dir={lang === "ar" ? "rtl" : "ltr"}>
          <SelectGroup>
            <SelectLabel>
              {lang === "ar" ? "فئة المقالة" : "Article Category"}
            </SelectLabel>
            {ARTICLE_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {parseArticleType(type, lang)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
