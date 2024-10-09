import React, { ReactNode } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
interface Props {
  children?: ReactNode;
  trigger: ReactNode;
  title?: string;
  description?: string;
  footer?: boolean;
}
export default function ResponsiveDialog({
  children,
  trigger,
  description,
  title,
  footer = true,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent dir="rtl" className="sm:max-w-[425px]">
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="px-2" dir="rtl">
        <DrawerHeader className="text-right">
          {title && <DrawerTitle>{title}</DrawerTitle>}
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        {children}
        {footer && (
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                إلغاء
              </Button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
export function ResponsiveDialogWithCustomOpenFuncionality({
  children,
  trigger,
  description,
  title,
  open,
  setOpen,
}: Props & {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent dir="rtl" className="sm:max-w-[425px] px-4 py-8">
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent dir="rtl" className="px-2 py-1">
        <DrawerHeader className="text-right">
          {title && <DrawerTitle>{title}</DrawerTitle>}
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">إلغاء</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
