import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

const Info = ({ children, info }: { children: ReactNode; info: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="z-50">{children}</TooltipTrigger>
        <TooltipContent>
          <p>{info}</p>
          <span className="sr-only">{info}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Info;
