"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils";

const SearchInput = ({
  placeholder = "البحث بالاسم ...",
  query,
  waiting = 300,
  className,
}: {
  placeholder?: string;
  query: string;
  waiting?: number;
  className?: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [value, setValue] = useState(searchParams.get(query)?.toString() ?? "");
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(query, term);
    } else {
      params.delete(query);
    }
    replace(`${pathname}?${params.toString()}`);
  }, waiting);
  useEffect(() => {
    // setValue(value.trim());
    handleSearch(value);
  }, [value]);

  return (
    <Input
      className={cn(className)}
      placeholder={placeholder}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      value={value}
      type={"text"}
    />
  );
};

export default SearchInput;
