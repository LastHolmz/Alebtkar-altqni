import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
interface Props {
  open: boolean | undefined;
  setOpen?: Dispatch<SetStateAction<boolean | undefined>>;
}
const Loading = ({ open, setOpen }: Props) => {
  if (typeof open !== "undefined") {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:w-full w-[90%] py-10 rounded-md">
          <div className="mx-auto grid gap-2 w-fit">
            <AiOutlineLoading3Quarters className="spin mx-auto  w-12 h-12 text-primary" />
            <span className="mt-2 block text-center text-primary">
              جاري التحميل ...
            </span>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:w-full w-[90%] py-10 rounded-md">
        <div className="mx-auto grid gap-2 w-fit">
          <AiOutlineLoading3Quarters className="spin mx-auto  w-12 h-12 text-primary" />
          <span className="mt-2 block text-center text-primary">
            جاري التحميل ...
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Loading;
