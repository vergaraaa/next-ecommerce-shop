import type { Metadata } from "next";

import "./globals.css";
import { inter } from "@/config/fonts";

export const metadata: Metadata = {
  title: "Teslo | Shop",
  description: "Ecommerce shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
