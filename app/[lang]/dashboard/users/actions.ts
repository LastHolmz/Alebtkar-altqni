import { Roles } from "@prisma/client";
import { z } from "zod";
import { updateUser, deleteUser, createUser } from "@/database/users";

export async function createUserAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      email: z.string().email("البريد الإلكتروني غير صالح"),
      fullName: z.string().min(4, "الاسم الكامل مطلوب"),
      phoneNumber: z.string().min(9, "رقم الهاتف مطلوب"),
      password: z.string().min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل"),
      role: z.nativeEnum(Roles),
      verified: z.string(),
    });

    const data = schema.safeParse({
      fullName: formData.get("fullName") || "",
      phoneNumber: formData.get("phoneNumber") || "",
      password: formData.get("password") || "",
      email: formData.get("email") || "",
      role: formData.get("role") || "admin",
      verified: formData.get("verified") || "false",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { email, fullName, phoneNumber, password, role, verified } =
      data.data;

    const res = await createUser({
      fullName,
      password,
      role,
      phoneNumber: Number(phoneNumber),
      verified: verified === "true",
      email,
    });

    console.log("User created successfully:", res);
    return { message: res.message };
  } catch (error) {
    console.error("Error in createUserAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" };
  }
}

// Action to update a user
export async function updateUserAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string().min(1, "معرف المستخدم مطلوب"), // "User ID is required"
      email: z.string().email("البريد الإلكتروني غير صالح"),
      fullName: z.string().min(4, "الاسم الكامل مطلوب"),
      phoneNumber: z.string().min(9, "رقم الهاتف مطلوب"),
      role: z.nativeEnum(Roles),
      verified: z.string(),
      password: z.string().nullable().optional(),
      confirmPassword: z.string().nullable().optional(),
    });

    const data = schema.safeParse({
      id: formData.get("id") || "",
      fullName: formData.get("fullName") || "",
      phoneNumber: formData.get("phoneNumber") || "",
      email: formData.get("email") || "",
      role: formData.get("role") || "admin",
      verified: formData.get("verified") || "false",
      confirmPassword: formData.get("confirmPassword"),
      password: formData.get("password"),
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const {
      id,
      email,
      fullName,
      phoneNumber,
      role,
      verified,
      password,
      confirmPassword,
    } = data.data;
    if (confirmPassword && password) {
      if (confirmPassword !== password) {
        return { message: "كلمات المرور غير متطابقة" }; // "Passwords do not match"
      }
    }

    const res = await updateUser({
      id,
      fullName,
      role,
      phoneNumber: Number(phoneNumber),
      verified: verified === "true",
      email,
      password,
    });

    console.log("User updated successfully:", res);
    return { message: res.message };
  } catch (error) {
    console.error("Error in updateUserAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" }; // "The operation failed, please try again later."
  }
}

// Action to delete a user
export async function deleteUserAction(
  _: { message: string },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string().min(1, "معرف المستخدم مطلوب"), // "User ID is required"
    });

    const data = schema.safeParse({
      id: formData.get("id") || "",
    });

    if (!data.success) {
      console.error("Validation errors:", data.error.errors);
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { id } = data.data;

    const res = await deleteUser({ id });

    console.log("User deleted successfully:", res);
    return { message: res.message };
  } catch (error) {
    console.error("Error in deleteUserAction:", error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" }; // "The operation failed, please try again later."
  }
}
