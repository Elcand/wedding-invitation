import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import type { ReactNode } from "react";
import BackgroundVideo from "@/components/BackgroundVideo";
import { LanguageProvider } from "@/lib/language";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Gabriel & Yunita — 6 March 2027",
    template: "%s | Gabriel & Yunita",
  },
  description:
    "Editorial digital wedding invitation untuk Gabriel & Yunita. Discover our love story, event details, and RSVP.",
  keywords: ["undangan pernikahan", "wedding invitation", "Gabriel", "Yunita"],
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#171815",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden text-stone-100 antialiased selection:bg-amber-200 selection:text-stone-900">
        <LanguageProvider>
          <BackgroundVideo />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
