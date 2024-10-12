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
  totalPrice,
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
        totalPrice,
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
  totalPrice,
}: Props & { id: string }) => {
  try {
    const deletedOffer = await prisma.offer.delete({ where: { id } });
    if (!deletedOffer) {
      return { message: "حدث خطأ اثناء الحذف" };
    }
    const updateOffer = await prisma.offer.create({
      data: {
        id,
        content,
        phone,
        title,
        to,
        email,
        totalPrice,
        images: [],
        list: {
          createMany: {
            data: offerList,
          },
        },
      },
    });
    if (!updateOffer) {
      return { message: "حدث خطأ اثناء الانشاء" };
    }
    revalidateTag("offers");

    return {
      message: "تمت العملية بنجاح",
    };
  } catch (error) {
    console.log(error);
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
    const offer = await prisma.offer.findUnique({
      where: { id },
      include: {
        list: true,
      },
    });
    console.log(offer);
    if (!offer) return undefined;
    return offer;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const deleteOffer = async ({ id }: { id: string }) => {
  try {
    const deleteOffer = await prisma.offer.delete({
      where: { id },
    });
    if (!deleteOffer) {
      return { message: "لم يتم الطلب بنجاح" };
    }
    revalidateTag("offers");
    return {
      message: "تمت العملية بنجاح",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "حدث خطأ الرجاء المحاولة لاحقا",
    };
  }
};
