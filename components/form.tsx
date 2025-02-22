"use client";
import { toast } from "@/hooks/use-toast";
import { ReactNode, useActionState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import SubmitButton from "./submit-button";

type Action = (
  prevState: { message: string },
  formData: FormData
) => Promise<{ message: string }>;

interface Props {
  action: Action;
  className?: string;
  children: ReactNode;
  success?: string;
  replaceLink?: string;
  dontReplace?: boolean;
  submit?: ReactNode | string;
  submitClass?: string;
}

const Form = ({
  action,
  className,
  children,
  success = "تمت العملية بنجاح",
  replaceLink = "/",
  dontReplace = false,
  submit = "تم",
  submitClass,
}: Props) => {
  const router = useRouter();
  const [msg, dispatch, pending] = useActionState(action, { message: "" });

  useEffect(() => {
    if (!msg.message) return;

    toast({ title: msg.message });

    if (msg.message === success) {
      if (!dontReplace) router.replace(replaceLink);
    }
  }, [msg, success, replaceLink, dontReplace, router]);

  return (
    <form action={dispatch} className={cn(className)}>
      {children}
      <SubmitButton className={cn(submitClass)} pending={pending}>
        {submit}
      </SubmitButton>
    </form>
  );
};

export default Form;
