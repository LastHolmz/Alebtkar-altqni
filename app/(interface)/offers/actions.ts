import { updateOffer } from "@/db/offer";
import { ListForOffer } from "@prisma/client";
import { z } from "zod";

type ListOffer = Omit<
  ListForOffer,
  "id" | "createdAt" | "updatedAt" | "offerId"
>;

export async function submitOfferAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    // Validate the required fields
    const schema = z.object({
      content: z.string(),
      id: z.string(),
      email: z.string(),
      phone: z.string(),
      title: z.string(),
      to: z.string(),
      length: z.string(),
    });

    const data = schema.safeParse({
      content: formData.get("content"),
      id: formData.get("id"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      title: formData.get("title"),
      to: formData.get("to"),
      length: formData.get("length"),
    });

    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }

    const list: ListOffer[] = [];

    // Iterate through all the items, regardless of selection
    for (let i = 0; i < Number(data.data.length); i++) {
      const title = formData.get(`list-title-${i}`) as string;
      const period = Number(formData.get(`list-period-${i}`));
      const price = Number(formData.get(`list-price-${i}`));
      const selected = formData.get(`list-order-selected-${i}`) === "true";

      // Append all items to the list
      list.push({
        type: "optional",
        title,
        period,
        price,
        selected,
      });
    }

    // Destructure the validated data
    const { content, email, phone, title, to, id } = data.data;

    // Update the offer with the entire list
    const res = await updateOffer({
      id,
      content,
      email,
      phone: Number(phone),
      title,
      to,
      offerList: list, // Send the list to the database
    });

    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
