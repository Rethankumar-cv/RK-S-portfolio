import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rethan Kumar — UI/UX Designer & Front-End Engineer",
  description: "I design and build fast, polished interfaces — from pixel-perfect UI systems to production-ready React apps.",
  openGraph: {
    title: "Rethan Kumar — UI/UX Designer & Front-End Engineer",
    description: "I design and build fast, polished interfaces — from pixel-perfect UI systems to production-ready React apps.",
    url: "https://rethan.vercel.app",
    siteName: "Rethan Kumar Portfolio",
    images: [
      {
        url: "/og-image.png", // Assuming an og-image will be added to public
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rethan Kumar",
  "jobTitle": "UI/UX Designer & Front-End Engineer",
  "url": "https://rethan.vercel.app",
};

const SVGGlassRefractionFilter = () => (
  <svg style={{ width: 0, height: 0, position: 'absolute', pointerEvents: 'none' }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="refraction-filter" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);

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
      <head>
        <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col relative overflow-x-hidden`}>
        <SVGGlassRefractionFilter />
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
