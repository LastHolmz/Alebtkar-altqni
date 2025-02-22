"use server";
import bcryptjs from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { deleteSession } from "./session";

const secretKey = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export const hashPassword = async (password: string) => {
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hash(password, salt);
  return hash;
};

export const checkPassword = async (
  password: string,
  hashedPassword: string
) => {
  const validPassword = await bcryptjs.compare(password, hashedPassword);
  return validPassword;
};

export async function decrypt(
  session: string | undefined = ""
): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as unknown as UserSession;
  } catch (error: any) {
    console.log("Failed to verify session");
    return null;
  }
}

// encryt our session
export const encrypt = async (payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30 days from now")
    .sign(encodedKey);
};

export const logout = async () => {
  // Destroy the session
  try {
    await deleteSession();
    return { message: "تم تسجيل الخروج بنجاح" };
  } catch (error) {
    return { message: "حدث خطأ أثناء تسجيل الخروج" };
  }
};
