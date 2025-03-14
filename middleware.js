// middleware.ts
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ta", "si"],

  // The default locale to use when visiting a non-localized path
  defaultLocale: "en",

  // Use pathname routing for explicit language selection in URLs
  localePrefix: "always",
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files (like favicon.ico)
  // - etc.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
