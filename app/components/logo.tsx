import ReusableImage from "@/components/ui/reuable-image";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Logo = ({
  withLink = true,
  className,
}: {
  withLink?: boolean;
  className?: string;
}) => {
  if (withLink) {
    return (
      <Link href={"/"} className={cn("overflow-hidden", className)}>
        <ReusableImage
          priority
          dark="/dark-logo.png"
          light="/logo.png"
          alt="Elbtkar-logo"
          className={cn("object-cover w-full h-full")}
        />
      </Link>
    );
  } else {
    return (
      <ReusableImage
        priority
        dark="/dark-logo.png"
        light="/logo.png"
        alt="Elbtkar-logo"
        className={cn("object-cover w-full h-full", className)}
      />
    );
  }
};

export default Logo;
