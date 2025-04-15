import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { getArticles } from "@/database/articles";
import { CustomLink } from "@/components/custom-link";
import { DeleteArticleForm } from "./components/forms";
import SearchInput from "@/components/search";
import ArticleCard from "./components/article-card";
const page = async (props: { searchParams: Promise<{ content?: string }> }) => {
  const searchParams = await props.searchParams;
  const articles = await getArticles({ content: searchParams?.content });

  return (
    <main className="phone-only:px-4">
      <div className=" flex md:justify-between  justify-start flex-col  md:flex-row md:items-center md:mx-2 my-2">
        <Breadcrumb className="my-2" dir="rtl">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/`}>الرئيسية</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/dashboard`}>لوحة التحكم</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>ادارة المقالات</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CustomLink variant={"default"} href={`/dashboard/articles/new`}>
          مقالة جديدة
        </CustomLink>
      </div>

      <div className=" my-4 md:container">
        <div className="flex justify-between my-4 items-center gap-2 phone-only:flex-col">
          <h1 className=" font-bold text-2xl ">ادارة المقالات</h1>
          <SearchInput
            query="content"
            className="max-w-sm phone-only:max-w-full "
            placeholder="ابحث عن مقالة"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles?.map((article, i) => {
            return (
              <ArticleCard
                type={article.type}
                key={i}
                title={article.title}
                body={article.body}
                src={article.poster!}
                href={`/dashboard/articles/${article.slug}`}
                edit
                createdAt={article.createdAt}
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <DeleteArticleForm id={article.id} />
                    <CustomLink href={`/dashboard/articles/${article.slug}`}>
                      تعديل المقالة
                    </CustomLink>
                  </div>
                  <div className="flex gap-2 items-center">
                    {article.views}{" "}
                    <span className="text-foreground/60 text-sm">مشاهدة</span>
                  </div>
                </div>
              </ArticleCard>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default page;
