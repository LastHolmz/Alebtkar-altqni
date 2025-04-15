"use client";

import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/app/[lang]/components/custom-submit-btn";
import { toast } from "@/hooks/use-toast";

type Lang = "ar" | "en";

const RenderToNumber = ({
  phone: verifyPhone,
  children,
  lang = "ar",
}: {
  phone: number;
  children: React.ReactNode;
  lang?: Lang;
}) => {
  const [phone, setPhone] = useLocalStorage<number | null>("phone", null);
  const [inputPhone, setInputPhone] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const removeLeadingZero = (value: string) =>
    value.startsWith("0") ? value.slice(1) : value;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = removeLeadingZero(inputPhone.trim());

    if (!sanitized || isNaN(Number(sanitized))) {
      return toast({
        title: lang === "ar" ? "رقم الهاتف غير صالح" : "Invalid phone number",
      });
    }

    if (Number(sanitized) !== verifyPhone) {
      return toast({
        title:
          lang === "ar" ? "الأرقام غير متطابقة" : "Phone numbers don't match",
      });
    }

    setPhone(Number(sanitized));
  };

  if (!isMounted) {
    // Return null or a loading state during SSR and initial hydration
    return null;
  }

  if (!phone || verifyPhone !== phone) {
    return (
      <div className="min-h-[50vh] flex justify-center items-center">
        <form onSubmit={handleSubmit} className="my-4 p-4 rounded-md">
          <h2 className="text-lg font-bold mb-2">
            {lang === "ar"
              ? "ادخل رقم هاتفك أو كلمة السر"
              : "Enter your phone number or password"}
          </h2>
          <Input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            value={inputPhone}
            onChange={(e) => setInputPhone(e.target.value)}
            placeholder={
              lang === "ar"
                ? "أدخل رقم الهاتف بدون صفر"
                : "Enter phone number (no leading 0)"
            }
            required
          />
          <SubmitButton className="mt-4">
            {lang === "ar" ? "تأكيد" : "Confirm"}
          </SubmitButton>
        </form>
      </div>
    );
  }

  return <>{children}</>;
};

export default RenderToNumber;
