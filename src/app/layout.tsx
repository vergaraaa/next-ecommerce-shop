import type { Metadata } from "next";

import "./globals.css";
import { inter } from "@/config/fonts";
import { Provider } from "@/components/provider/Provider";

export const metadata: Metadata = {
  title: {
    default: "Home - Teslo | Shop",
    template: "%s - Teslo | Shop",
  },
  description: "Ecommerce shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
