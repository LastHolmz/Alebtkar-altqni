import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { getSession, updateSession } from "./lib/session";

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );
  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

const protectedRoutes = {
  // userRoutes: ["/profile"],
  adminsRoutes: ["/dashboard"],
  superAdminsRoutes: ["/dashboard/users"],
}; // Define your protected routes

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // Authentication logic: Apply to language-prefixed protected routes
  const localeRegex = new RegExp(`^/(${i18n.locales.join("|")})`);

  // Check if the request contains a locale prefix and a protected route
  const localeMatch = pathname.match(localeRegex);
  const hasLocalePrefix = localeMatch && localeMatch[0];

  if (hasLocalePrefix) {
    // console.log("dasbhoard");
    const pathWithoutLocale = pathname.replace(localeRegex, "");
    //super admin routes
    if (
      protectedRoutes.superAdminsRoutes.some(
        (route) =>
          pathWithoutLocale.includes(route) ||
          pathWithoutLocale.startsWith(route)
      )
    ) {
      // Check if the user is authenticated
      const session = await getSession();

      if (!session) {
        // Redirect to login with the same locale
        const locale = localeMatch[1];
        return NextResponse.redirect(
          new URL(
            `/${locale}/sign-in?redirect=${pathname.toString()}`,
            request.url
          )
        );
      }
      if (session.role !== "superAdmin") {
        // Redirect to login with the same locale
        const locale = localeMatch[1];
        return NextResponse.redirect(
          new URL(`/${locale}/dashboard`, request.url)
        );
      }
    }
    //admin routes
    if (
      protectedRoutes.adminsRoutes.some((route) =>
        pathWithoutLocale.includes(route)
      )
    ) {
      // Check if the user is authenticated
      const session = await getSession();

      if (!session) {
        // Redirect to login with the same locale
        const locale = localeMatch[1];
        return NextResponse.redirect(
          new URL(
            `/${locale}/sign-in?redirect=${pathname.toString()}`,
            request.url
          )
        );
      }
    }
  }

  // Locale check remains the same
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }

  // return NextResponse.next();
  return await updateSession();
}

export const config = {
  // Matcher ignoring API, Next.js files, and static assets
  matcher: [
    "/((?!api|_next/static|_next/image|images|content|favicon.ico|robots.txt|sitemap.xml|logo.png|white-logo.png|JavaScript frameworks-amico.png|contact-us.png|cover.jpg|amico.png|projects/|images/|logos/).*)",
  ],
};
