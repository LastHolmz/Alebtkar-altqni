"use server";
import prisma from "@/prisma/db";
import { Contact } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";

export const createMsg = async ({
  content,
  fullName,
  phone,
  email,
}: Omit<Contact, "id" | "createdAt" | "updatedAt">): Promise<{
  message: string;
}> => {
  if (content.length === 0 || fullName.length === 0 || email.length === 0) {
  }
  try {
    const newContactInfo = await prisma.contact.create({
      data: {
        content,
        fullName,
        phone,
        email,
      },
    });
    if (!newContactInfo) {
      return { message: "لم يتم إنشاء الطلب بنجاح" };
    }
    revalidateTag("contact");
    return {
      message: "تم الإرسال بنجاح سيتم الرد باسرع وقت ان شاء الله",
    };
  } catch (error) {
    return {
      message: "حدث خطأ الرجاء المحاولة لاحقا",
    };
  }
};

export const getMsgs = unstable_cache(
  async (content?: string) => {
    try {
      const msgs = await prisma.contact.findMany({
        where: {
          content: {
            contains: content,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return msgs;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  ["contact"],
  {
    tags: ["contact"],
  }
);
