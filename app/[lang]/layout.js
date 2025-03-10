// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/Providers/ThemeProvider";
import Navbar from "./Components/Navbar";
import ReactQueryProvider from "@/Providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sri Lanka Tours",
  description: "Explore the beauty of Sri Lanka with our guided tours",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
