"use client";

import { useState } from "react";
import useLocalStorage from "use-local-storage";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/app/components/custom-submit-btn";

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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPhone) {
      setPhone(inputPhone); // Save phone number in localStorage
    }
  };

  // Render the form to add the phone number if none is found in localStorage
  if (!phone || verifyPhone !== phone) {
    return (
      <form onSubmit={handleSubmit} className="my-4 border p-4 rounded-md">
        <h2 className="text-lg font-bold">Add your phone number</h2>
        <Input
          type="number"
          value={inputPhone}
          onChange={(e) => setInputPhone(Number(e.target.value))}
          placeholder="Enter your phone number"
          className="mt-2"
          required
        />
        <SubmitButton className="mt-4">Submit</SubmitButton>
      </form>
    );
  }

  // If phone exists in localStorage, render the children
  return <div>{children}</div>;
};

export default RenderToNumber;
