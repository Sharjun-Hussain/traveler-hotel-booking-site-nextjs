"use client";
import { Poppins } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/Providers/ThemeProvider";
import ReactQueryProvider from "@/Providers/ReactQueryProvider";
import Navbar from "./[locale]/Components/Navbar";
import { usePathname } from "next/navigation";
import Footer from "./[locale]/Components/Footer";

// const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  style: "normal",
  variable: "--font-poppins",
});

// export const metadata = {
//   title: "Sri Lanka Tours",
//   description: "Explore the beauty of Sri Lanka with our guided tours",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const HideNavBarRoute = ["/en/auth/login"];
  const shouldhidenavbar = HideNavBarRoute.some((route) =>
    pathname.startsWith(route)
  );
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.variable}>
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
