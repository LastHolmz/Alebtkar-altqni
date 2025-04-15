import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { getArticles } from "@/database/articles";
import LangBreadcrumbSeparator from "@/components/breadcrumb-separator";
import LangRenderer from "@/components/lang";
import uri from "@/lib/uri";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Article, ArticleType, User } from "@prisma/client";
import { Locale } from "@/i18n-config";
import { Card, SideCard } from "@/components/cards";
import SearchInput from "@/components/search";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RiSettings4Line } from "react-icons/ri";
import { TbFilterCog } from "react-icons/tb";
import ArticleFilters from "@/components/article-filters";
import { extractText } from "@/lib/text";
import { Separator } from "@/components/ui/separator";
import ArticleSettings from "@/components/article-settings";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/date";

// **2. Generate Metadata**
export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang;

  const siteInfo = {
    ar: {
      title: "المركز الليبي لبحوث اللدائن | المقالات",
    },
    en: {
      title: "Libyan Center for Polymer Research | Articles",
      description:
        "A scientific institution specializing in polymer research and technology, established by Decision No. 625 of 1999 as a specialized research center aiming to achieve comprehensive technological and scientific progress in polymer technology and its applications.",
    },
  };

  const info = siteInfo[lang as "ar" | "en"];
  const logo = "/logo.png"; // Update this path to your actual logo location
  const url =
    process.env.NODE_ENV === "production" ? uri : "http://localhost:3000";

  return {
    title: info.title,
    // description: info.description,
    openGraph: {
      title: info.title,
      // description: info.description,
      url: url,
      images: [
        {
          url: logo,
          alt: info.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: info.title,
      // description: info.description,
      images: [logo],
    },
    alternates: {
      canonical: url,
    },

    // jsonLd: JSON.stringify(jsonLd), // Embeds JSON-LD in the head
  };
}

interface ArticleContent extends Article {
  author?: User;
}

// **3. Articles Page Component**
const ArticlesPage = async (props: {
  params: Promise<{ lang: string }>;
  searchParams?: Promise<{
    page?: string;
    query?: string;
    createdAt?: "asc" | "desc";
    type?: string;
    take?: string;
    view?: string;
  }>;
}) => {
  const params = await props.params;
  const searchParams = await props?.searchParams;
  const lang = params.lang;
  let take = 25;
  let page: number = 1;
  const list =
    searchParams?.view === "list" ||
    searchParams?.view === undefined ||
    searchParams?.view === null ||
    !searchParams?.view;
  if (searchParams && searchParams.page) {
    if (!Number.isNaN(Number(searchParams.page))) {
      page = Number(searchParams.page);
    }
  }
  if (searchParams && searchParams.take) {
    if (!Number.isNaN(Number(searchParams.take))) {
      take = Number(searchParams.take);
    }
  }

  const articles: ArticleContent[] = await getArticles({
    take,
    page,
    debug: true,
    author: true,
    content: searchParams?.query,
    createdAt: searchParams?.createdAt,
    // type: searchParams?.type ? [searchParams?.type as ArticleType] : undefined,
    // type: ["article"],
  });
  const articlesNumber = await getArticles({
    select: { id: true },
    // type: ["article"],
  });

  const allPages = Math.ceil(articlesNumber.length / take);

  return (
    <main className="phone-only:px-4 relative py-2 min-h-[50vh]">
      <div className="my-2 md:my-4 px-2 md:px-16 xl:px-24">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${lang}`}>
                  <LangRenderer ar={"الرئيسية"} en={"Home"} />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <LangBreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <LangRenderer ar={"المقالات"} en={"Articles"} />
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex justify-between phone-only:flex-col items-center">
          <div className="mt-8">
            <h1 className="my-4 font-bold md:text-[60px] text-2xl leading-[64px]">
              <LangRenderer ar={"المقالات"} en={"Articles"} />
            </h1>
          </div>
          <div className="flex flex-col phone-only:justify-between md:min-w-1/2 phone-only:w-full gap-2">
            <SearchInput
              query={"query"}
              placeholder={lang === "ar" ? "ابحث هنا" : "type here"}
              className={cn("max-w-sm")}
            />
            <div className="flex items-center gap-2 justify-end w-full">
              <ArticleFilters
                showType={false}
                defaultType={searchParams?.type as ArticleType}
                sort={searchParams?.createdAt}
              >
                <Button variant="outline" size={"default"}>
                  <span className="sr-only">
                    {lang === "ar" ? "افتح تصفية" : "open Filters"}
                  </span>
                  <span className="md:inline-flex hidden">
                    {lang === "ar" ? "تصفية" : "Filters"}
                  </span>
                  <TbFilterCog className="h-4 w-4" />
                </Button>
              </ArticleFilters>
              <ArticleSettings
                defaultDisplay={searchParams?.view as "list" | "grid"}
                take={take.toString()}
              >
                <Button variant="outline" size={"default"}>
                  <span className="sr-only">
                    {lang === "ar" ? "افتح الإعدادات" : "open settings"}
                  </span>
                  <span className="md:inline-flex hidden">
                    {lang === "ar" ? "الإعدادات" : "Settings"}
                  </span>
                  <RiSettings4Line className="h-4 w-4" />
                </Button>
              </ArticleSettings>
            </div>
          </div>
        </div>
      </div>
      {articles.length > 0 ? (
        list ? (
          <div className="w-4/6 mx-auto grid gap-5 my-10">
            {articles.map((article, index) => (
              <div key={index}>
                <SideCard
                  imageUrl={article.poster!}
                  title={lang === "en" ? article.enTitle : article.title}
                  description={
                    lang === "en"
                      ? extractText(article.enBody, 150)
                      : extractText(article.body, 150)
                  }
                  link={`/${lang}/articles/${article.slug}`}
                />
                <Separator className="bg-foreground/50" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 container gap-5 my-10">
            {articles.map((article, index) => {
              return (
                <Card
                  key={index}
                  description={lang === "en" ? article.enBody : article.body}
                  title={lang === "en" ? article.enTitle : article.title}
                  date={formatDate(new Date(article.createdAt), lang as Locale)}
                  imageUrl={article.poster!}
                  href={`/${lang}/articles/${article.slug}`}
                  views={article.views}
                  authorName={article?.author?.fullName ?? "مشرف"}
                  authorImageUrl={article.poster!}
                  lang={lang as Locale}
                  type={article.type}
                />
              );
            })}
          </div>
        )
      ) : (
        <div className="text-center content-center h-full w-full text-bold text-xl">
          <LangRenderer ar="لايوجد مقالات بعد" en={"No Artciles"} />
        </div>
      )}

      {articles.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {page === 1 ? (
                <Button disabled variant={"ghost"}>
                  {lang === "en" ? (
                    <>
                      <ChevronLeft className="h-4 w-4" />
                      <span>Previous</span>{" "}
                    </>
                  ) : (
                    <>
                      <ChevronRight className="h-4 w-4" />
                      <span>السابق</span>
                    </>
                  )}
                </Button>
              ) : (
                <PaginationPrevious
                  lang={lang as Locale}
                  href={(() => {
                    const params = new URLSearchParams(searchParams || {});
                    params.set("page", `${page > 1 ? page - 1 : 1}`);
                    return `?${params.toString()}`;
                  })()}
                />
              )}
            </PaginationItem>
            {allPages < 5 ? (
              Array.from({ length: allPages }, (_, i) => i).map((item) => (
                <PaginationItem key={item}>
                  <PaginationLink
                    isActive={page === item + 1}
                    href={(() => {
                      const params = new URLSearchParams(searchParams || {});
                      params.set("page", `${item + 1}`);
                      return `?${params.toString()}`;
                    })()}
                  >
                    {item + 1}
                  </PaginationLink>
                </PaginationItem>
              ))
            ) : (
              <>
                <PaginationItem>
                  <PaginationLink
                    isActive={page === 1}
                    href={(() => {
                      const params = new URLSearchParams(searchParams || {});
                      params.set("page", `${1}`);
                      return `?${params.toString()}`;
                    })()}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    isActive={page === 2}
                    href={(() => {
                      const params = new URLSearchParams(searchParams || {});
                      params.set("page", `${2}`);
                      return `?${params.toString()}`;
                    })()}
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    isActive={page === allPages - 1}
                    href={(() => {
                      const params = new URLSearchParams(searchParams || {});
                      params.set("page", `${allPages - 1}`);
                      return `?${params.toString()}`;
                    })()}
                  >
                    {allPages - 1}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    isActive={page === allPages}
                    href={(() => {
                      const params = new URLSearchParams(searchParams || {});
                      params.set("page", `${allPages}`);
                      return `?${params.toString()}`;
                    })()}
                  >
                    {allPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              {page < allPages ? (
                <PaginationNext
                  lang={lang as Locale}
                  href={(() => {
                    const params = new URLSearchParams(searchParams || {});
                    params.set(
                      "page",
                      `${page < allPages ? page + 1 : allPages}`
                    );
                    return `?${params.toString()}`;
                  })()}
                />
              ) : (
                <Button variant={"ghost"} disabled>
                  {lang === "en" ? (
                    <>
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>التالي</span>
                      <ChevronLeft className="h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </main>
  );
};

export default ArticlesPage;
