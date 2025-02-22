"use server";

import { cookies } from "next/headers";

export const setCookie = async (session: string, expires: Date) => {
  const isProduction = process.env.NODE_ENV === "production";
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    expires,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
  });
};
