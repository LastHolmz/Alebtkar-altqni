import { createMsg } from "@/db/contact";
import { z } from "zod";

export async function newContactAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      content: z.string(),
      fullName: z.string().min(1),
      phone: z.string().min(9),
      email: z.string().min(3),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      content: formData.get("content"),
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
    });
    console.log(data);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    console.log(data);
    const { content, fullName, phone, email } = data.data;

    const res = await createMsg({
      content,
      fullName,
      phone: Number(phone),
      email,
    });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
