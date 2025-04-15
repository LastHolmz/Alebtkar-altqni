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
import { ResponsiveDialogWithCustomOpenFuncionality } from "./responsive-dialog";
import useQueryParam from "@/hooks/use-query-params";
import { useParams } from "next/navigation";
import { Locale } from "@/i18n-config";

type Display = "list" | "grid";

const ALLOWED_VALUES: string[] = ["50", "25", "15"];
const ArticleSettings = ({
  children,
  defaultDisplay = "list",
  take: defaultTake = "25",
}: {
  children?: ReactNode;
  defaultDisplay?: Display;
  take?: string;
}) => {
  const { lang } = useParams();
  const [view, setView] = useState<Display>(defaultDisplay);
  const [take, setTake] = useState<string>(defaultTake);
  const [isOpen, setIsOpen] = useState(false);

  const { deleteQueryParam, setQueryParam } = useQueryParam();

  const applyFilters = () => {
    setQueryParam([
      { key: "view", value: view },
      { key: "take", value: take },
    ]);
    setIsOpen(false);
  };

  const resetFilters = () => {
    deleteQueryParam(["view", "take"]);
    setIsOpen(false);
  };

  return (
    <ResponsiveDialogWithCustomOpenFuncionality
      dir={lang === "ar" ? "rtl" : "ltr"}
      open={isOpen}
      setOpen={setIsOpen}
      title={lang === "ar" ? "الإعدادات" : "Settings"}
      trigger={
        children || (
          <Button variant="outline" className="m-1">
            {lang === "ar" ? "الإعدادات" : "Settings"}
            <FilterIcon className={cn("mr-2 h-4 w-4")} />
          </Button>
        )
      }
    >
      <AmountPerPageSelector
        take={take}
        setTake={setTake}
        lang={lang as Locale}
      />
      <ViewSelector view={view} setView={setView} lang={lang as Locale} />
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

export default ArticleSettings;

interface ViewSelectorProps {
  view: "grid" | "list";
  setView: Dispatch<SetStateAction<"grid" | "list">>;
  lang: Locale;
}

function ViewSelector({ view, setView, lang }: ViewSelectorProps) {
  return (
    <div className="flex justify-between items-center my-2">
      <Label htmlFor="view">
        {lang === "ar" ? "طريقة العرض" : "Display Style"}
      </Label>
      <Select
        defaultValue={view}
        onValueChange={(value) => setView(value as "grid" | "list")}
      >
        <SelectTrigger
          dir={lang === "ar" ? "rtl" : "ltr"}
          className="w-[180px]"
          id="view"
        >
          <SelectValue
            placeholder={lang === "ar" ? "طريقة العرض" : "Display Style"}
          />
        </SelectTrigger>
        <SelectContent dir={lang === "ar" ? "rtl" : "ltr"}>
          <SelectGroup>
            <SelectLabel>
              {lang === "ar" ? "طريقة العرض" : "Display Style"}
            </SelectLabel>
            <SelectItem value="grid">
              {lang === "ar" ? "شبكة" : "Grid"}
            </SelectItem>
            <SelectItem value="list">
              {lang === "ar" ? "قائمة" : "List"}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

interface PerPageSelectorProps {
  take: string;
  setTake: Dispatch<SetStateAction<string>>;
  lang: Locale;
}

function AmountPerPageSelector({ take, setTake, lang }: PerPageSelectorProps) {
  return (
    <div className="flex justify-between items-center my-2">
      <Label htmlFor="take">
        {lang === "ar" ? "عدد المقالات" : "Articles Per Page"}
      </Label>
      <Select
        defaultValue={take}
        onValueChange={(value) => setTake(value as string)}
      >
        <SelectTrigger
          dir={lang === "ar" ? "rtl" : "ltr"}
          className="w-[180px]"
          id="take"
        >
          <SelectValue
            placeholder={lang === "ar" ? "عدد المقالات" : "Articles Per Page"}
          />
        </SelectTrigger>
        <SelectContent dir={lang === "ar" ? "rtl" : "ltr"}>
          <SelectGroup>
            <SelectLabel>
              {lang === "ar" ? "عدد المقالات" : "Articles Per Page"}
            </SelectLabel>
            {ALLOWED_VALUES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
