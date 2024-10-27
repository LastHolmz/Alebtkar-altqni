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
    let newContactInfo;
    if (offerList && offerList.length > 0) {
      newContactInfo = await prisma.offer.create({
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
              data: offerList.length > 0 ? offerList : [],
            },
          },
        },
      });
    } else {
      newContactInfo = await prisma.offer.create({
        data: {
          content,
          phone,
          title,
          to,
          email,
          images: [],
          totalPrice,
        },
      });
    }
    if (!newContactInfo) {
      return { message: "لم يتم إنشاء الطلب بنجاح" };
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
    let updateOffer;
    if (offerList && offerList.length > 0) {
      updateOffer = await prisma.offer.update({
        where: { id },
        data: {
          content,
          phone,
          title,
          to,
          email,
          totalPrice,
          images: [],
          list: {
            deleteMany: {},
            createMany: {
              data: offerList,
            },
          },
        },
      });
    } else {
      updateOffer = await prisma.offer.update({
        where: { id },
        data: {
          content,
          phone,
          title,
          to,
          email,
          totalPrice,
          images: [],
          list: {
            deleteMany: {},
          },
        },
      });
    }
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
