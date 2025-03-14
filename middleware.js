import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Redirect if the user visits "/"
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", req.url));
  }

  return NextResponse.next();
}

// Apply middleware only for "/"
export const config = {
  matcher: "/",
};
