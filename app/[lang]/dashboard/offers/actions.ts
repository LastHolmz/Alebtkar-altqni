import { createOffer, deleteOffer, updateOffer } from "@/db/offer";
import { ListForOffer } from "@prisma/client";
import { z } from "zod";

type ListOffer = Omit<
  ListForOffer,
  "id" | "createdAt" | "updatedAt" | "offerId"
>;
export async function newOfferAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      content: z.string(),
      email: z.string(),
      list: z.string(),
      phone: z.string(),
      title: z.string(),
      to: z.string(),
      totalPrice: z.string(),
      langauge: z.enum(["ar", "en"]),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      content: formData.get("content"),
      email: formData.get("email"),
      list: formData.get("list"),
      phone: formData.get("phone"),
      title: formData.get("title"),
      to: formData.get("to"),
      totalPrice: formData.get("totalPrice"),
      langauge: formData.get("langauge"),
    });
    console.log(data);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    console.log(data);
    const list: ListOffer[] = JSON.parse(data.data.list);
    const { content, email, phone, title, to, totalPrice, langauge } =
      data.data;

    const res = await createOffer({
      content,
      email,
      phone: Number(phone),
      title,
      to,
      offerList: list,
      totalPrice: Number(totalPrice),
      langauge,
    });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
export async function deleteOfferAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      id: formData.get("id"),
    });
    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    console.log(data);
    const { id } = data.data;
    const res = await deleteOffer({ id });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}

export async function updateOfferAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string(),
      content: z.string(),
      email: z.string(),
      list: z.string(),
      phone: z.string(),
      title: z.string(),
      to: z.string(),
      totalPrice: z.string(),
      langauge: z.enum(["ar", "en"]),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      id: formData.get("id"),
      content: formData.get("content"),
      email: formData.get("email"),
      list: formData.get("list"),
      phone: formData.get("phone"),
      title: formData.get("title"),
      to: formData.get("to"),
      totalPrice: formData.get("totalPrice"),
      langauge: formData.get("langauge"),
    });
    console.log(data);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    console.log(data);
    const list: ListOffer[] = JSON.parse(data.data.list);
    const { content, email, phone, title, to, id, totalPrice, langauge } =
      data.data;

    const res = await updateOffer({
      id,
      content,
      email,
      phone: Number(phone),
      title,
      to,
      offerList: list,
      totalPrice: Number(totalPrice),
      langauge,
    });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
