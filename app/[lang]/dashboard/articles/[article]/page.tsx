import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export async function generateStaticParams() {
  const articles = await getArticles({});
  return articles.map((article) => ({
    article: article.slug,
  }));
}

import { UpdateArticleForm } from "../components/forms";
import { getArticleBySlug, getArticles } from "@/database/articles";
import { notFound } from "next/navigation";
const EditArticlePage = async ({
  params,
}: {
  params: Promise<{ article: string }>;
}) => {
  const slug = (await params).article;
  const article = await getArticleBySlug(slug);
  if (!article) {
    return notFound();
  }
  return (
    <main className="phone-only:px-4">
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
            <BreadcrumbLink asChild>
              <Link href={`/dashboard/articles`}>ادارة المقالات</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{article.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="my-4 md:container">
        <UpdateArticleForm article={article} />
      </div>
    </main>
  );
};

export default EditArticlePage;
