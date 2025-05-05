// middleware.ts
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "ta", "si"],
  defaultLocale: "en",
  localePrefix: "always",
});

const protectedRoutes = ["/dashboard", "/profile", "/bookings", "/settings"];

export function middleware(request) {
  // 1. Handle locale persistence
  const localeCookie = request.cookies.get("NEXT_LOCALE");
  const { pathname } = request.nextUrl;
  let response;

  // 2. Apply next-intl middleware first
  response = intlMiddleware(request);

  // 3. Set/Update locale cookie if needed
  const detectedLocale = request.nextUrl || "en";
  console.log(detectedLocale);

  if (!localeCookie || localeCookie.value !== detectedLocale) {
    response.cookies.set("NEXT_LOCALE", detectedLocale, {
      path: "/",
      maxAge: 365 * 24 * 60 * 60, // 1 year
      sameSite: "lax",
    });
  }

  // 4. Handle protected routes (your existing logic)
  const token = request.cookies.get("access_token")?.value;
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(`/${detectedLocale}${route}`)
  );

  if (isProtected && !token) {
    const loginUrl = new URL(`/${detectedLocale}/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|.*\\..*|login|signup|forgot-password|reset-password).*)",
  ],
};
