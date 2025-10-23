import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";
import { Kanit } from "next/font/google";

export const metadata: Metadata = {
  title: "KipuBank v2",
  description: "KipuBank v2",
};

const kanit = Kanit({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={kanit.className}>
      <body className="flex min-h-svh flex-col overscroll-none bg-gradient-to-br from-[#0B0C1E] via-[#10203A] to-[#1E394A] text-white overflow-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
