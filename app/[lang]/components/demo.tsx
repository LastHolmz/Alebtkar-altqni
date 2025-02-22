import { CustomLink } from "@/components/ui/custom-link";
import Image from "next/image";
import React from "react";

export const DemoCard = ({ bio, href, image, title, price }: Demo) => {
  return (
    <div className="min-h-10 duration-500 transition-all hover:bg-card/70 hover:cursor-pointer rounded-lg flex-col border bg-card text-card-foreground flex items-center overflow-hidden justify-center shadow-sm hover:shadow-lg hover:scale-105">
      <div className="min-h-10  border bg-card text-card-foreground flex items-center overflow-hidden justify-center shadow-sm">
        <Image
          src={image}
          alt={bio}
          width={1000}
          height={1000}
          loading="lazy"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="px-2 py-4 w-full">
        <div className="flex justify-between items-center gap-2">
          <p className="text-sm w-full flex-1 tracking-widest">{title}</p>
          <span className="text-primary/90 bg-primary/20 px-1 py-0.5 rounded flex gap-1 justify-center items-center">
            {price} <span>د</span>
          </span>
        </div>
        <p className="my-2 text-foreground/70 text-xs tracking-widest">{bio}</p>
        <CustomLink className="w-full mt-2" size={"sm"} href={href}>
          تجربة
        </CustomLink>
      </div>
    </div>
  );
};
