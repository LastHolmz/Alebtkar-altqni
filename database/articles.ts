"use server";

import { getSession } from "@/lib/session";
import { generateSlug } from "@/lib/slug";
import prisma from "@/prisma/db";
import { Article, ArticleType } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";

const createArtcle = async ({
  body,
  enBody,
  enTitle,
  poster,
  title,
  type,
  readTime,
}: Omit<
  Article,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "views"
  | "poster"
  | "authorId"
  | "slug"
  | "readTime"
> & {
  poster?: nullable | string;
  readTime?: nullable | number;
}) => {
  try {
    const user = await getSession();
    if (!user) {
      return { message: "يجب تسجيل الدخول اولا" };
    }
    const slug = await generateSlug(enTitle);
    const article = await prisma.article.create({
      data: {
        body,
        enBody,
        enTitle,
        title,
        authorId: user.id,
        poster,
        type,
        slug,
        readTime,
      },
    });
    if (!article) {
      return { message: "فشل انشاء المقالة" };
    }
    revalidateTag("articles");
    return { message: "تم انشاء المقالة بنجاح" };
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل انشاء المقالة" };
  }
};
const deleteArticle = async ({ id }: { id: string }) => {
  try {
    const article = await prisma.article.delete({
      where: { id },
    });
    if (!article) {
      return { message: "فشل حذف المقالة" }; // "Failed to delete user"
    }
    revalidateTag("articles");
    return { message: "تم حذف المقالة بنجاح" }; // "User deleted successfully"
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل حذف المقالة" }; // "Failed to delete account"
  }
};

const updateArticle = async ({
  id,
  title,
  body,
  enTitle,
  enBody,
  type,
  poster,
  readTime,
}: Omit<
  Article,
  | "createdAt"
  | "updatedAt"
  | "authorId"
  | "views"
  | "poster"
  | "slug"
  | "readTime"
> & { poster?: nullable | string; readTime?: nullable | number }) => {
  try {
    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        title,
        body,
        enTitle,
        enBody,
        type,
        readTime,
        poster, // Assuming the `poster` field is a string representing the image URL or path
      },
    });

    if (!updatedArticle) {
      return { message: "فشل تحديث المقالة" }; // "Failed to update article"
    }

    // Revalidate the articles cache/tag if you're using caching
    revalidateTag("articles"); // Uncomment if you are using revalidation in your setup

    return { message: "تم تحديث المقالة بنجاح" }; // "Article updated successfully"
  } catch (error: any) {
    console.dir(error, { depth: null });
    return { message: "فشل تحديث المقالة" }; // "Failed to update article"
  }
};

const getArticles = unstable_cache(
  async ({
    content,
    author = false,
    type = undefined,
    take,
    notIn = [],
    page,
    select,
    debug = false,
    createdAt = "desc",
  }: {
    content?: string;
    author?: boolean;
    type?: ArticleType[];
    take?: number;
    notIn?: string[];
    page?: number;
    select?: any;
    debug?: boolean;
    createdAt?: "asc" | "desc";
  }) => {
    let skip = 0;
    if (take && page) {
      skip = (page - 1) * take;
    }
    if (debug) {
      console.log("#".repeat(20));
      console.log(`take: ${take}`);
      console.log(`skip: ${skip}`);
      console.log(`page: ${page}`);
      console.log("#".repeat(20));
    }
    const filter: any = content
      ? {
          OR: [
            {
              title: {
                contains: content,
                mode: "insensitive", // Case-insensitive search
              },
            },
            {
              enTitle: {
                contains: content,
                mode: "insensitive", // Case-insensitive search
              },
            },
            {
              body: {
                contains: content,
                mode: "insensitive",
              },
            },
            {
              enBody: {
                contains: content,
                mode: "insensitive",
              },
            },
          ],
          type: {
            in: type,
          },
          id: {
            notIn,
          },
        }
      : {
          type: {
            in: type,
          },
          id: {
            notIn,
          },
        }; // No filter if title is undefined or empty
    let includeAndSelect: any = {
      include: {
        author,
      },
    };
    if (select) {
      includeAndSelect = {
        select,
      };
    }
    try {
      const articles = await prisma.article.findMany({
        where: filter,
        orderBy: {
          createdAt,
        },
        take,
        skip,
        ...includeAndSelect,
      });
      if (!articles) {
        return [];
      }
      if (!articles || articles.length === 0) {
        console.log("لم يتم العثور على اي مقالة.");
        return [];
      }
      return articles;
    } catch (error) {
      console.dir(error, { depth: null });
      return [];
    }
  },
  ["articles"],
  { tags: ["articles"] }
);

const getArticleBySlug = async (slug: string, author = false) => {
  try {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        author,
      },
    });
    if (!article) {
      return undefined;
    }
    return article;
  } catch (error) {
    return undefined;
  }
};

const searchArticles = unstable_cache(
  async ({ content, start = false }: { content?: string; start?: boolean }) => {
    if (!start) return [];
    const filter: any = content
      ? {
          OR: [
            {
              title: {
                contains: content,
                mode: "insensitive", // Case-insensitive search
              },
            },
            {
              enTitle: {
                contains: content,
                mode: "insensitive", // Case-insensitive search
              },
            },
            {
              body: {
                contains: content,
                mode: "insensitive",
              },
            },
            {
              enBody: {
                contains: content,
                mode: "insensitive",
              },
            },
          ],
        }
      : {}; // No filter if title is undefined or empty

    try {
      const articles = await prisma.article.findMany({
        where: filter,
        select: {
          slug: true,
          title: true,
          enTitle: true,
          body: true,
          enBody: true,
        },
      });
      if (!articles) {
        return [];
      }
      if (!articles || articles.length === 0) {
        console.log("لم يتم العثور على اي مقالة.");
        return [];
      }
      return articles;
    } catch (error) {
      console.dir(error, { depth: null });
      return [];
    }
  },
  ["articles"],
  { tags: ["articles"] }
);

export {
  createArtcle,
  getArticles,
  deleteArticle,
  getArticleBySlug,
  updateArticle,
  searchArticles,
};
