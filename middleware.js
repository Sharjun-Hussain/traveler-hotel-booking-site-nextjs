// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "ta", "si"],
  defaultLocale: "en",
  localePrefix: "always",
});

const protectedRoutes = ["/dashboard", "/profile", "/bookings", "/settings"];

export function middleware(req) {
  const res = intlMiddleware(req);
  const { pathname } = req.nextUrl;
  const locale = req.nextUrl.locale || "en";

  const token = req.cookies.get("access_token")?.value;

  // Check if user is trying to access a protected route
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(`/${locale}${route}`)
  );

  if (isProtected && !token) {
    const loginUrl = new URL(`/${locale}/login`, req.url);
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

export const config = {
  matcher: [
    // Match everything except public paths
    "/((?!api|_next|.*\\..*|login|signup|forgot-password|reset-password).*)",
  ],
};
