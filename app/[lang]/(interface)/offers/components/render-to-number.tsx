"use client";

import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/app/[lang]/components/custom-submit-btn";
import { toast } from "@/hooks/use-toast";

const RenderToNumber = ({
  phone: verifyPhone,
  children,
}: {
  phone: number;
  children: React.ReactNode;
}) => {
  // Use localStorage to store phone
  const [phone, setPhone] = useLocalStorage<number | null>("phone", null);
  const [inputPhone, setInputPhone] = useState<number | "">("");

  // Function to remove leading zero from phone number
  const removeLeadingZero = (phoneNumber: string) => {
    if (phoneNumber.startsWith("0")) {
      return phoneNumber.substring(1); // Remove the leading zero
    }
    return phoneNumber;
  };

  // useEffect to detect if input value starts with '0' and remove it
  useEffect(() => {
    if (inputPhone !== "") {
      const phoneWithoutZero = removeLeadingZero(inputPhone.toString());
      setInputPhone(Number(phoneWithoutZero));
    }
  }, [inputPhone]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPhone) {
      setPhone(inputPhone); // Save phone number in localStorage
    } else {
      toast({ title: "الارقام غير متطابقة" });
    }
  };

  if (!phone || verifyPhone !== phone) {
    return (
      <div className=" min-h-[50vh] flex justify-center items-center">
        <form onSubmit={handleSubmit} className="my-4  p-4 rounded-md">
          <h2 className="text-lg font-bold">ادخل رقم هاتفك او كلمة السر</h2>
          <Input
            type="text"
            value={inputPhone}
            onChange={(e) => setInputPhone(Number(e.target.value))}
            placeholder="Enter your phone number"
            className="mt-2"
            required
          />
          <SubmitButton className="mt-4">تأكيد</SubmitButton>
        </form>
      </div>
    );
  }

  // If phone exists in localStorage, render the children
  return <div>{children}</div>;
};

export default RenderToNumber;
