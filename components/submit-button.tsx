"use client";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import Loading from "./loading";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  type?: "submit" | "reset" | "button" | undefined;
  forceOpen?: boolean;
  pending: boolean;
}

export default function SubmitButton({
  children,
  className,
  size,
  variant,
  type,
  forceOpen,
  pending,
  ...rest
}: SubmitButtonProps) {
  // const { pending } = useFormStatus();
  // useEffect(() => {
  //   console.log(`pending: ${pending}`);
  // }, [pending]);

  return (
    <>
      {pending && <Loading open={forceOpen} setOpen={undefined} />}
      <Button
        className={cn("w-full md:w-auto", className, pending && "cursor-wait")}
        size={size}
        variant={variant}
        type={type}
        disabled={pending}
        aria-disabled={pending}
        {...rest}
        aria-label="submit"
      >
        {pending ? <ReloadIcon className="spin-animation" /> : children}
      </Button>
    </>
  );
}
