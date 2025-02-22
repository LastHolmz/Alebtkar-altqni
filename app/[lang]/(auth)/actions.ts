"use server";

import { checkPassword, encrypt, logout } from "@/lib/auth";
import { z } from "zod";
import { cookies } from "next/headers";
import prisma from "@/prisma/db";

export async function loginUserAction(
  _: { message: string },
  formData: FormData
) {
  const schema = z.object({
    email: z.string().email("البريد الإلكتروني غير صالح"),
    password: z.string().min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل"),
  });

  const data = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!data.success) {
    return {
      message: data.error.errors.map((err) => err.message).join(", "),
    };
  }

  const { email, password } = data.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { message: "لم يتم العثور على حساب بهذا البريد الإلكتروني." };
    }

    const passwordMatch = await checkPassword(password, user.password ?? "");
    if (!passwordMatch) {
      return { message: "كلمة المرور غير صحيحة. الرجاء المحاولة مرة أخرى." };
    }

    // Create a session
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    const session = await encrypt({
      id: user.id,
      fullName: user.fullName,
      role: user.role,
      email: user.email,
    });

    // Save the session in cookies
    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return { message: "تم تسجيل الدخول بنجاح." };
  } catch (error) {
    console.error(error);
    return { message: "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة لاحقاً." };
  }
}

export async function logoutAction(
  _: {
    message: string;
  },
  formData: FormData
) {
  try {
    const res = await logout();
    // Return the message from the recoverPassword function
    return { message: res.message };
  } catch (error) {
    console.error(error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" }; // "The operation failed, please try again later"
  }
}
