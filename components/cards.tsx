import { parseArticleType } from "@/lib/parse";
import { extractText } from "@/lib/text";
import { cn } from "@/lib/utils";
import { ArticleType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LangRenderer from "./lang";

interface SideCardProps {
  imageUrl: string;
  title: string;
  description: string;
  link: string;
  readTime?: nullable | number;
  views?: number;
}

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  authorName: string;
  authorImageUrl: string;
  date: string;
  href: string;
  lang: "ar" | "en";
  type: ArticleType;
  views?: number;
}

const SideCard: React.FC<SideCardProps> = ({
  imageUrl,
  title,
  description,
  link,
  readTime,
}) => {
  return (
    <Link
      href={link}
      className="relative justify-between  hover:underline shadow-secondary flex flex-col-reverse md:flex-row items-start w-full mt-3"
    >
      <div className="px-2 flex flex-col h-full justify-between py-4">
        <div>
          <h4 className="mb-2 text-foreground text-xl font-semibold">
            {title}
          </h4>
          <p className="mb-8 text-foreground leading-normal font-light">
            {description}
          </p>
          {readTime && (
            <span className="my-2 text-foreground/80 hover:no-underline no-underline">
              <LangRenderer
                ar={`${readTime} دقائق للمطالعة`}
                en={`${readTime} minutes to read`}
              />
            </span>
          )}
        </div>
      </div>
      <div className="md:w-3/12 phone-only:w-full phone-only:h-64 md:shrink-0 rounded-md overflow-hidden h-36">
        <Image
          width={500}
          height={500}
          src={imageUrl}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </div>
    </Link>
  );
};

const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  description,
  authorName,
  authorImageUrl,
  date,
  href,
  lang,
  type,
  views = 0,
}) => {
  return (
    <Link
      href={href}
      dir={lang === "en" ? "ltr" : "rtl"}
      className="max-w-full"
    >
      <div className="relative flex flex-col rounded-xl h-full my-6 bg-secondary shadow-sm">
        <div className="relative h-56 m-2.5 overflow-hidden text-foreground rounded-md">
          <Image src={imageUrl} alt="card-image" width={1000} height={1000} />
        </div>
        <div className="flex h-1/2 flex-col justify-between">
          {" "}
          <div className="p-4">
            <div
              className={cn(
                "mb-4 rounded py-0.5 px-2  text-xs transition-all shadow-sm w-20 content-center text-center",
                type === "research" &&
                  "dark:bg-cyan-700 text-cyan-700 dark:text-cyan-200 bg-cyan-200",
                type === "news" &&
                  "dark:bg-rose-700 text-rose-700 dark:text-rose-200 bg-rose-200",
                type === "conference" &&
                  "dark:bg-sky-700 text-sky-700 dark:text-sky-200 bg-sky-200",
                type === "article" &&
                  "dark:bg-yellow-700 text-yellow-700 dark:text-yellow-200 bg-yellow-200"
              )}
            >
              {parseArticleType(type, lang)}
            </div>
            <h6 className="mb-2 text-foreground text-xl font-semibold">
              {title}
            </h6>
            <p className="text-foreground/80 leading-normal text-sm font-light">
              {extractText(description, 200)}
            </p>
          </div>
          {/* <div className="flex items-center justify-between p-4">
            <div className="flex items-center mb-4">
              <Image
                alt={authorName}
                width={100}
                height={100}
                src={authorImageUrl}
                className="relative inline-block h-8 w-8 rounded-full"
              />
              <div className="flex flex-col mx-3 text-foreground/90 text-sm">
                <span className="font-semibold">{authorName}</span>
                <span>{date}</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </Link>
  );
};

export { Card, SideCard };
