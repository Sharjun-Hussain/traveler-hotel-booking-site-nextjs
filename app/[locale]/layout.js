// app/[locale]/layout.tsx
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { CurrencyInitializer } from "./Components/currencyInitializer";

// Locales supported by our app
const locales = ["en", "ta", "si"];

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
      <CurrencyInitializer />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}

// Generate locale variants for all pages under this layout
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
