import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creative Portfolio",
  description: "A modern portfolio showcasing web development and design.",
};

import BackgroundCanvas from "@/components/ui/BackgroundCanvas";
import Navbar from "@/components/Navbar";
import SmoothScrollProvider from "@/components/utils/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col relative overflow-x-hidden`}>
        <SmoothScrollProvider>
          <CustomCursor />
          <BackgroundCanvas />
          <Navbar />
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col relative z-10">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
