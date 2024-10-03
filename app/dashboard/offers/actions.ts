import { createOffer } from "@/db/offer";
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
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      content: formData.get("content"),
      email: formData.get("email"),
      list: formData.get("list"),
      phone: formData.get("phone"),
      title: formData.get("title"),
      to: formData.get("to"),
    });
    console.log(data);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    console.log(data);
    const list: ListOffer[] = JSON.parse(data.data.list);
    const { content, email, phone, title, to } = data.data;

    const res = await createOffer({
      content,
      email,
      phone: Number(phone),
      title,
      to,
      offerList: list,
    });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
