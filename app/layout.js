"use client";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/Providers/ThemeProvider";
import ReactQueryProvider from "@/Providers/ReactQueryProvider";
import Navbar from "./[locale]/Components/Navbar";
import { usePathname } from "next/navigation";
import Footer from "./[locale]/Components/Footer";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Sri Lanka Tours",
//   description: "Explore the beauty of Sri Lanka with our guided tours",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const HideNavBarRoute = ["/en/login"];
  const shouldhidenavbar = HideNavBarRoute.some((route) =>
    pathname.startsWith(route)
  );
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ReactQueryProvider>
            {!shouldhidenavbar && <Navbar />}
            {children}
            {!shouldhidenavbar && <Footer />}
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
