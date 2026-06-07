import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE = "https://asherelginrolls.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Asher Elgin Rolls · AI-native growth operator",
  description:
    "AI-native growth operator. I find the channel, build the engine that feeds it, and run the data that makes it compound. Grew a YouTube channel from 7K to 100K, built $1M in deep-tech pipeline, and ship my own AI tools.",
  authors: [{ name: "Asher Elgin Rolls" }],
  openGraph: {
    title: "Asher Elgin Rolls · AI-native growth operator",
    description:
      "I get good products their first 100,000 users. Product sense, marketing instinct, sales rigor, and an analyst's discipline in one early hire.",
    type: "website",
    url: SITE,
  },
  twitter: {
    card: "summary_large_image",
    title: "Asher Elgin Rolls · AI-native growth operator",
    description:
      "I get good products their first 100,000 users. One early growth hire who builds his own AI tools.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
