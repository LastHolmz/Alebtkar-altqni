import { z } from "zod";
import {
  createArtcle,
  deleteArticle,
  updateArticle,
} from "@/database/articles";
import { ArticleType } from "@prisma/client";

export async function createArticleAction(
  _: { message: string },
  formData: FormData
) {
  try {
    // Define the schema for article data validation
    const schema = z.object({
      title: z.string().min(3, "عنوان المقال مطلوب"), // "Title is required"
      body: z.string().min(10, "نص المقال مطلوب"), // "Body content is required"
      enTitle: z.string().min(1, "The English title is required"), // "The English title is required"
      enBody: z.string().min(3, "The English body is required"), // "The English body is required"
      poster: z.string().nullable().optional(), // "Poster URL is required"
      type: z.nativeEnum(ArticleType), // "Type is required"
      readTime: z.string().nullable().optional(), // Optional poster image
    });

    // Parse and validate form data using the schema
    const data = schema.safeParse({
      title: formData.get("title") || "",
      body: formData.get("body") || "",
      enTitle: formData.get("enTitle") || "",
      enBody: formData.get("enBody") || "",
      poster: formData.get("poster") || "",
      type: formData.get("type") || "",
      readTime: formData.get("readTime") || "",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { title, body, enTitle, enBody, poster, type, readTime } = data.data;

    // Create the article in the database using Prisma
    const res = await createArtcle({
      title,
      body,
      enTitle,
      enBody,
      poster,
      type,
      readTime: Number(readTime),
    });

    return { message: res.message }; // "Article created successfully"
  } catch (error) {
    console.error("Error in createArticleAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" }; // "The operation failed, please try again later."
  }
}
export async function updateArticleAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string().min(1, "معرف المقالة مطلوب"), // "Article ID is required"
      title: z.string().min(1, "عنوان المقالة مطلوب"), // "Article title is required"
      body: z.string().min(1, "محتوى المقالة مطلوب"), // "Article body is required"
      enTitle: z.string().min(1, "عنوان المقالة بالإنجليزية مطلوب"), // "English article title is required"
      enBody: z.string().min(1, "محتوى المقالة بالإنجليزية مطلوب"), // "English article body is required"
      type: z.nativeEnum(ArticleType), // "Article type is required"
      poster: z.string().nullable().optional(), // Optional poster image
      readTime: z.string().nullable().optional(), // Optional poster image
    });

    const data = schema.safeParse({
      id: formData.get("id") || "",
      title: formData.get("title") || "",
      body: formData.get("body") || "",
      enTitle: formData.get("enTitle") || "",
      enBody: formData.get("enBody") || "",
      type: formData.get("type") || "news",
      poster: formData.get("poster"),
      readTime: formData.get("readTime"),
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { id, title, body, enTitle, enBody, type, poster, readTime } =
      data.data;

    const res = await updateArticle({
      id,
      title,
      body,
      enTitle,
      enBody,
      type,
      poster,
      readTime: Number(readTime),
    });

    console.log("Article updated successfully:", res);
    return { message: res.message };
  } catch (error) {
    console.error("Error in updateArticleAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" }; // "The operation failed, please try again later."
  }
}

export async function deleteArticleAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string().min(1, "معرف المقالة مطلوب"), // "User ID is required"
    });

    const data = schema.safeParse({
      id: formData.get("id") || "",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { id } = data.data;

    const res = await deleteArticle({ id });

    console.log("User deleted successfully:", res);
    return { message: res.message };
  } catch (error) {
    console.error("Error in deleteUserAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" }; // "The operation failed, please try again later."
  }
}
