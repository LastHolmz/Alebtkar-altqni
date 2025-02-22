"use client";
import { ReactNode, useEffect, useState, useActionState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ResponsiveDialogWithCustomOpenFuncionality } from "./responsive-dialog";
import { toast } from "@/hooks/use-toast";

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
  trigger: ReactNode;
  title?: string;
  description?: string;
  dontReplace?: boolean;
  stopClosing?: boolean;
}

/**
 * Accessible form component with custom dialog, actions, and success handling.
 *
 * @param {Action} action - The async function to be called on form submission.
 * @param {string} [className] - Optional class names for the form.
 * @param {ReactNode} children - The form elements.
 * @param {string} [success] - Message to display on successful action.
 * @param {string} [replaceLink] - URL to navigate to after success. Defaults to "/".
 * @param {ReactNode} trigger - Trigger element to open the dialog.
 * @param {string} [title] - Dialog title.
 * @param {string} [description] - Dialog description.
 * @param {boolean} [dontReplace=false] - Whether to prevent navigation on success.
 * @param {boolean} [stopClosing=false] - Whether to prevent the dialog from closing automatically.
 */
const AccessibleDialogForm = ({
  action,
  className,
  children,
  success,
  replaceLink = "/",
  trigger,
  title,
  description,
  dontReplace = false,
  stopClosing = false,
}: Props) => {
  const router = useRouter();
  const [msg, dispatch] = useActionState(action, { message: "" });
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    if (!stopClosing) setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!msg.message) return;

    toast({ title: msg.message });
    if (msg.message === (success || "تمت العملية بنجاح")) {
      if (!dontReplace) router.replace(replaceLink);
      toggleOpen();
    }
  }, [msg, success, replaceLink, dontReplace, router]);

  return (
    <ResponsiveDialogWithCustomOpenFuncionality
      trigger={trigger}
      setOpen={setOpen}
      open={open}
      description={description}
      title={title}
    >
      <form dir="rtl" action={dispatch} className={cn(className)}>
        {children}
      </form>
    </ResponsiveDialogWithCustomOpenFuncionality>
  );
};

export default AccessibleDialogForm;
