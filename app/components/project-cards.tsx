import { cn, formatDate, parseUri } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({
  big = false,
  href,
  src,
  alt,
  title,
}: {
  big?: boolean;
  href?: string;
  src: string;
  title: string;
  alt?: string;
}) => {
  return (
    <Link
      href={href ? `/projects/${href}` : `/projects/${parseUri(title)}`}
      className={cn(
        "group relative flex h-80  items-end overflow-hidden  bg-gray-100 shadow-lg md:h-80",
        big && "col-span-2"
      )}
    >
      <div className="transition-all duration-500 w-full h-0 bg-foreground/40 group-hover:w-full group-hover:h-full absolute top-0 left-0 z-40"></div>
      <Image
        src={src}
        loading="lazy"
        alt={alt ? alt : `${title} main photo`}
        width={1000}
        height={1000}
        className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
      <div className="transition-all capitalize duration-500 bottom-0 group-hover:bottom-0 absolute lg:bottom-[-100%] left-0 bg-background/90 w-full h-16 flex justify-center items-center z-50">
        {title}
      </div>
    </Link>
  );
};

export { ProjectCard };
