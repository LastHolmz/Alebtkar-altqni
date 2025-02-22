import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction } from "react";
interface Props {
  open: boolean | undefined;
  setOpen?: Dispatch<SetStateAction<boolean | undefined>>;
}
const Loading = ({ open, setOpen }: Props) => {
  if (typeof open !== "undefined") {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          aria-describedby="loading"
          className="sm:w-full w-[90%] py-10 rounded-md"
        >
          <DialogTitle className="hidden"></DialogTitle>
          <div className="mx-auto grid gap-2 w-fit">
            <Loader />{" "}
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
      <DialogContent
        aria-describedby="loading"
        className="sm:w-full w-[90%] py-10 rounded-md"
      >
        <DialogTitle className="hidden"></DialogTitle>

        <div className="mx-auto grid gap-2 w-fit">
          <Loader />{" "}
          <span className="mt-2 block text-center text-primary">
            جاري التحميل ...
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Loading;

const Loader = () => {
  return (
    <div className="mx-auto">
      <div className="spinner">
        <div className="spinnerin" />
      </div>
    </div>
  );
};
