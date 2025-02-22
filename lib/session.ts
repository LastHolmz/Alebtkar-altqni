import "server-only";
import { cookies } from "next/headers";
import { decrypt, encrypt } from "@/lib/auth";
import { setCookie } from "./cookies";

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }
  const expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
  await setCookie(session, expires);
}

export async function createSession(user: UserSession) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ expiresAt: expires, ...user });
  await setCookie(session, expires);
}

export const getSession = async (): Promise<UserSession | null> => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const payload = await decrypt(session);
  if (!session || !payload) {
    return null;
  }
  return payload;
};

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
