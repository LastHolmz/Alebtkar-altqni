import Image from "next/image";
import Link from "next/link";
import React, { Fragment, ReactNode, Suspense } from "react";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n-config";
import { formatToDate } from "@/lib/date";
import { extractText } from "@/lib/text";
import { ArticleType } from "@prisma/client";
import LangRenderer from "@/components/lang";
import { Skeleton } from "@/components/ui/skeleton";

interface CardProps {
  title: string;
  body: string; // HTML string
  src: string;
  href?: string;
  edit?: boolean;
  children?: ReactNode;
  className?: string;
  lang?: Locale;
  createdAt: Date;
  views?: number;
  type: ArticleType;
}

const ArticleCard: React.FC<CardProps> = ({
  title,
  body,
  src,
  href = "#",
  edit = false,
  children,
  className,
  lang,
  createdAt,
  views,
  type,
}) => {
  // Truncate the HTML body into plain text
  const truncatedBody = extractText(body, 200);

  return (
    <Suspense fallback={<ArticleCardSkeleton />}>
      <div
        dir={lang === "en" ? "ltr" : "rtl"}
        className={cn(
          "max-w-full flex relative flex-col justify-between border duration-300 transition-colors hover:bg-accent border-foreground/20 bg-accent/30 rounded-lg shadow",
          className
        )}
      >
        <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded-md text-sm font-semibold">
          {type}
        </div>
        <Link
          href={href}
          className="w-full block overflow-hidden max-w-full h-64 content-center max-h-96"
        >
          <Image
            className="rounded-t-lg w-full h-full object-cover"
            src={src}
            alt={title}
            width={1000}
            height={1000}
          />
        </Link>
        <div className="p-5 flex flex-col justify-between flex-1">
          <Link href={href}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
              {title}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-foreground/80">{truncatedBody}</p>
          {edit ? (
            <Fragment>{children}</Fragment>
          ) : (
            <div className="flex justify-between items-center">
              {" "}
              <Link
                href={href}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <LangRenderer ar="اقرأ المزيد" en="Read more" />
              </Link>
              <div
                className={cn(
                  "flex flex-col items-start gap-1",
                  lang === "en" && "items-end"
                )}
              >
                <div className="text-sm rounded-md py-0.5 px-2 text-white bg-green-400 dark:bg-green-600">
                  {formatToDate(new Date(createdAt))}
                </div>
                <div className="text-sm text-foreground/60">
                  {lang === "ar" ? `${views} مشاهدة` : `${views} views`}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
};

const ArticleCardSkeleton: React.FC = () => {
  return (
    <Skeleton className="max-w-sm border shadow">
      {/* Skeleton for image */}
      <Skeleton className="h-48  rounded-t-lg"></Skeleton>
      <Skeleton className="p-5">
        {/* Skeleton for title */}
        <Skeleton className="h-6  rounded mb-3 w-3/4"></Skeleton>
        {/* Skeleton for body */}
        <Skeleton className="h-4  rounded mb-2 w-full"></Skeleton>
        <Skeleton className="h-4  rounded mb-4 w-5/6"></Skeleton>
        {/* Skeleton for button */}
        <Skeleton className="h-8 rounded w-24"></Skeleton>
      </Skeleton>
    </Skeleton>
  );
};

export default ArticleCard;
