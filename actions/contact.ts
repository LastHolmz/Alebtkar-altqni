import { createContact } from "@/db/contact";
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
      fullName: z.string(),
      phone: z.string(),
      email: z.string(),
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

    const res = await createContact({
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
//   export async function newRewardORTaxAction(
//     prevState: {
//       message: string;
//     },
//     formData: FormData
//   ) {
//     try {
//       const schema = z.object({
//         userId: z.string(),
//         content: z.string(),
//         val: z.string(),
//         type: z.enum(["reward", "tax"]),
//       });
//       console.log(`schema: ${schema}`);

//       const data = schema.safeParse({
//         userId: formData.get("userId"),
//         content: formData.get("content"),
//         val: formData.get("val"),
//         type: formData.get("type"),
//       });
//       console.log(data);

//       console.log(data.success);
//       if (!data.success) {
//         return { message: "يجب أن يتم ملء جميع الحقول" };
//       }
//       console.log(data);
//       const { userId, content, val, type } = data.data;

//       const res = await createTaxOrRewardForUser({
//         userId,
//         val: Number(val),
//         content,
//         type,
//       });
//       return { message: res.message };
//     } catch (e) {
//       console.log(e);
//       return { message: "فشلت العملية" };
//     }
//   }
