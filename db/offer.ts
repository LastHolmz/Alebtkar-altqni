"use server";
import prisma from "@/prisma/db";
import { ListForOffer, Offer } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";
type ListOffer = Omit<
  ListForOffer,
  "id" | "createdAt" | "updatedAt" | "offerId"
>;
interface Props
  extends Omit<
    Offer,
    "id" | "createdAt" | "updatedAt" | "images" | "list" | "editable"
  > {
  offerList: ListOffer[];
}
export const createOffer = async ({
  content,
  email,
  phone,
  offerList,
  title,
  to,
}: Props) => {
  try {
    const newContactInfo = await prisma.offer.create({
      data: {
        content,
        phone,
        title,
        to,
        email,
        images: [],
        list: {
          createMany: {
            data: offerList,
          },
        },
      },
    });
    if (!newContactInfo) {
      return { message: "لم يتم إنشاء الطلب بنجاح" };
    }
    revalidateTag("offers");
    return {
      message: "تمت العملية بنجاح",
    };
  } catch (error) {
    return {
      message: "حدث خطأ الرجاء المحاولة لاحقا",
    };
  }
};
export const updateOffer = async ({
  content,
  email,
  phone,
  offerList,
  title,
  to,
  id,
}: Props & { id: string }) => {
  try {
    const newContactInfo = await prisma.offer.update({
      where: {
        id,
      },
      data: {
        content,
        phone,
        title,
        to,
        email,
        images: [],
        list: {
          deleteMany: {},
          createMany: {
            data: offerList,
          },
        },
      },
    });
    if (!newContactInfo) {
      return { message: "لم يتم إنشاء الطلب بنجاح" };
    }
    revalidateTag("offers");

    return {
      message: "تمت العملية بنجاح",
    };
  } catch (error) {
    return {
      message: "حدث خطأ الرجاء المحاولة لاحقا",
    };
  }
};

export const getOffers = unstable_cache(
  async () => {
    try {
      const offers = await prisma.offer.findMany({});
      if (!offers) return [];
      return offers;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  ["offers"],
  { tags: ["offers"] }
);
export const getOfferById = async (id: string) => {
  try {
    const offers = await prisma.offer.findUnique({
      where: { id },
      include: {
        list: true,
      },
    });
    if (!offers) return undefined;
    return offers;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};