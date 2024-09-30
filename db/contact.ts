"use server";
import prisma from "@/prisma/db";
import { Contact } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const createContact = async ({
  content,
  fullName,
  phone,
  email,
}: Omit<Contact, "id" | "createdAt" | "updatedAt">): Promise<{
  message: string;
}> => {
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
